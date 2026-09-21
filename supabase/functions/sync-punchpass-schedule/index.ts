import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import {
  applyDefaultInstructors,
  conflictKey,
  fetchSchedulePage,
  mergeReaders,
  parseScheduleFromHtml,
  parseScheduleFromJsonLd,
  SCHEDULE_URL,
  validateParsedSchedule,
} from '../_shared/punchpassParser.ts';
import { sendScheduleAlert } from '../_shared/scheduleAlerts.ts';

type AdminClient = ReturnType<typeof createClient>;

async function recordStatus(supabaseAdmin: AdminClient, update: Record<string, unknown>) {
  const { error } = await supabaseAdmin
    .from('sync_status')
    .upsert({ name: 'punchpass-sync', ...update }, { onConflict: 'name' });
  if (error) console.warn('sync_status write failed:', error);
}

async function handleFailure(supabaseAdmin: AdminClient, message: string) {
  console.error('[sync-punchpass-schedule] FAILURE:', message);

  const { data: status } = await supabaseAdmin
    .from('sync_status')
    .select('last_alert_at')
    .eq('name', 'punchpass-sync')
    .maybeSingle();

  const lastAlert = status?.last_alert_at ? new Date(status.last_alert_at as string) : null;
  const throttled = lastAlert ? Date.now() - lastAlert.getTime() < 24 * 60 * 60 * 1000 : false;

  await recordStatus(supabaseAdmin, {
    last_attempt_at: new Date().toISOString(),
    last_error: message,
    alerted: true,
    ...(throttled ? {} : { last_alert_at: new Date().toISOString() }),
  });

  if (!throttled) {
    await sendScheduleAlert(
      'Drake Fitness: class schedule sync failed',
      `<p>The automatic PunchPass schedule refresh failed.</p>
       <p><strong>Details:</strong> ${message}</p>
       <p>The previously synced schedule is left in place, and the website shows a "check PunchPass for the latest times" notice if it goes stale. You will not get another alert for 24 hours.</p>
       <p><a href="${SCHEDULE_URL}">View the PunchPass schedule</a></p>`,
    );
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  try {
    // --- Authentication: service-role header or rotatable cron key ---
    const authHeader = req.headers.get('Authorization');
    let isCronRequest = authHeader === `Bearer ${serviceRoleKey}`;

    let bodyText = '';
    try {
      bodyText = await req.text();
    } catch { /* ignore */ }
    let body: { source?: string; cron_secret?: string } = {};
    try {
      if (bodyText) body = JSON.parse(bodyText);
    } catch { /* ignore */ }

    const presentedSecret = body.cron_secret || req.headers.get('x-cron-secret') || '';
    if (!isCronRequest && presentedSecret) {
      const { data: keyRow } = await supabaseAdmin
        .from('cron_keys')
        .select('key')
        .eq('name', 'punchpass-sync')
        .maybeSingle();
      const expected = (keyRow?.key as string) || Deno.env.get('CRON_SECRET') || '';
      if (expected && presentedSecret === expected) isCronRequest = true;
    }

    console.log(
      `[sync-punchpass-schedule] Starting sync (source: ${body.source || (isCronRequest ? 'cron' : 'manual')})`,
    );

    await recordStatus(supabaseAdmin, { last_attempt_at: new Date().toISOString() });

    // --- Fetch the schedule page once, read it two independent ways ---
    const html = await fetchSchedulePage();
    console.log('Fetched schedule page, length:', html.length);

    const fromHtml = parseScheduleFromHtml(html);
    const fromJsonLd = parseScheduleFromJsonLd(html);
    console.log(`Reader A (layout): ${fromHtml.length} classes; Reader B (events data): ${fromJsonLd.length} classes`);

    const { classes, source } = mergeReaders(fromHtml, fromJsonLd);
    applyDefaultInstructors(classes);
    console.log(`Merged ${classes.length} classes (source: ${source})`);

    // --- Guard rails: never overwrite a good schedule with a bad parse ---
    const { data: prior } = await supabaseAdmin
      .from('sync_status')
      .select('rows_written, alerted')
      .eq('name', 'punchpass-sync')
      .maybeSingle();

    const previousCount = (prior?.rows_written as number) || 0;
    // Degraded = only the backup events reader worked (PunchPass layout changed).
    const degraded = fromHtml.length === 0;
    const problem = validateParsedSchedule(classes, previousCount, degraded);


    if (problem) {
      await recordStatus(supabaseAdmin, { source, rows_expected: previousCount });
      await handleFailure(supabaseAdmin, problem);
      return new Response(
        JSON.stringify({ success: false, error: problem, classes_parsed: classes.length }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (degraded) {
      // Reader B kept us alive — flag it even though the sync itself succeeded.
      await sendScheduleAlert(
        'Drake Fitness: PunchPass layout changed (schedule still working)',
        `<p>The PunchPass page layout changed, so the main schedule reader found nothing.</p>
         <p>The backup reader saved ${classes.length} upcoming classes, so the website is still accurate for the next few days — but the reader needs updating soon.</p>`,
      );
    }


    const uniqueDates = [...new Set(classes.map((c) => c.class_date))].sort();

    // Preserve instructors we already know for rows PunchPass left blank
    const { data: existingRows } = await supabaseAdmin
      .from('punchpass_schedule')
      .select('id, class_date, start_time, class_name, is_online, instructor')
      .in('class_date', uniqueDates);

    if (existingRows?.length) {
      for (const c of classes) {
        if (c.instructor) continue;
        const twin = existingRows.find(
          (e) => e.class_date === c.class_date && e.start_time === c.start_time && e.instructor,
        );
        if (twin) c.instructor = twin.instructor as string;
      }
    }

    // Remove classes that have already passed
    const today = new Date().toISOString().split('T')[0];
    await supabaseAdmin.from('punchpass_schedule').delete().lt('class_date', today);

    const { data: upsertData, error: upsertError } = await supabaseAdmin
      .from('punchpass_schedule')
      .upsert(
        classes.map((c) => ({ ...c, last_synced_at: new Date().toISOString() })),
        { onConflict: 'class_date,start_time,class_name,is_online', ignoreDuplicates: false },
      )
      .select();

    if (upsertError) {
      const msg = `Failed to save schedule: ${upsertError.message}`;
      await handleFailure(supabaseAdmin, msg);
      return new Response(JSON.stringify({ success: false, error: msg }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Remove cancelled classes still sitting in the synced date range.
    // Skipped in degraded mode: the backup reader only covers the next few
    // classes, so anything it "misses" is still a real class.
    const scrapedKeys = new Set(classes.map(conflictKey));
    if (!degraded && existingRows?.length) {
      const idsToDelete = existingRows
        .filter(
          (r) =>
            !scrapedKeys.has(`${r.class_date}|${r.start_time}|${r.class_name}|${r.is_online}`),
        )
        .map((r) => r.id);
      if (idsToDelete.length > 0) {
        await supabaseAdmin.from('punchpass_schedule').delete().in('id', idsToDelete);
        console.log(`Removed ${idsToDelete.length} cancelled/removed classes`);
      }
    }

    const rowsWritten = upsertData?.length || classes.length;

    await recordStatus(supabaseAdmin, {
      last_success_at: new Date().toISOString(),
      // Keep the healthy baseline while degraded so the drop check stays meaningful
      rows_written: degraded ? Math.max(previousCount, rowsWritten) : rowsWritten,
      rows_expected: previousCount,
      source,
      last_error: degraded
        ? 'Main layout reader found no classes — running on the backup events reader.'
        : null,
      alerted: degraded,
      ...(degraded ? {} : { last_alert_at: null }),
    });


    if (prior?.alerted && !degraded) {
      await sendScheduleAlert(
        'Drake Fitness: class schedule sync recovered',
        `<p>The PunchPass schedule refresh is working again — ${rowsWritten} classes were just synced.</p>`,
      );
    }

    console.log(`Successfully synced ${rowsWritten} classes across ${uniqueDates.length} dates`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Schedule synced successfully',
        classes_synced: rowsWritten,
        dates: uniqueDates.length,
        source,
        last_synced: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    await handleFailure(supabaseAdmin, msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
