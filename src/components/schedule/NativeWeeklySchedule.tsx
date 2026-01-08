import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, addWeeks, subWeeks, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { WeekDayColumn } from "./WeekDayColumn";
import { ScheduleFilters } from "./ScheduleFilters";
import { BookingModal } from "./BookingModal";

interface ScheduleClass {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  instructor: string | null;
  is_online: boolean;
  punchpass_url: string | null;
}

export function NativeWeeklySchedule() {
  const [weekStart, setWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday start
  );
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState<"all" | "studio" | "zoom">("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "afternoon" | "evening">("all");
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const weekEnd = addDays(weekStart, 6);

  useEffect(() => {
    fetchClasses();
  }, [weekStart]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('punchpass_schedule')
        .select('*')
        .gte('class_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('class_date', format(weekEnd, 'yyyy-MM-dd'))
        .order('class_date')
        .order('start_time');

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassClick = (classItem: ScheduleClass) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const getTimeCategory = (time: string): "morning" | "afternoon" | "evening" => {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const filteredClasses = classes.filter((c) => {
    // Location filter
    if (locationFilter === "studio" && c.is_online) return false;
    if (locationFilter === "zoom" && !c.is_online) return false;
    
    // Time filter
    if (timeFilter !== "all" && getTimeCategory(c.start_time) !== timeFilter) return false;
    
    return true;
  });

  const getClassesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return filteredClasses.filter(c => c.class_date === dateStr);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-4">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekStart(subWeeks(weekStart, 1))}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center min-w-[200px]">
            <h3 className="font-semibold">
              {format(weekStart, 'MMM d')} – {format(weekEnd, 'MMM d, yyyy')}
            </h3>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekStart(addWeeks(weekStart, 1))}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            className="text-xs"
          >
            Today
          </Button>
        </div>

        <Button asChild variant="outline" size="sm" className="w-fit">
          <a 
            href="https://drakefitness.punchpass.com/classes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Full Schedule
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      {/* Filters */}
      <ScheduleFilters
        locationFilter={locationFilter}
        timeFilter={timeFilter}
        onLocationChange={setLocationFilter}
        onTimeChange={setTimeFilter}
      />

      {/* Week Grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="grid grid-cols-7 gap-0 divide-x divide-border">
            {weekDays.map((date, i) => (
              <div key={i} className="p-2 min-h-[300px]">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-16 mx-auto mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-0 divide-x divide-border min-w-[980px]">
              {weekDays.map((date) => (
                <WeekDayColumn
                  key={date.toISOString()}
                  date={date}
                  classes={getClassesForDate(date)}
                  onClassClick={handleClassClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {!loading && filteredClasses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No classes found for this week with the selected filters.</p>
          <Button
            variant="link"
            onClick={() => {
              setLocationFilter("all");
              setTimeFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        classData={selectedClass}
      />
    </div>
  );
}
