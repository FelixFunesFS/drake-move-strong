import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Search, Loader2, User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Member {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  membership?: {
    status: string;
    plan_name: string;
    remaining_credits: number | null;
  } | null;
}

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

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
      // Fetch all profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, phone, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch memberships for all users
      const { data: memberships } = await supabase
        .from('memberships')
        .select('user_id, status, remaining_credits, membership_plans(name)')
        .eq('status', 'active');

      // Map memberships to members
      const membersWithMemberships = (profiles || []).map((profile) => {
        const membership = memberships?.find((m) => m.user_id === profile.id);
        return {
          ...profile,
          membership: membership
            ? {
                status: membership.status,
                plan_name: (membership.membership_plans as any)?.name || 'Unknown',
                remaining_credits: membership.remaining_credits,
              }
            : null,
        };
      });

      setMembers(membersWithMemberships);
      setFilteredMembers(membersWithMemberships);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipBadge = (membership: Member['membership']) => {
    if (!membership) {
      return <Badge variant="outline">No Membership</Badge>;
    }
    return (
      <Badge variant="default" className="bg-primary">
        {membership.plan_name}
      </Badge>
    );
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
        title="Manage Members" 
        description="View and manage Drake Fitness member accounts and memberships."
      />
      
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-hero text-3xl md:text-4xl uppercase">Members</h1>
              <p className="text-muted-foreground mt-1">
                {members.length} total members
              </p>
            </div>
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
                    {searchQuery ? 'No members match your search' : 'No members yet'}
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
                          {getMembershipBadge(member.membership)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {format(new Date(member.created_at), 'MMM d, yyyy')}
                          </span>
                          {member.membership?.remaining_credits !== null && member.membership?.remaining_credits !== undefined && (
                            <span className="text-primary font-medium">
                              {member.membership.remaining_credits} credits
                            </span>
                          )}
                        </div>
                      </div>
                      <Button asChild>
                        <Link to={`/admin/members/${member.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
