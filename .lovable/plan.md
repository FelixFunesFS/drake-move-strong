

# Ruckathon 2026: Promo Banner + Landing Page

## Part 1: Promo Banner (Database Only -- No Code Changes)

The site already has a working `AnnouncementBanner` component that renders above the nav bar on every page. It pulls the highest-priority active banner from the `promotions` table. We just need two database operations:

### 1. Deactivate the expired Reset Week banner
The current banner ("Reset Week: 7 Days Unlimited -- Just $50") expired Feb 1 but is still marked active. Set `is_active = false`.

### 2. Insert a new Ruckathon promo banner
- **Title**: "Get Ruck-Ready for Warrior Surf 2026"
- **Description**: "Free Ruckathon Prep Class for registered participants"
- **CTA Text**: "Learn More"
- **CTA Link**: `/ruckathon` (internal link to the new landing page)
- **Background**: `#0B4A52` (Drake dark teal)
- **Text**: `#FFFFFF`
- **Accent**: `#F2B544` (Drake gold)
- **End Date**: `2026-02-28T23:59:59-05:00` (Feb 28, 2026 end of day EST)
- **Priority**: 20 (higher than old banner's 10)
- **Dismissible**: Yes
- **Target Pages**: All

The banner is already fully responsive -- text wraps on mobile, description hides on small screens, CTA button scales, and the dismiss button is absolutely positioned.

---

## Part 2: Ruckathon Landing Page

### New File: `src/pages/Ruckathon.tsx`
Standalone landing page at `/ruckathon` with:

1. **Minimal header** -- Drake Fitness logo + "Reserve Your Spot" CTA
2. **Hero** -- "Get Ruck-Ready for Warrior Surf 2026" with outdoor training background, "Free for Registered Participants" badge
3. **Partnership intro** -- Drake Fitness as donor/training partner, external link to the RallyUp campaign (`https://warriorsurf.rallyup.com/ruckathon2026/Campaign/Details`)
4. **What's Included** -- 4-card grid: mobility prep, movement coaching, coached ruck, gear tips
5. **What to Bring** -- Checklist: rucksack, clothing, footwear
6. **Live class schedule** -- Pulls the two upcoming "Ruckathon Prep 2026" classes from `punchpass_schedule` (Feb 14 and Feb 21 at 10 AM with David), each with a "Reserve Spot" link to their PunchPass URL
7. **"Limited to 15 Participants"** urgency callout
8. **Final CTA** -- Links to both the RallyUp campaign and PunchPass booking

### `src/App.tsx` (3 small edits)
- Add lazy import: `const Ruckathon = lazy(() => import("./pages/Ruckathon"));`
- Add route: `<Route path="/ruckathon" element={<Ruckathon />} />`
- Add to standalone routes: `const STANDALONE_ROUTES = ['/new-year', '/reset', '/ruckathon', '/auth'];`

---

## Timeline
- **Banner runs**: Feb 12 through Feb 28, 2026
- **Ruckathon Prep classes**: Feb 14 and Feb 21, 2026 at 10:00 AM

## Files Changed
- `promotions` table -- 1 update (deactivate old) + 1 insert (new Ruckathon banner)
- `src/pages/Ruckathon.tsx` -- new standalone landing page
- `src/App.tsx` -- add route + standalone config (3 small edits)
