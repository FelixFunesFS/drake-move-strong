import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SCHEDULE_URL = 'https://drakefitness.punchpass.com/classes';
const ALERT_RECIPIENT = 'envision@mkqconsulting.com';
const ALERT_FROM = 'Drake Fitness Alerts <intake@drake.fitness>';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';

interface ClassData {
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  location: string | null;
  instructor: string | null;
  spots_remaining: number | null;
  spots_total: number | null;
  is_online: boolean;
  punchpass_url: string | null;
  raw_time_string: string | null;
}

// Instructors PunchPass sometimes omits — filled in by class name
const DEFAULT_INSTRUCTORS: Record<string, string> = {
  'kettlebell flow': 'David',
  ruckathon: 'David',
  yoga: 'Misty',
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function parseTime(raw: string): { hours: number; minutes: number } | null {
  const m = raw.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!m) return null;
  let hours = parseInt(m[1]);
  const minutes = parseInt(m[2]);
  const period = m[3]?.toLowerCase();
  if (period === 'pm' && hours !== 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return { hours, minutes };
}

const fmt = (h: number, m: number) =>
  `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;

function parseDuration(raw: string | null): number {
  if (!raw) return 60;
  let total = 0;
  const hr = raw.match(/(\d+(?:\.\d+)?)\s*hour/i);
  const min = raw.match(/(\d+)\s*min/i);
  if (hr) total += Math.round(parseFloat(hr[1]) * 60);
  if (min) total += parseInt(min[1]);
  return total || 60;
}

/**
 * Parses the PunchPass calendar-list markup.
 * Each day is a <section id="date-YYYY-MM-DD"> holding
 * <li class="calendar-list-instance-row"> entries.
 */
export function parseScheduleFromHtml(html: string): ClassData[] {
  const classes: ClassData[] = [];
  const dateSections = html.split(/<section id="date-(\d{4}-\d{2}-\d{2})"/);

  for (let i = 1; i < dateSections.length; i += 2) {
    const classDate = dateSections[i];
    const block = dateSections[i + 1] || '';
    const rows = block.split(/<li class="calendar-list-instance-row/).slice(1);

    for (const row of rows) {
      const timeMatch = row.match(/<time[^>]*>([^<]+)<\/time>/i);
      const titleMatch = row.match(/list-instance-row-title[^>]*>([\s\S]*?)<\/div>/i);
      if (!timeMatch || !titleMatch) continue;

      const parsed = parseTime(timeMatch[1]);
      if (!parsed) continue;

      const title = decode(titleMatch[1]);
      if (!title) continue;

      const hrefMatch = row.match(/href="(https:\/\/[^"]*\/classes\/\d+)"/i);
      const instructorMatch = row.match(/name="user"[^>]*><\/wa-icon>([^<]*)/i);
      const durationMatch = row.match(/name="clock"[\s\S]{0,160}?wa-text-nowrap">([^<]+)</i);
      const locationMatch = row.match(/name="location-dot"[^>]*><\/wa-icon>([^<]*)/i);
      const spotsMatch = row.match(/(\d+)\s*spots?\s*left/i);
      const isFull = /\b(class is full|sold out|waitlist)\b/i.test(row);

      const duration = parseDuration(durationMatch ? durationMatch[1] : null);
      const endTotal = parsed.hours * 60 + parsed.minutes + duration;
      const location = locationMatch ? decode(locationMatch[1]) || null : null;
      const instructor = instructorMatch ? decode(instructorMatch[1]) || null : null;

      classes.push({
        class_name: title,
        class_date: classDate,
        start_time: fmt(parsed.hours, parsed.minutes),
        end_time: fmt(Math.floor(endTotal / 60) % 24, endTotal % 60),
        duration_minutes: duration,
        location,
        instructor,
        spots_remaining: spotsMatch ? parseInt(spotsMatch[1]) : isFull ? 0 : null,
        spots_total: null,
        is_online:
          /zoom|online|virtual/i.test(title) || /zoom|online|virtual/i.test(location || ''),
        punchpass_url: hrefMatch ? hrefMatch[1] : null,
        raw_time_string: decode(timeMatch[1]),
      });
    }
  }

  return classes;
}

function applyDefaultInstructors(classes: ClassData[]) {
  for (const c of classes) {
    if (c.instructor) continue;
    const name = c.class_name.toLowerCase();
    for (const [key, instructor] of Object.entries(DEFAULT_INSTRUCTORS)) {
      if (name.includes(key)) {
        c.instructor = instructor;
        break;
      }
    }
  }
}

async function sendAlert(subject: string, body: string) {
  const lovableKey = Deno.env.get('LOVABLE_API_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!lovableKey || !resendKey) {
    console.warn('Alert email skipped: email keys not configured');
    return;
  }
  try {
    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lovableKey}`,
        'X-Connection-Api-Key': resendKey,
      },
      body: JSON.stringify({
        from: ALERT_FROM,
        to: [ALERT_RECIPIENT],
        subject,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1A1A1A">${body}</div>`,
      }),
    });
    if (!res.ok) {
      console.error(`Alert email failed [${res.status}]: ${await res.text()}`);
    }
  } catch (e) {
    console.error('Alert email error:', e);
  }
}

type AdminClient = ReturnType<typeof createClient>;

async function recordStatus(
  supabaseAdmin: AdminClient,
  update: Record<string, unknown>,
) {
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
    await sendAlert(
      'Drake Fitness: class schedule sync failed',
      `<p>The automatic PunchPass schedule refresh failed.</p>
       <p><strong>Details:</strong> ${message}</p>
       <p>The website is showing a "check PunchPass for the latest times" notice until the next successful refresh. You will not get another alert for 24 hours.</p>
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

    // --- Fetch the schedule page directly (server-rendered, no scraper needed) ---
    const pageResponse = await fetch(SCHEDULE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DrakeFitnessSync/1.0)',
        Accept: 'text/html',
        'Cache-Control': 'no-cache',
      },
    });

    if (!pageResponse.ok) {
      const msg = `PunchPass returned HTTP ${pageResponse.status}`;
      await handleFailure(supabaseAdmin, msg);
      return new Response(JSON.stringify({ success: false, error: msg }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await pageResponse.text();
    console.log('Fetched schedule page, length:', html.length);

    const classes = parseScheduleFromHtml(html);
    applyDefaultInstructors(classes);
    console.log(`Parsed ${classes.length} classes`);

    if (classes.length === 0) {
      const msg =
        'No classes parsed from the PunchPass page — the page layout may have changed again.';
      await handleFailure(supabaseAdmin, msg);
      return new Response(
        JSON.stringify({ success: false, error: msg, classes_synced: 0 }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
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

    // Remove cancelled classes still sitting in the synced date range
    const scrapedKeys = new Set(
      classes.map((c) => `${c.class_date}|${c.start_time}|${c.class_name}|${c.is_online}`),
    );
    if (existingRows?.length) {
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

    // Recovery notice if the previous run had alerted
    const { data: prevStatus } = await supabaseAdmin
      .from('sync_status')
      .select('alerted')
      .eq('name', 'punchpass-sync')
      .maybeSingle();

    await recordStatus(supabaseAdmin, {
      last_success_at: new Date().toISOString(),
      rows_written: rowsWritten,
      last_error: null,
      alerted: false,
      last_alert_at: null,
    });

    if (prevStatus?.alerted) {
      await sendAlert(
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
