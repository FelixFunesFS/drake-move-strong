import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Default instructor mapping for classes where PunchPass doesn't show the instructor
const DEFAULT_INSTRUCTORS: Record<string, string> = {
  'kettlebell flow': 'Nick',
  'ruckathon': 'David',
};

function resolveInstructors(classes: ClassData[]): void {
  // Pass 1: Copy instructor from ZOOM twin to in-studio twin (same date + time)
  const grouped = new Map<string, ClassData[]>();
  for (const c of classes) {
    const key = `${c.class_date}|${c.start_time}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(c);
  }
  for (const group of grouped.values()) {
    const withInstructor = group.find(c => c.instructor);
    if (withInstructor) {
      for (const c of group) {
        if (!c.instructor) c.instructor = withInstructor.instructor;
      }
    }
  }

  // Pass 2: Apply default mapping for remaining nulls
  for (const c of classes) {
    if (!c.instructor) {
      const nameLower = c.class_name.toLowerCase();
      for (const [pattern, instructor] of Object.entries(DEFAULT_INSTRUCTORS)) {
        if (nameLower.includes(pattern)) {
          c.instructor = instructor;
          break;
        }
      }
    }
  }
}

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
  // Handle formats like "8:00 am", "11:00 amGMT-05:00", "6:45 am"
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
  
  // Month name to number mapping
  const monthMap: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Match date headers like "January 26" or "January 5" (with optional trailing whitespace)
    const dateMatch = line.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})\s*$/i);
    if (dateMatch) {
      const monthName = dateMatch[1];
      const day = parseInt(dateMatch[2]);
      const month = monthMap[monthName.toLowerCase()];
      
      // Handle year rollover (if we see January but we're past June, it's next year)
      const today = new Date();
      if (month < today.getMonth() - 6) {
        currentYear = today.getFullYear() + 1;
      }
      
      const dateObj = new Date(currentYear, month, day);
      currentDate = dateObj.toISOString().split('T')[0];
      i++;
      continue;
    }
    
    // Match time like "8:00 am", "6:45 am", or "8:00 amGMT-05:00" (ZOOM classes have timezone suffix)
    const timeMatch = line.match(/^(\d{1,2}:\d{2}\s*(?:am|pm))(GMT[+-]\d{2}:\d{2})?$/i);
    if (timeMatch && currentDate) {
      const rawTimeString = timeMatch[1];
      const hasTimezone = !!timeMatch[2]; // GMT suffix indicates ZOOM class
      const { hours, minutes } = parseTime(rawTimeString);
      const startTime = formatTimeForDb(hours, minutes);
      
      // Look ahead for class details
      let className = '';
      let punchpassUrl: string | null = null;
      let duration = 60;
      let location: string | null = null;
      let instructor: string | null = null;
      let isOnline = hasTimezone; // Pre-set for ZOOM classes detected via timezone
      let spotsRemaining: number | null = null;
      
      // Check next lines for class info (up to 12 lines ahead for instructor capture)
      for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
        const nextLine = lines[j].trim();
        
        // Skip empty lines
        if (!nextLine) continue;
        
        // Skip day-of-week indicators like "Monday TODAY", "Tuesday", etc.
        if (nextLine.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i)) {
          continue;
        }
        
        // Class name with URL - handles both relative and absolute URLs
        // e.g., [KB STrong Group Fitness](/classes/18023313) or [KB STrong Group Fitness](https://drakefitness.punchpass.com/classes/18023313)
        const classMatch = nextLine.match(/\[([^\]]+)\]\(((?:https:\/\/drakefitness\.punchpass\.com)?\/classes\/\d+)\)/);
        if (classMatch && !className) {
          className = classMatch[1];
          punchpassUrl = classMatch[2];
          // Normalize relative URLs to absolute
          if (punchpassUrl && punchpassUrl.startsWith('/')) {
            punchpassUrl = 'https://drakefitness.punchpass.com' + punchpassUrl;
          }
          // Check if class name indicates ZOOM/online
          if (className.toLowerCase().includes('zoom')) {
            isOnline = true;
            location = 'Online (Zoom)';
          }
          continue;
        }
        
        // ONLINE indicator
        if (nextLine === 'ONLINE') {
          isOnline = true;
          continue;
        }
        
        // Duration - "1 hour"
        const durationMatch = nextLine.match(/^(\d+)\s*hour/i);
        if (durationMatch) {
          duration = parseInt(durationMatch[1]) * 60;
          continue;
        }
        
        // Location
        if (nextLine.includes('Drake Fitness In Studio')) {
          location = 'Drake Fitness Studio';
          continue;
        }
        if (nextLine.includes('KB Strong Zoom Online') || nextLine.includes('Zoom')) {
          location = 'Online (Zoom)';
          isOnline = true;
          continue;
        }
        
        // Instructor (David, Nick, or Coach Nick) - normalize the name
        if (/^(David|Nick|Coach\s*Nick)$/i.test(nextLine)) {
          const normalized = nextLine.toLowerCase().trim();
          if (normalized === 'david') {
            instructor = 'David';
          } else if (normalized === 'nick' || normalized.includes('nick')) {
            instructor = 'Nick';
          }
          continue;
        }
        
        // Spots - "5 SPOTS LEFT" or "9 SPOTS LEFT"
        const spotsMatch = nextLine.match(/^(\d+)\s*SPOTS?\s*LEFT/i);
        if (spotsMatch) {
          spotsRemaining = parseInt(spotsMatch[1]);
          continue;
        }
        
        // Stop if we hit another time (next class entry)
        if (nextLine.match(/^\d{1,2}:\d{2}\s*(?:am|pm)$/i)) {
          break;
        }
        
        // Stop if we hit a date header
        if (nextLine.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}$/i)) {
          break;
        }
        
        // Stop if we hit month marker like "Jan"
        if (nextLine.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i)) {
          break;
        }
      }
      
      // Only add if we found a valid class name
      if (className && currentDate) {
        // Final check: ensure ZOOM classes are always flagged correctly
        if (className.toLowerCase().includes('zoom')) {
          isOnline = true;
          if (!location) location = 'Online (Zoom)';
        }
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
          spots_total: null,
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
    
    // --- Authentication: check bypasses first, then fall back to admin JWT ---
    const authHeader = req.headers.get('Authorization');
    
    // Bypass 1: Service role key in Authorization header
    let isCronRequest = authHeader === `Bearer ${serviceRoleKey}`;
    
    // Read body once (needed for cron_secret check)
    let bodyText = '';
    try { bodyText = await req.text(); } catch { /* ignore */ }
    let body: { source?: string; cron_secret?: string } = {};
    try { if (bodyText) body = JSON.parse(bodyText); } catch { /* ignore */ }
    
    // Bypass 2: cron_secret in body
    if (!isCronRequest) {
      const cronSecret = Deno.env.get('CRON_SECRET');
      if (body.cron_secret && cronSecret && body.cron_secret === cronSecret) {
        isCronRequest = true;
      }
    }
    
    // Bypass 3: x-cron-secret header
    if (!isCronRequest) {
      const cronSecret = Deno.env.get('CRON_SECRET');
      const headerSecret = req.headers.get('x-cron-secret');
      if (headerSecret && cronSecret && headerSecret === cronSecret) {
        isCronRequest = true;
      }
    }
    
    // Create service role client for database operations
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    
    if (isCronRequest) {
      console.log('[sync-punchpass-schedule] Cron/bypass-triggered sync starting...');
    } else {
      console.log('[sync-punchpass-schedule] Manual sync triggered (no auth required)');
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

    // Extract the PunchPass schedule page using Tavily Extract API with advanced depth for JS-rendered content
    const extractResponse = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: tavilyApiKey,
        urls: ['https://drakefitness.punchpass.com/classes'],
        extract_depth: 'advanced',
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
    console.log('Content preview:', content.substring(0, 1000));

    // Parse the schedule
    const classes = parseScheduleFromMarkdown(content);
    resolveInstructors(classes);
    const resolvedCount = classes.filter(c => c.instructor).length;
    console.log(`Parsed ${classes.length} classes, ${resolvedCount} with instructors after in-batch resolution`);

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

    // --- Pass 3: DB-aware instructor resolution ---
    // Query existing rows that already have instructors for the date range being synced
    const uniqueDates = [...new Set(classes.map(c => c.class_date))];
    const { data: existingRows } = await supabaseAdmin
      .from('punchpass_schedule')
      .select('class_date, start_time, class_name, is_online, instructor')
      .in('class_date', uniqueDates)
      .not('instructor', 'is', null);

    if (existingRows && existingRows.length > 0) {
      let dbResolvedCount = 0;
      for (const c of classes) {
        if (!c.instructor) {
          // Look for any existing row at the same date+time that has an instructor
          const twin = existingRows.find(
            e => e.class_date === c.class_date && e.start_time === c.start_time && e.instructor
          );
          if (twin) {
            c.instructor = twin.instructor;
            dbResolvedCount++;
          }
        }
      }
      if (dbResolvedCount > 0) {
        console.log(`Pass 3 (DB lookup): resolved ${dbResolvedCount} additional instructors`);
      }
    }

    // --- Preserve existing instructors on upsert ---
    // For any class still with null instructor, check if the DB already has one for the same conflict key
    if (existingRows && existingRows.length > 0) {
      let preservedCount = 0;
      for (const c of classes) {
        if (!c.instructor) {
          const existing = existingRows.find(
            e => e.class_date === c.class_date
              && e.start_time === c.start_time
              && e.class_name === c.class_name
              && e.is_online === c.is_online
              && e.instructor
          );
          if (existing) {
            c.instructor = existing.instructor;
            preservedCount++;
          }
        }
      }
      if (preservedCount > 0) {
        console.log(`Preserved ${preservedCount} existing instructor values from DB`);
      }
    }

    const finalResolvedCount = classes.filter(c => c.instructor).length;
    console.log(`Final: ${finalResolvedCount}/${classes.length} classes have instructors`);

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
