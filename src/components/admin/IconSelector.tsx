import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Plus, Trash2, ChevronDown } from "lucide-react";
import { FITNESS_ICONS } from "@/lib/iconLibrary";

export interface IconElement {
  iconKey: string;
  position: { x: number; y: number };
  size: number;
  color: string;
  rotation?: number;
}

interface IconSelectorProps {
  icons: IconElement[];
  onIconsChange: (icons: IconElement[]) => void;
}

const PRESET_COLORS = [
  { value: '#F2B544', label: 'Gold' },
  { value: '#0B4A52', label: 'Teal' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#1A1A1A', label: 'Dark' },
];

export function IconSelector({ icons, onIconsChange }: IconSelectorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'fitness' | 'ui' | 'all'>('fitness');

  const addIcon = (iconKey: string) => {
    const newIcon: IconElement = {
      iconKey,
      position: { x: 50, y: 50 },
      size: 48,
      color: '#F2B544',
      rotation: 0,
    };
    onIconsChange([...icons, newIcon]);
    setExpandedIndex(icons.length);
  };

  const updateIcon = (index: number, updates: Partial<IconElement>) => {
    const newIcons = [...icons];
    newIcons[index] = { ...newIcons[index], ...updates };
    onIconsChange(newIcons);
  };

  const removeIcon = (index: number) => {
    onIconsChange(icons.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const filteredIcons = Object.entries(FITNESS_ICONS).filter(([_, icon]) => 
    selectedCategory === 'all' || icon.category === selectedCategory
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Icons</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{icons.length} icons</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'fitness' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('fitness')}
          >
            Fitness
          </Button>
          <Button
            variant={selectedCategory === 'ui' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('ui')}
          >
            UI
          </Button>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
        </div>

        {/* Icon Grid */}
        <div className="space-y-2">
          <Label className="text-sm">Add Icon</Label>
          <div className="grid grid-cols-5 gap-2">
            {filteredIcons.map(([key, icon]) => (
              <button
                key={key}
                onClick={() => addIcon(key)}
                className="p-2 border rounded-lg hover:bg-muted/50 hover:border-primary/50 transition-all group"
                title={icon.name}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-auto text-muted-foreground group-hover:text-primary transition-colors"
                  fill="currentColor"
                >
                  <path d={icon.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Active Icons */}
        {icons.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Active Icons</Label>
            <div className="space-y-2">
              {icons.map((icon, index) => {
                const iconDef = FITNESS_ICONS[icon.iconKey];
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
                              className="w-6 h-6 rounded flex items-center justify-center"
                              style={{ backgroundColor: icon.color + '20' }}
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill={icon.color}>
                                <path d={iconDef?.path || ''} />
                              </svg>
                            </div>
                            <span className="text-sm font-medium">{iconDef?.name || icon.iconKey}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-3 pt-0 space-y-4 border-t">
                          {/* Position */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>X Position</span>
                                <span className="text-muted-foreground">{icon.position.x}%</span>
                              </div>
                              <Slider
                                value={[icon.position.x]}
                                onValueChange={([v]) => updateIcon(index, { position: { ...icon.position, x: v } })}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Y Position</span>
                                <span className="text-muted-foreground">{icon.position.y}%</span>
                              </div>
                              <Slider
                                value={[icon.position.y]}
                                onValueChange={([v]) => updateIcon(index, { position: { ...icon.position, y: v } })}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </div>
                          </div>

                          {/* Size */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Size</span>
                              <span className="text-muted-foreground">{icon.size}px</span>
                            </div>
                            <Slider
                              value={[icon.size]}
                              onValueChange={([v]) => updateIcon(index, { size: v })}
                              min={16}
                              max={120}
                              step={4}
                            />
                          </div>

                          {/* Color */}
                          <div className="space-y-2">
                            <Label className="text-xs">Color</Label>
                            <div className="flex gap-2">
                              {PRESET_COLORS.map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => updateIcon(index, { color: color.value })}
                                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                                    icon.color === color.value ? 'border-primary scale-110' : 'border-border'
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  title={color.label}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Rotation */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Rotation</span>
                              <span className="text-muted-foreground">{icon.rotation || 0}°</span>
                            </div>
                            <Slider
                              value={[icon.rotation || 0]}
                              onValueChange={([v]) => updateIcon(index, { rotation: v })}
                              min={-180}
                              max={180}
                              step={5}
                            />
                          </div>

                          {/* Delete */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeIcon(index)}
                            className="w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove Icon
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
      </CardContent>
    </Card>
  );
}