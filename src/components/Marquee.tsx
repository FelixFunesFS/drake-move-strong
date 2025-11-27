import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  gradient?: boolean;
}

const Marquee = ({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  gradient = true,
}: MarqueeProps) => {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {gradient && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      <div
        className={cn(
          "flex w-max animate-marquee gap-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: speedMap[speed],
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
