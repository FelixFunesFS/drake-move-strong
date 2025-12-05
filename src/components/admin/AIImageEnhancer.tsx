import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Wand2, Download, Loader2, ArrowRight, RotateCcw, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { downloadImage } from "@/lib/canvasCompositor";
import { convertToBase64, validateImage, getImageErrorMessage } from "@/lib/imageUtils";

const ENHANCEMENT_PRESETS = [
  { id: "dramatic-lighting", label: "Dramatic Lighting", prompt: "Add dramatic, moody lighting with deep shadows and highlights" },
  { id: "blur-background", label: "Blur Background", prompt: "Blur the background while keeping the subject sharp and in focus" },
  { id: "golden-hour", label: "Golden Hour", prompt: "Apply warm golden hour lighting like sunset" },
  { id: "high-contrast", label: "High Contrast", prompt: "Increase contrast for a bold, punchy look" },
  { id: "cinematic", label: "Cinematic Look", prompt: "Apply cinematic color grading with teal and orange tones" },
  { id: "vibrant", label: "Vibrant Colors", prompt: "Make colors more vibrant and saturated" },
  { id: "soft-glow", label: "Soft Glow", prompt: "Add a soft, dreamy glow effect" },
  { id: "sharpen", label: "Sharpen Details", prompt: "Enhance sharpness and detail clarity" },
];

interface AIImageEnhancerProps {
  selectedImage: string;
  onImageEnhanced?: (imageUrl: string) => void;
}

export function AIImageEnhancer({ selectedImage, onImageEnhanced }: AIImageEnhancerProps) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  const handleEnhance = async (prompt: string, presetId?: string) => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter an enhancement prompt");
      return;
    }

    setIsEnhancing(true);
    setEnhancedImage(null);
    setActivePreset(presetId || null);
    setProcessingStatus("Validating image...");

    try {
      // Validate image first
      const validation = await validateImage(selectedImage);
      if (!validation.valid && validation.error && !validation.error.includes('compressed')) {
        throw new Error(validation.error);
      }

      // Convert the image to base64 with compression if needed
      setProcessingStatus("Preparing image...");
      const base64Image = await convertToBase64(selectedImage, {
        maxWidth: 2048,
        maxHeight: 2048,
        quality: 0.85,
        format: 'image/jpeg'
      });

      // Validate base64 result
      if (!base64Image || !base64Image.startsWith('data:image')) {
        throw new Error("Failed to process image. Please try a different image.");
      }

      setProcessingStatus("Enhancing with AI...");
      
      const { data, error } = await supabase.functions.invoke("generate-ad-image", {
        body: { 
          prompt: prompt.trim(), 
          baseImageUrl: base64Image,
          mode: "enhance"
        },
      });

      // Handle specific HTTP errors
      if (error) {
        console.error("Edge function error:", error);
        const statusCode = (error as { status?: number }).status;
        throw new Error(getImageErrorMessage(error, statusCode));
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setEnhancedImage(data.imageUrl);
        toast.success("Image enhanced successfully!");
        onImageEnhanced?.(data.imageUrl);
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (error) {
      console.error("Enhancement error:", error);
      const message = getImageErrorMessage(error);
      toast.error(message);
    } finally {
      setIsEnhancing(false);
      setProcessingStatus("");
    }
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    const filename = `drake-fitness-enhanced-${Date.now()}.png`;
    downloadImage(enhancedImage, filename);
    toast.success("Image downloaded!");
  };

  const handleUseEnhanced = () => {
    if (enhancedImage && onImageEnhanced) {
      onImageEnhanced(enhancedImage);
      toast.success("Enhanced image applied!");
    }
  };

  const handleReset = () => {
    setEnhancedImage(null);
    setActivePreset(null);
    setCustomPrompt("");
  };

  if (!selectedImage) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Wand2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Select an image from the "Site Images" tab first to enhance it with AI.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Controls */}
      <div className="space-y-6">
        {/* Preset Enhancements */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-drake-gold" />
              <CardTitle className="text-lg">Quick Enhancements</CardTitle>
            </div>
            <CardDescription>
              Apply common image enhancements with one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {ENHANCEMENT_PRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  variant={activePreset === preset.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleEnhance(preset.prompt, preset.id)}
                  disabled={isEnhancing}
                  className="justify-start text-left h-auto py-2"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Enhancement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Custom Enhancement</CardTitle>
            <CardDescription>
              Describe how you want to modify the image.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Enhancement Description</Label>
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Make the background darker and add a subtle vignette"
                disabled={isEnhancing}
              />
            </div>
            <Button
              onClick={() => handleEnhance(customPrompt)}
              disabled={isEnhancing || !customPrompt.trim()}
              className="w-full"
            >
              {isEnhancing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Apply Enhancement
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Preview */}
      <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Before & After</h3>
              <div className="flex gap-2">
                {enhancedImage && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Comparison View */}
            <div className="grid grid-cols-2 gap-3">
              {/* Original */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground text-center">Original</p>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selectedImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Enhanced */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground text-center">Enhanced</p>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  {isEnhancing ? (
                    <div className="text-center p-4">
                      <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{processingStatus || "Processing..."}</p>
                    </div>
                  ) : enhancedImage ? (
                    <img
                      src={enhancedImage}
                      alt="Enhanced"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-muted-foreground">
                      <ArrowRight className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Result appears here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Use Enhanced Button */}
            {enhancedImage && (
              <Button
                onClick={handleUseEnhanced}
                className="w-full mt-4"
                variant="secondary"
              >
                Use Enhanced Image in Editor
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Enhancement Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about the changes you want</li>
              <li>• Lighting changes work best (dramatic, soft, golden hour)</li>
              <li>• Background modifications are well supported</li>
              <li>• Large images are automatically compressed for faster processing</li>
            </ul>
          </CardContent>
        </Card>

        {/* Rate Limit Warning */}
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium">Processing Note</p>
                <p className="text-amber-700 dark:text-amber-300">AI enhancement may take 15-30 seconds. If you see rate limit errors, wait a moment before retrying.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
