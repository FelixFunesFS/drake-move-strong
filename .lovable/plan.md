

## Rewrite Nurture Email Copy for Dual-Lane Inclusivity

### Problem
All 12 emails currently target only deconditioned beginners. Experienced athletes, active movers, and fitness enthusiasts are implicitly excluded or dismissed. This conflicts with the brand's "Dual-Lane Qualifier" strategy: welcoming both people starting over AND people leveling up.

### Copy Changes (Both Files)

Changes apply to **both** `src/lib/emailTemplates.ts` (client preview) and `supabase/functions/send-nurture-previews/index.ts` (sending), keeping them in sync.

#### 1. Welcome (Instant)
- **Before**: "not athletes, not competitors, just people who want to feel strong"
- **After**: "people at every level — from first-timers to seasoned athletes — who want to move well and get stronger"
- Add bullet: "Already experienced? We'll challenge you. Our coaching sharpens movement quality at every level."

#### 2. Day 1 (Friction Removal)
- Keep "whether you've been training for years or this is day one" (already good)
- Add: "Experienced lifters: expect smart programming and coaching cues that refine your technique, not just count your reps."

#### 3. Day 5 (Coach Authority)
- **Before**: "strength for life, not competition"
- **After**: "strength that serves your life — whether that's playing with your grandkids or competing in your next event"
- **Before**: "tools that build bodies that last decades, not just look good for a season"
- **After**: "tools that build bodies that last decades and perform when it matters"
- Subject line: "Meet David — 25 years of coaching at every level"

#### 4. Day 10 (Social Proof) — Add Second Story
- Keep Sarah's beginner story
- Add a second testimonial from an experienced athlete, e.g.: "I've trained at box gyms and CrossFit affiliates for 10 years. Drake Fitness is the first place where coaching actually made me better, not just more tired." — Jason T.

#### 5. Day 18 (Check-in) — No changes needed
- Already neutral and inclusive

#### 6. Day 24 (Conversion) — No changes needed
- Already focuses on community and coaching quality

#### 7. Day 30 (Pass Expiry) — No changes needed
- Already neutral

#### 8-12. Win-Back Sequence
- **Day 12 (Mike's story)**: Reframe — instead of only showing regression, add: "Within two weeks, he was back to his working weights. Within a month, he hit a PR he'd been chasing before the break."
- **Day 5 (What's New)**: Add bullet about programming depth: "Advanced programming tracks — heavier loads, complex movements, periodized progression"

#### Footer Tagline (All Emails)
- **Before**: "Strength for life, not competition."
- **After**: "Strength for every stage of life."

### Files Changed

| File | Change |
|---|---|
| `src/lib/emailTemplates.ts` | Update copy in 7 of 12 templates + footer tagline |
| `supabase/functions/send-nurture-previews/index.ts` | Mirror identical copy changes |

### No structural or layout changes — only copy revisions to be inclusive of all experience levels while maintaining the warm, approachable tone.

