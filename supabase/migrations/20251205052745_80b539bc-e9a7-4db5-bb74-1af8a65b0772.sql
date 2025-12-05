-- Create video access level enum
CREATE TYPE public.video_access_level AS ENUM ('public', 'member', 'vip');

-- Create video_categories table
CREATE TABLE public.video_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'Video',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.video_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view active categories
CREATE POLICY "Anyone can view active categories" ON public.video_categories
  FOR SELECT USING (is_active = true);

-- Admins can manage all categories
CREATE POLICY "Admins can manage categories" ON public.video_categories
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create videos table
CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  youtube_video_id text NOT NULL,
  thumbnail_url text,
  category_id uuid REFERENCES video_categories(id) ON DELETE SET NULL,
  access_level video_access_level DEFAULT 'member',
  duration_minutes integer,
  difficulty_level difficulty_level DEFAULT 'all_levels',
  coach_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  tags text[],
  view_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create video_progress table for tracking watch progress
CREATE TABLE public.video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE NOT NULL,
  watched_seconds integer DEFAULT 0,
  completed boolean DEFAULT false,
  last_watched_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

ALTER TABLE public.video_progress ENABLE ROW LEVEL SECURITY;

-- Users can manage their own progress
CREATE POLICY "Users can manage own video progress" ON public.video_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create can_access_video security definer function
CREATE OR REPLACE FUNCTION public.can_access_video(
  _user_id uuid, 
  _access_level video_access_level
)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _membership_plan_name text;
BEGIN
  -- Public videos accessible to everyone
  IF _access_level = 'public' THEN
    RETURN true;
  END IF;
  
  -- Check for active membership
  SELECT mp.name INTO _membership_plan_name
  FROM memberships m
  JOIN membership_plans mp ON m.plan_id = mp.id
  WHERE m.user_id = _user_id
    AND m.status = 'active';
  
  -- No active membership = no access to member/vip content
  IF _membership_plan_name IS NULL THEN
    RETURN false;
  END IF;
  
  -- Member content accessible to all active members
  IF _access_level = 'member' THEN
    RETURN true;
  END IF;
  
  -- VIP content only for "VIP Unlimited" members
  IF _access_level = 'vip' AND _membership_plan_name = 'VIP Unlimited' THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- RLS policies for videos table
-- Public can view active public videos
CREATE POLICY "Anyone can view public videos" ON public.videos
  FOR SELECT USING (is_active = true AND access_level = 'public');

-- Members can view videos based on access level
CREATE POLICY "Members can view allowed videos" ON public.videos
  FOR SELECT USING (
    is_active = true 
    AND can_access_video(auth.uid(), access_level)
  );

-- Admins can manage all videos
CREATE POLICY "Admins can manage videos" ON public.videos
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger for videos
CREATE TRIGGER set_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.video_categories (name, slug, description, icon, sort_order) VALUES
  ('Movement Foundations', 'movement-foundations', 'Basic mobility and movement patterns', 'Activity', 1),
  ('Strength Training', 'strength-training', 'Kettlebell, barbell, and bodyweight tutorials', 'Dumbbell', 2),
  ('Recovery & Mobility', 'recovery-mobility', 'Stretching, foam rolling, recovery protocols', 'Heart', 3),
  ('Technique Deep Dives', 'technique-deep-dives', 'Detailed form breakdowns (VIP exclusive)', 'Target', 4),
  ('Coach Q&A', 'coach-qa', 'Live session recordings (VIP exclusive)', 'MessageCircle', 5);