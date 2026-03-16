import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { goal, packageSize } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const goalStrategies: Record<string, string> = {
      conversion: "Focus on pain-point hooks → solution → strong CTA (book class, try free, sign up). Use urgency, social proof, and transformation language.",
      awareness: "Story-driven content: behind-the-scenes, coach spotlights, studio culture, community highlights. Warm and inviting tone.",
      education: "Share movement tips, mobility myths vs facts, longevity science, kettlebell technique breakdowns. Position Drake Fitness as the expert.",
      community: "Member spotlights, class recaps, group achievements, culture posts. Celebrate the community vibe.",
      retention: "Progress reminders, habit-building tips, milestone celebrations, 'keep showing up' motivation. Speak directly to current members.",
    };

    const systemPrompt = `You are a social media marketing expert AND creative director for Drake Fitness, a boutique kettlebell and strength training studio in West Ashley, Charleston, SC.

Brand voice: Welcoming but strong. Never intimidating. Community-first. Emphasis on longevity, functional strength, and real results. Coaches: David Drake (owner, kettlebells, strength), Misty (yoga, flexibility).

Class types: KB Strong, Kettlebell Flow, Mobility, Yoga, Ruckathon, Open Gym.
Website: drake.fitness | Instagram: @drakefitnesschs | Facebook: @drakefitnesschs

Brand colors: Teal (#0B4A52), Gold (#F2B544), Dark (#1A1A1A)

Campaign goal: ${goal}
Strategy: ${goalStrategies[goal] || goalStrategies.conversion}

For each post, think like a creative director:
- Write an image_prompt describing the ideal graphic/visual for the post. CRITICAL: Do NOT include people, human faces, or human figures in the image prompt. Focus ONLY on gym equipment (kettlebells, dumbbells, barbells, maces, sandbags, resistance bands), abstract fitness icons, geometric patterns, textured backgrounds, empty studio interiors, Charleston scenery (without people), bold graphic elements, frames, and branded color overlays. Be specific about composition, lighting, and mood.
- Provide suggested_photo_tags — keywords to match existing studio photos (e.g. "kettlebell", "group", "outdoor", "overhead", "plank", "turkish getup", "swing", "storefront", "goblet", "lunge").

Generate exactly ${packageSize} social media posts. Return ONLY a JSON array using the tool call.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate ${packageSize} posts for a ${goal} campaign. Include visual direction for each post.` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_posts",
              description: "Return the generated social media posts with visual direction",
              parameters: {
                type: "object",
                properties: {
                  posts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        number: { type: "number" },
                        caption_ig: { type: "string", description: "Instagram caption with emojis and hashtags" },
                        caption_fb: { type: "string", description: "Facebook caption, slightly longer and conversational" },
                        caption_linkedin: { type: "string", description: "LinkedIn caption, professional tone" },
                        suggested_template: { type: "string", enum: ["full-bleed", "split-left", "centered", "editorial", "split-right", "collage", "schedule-grid", "class-highlight"] },
                        headline: { type: "string", description: "Short headline for the graphic (2-5 words)" },
                        detail: { type: "string", description: "Detail line for the graphic" },
                        cta: { type: "string", description: "CTA button text" },
                        hashtags: { type: "array", items: { type: "string" } },
                        image_prompt: { type: "string", description: "Detailed visual description for AI image generation. Describe the ideal photo: subjects, composition, lighting, mood, setting. E.g. 'Close-up of hands gripping a kettlebell handle, warm studio lighting, teal wall in background, shallow depth of field'" },
                        suggested_photo_tags: { type: "array", items: { type: "string" }, description: "Keywords to match existing studio photos. Use terms like: kettlebell, group, outdoor, overhead, plank, turkish getup, swing, storefront, goblet, lunge, studio, community, training, press, squat, row" },
                      },
                      required: ["number", "caption_ig", "caption_fb", "caption_linkedin", "suggested_template", "headline", "detail", "cta", "hashtags", "image_prompt", "suggested_photo_tags"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["posts"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_posts" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const posts = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(posts), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content-package error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
