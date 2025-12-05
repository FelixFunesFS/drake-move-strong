import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { scheduleId, userId } = await req.json();

    console.log(`[book-class] Booking request - User: ${userId}, Schedule: ${scheduleId}`);

    if (!scheduleId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: scheduleId and userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already has a booking for this schedule
    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('id, status')
      .eq('user_id', userId)
      .eq('schedule_id', scheduleId)
      .maybeSingle();

    if (existingBooking && existingBooking.status === 'confirmed') {
      return new Response(
        JSON.stringify({ error: 'You already have a booking for this class' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get membership info
    const { data: membership } = await supabase
      .from('memberships')
      .select('*, membership_plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (!membership) {
      return new Response(
        JSON.stringify({ error: 'No active membership found. Please contact an admin.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check credits (if not unlimited)
    const plan = membership.membership_plans;
    if (!plan.unlimited_classes && (membership.remaining_credits || 0) < 1) {
      return new Response(
        JSON.stringify({ error: 'No class credits remaining. Please upgrade your membership or purchase more credits.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get class schedule info
    const { data: schedule, error: scheduleError } = await supabase
      .from('class_schedules')
      .select('*, classes(*, class_types(*))')
      .eq('id', scheduleId)
      .single();

    if (scheduleError || !schedule) {
      console.error('[book-class] Schedule not found:', scheduleError);
      return new Response(
        JSON.stringify({ error: 'Class not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if class is in the future
    if (new Date(schedule.start_time) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Cannot book a class that has already started' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check class availability
    if (schedule.booked_count >= schedule.capacity) {
      // Add to waitlist
      const { data: waitlistPosition } = await supabase
        .from('waitlist')
        .select('position')
        .eq('schedule_id', scheduleId)
        .order('position', { ascending: false })
        .limit(1);

      const nextPosition = (waitlistPosition?.[0]?.position || 0) + 1;

      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert({
          user_id: userId,
          schedule_id: scheduleId,
          position: nextPosition,
        });

      if (waitlistError) {
        console.error('[book-class] Waitlist error:', waitlistError);
        return new Response(
          JSON.stringify({ error: 'Failed to add to waitlist' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`[book-class] Added to waitlist - Position: ${nextPosition}`);
      return new Response(
        JSON.stringify({ 
          status: 'waitlisted', 
          position: nextPosition,
          message: `Class is full. You're #${nextPosition} on the waitlist.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        schedule_id: scheduleId,
        status: 'confirmed',
        credits_used: plan.unlimited_classes ? 0 : 1,
      })
      .select()
      .single();

    if (bookingError) {
      console.error('[book-class] Booking error:', bookingError);
      return new Response(
        JSON.stringify({ error: 'Failed to create booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update class booked count
    await supabase
      .from('class_schedules')
      .update({ booked_count: schedule.booked_count + 1 })
      .eq('id', scheduleId);

    // Deduct credit if not unlimited
    if (!plan.unlimited_classes) {
      await supabase
        .from('memberships')
        .update({ remaining_credits: (membership.remaining_credits || 0) - 1 })
        .eq('id', membership.id);
    }

    console.log(`[book-class] Booking confirmed - ID: ${booking.id}`);

    return new Response(
      JSON.stringify({ 
        status: 'confirmed', 
        booking,
        message: 'Class booked successfully!',
        className: schedule.classes?.class_types?.name,
        startTime: schedule.start_time,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[book-class] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
