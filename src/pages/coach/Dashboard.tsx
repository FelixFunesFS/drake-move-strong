import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import CoachLayout from '@/components/coach/CoachLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Loader2, Users, Calendar, ClipboardList, TrendingUp, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStats {
  assignedMembers: number;
  upcomingClasses: number;
  workoutTemplates: number;
  recentWorkouts: number;
}

interface UpcomingClass {
  id: string;
  start_time: string;
  class_name: string;
  booked_count: number;
  capacity: number;
}

interface RecentMemberWorkout {
  member_name: string;
  template_name: string;
  completed_at: string;
  rating: number | null;
}

export default function CoachDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    assignedMembers: 0,
    upcomingClasses: 0,
    workoutTemplates: 0,
    recentWorkouts: 0,
  });
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<RecentMemberWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch assigned members count (members with plans assigned by this coach)
      const { count: membersCount } = await supabase
        .from('member_workout_plans')
        .select('user_id', { count: 'exact', head: true })
        .eq('coach_id', user?.id)
        .eq('status', 'active');

      // Fetch upcoming classes for this coach
      const { data: classes, count: classesCount } = await supabase
        .from('class_schedules')
        .select(`
          id, start_time, capacity, booked_count,
          classes!inner(coach_id, class_types!inner(name))
        `, { count: 'exact' })
        .eq('classes.coach_id', user?.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time')
        .limit(5);

      // Fetch workout templates count
      const { count: templatesCount } = await supabase
        .from('workout_templates')
        .select('id', { count: 'exact', head: true })
        .eq('coach_id', user?.id)
        .eq('is_active', true);

      // Fetch recent workout logs from assigned members
      const { data: workoutLogs, count: workoutsCount } = await supabase
        .from('workout_logs')
        .select(`
          completed_at, rating,
          workout_templates(name),
          profiles!inner(first_name, last_name),
          member_workout_plans!inner(coach_id)
        `, { count: 'exact' })
        .eq('member_workout_plans.coach_id', user?.id)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(5);

      setStats({
        assignedMembers: membersCount || 0,
        upcomingClasses: classesCount || 0,
        workoutTemplates: templatesCount || 0,
        recentWorkouts: workoutsCount || 0,
      });

      setUpcomingClasses(
        (classes || []).map((c: any) => ({
          id: c.id,
          start_time: c.start_time,
          class_name: c.classes.class_types.name,
          booked_count: c.booked_count,
          capacity: c.capacity,
        }))
      );

      setRecentWorkouts(
        (workoutLogs || []).map((w: any) => ({
          member_name: `${w.profiles?.first_name || ''} ${w.profiles?.last_name || ''}`.trim() || 'Unknown',
          template_name: w.workout_templates?.name || 'Unknown',
          completed_at: w.completed_at,
          rating: w.rating,
        }))
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        title="Coach Dashboard" 
        description="Manage your members, classes, and workout plans."
      />
      
      <CoachLayout>
        <div className="space-y-8">
          <div>
            <h1 className="font-hero text-3xl md:text-4xl uppercase">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Coach</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-muted">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.assignedMembers}</p>
                    <p className="text-sm text-muted-foreground">My Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-muted">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.upcomingClasses}</p>
                    <p className="text-sm text-muted-foreground">My Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-muted">
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.workoutTemplates}</p>
                    <p className="text-sm text-muted-foreground">Templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-muted">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.recentWorkouts}</p>
                    <p className="text-sm text-muted-foreground">Workouts Logged</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upcoming Classes */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-hero text-xl uppercase">Upcoming Classes</CardTitle>
                  <CardDescription>Your scheduled classes</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/coach/classes">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingClasses.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No upcoming classes</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingClasses.map((cls) => (
                      <div key={cls.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{cls.class_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(cls.start_time), 'EEE, MMM d • h:mm a')}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {cls.booked_count}/{cls.capacity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Member Workouts */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-hero text-xl uppercase">Recent Workouts</CardTitle>
                  <CardDescription>Member activity</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/coach/progress">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentWorkouts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No recent workouts</p>
                ) : (
                  <div className="space-y-3">
                    {recentWorkouts.map((workout, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{workout.member_name}</p>
                          <p className="text-sm text-muted-foreground">{workout.template_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(workout.completed_at), 'MMM d')}
                          </p>
                          {workout.rating && (
                            <p className="text-sm">{'⭐'.repeat(workout.rating)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-hero text-xl uppercase">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/coach/members">View My Members</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/coach/templates">Manage Templates</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/coach/progress">Track Progress</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CoachLayout>
    </>
  );
}
