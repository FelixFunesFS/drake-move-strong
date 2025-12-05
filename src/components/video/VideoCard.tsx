import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Play, Clock, Lock } from "lucide-react";
import AccessBadge from "./AccessBadge";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description?: string | null;
    youtube_video_id: string;
    thumbnail_url?: string | null;
    duration_minutes?: number | null;
    difficulty_level?: string | null;
    access_level: 'public' | 'member' | 'vip';
    is_featured?: boolean;
    category?: {
      name: string;
      slug: string;
    } | null;
  };
  progress?: {
    watched_seconds: number;
    completed: boolean;
  } | null;
  canAccess: boolean;
  className?: string;
}

export default function VideoCard({ video, progress, canAccess, className }: VideoCardProps) {
  const thumbnailUrl = video.thumbnail_url || 
    `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
  
  const progressPercent = progress && video.duration_minutes 
    ? Math.min((progress.watched_seconds / (video.duration_minutes * 60)) * 100, 100)
    : 0;

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
    all_levels: 'bg-primary/20 text-primary'
  };

  const CardContent = (
    <div className={cn(
      "group relative rounded-xl overflow-hidden bg-card border border-border transition-all duration-300",
      canAccess ? "hover:border-primary/50 hover:shadow-lg cursor-pointer" : "opacity-75",
      className
    )}>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={video.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            canAccess && "group-hover:scale-105"
          )}
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault fails
            e.currentTarget.src = `https://img.youtube.com/vi/${video.youtube_video_id}/hqdefault.jpg`;
          }}
        />
        
        {/* Play overlay */}
        {canAccess ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
              <Play className="h-6 w-6 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <Lock className="h-8 w-8 text-white/80 mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">
                {video.access_level === 'vip' ? 'VIP Only' : 'Members Only'}
              </p>
            </div>
          </div>
        )}

        {/* Duration badge */}
        {video.duration_minutes && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.duration_minutes} min
          </div>
        )}

        {/* Featured badge */}
        {video.is_featured && (
          <div className="absolute top-2 left-2 bg-drake-gold text-drake-dark text-xs px-2 py-1 rounded font-semibold">
            Featured
          </div>
        )}

        {/* Progress bar */}
        {progress && progressPercent > 0 && !progress.completed && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Completed checkmark */}
        {progress?.completed && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
            ✓ Watched
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <AccessBadge level={video.access_level} showLabel={false} />
        </div>
        
        {video.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {video.description}
          </p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {video.category && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
              {video.category.name}
            </span>
          )}
          {video.difficulty_level && (
            <span className={cn(
              "text-xs px-2 py-1 rounded capitalize",
              difficultyColors[video.difficulty_level] || difficultyColors.all_levels
            )}>
              {video.difficulty_level.replace('_', ' ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (canAccess) {
    return (
      <Link to={`/member/videos/${video.id}`}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
