import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import CoachLayout from '@/components/coach/CoachLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, TrendingUp, Calendar, Star, Dumbbell, Clock } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MemberOption {
  id: string;
  name: string;
}

interface WorkoutLog {
  id: string;
  workout_date: string;
  completed_at: string | null;
  duration_minutes: number | null;
  rating: number | null;
  template_name: string;
}

interface MemberStats {
  totalWorkouts: number;
  completedThisWeek: number;
  averageRating: number;
  totalMinutes: number;
  weeklyGoal: number;
}

export default function CoachProgress() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [members, setMembers] = useState<MemberOption[]>([]);
  const [selectedMember, setSelectedMember] = useState<string | null>(searchParams.get('member'));
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [stats, setStats] = useState<MemberStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMembers();
    }
  }, [user]);

  useEffect(() => {
    if (selectedMember) {
      fetchMemberProgress(selectedMember);
      setSearchParams({ member: selectedMember });
    } else {
      setWorkoutLogs([]);
      setStats(null);
    }
  }, [selectedMember]);

  const fetchMembers = async () => {
    try {
      const { data: plans } = await supabase
        .from('member_workout_plans')
        .select(`
          user_id, frequency_per_week,
          profiles!inner(id, first_name, last_name)
        `)
        .eq('coach_id', user?.id)
        .eq('status', 'active');

      const uniqueMembers = new Map<string, MemberOption>();
      (plans || []).forEach((p: any) => {
        if (!uniqueMembers.has(p.user_id)) {
          uniqueMembers.set(p.user_id, {
            id: p.profiles.id,
            name: `${p.profiles.first_name || ''} ${p.profiles.last_name || ''}`.trim() || 'Unknown',
          });
        }
      });

      setMembers(Array.from(uniqueMembers.values()));

      // Auto-select if member param exists
      if (searchParams.get('member') && uniqueMembers.has(searchParams.get('member')!)) {
        setSelectedMember(searchParams.get('member'));
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMemberProgress = async (memberId: string) => {
    setIsLoadingLogs(true);
    try {
      // Get member's plan for weekly goal
      const { data: planData } = await supabase
        .from('member_workout_plans')
        .select('frequency_per_week')
        .eq('user_id', memberId)
        .eq('coach_id', user?.id)
        .eq('status', 'active')
        .limit(1)
        .maybeSingle();

      // Fetch workout logs for the past 30 days
      const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
      const { data: logs } = await supabase
        .from('workout_logs')
        .select(`
          id, workout_date, completed_at, duration_minutes, rating,
          workout_templates(name)
        `)
        .eq('user_id', memberId)
        .gte('workout_date', thirtyDaysAgo.split('T')[0])
        .order('workout_date', { ascending: false });

      const formattedLogs = (logs || []).map((l: any) => ({
        id: l.id,
        workout_date: l.workout_date,
        completed_at: l.completed_at,
        duration_minutes: l.duration_minutes,
        rating: l.rating,
        template_name: l.workout_templates?.name || 'Unknown',
      }));

      // Calculate stats
      const completedLogs = formattedLogs.filter(l => l.completed_at);
      const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const thisWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      const completedThisWeek = completedLogs.filter(l => {
        const date = new Date(l.workout_date);
        return date >= thisWeekStart && date <= thisWeekEnd;
      }).length;

      const ratings = completedLogs.filter(l => l.rating).map(l => l.rating!);
      const averageRating = ratings.length > 0 
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
        : 0;

      const totalMinutes = completedLogs.reduce((sum, l) => sum + (l.duration_minutes || 0), 0);

      setStats({
        totalWorkouts: completedLogs.length,
        completedThisWeek,
        averageRating: Math.round(averageRating * 10) / 10,
        totalMinutes,
        weeklyGoal: planData?.frequency_per_week || 3,
      });

      setWorkoutLogs(formattedLogs);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Generate chart data for the past 7 days
  const chartData = (() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const workout = workoutLogs.find(l => l.workout_date === dayStr && l.completed_at);
      return {
        day: format(day, 'EEE'),
        completed: workout ? 1 : 0,
        duration: workout?.duration_minutes || 0,
      };
    });
  })();

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
        title="Member Progress" 
        description="Track your members' workout progress."
      />
      
      <CoachLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">Member Progress</h1>
              <p className="text-muted-foreground mt-1">Track workout completion and performance</p>
            </div>
            <Select value={selectedMember || ''} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!selectedMember ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a member to view their progress</p>
              </CardContent>
            </Card>
          ) : isLoadingLogs ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-muted">
                        <Dumbbell className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats?.totalWorkouts || 0}</p>
                        <p className="text-sm text-muted-foreground">Total Workouts</p>
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
                        <p className="text-2xl font-bold">
                          {stats?.completedThisWeek || 0}/{stats?.weeklyGoal || 3}
                        </p>
                        <p className="text-sm text-muted-foreground">This Week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-muted">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats?.averageRating || '-'}</p>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-muted">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats?.totalMinutes || 0}</p>
                        <p className="text-sm text-muted-foreground">Total Minutes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Progress */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-hero text-xl uppercase">Weekly Goal Progress</CardTitle>
                  <CardDescription>
                    {stats?.completedThisWeek || 0} of {stats?.weeklyGoal || 3} workouts completed this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={((stats?.completedThisWeek || 0) / (stats?.weeklyGoal || 3)) * 100} 
                    className="h-3"
                  />
                </CardContent>
              </Card>

              {/* Activity Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-hero text-xl uppercase">Last 7 Days</CardTitle>
                  <CardDescription>Workout duration by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`${value} min`, 'Duration']}
                        />
                        <Bar dataKey="duration" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Workouts */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-hero text-xl uppercase">Recent Workouts</CardTitle>
                  <CardDescription>Last 30 days of activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {workoutLogs.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No workouts logged yet</p>
                  ) : (
                    <div className="space-y-3">
                      {workoutLogs.slice(0, 10).map((log) => (
                        <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{log.template_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(log.workout_date), 'EEEE, MMM d')}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {log.duration_minutes && (
                              <span className="text-sm text-muted-foreground">
                                {log.duration_minutes} min
                              </span>
                            )}
                            {log.completed_at ? (
                              <Badge variant="default" className="bg-green-600">Completed</Badge>
                            ) : (
                              <Badge variant="outline">Scheduled</Badge>
                            )}
                            {log.rating && (
                              <span className="text-sm">{'⭐'.repeat(log.rating)}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </CoachLayout>
    </>
  );
}
