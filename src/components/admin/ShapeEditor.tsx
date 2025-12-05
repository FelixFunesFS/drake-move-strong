import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Shapes, Plus, Trash2, ChevronDown, Circle, Square, Minus, CornerDownLeft } from "lucide-react";
import { ShapeElement } from "@/lib/canvasCompositor";

interface ShapeEditorProps {
  shapes: ShapeElement[];
  onShapesChange: (shapes: ShapeElement[]) => void;
}

const SHAPE_TYPES = [
  { value: 'rectangle', label: 'Rectangle', icon: Square },
  { value: 'circle', label: 'Circle', icon: Circle },
  { value: 'pill', label: 'Pill/Badge', icon: Square },
  { value: 'line', label: 'Line', icon: Minus },
  { value: 'corner-accent', label: 'Corner Accent', icon: CornerDownLeft },
];

const PRESET_COLORS = [
  { value: '#F2B544', label: 'Gold' },
  { value: '#0B4A52', label: 'Teal' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#1A1A1A', label: 'Dark' },
];

const SHAPE_PRESETS: { name: string; shape: ShapeElement }[] = [
  {
    name: 'Gold Badge (Top Right)',
    shape: { type: 'pill', position: { x: 70, y: 8 }, size: { width: 25, height: 7 }, fill: '#F2B544', rotation: -12 },
  },
  {
    name: 'Date Circle',
    shape: { type: 'circle', position: { x: 75, y: 12 }, size: { width: 18, height: 18 }, fill: '#F2B544', stroke: '#FFFFFF', strokeWidth: 4 },
  },
  {
    name: 'Decorative Line',
    shape: { type: 'line', position: { x: 30, y: 55 }, size: { width: 40, height: 0.4 }, fill: '#F2B544' },
  },
  {
    name: 'Top Bar',
    shape: { type: 'rectangle', position: { x: 0, y: 0 }, size: { width: 100, height: 10 }, fill: '#F2B544' },
  },
  {
    name: 'Bottom Bar',
    shape: { type: 'rectangle', position: { x: 0, y: 90 }, size: { width: 100, height: 10 }, fill: '#0B4A52' },
  },
  {
    name: 'Corner Accent (Top Left)',
    shape: { type: 'corner-accent', position: { x: 5, y: 5 }, size: { width: 8, height: 8 }, stroke: '#F2B544', strokeWidth: 3 },
  },
];

export function ShapeEditor({ shapes, onShapesChange }: ShapeEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addShape = (preset?: ShapeElement) => {
    const newShape: ShapeElement = preset || {
      type: 'rectangle',
      position: { x: 40, y: 40 },
      size: { width: 20, height: 10 },
      fill: '#F2B544',
      opacity: 1,
    };
    onShapesChange([...shapes, newShape]);
    setExpandedIndex(shapes.length);
  };

  const updateShape = (index: number, updates: Partial<ShapeElement>) => {
    const newShapes = [...shapes];
    newShapes[index] = { ...newShapes[index], ...updates };
    onShapesChange(newShapes);
  };

  const removeShape = (index: number) => {
    onShapesChange(shapes.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shapes className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Decorative Elements</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{shapes.length} shapes</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Add Presets */}
        <div className="space-y-2">
          <Label className="text-sm">Quick Add</Label>
          <div className="grid grid-cols-2 gap-2">
            {SHAPE_PRESETS.slice(0, 4).map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => addShape(preset.shape)}
                className="justify-start text-xs h-auto py-2"
              >
                <Plus className="h-3 w-3 mr-1 shrink-0" />
                <span className="truncate">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Existing Shapes */}
        {shapes.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Active Shapes</Label>
            <div className="space-y-2">
              {shapes.map((shape, index) => {
                const ShapeIcon = SHAPE_TYPES.find(t => t.value === shape.type)?.icon || Square;
                return (
                  <Collapsible
                    key={index}
                    open={expandedIndex === index}
                    onOpenChange={(open) => setExpandedIndex(open ? index : null)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: shape.fill || shape.stroke || '#888' }}
                            />
                            <ShapeIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium capitalize">{shape.type}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-3 pt-0 space-y-4 border-t">
                          {/* Type */}
                          <div className="space-y-2">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={shape.type}
                              onValueChange={(v) => updateShape(index, { type: v as ShapeElement['type'] })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SHAPE_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Position */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>X Position</span>
                                <span className="text-muted-foreground">{shape.position.x}%</span>
                              </div>
                              <Slider
                                value={[shape.position.x]}
                                onValueChange={([v]) => updateShape(index, { position: { ...shape.position, x: v } })}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Y Position</span>
                                <span className="text-muted-foreground">{shape.position.y}%</span>
                              </div>
                              <Slider
                                value={[shape.position.y]}
                                onValueChange={([v]) => updateShape(index, { position: { ...shape.position, y: v } })}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </div>
                          </div>

                          {/* Size */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Width</span>
                                <span className="text-muted-foreground">{shape.size.width}%</span>
                              </div>
                              <Slider
                                value={[shape.size.width]}
                                onValueChange={([v]) => updateShape(index, { size: { ...shape.size, width: v } })}
                                min={1}
                                max={100}
                                step={1}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Height</span>
                                <span className="text-muted-foreground">{shape.size.height}%</span>
                              </div>
                              <Slider
                                value={[shape.size.height]}
                                onValueChange={([v]) => updateShape(index, { size: { ...shape.size, height: v } })}
                                min={0.1}
                                max={50}
                                step={0.1}
                              />
                            </div>
                          </div>

                          {/* Colors */}
                          <div className="space-y-2">
                            <Label className="text-xs">Fill Color</Label>
                            <div className="flex gap-2">
                              {PRESET_COLORS.map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => updateShape(index, { fill: color.value })}
                                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                                    shape.fill === color.value ? 'border-primary scale-110' : 'border-border'
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  title={color.label}
                                />
                              ))}
                              <button
                                onClick={() => updateShape(index, { fill: undefined })}
                                className={`w-6 h-6 rounded-full border-2 border-dashed ${
                                  !shape.fill ? 'border-primary' : 'border-border'
                                }`}
                                title="No fill"
                              />
                            </div>
                          </div>

                          {/* Stroke */}
                          <div className="space-y-2">
                            <Label className="text-xs">Stroke Color</Label>
                            <div className="flex gap-2">
                              {PRESET_COLORS.map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => updateShape(index, { stroke: color.value, strokeWidth: shape.strokeWidth || 2 })}
                                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                                    shape.stroke === color.value ? 'border-primary scale-110' : 'border-border'
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  title={color.label}
                                />
                              ))}
                              <button
                                onClick={() => updateShape(index, { stroke: undefined, strokeWidth: undefined })}
                                className={`w-6 h-6 rounded-full border-2 border-dashed ${
                                  !shape.stroke ? 'border-primary' : 'border-border'
                                }`}
                                title="No stroke"
                              />
                            </div>
                          </div>

                          {/* Rotation */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Rotation</span>
                              <span className="text-muted-foreground">{shape.rotation || 0}°</span>
                            </div>
                            <Slider
                              value={[shape.rotation || 0]}
                              onValueChange={([v]) => updateShape(index, { rotation: v })}
                              min={-45}
                              max={45}
                              step={1}
                            />
                          </div>

                          {/* Opacity */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Opacity</span>
                              <span className="text-muted-foreground">{Math.round((shape.opacity ?? 1) * 100)}%</span>
                            </div>
                            <Slider
                              value={[(shape.opacity ?? 1) * 100]}
                              onValueChange={([v]) => updateShape(index, { opacity: v / 100 })}
                              min={10}
                              max={100}
                              step={5}
                            />
                          </div>

                          {/* Delete */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeShape(index)}
                            className="w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove Shape
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Custom Shape */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addShape()}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Custom Shape
        </Button>
      </CardContent>
    </Card>
  );
}
