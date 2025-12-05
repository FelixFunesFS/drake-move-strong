-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create promotions table for seasonal/campaign announcements
CREATE TABLE public.promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_type TEXT NOT NULL DEFAULT 'banner' CHECK (display_type IN ('banner', 'popup', 'floating')),
  background_color TEXT DEFAULT '#0B4A52',
  text_color TEXT DEFAULT '#FFFFFF',
  accent_color TEXT DEFAULT '#F2B544',
  target_pages TEXT[] DEFAULT ARRAY['all'],
  dismissible BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Public read access for active promotions (no auth required for viewing)
CREATE POLICY "Anyone can view active promotions"
ON public.promotions
FOR SELECT
USING (is_active = true AND (end_date IS NULL OR end_date > now()));

-- Create updated_at trigger
CREATE TRIGGER update_promotions_updated_at
BEFORE UPDATE ON public.promotions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the New Year promotion as initial data
INSERT INTO public.promotions (title, description, cta_text, cta_link, start_date, end_date, background_color, accent_color, target_pages, priority)
VALUES (
  '🎉 New Year Special: 50% Off First Month!',
  'Start 2026 stronger — unlimited classes for just $99',
  'Claim Offer',
  '/new-year',
  '2025-12-01T00:00:00-05:00',
  '2026-01-31T23:59:59-05:00',
  '#0B4A52',
  '#F2B544',
  ARRAY['all'],
  10
);