CREATE TABLE public.sync_status (
  name text PRIMARY KEY,
  last_attempt_at timestamptz,
  last_success_at timestamptz,
  rows_written integer NOT NULL DEFAULT 0,
  last_error text,
  alerted boolean NOT NULL DEFAULT false,
  last_alert_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sync_status TO authenticated;
GRANT ALL ON public.sync_status TO service_role;

ALTER TABLE public.sync_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view sync status"
ON public.sync_status
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_sync_status_updated_at
BEFORE UPDATE ON public.sync_status
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.sync_status (name) VALUES ('punchpass-sync') ON CONFLICT DO NOTHING;