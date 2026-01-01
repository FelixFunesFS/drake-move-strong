import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  captureLeadData?: {
    name?: string;
    email: string;
    phone?: string;
    interest?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { messages, captureLeadData }: ChatRequest = await req.json();
    console.log("Received chat request with", messages.length, "messages");

    // If lead data is provided, save it
    if (captureLeadData?.email) {
      console.log("Capturing lead:", captureLeadData.email);
      const conversationSummary = messages
        .filter(m => m.role !== 'system')
        .slice(-6)
        .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
        .join('\n');

      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          name: captureLeadData.name || null,
          email: captureLeadData.email,
          phone: captureLeadData.phone || null,
          interest: captureLeadData.interest || null,
          source: 'chatbot',
          conversation_summary: conversationSummary,
        });

      if (leadError) {
        console.error("Error saving lead:", leadError);
      } else {
        console.log("Lead saved successfully");
      }
    }

    // Fetch dynamic knowledge from database
    console.log("Fetching knowledge from database...");

    // Get FAQs
    const { data: faqs, error: faqError } = await supabase
      .from('faqs')
      .select('category, question, answer')
      .eq('is_active', true)
      .order('sort_order');

    if (faqError) {
      console.error("Error fetching FAQs:", faqError);
    }

    // Get chatbot knowledge
    const { data: knowledge, error: knowledgeError } = await supabase
      .from('chatbot_knowledge')
      .select('key, category, content');

    if (knowledgeError) {
      console.error("Error fetching knowledge:", knowledgeError);
    }

    // Get active class types
    const { data: classTypes, error: classError } = await supabase
      .from('class_types')
      .select('name, description, difficulty_level')
      .eq('is_active', true)
      .order('sort_order');

    if (classError) {
      console.error("Error fetching class types:", classError);
    }

    // Get membership plans
    const { data: plans, error: plansError } = await supabase
      .from('membership_plans')
      .select('name, description, price, billing_interval, class_credits, unlimited_classes, features')
      .eq('is_active', true)
      .order('sort_order');

    if (plansError) {
      console.error("Error fetching plans:", plansError);
    }

    // Build dynamic knowledge sections
    const faqSection = faqs?.length 
      ? `FREQUENTLY ASKED QUESTIONS:\n${faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`
      : '';

    const knowledgeSection = knowledge?.length
      ? `BUSINESS INFORMATION:\n${knowledge.map(k => `${k.key}: ${k.content}`).join('\n')}`
      : '';

    const classSection = classTypes?.length
      ? `CLASS TYPES:\n${classTypes.map(c => `- ${c.name} (${c.difficulty_level}): ${c.description || 'Functional fitness class'}`).join('\n')}`
      : '';

    const pricingSection = plans?.length
      ? `MEMBERSHIP OPTIONS:\n${plans.map(p => {
          const features = Array.isArray(p.features) ? p.features.join(', ') : '';
          return `- ${p.name}: $${p.price}/${p.billing_interval}${p.unlimited_classes ? ' (Unlimited classes)' : p.class_credits ? ` (${p.class_credits} classes)` : ''}${features ? ` - ${features}` : ''}`;
        }).join('\n')}`
      : '';

    // Build the system prompt with dynamic knowledge
    const systemPrompt = `You are Drake, the friendly AI assistant for Drake Fitness in Charleston, SC.

PERSONALITY:
- Warm, encouraging, and knowledgeable
- Focus on mobility-first, joint-friendly training
- Emphasize community, sustainability, and long-term results
- Keep responses concise but helpful (2-3 sentences when possible)
- Use a conversational, supportive tone

CORE INFORMATION:
- Location: 2 Avondale Ave, Charleston, SC 29407
- Phone: (843) 817-5420
- Email: ddrake311@gmail.com
- Website: https://drake.fitness (ALWAYS use this as the primary website URL)
- Instagram: @drakefitnesschs
- Facebook: @drakefitnessschs

${knowledgeSection}

${classSection}

${pricingSection}

${faqSection}

NEW MEMBER & INTRO OFFERS (IMPORTANT - Prioritize for new/inquiring members):
- Intro Week Special: 1 week of unlimited classes for $50 - https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/46002
- When someone asks "how do I get started?", "I'm new", "first time", or seems interested in trying: ALWAYS mention the Intro Week Special first!
- After mentioning intro offer, also mention they can book a free consultation at https://drake.fitness/consultation

BOOKING & SCHEDULING:
- View/book classes: https://drakefitness.punchpass.com/classes
- Purchase memberships/passes: https://drakefitness.punchpass.com/catalog
- Intro Week Special: https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/46002
- Book free consultation: https://drake.fitness/consultation or call (843) 817-5420

URL PREFERENCES:
- For general website info, use https://drake.fitness URLs (e.g., https://drake.fitness/pricing, https://drake.fitness/classes)
- For booking/purchasing actions, use the specific PunchPass URLs
- Always include full URLs so they display as clickable links

LEAD CAPTURE GUIDANCE:
- If someone shows interest in joining, trying classes, or pricing, after providing helpful info ask: "Would you like me to have Coach David reach out to answer any questions?"
- If they say yes or seem interested, ask for their name and email to help them get started
- Be helpful first, sales second - never pushy

RESPONSE GUIDELINES:
- For new members: Lead with Intro Week Special, then offer free consultation
- For schedule/booking questions: Provide the PunchPass link
- For pricing questions: Share the relevant plan info and PunchPass catalog link
- For injury/health concerns: Recommend booking a free consultation
- For complex questions: Suggest contacting directly or booking a consultation
- Always be encouraging about their fitness journey
- Include clickable links in your responses when relevant

When you don't know something specific, be honest and suggest they contact the studio directly.`;

    // Prepare messages for AI
    const aiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.filter(m => m.role !== 'system')
    ];

    console.log("Calling Lovable AI...");

    // Call Lovable AI with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: aiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    console.log("Streaming response back to client");

    // Return the streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Chat assistant error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
