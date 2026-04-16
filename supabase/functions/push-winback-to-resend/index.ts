// Pushes the cleaned winback contact list into a Resend Audience and creates
// 5 broadcast drafts (one per win-back template). Drafts are NOT scheduled —
// the admin reviews and schedules send times in the Resend dashboard.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const FROM = "David Drake <david@drake.fitness>";
const REPLY_TO = "ddrake311@gmail.com";
const AUDIENCE_NAME = "Drake Fitness — Winback 2026";

// Win-back sequence definitions: subject + day label that maps to emailTemplates.ts
const WINBACK_BROADCASTS = [
  { dayLabel: "Day 0",  subject: "Hey — David here. We miss seeing you." },
  { dayLabel: "Day 5",  subject: "What's new at the studio" },
  { dayLabel: "Day 12", subject: "Mike's comeback story" },
  { dayLabel: "Day 21", subject: "3 free classes + 50% off — on us" },
  { dayLabel: "Day 35", subject: "The door's always open" },
];

interface Contact {
  email: string;
  first_name?: string;
  last_name?: string;
}

async function gateway(path: string, init: RequestInit, lovableKey: string, resendKey: string) {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Resend ${path} failed [${res.status}]: ${JSON.stringify(body)}`);
  }
  return body;
}

function parseCsv(csv: string): Contact[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const emailIdx = headers.indexOf("email");
  const firstIdx = headers.indexOf("first_name");
  const lastIdx = headers.indexOf("last_name");
  if (emailIdx === -1) throw new Error("CSV missing 'email' column");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      email: (cols[emailIdx] ?? "").trim().toLowerCase(),
      first_name: firstIdx >= 0 ? (cols[firstIdx] ?? "").trim() : undefined,
      last_name: lastIdx >= 0 ? (cols[lastIdx] ?? "").trim() : undefined,
    };
  }).filter((c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY");
    if (!lovableKey || !resendKey) throw new Error("Resend or Lovable API key not configured");
    if (!supabaseUrl || !supabaseAnon) throw new Error("Supabase env not configured");

    // Auth check — admin only
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const supabase = createClient(supabaseUrl, supabaseAnon, { global: { headers: { Authorization: authHeader } } });
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return new Response(JSON.stringify({ error: "Admin access required" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { csv, templates } = await req.json() as { csv: string; templates: Record<string, string> };
    if (!csv) throw new Error("CSV body is required");
    if (!templates) throw new Error("Templates object is required");

    const contacts = parseCsv(csv);
    if (contacts.length === 0) throw new Error("No valid contacts in CSV");

    // 1. Find or create the audience
    const audiencesRes = await gateway("/audiences", { method: "GET" }, lovableKey, resendKey) as { data: Array<{ id: string; name: string }> };
    let audience = audiencesRes.data?.find((a) => a.name === AUDIENCE_NAME);
    if (!audience) {
      const created = await gateway("/audiences", {
        method: "POST",
        body: JSON.stringify({ name: AUDIENCE_NAME }),
      }, lovableKey, resendKey) as { id: string; name: string };
      audience = { id: created.id, name: created.name };
    }

    // 2. Upload contacts (Resend dedupes by email per audience)
    let added = 0;
    let skipped = 0;
    for (const c of contacts) {
      try {
        await gateway(`/audiences/${audience.id}/contacts`, {
          method: "POST",
          body: JSON.stringify({
            email: c.email,
            first_name: c.first_name || undefined,
            last_name: c.last_name || undefined,
            unsubscribed: false,
          }),
        }, lovableKey, resendKey);
        added++;
      } catch (_e) {
        skipped++; // already exists or invalid
      }
    }

    // 3. Create 5 broadcast drafts
    const broadcasts: Array<{ dayLabel: string; subject: string; broadcast_id?: string; error?: string }> = [];
    for (const b of WINBACK_BROADCASTS) {
      const html = templates[b.dayLabel];
      if (!html) {
        broadcasts.push({ ...b, error: "template missing" });
        continue;
      }
      try {
        const created = await gateway("/broadcasts", {
          method: "POST",
          body: JSON.stringify({
            audience_id: audience.id,
            from: FROM,
            reply_to: [REPLY_TO],
            subject: b.subject,
            html,
            name: `Winback ${b.dayLabel} — ${b.subject}`,
          }),
        }, lovableKey, resendKey) as { id: string };
        broadcasts.push({ ...b, broadcast_id: created.id });
      } catch (e) {
        broadcasts.push({ ...b, error: e instanceof Error ? e.message : String(e) });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      audience: { id: audience.id, name: audience.name },
      contacts: { total: contacts.length, added, skipped },
      broadcasts,
      next_step: "Open the Resend dashboard → Broadcasts → review each draft → schedule send time.",
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("push-winback-to-resend error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
