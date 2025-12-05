import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, RefreshCw, ImageIcon, Sparkles, Images, Wand2 } from "lucide-react";
import { ImageSelector } from "./ImageSelector";
import { TextOverlayEditor } from "./TextOverlayEditor";
import { EffectsPanel } from "./EffectsPanel";
import { AIImageGenerator } from "./AIImageGenerator";
import { AIImageEnhancer } from "./AIImageEnhancer";
import {
  AdConfig,
  DEFAULT_AD_CONFIG,
  EFFECT_PRESETS,
  composeAd,
  downloadImage,
} from "@/lib/canvasCompositor";
import drakeLogo from "@/assets/drake-logo.png";

export function ImageAdGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<AdConfig>(DEFAULT_AD_CONFIG);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("site-images");

  // Generate preview when config changes
  const generatePreview = useCallback(async () => {
    if (!canvasRef.current || !config.baseImage) return;

    setIsGenerating(true);
    try {
      const dataUrl = await composeAd(canvasRef.current, config, drakeLogo);
      setPreviewUrl(dataUrl);
    } catch (error) {
      console.error("Preview generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [config]);

  // Debounced preview generation
  useEffect(() => {
    const timer = setTimeout(() => {
      generatePreview();
    }, 150);
    return () => clearTimeout(timer);
  }, [generatePreview]);

  const handleImageSelect = (src: string) => {
    setConfig((prev) => ({ ...prev, baseImage: src }));
  };

  // Handle AI-generated image - use it as base image
  const handleAIImageGenerated = (imageUrl: string) => {
    setConfig((prev) => ({ ...prev, baseImage: imageUrl }));
    setActiveTab("site-images"); // Switch to editor to add text overlays
    toast.info("AI image loaded! Add text overlays and effects.");
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = EFFECT_PRESETS[presetId as keyof typeof EFFECT_PRESETS];
    if (!preset) return;

    setConfig((prev) => ({
      ...prev,
      effects: preset.effects,
      headline: prev.headline
        ? { ...prev.headline, color: preset.textColors.headline }
        : prev.headline,
      subheadline: prev.subheadline
        ? { ...prev.subheadline, color: preset.textColors.subheadline }
        : prev.subheadline,
      cta: prev.cta ? { ...prev.cta, color: preset.textColors.cta } : prev.cta,
    }));
    toast.success(`Applied "${preset.name}" preset`);
  };

  const handleReset = () => {
    setConfig((prev) => ({
      ...DEFAULT_AD_CONFIG,
      baseImage: prev.baseImage,
    }));
    toast.info("Settings reset to defaults");
  };

  const handleDownload = () => {
    if (!previewUrl) {
      toast.error("Generate an image first");
      return;
    }

    const sizeName = config.outputSize.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const filename = `drake-fitness-ad-${sizeName}-${Date.now()}.png`;
    downloadImage(previewUrl, filename);
    toast.success("Image downloaded!");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="site-images" className="gap-2">
          <Images className="h-4 w-4" />
          Site Images + Editor
        </TabsTrigger>
        <TabsTrigger value="ai-generate" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI Generate
        </TabsTrigger>
        <TabsTrigger value="ai-enhance" className="gap-2">
          <Wand2 className="h-4 w-4" />
          AI Enhance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="site-images">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6 order-2 lg:order-1">
            <ImageSelector
              selectedImage={config.baseImage}
              onSelect={handleImageSelect}
            />

            {config.baseImage && (
              <>
                <TextOverlayEditor
                  headline={config.headline!}
                  subheadline={config.subheadline!}
                  cta={config.cta!}
                  onHeadlineChange={(headline) => setConfig((prev) => ({ ...prev, headline }))}
                  onSubheadlineChange={(subheadline) => setConfig((prev) => ({ ...prev, subheadline }))}
                  onCtaChange={(cta) => setConfig((prev) => ({ ...prev, cta }))}
                />

                <EffectsPanel
                  effects={config.effects}
                  logo={config.logo}
                  outputSize={config.outputSize}
                  onEffectsChange={(effects) => setConfig((prev) => ({ ...prev, effects }))}
                  onLogoChange={(logo) => setConfig((prev) => ({ ...prev, logo }))}
                  onOutputSizeChange={(outputSize) => setConfig((prev) => ({ ...prev, outputSize }))}
                  onApplyPreset={handleApplyPreset}
                  onReset={handleReset}
                />
              </>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-4 order-1 lg:order-2 lg:sticky lg:top-4 lg:self-start">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generatePreview}
                      disabled={!config.baseImage || isGenerating}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${isGenerating ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      disabled={!previewUrl}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Preview Area */}
                <div
                  className="relative bg-muted rounded-lg overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: `${config.outputSize.width} / ${config.outputSize.height}`,
                    maxHeight: "500px",
                  }}
                >
                  {!config.baseImage ? (
                    <div className="text-center text-muted-foreground p-8">
                      <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Select an image or generate one with AI</p>
                    </div>
                  ) : previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Ad Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      <p>Generating preview...</p>
                    </div>
                  )}
                </div>

                {/* Size Info */}
                <div className="mt-3 text-sm text-muted-foreground text-center">
                  {config.outputSize.name} • {config.outputSize.width} × {config.outputSize.height}px
                </div>
              </CardContent>
            </Card>

            {/* Hidden Canvas for Rendering */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Quick Tips */}
            {config.baseImage && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use presets for quick professional looks</li>
                    <li>• Keep headlines short and impactful</li>
                    <li>• Ensure text contrasts well with background</li>
                    <li>• Different sizes work better for different platforms</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="ai-generate">
        <AIImageGenerator onImageGenerated={handleAIImageGenerated} />
      </TabsContent>

      <TabsContent value="ai-enhance">
        <AIImageEnhancer 
          selectedImage={config.baseImage} 
          onImageEnhanced={handleImageSelect}
        />
      </TabsContent>
    </Tabs>
  );
}
