import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Download, Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { downloadImage } from "@/lib/canvasCompositor";

const STYLE_PRESETS = [
  { id: "photorealistic", label: "Photorealistic", description: "Professional photo quality" },
  { id: "minimalist", label: "Minimalist", description: "Clean, simple design" },
  { id: "energetic", label: "Energetic", description: "Dynamic action shots" },
  { id: "motivational", label: "Motivational", description: "Inspiring hero imagery" },
];

const PROMPT_TEMPLATES = [
  { 
    label: "Kettlebell Training", 
    prompt: "A person performing a kettlebell swing in a modern fitness studio with natural lighting" 
  },
  { 
    label: "Group Fitness Class", 
    prompt: "A small group of people doing functional fitness exercises together in a boutique gym" 
  },
  { 
    label: "Mobility Training", 
    prompt: "An athlete performing mobility stretches and exercises, focusing on joint health" 
  },
  { 
    label: "Outdoor Training", 
    prompt: "Personal training session outdoors in a Charleston park setting with fitness equipment" 
  },
  { 
    label: "Strength Training", 
    prompt: "A person performing a barbell deadlift with proper form in a well-equipped gym" 
  },
  { 
    label: "Coach & Client", 
    prompt: "A fitness coach guiding a client through an exercise, showing supportive interaction" 
  },
];

interface AIImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export function AIImageGenerator({ onImageGenerated }: AIImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-ad-image", {
        body: { prompt: prompt.trim(), style: selectedStyle },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to generate image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success("Image generated successfully!");
        onImageGenerated?.(data.imageUrl);
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (error) {
      console.error("Generation error:", error);
      const message = error instanceof Error ? error.message : "Failed to generate image";
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const filename = `drake-fitness-ai-${Date.now()}.png`;
    downloadImage(generatedImage, filename);
    toast.success("Image downloaded!");
  };

  const applyTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Controls */}
      <div className="space-y-6">
        {/* Prompt Input */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-drake-gold" />
              <CardTitle className="text-lg">AI Image Generator</CardTitle>
            </div>
            <CardDescription>
              Generate custom fitness images using AI with Drake Fitness brand styling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Templates */}
            <div className="space-y-2">
              <Label>Quick Prompts</Label>
              <div className="flex flex-wrap gap-2">
                {PROMPT_TEMPLATES.map((template) => (
                  <Button
                    key={template.label}
                    variant="outline"
                    size="sm"
                    onClick={() => applyTemplate(template.prompt)}
                    className="text-xs"
                  >
                    {template.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div className="space-y-2">
              <Label>Image Description</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the fitness image you want to generate..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">
                Be specific about subjects, setting, lighting, and mood. Brand colors and style will be applied automatically.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Style Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Style</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_PRESETS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedStyle === style.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-medium text-sm">{style.label}</p>
                  <p className="text-xs text-muted-foreground">{style.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 mr-2" />
              Generate Image
            </>
          )}
        </Button>
      </div>

      {/* Right Column - Preview */}
      <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generated Image</h3>
              {generatedImage && (
                <Button size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
            </div>

            {/* Preview Area */}
            <div className="relative bg-muted rounded-lg overflow-hidden flex items-center justify-center aspect-square">
              {isGenerating ? (
                <div className="text-center text-muted-foreground p-8">
                  <Loader2 className="h-12 w-12 mx-auto mb-3 animate-spin opacity-50" />
                  <p className="font-medium">Creating your image...</p>
                  <p className="text-sm mt-1">This may take 15-30 seconds</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="AI Generated"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Your AI-generated image will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Tips for Better Results</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Describe specific actions and poses</li>
              <li>• Mention lighting preferences (natural, dramatic, soft)</li>
              <li>• Include setting details (gym, outdoor, studio)</li>
              <li>• Brand colors (teal, gold) are applied automatically</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
