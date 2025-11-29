import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  priority?: boolean;
  objectPosition?: string;
  transparent?: boolean;
  hideLoadingPlaceholder?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  aspectRatio = "auto",
  priority = false,
  objectPosition,
  transparent = false,
  hideLoadingPlaceholder = false
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectRatioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      !transparent && "bg-muted",
      aspectRatioClasses[aspectRatio],
      className
    )}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={objectPosition ? { objectPosition } : undefined}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />
      {!isLoaded && !hideLoadingPlaceholder && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted-foreground/10 to-muted" />
      )}
    </div>
  );
};

export default OptimizedImage;
