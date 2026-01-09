import { useState, useEffect } from 'react';

interface ScrollInfo {
  isScrolled: boolean;      // Scrolled past threshold
  isPastHeader: boolean;    // Scrolled past initial header position (for static-to-fixed transition)
}

const HEADER_HEIGHT = 112; // banner (~48px) + nav (~64px)

export function useScrollDirection(threshold = 100): ScrollInfo {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHeader, setIsPastHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > threshold);
      setIsPastHeader(currentScrollY > HEADER_HEIGHT);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled, isPastHeader };
}
