import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModal } from "./BookingModal";

interface ScheduleClass {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  instructor: string | null;
  spots_remaining: number | null;
  is_online: boolean;
  punchpass_url: string | null;
}

export function ScheduleQuickView() {
  const [todayClasses, setTodayClasses] = useState<ScheduleClass[]>([]);
  const [tomorrowClasses, setTomorrowClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClassClick = (classItem: ScheduleClass) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('punchpass_schedule')
          .select('*')
          .in('class_date', [todayStr, tomorrowStr])
          .order('class_date', { ascending: true })
          .order('start_time', { ascending: true });

        if (error) {
          console.error('Error fetching quick view:', error);
          return;
        }

        setTodayClasses((data || []).filter(c => c.class_date === todayStr));
        setTomorrowClasses((data || []).filter(c => c.class_date === tomorrowStr));
      } catch (error) {
        console.error('Error fetching quick view:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getSpotsColor = (spots: number | null) => {
    if (spots === null) return 'bg-muted text-muted-foreground';
    if (spots <= 2) return 'bg-destructive/10 text-destructive';
    if (spots <= 5) return 'bg-drake-gold/10 text-drake-gold';
    return 'bg-green-100 text-green-700';
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const renderDayCard = (title: string, classes: ScheduleClass[], isToday: boolean) => (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className={cn("w-5 h-5", isToday ? "text-primary" : "text-muted-foreground")} />
        <h3 className="font-hero font-bold text-lg uppercase">{title}</h3>
        <Badge variant={isToday ? "default" : "secondary"} className="ml-auto">
          {classes.length} classes
        </Badge>
      </div>
      
      {classes.length === 0 ? (
        <p className="text-muted-foreground text-sm">No classes scheduled</p>
      ) : (
        <div className="space-y-2">
          {classes.slice(0, 4).map((classItem) => (
            <button
              key={classItem.id}
              type="button"
              onClick={() => handleClassClick(classItem)}
              className="w-full flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted transition-colors group text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1 text-sm text-primary font-medium shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(classItem.start_time)}
                </div>
                <span className="font-medium text-sm truncate">{classItem.class_name}</span>
                {classItem.is_online && (
                  <Badge variant="outline" className="text-[10px] shrink-0">ZOOM</Badge>
                )}
              </div>
              {classItem.spots_remaining !== null && (
                <Badge className={cn("text-xs shrink-0", getSpotsColor(classItem.spots_remaining))}>
                  {classItem.spots_remaining} spots
                </Badge>
              )}
            </button>
          ))}
          {classes.length > 4 && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              +{classes.length - 4} more classes
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {renderDayCard("Today", todayClasses, true)}
        {renderDayCard("Tomorrow", tomorrowClasses, false)}
      </div>
      
      <BookingModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />
    </>
  );
}

export default ScheduleQuickView;
