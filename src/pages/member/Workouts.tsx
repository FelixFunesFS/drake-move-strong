import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MemberLayout from "@/components/member/MemberLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, Calendar, Clock, Play, CheckCircle, 
  TrendingUp, Target, Flame, Lock
} from "lucide-react";
import { format, differenceInDays, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string | null;
  focus_area: string | null;
  difficulty_level: string | null;
  estimated_duration_minutes: number | null;
}

interface MemberWorkoutPlan {
  id: string;
  template_id: string;
  start_date: string;
  end_date: string | null;
  status: string | null;
  frequency_per_week: number | null;
  custom_notes: string | null;
  template: WorkoutTemplate;
}

interface WorkoutLog {
  id: string;
  plan_id: string | null;
  workout_date: string;
  duration_minutes: number | null;
  rating: number | null;
  completed_at: string | null;
}

export default function MemberWorkouts() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("plans");

  // Fetch member's workout plans
  const { data: workoutPlans, isLoading: plansLoading } = useQuery({
    queryKey: ["my-workout-plans", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("member_workout_plans")
        .select("*, workout_templates(*)")
        .eq("user_id", user!.id)
        .order("assigned_at", { ascending: false });

      if (error) throw error;

      return data.map((plan) => ({
        id: plan.id,
        template_id: plan.template_id,
        start_date: plan.start_date,
        end_date: plan.end_date,
        status: plan.status,
        frequency_per_week: plan.frequency_per_week,
        custom_notes: plan.custom_notes,
        template: plan.workout_templates as unknown as WorkoutTemplate,
      })) as MemberWorkoutPlan[];
    },
    enabled: !!user,
  });

  // Fetch workout logs
  const { data: workoutLogs } = useQuery({
    queryKey: ["my-workout-logs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user!.id)
        .order("workout_date", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as WorkoutLog[];
    },
    enabled: !!user,
  });

  // Check VIP membership
  const { data: membership } = useQuery({
    queryKey: ["my-membership", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("memberships")
        .select("*, membership_plans(name)")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .single();

      return data;
    },
    enabled: !!user,
  });

  const isVIP = (membership?.membership_plans as any)?.name === "VIP Unlimited";
  const activePlans = workoutPlans?.filter((p) => p.status === "active") || [];
  const completedPlans = workoutPlans?.filter((p) => p.status === "completed") || [];

  // Calculate weekly stats
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekLogs = workoutLogs?.filter((log) =>
    isWithinInterval(new Date(log.workout_date), { start: thisWeekStart, end: thisWeekEnd })
  ) || [];

  const totalWorkoutsThisWeek = thisWeekLogs.length;
  const totalMinutesThisWeek = thisWeekLogs.reduce((sum, log) => sum + (log.duration_minutes || 0), 0);
  const weeklyGoal = activePlans[0]?.frequency_per_week || 3;
  const weeklyProgress = Math.min(100, (totalWorkoutsThisWeek / weeklyGoal) * 100);

  if (!isVIP && (!workoutPlans || workoutPlans.length === 0)) {
    return (
      <MemberLayout>
        <SEO title="My Workouts" description="View your personalized workout plans" />
        <div className="space-y-6">
          <div>
            <h1 className="font-hero text-2xl md:text-3xl uppercase">My Workouts</h1>
            <p className="text-muted-foreground">Personalized training plans</p>
          </div>

          <Card className="border-2 border-dashed">
            <CardContent className="py-12 text-center">
              <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">VIP Feature</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Personalized workout plans are exclusively available for VIP Unlimited members. 
                Upgrade to get custom training programs designed by our coaches.
              </p>
              <Button asChild>
                <Link to="/pricing">Upgrade to VIP</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <SEO title="My Workouts" description="View your personalized workout plans" />
      <div className="space-y-6">
        <div>
          <h1 className="font-hero text-2xl md:text-3xl uppercase">My Workouts</h1>
          <p className="text-muted-foreground">
            {profile?.first_name ? `Hey ${profile.first_name}! ` : ""}
            Here are your personalized training plans
          </p>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Goal</p>
                  <p className="text-2xl font-bold">
                    {totalWorkoutsThisWeek}/{weeklyGoal}
                  </p>
                </div>
              </div>
              <Progress value={weeklyProgress} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-drake-gold/10">
                  <Clock className="h-6 w-6 text-drake-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minutes This Week</p>
                  <p className="text-2xl font-bold">{totalMinutesThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Flame className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                  <p className="text-2xl font-bold">{workoutLogs?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Plan Quick Start */}
        {activePlans.length > 0 && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2">Active Plan</Badge>
                  <h3 className="text-xl font-semibold">{activePlans[0].template.name}</h3>
                  <p className="text-muted-foreground">
                    {activePlans[0].template.description || "Start your workout session"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activePlans[0].template.focus_area && (
                      <Badge variant="outline">{activePlans[0].template.focus_area}</Badge>
                    )}
                    {activePlans[0].template.estimated_duration_minutes && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ~{activePlans[0].template.estimated_duration_minutes} min
                      </span>
                    )}
                  </div>
                </div>
                <Button size="lg" asChild className="gap-2">
                  <Link to={`/member/workouts/${activePlans[0].id}/session`}>
                    <Play className="h-5 w-5" />
                    Start Workout
                  </Link>
                </Button>
              </div>
              {activePlans[0].custom_notes && (
                <div className="mt-4 p-3 bg-background rounded-lg border">
                  <p className="text-sm font-medium mb-1">Coach Notes:</p>
                  <p className="text-sm text-muted-foreground">{activePlans[0].custom_notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="plans">My Plans</TabsTrigger>
            <TabsTrigger value="history">Workout History</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-6 space-y-4">
            {plansLoading ? (
              <div className="grid gap-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="py-6">
                      <div className="h-6 bg-muted rounded w-1/3 mb-2" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : workoutPlans?.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Plans Assigned Yet</h3>
                  <p className="text-muted-foreground">
                    Your coach will assign a personalized workout plan soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {workoutPlans?.map((plan) => (
                  <WorkoutPlanCard key={plan.id} plan={plan} logs={workoutLogs || []} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {!workoutLogs || workoutLogs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Workout History</h3>
                  <p className="text-muted-foreground">
                    Complete your first workout to start tracking your progress.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {workoutLogs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {format(new Date(log.workout_date), "EEEE, MMM d")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {log.duration_minutes ? `${log.duration_minutes} minutes` : "Completed"}
                              {log.rating && ` • Difficulty: ${log.rating}/5`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
}

function WorkoutPlanCard({ plan, logs }: { plan: MemberWorkoutPlan; logs: WorkoutLog[] }) {
  const planLogs = logs.filter((l) => l.plan_id === plan.id);
  const daysRemaining = plan.end_date
    ? differenceInDays(new Date(plan.end_date), new Date())
    : null;

  return (
    <Card className={plan.status === "active" ? "border-primary" : ""}>
      <CardContent className="py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{plan.template.name}</h3>
              <Badge
                variant={
                  plan.status === "active"
                    ? "default"
                    : plan.status === "completed"
                    ? "secondary"
                    : "outline"
                }
                className={plan.status === "active" ? "bg-green-600" : ""}
              >
                {plan.status}
              </Badge>
            </div>

            {plan.template.description && (
              <p className="text-muted-foreground text-sm mb-2">
                {plan.template.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Started {format(new Date(plan.start_date), "MMM d, yyyy")}
              </span>
              {plan.frequency_per_week && (
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {plan.frequency_per_week}× per week
                </span>
              )}
              {plan.template.estimated_duration_minutes && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  ~{plan.template.estimated_duration_minutes} min
                </span>
              )}
            </div>

            {planLogs.length > 0 && (
              <p className="text-sm text-primary mt-2">
                {planLogs.length} workout{planLogs.length !== 1 ? "s" : ""} completed
              </p>
            )}

            {daysRemaining !== null && daysRemaining > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {daysRemaining} days remaining
              </p>
            )}
          </div>

          {plan.status === "active" && (
            <Button asChild>
              <Link to={`/member/workouts/${plan.id}/session`}>
                <Play className="h-4 w-4 mr-2" />
                Start
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
