import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Dumbbell, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  Star,
  Target,
  BarChart3
} from "lucide-react";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

type DateRange = "7d" | "30d" | "90d";

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  const getDateRange = () => {
    const end = new Date();
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const start = subDays(end, days);
    return { start, end, days };
  };

  const { start, end, days } = getDateRange();

  // Fetch member stats
  const { data: memberStats } = useQuery({
    queryKey: ["analytics-members", dateRange],
    queryFn: async () => {
      const [totalMembers, activeMembers, newMembers] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("memberships").select("id", { count: "exact" }).eq("status", "active"),
        supabase.from("profiles").select("id", { count: "exact" })
          .gte("created_at", start.toISOString())
      ]);

      return {
        total: totalMembers.count || 0,
        active: activeMembers.count || 0,
        new: newMembers.count || 0,
        retentionRate: totalMembers.count ? Math.round((activeMembers.count || 0) / totalMembers.count * 100) : 0
      };
    }
  });

  // Fetch booking stats
  const { data: bookingStats } = useQuery({
    queryKey: ["analytics-bookings", dateRange],
    queryFn: async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select("id, status, booked_at, checked_in")
        .gte("booked_at", start.toISOString())
        .lte("booked_at", end.toISOString());

      const total = bookings?.length || 0;
      const confirmed = bookings?.filter(b => b.status === "confirmed").length || 0;
      const cancelled = bookings?.filter(b => b.status === "cancelled").length || 0;
      const checkedIn = bookings?.filter(b => b.checked_in).length || 0;
      const attendanceRate = confirmed > 0 ? Math.round(checkedIn / confirmed * 100) : 0;

      return { total, confirmed, cancelled, checkedIn, attendanceRate };
    }
  });

  // Fetch workout stats
  const { data: workoutStats } = useQuery({
    queryKey: ["analytics-workouts", dateRange],
    queryFn: async () => {
      const { data: logs } = await supabase
        .from("workout_logs")
        .select("id, completed_at, rating, duration_minutes")
        .gte("workout_date", format(start, "yyyy-MM-dd"))
        .lte("workout_date", format(end, "yyyy-MM-dd"));

      const total = logs?.length || 0;
      const completed = logs?.filter(l => l.completed_at).length || 0;
      const avgRating = logs?.filter(l => l.rating).reduce((sum, l) => sum + (l.rating || 0), 0) / (logs?.filter(l => l.rating).length || 1);
      const avgDuration = logs?.filter(l => l.duration_minutes).reduce((sum, l) => sum + (l.duration_minutes || 0), 0) / (logs?.filter(l => l.duration_minutes).length || 1);
      const completionRate = total > 0 ? Math.round(completed / total * 100) : 0;

      return { total, completed, completionRate, avgRating: avgRating || 0, avgDuration: Math.round(avgDuration) || 0 };
    }
  });

  // Fetch daily booking trends
  const { data: bookingTrends } = useQuery({
    queryKey: ["analytics-booking-trends", dateRange],
    queryFn: async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select("booked_at, status")
        .gte("booked_at", start.toISOString())
        .lte("booked_at", end.toISOString());

      const dateMap = new Map<string, { bookings: number; cancellations: number }>();
      
      const interval = eachDayOfInterval({ start, end });
      interval.forEach(date => {
        dateMap.set(format(date, "yyyy-MM-dd"), { bookings: 0, cancellations: 0 });
      });

      bookings?.forEach(booking => {
        const dateKey = format(parseISO(booking.booked_at), "yyyy-MM-dd");
        const current = dateMap.get(dateKey) || { bookings: 0, cancellations: 0 };
        if (booking.status === "cancelled") {
          current.cancellations++;
        } else {
          current.bookings++;
        }
        dateMap.set(dateKey, current);
      });

      return Array.from(dateMap.entries()).map(([date, data]) => ({
        date: format(parseISO(date), "MMM d"),
        bookings: data.bookings,
        cancellations: data.cancellations
      }));
    }
  });

  // Fetch class popularity
  const { data: classPopularity } = useQuery({
    queryKey: ["analytics-class-popularity", dateRange],
    queryFn: async () => {
      const { data: schedules } = await supabase
        .from("class_schedules")
        .select(`
          id,
          booked_count,
          capacity,
          class_id,
          classes!inner(
            class_type_id,
            class_types!inner(name)
          )
        `)
        .gte("start_time", start.toISOString())
        .lte("start_time", end.toISOString());

      const classMap = new Map<string, { bookings: number; capacity: number }>();
      
      schedules?.forEach((schedule: any) => {
        const className = schedule.classes?.class_types?.name || "Unknown";
        const current = classMap.get(className) || { bookings: 0, capacity: 0 };
        current.bookings += schedule.booked_count || 0;
        current.capacity += schedule.capacity || 0;
        classMap.set(className, current);
      });

      return Array.from(classMap.entries())
        .map(([name, data]) => ({
          name,
          bookings: data.bookings,
          fillRate: data.capacity > 0 ? Math.round(data.bookings / data.capacity * 100) : 0
        }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, 6);
    }
  });

  // Fetch workout completion by day of week
  const { data: workoutsByDay } = useQuery({
    queryKey: ["analytics-workouts-by-day", dateRange],
    queryFn: async () => {
      const { data: logs } = await supabase
        .from("workout_logs")
        .select("workout_date, completed_at")
        .gte("workout_date", format(start, "yyyy-MM-dd"))
        .lte("workout_date", format(end, "yyyy-MM-dd"));

      const dayMap = new Map<number, { total: number; completed: number }>();
      
      for (let i = 0; i < 7; i++) {
        dayMap.set(i, { total: 0, completed: 0 });
      }

      logs?.forEach(log => {
        const dayOfWeek = parseISO(log.workout_date).getDay();
        const current = dayMap.get(dayOfWeek) || { total: 0, completed: 0 };
        current.total++;
        if (log.completed_at) current.completed++;
        dayMap.set(dayOfWeek, current);
      });

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return Array.from(dayMap.entries()).map(([day, data]) => ({
        day: dayNames[day],
        total: data.total,
        completed: data.completed,
        rate: data.total > 0 ? Math.round(data.completed / data.total * 100) : 0
      }));
    }
  });

  // Fetch top engaged members
  const { data: topMembers } = useQuery({
    queryKey: ["analytics-top-members", dateRange],
    queryFn: async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select("user_id, status")
        .gte("booked_at", start.toISOString())
        .eq("status", "confirmed");

      const { data: workouts } = await supabase
        .from("workout_logs")
        .select("user_id, completed_at")
        .gte("workout_date", format(start, "yyyy-MM-dd"));

      const memberMap = new Map<string, { classes: number; workouts: number }>();

      bookings?.forEach(b => {
        const current = memberMap.get(b.user_id) || { classes: 0, workouts: 0 };
        current.classes++;
        memberMap.set(b.user_id, current);
      });

      workouts?.forEach(w => {
        if (w.completed_at) {
          const current = memberMap.get(w.user_id) || { classes: 0, workouts: 0 };
          current.workouts++;
          memberMap.set(w.user_id, current);
        }
      });

      const topUserIds = Array.from(memberMap.entries())
        .map(([userId, data]) => ({ userId, total: data.classes + data.workouts, ...data }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      if (topUserIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", topUserIds.map(u => u.userId));

      return topUserIds.map(user => {
        const profile = profiles?.find(p => p.id === user.userId);
        return {
          name: profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Unknown" : "Unknown",
          classes: user.classes,
          workouts: user.workouts,
          total: user.total
        };
      });
    }
  });

  const COLORS = ["hsl(var(--primary))", "hsl(var(--drake-gold))", "hsl(var(--muted-foreground))", "#10757E", "#6A6A6A", "#DDE1E4"];

  const chartConfig = {
    bookings: { label: "Bookings", color: "hsl(var(--primary))" },
    cancellations: { label: "Cancellations", color: "hsl(var(--destructive))" },
    completed: { label: "Completed", color: "hsl(var(--drake-gold))" },
    total: { label: "Total", color: "hsl(var(--muted-foreground))" },
  };

  return (
    <>
      <SEO title="Analytics | Admin" description="Advanced analytics and reporting dashboard" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header with date range selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Track member engagement, workout completion, and class attendance
              </p>
            </div>
            <Select value={dateRange} onValueChange={(v: DateRange) => setDateRange(v)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats?.total || 0}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    +{memberStats?.new || 0} new
                  </Badge>
                  <span>this period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats?.active || 0}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-drake-gold font-medium">
                    {memberStats?.retentionRate || 0}%
                  </span>
                  <span className="text-muted-foreground">retention rate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingStats?.total || 0}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-600 font-medium">
                    {bookingStats?.attendanceRate || 0}%
                  </span>
                  <span className="text-muted-foreground">attendance rate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workouts Logged</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workoutStats?.total || 0}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-drake-gold font-medium">
                    {workoutStats?.completionRate || 0}%
                  </span>
                  <span className="text-muted-foreground">completion rate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for detailed analytics */}
          <Tabs defaultValue="engagement" className="space-y-4">
            <TabsList>
              <TabsTrigger value="engagement">Member Engagement</TabsTrigger>
              <TabsTrigger value="classes">Class Attendance</TabsTrigger>
              <TabsTrigger value="workouts">Workout Analytics</TabsTrigger>
            </TabsList>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Engaged Members</CardTitle>
                    <CardDescription>Most active members by classes + workouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {topMembers && topMembers.length > 0 ? (
                      <div className="space-y-4">
                        {topMembers.map((member, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {member.classes} classes • {member.workouts} workouts
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">{member.total} total</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No engagement data yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Engagement Overview</CardTitle>
                    <CardDescription>Key engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Member Retention</span>
                        <span className="text-sm font-medium">{memberStats?.retentionRate || 0}%</span>
                      </div>
                      <Progress value={memberStats?.retentionRate || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Class Attendance</span>
                        <span className="text-sm font-medium">{bookingStats?.attendanceRate || 0}%</span>
                      </div>
                      <Progress value={bookingStats?.attendanceRate || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Workout Completion</span>
                        <span className="text-sm font-medium">{workoutStats?.completionRate || 0}%</span>
                      </div>
                      <Progress value={workoutStats?.completionRate || 0} className="h-2" />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-drake-gold">
                            <Star className="h-5 w-5" />
                            {workoutStats?.avgRating.toFixed(1) || "0.0"}
                          </div>
                          <p className="text-xs text-muted-foreground">Avg Workout Rating</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            {workoutStats?.avgDuration || 0}
                          </div>
                          <p className="text-xs text-muted-foreground">Avg Duration (min)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Booking Trends</CardTitle>
                    <CardDescription>Daily bookings vs cancellations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookingTrends && bookingTrends.length > 0 ? (
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <AreaChart data={bookingTrends}>
                          <XAxis 
                            dataKey="date" 
                            tickLine={false} 
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            interval="preserveStartEnd"
                          />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area 
                            type="monotone" 
                            dataKey="bookings" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary))" 
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="cancellations" 
                            stroke="hsl(var(--destructive))" 
                            fill="hsl(var(--destructive))" 
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ChartContainer>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No booking data yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Class Popularity</CardTitle>
                    <CardDescription>Most booked class types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {classPopularity && classPopularity.length > 0 ? (
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={classPopularity} layout="vertical">
                          <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fontSize: 12 }}
                            width={100}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No class data yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Breakdown</CardTitle>
                  <CardDescription>Booking status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-3xl font-bold text-primary">{bookingStats?.confirmed || 0}</div>
                      <p className="text-sm text-muted-foreground">Confirmed</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-3xl font-bold text-green-600">{bookingStats?.checkedIn || 0}</div>
                      <p className="text-sm text-muted-foreground">Checked In</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-3xl font-bold text-destructive">{bookingStats?.cancelled || 0}</div>
                      <p className="text-sm text-muted-foreground">Cancelled</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-3xl font-bold text-drake-gold">{bookingStats?.attendanceRate || 0}%</div>
                      <p className="text-sm text-muted-foreground">Show-up Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Workouts Tab */}
            <TabsContent value="workouts" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workouts by Day</CardTitle>
                    <CardDescription>Completion rates by day of week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {workoutsByDay && workoutsByDay.some(d => d.total > 0) ? (
                      <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={workoutsByDay}>
                          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="total" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="completed" fill="hsl(var(--drake-gold))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No workout data yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workout Performance</CardTitle>
                    <CardDescription>Key workout metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">{workoutStats?.total || 0}</div>
                        <p className="text-xs text-muted-foreground">Workouts Started</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold">{workoutStats?.completed || 0}</div>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Completion Rate</span>
                        <span className="text-sm font-bold text-drake-gold">{workoutStats?.completionRate || 0}%</span>
                      </div>
                      <Progress value={workoutStats?.completionRate || 0} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Duration</p>
                        <p className="text-xl font-bold">{workoutStats?.avgDuration || 0} min</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-drake-gold text-drake-gold" />
                          <span className="text-xl font-bold">{workoutStats?.avgRating.toFixed(1) || "0.0"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}