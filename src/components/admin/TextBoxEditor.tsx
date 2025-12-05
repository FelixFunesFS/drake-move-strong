import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TextCursor, Plus, Trash2, ChevronDown } from "lucide-react";
import { TextBox } from "@/lib/canvasCompositor";

interface TextBoxEditorProps {
  textBoxes: TextBox[];
  onTextBoxesChange: (textBoxes: TextBox[]) => void;
}

const PRESET_COLORS = [
  { value: '#F2B544', label: 'Gold' },
  { value: '#0B4A52', label: 'Teal' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#1A1A1A', label: 'Dark' },
];

const TEXT_BOX_PRESETS: { name: string; textBox: TextBox }[] = [
  {
    name: 'Badge Text',
    textBox: {
      text: 'NEW',
      position: { x: 82, y: 11 },
      fontSize: 24,
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      color: '#1A1A1A',
      shadow: false,
      textAlign: 'center',
      rotation: -12,
    },
  },
  {
    name: 'Date Badge',
    textBox: {
      text: 'JAN\n15',
      position: { x: 84, y: 21 },
      fontSize: 24,
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      color: '#1A1A1A',
      shadow: false,
      textAlign: 'center',
    },
  },
  {
    name: 'Top Banner Text',
    textBox: {
      text: 'STARTS JAN 1ST',
      position: { x: 50, y: 6 },
      fontSize: 28,
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      color: '#1A1A1A',
      shadow: false,
      textAlign: 'center',
    },
  },
  {
    name: 'Pill CTA',
    textBox: {
      text: 'BOOK NOW',
      position: { x: 50, y: 85 },
      fontSize: 22,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#1A1A1A',
      shadow: false,
      textAlign: 'center',
      background: {
        color: '#F2B544',
        padding: 16,
        borderRadius: 24,
        opacity: 1,
      },
    },
  },
];

export function TextBoxEditor({ textBoxes, onTextBoxesChange }: TextBoxEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addTextBox = (preset?: TextBox) => {
    const newTextBox: TextBox = preset || {
      text: 'Your Text',
      position: { x: 50, y: 50 },
      fontSize: 32,
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      color: '#FFFFFF',
      shadow: true,
      textAlign: 'center',
    };
    onTextBoxesChange([...textBoxes, newTextBox]);
    setExpandedIndex(textBoxes.length);
  };

  const updateTextBox = (index: number, updates: Partial<TextBox>) => {
    const newTextBoxes = [...textBoxes];
    newTextBoxes[index] = { ...newTextBoxes[index], ...updates };
    onTextBoxesChange(newTextBoxes);
  };

  const removeTextBox = (index: number) => {
    onTextBoxesChange(textBoxes.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TextCursor className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Custom Text Boxes</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{textBoxes.length} boxes</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Add Presets */}
        <div className="space-y-2">
          <Label className="text-sm">Quick Add</Label>
          <div className="grid grid-cols-2 gap-2">
            {TEXT_BOX_PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => addTextBox(preset.textBox)}
                className="justify-start text-xs h-auto py-2"
              >
                <Plus className="h-3 w-3 mr-1 shrink-0" />
                <span className="truncate">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Existing Text Boxes */}
        {textBoxes.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Active Text Boxes</Label>
            <div className="space-y-2">
              {textBoxes.map((textBox, index) => (
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
                            style={{ backgroundColor: textBox.color }}
                          />
                          <span className="text-sm font-medium truncate max-w-[150px]">
                            {textBox.text || 'Empty text'}
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-3 pt-0 space-y-4 border-t">
                        {/* Text */}
                        <div className="space-y-2">
                          <Label className="text-xs">Text</Label>
                          <Input
                            value={textBox.text}
                            onChange={(e) => updateTextBox(index, { text: e.target.value })}
                            placeholder="Enter text..."
                            className="h-8"
                          />
                          <p className="text-xs text-muted-foreground">Use \n for line breaks</p>
                        </div>

                        {/* Position */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>X Position</span>
                              <span className="text-muted-foreground">
                                {typeof textBox.position === 'object' ? textBox.position.x : 50}%
                              </span>
                            </div>
                            <Slider
                              value={[typeof textBox.position === 'object' ? textBox.position.x : 50]}
                              onValueChange={([v]) => updateTextBox(index, { 
                                position: { 
                                  x: v, 
                                  y: typeof textBox.position === 'object' ? textBox.position.y : 50 
                                } 
                              })}
                              min={0}
                              max={100}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Y Position</span>
                              <span className="text-muted-foreground">
                                {typeof textBox.position === 'object' ? textBox.position.y : 50}%
                              </span>
                            </div>
                            <Slider
                              value={[typeof textBox.position === 'object' ? textBox.position.y : 50]}
                              onValueChange={([v]) => updateTextBox(index, { 
                                position: { 
                                  x: typeof textBox.position === 'object' ? textBox.position.x : 50, 
                                  y: v 
                                } 
                              })}
                              min={0}
                              max={100}
                              step={1}
                            />
                          </div>
                        </div>

                        {/* Font Settings */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-xs">Font</Label>
                            <Select
                              value={textBox.fontFamily}
                              onValueChange={(v) => updateTextBox(index, { fontFamily: v as 'Oswald' | 'Inter' })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Oswald">Oswald</SelectItem>
                                <SelectItem value="Inter">Inter</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Weight</Label>
                            <Select
                              value={textBox.fontWeight}
                              onValueChange={(v) => updateTextBox(index, { fontWeight: v as 'normal' | 'bold' })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="bold">Bold</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Font Size */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Font Size</span>
                            <span className="text-muted-foreground">{textBox.fontSize}px</span>
                          </div>
                          <Slider
                            value={[textBox.fontSize]}
                            onValueChange={([v]) => updateTextBox(index, { fontSize: v })}
                            min={12}
                            max={96}
                            step={2}
                          />
                        </div>

                        {/* Text Color */}
                        <div className="space-y-2">
                          <Label className="text-xs">Text Color</Label>
                          <div className="flex gap-2">
                            {PRESET_COLORS.map((color) => (
                              <button
                                key={color.value}
                                onClick={() => updateTextBox(index, { color: color.value })}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${
                                  textBox.color === color.value ? 'border-primary scale-110' : 'border-border'
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
                            <span className="text-muted-foreground">{textBox.rotation || 0}°</span>
                          </div>
                          <Slider
                            value={[textBox.rotation || 0]}
                            onValueChange={([v]) => updateTextBox(index, { rotation: v })}
                            min={-45}
                            max={45}
                            step={1}
                          />
                        </div>

                        {/* Background Toggle */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Background</Label>
                            <Switch
                              checked={!!textBox.background}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateTextBox(index, {
                                    background: { color: '#F2B544', padding: 16, borderRadius: 8, opacity: 1 }
                                  });
                                } else {
                                  updateTextBox(index, { background: undefined });
                                }
                              }}
                            />
                          </div>

                          {textBox.background && (
                            <div className="space-y-3 pl-2 border-l-2 border-muted">
                              {/* Background Color */}
                              <div className="space-y-2">
                                <Label className="text-xs">Background Color</Label>
                                <div className="flex gap-2">
                                  {PRESET_COLORS.map((color) => (
                                    <button
                                      key={color.value}
                                      onClick={() => updateTextBox(index, {
                                        background: { ...textBox.background!, color: color.value }
                                      })}
                                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                                        textBox.background?.color === color.value ? 'border-primary scale-110' : 'border-border'
                                      }`}
                                      style={{ backgroundColor: color.value }}
                                      title={color.label}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Padding */}
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>Padding</span>
                                  <span className="text-muted-foreground">{textBox.background.padding}px</span>
                                </div>
                                <Slider
                                  value={[textBox.background.padding]}
                                  onValueChange={([v]) => updateTextBox(index, {
                                    background: { ...textBox.background!, padding: v }
                                  })}
                                  min={4}
                                  max={40}
                                  step={2}
                                />
                              </div>

                              {/* Border Radius */}
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>Roundness</span>
                                  <span className="text-muted-foreground">{textBox.background.borderRadius || 0}px</span>
                                </div>
                                <Slider
                                  value={[textBox.background.borderRadius || 0]}
                                  onValueChange={([v]) => updateTextBox(index, {
                                    background: { ...textBox.background!, borderRadius: v }
                                  })}
                                  min={0}
                                  max={32}
                                  step={2}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Shadow */}
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Text Shadow</Label>
                          <Switch
                            checked={textBox.shadow}
                            onCheckedChange={(checked) => updateTextBox(index, { shadow: checked })}
                          />
                        </div>

                        {/* Delete */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeTextBox(index)}
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove Text Box
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>
        )}

        {/* Add Custom Text Box */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => addTextBox()}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Custom Text Box
        </Button>
      </CardContent>
    </Card>
  );
}
