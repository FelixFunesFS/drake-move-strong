## Add 1st-Saturday Community Class invite to homepage

Single new section on `/`, no other changes. Winback catch-up deferred per your direction.

### What to build

**1. Extract shared date helper** → `src/lib/communityClassDate.ts`
- Move `getNextFirstSaturday()` + `formatDate()` out of `CommunityClass.tsx`.
- Update `CommunityClass.tsx` to import from the new file (no behavior change).
- Avoids drift between homepage section and landing page.

**2. New component** → `src/components/CommunityClassInvite.tsx`
- Eyebrow (teal): `FREE · FIRST SATURDAY OF EVERY MONTH · 10 AM`
- Headline (Oswald uppercase): `MEET THE COMMUNITY. TRY KETTLEBELLS. NO PRESSURE.`
- Subhead: "An open, all-levels strength + mobility class taught by a Drake Fitness instructor. Perfect for beginners, anyone returning to fitness, or locals curious about kettlebells."
- Dynamic next-date line: `Next class: Saturday, Jun 7 · 10:00 AM ET` (uses shared helper).
- Three qualifier chips: `Beginner Friendly` · `No Membership Needed` · `All Levels Coached`
- Primary CTA (gold): `Reserve Your Spot →` → React Router `<Link to="/community-class">`
- Secondary text link: `Learn what to expect` → also `/community-class`
- Visual: reuse `communityGroupClass` already imported on Home (no new asset).
- Two-column on `md+`, stacked on mobile (per Mobile Conversion Visibility standard — no carousel).

**3. Mount on Home** → `src/pages/Home.tsx`
- Insert `<CommunityClassInvite />` between `CommunityReasonsSection` (line 171) and `MEET THE TEAM` (line 173).
- Rationale: visitor has just been primed by community/reasons content; this is the natural soft-CTA before scrolling into team/coaching content. Doesn't compete with the hero's 3-Class Intro CTA, which remains the dominant ask above the fold.

### What I will NOT change
- Hero, nav, footer, pricing, winback function — all untouched.
- No new routes, no PunchPass URL hardcoded (route through `/community-class` so the existing `PUNCHPASS_URLS.communityClass` constant remains the single source of truth).

### Files touched
- NEW: `src/lib/communityClassDate.ts`
- NEW: `src/components/CommunityClassInvite.tsx`
- EDIT: `src/pages/CommunityClass.tsx` (swap inline helper for shared import)
- EDIT: `src/pages/Home.tsx` (one import + one component mount)

### Verification after build
- Load `/` at 1060px and at mobile width — confirm section reads cleanly, date line shows correct next 1st Saturday.
- Click `Reserve Your Spot` → lands on `/community-class`.
