-- Create contract type enum
CREATE TYPE public.contract_type AS ENUM ('waiver', 'agreement', 'terms', 'other');

-- Create contract templates table
CREATE TABLE public.contract_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  contract_type public.contract_type NOT NULL DEFAULT 'waiver',
  requires_signature BOOLEAN DEFAULT true,
  is_required_for_booking BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member contracts table (signed contracts)
CREATE TABLE public.member_contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES public.contract_templates(id) ON DELETE RESTRICT,
  template_version INTEGER NOT NULL,
  signature_data TEXT,
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, template_id, template_version)
);

-- Enable RLS
ALTER TABLE public.contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_contracts ENABLE ROW LEVEL SECURITY;

-- RLS for contract_templates
CREATE POLICY "Anyone can view active templates"
ON public.contract_templates
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage templates"
ON public.contract_templates
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- RLS for member_contracts
CREATE POLICY "Users can view own contracts"
ON public.member_contracts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can sign contracts"
ON public.member_contracts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all contracts"
ON public.member_contracts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Staff can view all contracts"
ON public.member_contracts
FOR SELECT
USING (public.has_role(auth.uid(), 'coach'::public.app_role));

-- Create updated_at trigger
CREATE TRIGGER update_contract_templates_updated_at
BEFORE UPDATE ON public.contract_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if user has signed required contracts
CREATE OR REPLACE FUNCTION public.has_signed_required_contracts(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.contract_templates ct
    WHERE ct.is_active = true
      AND ct.is_required_for_booking = true
      AND NOT EXISTS (
        SELECT 1 FROM public.member_contracts mc
        WHERE mc.user_id = _user_id
          AND mc.template_id = ct.id
          AND mc.template_version = ct.version
      )
  );
END;
$$;

-- Insert default liability waiver template
INSERT INTO public.contract_templates (name, slug, content, contract_type, requires_signature, is_required_for_booking) VALUES
(
  'Liability Waiver',
  'liability-waiver',
  '# Drake Fitness Liability Waiver and Release

## Assumption of Risk

I, the undersigned, acknowledge that I am voluntarily participating in physical fitness activities at Drake Fitness. I understand that these activities involve inherent risks, including but not limited to:

- Physical injury from exercise equipment or activities
- Muscle strains, sprains, or other soft tissue injuries
- Cardiovascular stress
- Falls or accidents during exercise

## Release of Liability

By signing this waiver, I agree to release, waive, discharge, and covenant not to sue Drake Fitness, its owners, employees, coaches, and agents from any and all liability, claims, demands, actions, or causes of action arising from my participation in fitness activities.

## Health Certification

I certify that:
- I am in good physical health and have no medical conditions that would prevent safe participation
- I have consulted with a physician if I have any concerns about my ability to exercise
- I will immediately notify staff of any discomfort, pain, or unusual symptoms during exercise

## Emergency Medical Treatment

I authorize Drake Fitness staff to seek emergency medical treatment on my behalf if necessary. I understand that I am responsible for any medical expenses incurred.

## Acknowledgment

I have read this waiver carefully, understand its terms, and sign it voluntarily. This waiver shall remain in effect for the duration of my membership at Drake Fitness.

**By signing below, I acknowledge that I have read, understand, and agree to all terms of this Liability Waiver.**',
  'waiver',
  true,
  true
),
(
  'Photo/Video Release',
  'photo-video-release',
  '# Drake Fitness Photo and Video Release

## Consent to Use of Image

I hereby grant Drake Fitness and its representatives the right to photograph, video record, and use my image, likeness, and voice in any media for the following purposes:

- Marketing and promotional materials
- Social media content
- Website content
- Advertising campaigns
- Training and educational materials

## Terms of Release

- I understand that my image may be edited, altered, or combined with other content
- I waive any right to inspect or approve the finished product
- I release Drake Fitness from any claims related to the use of my image
- This release is valid unless I provide written notice of revocation

## No Compensation

I understand that I will not receive any compensation for the use of my image or likeness.

**By signing below, I consent to the terms of this Photo and Video Release.**',
  'agreement',
  true,
  false
);