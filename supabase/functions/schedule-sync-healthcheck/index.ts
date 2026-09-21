import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import {
  fetchSchedulePage,
  parseScheduleFromHtml,
  parseScheduleFromJsonLd,
  SCHEDULE_URL,
} from '../_shared/punchpassParser.ts';
import { sendScheduleAlert } from '../_shared/scheduleAlerts.ts';

/**
 * Daily read-only self-test: confirms both PunchPass readers still find classes.
 * Writes nothing to the schedule — it only warns when a reader starts drifting,
 * so a layout change is caught before it can affect the website.
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  // Same auth model as the sync function: service-role header or the rotatable cron key.
  const authHeader = req.headers.get('Authorization');
  let authorized = authHeader === `Bearer ${serviceRoleKey}`;

  let body: { cron_secret?: string } = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch { /* ignore */ }

  const presentedSecret = body.cron_secret || req.headers.get('x-cron-secret') || '';
  if (!authorized && presentedSecret) {
    const { data: keyRow } = await supabaseAdmin
      .from('cron_keys')
      .select('key')
      .eq('name', 'punchpass-sync')
      .maybeSingle();
    const expected = (keyRow?.key as string) || Deno.env.get('CRON_SECRET') || '';
    if (expected && presentedSecret === expected) authorized = true;
  }

  if (!authorized) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const html = await fetchSchedulePage();
    const htmlCount = parseScheduleFromHtml(html).length;
    const jsonLdCount = parseScheduleFromJsonLd(html).length;
    console.log(`[healthcheck] layout reader: ${htmlCount}, events reader: ${jsonLdCount}`);

    const problems: string[] = [];
    if (htmlCount === 0) problems.push('the main layout reader found no classes');
    if (jsonLdCount === 0) problems.push('the backup events reader found no classes');

    if (problems.length > 0) {
      await sendScheduleAlert(
        'Drake Fitness: PunchPass schedule reader needs attention',
        `<p>The daily schedule self-test found a problem: ${problems.join(' and ')}.</p>
         <p>Main layout reader: ${htmlCount} classes. Backup events reader: ${jsonLdCount} classes.</p>
         <p>${
           htmlCount > 0 || jsonLdCount > 0
             ? 'The website schedule is still being updated by the reader that works, but the other one should be fixed.'
             : 'The website schedule can no longer be updated automatically and will show a "check PunchPass" notice.'
         }</p>
         <p><a href="${SCHEDULE_URL}">View the PunchPass schedule</a></p>`,
      );
    }

    return new Response(
      JSON.stringify({ success: problems.length === 0, htmlCount, jsonLdCount, problems }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[healthcheck] failed:', msg);
    await sendScheduleAlert(
      'Drake Fitness: PunchPass schedule self-test failed',
      `<p>The daily schedule self-test could not reach PunchPass.</p><p><strong>Details:</strong> ${msg}</p>`,
    );
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
