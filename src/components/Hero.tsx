import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  autoRotate?: boolean;
  className?: string;
  eyebrow?: string;
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
  autoRotate = true,
  className,
  eyebrow,
  accentedSubtitle = false,
  centered = false
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const hasMultipleImages = images.length > 1;
  useEffect(() => {
    if (!hasMultipleImages || !autoRotate) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, autoRotate]);
  return <section className={cn("relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden", className)}>
      {/* Background Images with Ken Burns Effect */}
      {images.length > 0 ? <div className="absolute inset-0 z-0">
          {images.map((img, index) => <motion.div key={img} initial={{
        opacity: 0
      }} animate={{
        opacity: index === currentImageIndex ? 1 : 0
      }} transition={{
        duration: 1.5,
        ease: "easeInOut"
      }} className="absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{
          backgroundImage: `url(${img})`
        }} />
            </motion.div>)}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div> : <div className="absolute inset-0 bg-gradient-to-br from-drake-dark via-drake-dark-muted to-primary/20" />}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>
          {eyebrow}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[0.95] tracking-tighter uppercase">
            {title}
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className={cn("text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-200 leading-relaxed max-w-xl", accentedSubtitle && "border-l-4 border-drake-gold pl-6")}>
            {subtitle}
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className={cn("flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl", centered ? "items-center justify-center mx-auto" : "items-start")}>
            {primaryCTA && <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 shadow-[var(--shadow-gold)] hover:scale-105 transition-transform w-full sm:w-auto">
                <Link to={primaryCTA.link} className="text-center py-[34px] text-sm">{primaryCTA.text}</Link>
              </Button>}
            {secondaryCTA && <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 w-full sm:w-auto">
                <Link to={secondaryCTA.link} className="text-center text-sm py-[31px]">{secondaryCTA.text}</Link>
              </Button>}
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      {hasMultipleImages && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", index === currentImageIndex ? "bg-drake-gold w-8" : "bg-white/50 hover:bg-white/80")} aria-label={`Go to slide ${index + 1}`} />)}
        </div>}
    </section>;
};
export default Hero;