import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRUST_STATS } from "@/data/trustStats";
import googleLogoG from "@/assets/google-logo-g.png?format=webp&w=32";

// Re-export for backward compatibility - now pulls from centralized trustStats
export const GOOGLE_REVIEWS = {
  rating: 5, // Static value
  count: TRUST_STATS.googleReviewCount,
  url: TRUST_STATS.googleReviewUrl,
  supportingText: 'Trusted by adults in Charleston who want to move better and stay pain-free.'
};

// Google brand "G" logo - sized responsively with text, explicit dimensions to prevent CLS
const GoogleBrandedG = () => (
  <img 
    src={googleLogoG}
    alt="G"
    width={14}
    height={14}
    className="inline-block h-[1em] w-[1em] align-baseline -mb-[0.1em]"
  />
);

interface GoogleReviewsBadgeProps {
  variant?: 'full' | 'compact' | 'micro' | 'hero';
  className?: string;
  showSupportingText?: boolean;
}

const StarRating = ({ size = 20 }: { size?: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className="text-drake-gold fill-drake-gold"
      />
    ))}
  </div>
);

export function GoogleReviewsBadge({ 
  variant = 'full', 
  className,
  showSupportingText = false 
}: GoogleReviewsBadgeProps) {
  const reviewUrl = GOOGLE_REVIEWS.url;

  if (variant === 'hero') {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 text-sm sm:text-base text-white/90 hover:text-white transition-colors",
          className
        )}
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className="text-drake-gold fill-drake-gold animate-star-glow" 
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-white/70"><GoogleBrandedG />oogle Reviews</span>
      </a>
    );
  }

  if (variant === 'micro') {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
      >
        <Star size={14} className="text-drake-gold fill-drake-gold" />
        <span>{GOOGLE_REVIEWS.rating} · <GoogleBrandedG />oogle-rated in Charleston</span>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group",
          className
        )}
      >
        <StarRating size={18} />
        <span className="text-foreground font-semibold">
          {GOOGLE_REVIEWS.rating} rating
        </span>
        <span className="text-muted-foreground flex items-center gap-1">
          on <GoogleBrandedG />oogle
        </span>
        <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </a>
    );
  }

  // Full variant
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 group"
      >
        <StarRating size={24} />
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">
            {GOOGLE_REVIEWS.rating}
          </span>
          <span className="text-muted-foreground">
            average rating
          </span>
          <span className="text-foreground font-medium">
            · {GOOGLE_REVIEWS.count} Charleston client reviews
          </span>
        </div>
        <ExternalLink size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </a>
      {showSupportingText && (
        <p className="text-muted-foreground text-sm max-w-md">
          {GOOGLE_REVIEWS.supportingText}
        </p>
      )}
    </div>
  );
}

export default GoogleReviewsBadge;
