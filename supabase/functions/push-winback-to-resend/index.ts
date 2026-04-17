// Pushes the cleaned winback contact list into a Resend Audience and creates
// 4 broadcast drafts (one per win-back template). Drafts are NOT scheduled —
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
  { dayLabel: "Day 0",  subject: "We miss you at Drake Fitness" },
  { dayLabel: "Day 4",  subject: "Let's make your comeback simple" },
  { dayLabel: "Day 7",  subject: "From 'I fell off' to 'I'm back'" },
  { dayLabel: "Day 12", subject: "Last call for your 3 free classes" },
];

interface Contact {
  email: string;
  first_name?: string;
  last_name?: string;
}

// Cleaned win-back list (61 eligible former members, current-client filter removed per user request).
// Excluded: 5 phone-only contacts (SMS sequence): Brian Vaughn, Lorraine Jeter, Rhett Thomas, Susan Lozier, Tina Campbell.
// Used when no CSV is provided in the request body.
const WINBACK_CONTACTS: Contact[] = [
  { email: "halanford@gmail.com", first_name: "Allison", last_name: "Lanford" },
  { email: "lancaster.carolyn@gmail.com", first_name: "Carolyn", last_name: "Lancaster" },
  { email: "jholtproperties@gmail.com", first_name: "Jonathan", last_name: "Holt" },
  { email: "nmontgomery.sportsmassage@gmail.com", first_name: "Nancy", last_name: "Montgomery" },
  { email: "sarahokelley@yahoo.com", first_name: "Sarah", last_name: "O'Kelley" },
  { email: "rolfersue@gmail.com", first_name: "Sue", last_name: "Boatwright" },
  { email: "abfootdoc@comcast.net", first_name: "Adam", last_name: "Brown" },
  { email: "alison@liollio.com", first_name: "Alison", last_name: "Dawson" },
  { email: "aimeejoh@aol.com", first_name: "Amy", last_name: "Kirshtein" },
  { email: "acomfort2683@yahoo.com", first_name: "Andre", last_name: "Hinds" },
  { email: "angspitz@gmail.com", first_name: "Angela", last_name: "Yu" },
  { email: "paradiseannie@yahoo.com", first_name: "Annie", last_name: "Paradise" },
  { email: "ashli.golden@c4tm.net", first_name: "Ashli", last_name: "Golden" },
  { email: "bdsilveston@gmail.com", first_name: "Barbara", last_name: "Silveston" },
  { email: "rebeccaroberts775@yahoo.com", first_name: "Becca", last_name: "Roberts" },
  { email: "billpkent@gmail.com", first_name: "Bill", last_name: "Kent" },
  { email: "billpappas@palmettoford.com", first_name: "Bill", last_name: "Pappas" },
  { email: "blakemiller@charlestonheatingandair.com", first_name: "Blake", last_name: "Miller" },
  { email: "importautomotivesolutions@yahoo.com", first_name: "Brad", last_name: "Baker" },
  { email: "duddycriscuolo@gmail.com", first_name: "Brian", last_name: "Criscuolo" },
  { email: "brian@uniqueconstructors.com", first_name: "Brian", last_name: "Cruze" },
  { email: "crleepson@gmail.com", first_name: "Cara", last_name: "Leepson" },
  { email: "casey_vanvalkenburgh@hotmail.com", first_name: "Casey", last_name: "Van Valkenburgh" },
  { email: "christinemary12@gmail.com", first_name: "Christine", last_name: "Whiteley" },
  { email: "clhuffman4@gmail.com", first_name: "Coy", last_name: "Huffman" },
  { email: "coachcrafton@gmail.com", first_name: "Crafton", last_name: "Dicus" },
  { email: "danicat31@gmail.com", first_name: "Danielle", last_name: "Goldston" },
  { email: "zachandme@gmail.com", first_name: "Darcy", last_name: "Nelson" },
  { email: "drdave@letssimplify.com", first_name: "David", last_name: "Albenberg" },
  { email: "truebalancebodywork@gmail.com", first_name: "David", last_name: "Stowers" },
  { email: "diajohnson1@gmail.com", first_name: "Dia", last_name: "Johnson" },
  { email: "docbassett@gmail.com", first_name: "Dr. Eric", last_name: "Bassett" },
  { email: "dylan.mauerhan@advintagedistributing.com", first_name: "Dylan", last_name: "Mauerhan" },
  { email: "edwardcmorrison@gmail.com", first_name: "Edward", last_name: "Morrison" },
  { email: "fallonsposato@gmail.com", first_name: "Fallon", last_name: "Sposato" },
  { email: "gerry.lee.schmidt@gmail.com", first_name: "Gerry", last_name: "Schmidt" },
  { email: "gingerbrewton@hotmail.com", first_name: "Ginger", last_name: "Brewton" },
  { email: "holly.rickards@gmail.com", first_name: "Holly", last_name: "Rickards" },
  { email: "rocketman.petitpain@gmail.com", first_name: "Jason", last_name: "Petitpain" },
  { email: "follybeach@shakasurfschool.com", first_name: "Jenny", last_name: "Brown" },
  { email: "john.gaskins@mac.com", first_name: "John", last_name: "Gaskins" },
  { email: "jard880@gmail.com", first_name: "Jonathan", last_name: "Ard" },
  { email: "jordannas24@gmail.com", first_name: "Jordanna", last_name: "Segal" },
  { email: "kateblake360@gmail.com", first_name: "Kate", last_name: "Ellesworth" },
  { email: "kelly.hylton@gmail.com", first_name: "Kelly", last_name: "Hylton" },
  { email: "lacey.ivey@yahoo.com", first_name: "Lacey", last_name: "Ivey" },
  { email: "lahaddon0013@gmail.com", first_name: "Laura", last_name: "Haddon" },
  { email: "lee.manigault@gmail.com", first_name: "Lee", last_name: "Manigault" },
  { email: "mark_gillispie@yahoo.com", first_name: "Mark", last_name: "Gillispie" },
  { email: "martichitwood@aol.com", first_name: "Marti", last_name: "Chitwood" },
  { email: "gibsonville@earthlink.net", first_name: "Mary Ellen", last_name: "Gibson" },
  { email: "mikesnowfilms@gmail.com", first_name: "Mike", last_name: "Snow" },
  { email: "n.roskill@icloud.com", first_name: "Nicole", last_name: "Roskill" },
  { email: "paula.mullen@citcomm.com", first_name: "Paula", last_name: "Mullen" },
  { email: "rory@mywellnessmentor.com", first_name: "Rory", last_name: "Thomas" },
  { email: "rwballou@me.com", first_name: "Ruth", last_name: "Ballou" },
  { email: "sl.chekansky@gmail.com", first_name: "Sarah", last_name: "Chekansky" },
  { email: "sdolven@msn.com", first_name: "Sarah", last_name: "Dolven" },
  { email: "scottsnider@usa.net", first_name: "Scott", last_name: "Snider" },
  { email: "sleppard@companionassociates.com", first_name: "Sharon", last_name: "Leppard" },
  { email: "taylor@hometeambbq.com", first_name: "Taylor", last_name: "Garrigan" },
];

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

    const { csv, templates } = await req.json() as { csv?: string; templates: Record<string, string> };
    if (!templates) throw new Error("Templates object is required");

    // If CSV is provided, parse it. Otherwise fall back to embedded cleaned list.
    const contacts = csv ? parseCsv(csv) : WINBACK_CONTACTS;
    if (contacts.length === 0) throw new Error("No valid contacts available");

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
