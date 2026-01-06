import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[manage-promotions] Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    // Create authenticated Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Validate the JWT and extract user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('[manage-promotions] Invalid token:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;

    // Create service role client for role check and database operations
    const supabaseAdmin = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      console.error(`[manage-promotions] Access denied - User ${userId} is not admin`);
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[manage-promotions] Admin access granted for user: ${userId}`);

    const { action, data, id } = await req.json();

    switch (action) {
      case 'list': {
        const { data: promotions, error } = await supabaseAdmin
          .from('promotions')
          .select('*')
          .order('priority', { ascending: false })
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return new Response(JSON.stringify({ promotions }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'create': {
        const { data: promotion, error } = await supabaseAdmin
          .from('promotions')
          .insert(data)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify({ promotion }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update': {
        const { data: promotion, error } = await supabaseAdmin
          .from('promotions')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify({ promotion }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'delete': {
        const { error } = await supabaseAdmin
          .from('promotions')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'toggle': {
        const { data: current } = await supabaseAdmin
          .from('promotions')
          .select('is_active')
          .eq('id', id)
          .single();
        
        const { data: promotion, error } = await supabaseAdmin
          .from('promotions')
          .update({ is_active: !current?.is_active })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify({ promotion }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});