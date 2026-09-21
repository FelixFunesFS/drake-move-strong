ALTER TABLE public.sync_status
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS rows_expected integer NOT NULL DEFAULT 0;