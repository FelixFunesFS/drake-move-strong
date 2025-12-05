import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sliders, Wand2, RotateCcw, CircleDot } from "lucide-react";
import { ImageEffect, LogoConfig, OutputSize, OUTPUT_SIZES, EFFECT_PRESETS } from "@/lib/canvasCompositor";

interface EffectsPanelProps {
  effects: ImageEffect;
  logo: LogoConfig;
  outputSize: OutputSize;
  onEffectsChange: (effects: ImageEffect) => void;
  onLogoChange: (logo: LogoConfig) => void;
  onOutputSizeChange: (size: OutputSize) => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
}

const OVERLAY_COLORS = [
  { value: "#1A1A1A", label: "Dark" },
  { value: "#FFFFFF", label: "White" },
  { value: "#0B4A52", label: "Teal" },
  { value: "#F2B544", label: "Gold" },
];

export function EffectsPanel({
  effects,
  logo,
  outputSize,
  onEffectsChange,
  onLogoChange,
  onOutputSizeChange,
  onApplyPreset,
  onReset,
}: EffectsPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Effects & Settings</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Presets */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Quick Presets
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(EFFECT_PRESETS).map(([id, preset]) => (
              <Button
                key={id}
                variant="outline"
                size="sm"
                onClick={() => onApplyPreset(id)}
                className="justify-start"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Output Size */}
        <div className="space-y-2">
          <Label>Output Size</Label>
          <Select
            value={outputSize.name}
            onValueChange={(name) => {
              const size = OUTPUT_SIZES.find((s) => s.name === name);
              if (size) onOutputSizeChange(size);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OUTPUT_SIZES.map((size) => (
                <SelectItem key={size.name} value={size.name}>
                  {size.name} ({size.width}×{size.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image Adjustments */}
        <div className="space-y-4">
          <Label>Image Adjustments</Label>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Brightness</span>
              <span className="text-muted-foreground">{effects.brightness}%</span>
            </div>
            <Slider
              value={[effects.brightness]}
              onValueChange={([v]) => onEffectsChange({ ...effects, brightness: v })}
              min={50}
              max={150}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Contrast</span>
              <span className="text-muted-foreground">{effects.contrast}%</span>
            </div>
            <Slider
              value={[effects.contrast]}
              onValueChange={([v]) => onEffectsChange({ ...effects, contrast: v })}
              min={50}
              max={150}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Saturation</span>
              <span className="text-muted-foreground">{effects.saturation}%</span>
            </div>
            <Slider
              value={[effects.saturation]}
              onValueChange={([v]) => onEffectsChange({ ...effects, saturation: v })}
              min={0}
              max={200}
              step={5}
            />
          </div>
        </div>

        {/* Vignette */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <CircleDot className="h-4 w-4" />
            Vignette
          </Label>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Intensity</span>
              <span className="text-muted-foreground">{effects.vignette?.intensity ?? 0}%</span>
            </div>
            <Slider
              value={[effects.vignette?.intensity ?? 0]}
              onValueChange={([v]) => onEffectsChange({ 
                ...effects, 
                vignette: { 
                  intensity: v, 
                  size: effects.vignette?.size ?? 60 
                } 
              })}
              min={0}
              max={80}
              step={5}
            />
          </div>

          {(effects.vignette?.intensity ?? 0) > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span className="text-muted-foreground">{effects.vignette?.size ?? 60}%</span>
              </div>
              <Slider
                value={[effects.vignette?.size ?? 60]}
                onValueChange={([v]) => onEffectsChange({ 
                  ...effects, 
                  vignette: { 
                    intensity: effects.vignette?.intensity ?? 0, 
                    size: v 
                  } 
                })}
                min={30}
                max={90}
                step={5}
              />
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className="space-y-4">
          <Label>Overlay</Label>
          
          <div className="space-y-2">
            <span className="text-sm">Color</span>
            <div className="flex gap-2">
              {OVERLAY_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() =>
                    onEffectsChange({
                      ...effects,
                      overlay: { ...effects.overlay, color: color.value },
                    })
                  }
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    effects.overlay.color === color.value
                      ? "border-primary scale-110"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Opacity</span>
              <span className="text-muted-foreground">{Math.round(effects.overlay.opacity * 100)}%</span>
            </div>
            <Slider
              value={[effects.overlay.opacity * 100]}
              onValueChange={([v]) =>
                onEffectsChange({
                  ...effects,
                  overlay: { ...effects.overlay, opacity: v / 100 },
                })
              }
              min={0}
              max={80}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm">Gradient</span>
            <Select
              value={effects.overlay.gradient}
              onValueChange={(v) =>
                onEffectsChange({
                  ...effects,
                  overlay: { ...effects.overlay, gradient: v as ImageEffect['overlay']['gradient'] },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Solid</SelectItem>
                <SelectItem value="top">Fade from Top</SelectItem>
                <SelectItem value="bottom">Fade from Bottom</SelectItem>
                <SelectItem value="full">Full Cover</SelectItem>
                <SelectItem value="radial">Radial (Cinematic)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Logo Watermark</Label>
            <Switch
              checked={logo.enabled}
              onCheckedChange={(v) => onLogoChange({ ...logo, enabled: v })}
            />
          </div>

          {logo.enabled && (
            <>
              <div className="space-y-2">
                <span className="text-sm">Position</span>
                <Select
                  value={logo.position}
                  onValueChange={(v) => onLogoChange({ ...logo, position: v as LogoConfig['position'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Size</span>
                  <span className="text-muted-foreground">{logo.size}%</span>
                </div>
                <Slider
                  value={[logo.size]}
                  onValueChange={([v]) => onLogoChange({ ...logo, size: v })}
                  min={5}
                  max={25}
                  step={1}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}