import { LazyMotion, m, useInView, domAnimation } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fadeInUp" | "fadeIn" | "scaleIn" | "slideInLeft" | "slideInRight";
  delay?: number;
  className?: string;
  once?: boolean;
}

const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
};

const AnimatedSection = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  className,
  once = true,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "0px",
    amount: 0.2
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animations[animation]}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={className}
        style={{ 
          willChange: isInView ? "transform, opacity" : "auto",
          contain: className?.includes("overflow-visible") ? "style" : "layout style paint"
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default AnimatedSection;
