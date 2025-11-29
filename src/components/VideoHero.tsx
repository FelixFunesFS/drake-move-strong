import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroCTA {
  text: string | ReactNode;
  link: string;
}

interface VideoHeroProps {
  videoId: string;
  title: string | ReactNode;
  subtitle: string;
  primaryCTA?: HeroCTA;
  secondaryCTA?: HeroCTA;
  fallbackImage?: string;
  className?: string;
  eyebrow?: string;
  accentedSubtitle?: boolean;
}

// Extend Window interface for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoHero = ({
  videoId,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  fallbackImage,
  className,
  eyebrow,
  accentedSubtitle = false
}: VideoHeroProps) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const timeCheckRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeContainerRef.current) {
        playerRef.current = new window.YT.Player(iframeContainerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            start: 30,
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            vq: 'hd1080',
            hd: 1,
            quality: 'hd1080',
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              event.target.seekTo(30, true);
              event.target.playVideo();
              event.target.mute();
              
              // Delay fade-in to ensure video is playing at 30 seconds
              setTimeout(() => {
                setShowFallback(false);
              }, 500);
              
              // Start time monitoring for segment loop (30s-42s)
              timeCheckRef.current = setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  const currentTime = playerRef.current.getCurrentTime();
                  if (currentTime >= 42) {
                    playerRef.current.seekTo(30, true);
                  }
                }
              }, 200);
            },
            onError: () => {
              setShowFallback(true);
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timeCheckRef.current) {
        clearInterval(timeCheckRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Intersection Observer for scroll-based pause/play
  useEffect(() => {
    if (!containerRef.current || !isPlayerReady || !playerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!playerRef.current) return;
        
        try {
          if (entry.isIntersecting) {
            playerRef.current.playVideo();
            // Restart interval when video resumes
            if (!timeCheckRef.current) {
              timeCheckRef.current = setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  const currentTime = playerRef.current.getCurrentTime();
                  if (currentTime >= 42) {
                    playerRef.current.seekTo(30, true);
                  }
                }
              }, 200);
            }
          } else {
            playerRef.current.pauseVideo();
            // Clear interval when video pauses
            if (timeCheckRef.current) {
              clearInterval(timeCheckRef.current);
              timeCheckRef.current = null;
            }
          }
        } catch (error) {
          console.error('Error controlling video playback:', error);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPlayerReady]);

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden",
        className
      )}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* YouTube Player Container */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1500",
            showFallback ? "opacity-0" : "opacity-100"
          )}
        >
          <div 
            ref={iframeContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
            }}
          />
        </div>

        {/* Fallback Image */}
        {fallbackImage && (
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              showFallback ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-left text-white">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-drake-gold font-semibold text-sm uppercase tracking-wide mb-4"
            >
              {eyebrow}
            </motion.p>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[0.95] tracking-tighter uppercase"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={cn(
              "text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-200 leading-relaxed max-w-xl",
              accentedSubtitle && "border-l-4 border-drake-gold pl-6"
            )}
          >
            {subtitle}
          </motion.p>
          
          {(primaryCTA || secondaryCTA) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start max-w-xl"
            >
              {primaryCTA && (
                <Button
                  asChild
                  size="lg"
                  className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-base md:text-lg px-8 py-5 md:py-6 shadow-[var(--shadow-gold)] hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  <Link to={primaryCTA.link} className="text-center text-sm">
                    {primaryCTA.text}
                  </Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-base md:text-lg px-4 md:px-6 py-5 md:py-6 w-auto"
                >
                  <Link to={secondaryCTA.link} className="text-center px-[30px] text-sm">
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
