-- 1. Split the anon-visible workout template exercises policy so it never calls has_role for anon
DROP POLICY IF EXISTS "Anyone can view template exercises for accessible templates" ON public.workout_template_exercises;

CREATE POLICY "Anyone can view exercises for public templates"
ON public.workout_template_exercises
FOR SELECT
TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.workout_templates wt
  WHERE wt.id = workout_template_exercises.template_id AND wt.is_public = true
));

CREATE POLICY "Staff can view all template exercises"
ON public.workout_template_exercises
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

-- 2. Restrict every remaining role-checking policy to authenticated users only
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND roles = '{public}'
      AND (coalesce(qual,'') || coalesce(with_check,'')) ~ 'has_role|can_access_video|get_user_role|has_signed_required_contracts'
  LOOP
    EXECUTE format('ALTER POLICY %I ON %I.%I TO authenticated', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- 3. Remove anonymous execute rights on SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_access_video(uuid, video_access_level) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_video(uuid, video_access_level) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.has_signed_required_contracts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_signed_required_contracts(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.get_user_role(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 4. Lock down client-side inserts into leads and notification_log (written by edge functions with service role)
DROP POLICY IF EXISTS "Chatbot can insert leads" ON public.leads;
DROP POLICY IF EXISTS "System can insert notification logs" ON public.notification_log;

REVOKE INSERT ON public.leads FROM anon, authenticated;
REVOKE INSERT ON public.notification_log FROM anon, authenticated;
GRANT ALL ON public.leads TO service_role;
GRANT ALL ON public.notification_log TO service_role;

-- 5. Rotatable cron key stored in the database instead of source control
CREATE TABLE IF NOT EXISTS public.cron_keys (
  name text PRIMARY KEY,
  key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.cron_keys TO service_role;
ALTER TABLE public.cron_keys ENABLE ROW LEVEL SECURITY;
-- No policies: only service_role (which bypasses RLS) may read or write this table.

INSERT INTO public.cron_keys (name, key)
VALUES ('punchpass-sync', encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (name) DO UPDATE SET key = excluded.key;

SELECT cron.unschedule('sync-punchpass-every-4h');

SELECT cron.schedule(
  'sync-punchpass-every-4h',
  '0 1,5,9,13,17,21 * * *',
  $$
  SELECT net.http_post(
    url := 'https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/sync-punchpass-schedule',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'source', 'cron',
      'cron_secret', (SELECT key FROM public.cron_keys WHERE name = 'punchpass-sync')
    )
  ) AS request_id;
  $$
);