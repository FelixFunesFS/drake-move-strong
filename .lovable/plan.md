

## Full Site Audit: Inconsistencies, Brand Messaging & Marketing Plan

### Issues Found

#### 1. Coach References — "Nick" Still Appears (Brand Identity Violation)
Per brand standards, the team is **David Drake and Misty Lister**. Nick still appears in:
- **Coaching.tsx** (line 88): Hero title says "DAVID OR NICK"
- **Pricing.tsx** (line 24): FAQ says "from David or Nick"
- **FAQ.tsx** (line 37): "from David and our coaching team" (this one is fine)
- **NewYearChallenge.tsx** (lines 45, 99): "David or Nick" in two places
- **About.tsx** (line 22, 420): Photo of Nick/David together still in gallery

**Fix**: Replace "David or Nick" with "David and our coaching team" or "David and Misty" depending on context. Coaching page hero should reference David specifically for 1:1.

#### 2. "Reset Week" Terminology Still Present
The offer was rebranded to "3-Class Intro Experience" but legacy "Reset Week" language persists in:
- **ChatBot.tsx** (line 182): Quick action sends "Tell me about Reset Week"
- **ChatBot.tsx** (line 318): Button label "🎁 What's Reset Week?"
- **og-redirect** (line 28): Pricing OG description says "free Reset Week trial"
- **Pricing.tsx** (line 60): HTML comment says "MOVEMENT RESET WEEK"
- **CommunityReasonsSection.tsx** (line 72): HTML comment says "Reset Week CTA Card"
- **StrengthTrainingCharleston.tsx** (line 249): Section header "Reset Week Offer"

**Fix**: Update user-facing strings (ChatBot, og-redirect). HTML comments are low priority but should be cleaned.

#### 3. "VIP Unlimited" — Ghost Tier
"VIP Unlimited" is referenced in FAQ.tsx (line 83: "VIP Unlimited members get one monthly 1:1 session included") but this tier doesn't exist in pricing. Also in useVideoAccess.ts and member/Workouts.tsx for gating logic.

**Fix**: Remove "VIP Unlimited" mention from FAQ. Keep internal code references if the tier may return, but the public-facing FAQ must not reference a plan you can't buy.

#### 4. Upsell Copy Inconsistency
The upsell price ($110) and "50% off" are consistent, but the "of what" varies:
- **Home.tsx**: "$110 (50% off)" — vague
- **Welcome.tsx**: "$110 (50% off $225)" — references Unlimited
- **ResetWeekAlt.tsx**: "$110 (normally $225)" — references Unlimited
- **ResetWeekCharleston.tsx**: "$110 instead of $225" — references Unlimited

50% of $225 = $112.50, not $110. And 50% of $200 (Foundation) = $100. The math doesn't cleanly match either tier. Consider standardizing to "first month for just $110" without claiming a specific percentage.

#### 5. Schedule Page — "Foundation Flow" FAQ Mismatch
- Schedule FAQ (line 46): "Foundation Flow is our beginner-friendly class" — but the OUR PROGRAMS section lists "Foundation Flow™" alongside 5 other class types. These branded names don't match PunchPass class names (previous sync issue).
- SEO description (line 60) lists "Foundation Flow, Functional Strength, KB Strong" — do all of these currently run?

#### 6. Hardcoded PunchPass URLs
Several pages hardcode the intro URL instead of importing `INTRO_URL` from pricing.ts:
- **Schedule.tsx** (line 95, 205)
- **Pricing.tsx** (line 111)

Minor but defeats the single-source-of-truth pattern.

#### 7. OG Redirect Descriptions Outdated
- `/pricing` description says "free Reset Week trial" — should say "3-Class Intro"
- `/about` description says "Coach Drake & The Team" — should say "David Drake & Misty Lister"

---

### Marketing Plan & Page Distribution Strategy

Here is how to think about the site pages for publishing and sharing:

```text
FUNNEL STAGE          PAGE                          SHARE TO
─────────────────────────────────────────────────────────────
COLD TRAFFIC
  Paid Ads (FB/IG)    /try-free-charleston          Facebook Ads, Instagram Ads
  Organic SEO         /strength-training-charleston  Google Search (primary money page)
  Organic SEO         /west-ashley-fitness           Google Search (neighborhood)
  Organic SEO         /low-impact-fitness-charleston Google Search (pain/injury intent)

WARM TRAFFIC
  Google Business     /try-free-charleston          Google Maps profile link
  Social Posts        /intro                        Instagram bio link, FB posts
  Blog/Content        /insights                     Social shares, email newsletter

MID-FUNNEL
  Schedule            /schedule                      Shared post-interest
  Pricing             /pricing                       Shared when asked "how much?"
  About               /about                         Credibility / "who are you?"
  Coaching            /coaching                      1:1 upsell, DMs

POST-CONVERSION
  Welcome             /welcome                       Sent automatically after purchase
  Member Portal       /member/*                      Internal only

AUTHORITY / TRUST
  FAQ                 /faq                           Internal linking, Google FAQ schema
  Success Stories     /success-stories               Social proof, ads
  Contact             /contact                       Universal footer/nav
```

**Primary sharing URLs:**
- **Instagram Bio / Linktree**: `/try-free-charleston` or `/intro`
- **Facebook Ads**: `/try-free-charleston` (local SEO page with structured data)
- **Google Business Profile**: `/try-free-charleston`
- **Email signature**: `drake.fitness`
- **Social posts about classes**: `/schedule`
- **Word-of-mouth / referral**: `/intro` (simplest URL)

### Recommended Fix Priority

1. **Nick → David/Team references** (brand-breaking, public-facing)
2. **"Reset Week" → "3-Class Intro" in ChatBot + og-redirect** (user-facing)
3. **VIP Unlimited FAQ removal** (sells a non-existent product)
4. **Upsell copy standardization** (remove "50% off" claim, just say "$110")
5. **Hardcoded PunchPass URLs → imports** (maintenance hygiene)
6. **Schedule page class names audit** (do Foundation Flow & Functional Strength still run, or is everything KB Strong now?)

### Question Before Implementation
I need to confirm: **Which class types currently run on the schedule?** The OUR PROGRAMS section lists 6 types (Foundation Flow, Functional Strength, KB Strong, Mobility Reset, Weekend Warrior, Functional Flow Online). If some of these no longer exist in PunchPass, they should be removed or marked as "coming soon" to avoid confusion.

