import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build enhanced prompt with Drake Fitness brand styling
    const brandStyleGuide = `
Style: Professional fitness photography aesthetic
Brand Colors: Teal (#0B4A52), Gold (#F2B544), Dark (#1A1A1A)
Mood: Motivational, authentic, energetic yet approachable
Setting: Charleston, SC fitness studio or outdoor training
Subject focus: Functional fitness, kettlebells, mobility, strength training
Quality: High resolution, well-lit, professional composition
`;

    const styleModifiers: Record<string, string> = {
      photorealistic: "Ultra-realistic photography, natural lighting, professional fitness photo shoot quality",
      minimalist: "Clean, minimal design with lots of negative space, simple composition, modern aesthetic",
      energetic: "Dynamic action shot, motion blur effects, high energy, vibrant colors",
      motivational: "Inspiring composition, dramatic lighting, powerful imagery, hero shot style",
    };

    const enhancedPrompt = `${prompt}

${brandStyleGuide}
${style && styleModifiers[style] ? styleModifiers[style] : styleModifiers.photorealistic}

Do not include any text or watermarks in the image.`;

    console.log("Generating image with prompt:", enhancedPrompt.substring(0, 200) + "...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: enhancedPrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received, processing...");

    // Extract image from response
    const images = data.choices?.[0]?.message?.images;
    if (!images || images.length === 0) {
      console.error("No images in response:", JSON.stringify(data).substring(0, 500));
      return new Response(
        JSON.stringify({ error: "No image was generated. Try a different prompt." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const imageUrl = images[0]?.image_url?.url;
    if (!imageUrl) {
      console.error("No image URL found in response");
      return new Response(
        JSON.stringify({ error: "Failed to extract generated image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Image generated successfully");

    return new Response(
      JSON.stringify({ 
        imageUrl,
        message: data.choices?.[0]?.message?.content || "Image generated successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-ad-image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
