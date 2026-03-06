
CREATE TABLE public.page_og_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text UNIQUE NOT NULL,
  image_filename text NOT NULL,
  source_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.page_og_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage OG images"
  ON public.page_og_images FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view OG images"
  ON public.page_og_images FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('og-images', 'og-images', true);

CREATE POLICY "Admins can upload OG images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'og-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view OG bucket images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'og-images');
