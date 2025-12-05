-- Create notification templates table
CREATE TABLE public.notification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  description TEXT,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification log table
CREATE TABLE public.notification_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.notification_templates(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  variables JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification_templates (admin read/write)
CREATE POLICY "Admins can manage notification templates"
ON public.notification_templates
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- RLS policies for notification_log (admin can view all, users can view their own)
CREATE POLICY "Admins can view all notification logs"
ON public.notification_log
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Users can view their own notification logs"
ON public.notification_log
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert notification logs"
ON public.notification_log
FOR INSERT
WITH CHECK (true);

-- Create updated_at trigger for templates
CREATE TRIGGER update_notification_templates_updated_at
BEFORE UPDATE ON public.notification_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default notification templates
INSERT INTO public.notification_templates (name, slug, subject, html_content, text_content, description, variables) VALUES
(
  'Booking Confirmation',
  'booking-confirmation',
  'Your class is booked: {{class_name}}',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #0B4A52;">Booking Confirmed!</h1>
    <p>Hi {{member_name}},</p>
    <p>Your spot is confirmed for:</p>
    <div style="background: #F4F4F4; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #0B4A52; margin: 0;">{{class_name}}</h2>
      <p style="margin: 10px 0 0;"><strong>Date:</strong> {{class_date}}</p>
      <p style="margin: 5px 0;"><strong>Time:</strong> {{class_time}}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> {{location}}</p>
    </div>
    <p>See you there!</p>
    <p style="color: #6A6A6A;">— The Drake Fitness Team</p>
  </div>',
  'Booking Confirmed!\n\nHi {{member_name}},\n\nYour spot is confirmed for:\n{{class_name}}\nDate: {{class_date}}\nTime: {{class_time}}\nLocation: {{location}}\n\nSee you there!\n\n— The Drake Fitness Team',
  'Sent when a member successfully books a class',
  '["member_name", "class_name", "class_date", "class_time", "location"]'
),
(
  'Waitlist Spot Available',
  'waitlist-spot-available',
  'A spot opened up for {{class_name}}!',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #F2B544;">A Spot Just Opened Up!</h1>
    <p>Hi {{member_name}},</p>
    <p>Great news! A spot has become available for the class you were waiting for:</p>
    <div style="background: #F4F4F4; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #0B4A52; margin: 0;">{{class_name}}</h2>
      <p style="margin: 10px 0 0;"><strong>Date:</strong> {{class_date}}</p>
      <p style="margin: 5px 0;"><strong>Time:</strong> {{class_time}}</p>
    </div>
    <p style="color: #E74C3C;"><strong>⚠️ Act fast!</strong> You have {{claim_window}} to claim your spot before it goes to the next person on the waitlist.</p>
    <a href="{{booking_url}}" style="display: inline-block; background: #F2B544; color: #1A1A1A; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0;">Claim Your Spot</a>
    <p style="color: #6A6A6A;">— The Drake Fitness Team</p>
  </div>',
  'A Spot Just Opened Up!\n\nHi {{member_name}},\n\nGreat news! A spot has become available for:\n{{class_name}}\nDate: {{class_date}}\nTime: {{class_time}}\n\n⚠️ Act fast! You have {{claim_window}} to claim your spot.\n\nClaim your spot: {{booking_url}}\n\n— The Drake Fitness Team',
  'Sent when a waitlisted member gets a spot',
  '["member_name", "class_name", "class_date", "class_time", "claim_window", "booking_url"]'
),
(
  'Membership Expiring Soon',
  'membership-expiring',
  'Your Drake Fitness membership expires in {{days_remaining}} days',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #0B4A52;">Membership Renewal Reminder</h1>
    <p>Hi {{member_name}},</p>
    <p>Your <strong>{{plan_name}}</strong> membership is set to expire on <strong>{{expiry_date}}</strong>.</p>
    <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F2B544;">
      <p style="margin: 0;"><strong>{{days_remaining}} days remaining</strong></p>
    </div>
    <p>Don''t lose access to your classes and coaching sessions. Renew today to continue your fitness journey with us!</p>
    <a href="{{renewal_url}}" style="display: inline-block; background: #0B4A52; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0;">Renew Membership</a>
    <p>Questions? Reply to this email or call us at (843) 817-5420.</p>
    <p style="color: #6A6A6A;">— The Drake Fitness Team</p>
  </div>',
  'Membership Renewal Reminder\n\nHi {{member_name}},\n\nYour {{plan_name}} membership expires on {{expiry_date}}.\n\n{{days_remaining}} days remaining\n\nRenew today: {{renewal_url}}\n\nQuestions? Call us at (843) 817-5420.\n\n— The Drake Fitness Team',
  'Sent when membership is about to expire',
  '["member_name", "plan_name", "expiry_date", "days_remaining", "renewal_url"]'
),
(
  'Booking Cancellation',
  'booking-cancellation',
  'Your booking for {{class_name}} has been cancelled',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #0B4A52;">Booking Cancelled</h1>
    <p>Hi {{member_name}},</p>
    <p>Your booking has been cancelled for:</p>
    <div style="background: #F4F4F4; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #0B4A52; margin: 0;">{{class_name}}</h2>
      <p style="margin: 10px 0 0;"><strong>Date:</strong> {{class_date}}</p>
      <p style="margin: 5px 0;"><strong>Time:</strong> {{class_time}}</p>
    </div>
    <p>{{credits_message}}</p>
    <p>Want to book another class? Check out our schedule:</p>
    <a href="{{schedule_url}}" style="display: inline-block; background: #0B4A52; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0;">View Schedule</a>
    <p style="color: #6A6A6A;">— The Drake Fitness Team</p>
  </div>',
  'Booking Cancelled\n\nHi {{member_name}},\n\nYour booking has been cancelled for:\n{{class_name}}\nDate: {{class_date}}\nTime: {{class_time}}\n\n{{credits_message}}\n\nView schedule: {{schedule_url}}\n\n— The Drake Fitness Team',
  'Sent when a booking is cancelled',
  '["member_name", "class_name", "class_date", "class_time", "credits_message", "schedule_url"]'
),
(
  'Welcome Email',
  'welcome',
  'Welcome to Drake Fitness, {{member_name}}!',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #0B4A52;">Welcome to Drake Fitness!</h1>
    <p>Hi {{member_name}},</p>
    <p>We''re thrilled to have you join our community! At Drake Fitness, we believe that <em>if you can move better, you can live better</em>.</p>
    <h2 style="color: #0B4A52;">What''s Next?</h2>
    <ul>
      <li><strong>Book your first class</strong> — Check out our schedule and reserve your spot</li>
      <li><strong>Complete your profile</strong> — Add emergency contact info and health notes</li>
      <li><strong>Meet our coaches</strong> — David and Nick are here to help you reach your goals</li>
    </ul>
    <a href="{{schedule_url}}" style="display: inline-block; background: #F2B544; color: #1A1A1A; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0;">View Class Schedule</a>
    <p>Questions? We''re just a call or email away.</p>
    <p><strong>Phone:</strong> (843) 817-5420<br><strong>Email:</strong> ddrake311@gmail.com</p>
    <p style="color: #6A6A6A;">— The Drake Fitness Team</p>
  </div>',
  'Welcome to Drake Fitness!\n\nHi {{member_name}},\n\nWe''re thrilled to have you join our community!\n\nWhat''s Next?\n- Book your first class\n- Complete your profile\n- Meet our coaches\n\nView schedule: {{schedule_url}}\n\nPhone: (843) 817-5420\nEmail: ddrake311@gmail.com\n\n— The Drake Fitness Team',
  'Sent when a new member signs up',
  '["member_name", "schedule_url"]'
);