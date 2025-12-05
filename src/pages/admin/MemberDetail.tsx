import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Save, UserPlus, X } from 'lucide-react';
import { format } from 'date-fns';

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

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Assignment form state
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [periodStart, setPeriodStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [periodEnd, setPeriodEnd] = useState('');

  useEffect(() => {
    if (id) {
      fetchMemberData();
      fetchPlans();
    }
  }, [id]);

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
        : new Date(startDate.setMonth(startDate.getMonth() + 1));

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Info */}
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

            {/* Membership */}
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
          </div>

          {/* Assign Membership Form */}
          {showAssignForm && (
            <Card className="shadow-card border-primary">
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
        </div>
      </AdminLayout>
    </>
  );
}
