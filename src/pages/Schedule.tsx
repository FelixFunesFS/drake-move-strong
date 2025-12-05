import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import scheduleCommunityImage from "@/assets/schedule-community-group.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format, startOfWeek, addDays, parseISO, isAfter } from "date-fns";

interface ClassSchedule {
  id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  status: string;
  notes: string | null;
  class_type: {
    id: string;
    name: string;
    description: string | null;
    difficulty_level: string | null;
    badge_label: string | null;
    badge_variant: string | null;
    default_duration: number | null;
  };
  coach: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface UserBooking {
  id: string;
  schedule_id: string;
  status: string;
}

const Schedule = () => {
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchSchedules = async () => {
    try {
      const today = new Date();
      const weekStart = startOfWeek(today, { weekStartsOn: 1 });
      const weekEnd = addDays(weekStart, 7);

      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          id,
          start_time,
          end_time,
          capacity,
          booked_count,
          status,
          notes,
          class_id,
          coach_id
        `)
        .gte('start_time', weekStart.toISOString())
        .lt('start_time', weekEnd.toISOString())
        .eq('status', 'scheduled')
        .order('start_time', { ascending: true });

      if (error) throw error;

      // Fetch class types and coaches separately
      const classIds = [...new Set(data?.map(s => s.class_id) || [])];
      const coachIds = [...new Set(data?.filter(s => s.coach_id).map(s => s.coach_id) || [])];

      const [classesResult, coachesResult] = await Promise.all([
        supabase.from('classes').select('id, class_type_id').in('id', classIds),
        coachIds.length > 0 
          ? supabase.from('profiles').select('id, first_name, last_name').in('id', coachIds as string[])
          : Promise.resolve({ data: [] as { id: string; first_name: string | null; last_name: string | null }[] })
      ]);

      const classTypeIds = [...new Set(classesResult.data?.map(c => c.class_type_id) || [])];
      const classTypesResult = await supabase
        .from('class_types')
        .select('id, name, description, difficulty_level, badge_label, badge_variant, default_duration')
        .in('id', classTypeIds);

      // Build lookup maps
      const classTypeMap = new Map<string, typeof classTypesResult.data[0]>(
        classTypesResult.data?.map(ct => [ct.id, ct]) || []
      );
      const classMap = new Map<string, typeof classTypesResult.data[0] | undefined>(
        classesResult.data?.map(c => [c.id, classTypeMap.get(c.class_type_id)]) || []
      );
      const coachMap = new Map<string, { id: string; first_name: string | null; last_name: string | null }>(
        (coachesResult.data || []).map(c => [c.id, c])
      );

      const enrichedSchedules: ClassSchedule[] = (data || []).map(schedule => ({
        id: schedule.id,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        capacity: schedule.capacity,
        booked_count: schedule.booked_count || 0,
        status: schedule.status || 'scheduled',
        notes: schedule.notes,
        class_type: classMap.get(schedule.class_id) || {
          id: '',
          name: 'Unknown Class',
          description: null,
          difficulty_level: null,
          badge_label: null,
          badge_variant: null,
          default_duration: 60
        },
        coach: schedule.coach_id ? coachMap.get(schedule.coach_id) || null : null
      }));

      setSchedules(enrichedSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error loading schedule",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, schedule_id, status')
        .eq('user_id', user.id)
        .in('status', ['confirmed']);

      if (error) throw error;
      setUserBookings(data || []);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const handleBookClass = async (scheduleId: string) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book a class.",
        variant: "destructive"
      });
      return;
    }

    setBookingInProgress(scheduleId);

    try {
      const { data, error } = await supabase.functions.invoke('book-class', {
        body: { schedule_id: scheduleId }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: data.waitlist ? "Added to waitlist" : "Class booked!",
          description: data.waitlist 
            ? `You're #${data.position} on the waitlist.`
            : "You're all set for class.",
        });
        fetchSchedules();
        fetchUserBookings();
      } else {
        throw new Error(data.error || 'Booking failed');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setBookingInProgress(null);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!session) return;

    setBookingInProgress(bookingId);

    try {
      const { data, error } = await supabase.functions.invoke('cancel-booking', {
        body: { booking_id: bookingId }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Booking cancelled",
          description: data.credits_refunded 
            ? "Your credit has been refunded."
            : "Cancelled within 2 hours of class - no refund.",
        });
        fetchSchedules();
        fetchUserBookings();
      } else {
        throw new Error(data.error || 'Cancellation failed');
      }
    } catch (error: any) {
      console.error('Cancel error:', error);
      toast({
        title: "Cancellation failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setBookingInProgress(null);
    }
  };

  const getSchedulesByDay = () => {
    const byDay: Record<string, ClassSchedule[]> = {};
    weekDays.forEach(day => { byDay[day] = []; });

    schedules.forEach(schedule => {
      const dayName = format(parseISO(schedule.start_time), 'EEEE');
      if (byDay[dayName]) {
        byDay[dayName].push(schedule);
      }
    });

    return byDay;
  };

  const getBadgeVariant = (variant: string | null, difficulty: string | null) => {
    if (variant) {
      if (variant === 'secondary' || variant === 'destructive' || variant === 'outline' || variant === 'default') {
        return variant;
      }
    }
    if (difficulty === 'beginner') return 'secondary';
    if (difficulty === 'advanced') return 'destructive';
    return 'default';
  };

  const isUserBooked = (scheduleId: string) => {
    return userBookings.find(b => b.schedule_id === scheduleId);
  };

  const scheduleByDay = getSchedulesByDay();
  const hasAnyClasses = schedules.length > 0;

  return (
    <>
      <SEO
        title="Class Schedule"
        description="View our weekly class schedule in Charleston. Morning and evening sessions available. Foundation Flow, Functional Strength, KB Strong, and more."
        canonical="https://drake.fitness/schedule"
      />
      
      <main>
        <Hero
          eyebrow="CLASS TIMES"
          title="Weekly Class Schedule"
          subtitle="All classes are coach-led, mobility-first, and beginner-friendly."
          backgroundImage={scheduleCommunityImage}
          className="h-[400px] md:h-[500px] lg:h-[600px]"
        />

        <section className="py-8 md:py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <Alert className="max-w-3xl mx-auto bg-drake-gold/20 border-drake-gold text-white">
              <Info className="h-5 w-5" />
              <AlertDescription className="text-base">
                <strong>New or unsure where to start?</strong> We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !hasAnyClasses ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">No classes scheduled for this week.</p>
                <p className="text-sm text-muted-foreground">Check back soon or contact us for more information.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {weekDays.map((day) => {
                  const daySchedules = scheduleByDay[day];
                  if (daySchedules.length === 0) return null;

                  return (
                    <div key={day}>
                      <h2 className="font-hero text-2xl font-bold mb-6 pb-2 border-b-2 border-primary uppercase">
                        {day}
                      </h2>
                      <div className="space-y-4">
                        {daySchedules.map((schedule) => {
                          const spotsLeft = schedule.capacity - schedule.booked_count;
                          const isFull = spotsLeft <= 0;
                          const booking = isUserBooked(schedule.id);
                          const isBooking = bookingInProgress === schedule.id || bookingInProgress === booking?.id;
                          const isPast = !isAfter(parseISO(schedule.start_time), new Date());

                          return (
                            <div
                              key={schedule.id}
                              className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow"
                            >
                              <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-12 gap-4 items-start lg:items-center">
                                <div className="sm:col-span-2 lg:col-span-2">
                                  <p className="text-2xl font-bold text-primary">
                                    {format(parseISO(schedule.start_time), 'h:mm a')}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {schedule.class_type.default_duration || 60} min
                                  </p>
                                </div>
                                <div className="sm:col-span-2 lg:col-span-5">
                                  <div className="flex items-start gap-2 mb-2">
                                    <h3 className="font-hero text-xl font-bold uppercase">
                                      {schedule.class_type.name}
                                    </h3>
                                    {schedule.class_type.badge_label && (
                                      <Badge variant={getBadgeVariant(schedule.class_type.badge_variant, schedule.class_type.difficulty_level) as any}>
                                        {schedule.class_type.badge_label}
                                      </Badge>
                                    )}
                                  </div>
                                  {schedule.coach && (
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                      Coach: {schedule.coach.first_name} {schedule.coach.last_name}
                                    </p>
                                  )}
                                </div>
                                <div className="sm:col-span-1 lg:col-span-3 sm:text-center">
                                  {booking ? (
                                    <Badge variant="default" className="text-sm px-3 py-1 bg-green-600">
                                      You're Booked!
                                    </Badge>
                                  ) : isFull ? (
                                    <Badge variant="destructive" className="text-sm px-3 py-1">
                                      Class Full
                                    </Badge>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">
                                      <span className="font-semibold text-foreground">{spotsLeft} spots left</span>
                                    </p>
                                  )}
                                </div>
                                <div className="sm:col-span-1 lg:col-span-2 w-full">
                                  {isPast ? (
                                    <Button disabled className="w-full" variant="outline">
                                      Past
                                    </Button>
                                  ) : booking ? (
                                    <Button 
                                      variant="outline"
                                      className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                                      onClick={() => handleCancelBooking(booking.id)}
                                      disabled={isBooking}
                                    >
                                      {isBooking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cancel"}
                                    </Button>
                                  ) : !user ? (
                                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                                      <Link to="/auth">Sign In to Book</Link>
                                    </Button>
                                  ) : (
                                    <Button 
                                      className="w-full bg-primary hover:bg-primary/90"
                                      onClick={() => handleBookClass(schedule.id)}
                                      disabled={isBooking}
                                    >
                                      {isBooking ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : isFull ? (
                                        "Join Waitlist"
                                      ) : (
                                        "Book Class"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">CLASS LEVELS</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Class Type <span className="text-primary">Guide</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { badge: "Beginner Friendly", desc: "Perfect for newcomers. Gentle pacing with detailed instruction.", variant: "secondary" },
                { badge: "All Levels", desc: "Scalable for everyone. Modifications provided for all fitness levels.", variant: "default" },
                { badge: "Advanced", desc: "For regular members ready to push harder with proper form.", variant: "destructive" },
                { badge: "Recovery", desc: "Focused on restoration, mobility work, and joint health.", variant: "secondary" },
                { badge: "Live Zoom", desc: "Join remotely from anywhere with real-time coaching.", variant: "outline" },
                { badge: "Community Strength", desc: "Saturday group session with dynamic energy.", variant: "default" },
              ].map((type, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-border shadow-card">
                  <Badge variant={type.variant as any} className="mb-2">
                    {type.badge}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          eyebrow="GET STARTED"
          title="Ready to Get Started?"
          subtitle="Book your first class or start with a free movement assessment."
          ctaText="Book Now"
          ctaLink="/contact"
          variant="primary"
          slanted={true}
        />
      </main>
    </>
  );
};

export default Schedule;
