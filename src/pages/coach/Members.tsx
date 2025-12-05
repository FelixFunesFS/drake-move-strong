import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import CoachLayout from '@/components/coach/CoachLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Search, Loader2, User, Mail, Dumbbell, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface AssignedMember {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  plan_name: string;
  plan_status: string;
  start_date: string;
  workouts_completed: number;
}

export default function CoachMembers() {
  const { user } = useAuth();
  const [members, setMembers] = useState<AssignedMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<AssignedMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMembers();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredMembers(
        members.filter(
          (m) =>
            m.email.toLowerCase().includes(query) ||
            (m.first_name && m.first_name.toLowerCase().includes(query)) ||
            (m.last_name && m.last_name.toLowerCase().includes(query))
        )
      );
    }
  }, [searchQuery, members]);

  const fetchMembers = async () => {
    try {
      // Fetch members with plans assigned by this coach
      const { data: plans } = await supabase
        .from('member_workout_plans')
        .select(`
          user_id, status, start_date,
          workout_templates(name),
          profiles!inner(id, email, first_name, last_name)
        `)
        .eq('coach_id', user?.id)
        .eq('status', 'active');

      if (!plans) {
        setMembers([]);
        setFilteredMembers([]);
        setIsLoading(false);
        return;
      }

      // Get workout counts for each member
      const memberIds = plans.map(p => p.user_id);
      const { data: workoutCounts } = await supabase
        .from('workout_logs')
        .select('user_id')
        .in('user_id', memberIds)
        .not('completed_at', 'is', null);

      const countsMap = (workoutCounts || []).reduce((acc, w) => {
        acc[w.user_id] = (acc[w.user_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const membersData = plans.map((plan: any) => ({
        id: plan.profiles.id,
        email: plan.profiles.email,
        first_name: plan.profiles.first_name,
        last_name: plan.profiles.last_name,
        plan_name: plan.workout_templates?.name || 'Custom Plan',
        plan_status: plan.status,
        start_date: plan.start_date,
        workouts_completed: countsMap[plan.user_id] || 0,
      }));

      setMembers(membersData);
      setFilteredMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
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
        title="My Members" 
        description="View and manage your assigned members."
      />
      
      <CoachLayout>
        <div className="space-y-6">
          <div>
            <h1 className="font-hero text-3xl md:text-4xl uppercase">My Members</h1>
            <p className="text-muted-foreground mt-1">
              {members.length} member{members.length !== 1 ? 's' : ''} assigned to you
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Members List */}
          <div className="grid gap-4">
            {filteredMembers.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? 'No members match your search' 
                      : 'No members assigned yet'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Members will appear here when workout plans are assigned to them.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMembers.map((member) => (
                <Card key={member.id} className="shadow-card">
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg truncate">
                            {member.first_name || member.last_name
                              ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                              : 'No name'}
                          </p>
                          <Badge variant="default" className="bg-primary">
                            {member.plan_name}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Started {format(new Date(member.start_date), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1 text-primary font-medium">
                            <Dumbbell className="h-4 w-4" />
                            {member.workouts_completed} workouts
                          </span>
                        </div>
                      </div>
                      <Button asChild>
                        <Link to={`/coach/progress?member=${member.id}`}>View Progress</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </CoachLayout>
    </>
  );
}
