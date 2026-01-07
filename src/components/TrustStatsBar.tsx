import { Trophy, Users, Award, Star, CheckCircle, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATS_CONFIG, StatKey } from "@/data/trustStats";

const STAT_ICONS: Record<StatKey, React.ElementType> = {
  sessions: Trophy,
  charlestonians: Users,
  experience: Award,
  retention: UserCheck,
  rating: Star,
  reviews: CheckCircle,
  classSize: Users,
};

interface TrustStatsBarProps {
  variant?: 'horizontal' | 'compact' | 'minimal' | 'vertical';
  stats?: StatKey[];
  className?: string;
  showSublabels?: boolean;
}

export function TrustStatsBar({ 
  variant = 'horizontal', 
  stats = ['sessions', 'charlestonians', 'experience', 'rating'],
  className,
  showSublabels = true
}: TrustStatsBarProps) {
  
  if (variant === 'minimal') {
    return (
      <div className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4 text-sm text-muted-foreground",
        className
      )}>
        {stats.map((statKey, index) => {
          const stat = STATS_CONFIG[statKey];
          const Icon = STAT_ICONS[statKey];
          return (
            <span key={statKey} className="flex items-center gap-1.5">
              {index > 0 && <span className="hidden sm:inline text-border">•</span>}
              <Icon size={14} className="text-drake-teal" />
              <span className="font-medium text-foreground">{stat.value}</span>
              <span>{stat.label}</span>
            </span>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        "grid grid-cols-2 gap-4 py-6",
        className
      )}>
        {stats.map((statKey) => {
          const stat = STATS_CONFIG[statKey];
          const Icon = STAT_ICONS[statKey];
          return (
            <div key={statKey} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon size={20} className="text-drake-teal" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={cn(
        "flex flex-col gap-4 py-6",
        className
      )}>
        {stats.map((statKey) => {
          const stat = STATS_CONFIG[statKey];
          const Icon = STAT_ICONS[statKey];
          return (
            <div key={statKey} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Icon size={24} className="text-drake-teal" />
              </div>
              <div>
                <div className="font-bold text-xl text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                {showSublabels && (
                  <div className="text-xs text-muted-foreground/70">{stat.sublabel}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default: horizontal variant
  return (
    <div className={cn(
      "py-8 md:py-12 bg-muted/30",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((statKey) => {
            const stat = STATS_CONFIG[statKey];
            const Icon = STAT_ICONS[statKey];
            return (
              <div key={statKey} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-drake-teal/10 mb-3">
                  <Icon size={24} className="text-drake-teal" />
                </div>
                <div className="font-bold text-2xl md:text-3xl text-foreground font-heading">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mt-1">
                  {stat.label}
                </div>
                {showSublabels && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrustStatsBar;
