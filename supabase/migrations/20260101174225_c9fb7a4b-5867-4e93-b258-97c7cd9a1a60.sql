-- Create FAQs table for database-driven FAQ content
CREATE TABLE public.faqs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chatbot_knowledge table for static but updatable business info
CREATE TABLE public.chatbot_knowledge (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table for capturing interested visitors
CREATE TABLE public.leads (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT,
    source TEXT DEFAULT 'chatbot',
    conversation_summary TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- FAQs policies: Anyone can view active FAQs, admins can manage
CREATE POLICY "Anyone can view active FAQs"
ON public.faqs
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage FAQs"
ON public.faqs
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Chatbot knowledge policies: Anyone can view, admins can manage
CREATE POLICY "Anyone can view chatbot knowledge"
ON public.chatbot_knowledge
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage chatbot knowledge"
ON public.chatbot_knowledge
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Leads policies: Public insert for chatbot, staff can view/manage
CREATE POLICY "Chatbot can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Staff can view leads"
ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'coach'::app_role));

CREATE POLICY "Admins can manage leads"
ON public.leads
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chatbot_knowledge_updated_at
BEFORE UPDATE ON public.chatbot_knowledge
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed FAQs from existing content
INSERT INTO public.faqs (category, question, answer, sort_order) VALUES
-- Getting Started
('Getting Started', 'What should I expect at my first class?', 'Your first class is all about getting comfortable. Arrive 10-15 minutes early to meet your coach and discuss any health considerations. We''ll guide you through every movement with modifications as needed. No experience necessary—just bring water, wear comfortable clothes, and be ready to move!', 1),
('Getting Started', 'Do I need to be in shape before starting?', 'Absolutely not! Our programs are designed to meet you where you are. Whether you haven''t exercised in years or you''re recovering from an injury, our coaches will adapt every workout to your current fitness level. The whole point is to help you GET in shape, not require it.', 2),
('Getting Started', 'What should I wear and bring?', 'Wear comfortable, breathable clothing that allows you to move freely. Athletic shoes with good support are recommended. Bring a water bottle and a small towel. We provide all equipment—kettlebells, mats, and anything else you''ll need.', 3),
('Getting Started', 'How do I book my first class?', 'You can book directly through our online scheduling system. We recommend starting with a free consultation to discuss your goals, or you can jump right into any of our beginner-friendly classes. Our team will help you choose the best starting point.', 4),

-- Classes & Training
('Classes & Training', 'What types of classes do you offer?', 'We offer a variety of classes including Kettlebell Strength, Mobility & Movement, HIIT conditioning, and specialized programs for those over 40. Each class focuses on functional movements that improve daily life, with an emphasis on proper form and injury prevention.', 5),
('Classes & Training', 'What is kettlebell training and why is it effective?', 'Kettlebell training combines strength, cardio, and flexibility in one efficient workout. The unique shape of kettlebells challenges your core stability and grip strength while building functional strength. It''s particularly effective for improving posture, burning calories, and building lean muscle without bulky equipment.', 6),
('Classes & Training', 'How are classes structured?', 'Each 60-minute class includes a thorough warm-up, skill instruction, the main workout, and a cool-down. Classes are kept small (max 12 people) so coaches can provide individual attention. Every movement has modifications, so all fitness levels work together successfully.', 7),
('Classes & Training', 'What makes your mobility training different?', 'Our mobility work goes beyond basic stretching. We use dynamic movements, joint circles, and controlled articular rotations to improve range of motion and joint health. This approach helps prevent injuries and makes everyday activities easier, especially important for those over 40.', 8),

-- Membership & Pricing
('Membership & Pricing', 'What membership options do you offer?', 'We offer flexible options: a 14-day intro experience, unlimited monthly memberships, 10-class packs, and drop-in rates. We also have a VIP unlimited option that includes additional perks. Visit our pricing page for current rates and special offers.', 9),
('Membership & Pricing', 'Is there a contract or commitment?', 'No long-term contracts required. Our memberships are month-to-month, and you can cancel anytime. We believe in earning your continued business through results, not locking you into obligations.', 10),
('Membership & Pricing', 'Do you offer any discounts?', 'Yes! We offer special rates for first responders, military, and healthcare workers. We also run periodic promotions. Ask about our referral program—when you refer a friend, you both benefit.', 11),
('Membership & Pricing', 'Can I freeze my membership?', 'Yes, we offer membership freezes for vacations, injuries, or other life circumstances. Just give us advance notice and we''ll pause your billing. Your membership will resume automatically when the freeze period ends.', 12),

-- Schedule & Booking
('Schedule & Booking', 'What are your class times?', 'We offer classes throughout the day, typically early morning (6am), mid-morning, lunchtime, and evening options. Check our online schedule for the most current class times. We update seasonally based on member demand.', 13),
('Schedule & Booking', 'How do I cancel or reschedule a booking?', 'You can cancel or reschedule through our online booking system up to 2 hours before class starts. Late cancellations may result in a credit being used. We understand life happens—just communicate with us!', 14),
('Schedule & Booking', 'What happens if a class is full?', 'If a class is full, you can join the waitlist. You''ll be automatically notified if a spot opens up. We recommend booking in advance for popular time slots, especially morning and evening classes.', 15),

-- Health & Safety
('Health & Safety', 'What if I have an injury or health condition?', 'Please let us know about any injuries or health conditions during your consultation or before class. Our coaches are experienced in providing modifications and can adapt exercises for various conditions. When in doubt, consult your doctor before starting any new exercise program.', 16),
('Health & Safety', 'Is your training safe for people over 40?', 'Absolutely! In fact, we specialize in training for adults over 40. Our approach emphasizes joint-friendly movements, proper progression, and injury prevention. Many of our members started with us in their 40s, 50s, and beyond and have seen remarkable improvements in strength, mobility, and quality of life.', 17),
('Health & Safety', 'What COVID/illness policies do you have?', 'If you''re feeling unwell, please stay home and rest. You can cancel your booking without penalty if you''re sick. We maintain clean, well-ventilated facilities and sanitize equipment regularly. Your health and the health of our community comes first.', 18),

-- Location & Contact
('Location & Contact', 'Where are you located?', 'We''re located at 2 Avondale Ave, Charleston, SC 29407, in the heart of the Avondale neighborhood. There''s convenient street parking available nearby.', 19),
('Location & Contact', 'How can I contact you?', 'You can reach us by phone at (843) 817-5420, email at ddrake311@gmail.com, or through our website contact form. Follow us on Instagram @drakefitnesschs and Facebook for updates and inspiration.', 20),
('Location & Contact', 'Do you offer online training?', 'Yes! We offer hybrid online/studio memberships and virtual coaching options. This is great for travelers or those who want to supplement their in-person training. Ask about our video library and online class options.', 21);

-- Seed chatbot knowledge with business info
INSERT INTO public.chatbot_knowledge (key, category, content) VALUES
('business_hours', 'business_info', 'Drake Fitness is open for classes throughout the day. Early morning classes start at 6am, with mid-morning, lunchtime, and evening options. Check the online schedule for specific times.'),
('location', 'business_info', 'Located at 2 Avondale Ave, Charleston, SC 29407 in the Avondale neighborhood. Street parking is available nearby.'),
('contact_info', 'business_info', 'Phone: (843) 817-5420. Email: ddrake311@gmail.com. Instagram: @drakefitnesschs. Facebook: @drakefitnessschs'),
('coach_david', 'coaching', 'Coach David Drake is the founder of Drake Fitness with over 15 years of experience in fitness training. He specializes in kettlebell training, mobility work, and helping adults over 40 build sustainable fitness habits.'),
('training_philosophy', 'philosophy', 'Drake Fitness focuses on mobility-first, joint-friendly training that builds functional strength for real life. We believe in sustainable fitness that keeps you moving well for decades, not quick fixes that lead to injury.'),
('booking_policy', 'policies', 'Book classes through PunchPass. Cancel up to 2 hours before class to avoid losing a credit. Waitlist spots are automatically offered when available.'),
('intro_offer', 'promotions', 'New members can try a 14-day intro experience for $49 - unlimited classes to experience everything Drake Fitness offers.'),
('punchpass_schedule', 'booking', 'View and book classes at: https://drakefitness.punchpass.com/classes'),
('punchpass_pricing', 'booking', 'Purchase memberships and class packs at: https://drakefitness.punchpass.com/catalog');