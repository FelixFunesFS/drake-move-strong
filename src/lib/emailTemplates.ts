// Client-side email HTML generators — ported from send-nurture-previews edge function
// Used for instant preview rendering in the admin UI
// Hardened for cross-client compatibility (Gmail, Outlook, Apple Mail, Yahoo, mobile)

const TEAL = "#0B4A52";
const GOLD = "#F2B544";
const DARK = "#1A1A1A";
const MUTED = "#6A6A6A";
const WHITE = "#ffffff";
const FOOTER_BG = "#0B4A52";

// Footer text colors — hex only, no rgba() for Outlook compatibility
const FOOTER_TEXT = "#cccccc";       // ~rgba(255,255,255,0.8)
const FOOTER_SUBTLE = "#99a3a3";     // ~rgba(255,255,255,0.6)
const FOOTER_FAINT = "#667777";      // ~rgba(255,255,255,0.4)
const HEADER_SUBTITLE = "#b3cccc";   // ~rgba(255,255,255,0.7)

// Permanent public storage bucket URL — works regardless of where HTML is pasted
const ASSET_BASE = "https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/email-assets";

function emailImage(imageName: string, alt: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
<tr><td align="center">
<img src="${ASSET_BASE}/${imageName}" alt="${alt}" width="540" style="display:block;border-radius:8px;max-width:100%;height:auto;" />
</td></tr>
</table>`;
}

function wrap(body: string, previewText: string): string {
  const logoUrl = `${ASSET_BASE}/drake-fitness-logo2.png`;
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<meta name="supported-color-schemes" content="light"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<title>Drake Fitness</title>
<style>
body,table,td{font-family:'Inter',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;}
h1,h2,h3{font-family:'Oswald',Helvetica,Arial,sans-serif;color:${DARK};margin:0 0 12px;}
a{color:${TEAL};text-decoration:underline;}
img{border:0;display:block;}
</style>
</head>
<body style="margin:0;padding:0;background-color:${WHITE};-webkit-text-size-adjust:100%;mso-line-height-rule:exactly;">
<!--preview--><span style="display:none!important;font-size:1px;color:${WHITE};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${previewText}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WHITE};">
<tr><td align="center" style="padding:0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<!-- HEADER -->
<tr><td style="background:${TEAL};padding:24px 30px;text-align:center;">
<img src="${logoUrl}" alt="Drake Fitness" width="200" height="50" style="display:block;margin:0 auto;max-width:200px;width:200px;height:50px;" />
<p style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:12px;color:${HEADER_SUBTITLE};margin:8px 0 0;letter-spacing:1px;mso-line-height-rule:exactly;">MOVE. GET STRONG.</p>
</td></tr>
<!-- BODY -->
<tr><td style="padding:32px 30px;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;">
${body}
</td></tr>
<!-- FOOTER -->
<tr><td style="background:${FOOTER_BG};padding:24px 30px;text-align:center;">
<p style="font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:14px;color:${FOOTER_TEXT};margin:0 0 4px;letter-spacing:1px;mso-line-height-rule:exactly;">DRAKE FITNESS</p>
<p style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:12px;color:${FOOTER_SUBTLE};margin:0;mso-line-height-rule:exactly;">2 Avondale Ave, Charleston, SC 29407 &bull; (843) 817-5420</p>
<p style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:11px;color:${FOOTER_FAINT};margin:8px 0 0;mso-line-height-rule:exactly;">Strength for every stage of life.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function ctaButton(text: string, url = "https://www.drake.fitness/schedule"): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;" align="center">
<tr><td style="background:${GOLD};border-radius:12px;padding:14px 32px;text-align:center;">
<a href="${url}" style="font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:${DARK};text-decoration:none;letter-spacing:1px;text-transform:uppercase;">${text}</a>
</td></tr></table>`;
}

function sectionHeading(text: string): string {
  return `<h2 style="font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:24px;color:${DARK};margin:0 0 16px;">${text}</h2>`;
}

function signatureBlock(lines: string): string {
  const avatarUrl = `${ASSET_BASE}/david-avatar-96.jpg`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
<tr>
<td style="vertical-align:top;padding-right:12px;width:48px;">
<!--[if mso]>
<v:oval xmlns:v="urn:schemas-microsoft-com:vml" style="width:48px;height:48px;" stroked="false">
<v:fill type="frame" src="${avatarUrl}" />
</v:oval>
<![endif]-->
<!--[if !mso]><!-->
<img src="${avatarUrl}" alt="David Drake" width="48" height="48" style="display:block;width:48px;height:48px;border-radius:50%;" />
<!--<![endif]-->
</td>
<td style="vertical-align:top;font-size:14px;line-height:1.5;color:${MUTED};mso-line-height-rule:exactly;">
<p style="font-size:14px;margin:0;line-height:1.5;mso-line-height-rule:exactly;">${lines}</p>
</td>
</tr>
</table>`;
}

// Map: "sequence-dayLabel" → html
const templateMap: Record<string, string> = {
  // ═══ NEW LEAD ═══
  "new-lead-Instant": wrap(`
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
${signatureBlock(`See you on the floor,<br/><strong style="color:${DARK};">David Drake</strong><br/>Head Coach, Drake Fitness`)}
  `, "Welcome to Drake Fitness. Here's everything you need to know for your first class."),

  "new-lead-Day 1": wrap(`
${sectionHeading("There's Nothing to Prepare")}
${emailImage("studio-kettlebells.jpg", "Kettlebells lined up at Drake Fitness studio")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">Seriously — just show up.</p>
<p>No special shoes. No protein shake. No pre-workout routine you found on Instagram.</p>
<p>Wear whatever you'd wear for a walk. We have all the equipment. Every exercise in every class is modified to your level — whether you've been training for years or this is day one.</p>
<p><strong style="color:${DARK};">Experienced lifters:</strong> expect smart programming and coaching cues that refine your technique, not just count your reps.</p>
<p>Our brand promise is simple: <strong style="color:${DARK};">"Sign up and show up."</strong> We handle the rest.</p>
${ctaButton("Book Your First Class")}
${signatureBlock(`You've got this,<br/><strong style="color:${DARK};">David @ Drake Fitness</strong>`)}
  `, "No gear required. No experience needed. Just you."),

  "new-lead-Day 3": wrap(`
${sectionHeading("How's the Body Feeling?")}
${emailImage("david-coaching-form.jpg", "David Drake coaching a member on proper form")}
<p style="color:${DARK};font-size:18px;margin:0 0 16px;">If you're a little sore today — good. That means your body is responding.</p>
<p>Soreness after your first class is completely normal, whether you've trained before or not. It doesn't mean you overdid it. It means you challenged muscles in a new way — and that's exactly how you get stronger.</p>
<p>Here's your game plan for the next 48 hours:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
<tr><td style="padding:8px 0;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;"><strong style="color:${DARK};">&#x1F4A7; Hydrate</strong> — more water than usual. Your muscles need it to recover.</td></tr>
<tr><td style="padding:8px 0;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;"><strong style="color:${DARK};">&#x1F957; Eat whole foods</strong> — protein, vegetables, good carbs. Skip the junk today.</td></tr>
<tr><td style="padding:8px 0;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;"><strong style="color:${DARK};">&#x1F6B6; Walk 15 minutes</strong> — light movement flushes out the stiffness faster than rest.</td></tr>
<tr><td style="padding:8px 0;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;"><strong style="color:${DARK};">&#x1F634; Sleep</strong> — this is where your body actually rebuilds. Prioritize it tonight.</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:1px solid ${GOLD};border-radius:8px;overflow:hidden;">
<tr><td style="padding:16px 20px;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">&#x1F511; Coach's Tip</strong></p>
<p style="margin:0;font-size:14px;">Try this before bed tonight: <strong style="color:${DARK};">2 minutes of slow diaphragmatic breathing.</strong> Breathe in through your nose for 4 counts, expand your belly, exhale for 6. It's how we start every class at Drake Fitness — and it's one of the most powerful recovery tools there is.</p>
</td></tr>
</table>
<p><strong style="color:${DARK};">One more thing: class 2 is always easier than class 1.</strong> Your body adapts fast. By your next session, you'll know the flow, recognize the movements, and feel more confident. The hardest part is already behind you.</p>
${ctaButton("View Class Schedule")}
${signatureBlock(`Recover well,<br/><strong style="color:${DARK};">David Drake</strong><br/>Head Coach, Drake Fitness`)}
  `, "Here's exactly what to do before your next class."),

  "new-lead-Day 5": wrap(`
${sectionHeading("Why I Coach")}
${emailImage("david-coaching-form.jpg", "David Drake coaching a member on proper form")}
<p>Twenty-five years ago, I watched someone give up on their body because a gym made them feel like they didn't belong.</p>
<p>That stuck with me.</p>
<p>I've spent every year since building a different kind of space — one where <strong style="color:${DARK};">a 65-year-old grandmother trains next to a 30-year-old firefighter</strong>, and neither feels out of place.</p>
<p>My philosophy is simple: <strong style="color:${DARK};">strength that serves your life — whether that's playing with your grandkids or competing in your next event.</strong> Kettlebells, bodyweight, mobility work — tools that build bodies that last decades and perform when it matters.</p>
<p>I don't count reps to rush through them. I watch how you move, and I coach you to move better. That's it.</p>
${ctaButton("See Our Classes", "https://www.drake.fitness/classes")}
${signatureBlock(`— David Drake<br/>Head Coach`)}
  `, "I've spent 25 years coaching at every level. Here's why."),

  "new-lead-Day 10": wrap(`
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

  "new-lead-Day 18": wrap(`
<p>Hey —</p>
<p>Just wanted to check in.</p>
<p>Have you made it to a class yet? If so, how'd it feel? If not, no pressure — but I'd love to know what's holding you back.</p>
<p>Hit reply and let me know. I read every email.</p>
${emailImage("david-outside.jpg", "David Drake outside the studio")}
${signatureBlock(`— David`)}
<p style="font-size:13px;color:${MUTED};margin-top:16px;"><em>P.S. This isn't automated. I genuinely want to hear from you.</em></p>
  `, "Just checking in — I'd love to hear how things are going."),

  "new-lead-Day 24": wrap(`
${sectionHeading("Keep the Momentum Going")}
${emailImage("group-kettlebell-training.jpg", "Group kettlebell training class at Drake Fitness")}
<p>If you've been to a class (or a few), you already know: this place is different.</p>
<p>No mirrors. No judgment. Just good coaching, smart programming, and a community that actually shows up for each other.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Helvetica,Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">INTRO MEMBER OFFER</h3>
</td></tr>
<tr><td style="padding:20px;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">Get your first month of unlimited classes for just $110</strong></p>
<p style="margin:0 0 8px;font-size:14px;">That's over 50% off the normal $225/mo membership — available if you join within 7 days of your 3rd class.</p>
<p style="margin:0 0 8px;font-size:14px;">&#x2713; All group classes &bull; &#x2713; Open gym access &bull; &#x2713; Community events</p>
<p style="margin:0;font-size:14px;">&#x2713; Yoga discount &bull; &#x2713; Cancel anytime</p>
</td></tr>
</table>
${ctaButton("Become a Member", "https://www.drake.fitness/pricing")}
${signatureBlock(`Questions? Just reply to this email.<br/><strong style="color:${DARK};">— David Drake</strong>`)}
  `, "You've put in the work. Let's keep the momentum going."),

  "new-lead-Day 30": wrap(`
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
${signatureBlock(`— David &amp; the Drake Fitness crew`)}
  `, "Your 3-class pass expires soon. Here's what members get next."),

  // ═══ WIN-BACK (4-email sequence) ═══
  // UTM-tagged URLs for attribution
  // Schedule: utm_campaign=winback-2026, utm_content varies per email
  // Reactivation link: /welcome-back landing page with 3 free classes + 50% off
  "win-back-Day 0": wrap(`
${sectionHeading("We Saved You a Spot")}
${emailImage("studio-david-storefront.jpg", "David Drake at the Drake Fitness storefront")}
<p>Hi there —</p>
<p>It's been a while since we've seen you at Drake Fitness in Avondale, but we still remember how hard you worked on those kettlebell and strength sessions.</p>
<p>Because you've been part of our community before, we set aside something just for former members:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Helvetica,Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">FORMER MEMBER OFFER</h3>
</td></tr>
<tr><td style="padding:20px;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;">
<p style="margin:0 0 8px;"><strong style="color:${DARK};">&#x2705; 3 free classes</strong> to ease back in</p>
<p style="margin:0;"><strong style="color:${DARK};">&#x2705; 50% off your first month back or your first package</strong></p>
</td></tr>
</table>
<p>No pressure, no contracts — just a chance to see how good it feels to train again with coaching you already know and trust.</p>
${ctaButton("Claim My 3 Free Classes + 50% Off", "https://www.drake.fitness/welcome-back?utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=day0-saved-spot")}
<p>If you're not sure where to start, reply with your schedule and we'll recommend the best times.</p>
${signatureBlock(`See you soon,<br/><strong style="color:${DARK};">David &amp; the Drake Fitness team</strong>`)}
  `, "We saved you a spot — 3 free classes + 50% off your first month back."),

  "win-back-Day 4": wrap(`
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
${signatureBlock(`— David`)}
  `, "You don't have to start over from zero. Here's your low-stress on-ramp back."),

  "win-back-Day 7": wrap(`
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
${signatureBlock(`— David`)}
  `, "What other returning members are saying — and how to use your offer."),

  "win-back-Day 12": wrap(`
${sectionHeading("Last Call for Your Comeback Offer")}
${emailImage("studio-nick-david-together.jpg", "Nick and David together at Drake Fitness")}
<p>Hi there —</p>
<p>Quick reminder: your former-member comeback offer is about to expire:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:2px solid ${GOLD};border-radius:12px;overflow:hidden;">
<tr><td style="background:${GOLD};padding:12px 20px;">
<h3 style="font-family:'Oswald',Helvetica,Arial,sans-serif;color:${DARK};margin:0;font-size:18px;">&#x1F381; EXPIRES SOON</h3>
</td></tr>
<tr><td style="padding:20px;font-size:16px;line-height:1.6;color:${MUTED};mso-line-height-rule:exactly;">
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
${signatureBlock(`— David &amp; the Drake Fitness team`)}
  `, "Last call — your 3 free classes + 50% off comeback offer expires soon."),
};

/**
 * Get the rendered HTML for a specific email in a sequence.
 * @param sequence - "new-lead" or "win-back"
 * @param dayLabel - e.g. "Instant", "Day 1", "Day 5", etc.
 */
export function getEmailPreviewHtml(sequence: "new-lead" | "win-back", dayLabel: string): string | null {
  const key = `${sequence}-${dayLabel}`;
  return templateMap[key] ?? null;
}
