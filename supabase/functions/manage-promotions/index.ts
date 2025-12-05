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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data, id } = await req.json();

    switch (action) {
      case 'list': {
        const { data: promotions, error } = await supabase
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
        const { data: promotion, error } = await supabase
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
        const { data: promotion, error } = await supabase
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
        const { error } = await supabase
          .from('promotions')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'toggle': {
        const { data: current } = await supabase
          .from('promotions')
          .select('is_active')
          .eq('id', id)
          .single();
        
        const { data: promotion, error } = await supabase
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