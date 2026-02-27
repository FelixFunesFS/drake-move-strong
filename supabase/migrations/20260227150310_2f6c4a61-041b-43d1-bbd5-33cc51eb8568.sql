
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  seo_title text,
  excerpt text NOT NULL,
  content text DEFAULT '',
  category text NOT NULL,
  author text NOT NULL,
  published_at date NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  thumbnail_url text,
  og_image text,
  video_id text,
  featured boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active posts" ON public.blog_posts
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
