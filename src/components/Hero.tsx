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
  fullViewport?: boolean;
  bannerVisible?: boolean;
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
  centered = false,
  fullViewport = false,
  bannerVisible = false
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
  // Dynamic height: shorter on mobile to peek Marquee, full viewport on desktop
  // Adjust for banner visibility: with banner 200px, without banner 150px
  const mobileHeightOffset = bannerVisible ? 168 : 118;
  const heroHeightClass = fullViewport 
    ? `h-[calc(100vh-${mobileHeightOffset}px)] md:h-[calc(100vh-112px)]`
    : "h-[500px] sm:h-[600px] md:h-[600px] lg:h-[700px]";
  
  // Content positioning: mobile starts higher, desktop centers
  const contentPositionClass = fullViewport
    ? "items-start pt-[15vh] md:items-center md:pt-0"
    : "items-center md:items-start md:pt-8 lg:pt-12";
    
  return (
    <LazyMotion features={domAnimation}>
      <section className={cn("relative flex overflow-hidden", heroHeightClass, contentPositionClass, className)}>
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
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-[center_40%] animate-ken-burns"
                  aria-hidden="true"
                />
              </m.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-drake-dark via-drake-dark-muted to-primary/20" />
        )}

        {/* Content */}
        <div className="container mx-auto px-4 pb-20 md:pb-0 relative z-10">
          <div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>
            {eyebrow && (
              <m.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden sm:block section-eyebrow text-drake-gold mb-2 md:mb-4"
              >
                {eyebrow}
              </m.p>
            )}
            {/* H1 uses regular element for faster LCP - no motion wrapper */}
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-5 leading-[0.95] tracking-tighter uppercase -mt-[20px]">
              {title}
            </h1>
            <m.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className={cn("text-base sm:text-lg md:text-xl mb-5 md:mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] leading-relaxed max-w-xl", accentedSubtitle && "border-l-4 border-drake-gold pl-6")}
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
                primaryCTA.link.startsWith('#') || primaryCTA.link.startsWith('http') ? (
                  <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-16 py-4 sm:py-5 md:py-4 h-auto min-h-[52px] md:min-h-[40px] border-2 border-transparent shadow-[var(--shadow-gold)] hover:scale-105 transition-transform w-full sm:w-auto">
                    <a href={primaryCTA.link} {...(primaryCTA.link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-center">{primaryCTA.text}</a>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-16 py-4 sm:py-5 md:py-4 h-auto min-h-[52px] md:min-h-[40px] border-2 border-transparent shadow-[var(--shadow-gold)] hover:scale-105 transition-transform w-full sm:w-auto">
                    <Link to={primaryCTA.link} className="text-center">{primaryCTA.text}</Link>
                  </Button>
                )
              )}
              {secondaryCTA && (
                secondaryCTA.link.startsWith('http') ? (
                  <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-drake-dark font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-8 py-4 sm:py-5 md:py-4 h-auto min-h-[52px] md:min-h-[56px] w-full sm:w-auto">
                    <a href={secondaryCTA.link} target="_blank" rel="noopener noreferrer" className="text-center">{secondaryCTA.text}</a>
                  </Button>
                ) : (
                  <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-drake-dark font-semibold text-sm sm:text-base md:text-base px-6 sm:px-8 md:px-8 py-4 sm:py-5 md:py-4 h-auto min-h-[52px] md:min-h-[56px] w-full sm:w-auto">
                    <Link to={secondaryCTA.link} className="text-center">{secondaryCTA.text}</Link>
                  </Button>
                )
              )}
            </m.div>
          </div>
        </div>

      </section>
    </LazyMotion>
  );
};
export default Hero;