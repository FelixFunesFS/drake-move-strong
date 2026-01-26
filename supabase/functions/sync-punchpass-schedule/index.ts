import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ClassData {
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  location: string | null;
  instructor: string | null;
  spots_remaining: number | null;
  spots_total: number | null;
  is_online: boolean;
  punchpass_url: string | null;
  raw_time_string: string | null;
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!match) return { hours: 0, minutes: 0 };
  
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3]?.toLowerCase();
  
  if (period === 'pm' && hours !== 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  
  return { hours, minutes };
}

function formatTimeForDb(hours: number, minutes: number): string {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
}

function parseScheduleFromMarkdown(markdown: string): ClassData[] {
  const classes: ClassData[] = [];
  const lines = markdown.split('\n');
  
  let currentDate: string | null = null;
  let currentYear = new Date().getFullYear();
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Match date headers like "January 5", "January 6", etc.
    const dateMatch = line.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})$/i);
    if (dateMatch) {
      const monthName = dateMatch[1];
      const day = parseInt(dateMatch[2]);
      const monthMap: Record<string, number> = {
        january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
        july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
      };
      const month = monthMap[monthName.toLowerCase()];
      
      // Handle year rollover
      const today = new Date();
      if (month < today.getMonth() - 6) {
        currentYear = today.getFullYear() + 1;
      }
      
      const dateObj = new Date(currentYear, month, day);
      currentDate = dateObj.toISOString().split('T')[0];
      i++;
      continue;
    }
    
    // Match time like "8:00 am" or "11:00 am"
    const timeMatch = line.match(/^(\d{1,2}:\d{2}\s*(?:am|pm))/i);
    if (timeMatch && currentDate) {
      const rawTimeString = timeMatch[1];
      const { hours, minutes } = parseTime(rawTimeString);
      const startTime = formatTimeForDb(hours, minutes);
      
      // Look ahead for class details
      let className = '';
      let punchpassUrl: string | null = null;
      let duration = 60;
      let location: string | null = null;
      let instructor: string | null = null;
      let isOnline = false;
      let spotsRemaining: number | null = null;
      let spotsTotal: number | null = null;
      
      // Check next lines for class info
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const nextLine = lines[j].trim();
        
        // Class name with URL
        const classMatch = nextLine.match(/\[([^\]]+)\]\((https:\/\/drakefitness\.punchpass\.com\/classes\/\d+)\)/);
        if (classMatch) {
          className = classMatch[1];
          punchpassUrl = classMatch[2];
        }
        
        // ONLINE indicator
        if (nextLine === 'ONLINE' || nextLine.toLowerCase().includes('zoom')) {
          isOnline = true;
        }
        
        // Duration
        const durationMatch = nextLine.match(/(\d+)\s*(?:hour|hr|min)/i);
        if (durationMatch) {
          const value = parseInt(durationMatch[1]);
          duration = nextLine.toLowerCase().includes('min') ? value : value * 60;
        }
        
        // Location
        if (nextLine.includes('Drake Fitness In Studio')) {
          location = 'Drake Fitness Studio';
        } else if (nextLine.includes('Zoom') || nextLine.includes('Online')) {
          location = 'Online (Zoom)';
          isOnline = true;
        }
        
        // Instructor
        if (['David', 'Nick', 'Coach Nick'].includes(nextLine)) {
          instructor = nextLine;
        }
        
        // Spots - look for patterns like "5/12 spots" or "5 spots"
        const spotsMatch = nextLine.match(/(\d+)(?:\/(\d+))?\s*spots?/i);
        if (spotsMatch) {
          spotsRemaining = parseInt(spotsMatch[1]);
          if (spotsMatch[2]) {
            spotsTotal = parseInt(spotsMatch[2]);
          }
        }
        
        // Stop if we hit another time or date
        if (nextLine.match(/^\d{1,2}:\d{2}\s*(?:am|pm)/i) && j > i + 1) {
          break;
        }
        if (nextLine.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}$/i)) {
          break;
        }
      }
      
      if (className && currentDate) {
        // Calculate end time
        const endHours = hours + Math.floor(duration / 60);
        const endMinutes = minutes + (duration % 60);
        const adjustedEndHours = endHours + Math.floor(endMinutes / 60);
        const adjustedEndMinutes = endMinutes % 60;
        const endTime = formatTimeForDb(adjustedEndHours, adjustedEndMinutes);
        
        classes.push({
          class_name: className,
          class_date: currentDate,
          start_time: startTime,
          end_time: endTime,
          duration_minutes: duration,
          location,
          instructor,
          spots_remaining: spotsRemaining,
          spots_total: spotsTotal,
          is_online: isOnline,
          punchpass_url: punchpassUrl,
          raw_time_string: rawTimeString,
        });
      }
    }
    
    i++;
  }
  
  return classes;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Check authorization header
    const authHeader = req.headers.get('Authorization');
    
    // Check if this is a cron-triggered request
    // Cron uses service role key OR special cron secret from body
    let isCronRequest = authHeader === `Bearer ${serviceRoleKey}`;
    
    // Also check for cron source in body (for pg_cron which may not pass service role correctly)
    let body: { source?: string; cron_secret?: string } = {};
    try {
      const text = await req.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch { /* ignore parse errors */ }
    
    // Check if cron_secret matches (allows pg_cron to work without embedding service role in SQL)
    const cronSecret = Deno.env.get('CRON_SECRET');
    if (body.cron_secret && cronSecret && body.cron_secret === cronSecret) {
      isCronRequest = true;
    }
    
    // Create service role client for database operations
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    
    if (isCronRequest) {
      // Cron-triggered sync - no user auth needed
      console.log('[sync-punchpass-schedule] Cron-triggered sync starting...');
    } else {
      // Manual trigger - validate user is admin
      if (!authHeader?.startsWith('Bearer ')) {
        console.error('[sync-punchpass-schedule] Missing or invalid authorization header');
        return new Response(
          JSON.stringify({ error: 'Unauthorized - Missing authentication token' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create authenticated Supabase client for user validation
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });

      // Validate the JWT using getClaims
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
      
      if (claimsError || !claimsData?.claims?.sub) {
        console.error('[sync-punchpass-schedule] Invalid token:', claimsError);
        return new Response(
          JSON.stringify({ error: 'Unauthorized - Invalid authentication token' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const userId = claimsData.claims.sub;

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError || !roleData) {
        console.error(`[sync-punchpass-schedule] Access denied - User ${userId} is not admin`);
        return new Response(
          JSON.stringify({ error: 'Forbidden - Admin access required' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`[sync-punchpass-schedule] Admin access granted for user: ${userId}`);
    }

    const tavilyApiKey = Deno.env.get('TAVILY_API_KEY');
    if (!tavilyApiKey) {
      console.error('TAVILY_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Tavily not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracting PunchPass schedule with Tavily...');

    // Extract the PunchPass schedule page using Tavily Extract API
    const extractResponse = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: tavilyApiKey,
        urls: ['https://drakefitness.punchpass.com/classes'],
      }),
    });

    const extractData = await extractResponse.json();

    if (!extractResponse.ok) {
      console.error('Tavily extract failed:', extractData);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to extract schedule', details: extractData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Tavily returns results array with raw_content
    const content = extractData.results?.[0]?.raw_content || '';
    console.log('Extracted content length:', content.length);

    // Parse the schedule
    const classes = parseScheduleFromMarkdown(content);
    console.log(`Parsed ${classes.length} classes from schedule`);

    if (classes.length === 0) {
      console.warn('No classes parsed from schedule. Content preview:', content.substring(0, 500));
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No classes found in schedule',
          classes_synced: 0,
          content_preview: content.substring(0, 500)
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear old entries (classes that have passed)
    const today = new Date().toISOString().split('T')[0];
    const { error: deleteError } = await supabaseAdmin
      .from('punchpass_schedule')
      .delete()
      .lt('class_date', today);

    if (deleteError) {
      console.warn('Error deleting old classes:', deleteError);
    }

    // Upsert new classes
    const { data: upsertData, error: upsertError } = await supabaseAdmin
      .from('punchpass_schedule')
      .upsert(
        classes.map(c => ({
          ...c,
          last_synced_at: new Date().toISOString(),
        })),
        { 
          onConflict: 'class_date,start_time,class_name,is_online',
          ignoreDuplicates: false 
        }
      )
      .select();

    if (upsertError) {
      console.error('Error upserting classes:', upsertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save schedule', details: upsertError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully synced ${upsertData?.length || classes.length} classes`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Schedule synced successfully',
        classes_synced: upsertData?.length || classes.length,
        classes_parsed: classes.length,
        last_synced: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error syncing schedule:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});