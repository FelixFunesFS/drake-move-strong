import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  className: string;
  startTime: string;
  endTime?: string | null;
  instructor?: string | null;
  location?: string | null;
  spotsRemaining?: number | null;
  spotsTotal?: number | null;
  isOnline?: boolean;
  punchpassUrl?: string | null;
  variant?: 'compact' | 'full';
  onBookClick?: () => void;
}

export function ClassCard({
  className,
  startTime,
  endTime,
  instructor,
  location,
  spotsRemaining,
  spotsTotal,
  isOnline,
  punchpassUrl,
  variant = 'full',
  onBookClick,
}: ClassCardProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getSpotsColor = () => {
    if (spotsRemaining === null || spotsRemaining === undefined) return 'text-muted-foreground';
    if (spotsRemaining <= 2) return 'text-destructive';
    if (spotsRemaining <= 5) return 'text-drake-gold';
    return 'text-green-600';
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-center shrink-0">
            <p className="text-sm font-bold text-primary">{formatTime(startTime)}</p>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{className}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {instructor && <span>{instructor}</span>}
              {isOnline && <Badge variant="secondary" className="text-[10px] px-1 py-0">ZOOM</Badge>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {spotsRemaining !== null && spotsRemaining !== undefined && (
            <span className={cn("text-xs font-medium", getSpotsColor())}>
              {spotsRemaining} spots
            </span>
          )}
          {punchpassUrl && (
            <Button 
              size="sm" 
              variant="default" 
              className="h-7 px-2 text-xs"
              onClick={onBookClick}
            >
              Book
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-card transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h4 className="font-hero font-bold text-base uppercase truncate">{className}</h4>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{formatTime(startTime)}</span>
            {endTime && <span>- {formatTime(endTime)}</span>}
          </div>
        </div>
        {isOnline ? (
          <Badge variant="secondary" className="shrink-0">ZOOM</Badge>
        ) : (
          <Badge variant="outline" className="shrink-0">In Studio</Badge>
        )}
      </div>
      
      <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
        {instructor && (
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span>{instructor}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {(spotsRemaining !== null && spotsRemaining !== undefined) && (
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className={cn("font-medium", getSpotsColor())}>
              {spotsRemaining}{spotsTotal ? `/${spotsTotal}` : ''} spots left
            </span>
          </div>
        )}
      </div>
      
      {punchpassUrl && (
        <Button className="w-full" size="sm" onClick={onBookClick}>
          Book Now
        </Button>
      )}
    </div>
  );
}

export default ClassCard;
