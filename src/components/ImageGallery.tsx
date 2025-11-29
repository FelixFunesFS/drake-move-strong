import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ChevronUp } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import ImageLightbox from "./ImageLightbox";
import { Button } from "./ui/button";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  initialCount?: number;
}

const ImageGallery = ({ 
  images, 
  initialCount = 12
}: ImageGalleryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const visibleImages = isExpanded ? images : images.slice(0, initialCount);
  const hasMore = images.length > initialCount;
  const hiddenCount = images.length - initialCount;

  const handleToggle = () => {
    if (isExpanded && galleryRef.current) {
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    setIsExpanded(!isExpanded);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div ref={galleryRef} className="scroll-mt-24">
        <motion.div 
          layout 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  delay: index >= initialCount && isExpanded 
                    ? (index - initialCount) * 0.05 
                    : index * 0.03
                }}
                layout
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`View ${image.alt} in lightbox`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio="square"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-drake-dark/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    <Expand className="h-6 w-6 text-white" />
                  </div>
                </div>
                {/* Touch indicator - always visible on mobile */}
                <div className="md:hidden absolute bottom-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-2">
                  <Expand className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasMore && (
        <motion.div layout className="flex justify-center mt-8">
          <Button
            onClick={handleToggle}
            variant="gold"
            size="lg"
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-5 w-5" />
                Show Less
              </>
            ) : (
              <>
                View All Photos
                <span className="text-sm opacity-90">
                  ({hiddenCount} more)
                </span>
              </>
            )}
          </Button>
        </motion.div>
      )}

      <ImageLightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
};

export default ImageGallery;
