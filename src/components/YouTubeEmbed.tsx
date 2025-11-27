import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId?: string;
  title: string;
  className?: string;
  placeholder?: string;
}

const YouTubeEmbed = ({ 
  videoId, 
  title, 
  className,
  placeholder = "Add your YouTube video ID here" 
}: YouTubeEmbedProps) => {
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

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg", className)}>
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        poster="hqdefault"
        noCookie={true}
      />
    </div>
  );
};

export default YouTubeEmbed;
