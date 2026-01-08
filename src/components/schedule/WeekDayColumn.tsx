import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Monitor } from "lucide-react";

const getInstructorStyles = (instructor: string | null) => {
  switch (instructor?.toLowerCase()) {
    case 'david':
      return 'bg-amber-100 text-amber-700';
    case 'nick':
      return 'bg-violet-100 text-violet-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const calculateDuration = (startTime: string, endTime: string | null): string | null => {
  if (!endTime) return null;
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  if (totalMinutes <= 0) return null;
  return `${totalMinutes}min`;
};

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
    <div className={`flex flex-col min-w-[120px] ${today ? 'bg-primary/5 rounded-lg' : ''}`}>
      {/* Day Header */}
      <div className={`p-2 text-center border-b border-border sticky top-0 bg-card z-10 rounded-t-lg ${today ? 'bg-primary/5' : ''}`}>
        <div className="text-xs font-medium text-muted-foreground uppercase">
          {format(date, 'EEE')}
        </div>
        <div className={`text-lg font-bold ${today ? 'text-primary' : ''}`}>
          {format(date, 'd')}
        </div>
        {today && (
          <Badge variant="default" className="text-[10px] px-1.5 py-0">Today</Badge>
        )}
        {tomorrow && !today && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Tomorrow</Badge>
        )}
      </div>

      {/* Classes */}
      <div className="flex-1 p-1.5 space-y-1.5">
        {classes.length === 0 ? (
          <div className="text-xs text-muted-foreground text-center py-6">
            No classes
          </div>
        ) : (
          classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => onClassClick(classItem)}
              className="w-full text-left p-2 rounded-lg bg-background hover:bg-accent border border-border hover:border-primary/50 transition-all group shadow-sm"
            >
              <div className="text-xs font-bold text-primary mb-0.5">
                {formatTime(classItem.start_time)}
                {calculateDuration(classItem.start_time, classItem.end_time) && (
                  <span className="font-normal text-muted-foreground ml-1">
                    · {calculateDuration(classItem.start_time, classItem.end_time)}
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {classItem.class_name}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {classItem.instructor && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getInstructorStyles(classItem.instructor)}`}>
                    {classItem.instructor}
                  </span>
                )}
                {classItem.is_online && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-sky-100 text-sky-700">
                    <Monitor className="w-2.5 h-2.5" />
                    ZOOM
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
