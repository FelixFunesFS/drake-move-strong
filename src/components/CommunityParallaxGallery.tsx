import { useRef, useState, useEffect } from "react";
import { LazyMotion, m, domAnimation, useScroll, useTransform } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

interface GalleryImage {
  src: string;
  alt: string;
}

interface CommunityParallaxGalleryProps {
  images: GalleryImage[];
}

const CommunityParallaxGallery = ({ images }: CommunityParallaxGalleryProps) => {
  const containerRef = useRef<HTMLElement>(null);
  // Defer scroll tracking to prevent forced reflow during initial paint
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Wait for next frame to allow initial paint to complete
    const id = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isReady ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds for each card
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <LazyMotion features={domAnimation}>
      <section ref={containerRef} className="py-16 md:py-24 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">COMMUNITY</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Training <span className="text-primary">Together</span>
          </h2>
          
          {/* Desktop: Staggered horizontal layout */}
          <div className="hidden md:flex items-start justify-center gap-6 max-w-6xl mx-auto">
            <m.div 
              style={{ y: y1 }} 
              className="w-[45%] mt-8"
            >
              <div className="overflow-hidden rounded-xl shadow-xl">
                <OptimizedImage 
                  src={images[0]?.src} 
                  alt={images[0]?.alt || "Community training"} 
                  aspectRatio="video"
                  className="hover:scale-105 transition-transform duration-700"
                />
              </div>
            </m.div>
            
            <m.div 
              style={{ y: y2 }} 
              className="w-[35%] -mt-10"
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <OptimizedImage 
                  src={images[1]?.src} 
                  alt={images[1]?.alt || "Group fitness class"} 
                  aspectRatio="square"
                  className="hover:scale-105 transition-transform duration-700"
                />
              </div>
            </m.div>
            
            <m.div 
              style={{ y: y3 }} 
              className="w-[30%] mt-16"
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <OptimizedImage 
                  src={images[2]?.src} 
                  alt={images[2]?.alt || "Fitness training session"} 
                  aspectRatio="portrait"
                  className="hover:scale-105 transition-transform duration-700"
                />
              </div>
            </m.div>
          </div>
          
          {/* Mobile: Alternating stacked layout with subtle animation */}
          <div className="md:hidden space-y-6">
            {images.map((img, index) => (
              <m.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-[85%] ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <OptimizedImage 
                    src={img.src} 
                    alt={img.alt} 
                    aspectRatio="video"
                  />
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default CommunityParallaxGallery;
