-- Update the cron job schedule to run 4 times per day instead of once
-- New schedule: 5:00 AM, 11:00 AM, 5:00 PM, 11:00 PM UTC (every 6 hours)

SELECT cron.unschedule('sync-punchpass-daily');

SELECT cron.schedule(
  'sync-punchpass-daily',
  '0 5,11,17,23 * * *',
  $$
  SELECT net.http_post(
    url := 'https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/sync-punchpass-schedule',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"source": "cron", "cron_secret": "drake-punchpass-sync-7xK9mP2nQ4rL8wZ"}'::jsonb
  ) AS request_id;
  $$
);