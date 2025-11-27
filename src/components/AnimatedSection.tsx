import { motion, useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
