import { cn } from "@/lib/utils";
import { Lock, User, Star } from "lucide-react";

type AccessLevel = 'public' | 'member' | 'vip';

interface AccessBadgeProps {
  level: AccessLevel;
  className?: string;
  showLabel?: boolean;
}

const accessConfig = {
  public: {
    icon: Lock,
    label: 'Free',
    className: 'bg-green-500/20 text-green-400 border-green-500/30'
  },
  member: {
    icon: User,
    label: 'Member',
    className: 'bg-primary/20 text-primary border-primary/30'
  },
  vip: {
    icon: Star,
    label: 'VIP',
    className: 'bg-drake-gold/20 text-drake-gold border-drake-gold/30'
  }
};

export default function AccessBadge({ level, className, showLabel = true }: AccessBadgeProps) {
  const config = accessConfig[level];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      <Icon className="h-3 w-3" />
      {showLabel && config.label}
    </span>
  );
}
