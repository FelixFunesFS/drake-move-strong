import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import ImageLightbox from "./ImageLightbox";
import { Button } from "./ui/button";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  initialCount?: number;
  loadMoreCount?: number;
}

const ImageGallery = ({ 
  images, 
  initialCount = 12, 
  loadMoreCount = 12 
}: ImageGalleryProps) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;
  const remainingCount = images.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreCount, images.length));
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
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {visibleImages.map((image, index) => (
          <motion.div
            key={index}
            variants={item}
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
            <div className="absolute inset-0 bg-gradient-to-t from-drake-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Expand className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={handleLoadMore}
            variant="gold"
            size="lg"
            className="gap-2"
          >
            View More Photos
            <span className="text-sm opacity-90">
              ({remainingCount} more)
            </span>
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
