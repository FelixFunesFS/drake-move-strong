import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
interface HeroCTA {
  text: string | ReactNode;
  link: string;
}
interface HeroProps {
  title: string | ReactNode;
  subtitle: string;
  primaryCTA?: HeroCTA;
  secondaryCTA?: HeroCTA;
  backgroundImage?: string;
  backgroundImages?: string[];
  backgroundImagesMobile?: string[];
  autoRotate?: boolean;
  className?: string;
  eyebrow?: string | ReactNode;
  accentedSubtitle?: boolean;
  centered?: boolean;
}
const Hero = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundImages,
  backgroundImagesMobile,
  autoRotate = true,
  className,
  eyebrow,
  accentedSubtitle = false,
  centered = false
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const mobileImages = backgroundImagesMobile || [];
  const hasMultipleImages = images.length > 1;
  
  // Image preload handled in index.html for faster discovery
  
  useEffect(() => {
    if (!hasMultipleImages || !autoRotate) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, autoRotate]);
  return (
    <LazyMotion features={domAnimation}>
      <section className={cn("relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center md:items-start md:pt-28 lg:pt-36 overflow-hidden", className)}>
        {/* Background Images with Ken Burns Effect - uses real <img> for LCP optimization */}
        {images.length > 0 ? (
          <div className="absolute inset-0 z-0">
            {images.map((img, index) => (
              <m.div 
                key={img} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }} 
                transition={{ duration: 1.5, ease: "easeInOut" }} 
                className="absolute inset-0"
              >
                {/* Use actual <img> element for LCP - fetchpriority only on first image */}
                <img 
                  src={img} 
                  srcSet={mobileImages[index] ? `${mobileImages[index]} 768w, ${img} 1920w` : undefined}
                  alt="" 
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding={index === 0 ? "sync" : "async"}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                  aria-hidden="true"
                />
              </m.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-drake-dark via-drake-dark-muted to-primary/20" />
        )}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>
            {eyebrow && (
              <m.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="section-eyebrow text-drake-gold mb-2 md:mb-4"
              >
                {eyebrow}
              </m.p>
            )}
            {/* H1 uses regular element for faster LCP - no motion wrapper */}
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-5 leading-[0.95] tracking-tighter uppercase">
              {title}
            </h1>
            <m.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className={cn("text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-200 leading-relaxed max-w-xl", accentedSubtitle && "border-l-4 border-drake-gold pl-6")}
            >
              {subtitle}
            </m.p>
            <m.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.6 }} 
              className={cn("flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl", centered ? "items-center justify-center mx-auto" : "items-start")}
            >
              {primaryCTA && (
                <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-8 py-4 sm:py-5 md:py-4 h-auto min-h-[56px] md:min-h-[44px] shadow-[var(--shadow-gold)] hover:scale-105 transition-transform w-full sm:w-auto">
                  <Link to={primaryCTA.link} className="text-center">{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                secondaryCTA.link.startsWith('http') ? (
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-8 py-4 sm:py-5 md:py-4 h-auto min-h-[56px] md:min-h-[44px] w-full sm:w-auto">
                    <a href={secondaryCTA.link} target="_blank" rel="noopener noreferrer" className="text-center">{secondaryCTA.text}</a>
                  </Button>
                ) : (
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-8 py-4 sm:py-5 md:py-4 h-auto min-h-[56px] md:min-h-[44px] w-full sm:w-auto">
                    <Link to={secondaryCTA.link} className="text-center">{secondaryCTA.text}</Link>
                  </Button>
                )
              )}
            </m.div>
          </div>
        </div>

        {/* Image Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentImageIndex(index)} 
                className={cn("w-2 h-2 rounded-full transition-all duration-300", index === currentImageIndex ? "bg-drake-gold w-8" : "bg-white/50 hover:bg-white/80")} 
                aria-label={`Go to slide ${index + 1}`} 
              />
            ))}
          </div>
        )}
      </section>
    </LazyMotion>
  );
};
export default Hero;