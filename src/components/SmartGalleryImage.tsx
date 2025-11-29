import { useFaceDetection } from '@/hooks/useFaceDetection';
import OptimizedImage from './OptimizedImage';

interface SmartGalleryImageProps {
  src: string;
  alt: string;
  manualPosition?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  className?: string;
}

const SmartGalleryImage = ({
  src,
  alt,
  manualPosition,
  aspectRatio = "square",
  className
}: SmartGalleryImageProps) => {
  // Skip detection if manual position provided
  const { position, isLoading } = useFaceDetection(src, !manualPosition);
  
  const objectPosition = manualPosition || position?.objectPosition || 'center center';

  return (
    <div className="relative">
      <OptimizedImage
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        objectPosition={objectPosition}
        className={className}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default SmartGalleryImage;
