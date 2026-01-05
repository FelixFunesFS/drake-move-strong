-- Create punchpass_schedule table for storing scraped schedule data
CREATE TABLE public.punchpass_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name TEXT NOT NULL,
  class_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT,
  instructor TEXT,
  spots_remaining INTEGER,
  spots_total INTEGER,
  is_online BOOLEAN DEFAULT false,
  punchpass_url TEXT,
  raw_time_string TEXT,
  last_synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_date, start_time, class_name, is_online)
);

-- Enable RLS
ALTER TABLE public.punchpass_schedule ENABLE ROW LEVEL SECURITY;

-- Public read access for website widgets
CREATE POLICY "Anyone can view schedule" 
ON public.punchpass_schedule 
FOR SELECT 
USING (true);

-- Only system can insert/update (via edge function with service role)
CREATE POLICY "System can manage schedule" 
ON public.punchpass_schedule 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create index for common queries
CREATE INDEX idx_punchpass_schedule_date ON public.punchpass_schedule(class_date);
CREATE INDEX idx_punchpass_schedule_datetime ON public.punchpass_schedule(class_date, start_time);