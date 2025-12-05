import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type AccessLevel = 'public' | 'member' | 'vip';

export function useVideoAccess() {
  const { user } = useAuth();

  // Fetch user's current membership plan
  const { data: membership } = useQuery({
    queryKey: ['membership', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('memberships')
        .select(`
          *,
          plan:membership_plans(name)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const planName = membership?.plan?.name || null;
  const isVIP = planName === 'VIP Unlimited';
  const hasMembership = !!membership;

  const canAccessVideo = (accessLevel: AccessLevel): boolean => {
    // Public videos accessible to everyone
    if (accessLevel === 'public') return true;
    
    // Member videos require any active membership
    if (accessLevel === 'member') return hasMembership;
    
    // VIP videos require VIP Unlimited membership
    if (accessLevel === 'vip') return isVIP;
    
    return false;
  };

  return {
    canAccessVideo,
    isVIP,
    hasMembership,
    planName,
    isLoading: !user ? false : !membership && membership !== null
  };
}
