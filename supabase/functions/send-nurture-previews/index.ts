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

const EMAIL_IMAGE_BASE = "https://drake-move-strong.lovable.app/images/email";

function emailImage(imageName: string, alt: string): string {
  return `<div style="margin:0 0 24px;">
<img src="${EMAIL_IMAGE_BASE}/${imageName}" alt="${alt}" width="540" style="display:block;border-radius:8px;max-width:100%;height:auto;" />
</div>`;
}

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

function ctaButton(text: string, url = "https://www.drake.fitness/schedule"): string {
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
${emailImage("studio-david-dog.jpg", "David Drake with his dog at Drake Fitness")}
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
${emailImage("studio-kettlebells.jpg", "Kettlebells lined up at Drake Fitness studio")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">Seriously — just show up.</p>
<p>No special shoes. No protein shake. No pre-workout routine you found on Instagram.</p>
<p>Wear whatever you'd wear for a walk. We have all the equipment. Every exercise in every class is modified to your level — whether you've been training for years or this is day one.</p>
<p><strong style="color:${DARK};">Experienced lifters:</strong> expect smart programming and coaching cues that refine your technique, not just count your reps.</p>
<p>Our brand promise is simple: <strong style="color:${DARK};">"Sign up and show up."</strong> We handle the rest.</p>
${ctaButton("Book Your First Class")}
<p style="font-size:14px;">You've got this,<br/><strong style="color:${DARK};">David @ Drake Fitness</strong></p>
    `, "No gear required. No experience needed. Just you."),
  },
  // 3. Day 3 — Recovery & reassurance
  {
    subject: "Feeling sore? Good — here's what to do next",
    previewText: "Here's exactly what to do before your next class.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("How's the Body Feeling?")}
${emailImage("david-coaching-form.jpg", "David Drake coaching a member on proper form")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">If you're a little sore today — good. That means your body is responding.</p>
<p>Soreness after your first class is completely normal, whether you've trained before or not. It doesn't mean you overdid it. It means you challenged muscles in a new way — and that's exactly how you get stronger.</p>
<p>Here's your game plan for the next 48 hours:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
<tr><td style="padding:8px 0;"><strong style="color:${DARK};">💧 Hydrate</strong> — more water than usual. Your muscles need it to recover.</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:${DARK};">🥗 Eat whole foods</strong> — protein, vegetables, good carbs. Skip the junk today.</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:${DARK};">🚶 Walk 15 minutes</strong> — light movement flushes out the stiffness faster than rest.</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:${DARK};">😴 Sleep</strong> — this is where your body actually rebuilds. Prioritize it tonight.</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:1px solid ${GOLD};border-radius:8px;overflow:hidden;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">🔑 Coach's Tip</strong></p>
<p style="margin:0;font-size:14px;">Try this before bed tonight: <strong style="color:${DARK};">2 minutes of slow diaphragmatic breathing.</strong> Breathe in through your nose for 4 counts, expand your belly, exhale for 6. It's how we start every class at Drake Fitness — and it's one of the most powerful recovery tools there is.</p>
</td></tr>
</table>
<p><strong style="color:${DARK};">One more thing: class 2 is always easier than class 1.</strong> Your body adapts fast. By your next session, you'll know the flow, recognize the movements, and feel more confident. The hardest part is already behind you.</p>
${ctaButton("View Class Schedule")}
<p style="font-size:14px;">Recover well,<br/><strong style="color:${DARK};">David Drake</strong><br/>Head Coach, Drake Fitness</p>
    `, "Here's exactly what to do before your next class."),
  },
  // 4. Day 5 — Coach authority
  {
    subject: "Meet David — 25 years of coaching at every level",
    previewText: "I've spent 25 years coaching at every level. Here's why.",
    sequence: "New Lead",
    html: wrap(`
${sectionHeading("Why I Coach")}
${emailImage("david-coaching-form.jpg", "David Drake coaching a member on proper form")}
<p>Twenty-five years ago, I watched someone give up on their body because a gym made them feel like they didn't belong.</p>
<p>That stuck with me.</p>
<p>I've spent every year since building a different kind of space — one where <strong style="color:${DARK};">a 65-year-old grandmother trains next to a 30-year-old firefighter</strong>, and neither feels out of place.</p>
<p>My philosophy is simple: <strong style="color:${DARK};">strength that serves your life — whether that's playing with your grandkids or competing in your next event.</strong> Kettlebells, bodyweight, mobility work — tools that build bodies that last decades and perform when it matters.</p>
<p>I don't count reps to rush through them. I watch how you move, and I coach you to move better. That's it.</p>
${ctaButton("See Our Classes", "https://www.drake.fitness/classes")}
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
${emailImage("community-group-photo-new.jpg", "Drake Fitness community group photo")}
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
${emailImage("david-outside.jpg", "David Drake outside the studio")}
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
${emailImage("group-kettlebell-training.jpg", "Group kettlebell training class at Drake Fitness")}
<p>If you've been to a class (or a few), you already know: this place is different.</p>
<p>No mirrors. No judgment. Just good coaching, smart programming, and a community that actually shows up for each other.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">INTRO MEMBER OFFER</h3>
</td></tr>
<tr><td style="padding:20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">Get your first month of unlimited classes for just $110</strong></p>
<p style="margin:0 0 8px;font-size:14px;">That's over 50% off the normal $225/mo membership — available if you join within 7 days of your 3rd class.</p>
<p style="margin:0 0 8px;font-size:14px;">✓ All group classes &bull; ✓ Open gym access &bull; ✓ Community events</p>
<p style="margin:0;font-size:14px;">✓ Yoga discount &bull; ✓ Cancel anytime</p>
</td></tr>
</table>
${ctaButton("Become a Member", "https://www.drake.fitness/pricing")}
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
${emailImage("studio-full-view.jpg", "Full view of Drake Fitness studio")}
<p>I wanted to give you a heads up — your complimentary classes wrap up in the next few days.</p>
<p>If Drake Fitness felt right, I'd love to keep training with you. Here's what membership includes:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:8px;">Unlimited group classes (kettlebell, strength, mobility)</li>
<li style="margin-bottom:8px;">Open gym access during studio hours</li>
<li style="margin-bottom:8px;">A community that actually knows your name</li>
<li style="margin-bottom:8px;">Discounted yoga with Misty Lister</li>
</ul>
${ctaButton("View Membership Options", "https://www.drake.fitness/pricing")}
<p>No pressure. The door's always open.</p>
<p style="font-size:14px;">— David &amp; the Drake Fitness crew</p>
    `, "Your 3-class pass expires soon. Here's what members get next."),
  },

  // ═══ WIN-BACK SEQUENCE (4-email) ═══
  // Day 0 — We saved you a spot
  {
    subject: "We miss you at Drake Fitness",
    previewText: "We saved you a spot — 3 free classes + 50% off your first month back.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("We Saved You a Spot")}
${emailImage("studio-david-storefront.jpg", "David Drake at the Drake Fitness storefront")}
<p>Hi there —</p>
<p>It's been a while since we've seen you at Drake Fitness in Avondale, but we still remember how hard you worked on those kettlebell and strength sessions.</p>
<p>Because you've been part of our community before, we set aside something just for former members:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">FORMER MEMBER OFFER</h3>
</td></tr>
<tr><td style="padding:20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">&#x2705; 3 free classes</strong> to ease back in</p>
<p style="margin:0;"><strong style="color:${DARK};">&#x2705; 50% off your first month back or your first package</strong></p>
</td></tr>
</table>
<p>No pressure, no contracts — just a chance to see how good it feels to train again with coaching you already know and trust.</p>
${ctaButton("Claim My 3 Free Classes + 50% Off", "https://www.drake.fitness/welcome-back?utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=day0-saved-spot")}
<p>If you're not sure where to start, reply with your schedule and we'll recommend the best times.</p>
<p style="font-size:14px;">See you soon,<br/>David &amp; the Drake Fitness team</p>
    `, "We saved you a spot — 3 free classes + 50% off your first month back."),
  },
  // Day 4 — Make it easy
  {
    subject: "Let's make your comeback simple",
    previewText: "You don't have to start over from zero. Here's your low-stress on-ramp back.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("Let's Make Your Comeback Simple")}
${emailImage("david-coaching-form.jpg", "David Drake coaching a member on proper form")}
<p>Hi there —</p>
<p>Coming back to the gym can feel intimidating — especially if life, work, or injuries got in the way. At Drake Fitness, most of our members are 30–65 and juggling real-world stress, family, and careers, just like you.</p>
<p>That's why your win-back offer is built to be low-stress and high-support:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:10px;"><strong style="color:${DARK};">3 free classes</strong> to reconnect with kettlebell strength + mobility</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Plenty of coaching</strong> to modify around old aches, stiffness, or injuries</li>
<li style="margin-bottom:10px;"><strong style="color:${DARK};">Then 50% off</strong> your first month back or your first package if it feels right</li>
</ul>
<p>You already know what it's like to train here — this is just your on-ramp back.</p>
${ctaButton("Grab My 3 Free Classes + 50% Off", "https://www.drake.fitness/welcome-back?utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=day4-easy-comeback")}
<p>Hit reply if you want us to recommend 2–3 specific class times based on your schedule.</p>
<p style="font-size:14px;">— David</p>
    `, "You don't have to start over from zero. Here's your low-stress on-ramp back."),
  },
  // Day 7 — Social proof + urgency
  {
    subject: "From 'I fell off' to 'I'm back'",
    previewText: "What other returning members are saying — and how to use your offer.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("From &ldquo;I Fell Off&rdquo; to &ldquo;I'm Back&rdquo;")}
${emailImage("community-kettlebell-rack-pair.jpg", "Members training together with kettlebells at Drake Fitness")}
<p>Hi there —</p>
<p>A lot of our returning members in West Ashley and Avondale tell us the same thing:</p>
<blockquote style="border-left:4px solid ${GOLD};padding:12px 16px;margin:20px 0;background:#f9f7f2;border-radius:0 8px 8px 0;">
<p style="color:${DARK};font-style:italic;margin:0;">"I thought I'd be too out of shape to come back… but within a couple of classes I felt like myself again."</p>
</blockquote>
<p>When you use your 3 free classes, we'll help you:</p>
<ul style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Rebuild strength safely</strong> with kettlebell fundamentals</li>
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Improve mobility</strong> so daily life (stairs, kids, yardwork, travel) feels easier</li>
<li style="margin-bottom:8px;"><strong style="color:${DARK};">Set a realistic plan</strong> that fits your current season of life</li>
</ul>
<p>And remember, if you decide to stay, you still have <strong style="color:${DARK};">50% off your first month back or your first package</strong> waiting.</p>
<p>This win-back offer is only for former members and won't be around forever.</p>
${ctaButton("Use My 3 Free Classes + 50% Off", "https://www.drake.fitness/welcome-back?utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=day7-social-proof")}
<p>We'd genuinely love to see you in the studio again.</p>
<p style="font-size:14px;">— David</p>
    `, "What other returning members are saying — and how to use your offer."),
  },
  // Day 12 — Last-chance push
  {
    subject: "Last call for your 3 free classes",
    previewText: "Last call — your 3 free classes + 50% off comeback offer expires soon.",
    sequence: "Win-Back",
    html: wrap(`
${sectionHeading("Last Call for Your Comeback Offer")}
${emailImage("studio-nick-david-together.jpg", "Nick and David together at Drake Fitness")}
<p>Hi there —</p>
<p>Quick reminder: your former-member comeback offer is about to expire:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">&#x1F381; EXPIRES SOON</h3>
</td></tr>
<tr><td style="padding:20px;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">3 free classes</strong></p>
<p style="margin:0;"><strong style="color:${DARK};">+ 50% off your first month back or first package</strong></p>
</td></tr>
</table>
<p>If you've been waiting for the "right time," this is it. <strong style="color:${DARK};">You don't need to be in shape first</strong> — that's what we're here for. You just need to take the first step back through the door.</p>
<p>Here's how to use it:</p>
<ol style="padding-left:20px;margin:16px 0;">
<li style="margin-bottom:8px;">Click the link below</li>
<li style="margin-bottom:8px;">Pick your first class time</li>
<li style="margin-bottom:8px;">Show up — we'll handle the coaching and the plan</li>
</ol>
${ctaButton("Activate My Offer Before It Expires", "https://www.drake.fitness/welcome-back?utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=day12-last-call")}
<p>If it's truly not the season for you, no worries. But if a small part of you misses feeling strong and capable, we'd be honored to help you get that back.</p>
<p style="font-size:14px;">— David &amp; the Drake Fitness team</p>
    `, "Last call — your 3 free classes + 50% off comeback offer expires soon."),
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
