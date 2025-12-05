import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Calendar, CreditCard, TrendingUp, Loader2 } from 'lucide-react';

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  todayClasses: number;
  totalBookingsToday: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    todayClasses: 0,
    totalBookingsToday: 0,
  });
  const [recentMembers, setRecentMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total members
      const { count: totalMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch active memberships
      const { count: activeMembers } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch today's classes
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { count: todayClasses } = await supabase
        .from('class_schedules')
        .select('*', { count: 'exact', head: true })
        .gte('start_time', today.toISOString())
        .lt('start_time', tomorrow.toISOString());

      // Fetch today's bookings
      const { count: totalBookingsToday } = await supabase
        .from('bookings')
        .select('*, class_schedules!inner(*)', { count: 'exact', head: true })
        .eq('status', 'confirmed')
        .gte('class_schedules.start_time', today.toISOString())
        .lt('class_schedules.start_time', tomorrow.toISOString());

      setStats({
        totalMembers: totalMembers || 0,
        activeMembers: activeMembers || 0,
        todayClasses: todayClasses || 0,
        totalBookingsToday: totalBookingsToday || 0,
      });

      // Fetch recent members
      const { data: recent } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentMembers(recent || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <SEO 
        title="Admin Dashboard" 
        description="Drake Fitness admin dashboard - manage members, classes, and schedules."
      />
      
      <AdminLayout>
        <div className="space-y-8">
          <div>
            <h1 className="font-hero text-3xl md:text-4xl uppercase">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your fitness studio
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalMembers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Registered accounts
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Memberships
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{stats.activeMembers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Paying members
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Classes Today
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.todayClasses}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled sessions
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Bookings Today
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-accent">{stats.totalBookingsToday}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confirmed reservations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Members */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-hero text-xl uppercase">Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link to="/admin/members">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Members
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Class Schedule
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/class-types">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Class Types
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Members */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-hero text-xl uppercase">Recent Signups</CardTitle>
                <CardDescription>Newest member accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {recentMembers.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No members yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {member.first_name || member.last_name 
                              ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                              : 'No name'}
                          </p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/members/${member.id}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
