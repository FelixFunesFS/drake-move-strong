import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cancellation window in hours (refund credit if cancelled at least X hours before class)
const CANCELLATION_WINDOW_HOURS = 2;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[cancel-booking] Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create authenticated Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Validate the JWT and extract user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('[cancel-booking] Invalid token:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract user ID from authenticated user (NOT from request body)
    const userId = user.id;
    console.log(`[cancel-booking] Authenticated user: ${userId}`);

    // Create service role client for database operations
    const supabaseAdmin = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { bookingId, reason } = await req.json();

    console.log(`[cancel-booking] Authenticated cancel request - Booking: ${bookingId}, User: ${userId}`);

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: bookingId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get booking details with schedule info - verify ownership
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*, class_schedules(*)')
      .eq('id', bookingId)
      .maybeSingle();

    if (bookingError || !booking) {
      console.error('[cancel-booking] Booking not found:', bookingError);
      return new Response(
        JSON.stringify({ error: 'Booking not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CRITICAL: Verify the authenticated user owns this booking
    if (booking.user_id !== userId) {
      console.error(`[cancel-booking] Ownership mismatch - Booking user: ${booking.user_id}, Auth user: ${userId}`);
      return new Response(
        JSON.stringify({ error: 'Not authorized to cancel this booking' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (booking.status === 'cancelled') {
      return new Response(
        JSON.stringify({ error: 'Booking is already cancelled' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if class has already passed
    const classTime = new Date(booking.class_schedules.start_time);
    const now = new Date();
    
    if (classTime < now) {
      return new Response(
        JSON.stringify({ error: 'Cannot cancel a class that has already started' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate if within cancellation window for credit refund
    const hoursUntilClass = (classTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    const refundCredit = hoursUntilClass >= CANCELLATION_WINDOW_HOURS && booking.credits_used > 0;

    // Update booking to cancelled
    const { error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancellation_reason: reason || null,
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('[cancel-booking] Update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to cancel booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update class booked count
    const newBookedCount = Math.max(0, (booking.class_schedules.booked_count || 0) - 1);
    await supabaseAdmin
      .from('class_schedules')
      .update({ booked_count: newBookedCount })
      .eq('id', booking.schedule_id);

    // Refund credit if within cancellation window
    if (refundCredit) {
      const { data: membership } = await supabaseAdmin
        .from('memberships')
        .select('id, remaining_credits')
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle();

      if (membership) {
        await supabaseAdmin
          .from('memberships')
          .update({ remaining_credits: (membership.remaining_credits || 0) + booking.credits_used })
          .eq('id', membership.id);
        
        console.log(`[cancel-booking] Credit refunded - ${booking.credits_used} credit(s)`);
      }
    }

    // Promote from waitlist if there's a spot now
    const { data: nextInLine } = await supabaseAdmin
      .from('waitlist')
      .select('*')
      .eq('schedule_id', booking.schedule_id)
      .order('position', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextInLine) {
      // Remove from waitlist (they'll need to book again or we could auto-book them)
      // For now, just notify that a spot opened up
      console.log(`[cancel-booking] Spot opened - Next in waitlist: ${nextInLine.user_id}`);
      
      // Update their notified_at timestamp
      await supabaseAdmin
        .from('waitlist')
        .update({ notified_at: new Date().toISOString() })
        .eq('id', nextInLine.id);
    }

    console.log(`[cancel-booking] Booking cancelled - Refund: ${refundCredit}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        creditRefunded: refundCredit,
        message: refundCredit 
          ? 'Booking cancelled. Your credit has been refunded.' 
          : `Booking cancelled. Credits not refunded (cancelled less than ${CANCELLATION_WINDOW_HOURS} hours before class).`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[cancel-booking] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});