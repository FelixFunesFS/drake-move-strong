-- Create focus_area enum for workouts
CREATE TYPE public.focus_area AS ENUM ('strength', 'mobility', 'cardio', 'hybrid');

-- Create workout_status enum
CREATE TYPE public.workout_status AS ENUM ('active', 'completed', 'paused');

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  muscle_groups TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  difficulty_level difficulty_level DEFAULT 'all_levels',
  video_id UUID REFERENCES public.videos(id) ON DELETE SET NULL,
  thumbnail_url TEXT,
  cues TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout_templates table
CREATE TABLE public.workout_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  focus_area focus_area DEFAULT 'strength',
  difficulty_level difficulty_level DEFAULT 'all_levels',
  estimated_duration_minutes INTEGER,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout_template_exercises table (junction table)
CREATE TABLE public.workout_template_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.workout_templates(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  sets INTEGER,
  reps TEXT,
  duration_seconds INTEGER,
  rest_seconds INTEGER DEFAULT 60,
  notes TEXT,
  superset_group INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member_workout_plans table
CREATE TABLE public.member_workout_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES public.workout_templates(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status workout_status DEFAULT 'active',
  custom_notes TEXT,
  frequency_per_week INTEGER DEFAULT 3,
  day_assignments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout_logs table
CREATE TABLE public.workout_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.member_workout_plans(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.workout_templates(id) ON DELETE SET NULL,
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  exercises_completed JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_template_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

-- Exercises policies (anyone can view active, staff can manage)
CREATE POLICY "Anyone can view active exercises"
  ON public.exercises FOR SELECT
  USING (is_active = true);

CREATE POLICY "Staff can manage exercises"
  ON public.exercises FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

-- Workout templates policies
CREATE POLICY "Anyone can view public active templates"
  ON public.workout_templates FOR SELECT
  USING (is_active = true AND is_public = true);

CREATE POLICY "Staff can view all templates"
  ON public.workout_templates FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

CREATE POLICY "Staff can manage templates"
  ON public.workout_templates FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

-- Workout template exercises policies
CREATE POLICY "Anyone can view template exercises for accessible templates"
  ON public.workout_template_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_templates wt
      WHERE wt.id = template_id
      AND (wt.is_public = true OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'))
    )
  );

CREATE POLICY "Staff can manage template exercises"
  ON public.workout_template_exercises FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

-- Member workout plans policies
CREATE POLICY "Users can view own plans"
  ON public.member_workout_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all plans"
  ON public.member_workout_plans FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

CREATE POLICY "Staff can manage plans"
  ON public.member_workout_plans FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

-- Workout logs policies
CREATE POLICY "Users can manage own logs"
  ON public.workout_logs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all logs"
  ON public.workout_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'coach'));

-- Create triggers for updated_at
CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workout_templates_updated_at
  BEFORE UPDATE ON public.workout_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_member_workout_plans_updated_at
  BEFORE UPDATE ON public.member_workout_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_exercises_muscle_groups ON public.exercises USING GIN(muscle_groups);
CREATE INDEX idx_exercises_equipment ON public.exercises USING GIN(equipment);
CREATE INDEX idx_workout_template_exercises_template ON public.workout_template_exercises(template_id);
CREATE INDEX idx_member_workout_plans_user ON public.member_workout_plans(user_id);
CREATE INDEX idx_member_workout_plans_status ON public.member_workout_plans(status);
CREATE INDEX idx_workout_logs_user ON public.workout_logs(user_id);
CREATE INDEX idx_workout_logs_date ON public.workout_logs(workout_date);