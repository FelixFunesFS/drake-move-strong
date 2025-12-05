import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Eraser, Undo2 } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange: (signatureData: string | null) => void;
  width?: number;
  height?: number;
}

export default function SignaturePad({ 
  onSignatureChange, 
  width = 500, 
  height = 200 
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    // Configure drawing brush
    const brush = new PencilBrush(canvas);
    brush.color = "#1A1A1A";
    brush.width = 2;
    canvas.freeDrawingBrush = brush;

    // Track when user draws
    canvas.on("path:created", () => {
      setHasDrawn(true);
      const dataUrl = canvas.toDataURL({ format: "png", quality: 1, multiplier: 1 });
      onSignatureChange(dataUrl);
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [width, height]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    setHasDrawn(false);
    onSignatureChange(null);
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
      
      if (fabricCanvas.getObjects().length === 0) {
        setHasDrawn(false);
        onSignatureChange(null);
      } else {
        const dataUrl = fabricCanvas.toDataURL({ format: "png", quality: 1, multiplier: 1 });
        onSignatureChange(dataUrl);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} className="cursor-crosshair" />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {hasDrawn ? "Signature captured" : "Draw your signature above"}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!hasDrawn}
          >
            <Undo2 className="w-4 h-4 mr-1" />
            Undo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!hasDrawn}
          >
            <Eraser className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
