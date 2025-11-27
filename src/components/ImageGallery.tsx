import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            aspectRatio="square"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-drake-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageGallery;
