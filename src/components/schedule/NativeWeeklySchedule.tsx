import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Monitor } from "lucide-react";
import { WeekDayColumn } from "./WeekDayColumn";
import { ScheduleFilters } from "./ScheduleFilters";
import { BookingModal } from "./BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState<"all" | "studio" | "zoom">("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "evening">("all");
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const isMobile = useIsMobile();

  const weekEnd = addDays(weekStart, 6);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    fetchClasses();
  }, [weekStart]);

  // Set selected day to today when week changes
  useEffect(() => {
    const todayInWeek = weekDays.find(day => isToday(day));
    if (todayInWeek) {
      setSelectedDay(todayInWeek);
    } else {
      setSelectedDay(weekDays[0]);
    }
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

  const getTimeCategory = (time: string): "morning" | "evening" => {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 12) return "morning";
    return "evening";
  };

  const filteredClasses = classes.filter((c) => {
    if (locationFilter === "studio" && c.is_online) return false;
    if (locationFilter === "zoom" && !c.is_online) return false;
    if (timeFilter !== "all" && getTimeCategory(c.start_time) !== timeFilter) return false;
    return true;
  });

  const getClassesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return filteredClasses.filter(c => c.class_date === dateStr);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Mobile: Single day view with day selector
  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Week Navigation - Compact */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekStart(subWeeks(weekStart, 1))}
            className="h-9 w-9"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center flex-1">
            <div className="text-sm font-semibold">
              {format(weekStart, 'MMM d')} – {format(weekEnd, 'MMM d')}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekStart(addWeeks(weekStart, 1))}
            className="h-9 w-9"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Day Selector Pills - Horizontal scroll */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {weekDays.map((day) => {
            const isSelected = isSameDay(day, selectedDay);
            const isTodayDay = isToday(day);
            const classCount = getClassesForDate(day).length;
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all min-w-[56px]",
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : isTodayDay
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-muted hover:bg-muted/80"
                )}
              >
                <span className="text-xs font-medium uppercase">
                  {format(day, 'EEE')}
                </span>
                <span className="text-lg font-bold">
                  {format(day, 'd')}
                </span>
                {classCount > 0 && (
                  <span className={cn(
                    "text-[10px] font-medium mt-0.5",
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {classCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <ScheduleFilters
          locationFilter={locationFilter}
          timeFilter={timeFilter}
          onLocationChange={setLocationFilter}
          onTimeChange={setTimeFilter}
        />

        {/* Selected Day Classes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-base">
            {format(selectedDay, 'EEEE, MMMM d')}
          </h3>
          
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : getClassesForDate(selectedDay).length === 0 ? (
            <div className="text-center py-10 text-muted-foreground bg-muted/30 rounded-xl">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No classes scheduled</p>
              <p className="text-sm">Try another day or clear filters</p>
            </div>
          ) : (
            <div className="space-y-2">
              {getClassesForDate(selectedDay).map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => handleClassClick(classItem)}
                  className="w-full text-left p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-primary font-semibold text-sm mb-1">
                        {formatTime(classItem.start_time)}
                        {calculateDuration(classItem.start_time, classItem.end_time) && (
                          <span className="font-normal text-muted-foreground ml-1.5">
                            · {calculateDuration(classItem.start_time, classItem.end_time)}
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                        {classItem.class_name}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {classItem.instructor && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getInstructorStyles(classItem.instructor)}`}>
                            {classItem.instructor}
                          </span>
                        )}
                        {classItem.is_online && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-sky-100 text-sky-700">
                            <Monitor className="w-3 h-3" />
                            ZOOM
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          classData={selectedClass}
        />
      </div>
    );
  }

  // Desktop: Week grid view
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
            <div className="grid grid-cols-7 gap-0 divide-x divide-border min-w-[840px]">
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
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">No classes found for this week</p>
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
