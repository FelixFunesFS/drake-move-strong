import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import CoachLayout from '@/components/coach/CoachLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Users, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduledClass {
  id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  status: string;
  class_name: string;
  badge_label: string;
  location: string;
}

export default function CoachClasses() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ScheduledClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  const fetchClasses = async () => {
    try {
      const { data } = await supabase
        .from('class_schedules')
        .select(`
          id, start_time, end_time, capacity, booked_count, status,
          classes!inner(coach_id, location, class_types!inner(name, badge_label))
        `)
        .eq('classes.coach_id', user?.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time')
        .limit(50);

      const formattedClasses = (data || []).map((c: any) => ({
        id: c.id,
        start_time: c.start_time,
        end_time: c.end_time,
        capacity: c.capacity,
        booked_count: c.booked_count,
        status: c.status,
        class_name: c.classes.class_types.name,
        badge_label: c.classes.class_types.badge_label,
        location: c.classes.location || 'Drake Fitness Studio',
      }));

      setClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group classes by date
  const classesByDate = classes.reduce((acc, cls) => {
    const date = format(new Date(cls.start_time), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(cls);
    return acc;
  }, {} as Record<string, ScheduledClass[]>);

  if (isLoading) {
    return (
      <CoachLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CoachLayout>
    );
  }

  return (
    <>
      <SEO 
        title="My Classes" 
        description="View your scheduled classes."
      />
      
      <CoachLayout>
        <div className="space-y-6">
          <div>
            <h1 className="font-hero text-3xl md:text-4xl uppercase">My Classes</h1>
            <p className="text-muted-foreground mt-1">
              {classes.length} upcoming class{classes.length !== 1 ? 'es' : ''}
            </p>
          </div>

          {/* Classes by Date */}
          <div className="space-y-6">
            {Object.keys(classesByDate).length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming classes assigned to you</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact an admin to be assigned as coach for classes.
                  </p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(classesByDate).map(([date, dayClasses]) => (
                <div key={date}>
                  <h3 className="font-hero text-lg uppercase mb-3">
                    {format(new Date(date), 'EEEE, MMMM d')}
                  </h3>
                  <div className="grid gap-3">
                    {dayClasses.map((cls) => (
                      <Card key={cls.id} className="shadow-card">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-semibold text-lg">{cls.class_name}</p>
                                <Badge variant="secondary">{cls.badge_label}</Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {format(new Date(cls.start_time), 'h:mm a')} - {format(new Date(cls.end_time), 'h:mm a')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {cls.booked_count}/{cls.capacity} booked
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {cls.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={cls.booked_count >= cls.capacity ? 'destructive' : 'outline'}
                              >
                                {cls.booked_count >= cls.capacity 
                                  ? 'Full' 
                                  : `${cls.capacity - cls.booked_count} spots left`}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CoachLayout>
    </>
  );
}
