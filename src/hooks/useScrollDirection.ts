import { useState, useEffect, useRef } from 'react';

interface ScrollInfo {
  isScrolled: boolean;      // Scrolled past threshold
  isScrollingDown: boolean; // Current direction
  isVisible: boolean;       // Should header be visible
  isPastHeader: boolean;    // Scrolled past initial header position (for static-to-fixed transition)
}

const HEADER_HEIGHT = 112; // banner (~48px) + nav (~64px)

export function useScrollDirection(threshold = 100): ScrollInfo {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPastHeader, setIsPastHeader] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      // Update scroll direction and states
      setIsScrollingDown(scrollingDown);
      setIsScrolled(currentScrollY > threshold);
      setIsPastHeader(currentScrollY > HEADER_HEIGHT);
      
      // Hide when scrolling down past threshold
      if (scrollingDown && currentScrollY > threshold) {
        setIsVisible(false);
      }
      
      // Show when scrolling up
      if (!scrollingDown) {
        setIsVisible(true);
      }
      
      // Show when stopped scrolling (after 150ms)
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 150);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [threshold]);

  return { isScrolled, isScrollingDown, isVisible, isPastHeader };
}
