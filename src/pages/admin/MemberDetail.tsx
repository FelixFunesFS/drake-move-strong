import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { 
  Loader2, ArrowLeft, Save, UserPlus, X, Dumbbell, Calendar, 
  Clock, Play, Pause, CheckCircle, Plus, Trash2
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

type WorkoutStatus = Database['public']['Enums']['workout_status'];

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  health_notes: string | null;
  created_at: string;
}

interface Membership {
  id: string;
  status: string;
  remaining_credits: number | null;
  current_period_start: string | null;
  current_period_end: string | null;
  plan: {
    id: string;
    name: string;
    price: number;
    unlimited_classes: boolean;
  };
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  class_credits: number | null;
  unlimited_classes: boolean;
}

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
  status: WorkoutStatus | null;
  frequency_per_week: number | null;
  custom_notes: string | null;
  assigned_at: string;
  template: WorkoutTemplate;
}

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Assignment form state
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [periodStart, setPeriodStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [periodEnd, setPeriodEnd] = useState('');

  // Workout plan assignment state
  const [showWorkoutAssign, setShowWorkoutAssign] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMemberData();
      fetchPlans();
    }
  }, [id]);

  // Fetch workout templates
  const { data: workoutTemplates } = useQuery({
    queryKey: ['workout-templates-for-assignment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workout_templates')
        .select('id, name, description, focus_area, difficulty_level, estimated_duration_minutes')
        .eq('is_public', true)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data as WorkoutTemplate[];
    },
  });

  // Fetch member's workout plans
  const { data: memberWorkoutPlans, isLoading: workoutPlansLoading } = useQuery({
    queryKey: ['member-workout-plans', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('member_workout_plans')
        .select('*, workout_templates(*)')
        .eq('user_id', id)
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      
      return data.map(plan => ({
        id: plan.id,
        template_id: plan.template_id,
        start_date: plan.start_date,
        end_date: plan.end_date,
        status: plan.status,
        frequency_per_week: plan.frequency_per_week,
        custom_notes: plan.custom_notes,
        assigned_at: plan.assigned_at,
        template: plan.workout_templates as unknown as WorkoutTemplate,
      })) as MemberWorkoutPlan[];
    },
    enabled: !!id,
  });

  const fetchMemberData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch membership
      const { data: membershipData } = await supabase
        .from('memberships')
        .select('*, membership_plans(*)')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (membershipData) {
        setMembership({
          id: membershipData.id,
          status: membershipData.status,
          remaining_credits: membershipData.remaining_credits,
          current_period_start: membershipData.current_period_start,
          current_period_end: membershipData.current_period_end,
          plan: {
            id: (membershipData.membership_plans as any).id,
            name: (membershipData.membership_plans as any).name,
            price: (membershipData.membership_plans as any).price,
            unlimited_classes: (membershipData.membership_plans as any).unlimited_classes,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching member:', error);
      toast.error('Failed to load member data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    const { data } = await supabase
      .from('membership_plans')
      .select('id, name, price, class_credits, unlimited_classes')
      .eq('is_active', true)
      .order('sort_order');
    
    setPlans(data || []);
  };

  const handleAssignMembership = async () => {
    if (!selectedPlanId || !id) return;

    const plan = plans.find(p => p.id === selectedPlanId);
    if (!plan) return;

    setIsSaving(true);
    try {
      // Calculate period end (1 month from start by default)
      const startDate = new Date(periodStart);
      const endDate = periodEnd 
        ? new Date(periodEnd) 
        : addMonths(startDate, 1);

      // If member has existing membership, update it
      if (membership) {
        const { error } = await supabase
          .from('memberships')
          .update({
            plan_id: selectedPlanId,
            status: 'active',
            remaining_credits: plan.unlimited_classes ? null : plan.class_credits,
            current_period_start: periodStart,
            current_period_end: format(endDate, 'yyyy-MM-dd'),
          })
          .eq('id', membership.id);

        if (error) throw error;
      } else {
        // Create new membership
        const { error } = await supabase
          .from('memberships')
          .insert({
            user_id: id,
            plan_id: selectedPlanId,
            status: 'active',
            remaining_credits: plan.unlimited_classes ? null : plan.class_credits,
            current_period_start: periodStart,
            current_period_end: format(endDate, 'yyyy-MM-dd'),
          });

        if (error) throw error;
      }

      toast.success('Membership assigned successfully');
      setShowAssignForm(false);
      fetchMemberData();
    } catch (error) {
      console.error('Error assigning membership:', error);
      toast.error('Failed to assign membership');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelMembership = async () => {
    if (!membership) return;

    if (!confirm('Are you sure you want to cancel this membership?')) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('memberships')
        .update({ status: 'cancelled' })
        .eq('id', membership.id);

      if (error) throw error;

      toast.success('Membership cancelled');
      fetchMemberData();
    } catch (error) {
      console.error('Error cancelling membership:', error);
      toast.error('Failed to cancel membership');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCredits = async (credits: number) => {
    if (!membership) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('memberships')
        .update({ 
          remaining_credits: (membership.remaining_credits || 0) + credits 
        })
        .eq('id', membership.id);

      if (error) throw error;

      toast.success(`Added ${credits} credits`);
      fetchMemberData();
    } catch (error) {
      console.error('Error adding credits:', error);
      toast.error('Failed to add credits');
    } finally {
      setIsSaving(false);
    }
  };

  // Workout plan mutations
  const assignWorkoutPlanMutation = useMutation({
    mutationFn: async (data: {
      templateId: string;
      startDate: string;
      endDate: string | null;
      frequencyPerWeek: number;
      customNotes: string;
    }) => {
      const { error } = await supabase
        .from('member_workout_plans')
        .insert({
          user_id: id,
          template_id: data.templateId,
          coach_id: user?.id,
          start_date: data.startDate,
          end_date: data.endDate || null,
          frequency_per_week: data.frequencyPerWeek,
          custom_notes: data.customNotes || null,
          status: 'active',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans', id] });
      toast.success('Workout plan assigned');
      setShowWorkoutAssign(false);
    },
    onError: (error) => {
      toast.error('Failed to assign workout plan: ' + error.message);
    },
  });

  const updateWorkoutPlanStatusMutation = useMutation({
    mutationFn: async ({ planId, status }: { planId: string; status: WorkoutStatus }) => {
      const { error } = await supabase
        .from('member_workout_plans')
        .update({ status })
        .eq('id', planId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans', id] });
      toast.success('Plan status updated');
    },
    onError: (error) => {
      toast.error('Failed to update plan: ' + error.message);
    },
  });

  const deleteWorkoutPlanMutation = useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from('member_workout_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans', id] });
      toast.success('Workout plan removed');
    },
    onError: (error) => {
      toast.error('Failed to remove plan: ' + error.message);
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!profile) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Member not found</p>
          <Button onClick={() => navigate('/admin/members')} className="mt-4">
            Back to Members
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const activePlans = memberWorkoutPlans?.filter(p => p.status === 'active') || [];
  const completedPlans = memberWorkoutPlans?.filter(p => p.status === 'completed') || [];
  const pausedPlans = memberWorkoutPlans?.filter(p => p.status === 'paused') || [];

  return (
    <>
      <SEO 
        title={`Member: ${profile.first_name || profile.email}`}
        description="View and manage member details and membership"
      />
      
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/members')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-hero text-2xl md:text-3xl uppercase">
                {profile.first_name || profile.last_name
                  ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
                  : 'Member Details'}
              </h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="workouts">
                Workout Plans
                {activePlans.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activePlans.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-hero text-xl uppercase">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">First Name</Label>
                      <p className="font-medium">{profile.first_name || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Last Name</Label>
                      <p className="font-medium">{profile.last_name || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{profile.phone || '—'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Emergency Contact</Label>
                    <p className="font-medium">
                      {profile.emergency_contact_name 
                        ? `${profile.emergency_contact_name} (${profile.emergency_contact_phone || 'No phone'})`
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Health Notes</Label>
                    <p className="font-medium text-sm">{profile.health_notes || '—'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Member Since</Label>
                    <p className="font-medium">{format(new Date(profile.created_at), 'MMMM d, yyyy')}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-hero text-xl uppercase">Membership</CardTitle>
                  <CardDescription>
                    {membership ? 'Current membership details' : 'No active membership'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {membership ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg">{membership.plan.name}</p>
                          <p className="text-muted-foreground">${membership.plan.price}/month</p>
                        </div>
                        <Badge 
                          variant={membership.status === 'active' ? 'default' : 'secondary'}
                          className={membership.status === 'active' ? 'bg-green-600' : ''}
                        >
                          {membership.status}
                        </Badge>
                      </div>

                      {!membership.plan.unlimited_classes && (
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Remaining Credits</span>
                            <span className="text-2xl font-bold text-primary">
                              {membership.remaining_credits ?? 0}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleAddCredits(1)}>
                              +1
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleAddCredits(4)}>
                              +4
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleAddCredits(8)}>
                              +8
                            </Button>
                          </div>
                        </div>
                      )}

                      {membership.current_period_end && (
                        <div>
                          <Label className="text-muted-foreground">Period End</Label>
                          <p className="font-medium">
                            {format(new Date(membership.current_period_end), 'MMMM d, yyyy')}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAssignForm(true)}
                        >
                          Change Plan
                        </Button>
                        {membership.status === 'active' && (
                          <Button 
                            variant="destructive" 
                            onClick={handleCancelMembership}
                            disabled={isSaving}
                          >
                            Cancel Membership
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        This member doesn't have an active membership
                      </p>
                      <Button onClick={() => setShowAssignForm(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign Membership
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assign Membership Form */}
              {showAssignForm && (
                <Card className="shadow-card border-primary mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-hero text-xl uppercase">
                        {membership ? 'Change Membership' : 'Assign Membership'}
                      </CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => setShowAssignForm(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="plan">Membership Plan</Label>
                      <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {plans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.name} - ${plan.price}
                              {plan.unlimited_classes ? ' (Unlimited)' : ` (${plan.class_credits} credits)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start">Period Start</Label>
                        <Input
                          id="start"
                          type="date"
                          value={periodStart}
                          onChange={(e) => setPeriodStart(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end">Period End (optional)</Label>
                        <Input
                          id="end"
                          type="date"
                          value={periodEnd}
                          onChange={(e) => setPeriodEnd(e.target.value)}
                          placeholder="Auto: 1 month"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={handleAssignMembership} 
                        disabled={!selectedPlanId || isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {membership ? 'Update Membership' : 'Assign Membership'}
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setShowAssignForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Workout Plans Tab */}
            <TabsContent value="workouts" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-hero text-xl uppercase">Workout Plans</h2>
                  <p className="text-muted-foreground">
                    Assign and manage workout templates for this member
                  </p>
                </div>
                <WorkoutPlanAssignDialog
                  open={showWorkoutAssign}
                  onOpenChange={setShowWorkoutAssign}
                  templates={workoutTemplates || []}
                  onAssign={(data) => assignWorkoutPlanMutation.mutate(data)}
                  isPending={assignWorkoutPlanMutation.isPending}
                />
              </div>

              {workoutPlansLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : memberWorkoutPlans?.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Workout Plans</h3>
                    <p className="text-muted-foreground mb-4">
                      This member hasn't been assigned any workout plans yet
                    </p>
                    <Button onClick={() => setShowWorkoutAssign(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Assign First Plan
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Active Plans */}
                  {activePlans.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Play className="h-4 w-4 text-green-600" />
                        Active Plans
                      </h3>
                      <div className="grid gap-4">
                        {activePlans.map((plan) => (
                          <WorkoutPlanCard
                            key={plan.id}
                            plan={plan}
                            onUpdateStatus={(status) =>
                              updateWorkoutPlanStatusMutation.mutate({ planId: plan.id, status })
                            }
                            onDelete={() => {
                              if (confirm('Remove this workout plan?')) {
                                deleteWorkoutPlanMutation.mutate(plan.id);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Paused Plans */}
                  {pausedPlans.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Pause className="h-4 w-4 text-yellow-600" />
                        Paused Plans
                      </h3>
                      <div className="grid gap-4">
                        {pausedPlans.map((plan) => (
                          <WorkoutPlanCard
                            key={plan.id}
                            plan={plan}
                            onUpdateStatus={(status) =>
                              updateWorkoutPlanStatusMutation.mutate({ planId: plan.id, status })
                            }
                            onDelete={() => {
                              if (confirm('Remove this workout plan?')) {
                                deleteWorkoutPlanMutation.mutate(plan.id);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Plans */}
                  {completedPlans.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Completed Plans
                      </h3>
                      <div className="grid gap-4">
                        {completedPlans.map((plan) => (
                          <WorkoutPlanCard
                            key={plan.id}
                            plan={plan}
                            onUpdateStatus={(status) =>
                              updateWorkoutPlanStatusMutation.mutate({ planId: plan.id, status })
                            }
                            onDelete={() => {
                              if (confirm('Remove this workout plan?')) {
                                deleteWorkoutPlanMutation.mutate(plan.id);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}

// Workout Plan Card Component
function WorkoutPlanCard({
  plan,
  onUpdateStatus,
  onDelete,
}: {
  plan: MemberWorkoutPlan;
  onUpdateStatus: (status: WorkoutStatus) => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{plan.template.name}</h4>
              <Badge
                variant={
                  plan.status === 'active'
                    ? 'default'
                    : plan.status === 'paused'
                    ? 'secondary'
                    : 'outline'
                }
                className={plan.status === 'active' ? 'bg-green-600' : ''}
              >
                {plan.status}
              </Badge>
            </div>
            
            {plan.template.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {plan.template.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(plan.start_date), 'MMM d, yyyy')}
                {plan.end_date && ` - ${format(new Date(plan.end_date), 'MMM d, yyyy')}`}
              </span>
              {plan.frequency_per_week && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {plan.frequency_per_week}×/week
                </span>
              )}
              {plan.template.focus_area && (
                <Badge variant="outline" className="text-xs">
                  {plan.template.focus_area}
                </Badge>
              )}
            </div>

            {plan.custom_notes && (
              <p className="mt-2 text-sm italic text-muted-foreground border-l-2 pl-2">
                {plan.custom_notes}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            {plan.status === 'active' && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateStatus('paused')}
                  title="Pause"
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateStatus('completed')}
                  title="Mark Complete"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </>
            )}
            {plan.status === 'paused' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateStatus('active')}
                title="Resume"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            {plan.status === 'completed' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateStatus('active')}
                title="Reactivate"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={onDelete}
              title="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Workout Plan Assignment Dialog
function WorkoutPlanAssignDialog({
  open,
  onOpenChange,
  templates,
  onAssign,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: WorkoutTemplate[];
  onAssign: (data: {
    templateId: string;
    startDate: string;
    endDate: string | null;
    frequencyPerWeek: number;
    customNotes: string;
  }) => void;
  isPending: boolean;
}) {
  const [templateId, setTemplateId] = useState('');
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState('');
  const [frequencyPerWeek, setFrequencyPerWeek] = useState('3');
  const [customNotes, setCustomNotes] = useState('');

  const selectedTemplate = templates.find((t) => t.id === templateId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateId) {
      toast.error('Please select a workout template');
      return;
    }
    onAssign({
      templateId,
      startDate,
      endDate: endDate || null,
      frequencyPerWeek: parseInt(frequencyPerWeek),
      customNotes,
    });
  };

  const resetForm = () => {
    setTemplateId('');
    setStartDate(format(new Date(), 'yyyy-MM-dd'));
    setEndDate('');
    setFrequencyPerWeek('3');
    setCustomNotes('');
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Assign Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Workout Plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Workout Template *</Label>
            <Select value={templateId} onValueChange={setTemplateId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                    {template.focus_area && ` (${template.focus_area})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplate && (
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <p className="text-sm font-medium">{selectedTemplate.name}</p>
                {selectedTemplate.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedTemplate.description}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  {selectedTemplate.focus_area && (
                    <Badge variant="outline" className="text-xs">
                      {selectedTemplate.focus_area}
                    </Badge>
                  )}
                  {selectedTemplate.difficulty_level && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedTemplate.difficulty_level}
                    </Badge>
                  )}
                  {selectedTemplate.estimated_duration_minutes && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedTemplate.estimated_duration_minutes} min
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Date (optional)</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Frequency per Week</Label>
            <Select value={frequencyPerWeek} onValueChange={setFrequencyPerWeek}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}× per week
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Custom Notes for Member</Label>
            <Textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Add personalized notes or modifications for this member..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !templateId}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Assign Plan
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
