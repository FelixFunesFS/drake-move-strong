import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { User, Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type AppRole = 'admin' | 'coach' | 'member';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isCoach: boolean;
  isMember: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lazy-loaded Supabase client reference
let supabaseClient: SupabaseClient<Database> | null = null;

async function getSupabaseClient(): Promise<SupabaseClient<Database>> {
  if (!supabaseClient) {
    const { supabase } = await import('@/integrations/supabase/client');
    supabaseClient = supabase;
  }
  return supabaseClient;
}

export function LazyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  const fetchUserData = useCallback(async (userId: string, client: SupabaseClient<Database>) => {
    try {
      // Fetch profile
      const { data: profileData } = await client
        .from('profiles')
        .select('id, email, first_name, last_name, phone, avatar_url')
        .eq('id', userId)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch role
      const { data: roleData } = await client
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .order('role')
        .limit(1)
        .maybeSingle();

      if (roleData) {
        setRole(roleData.role as AppRole);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Defer Supabase initialization to reduce initial bundle blocking
    const initAuth = async () => {
      const client = await getSupabaseClient();
      
      // Set up auth state listener
      const { data: { subscription } } = client.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            setTimeout(() => {
              fetchUserData(session.user.id, client);
            }, 0);
          } else {
            setProfile(null);
            setRole(null);
            setIsLoading(false);
          }
        }
      );

      // Check for existing session
      const { data: { session } } = await client.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id, client);
      } else {
        setIsLoading(false);
      }

      return () => subscription.unsubscribe();
    };

    initAuth();
  }, [fetchUserData]);

  const signUp = useCallback(async (email: string, password: string, firstName?: string, lastName?: string) => {
    const client = await getSupabaseClient();
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    
    return { error: error as Error | null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = await getSupabaseClient();
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error: error as Error | null };
  }, []);

  const signOut = useCallback(async () => {
    const client = await getSupabaseClient();
    await client.auth.signOut();
    setProfile(null);
    setRole(null);
  }, []);

  const value = {
    user,
    session,
    profile,
    role,
    isLoading,
    signUp,
    signIn,
    signOut,
    isAdmin: role === 'admin',
    isCoach: role === 'coach',
    isMember: role === 'member',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
