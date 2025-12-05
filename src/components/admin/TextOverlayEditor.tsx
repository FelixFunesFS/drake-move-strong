import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { TextOverlay } from "@/lib/canvasCompositor";

interface TextOverlayEditorProps {
  headline: TextOverlay;
  subheadline: TextOverlay;
  cta: TextOverlay;
  onHeadlineChange: (value: TextOverlay) => void;
  onSubheadlineChange: (value: TextOverlay) => void;
  onCtaChange: (value: TextOverlay) => void;
}

const FONT_SIZES = {
  headline: { min: 32, max: 120, default: 72 },
  subheadline: { min: 18, max: 60, default: 36 },
  cta: { min: 16, max: 48, default: 28 },
};

const COLORS = [
  { value: "#FFFFFF", label: "White" },
  { value: "#F2B544", label: "Gold" },
  { value: "#0B4A52", label: "Teal" },
  { value: "#1A1A1A", label: "Dark" },
  { value: "#10757E", label: "Light Teal" },
];

function TextLayerEditor({
  label,
  layer,
  onChange,
  sizeConfig,
  useTextarea = false,
}: {
  label: string;
  layer: TextOverlay;
  onChange: (value: TextOverlay) => void;
  sizeConfig: { min: number; max: number; default: number };
  useTextarea?: boolean;
}) {
  return (
    <div className="space-y-4">
      {/* Text Input */}
      <div className="space-y-2">
        <Label>{label} Text</Label>
        {useTextarea ? (
          <Textarea
            value={layer.text}
            onChange={(e) => onChange({ ...layer, text: e.target.value })}
            placeholder={`Enter ${label.toLowerCase()}...`}
            className="min-h-[60px]"
          />
        ) : (
          <Input
            value={layer.text}
            onChange={(e) => onChange({ ...layer, text: e.target.value })}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        )}
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Font Size</Label>
          <span className="text-sm text-muted-foreground">{layer.fontSize}px</span>
        </div>
        <Slider
          value={[layer.fontSize]}
          onValueChange={([v]) => onChange({ ...layer, fontSize: v })}
          min={sizeConfig.min}
          max={sizeConfig.max}
          step={2}
        />
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label>Font</Label>
        <Select
          value={layer.fontFamily}
          onValueChange={(v) => onChange({ ...layer, fontFamily: v as TextOverlay['fontFamily'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oswald">Oswald (Bold/Display)</SelectItem>
            <SelectItem value="Inter">Inter (Body)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font Weight */}
      <div className="space-y-2">
        <Label>Weight</Label>
        <Select
          value={layer.fontWeight}
          onValueChange={(v) => onChange({ ...layer, fontWeight: v as TextOverlay['fontWeight'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => onChange({ ...layer, color: color.value })}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                layer.color === color.value
                  ? "border-primary scale-110"
                  : "border-border hover:border-primary/50"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
          <Input
            type="color"
            value={layer.color}
            onChange={(e) => onChange({ ...layer, color: e.target.value })}
            className="w-8 h-8 p-0 border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Position */}
      <div className="space-y-2">
        <Label>Vertical Position</Label>
        <Select
          value={layer.position}
          onValueChange={(v) => onChange({ ...layer, position: v as TextOverlay['position'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Text Align */}
      <div className="space-y-2">
        <Label>Alignment</Label>
        <div className="flex gap-1">
          {[
            { value: 'left', icon: AlignLeft },
            { value: 'center', icon: AlignCenter },
            { value: 'right', icon: AlignRight },
          ].map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onChange({ ...layer, textAlign: value as TextOverlay['textAlign'] })}
              className={`p-2 rounded-md transition-colors ${
                layer.textAlign === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Shadow */}
      <div className="flex items-center justify-between">
        <Label>Text Shadow</Label>
        <Switch
          checked={layer.shadow}
          onCheckedChange={(v) => onChange({ ...layer, shadow: v })}
        />
      </div>
    </div>
  );
}

export function TextOverlayEditor({
  headline,
  subheadline,
  cta,
  onHeadlineChange,
  onSubheadlineChange,
  onCtaChange,
}: TextOverlayEditorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Text Overlays</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="headline">
          <TabsList className="w-full">
            <TabsTrigger value="headline" className="flex-1">Headline</TabsTrigger>
            <TabsTrigger value="subheadline" className="flex-1">Subheadline</TabsTrigger>
            <TabsTrigger value="cta" className="flex-1">CTA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="headline" className="mt-4">
            <TextLayerEditor
              label="Headline"
              layer={headline}
              onChange={onHeadlineChange}
              sizeConfig={FONT_SIZES.headline}
              useTextarea
            />
          </TabsContent>
          
          <TabsContent value="subheadline" className="mt-4">
            <TextLayerEditor
              label="Subheadline"
              layer={subheadline}
              onChange={onSubheadlineChange}
              sizeConfig={FONT_SIZES.subheadline}
            />
          </TabsContent>
          
          <TabsContent value="cta" className="mt-4">
            <TextLayerEditor
              label="CTA"
              layer={cta}
              onChange={onCtaChange}
              sizeConfig={FONT_SIZES.cta}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
