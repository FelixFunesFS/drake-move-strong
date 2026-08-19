import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const STUDIO_EMAIL = "david@drake.fitness";
// drake.fitness is a verified sending domain in Resend, so both the studio
// and the client copies deliver (the shared test sender only reached the owner).
const FROM = "Drake Fitness <intake@drake.fitness>";

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  fileName?: string;
  pdfBase64?: string;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("Missing email credentials");
      return new Response(JSON.stringify({ error: "Email is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body: Payload = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const pdfBase64 = body.pdfBase64 || "";
    const fileName = (body.fileName || "drake-fitness-intake.pdf").replace(/[^a-z0-9.\-_]/gi, "-");

    if (!name || name.length > 120) {
      return new Response(JSON.stringify({ error: "A valid name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!pdfBase64 || pdfBase64.length > 12_000_000) {
      return new Response(JSON.stringify({ error: "Invalid form attachment" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    const studioHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;line-height:1.6">
        <h2 style="color:#0B4A52;margin:0 0 12px">New client intake</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
        <p style="margin:0 0 16px"><strong>Submitted:</strong> ${escapeHtml(submittedAt)} ET</p>
        <p style="margin:0">The signed intake, agreement and waiver are attached as a PDF.</p>
      </div>`;

    const clientHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;line-height:1.6">
        <h2 style="color:#0B4A52;margin:0 0 12px">Thanks, ${escapeHtml(name.split(" ")[0])}</h2>
        <p>Your Drake Fitness intake form has been received. A copy of everything you signed is attached for your records.</p>
        <p>David reviews every form before your first session — he'll be in touch shortly.</p>
        <p style="margin-top:20px;color:#6e6e6e;font-size:13px">
          Drake Fitness · 2 Avondale Ave, Charleston, SC 29407 · (843) 817-5420
        </p>
      </div>`;

    const send = async (to: string, subject: string, html: string) => {
      const res = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: FROM,
          to: [to],
          subject,
          html,
          reply_to: to === STUDIO_EMAIL ? email : STUDIO_EMAIL,
          attachments: [{ filename: fileName, content: pdfBase64 }],
        }),
      });
      if (!res.ok) {
        const details = await res.text();
        console.error(`Resend send failed for ${to} [${res.status}]: ${details}`);
        return { ok: false, status: res.status, details };
      }
      return { ok: true };
    };

    const studioResult = await send(STUDIO_EMAIL, `New client intake — ${name}`, studioHtml);

    if (!studioResult.ok) {
      return new Response(
        JSON.stringify({
          error: "Could not deliver the intake form",
          status: studioResult.status,
          details: studioResult.details,
        }),
        { status: studioResult.status ?? 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    // Client copy is best-effort — it fails while the sender domain is unverified.
    const clientResult = await send(email, "Your Drake Fitness intake form", clientHtml);

    return new Response(JSON.stringify({ success: true, clientCopySent: clientResult.ok }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error processing intake form:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
