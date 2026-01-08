import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Monitor, User } from "lucide-react";

interface ClassItem {
  id: string;
  class_name: string;
  start_time: string;
  end_time: string | null;
  instructor: string | null;
  is_online: boolean;
  punchpass_url: string | null;
}

interface WeekDayColumnProps {
  date: Date;
  classes: ClassItem[];
  onClassClick: (classItem: ClassItem) => void;
}

export function WeekDayColumn({ date, classes, onClassClick }: WeekDayColumnProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const today = isToday(date);
  const tomorrow = isTomorrow(date);

  return (
    <div className={`flex flex-col min-w-[140px] ${today ? 'bg-primary/5 rounded-lg' : ''}`}>
      {/* Day Header */}
      <div className={`p-2 text-center border-b border-border sticky top-0 bg-card z-10 ${today ? 'bg-primary/5' : ''}`}>
        <div className="text-xs font-medium text-muted-foreground uppercase">
          {format(date, 'EEE')}
        </div>
        <div className={`text-lg font-bold ${today ? 'text-primary' : ''}`}>
          {format(date, 'd')}
        </div>
        {today && (
          <Badge variant="default" className="text-[10px] px-1.5 py-0">Today</Badge>
        )}
        {tomorrow && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Tomorrow</Badge>
        )}
      </div>

      {/* Classes */}
      <div className="flex-1 p-1.5 space-y-1.5">
        {classes.length === 0 ? (
          <div className="text-xs text-muted-foreground text-center py-4">
            No classes
          </div>
        ) : (
          classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => onClassClick(classItem)}
              className="w-full text-left p-2 rounded-md bg-background hover:bg-accent border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="text-xs font-semibold text-primary mb-0.5">
                {formatTime(classItem.start_time)}
              </div>
              <div className="text-sm font-medium leading-tight mb-1 group-hover:text-primary transition-colors">
                {classItem.class_name}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {classItem.instructor && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-[70px]">{classItem.instructor}</span>
                  </div>
                )}
                {classItem.is_online && (
                  <Badge variant="secondary" className="text-[10px] px-1 py-0 gap-0.5">
                    <Monitor className="w-2.5 h-2.5" />
                    ZOOM
                  </Badge>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
