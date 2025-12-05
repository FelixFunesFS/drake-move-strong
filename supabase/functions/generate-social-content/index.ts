import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DRAKE_FITNESS_BRAND_PROMPT = `You are a social media content expert for Drake Fitness, a mobility-first functional strength training studio in Charleston, SC.

BRAND VOICE & POSITIONING:
- Mobility-first approach: Movement quality over intensity
- Joint health and longevity focused
- Sustainable strength for real-life activities
- Small-group coaching with expert attention
- Ego-free, welcoming community
- Tagline mindset: "If you can move better, you can live better"

TARGET AUDIENCE:
- Adults 30-65, particularly desk workers, busy parents, and former athletes
- People dealing with stiffness, past injuries, or who want to stay active long-term
- Those who want results without burnout or injury

COACHES:
- David Drake: 25+ years experience, StrongFirst kettlebell certification
- Nick Poppa: Corrective exercise and holistic coaching specialist

CONTACT INFO (use in CTAs when relevant):
- Location: 2 Avondale Ave, Charleston, SC 29407
- Phone: (843) 817-5420
- Website: drake.fitness
- Instagram: @drakefitnesschs
- Facebook: @drakefitnessschs

CONTENT GUIDELINES:
1. HOOK: Start with an attention-grabbing first line
2. VALUE: Provide actionable insight or relatable content
3. CTA: End with a clear call-to-action
4. Keep language approachable, not overly technical
5. Emphasize transformation and sustainability over quick fixes
6. Use first-person plural ("we") to build community feeling

HASHTAG STRATEGY:
- Always include #DrakeFitness #CharlestonFitness
- Add 3-5 relevant niche hashtags based on content
- Mix popular and specific hashtags`;

interface GenerateRequest {
  content: string;
  platforms: string[];
  tone: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service is not configured');
    }

    const { content, platforms, tone }: GenerateRequest = await req.json();

    if (!content || !platforms || platforms.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Content and at least one platform are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating social content for platforms:', platforms, 'with tone:', tone);

    const platformInstructions = platforms.map(platform => {
      switch (platform) {
        case 'instagram':
          return `INSTAGRAM POST:
- Max 2,200 characters (aim for 150-300 words for engagement)
- Start with a strong hook (first line visible in feed)
- Use line breaks for readability
- Include 5-10 relevant hashtags at the end
- Add a clear CTA (comment, save, share, or visit link in bio)
- Consider emoji usage for visual breaks`;
        case 'facebook':
          return `FACEBOOK POST:
- Optimal length: 40-80 characters for engagement, but can be longer for value posts
- More conversational and community-focused
- Questions work well to drive engagement
- Include a CTA to visit the website or call
- 1-3 hashtags maximum`;
        case 'linkedin':
          return `LINKEDIN POST:
- Professional but personable tone
- Focus on expertise, transformation stories, and health insights
- 1,300 characters optimal, up to 3,000 max
- Use line breaks and white space
- End with a question or thought-provoking statement
- 3-5 relevant hashtags`;
        case 'twitter':
          return `TWITTER/X POST:
- 280 characters max
- Punchy, direct messaging
- Can create a thread for longer content (indicate with 1/X)
- 1-2 hashtags only
- Include @drakefitnesschs handle when relevant`;
        default:
          return '';
      }
    }).filter(Boolean).join('\n\n');

    const toneInstructions = {
      educational: 'Focus on teaching and providing valuable information. Share tips, explain concepts, and help readers learn something new.',
      motivational: 'Inspire and encourage. Share transformation stories, celebrate wins, and motivate readers to take action.',
      community: 'Build connection and belonging. Highlight member stories, behind-the-scenes, and the studio culture.',
      promotional: 'Promote classes, services, or events. Create urgency and clear value propositions with strong CTAs.'
    };

    const userPrompt = `Generate social media content based on the following:

ORIGINAL CONTENT/TOPIC:
${content}

TONE: ${tone}
${toneInstructions[tone as keyof typeof toneInstructions] || ''}

GENERATE CONTENT FOR EACH OF THESE PLATFORMS:
${platformInstructions}

IMPORTANT:
- Adapt the content for each platform's unique format and audience
- Maintain consistent brand voice across all platforms
- Make each post feel native to its platform
- Include relevant hashtags for each platform
- Always include a call-to-action

Return the content in this exact JSON format:
{
  "posts": {
    "instagram": "full post content here with hashtags",
    "facebook": "full post content here",
    "linkedin": "full post content here with hashtags",
    "twitter": "full post content here (or array of strings for thread)"
  }
}

Only include the platforms that were requested. Return ONLY valid JSON, no additional text.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: DRAKE_FITNESS_BRAND_PROMPT },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      console.error('No content in AI response:', data);
      throw new Error('No content generated');
    }

    console.log('Raw AI response:', generatedContent);

    // Parse the JSON response from the AI
    let parsedPosts;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedPosts = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return the raw content if parsing fails
      parsedPosts = { posts: { raw: generatedContent } };
    }

    return new Response(
      JSON.stringify(parsedPosts),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-social-content:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to generate content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
