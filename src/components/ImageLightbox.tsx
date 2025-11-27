import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setSlideDirection("right");
        onPrevious();
      }
      if (e.key === "ArrowRight") {
        setSlideDirection("left");
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Touch/swipe support (horizontal and vertical)
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };

    const handleSwipe = () => {
      const horizontalDistance = touchStartX - touchEndX;
      const verticalDistance = touchStartY - touchEndY;

      // Horizontal swipe (left/right navigation)
      if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
        if (horizontalDistance > 50) {
          setSlideDirection("left");
          onNext();
        }
        if (horizontalDistance < -50) {
          setSlideDirection("right");
          onPrevious();
        }
      }
      
      // Vertical swipe down to close
      if (verticalDistance < -100 && Math.abs(horizontalDistance) < 50) {
        onClose();
      }
    };

    const container = containerRef.current;
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onNext, onPrevious, onClose]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]"
          onClick={onClose}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10 rounded-full h-12 w-12"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Previous Button - Always visible with infinite loop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setSlideDirection("right");
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10 rounded-full h-12 w-12 md:h-14 md:w-14"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </Button>

          {/* Next Button - Always visible with infinite loop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setSlideDirection("left");
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10 rounded-full h-12 w-12 md:h-14 md:w-14"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </Button>

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ 
              opacity: 0, 
              x: slideDirection === "left" ? 100 : slideDirection === "right" ? -100 : 0,
              scale: 0.95 
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ 
              opacity: 0, 
              x: slideDirection === "left" ? -100 : slideDirection === "right" ? 100 : 0,
              scale: 0.95 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Indicator */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
            )}
            
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              onLoad={() => setIsImageLoading(false)}
              className={cn(
                "w-full h-full object-contain rounded-lg transition-opacity duration-300",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
            />
          </motion.div>

          {/* Alt Text Caption */}
          <div className="absolute bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-full px-4">
            <p className="text-white text-center text-sm md:text-base bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm">
              {currentImage.alt}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
