// Centralized motion configuration for consistent animations across the site
// All animations use GPU-accelerated properties (transform, opacity) for performance

export const MOTION_CONFIG = {
  // Duration values (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
  },
  
  // Stagger delays for sequential reveals
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  
  // Easing curves
  ease: {
    // Default smooth ease (used in AnimatedSection)
    default: [0.25, 0.46, 0.45, 0.94] as const,
    // Snappy for interactive elements
    snappy: [0.4, 0, 0.2, 1] as const,
    // Gentle for subtle movements
    gentle: [0.4, 0, 0.6, 1] as const,
  },
  
  // IntersectionObserver settings
  viewport: {
    once: true,
    margin: "0px",
    amount: 0.2,
  },
  
  // Card hover effects
  cardHover: {
    y: -4,
    transition: { duration: 0.2 },
  },
  
  // Scale hover for buttons/interactive elements
  scaleHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
} as const;

// Animation delay multipliers for staggered grid reveals
export const getStaggerDelay = (index: number, base: number = MOTION_CONFIG.stagger.normal) => {
  return index * base;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
