

# Misty Lister — Clarity & Positioning Audit

## The Key Insight

Misty runs her own **independent yoga practice** — she's not a Drake Fitness employee coaching KB classes. Drake members get a **discount** to her yoga classes. This changes how she should be framed across the site: she's a **community partner**, not a co-coach of the core strength program.

## Strategic Framework

**Current problem:** Misty appears as a co-equal coach alongside David on several pages, which implies she teaches KB Strong classes and blurs the Drake Fitness membership value prop. A visitor could think "I'm paying for David AND Misty" — then feel confused when Misty's yoga is separate/extra.

**Better framing:** Position Misty as a **valued yoga partner** whose classes complement Drake training. This:
- Keeps Misty visible (she's a real asset and community draw)
- Clarifies what Drake memberships include (David's coaching)
- Positions yoga as a **bonus perk** rather than a core deliverable
- Avoids overshadowing the KB Strong / strength training identity

## Proposed Changes — 6 files, ~10 edits

### A. `ResetWeekCharleston.tsx` (cold traffic landing)
1. Line 44: "Every class is guided by David or Misty" → **"Every class is guided by David and our coaching team — you're never left to figure it out on your own."**

### B. `About.tsx` (brand page — most important)
2. Line 147: Section heading "Meet David Drake and Coach Misty" → **"Meet David Drake & The Team"**
3. Lines 228-303: Reframe Misty's section. Keep her bio and photo, but add a clear label:
   - Change section eyebrow or add subtitle: **"Yoga Partner · Drake Members Save on Classes"**
   - Update her CTA button from "Try a Class This Week" (which implies Drake schedule) → **"Learn About Yoga Classes"** or link to her booking
   - Add a brief line: "Misty runs her own yoga practice — Drake Fitness members receive a discount on her classes."

### C. `Coaching.tsx` (1:1 coaching page)
4. Lines 303-315: Misty's coach card on the 1:1 coaching page is misleading — it implies she does 1:1 coaching at Drake. Either:
   - **Option A (recommended):** Remove her card from the 1:1 section entirely (this page is about David's personal training)
   - **Option B:** Re-label as "Yoga & Mobility Partner" with description clarifying separate booking

### D. `Home.tsx` (homepage coach cards)
5. Lines 200-211: Misty's coach card — update description to clarify: **"Misty runs independent yoga classes at Drake Fitness. Members receive a discount."** Change CTA from "Learn More About Misty" → **"Explore Yoga Classes"**

### E. `data/trustStats.ts`
6. Line 58: `collaboration` quote "David and Misty work together to design personalized programs..." → **"David and the coaching team design programs that combine mobility, corrective movement, and functional strength — meeting you exactly where you are."** (Remove Misty from the core program narrative)

### F. `supabase/functions/og-redirect/index.ts`
7. Line 32: "Meet Coach Drake and Coach Misty" → **"Meet Coach Drake & The Team"**

### Files NOT changed (correct as-is)
- **`NewYearChallenge.tsx`**: Event-specific, Misty was part of that event — historically accurate
- **`LowImpactFitnessCharleston.tsx`**: Uses Misty's photo contextually for mobility — acceptable
- **`admin/Blog.tsx`**: Internal tool, author attribution is fine
- **`schedule/NativeWeeklySchedule.tsx`** & **`WeekDayColumn.tsx`**: Color coding for schedule — functional, keeps yoga classes visually distinct

## Summary

The shift: Misty goes from **"co-coach"** to **"yoga partner"** across public-facing pages. She stays visible and valued, but visitors clearly understand that Drake memberships = David's coaching, and Misty's yoga = a complementary perk with a member discount.

