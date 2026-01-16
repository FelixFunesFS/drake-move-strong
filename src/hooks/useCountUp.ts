import { useState, useEffect } from "react";

export function useCountUp(target: number, isInView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      setCount(Math.floor(easeOut * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, target, duration]);

  return count;
}

export function parseStatValue(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)?([\d,]+)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: value };

  return {
    prefix: match[1] || "",
    number: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3] || ""
  };
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}
