import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingModal } from "./BookingModal";

interface ScheduleClass {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  instructor: string | null;
  location: string | null;
  spots_remaining: number | null;
  is_online: boolean;
  punchpass_url: string | null;
}

export function TodayClassesBanner() {
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClassClick = (classItem: ScheduleClass) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const fetchTodayClasses = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;

      const { data, error } = await supabase
        .from('punchpass_schedule')
        .select('*')
        .eq('class_date', today)
        .gte('start_time', currentTime)
        .order('start_time', { ascending: true })
        .limit(3);

      if (error) {
        console.error('Error fetching today classes:', error);
        return;
      }

      setClasses(data || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching today classes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayClasses();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchTodayClasses, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  if (loading) {
    return (
      <section className="py-4 bg-drake-dark border-y border-drake-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded bg-white/10" />
              <Skeleton className="h-5 w-32 bg-white/10" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-40 rounded-lg bg-white/10" />
              ))}
            </div>
            <Skeleton className="h-8 w-24 rounded bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  // Reserve consistent height even when no classes to prevent CLS
  if (classes.length === 0) {
    return (
      <section className="py-3 md:py-4 bg-drake-dark border-y border-drake-gold/20 min-h-[60px] md:min-h-[72px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-drake-gold" />
            <span className="text-sm md:text-base text-white/70">
              No more classes today — <Link to="/schedule" className="text-drake-gold hover:underline">see tomorrow's schedule</Link>
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-3 md:py-4 bg-drake-dark border-y border-drake-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          {/* Header - Always visible */}
          <div className="flex items-center gap-2 shrink-0">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-drake-gold" />
            <span className="text-sm md:text-base font-semibold text-white uppercase tracking-wide">
              Today's Classes
            </span>
          </div>

          {/* Classes Grid */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 flex-1 md:justify-center">
            {classes.map((classItem) => (
              <button
                key={classItem.id}
                type="button"
                onClick={() => handleClassClick(classItem)}
                className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group text-left"
              >
                <div className="text-center shrink-0">
                  <p className="text-sm font-bold text-drake-gold">{formatTime(classItem.start_time)}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{classItem.class_name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {classItem.instructor && <span>{classItem.instructor}</span>}
                    {classItem.is_online && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-0">
                        ZOOM
                      </Badge>
                    )}
                  </div>
                </div>
                {classItem.spots_remaining !== null && (
                  <span className={cn(
                    "text-xs font-medium shrink-0",
                    classItem.spots_remaining <= 2 ? 'text-red-400' : 
                    classItem.spots_remaining <= 5 ? 'text-drake-gold' : 'text-green-400'
                  )}>
                    {classItem.spots_remaining} spots
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0 hidden md:block" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <Button asChild size="sm" variant="outline" className="border-drake-gold/50 text-drake-gold hover:bg-drake-gold hover:text-drake-dark shrink-0 w-full md:w-auto">
            <Link to="/schedule" className="inline-flex items-center gap-1.5">
              Full Schedule
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <BookingModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />
    </section>
  );
}

export default TodayClassesBanner;
