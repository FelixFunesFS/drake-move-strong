import { MapPin, Star, Award, Shield, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRUST_SIGNALS } from "@/data/trustStats";

type BadgeKey = typeof TRUST_SIGNALS[number]['key'];

const BADGE_ICONS: Record<BadgeKey, React.ElementType> = {
  local: MapPin,
  reviews: Star,
  experience: Award,
  coaching: Heart,
  safe: Shield,
};

interface MicroTrustBadgesProps {
  className?: string;
  badges?: BadgeKey[];
  variant?: 'row' | 'inline' | 'stacked';
  size?: 'sm' | 'md';
}

export function MicroTrustBadges({ 
  className,
  badges = ['local', 'reviews', 'experience'],
  variant = 'row',
  size = 'sm'
}: MicroTrustBadgesProps) {
  const selectedBadges = TRUST_SIGNALS.filter(signal => badges.includes(signal.key));
  
  const iconSize = size === 'sm' ? 12 : 14;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  if (variant === 'inline') {
    return (
      <span className={cn(
        "inline-flex items-center gap-3 text-muted-foreground",
        textSize,
        className
      )}>
        {selectedBadges.map((badge, index) => {
          const Icon = BADGE_ICONS[badge.key];
          return (
            <span key={badge.key} className="inline-flex items-center gap-1">
              {index > 0 && <span className="text-border mr-2">•</span>}
              <Icon size={iconSize} className="text-drake-teal" />
              <span>{badge.label}</span>
            </span>
          );
        })}
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={cn(
        "flex flex-col gap-2",
        className
      )}>
        {selectedBadges.map((badge) => {
          const Icon = BADGE_ICONS[badge.key];
          return (
            <div 
              key={badge.key}
              className={cn(
                "flex items-center gap-2 text-muted-foreground",
                textSize
              )}
            >
              <Icon size={iconSize} className="text-drake-teal flex-shrink-0" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Default: row variant
  return (
    <div className={cn(
      "flex flex-wrap items-center justify-center gap-x-4 gap-y-2",
      textSize,
      className
    )}>
      {selectedBadges.map((badge) => {
        const Icon = BADGE_ICONS[badge.key];
        return (
          <div 
            key={badge.key}
            className="flex items-center gap-1.5"
          >
            <Icon size={iconSize} className="text-drake-teal" />
            <span>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MicroTrustBadges;
