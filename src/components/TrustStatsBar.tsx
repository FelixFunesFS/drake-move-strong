import { useRef } from "react";
import { Trophy, Users, Award, Star, CheckCircle, UserCheck } from "lucide-react";
import { LazyMotion, m, domAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { STATS_CONFIG, StatKey } from "@/data/trustStats";
import { MOTION_CONFIG, getStaggerDelay } from "@/lib/motionConfig";
import { useCountUp, parseStatValue, formatNumber } from "@/hooks/useCountUp";
import googleLogoG from "@/assets/google-logo-g.png";

const STAT_ICONS: Record<StatKey, React.ElementType> = {
  sessions: Trophy,
  charlestonians: Users,
  experience: Award,
  retention: UserCheck,
  rating: Star,
  reviews: CheckCircle,
  classSize: Users,
};

// Google branded "G" for inline use in stats
const GoogleG = () => (
  <img 
    src={googleLogoG} 
    alt="G" 
    className="inline-block h-[0.85em] w-auto align-baseline -mb-[0.05em]"
  />
);

// Helper to render label with Google branding for reviews stat
function StatLabel({ statKey, label }: { statKey: StatKey; label: string }) {
  if (statKey === 'reviews') {
    return (
      <span>
        <GoogleG />oogle Verified Reviews
      </span>
    );
  }
  return <span>{label}</span>;
}

// Colorful icon backgrounds - complementary to brand palette
const STAT_COLORS: Record<StatKey, { bg: string; icon: string }> = {
  sessions: { bg: "bg-amber-500/15", icon: "text-amber-500" },
  charlestonians: { bg: "bg-drake-teal/15", icon: "text-drake-teal" },
  experience: { bg: "bg-emerald-500/15", icon: "text-emerald-600" },
  retention: { bg: "bg-violet-500/15", icon: "text-violet-600" },
  rating: { bg: "bg-drake-gold/15", icon: "text-drake-gold" },
  reviews: { bg: "bg-sky-500/15", icon: "text-sky-600" },
  classSize: { bg: "bg-rose-500/15", icon: "text-rose-500" },
};

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

// Count-up value component
function CountUpValue({ value, isInView }: { value: string; isInView: boolean }) {
  const { number, prefix, suffix } = parseStatValue(value);
  const animatedNumber = useCountUp(number, isInView, 2000);

  return (
    <span>
      {prefix}{formatNumber(animatedNumber)}{suffix}
    </span>
  );
}

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  if (variant === 'minimal') {
    return (
      <LazyMotion features={domAnimation}>
        <div 
          ref={ref}
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4 text-sm text-muted-foreground",
            className
          )}
        >
          {stats.map((statKey, index) => {
            const stat = STATS_CONFIG[statKey];
            const Icon = STAT_ICONS[statKey];
            const colors = STAT_COLORS[statKey];
            return (
              <m.span 
                key={statKey} 
                className="flex items-center gap-1.5"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={statVariants}
                transition={{
                  duration: 0.5,
                  delay: getStaggerDelay(index, 0.1),
                  ease: MOTION_CONFIG.ease.default
                }}
              >
                {index > 0 && <span className="hidden sm:inline text-border">•</span>}
                <Icon size={14} className={colors.icon} />
                <span className="font-medium text-foreground">
                  <CountUpValue value={stat.value} isInView={isInView} />
                </span>
                <StatLabel statKey={statKey} label={stat.label} />
              </m.span>
            );
          })}
        </div>
      </LazyMotion>
    );
  }

  if (variant === 'compact') {
    return (
      <LazyMotion features={domAnimation}>
        <div 
          ref={ref}
          className={cn(
            "grid grid-cols-2 gap-4 py-6",
            className
          )}
        >
          {stats.map((statKey, index) => {
            const stat = STATS_CONFIG[statKey];
            const Icon = STAT_ICONS[statKey];
            const colors = STAT_COLORS[statKey];
            return (
              <m.div 
                key={statKey} 
                className="flex items-center gap-3"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={statVariants}
                transition={{
                  duration: 0.5,
                  delay: getStaggerDelay(index, 0.1),
                  ease: MOTION_CONFIG.ease.default
                }}
              >
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                  colors.bg
                )}>
                  <Icon size={20} className={colors.icon} />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">
                    <CountUpValue value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-xs text-muted-foreground"><StatLabel statKey={statKey} label={stat.label} /></div>
                </div>
              </m.div>
            );
          })}
        </div>
      </LazyMotion>
    );
  }

  if (variant === 'vertical') {
    return (
      <LazyMotion features={domAnimation}>
        <div 
          ref={ref}
          className={cn(
            "flex flex-col gap-4 py-6",
            className
          )}
        >
          {stats.map((statKey, index) => {
            const stat = STATS_CONFIG[statKey];
            const Icon = STAT_ICONS[statKey];
            const colors = STAT_COLORS[statKey];
            return (
              <m.div 
                key={statKey} 
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={statVariants}
                transition={{
                  duration: 0.5,
                  delay: getStaggerDelay(index, 0.1),
                  ease: MOTION_CONFIG.ease.default
                }}
              >
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                  colors.bg
                )}>
                  <Icon size={24} className={colors.icon} />
                </div>
                <div>
                  <div className="font-bold text-xl text-foreground">
                    <CountUpValue value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-sm text-muted-foreground"><StatLabel statKey={statKey} label={stat.label} /></div>
                  {showSublabels && (
                    <div className="text-xs text-muted-foreground/70">{stat.sublabel}</div>
                  )}
                </div>
              </m.div>
            );
          })}
        </div>
      </LazyMotion>
    );
  }

  // Default: horizontal variant
  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={ref}
        className={cn(
          "py-8 md:py-12 relative overflow-hidden",
          className
        )}
      >
        {/* Brand teal background with gradient */}
        <div className="absolute inset-0 bg-drake-teal" />
        <div className="absolute inset-0 bg-gradient-to-br from-drake-teal via-drake-teal/95 to-drake-dark/80" />
        
        {/* Subtle gold accent borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-drake-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-drake-gold/50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((statKey, index) => {
              const stat = STATS_CONFIG[statKey];
              const Icon = STAT_ICONS[statKey];
              return (
                <m.div 
                  key={statKey} 
                  className="text-center"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={statVariants}
                  transition={{
                    duration: 0.5,
                    delay: getStaggerDelay(index, 0.1),
                    ease: MOTION_CONFIG.ease.default
                  }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 bg-white/20">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="font-bold text-2xl md:text-3xl text-white font-heading">
                    <CountUpValue value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-sm font-medium text-white/90 mt-1">
                    <StatLabel statKey={statKey} label={stat.label} />
                  </div>
                  {showSublabels && (
                    <div className="text-xs text-white/70 mt-0.5">
                      {stat.sublabel}
                    </div>
                  )}
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default TrustStatsBar;
