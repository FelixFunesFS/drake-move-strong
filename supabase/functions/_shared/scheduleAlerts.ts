/** Alert emails for schedule sync health, sent via the Resend connector gateway. */

const ALERT_RECIPIENTS = ['envision@mkqconsulting.com'];
const ALERT_FROM = 'Drake Fitness Alerts <intake@drake.fitness>';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';

export async function sendScheduleAlert(subject: string, bodyHtml: string) {
  const lovableKey = Deno.env.get('LOVABLE_API_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!lovableKey || !resendKey) {
    console.warn('Alert email skipped: email keys not configured');
    return;
  }

  try {
    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lovableKey}`,
        'X-Connection-Api-Key': resendKey,
      },
      body: JSON.stringify({
        from: ALERT_FROM,
        to: ALERT_RECIPIENTS,
        subject,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1A1A1A">${bodyHtml}</div>`,
      }),
    });
    if (!res.ok) {
      console.error(`Alert email failed [${res.status}]: ${await res.text()}`);
    }
  } catch (e) {
    console.error('Alert email error:', e);
  }
}
