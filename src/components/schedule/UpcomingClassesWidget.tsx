import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ClassCard } from "./ClassCard";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedSection from "@/components/AnimatedSection";
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
  spots_total: number | null;
  is_online: boolean;
  punchpass_url: string | null;
}

interface GroupedClasses {
  date: string;
  displayDate: string;
  dayName: string;
  classes: ScheduleClass[];
}

export function UpcomingClassesWidget() {
  const [groupedClasses, setGroupedClasses] = useState<GroupedClasses[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClassClick = (classItem: ScheduleClass) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const fetchUpcomingClasses = async () => {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      // Get next 7 days
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 7);
      const endDateStr = endDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('punchpass_schedule')
        .select('*')
        .gte('class_date', todayStr)
        .lte('class_date', endDateStr)
        .order('class_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(12);

      if (error) {
        console.error('Error fetching upcoming classes:', error);
        return;
      }

      // Group by date
      const grouped: Record<string, ScheduleClass[]> = {};
      (data || []).forEach((cls) => {
        if (!grouped[cls.class_date]) {
          grouped[cls.class_date] = [];
        }
        grouped[cls.class_date].push(cls);
      });

      // Convert to array with formatted dates
      const result: GroupedClasses[] = Object.entries(grouped).map(([date, classes]) => {
        const dateObj = new Date(date + 'T12:00:00');
        const isToday = date === todayStr;
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isTomorrow = date === tomorrow.toISOString().split('T')[0];
        
        return {
          date,
          displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dayName: isToday ? 'Today' : isTomorrow ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
          classes: classes.slice(0, 3), // Max 3 per day
        };
      });

      setGroupedClasses(result.slice(0, 3)); // Show max 3 days
    } catch (error) {
      console.error('Error fetching upcoming classes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingClasses();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchUpcomingClasses, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-24 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no classes
  if (groupedClasses.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="section-eyebrow text-primary mb-2">THIS WEEK</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold uppercase">
                Upcoming <span className="text-primary">Classes</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Reserve your spot in a class that fits your schedule
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link to="/schedule" className="inline-flex items-center gap-2">
                View Full Schedule
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {groupedClasses.map((group, groupIndex) => (
            <AnimatedSection 
              key={group.date} 
              animation="fadeInUp" 
              delay={groupIndex * 0.1}
              className="space-y-4"
            >
              {/* Date Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-hero font-bold text-lg uppercase">{group.dayName}</span>
                <span className="text-muted-foreground text-sm">{group.displayDate}</span>
              </div>
              
              {/* Classes for this day */}
              <div className="space-y-3">
                {group.classes.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    className={classItem.class_name}
                    startTime={classItem.start_time}
                    endTime={classItem.end_time}
                    instructor={classItem.instructor}
                    location={classItem.location}
                    spotsRemaining={classItem.spots_remaining}
                    spotsTotal={classItem.spots_total}
                    isOnline={classItem.is_online}
                    punchpassUrl={classItem.punchpass_url}
                    variant="full"
                    onBookClick={() => handleClassClick(classItem)}
                  />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <BookingModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedClass(null);
          }}
          classData={selectedClass ? {
            class_name: selectedClass.class_name,
            start_time: selectedClass.start_time,
            instructor: selectedClass.instructor,
            is_online: selectedClass.is_online,
            punchpass_url: selectedClass.punchpass_url,
          } : null}
        />
      </div>
    </section>
  );
}

export default UpcomingClassesWidget;
