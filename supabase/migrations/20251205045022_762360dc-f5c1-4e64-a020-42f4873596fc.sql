-- Drake Fitness Studio Management Platform - Foundation Tables
-- Phase 1: Core user management, roles, and memberships

-- Create enums for type safety
CREATE TYPE public.app_role AS ENUM ('admin', 'coach', 'member');
CREATE TYPE public.membership_status AS ENUM ('active', 'paused', 'cancelled', 'expired', 'pending');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'completed', 'no_show');
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'all_levels');

-- 1. Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    date_of_birth DATE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    health_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. User roles table (CRITICAL: separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Membership plans table
CREATE TABLE public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_interval TEXT NOT NULL DEFAULT 'month',
    class_credits INT,
    unlimited_classes BOOLEAN DEFAULT false,
    stripe_price_id TEXT UNIQUE,
    stripe_product_id TEXT,
    is_active BOOLEAN DEFAULT true,
    features JSONB DEFAULT '[]',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Memberships table (user subscriptions)
CREATE TABLE public.memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    plan_id UUID REFERENCES public.membership_plans(id) NOT NULL,
    status public.membership_status DEFAULT 'pending',
    remaining_credits INT,
    current_period_start DATE,
    current_period_end DATE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    cancel_at_period_end BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Helper function to get user's primary role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role
    FROM public.user_roles
    WHERE user_id = _user_id
    ORDER BY 
        CASE role 
            WHEN 'admin' THEN 1 
            WHEN 'coach' THEN 2 
            WHEN 'member' THEN 3 
        END
    LIMIT 1
$$;

-- Trigger function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
        NEW.id, 
        NEW.email,
        NEW.raw_user_meta_data ->> 'first_name',
        NEW.raw_user_meta_data ->> 'last_name'
    );
    
    -- Assign default 'member' role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'member');
    
    RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_membership_plans_updated_at
    BEFORE UPDATE ON public.membership_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
    BEFORE UPDATE ON public.memberships
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Admins can manage profiles"
    ON public.profiles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
    ON public.user_roles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for membership_plans
CREATE POLICY "Anyone can view active plans"
    ON public.membership_plans FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage plans"
    ON public.membership_plans FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for memberships
CREATE POLICY "Users can view own membership"
    ON public.memberships FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all memberships"
    ON public.memberships FOR SELECT
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Admins can manage memberships"
    ON public.memberships FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- Seed membership plans with actual Drake Fitness pricing
INSERT INTO public.membership_plans (name, description, price, billing_interval, class_credits, unlimited_classes, features, sort_order) VALUES
('Drop-In', 'Single class access - perfect for visitors or trying a specific class', 40.00, 'one_time', 1, false, '["Access to any class type", "No commitment required"]', 1),
('8 Classes', 'Perfect for beginners or busy schedules', 199.00, 'month', 8, false, '["8 classes per month", "Movement assessment included", "Access to all class types", "Progress tracking"]', 2),
('Unlimited', 'Train as often as you like', 249.00, 'month', NULL, true, '["Unlimited classes", "Priority booking window", "Quarterly goal reviews", "Guest pass per month"]', 3),
('VIP Unlimited', 'Unlimited group classes + monthly 1:1 coaching', 299.00, 'month', NULL, true, '["Unlimited classes", "1 monthly 1:1 session", "Personalized programming notes", "Nutritional guidance"]', 4);