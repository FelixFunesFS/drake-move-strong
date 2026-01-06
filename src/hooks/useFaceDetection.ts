import { useState, useEffect, useCallback } from 'react';

interface FacePosition {
  objectPosition: string;
  facesDetected: number;
}

// Cache for storing computed positions
const positionCache = new Map<string, FacePosition>();
let modelsLoaded = false;
let faceApiModule: typeof import('face-api.js') | null = null;

// Lazy load face-api.js to avoid blocking initial render
const loadFaceApi = async () => {
  if (faceApiModule) return faceApiModule;
  faceApiModule = await import('face-api.js');
  return faceApiModule;
};

export const useFaceDetection = (imageSrc: string, enabled: boolean = true) => {
  const [position, setPosition] = useState<FacePosition | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const detectFaces = useCallback(async () => {
    if (!enabled || !imageSrc) return;
    
    // Check cache first
    if (positionCache.has(imageSrc)) {
      setPosition(positionCache.get(imageSrc)!);
      return;
    }

    setIsLoading(true);
    
    try {
      // Lazy load face-api.js
      const faceapi = await loadFaceApi();
      
      // Load models only once
      if (!modelsLoaded) {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        modelsLoaded = true;
      }

      // Create image element for detection
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Use requestIdleCallback to avoid blocking main thread
      const runDetection = async () => {
        const detections = await faceapi.detectAllFaces(
          img, 
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
          // Calculate average Y position of all faces
          const avgTop = detections.reduce((sum, d) => sum + d.box.top, 0) / detections.length;
          const avgBottom = detections.reduce((sum, d) => sum + d.box.bottom, 0) / detections.length;
          const faceCenter = (avgTop + avgBottom) / 2;
          
          // Convert to percentage of image height
          const yPercent = Math.round((faceCenter / img.height) * 100);
          
          // Clamp between 10% and 90% to avoid extreme positions
          const clampedY = Math.max(10, Math.min(90, yPercent));
          
          const result: FacePosition = {
            objectPosition: `center ${clampedY}%`,
            facesDetected: detections.length
          };
          
          positionCache.set(imageSrc, result);
          setPosition(result);
        } else {
          // No faces - use center
          const result: FacePosition = {
            objectPosition: 'center center',
            facesDetected: 0
          };
          positionCache.set(imageSrc, result);
          setPosition(result);
        }
      };

      // Schedule detection during idle time
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => runDetection(), { timeout: 2000 });
      } else {
        // Fallback: use setTimeout to defer
        setTimeout(runDetection, 100);
      }
    } catch (error) {
      console.warn('Face detection failed:', error);
      setPosition({ objectPosition: 'center center', facesDetected: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [imageSrc, enabled]);

  useEffect(() => {
    // Defer face detection until after initial paint
    const timeoutId = setTimeout(() => {
      detectFaces();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [detectFaces]);

  return { position, isLoading };
};
