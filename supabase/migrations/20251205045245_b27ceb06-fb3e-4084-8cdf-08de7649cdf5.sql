-- Drake Fitness Studio Management Platform - Phase 2: Class Booking System
-- Class types, schedules, and bookings

-- 1. Class types table (Foundation Flow, KB Strong, etc.)
CREATE TABLE public.class_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    difficulty_level public.difficulty_level DEFAULT 'all_levels',
    default_duration INT DEFAULT 60,
    default_capacity INT DEFAULT 12,
    badge_label TEXT,
    badge_variant TEXT DEFAULT 'default',
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Classes table (templates linking class type to coach)
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_type_id UUID REFERENCES public.class_types(id) NOT NULL,
    coach_id UUID REFERENCES auth.users(id),
    location TEXT DEFAULT 'Drake Fitness Studio',
    is_online BOOLEAN DEFAULT false,
    zoom_link TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Class schedules table (actual scheduled instances)
CREATE TABLE public.class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) NOT NULL,
    coach_id UUID REFERENCES auth.users(id),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    capacity INT NOT NULL DEFAULT 12,
    booked_count INT DEFAULT 0,
    status TEXT DEFAULT 'scheduled',
    is_recurring BOOLEAN DEFAULT false,
    recurrence_rule TEXT,
    parent_schedule_id UUID REFERENCES public.class_schedules(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Bookings table
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    schedule_id UUID REFERENCES public.class_schedules(id) ON DELETE CASCADE NOT NULL,
    status public.booking_status DEFAULT 'confirmed',
    checked_in BOOLEAN DEFAULT false,
    checked_in_at TIMESTAMPTZ,
    booked_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    credits_used INT DEFAULT 1,
    UNIQUE (user_id, schedule_id)
);

-- 5. Waitlist table
CREATE TABLE public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    schedule_id UUID REFERENCES public.class_schedules(id) ON DELETE CASCADE NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    notified_at TIMESTAMPTZ,
    UNIQUE (user_id, schedule_id)
);

-- Enable RLS on all tables
ALTER TABLE public.class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for class_types (public read)
CREATE POLICY "Anyone can view active class types"
    ON public.class_types FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage class types"
    ON public.class_types FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for classes (public read)
CREATE POLICY "Anyone can view classes"
    ON public.classes FOR SELECT
    USING (true);

CREATE POLICY "Staff can manage classes"
    ON public.classes FOR ALL
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

-- RLS Policies for class_schedules (public read)
CREATE POLICY "Anyone can view schedules"
    ON public.class_schedules FOR SELECT
    USING (true);

CREATE POLICY "Staff can manage schedules"
    ON public.class_schedules FOR ALL
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings"
    ON public.bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
    ON public.bookings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all bookings"
    ON public.bookings FOR SELECT
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Admins can manage all bookings"
    ON public.bookings FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for waitlist
CREATE POLICY "Users can view own waitlist entries"
    ON public.waitlist FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own waitlist entries"
    ON public.waitlist FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all waitlist"
    ON public.waitlist FOR SELECT
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

-- Create indexes for performance
CREATE INDEX idx_class_schedules_start_time ON public.class_schedules(start_time);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_schedule_id ON public.bookings(schedule_id);
CREATE INDEX idx_waitlist_schedule_id ON public.waitlist(schedule_id);

-- Seed class types based on current Schedule page
INSERT INTO public.class_types (name, description, difficulty_level, default_duration, default_capacity, badge_label, badge_variant, sort_order) VALUES
('Foundation Flow™', 'Mobility + Strength fundamentals. Perfect for beginners or as active recovery.', 'beginner', 60, 12, 'Beginner Friendly', 'secondary', 1),
('Functional Strength™', 'Full-body strength training using kettlebells, sandbags, and bodyweight.', 'all_levels', 60, 12, 'All Levels', 'default', 2),
('Mobility Reset™', 'Deep stretch and mobility work to improve range of motion and recovery.', 'all_levels', 45, 15, 'Recovery', 'outline', 3),
('KB Strong™', 'Advanced kettlebell training for experienced members.', 'advanced', 60, 10, 'Advanced', 'destructive', 4),
('Functional Flow Online™', 'Live Zoom class - movement and mobility from anywhere.', 'all_levels', 45, 20, 'Live Zoom', 'secondary', 5),
('Weekend Warrior™', 'Community-focused strength session to kick off your weekend.', 'all_levels', 75, 15, 'Community', 'default', 6);