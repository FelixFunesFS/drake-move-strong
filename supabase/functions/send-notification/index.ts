import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  template_slug: string;
  recipient_email: string;
  recipient_user_id?: string;
  variables: Record<string, string>;
}

// Replace template variables in content
function replaceVariables(content: string, variables: Record<string, string>): string {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return result;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { template_slug, recipient_email, recipient_user_id, variables }: NotificationRequest = await req.json();

    console.log(`Processing notification: ${template_slug} to ${recipient_email}`);

    // Fetch the template
    const { data: template, error: templateError } = await supabase
      .from('notification_templates')
      .select('*')
      .eq('slug', template_slug)
      .eq('is_active', true)
      .single();

    if (templateError || !template) {
      console.error('Template not found:', templateError);
      return new Response(
        JSON.stringify({ error: `Template '${template_slug}' not found or inactive` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Replace variables in subject and content
    const subject = replaceVariables(template.subject, variables);
    const htmlContent = replaceVariables(template.html_content, variables);
    const textContent = template.text_content ? replaceVariables(template.text_content, variables) : undefined;

    let status = 'logged';
    let errorMessage: string | null = null;
    let sentAt: string | null = null;

    // If Resend API key is configured, send the email
    if (resendApiKey) {
      try {
        console.log('Sending email via Resend...');
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Drake Fitness <noreply@drake.fitness>',
            to: [recipient_email],
            subject: subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          status = 'sent';
          sentAt = new Date().toISOString();
          console.log('Email sent successfully:', emailResult.id);
        } else {
          status = 'failed';
          errorMessage = emailResult.message || 'Unknown error from Resend';
          console.error('Failed to send email:', errorMessage);
        }
      } catch (emailError) {
        status = 'failed';
        errorMessage = emailError instanceof Error ? emailError.message : 'Email sending failed';
        console.error('Email error:', errorMessage);
      }
    } else {
      console.log('Resend API key not configured - logging notification only');
      status = 'logged';
    }

    // Log the notification
    const { data: logEntry, error: logError } = await supabase
      .from('notification_log')
      .insert({
        user_id: recipient_user_id || null,
        template_id: template.id,
        recipient_email,
        subject,
        content: htmlContent,
        variables,
        status,
        error_message: errorMessage,
        sent_at: sentAt,
      })
      .select()
      .single();

    if (logError) {
      console.error('Failed to log notification:', logError);
    } else {
      console.log('Notification logged:', logEntry.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        status,
        message: status === 'sent' 
          ? 'Email sent successfully' 
          : status === 'logged'
          ? 'Notification logged (email sending not configured)'
          : 'Email sending failed',
        log_id: logEntry?.id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing notification:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
