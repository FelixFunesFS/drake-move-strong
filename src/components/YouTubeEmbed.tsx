import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId?: string;
  title: string;
  className?: string;
  placeholder?: string;
  poster?: "maxresdefault" | "hqdefault" | "sddefault" | "mqdefault";
  customThumbnail?: string;
}

const YouTubeEmbed = ({ 
  videoId, 
  title, 
  className,
  placeholder = "Add your YouTube video ID here",
  poster = "maxresdefault",
  customThumbnail
}: YouTubeEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  if (!videoId) {
    return (
      <div className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg bg-drake-dark flex items-center justify-center border-2 border-dashed border-primary/30",
        className
      )}>
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-primary" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <p className="text-muted-foreground font-semibold mb-2">{title}</p>
          <p className="text-sm text-muted-foreground/70">{placeholder}</p>
        </div>
      </div>
    );
  }

  // Custom thumbnail mode - before playing
  if (customThumbnail && !isPlaying) {
    return (
      <div 
        className={cn("relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer group", className)}
        onClick={() => setIsPlaying(true)}
      >
        <img 
          src={customThumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
      </div>
    );
  }

  // Custom thumbnail mode - now playing
  if (customThumbnail && isPlaying) {
    return (
      <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&vq=hd1080&hd=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  // Standard LiteYouTubeEmbed with HD defaults
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg", className)}>
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        poster={poster}
        noCookie={true}
        params="rel=0&vq=hd1080"
      />
    </div>
  );
};

export default YouTubeEmbed;
