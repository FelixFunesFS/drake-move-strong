import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "@lovable.dev/email-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TEAL = "#0B4A52";
const GOLD = "#F2B544";
const DARK = "#1A1A1A";
const MUTED = "#6A6A6A";
const WHITE = "#ffffff";
const FOOTER_BG = "#0B4A52";

const RECIPIENTS = [
  "envision@mkqconsulting.com",
  "felixfunes2001.ff@gmail.com",
];
const FROM = "Drake Fitness <noreply@www.drake.fitness>";

// Shared layout wrapper
function wrap(body: string, previewText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<meta name="supported-color-schemes" content="light"/>
<title>Drake Fitness</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;600&display=swap');
body,table,td{font-family:'Inter',sans-serif;font-size:16px;line-height:1.6;color:${MUTED};}
h1,h2,h3{font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0 0 12px;}
a{color:${TEAL};text-decoration:underline;}
img{border:0;display:block;}
</style>
</head>
<body style="margin:0;padding:0;background-color:${WHITE};-webkit-text-size-adjust:100%;">
<!--preview--><span style="display:none!important;font-size:1px;color:${WHITE};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${previewText}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WHITE};">
<tr><td align="center" style="padding:0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<!-- HEADER -->
<tr><td style="background:${TEAL};padding:24px 30px;text-align:center;">
<img src="https://drake-move-strong.lovable.app/images/drake-fitness-logo2.png" alt="Drake Fitness" width="200" height="auto" style="display:block;margin:0 auto;max-width:200px;width:200px;" />
<p style="font-family:'Inter',sans-serif;font-size:12px;color:rgba(255,255,255,0.7);margin:8px 0 0;letter-spacing:1px;">MOVE. GET STRONG.</p>
</td></tr>
<!-- BODY -->
<tr><td style="padding:32px 30px;">
${body}
</td></tr>
<!-- FOOTER -->
<tr><td style="background:${FOOTER_BG};padding:24px 30px;text-align:center;">
<p style="font-family:'Oswald',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.8);margin:0 0 4px;letter-spacing:1px;">DRAKE FITNESS</p>
<p style="font-family:'Inter',sans-serif;font-size:12px;color:rgba(255,255,255,0.6);margin:0;">2 Avondale Ave, Charleston, SC 29407 &bull; (843) 817-5420</p>
<p style="font-family:'Inter',sans-serif;font-size:11px;color:rgba(255,255,255,0.4);margin:8px 0 0;">Strength for every stage of life.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function ctaButton(text: string, url = "https://drake.fitness/schedule"): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
<tr><td style="background:${GOLD};border-radius:12px;padding:14px 32px;text-align:center;">
<a href="${url}" style="font-family:'Oswald',Arial,sans-serif;font-size:16px;font-weight:700;color:${DARK};text-decoration:none;letter-spacing:1px;text-transform:uppercase;">${text}</a>
</td></tr></table>`;
}

function sectionHeading(text: string): string {
  return `<h2 style="font-family:'Oswald',Arial,sans-serif;font-size:24px;color:${DARK};margin:0 0 16px;">${text}</h2>`;
}

// ── ALL 12 EMAILS ──

interface EmailDef {
  subject: string;
  previewText: string;
  sequence: string;
  html: string;
}

const emails: EmailDef[] = [
  // ═══ NEW LEAD SEQUENCE ═══
  // 1. Instant — Welcome
  {
    subject: "You're in — here's what happens next",
    previewText: "Welcome to Drake Fitness. Here's everything you need to know for your first class.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Welcome to Drake Fitness")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">You just made a great decision.</p>
<p>I'm David Drake, and I've been coaching people at every level — from first-timers to seasoned athletes — who want to move well and get stronger for over 25 years.</p>
<p>Here's what you need to know:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Where:</strong> 2 Avondale Ave, Charleston, SC 29407 (free parking on-site)</li>
<li style="margin-bottom:8px;"><strong style="color:${DARK};">What to bring:</strong> Nothing. Just you.</li>
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Experience needed:</strong> Zero. We meet you where you are.</li>
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Already experienced?</strong> We'll challenge you. Our coaching sharpens movement quality at every level.</li>
</ul>
${ctaButton("View Class Schedule")}
<p style="font-size:14px;">See you on the floor,<br/><strong style="color:${DARK};">David Drake</strong><br/>Head Coach, Drake Fitness</p>
    `, "Welcome to Drake Fitness. Here's everything you need to know for your first class."),
  },
  // 2. Day 1 — Friction removal
  {
    subject: "You're all set — just show up",
    previewText: "No gear required. No experience needed. Just you.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("There's Nothing to Prepare")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">Seriously — just show up.</p>
<p>No special shoes. No protein shake. No pre-workout routine you found on Instagram.</p>
<p>Wear whatever you'd wear for a walk. We have all the equipment. Every exercise in every class is modified to your level — whether you've been training for years or this is day one.</p>
<p><strong style="color:${DARK};">Experienced lifters:</strong> expect smart programming and coaching cues that refine your technique, not just count your reps.</p>
<p>Our brand promise is simple: <strong style="color:${DARK};">"Sign up and show up."</strong> We handle the rest.</p>
${ctaButton("Book Your First Class")}
<p style="font-size:14px;">You've got this,<br/><strong style="color:${DARK};">David @ Drake Fitness</strong></p>
    `, "No gear required. No experience needed. Just you."),
  },
  // 3. Day 5 — Coach authority
  {
    subject: "Meet David — 25 years of coaching at every level",
    previewText: "I've spent 25 years coaching at every level. Here's why.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Why I Coach")}
<p>Twenty-five years ago, I watched someone give up on their body because a gym made them feel like they didn't belong.</p>
<p>That stuck with me.</p>
<p>I've spent every year since building a different kind of space — one where <strong style="color:${DARK};">a 65-year-old grandmother trains next to a 30-year-old firefighter</strong>, and neither feels out of place.</p>
<p>My philosophy is simple: <strong style="color:${DARK};">strength that serves your life — whether that's playing with your grandkids or competing in your next event.</strong> Kettlebells, bodyweight, mobility work — tools that build bodies that last decades and perform when it matters.</p>
<p>I don't count reps to rush through them. I watch how you move, and I coach you to move better. That's it.</p>
${ctaButton("See Our Classes", "https://drake.fitness/classes")}
<p style="font-size:14px;">— David Drake<br/>Head Coach</p>
    `, "I've spent 25 years coaching at every level. Here's why."),
  },
  // 4. Day 10 — Social proof
  {
    subject: "Two members, two starting points, same community",
    previewText: "Two different starting points. Same result: stronger.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Two Members. Two Starting Points. Same Community.")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">She almost didn't come back. He almost didn't need to.</p>
<p>When Sarah walked into Drake Fitness, she hadn't exercised in three years. Her lower back hurt every morning. She was convinced she was "too far gone."</p>
<p>Her first class was hard. Not because the exercises were impossible — but because she had to let go of the idea that she should already be good at this.</p>
<p>Six months later, Sarah deadlifted her bodyweight for the first time in her life. At 52.</p>
<blockquote style="border-left:4px solid ${GOLD};padding:12px 16px;margin:20px 0;background:#f9f7f2;border-radius:0 8px 8px 0;">
<p style="color:${DARK};font-style:italic;margin:0;">"I came for the back pain. I stayed because this is the first place that made me feel like an athlete — not a patient."</p>
<p style="font-size:13px;margin:8px 0 0;">— Sarah M., Drake Fitness member since 2024</p>
</blockquote>
<p>Then there's Jason. He'd been training at box gyms and CrossFit affiliates for over a decade. He wasn't starting over — he was looking for something better.</p>
<blockquote style="border-left:4px solid ${GOLD};padding:12px 16px;margin:20px 0;background:#f9f7f2;border-radius:0 8px 8px 0;">
<p style="color:${DARK};font-style:italic;margin:0;">"I've trained at box gyms and CrossFit affiliates for 10 years. Drake Fitness is the first place where coaching actually made me better, not just more tired."</p>
<p style="font-size:13px;margin:8px 0 0;">— Jason T., Drake Fitness member</p>
</blockquote>
${ctaButton("Ready to Write Your Story?")}
    `, "Two different starting points. Same result: stronger."),
  },
  // 5. Day 18 — Personal check-in (plain text style)
  {
    subject: "How's it going? (reply to this email)",
    previewText: "Just checking in — I'd love to hear how things are going.",
    sequence: "New Lead",
    html: wrap(`
<p>Hey —</p>
<p>Just wanted to check in.</p>
<p>Have you made it to a class yet? If so, how'd it feel? If not, no pressure — but I'd love to know what's holding you back.</p>
<p>Hit reply and let me know. I read every email.</p>
<p style="margin-top:24px;">— David</p>
<p style="font-size:13px;color:${MUTED};margin-top:16px;"><em>P.S. This isn't automated. I genuinely want to hear from you.</em></p>
    `, "Just checking in — I'd love to hear how things are going."),
  },
  // 6. Day 24 — Conversion
  {
    subject: "Ready to keep going? Members-only offer inside",
    previewText: "You've put in the work. Let's keep the momentum going.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Keep the Momentum Going")}
<p>If you've been to a class (or a few), you already know: this place is different.</p>
<p>No mirrors. No judgment. Just good coaching, smart programming, and a community that actually shows up for each other.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">FOUNDING MEMBER OFFER</h3>
</td></tr>
<tr><td style="padding:20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">Unlimited Classes — $149/month</strong></p>
<p style="margin:0 0 8px;font-size:14px;">✓ All group classes &bull; ✓ Open gym access &bull; ✓ Community events</p>
<p style="margin:0;font-size:14px;">✓ Yoga discount &bull; ✓ Cancel anytime</p>
</td></tr>
</table>
${ctaButton("Become a Member", "https://drake.fitness/pricing")}
<p style="font-size:14px;">Questions? Just reply to this email.<br/><strong style="color:${DARK};">— David Drake</strong></p>
    `, "You've put in the work. Let's keep the momentum going."),
  },
  // 7. Day 30 — Final conversion / urgency
  {
    subject: "Your free pass wraps up this week",
    previewText: "Your 3-class pass expires soon. Here's what members get next.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Your Pass Expires This Week")}
<p>I wanted to give you a heads up — your complimentary classes wrap up in the next few days.</p>
<p>If Drake Fitness felt right, I'd love to keep training with you. Here's what membership includes:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:8px;">Unlimited group classes (kettlebell, strength, mobility)</li>
<li style="margin-bottom:8px;">Open gym access during studio hours</li>
<li style="margin-bottom:8px;">A community that actually knows your name</li>
<li style="margin-bottom:8px;">Discounted yoga with Misty Lister</li>
</ul>
${ctaButton("View Membership Options", "https://drake.fitness/pricing")}
<p>No pressure. The door's always open.</p>
<p style="font-size:14px;">— David &amp; the Drake Fitness crew</p>
    `, "Your 3-class pass expires soon. Here's what members get next."),
  },

  // ═══ WIN-BACK SEQUENCE ═══
  // 8. Day 0 — Warm re-engagement (plain text)
  {
    subject: "Hey — David here. We miss seeing you.",
    previewText: "It's been a while — just wanted to say hey.",
    sequence: "Win-Back",
    html: wrap(`
<p>Hey —</p>
<p>It's David. I noticed it's been a while since we've seen you at the studio.</p>
<p>No pitch, no offer. I just wanted to say: the studio isn't the same without you. The crew asks about you.</p>
<p>Whenever you're ready, we're here. Same address, same vibe, same community.</p>
<p style="margin-top:24px;">— David Drake<br/>Drake Fitness<br/>(843) 817-5420</p>
    `, "It's been a while — just wanted to say hey."),
  },
  // 9. Day 5 — What's new
  {
    subject: "What's new at the studio",
    previewText: "A few things have changed since you were last here.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("A Lot Has Happened")}
<p>Since you were last at the studio, we've been busy:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:10px;"><strong style="color:${DARK};">New class times</strong> — we added early morning and Saturday slots based on member feedback</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Mobility programming</strong> — dedicated sessions to help you move better, not just harder</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Advanced programming tracks</strong> — heavier loads, complex movements, periodized progression</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Community events</strong> — monthly ruck walks, partner workouts, and more</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Studio upgrades</strong> — new equipment and a refreshed training floor</li>
</ul>
<p>Come see for yourself.</p>
${ctaButton("Check the New Schedule")}
    `, "A few things have changed since you were last here."),
  },
  // 10. Day 12 — Comeback social proof
  {
    subject: "Mike's comeback story",
    previewText: "He took 6 months off. Here's what happened when he came back.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("He Almost Didn't Come Back")}
<p>Mike had been a regular — three classes a week, never missed a Saturday.</p>
<p>Then life happened. A new job, a move across town, a few weeks that turned into six months.</p>
<p>When he finally walked back in, he was nervous. "I thought everyone would be way ahead of me," he said.</p>
<p>His first class back? He was winded. His grip gave out on the kettlebell swings. He scaled everything.</p>
<p>And he loved it.</p>
<p>Within two weeks, he was back to his working weights. Within a month, he hit a PR he'd been chasing before the break.</p>
<blockquote style="border-left:4px solid ${GOLD};padding:12px 16px;margin:20px 0;background:#f9f7f2;border-radius:0 8px 8px 0;">
<p style="color:${DARK};font-style:italic;margin:0;">"Walking back in was the hardest part. Once I was on the floor, it felt like I never left. David just said 'welcome back' and handed me a kettlebell."</p>
<p style="font-size:13px;margin:8px 0 0;">— Mike R.</p>
</blockquote>
<p><strong style="color:${DARK};">It's never too late to walk back in.</strong></p>
${ctaButton("Book a Class")}
    `, "He took 6 months off. Here's what happened when he came back."),
  },
  // 11. Day 21 — Win-back offer
  {
    subject: "Come back for a week — on us",
    previewText: "No commitment. No catch. Just come move with us for a week.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("One Week. On the House.")}
<p>I get it — coming back after a break feels like starting over. It's not. Your body remembers more than you think.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">FREE COMEBACK WEEK</h3>
</td></tr>
<tr><td style="padding:20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">Unlimited classes for 7 days — no strings attached.</strong></p>
<p style="margin:0 0 8px;font-size:14px;">✓ All group classes &bull; ✓ All skill levels &bull; ✓ No commitment</p>
<p style="margin:0;font-size:13px;color:${MUTED};">Offer valid for 10 days from this email.</p>
</td></tr>
</table>
<p>Just one class. See how it feels.</p>
${ctaButton("Claim Your Free Week")}
<p style="font-size:14px;">— David Drake</p>
    `, "No commitment. No catch. Just come move with us for a week."),
  },
  // 12. Day 35 — Soft close (plain text)
  {
    subject: "The door's always open",
    previewText: "No pressure. Whenever you're ready, we'll be here.",
    sequence: "Win-Back",
    html: wrap(`
<p>Hey —</p>
<p>This is the last email in this series, and I'll keep it short.</p>
<p>There's no guilt trip. No countdown timer. No "last chance" gimmick.</p>
<p>Whenever you're ready to move again — whether that's tomorrow or six months from now — we'll be here. Same studio, same crew, same energy.</p>
<p>The door's always open.</p>
<p style="margin-top:24px;">— David Drake<br/>Drake Fitness<br/>2 Avondale Ave, Charleston, SC 29407<br/>(843) 817-5420</p>
    `, "No pressure. Whenever you're ready, we'll be here."),
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const results: { subject: string; sequence: string; status: string; error?: string }[] = [];

    for (const email of emails) {
      try {
        await resend.emails.send({
          from: FROM,
          to: RECIPIENTS,
          subject: `[${email.sequence}] ${email.subject}`,
          html: email.html,
        });
        results.push({ subject: email.subject, sequence: email.sequence, status: "sent" });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        results.push({ subject: email.subject, sequence: email.sequence, status: "failed", error: msg });
      }
    }

    const sent = results.filter((r) => r.status === "sent").length;
    const failed = results.filter((r) => r.status === "failed").length;

    return new Response(
      JSON.stringify({ sent, failed, total: emails.length, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("send-nurture-previews error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
