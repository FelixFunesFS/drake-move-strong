

## Plan: Community Class Landing Page (`/community-class`)

A standalone, conversion-focused landing page for the free 1st-Saturday community class. Follows the same standalone pattern as `/ruckathon` and `/intro` — no main nav, no footer clutter, no distractions.

### Architecture

**New file:** `src/pages/CommunityClass.tsx` — single-page component with all sections inline (matches Ruckathon/ResetWeekAlt pattern).

**Modified file:** `src/App.tsx`
- Lazy import `CommunityClass`
- Add route: `/community-class`
- Add `/community-class` to `STANDALONE_ROUTES` array (hides nav, footer, chatbot, TodayClassesBanner, MobileContactBar)

### Page Sections (top to bottom)

1. **Minimal header** — Drake Fitness logo (left) + amber "RESERVE YOUR SPOT" button (right, links to PunchPass). No nav links.

2. **Hero** — Full-width background image (reuse `hero-group-turkish-getup.jpg` or `community-turkish-getup-class.jpg`), dark overlay, left-aligned text:
   - Location badge: 📍 AVONDALE · WEST ASHLEY · CHARLESTON
   - H1: "STRONG STARTS" / "HERE." (gold)
   - Subtitle with the 3-line copy
   - Two CTAs: amber solid → PunchPass, white outline → smooth-scroll to "What to Expect"

3. **Event Detail Strip** — Dark bg, 4-column grid (stacks 2x2 mobile): When, Time, Where (linked to Google Maps), Cost

4. **What You'll Do** — White bg, centered heading, body copy, then two feature cards (Kettlebell Strength + Original Strength Mobility) with icons, followed by a "Who this is for" 4-item grid with check icons

5. **Social Proof Strip** — Dark bg, gold stars, 2 rotating quotes (Cara S. and Melissa F.)

6. **Meet Your Coach** — White bg, 2-column (photo left using `david-double-kb-storefront-new.jpg`, text right), credentials line at bottom

7. **How It Works** — Light bg, 3 numbered steps with icons (same pattern as Welcome page)

8. **Community Block** — Amber/gold bg, centered bold heading + subtext

9. **Final CTA** — Dark bg, "Your Spot Is Free. Reserve It Now." with amber CTA button + contact info below

10. **Minimal Footer** — © line + social icons (Instagram, Facebook, YouTube)

### Registration CTA

All "Reserve" buttons will link to a PunchPass event URL. I'll create a constant `COMMUNITY_CLASS_URL` in `src/data/pricing.ts` with a placeholder value — you'll swap in the real PunchPass URL when ready. UTM tracking via `buildPunchPassUrl()` + `trackPunchPassClick()` same as all other PunchPass links.

### SEO

- URL: `/community-class`
- Title: "Free Kettlebell & Mobility Class in Charleston — Drake Fitness Community Saturday"
- Description: "Join Drake Fitness every 1st Saturday at 10 AM in Avondale for a free community class. Kettlebell strength + Original Strength mobility. Coached by David Drake. All levels welcome."
- `noindex` is NOT set — this is a public SEO page

### Confirmation Email & Post-Event Sequence

These are **not** part of this build. The user's brief mentions them as considerations, but they live in PunchPass (confirmation) and the existing email nurture system (post-event follow-up). Can be added as a separate task.

### Technical Notes

- Reuses existing assets — no new images needed
- Uses `framer-motion` for scroll animations (AnimatedSection)
- Smooth scroll via `document.getElementById().scrollIntoView()` for the "See What to Expect ↓" button
- Mobile-first responsive: all grids collapse to single column, hero text stacks naturally
- Google Maps link on the address uses the verified Place ID

### Files Changed

| File | Change |
|------|--------|
| `src/pages/CommunityClass.tsx` | New — full landing page |
| `src/App.tsx` | Add lazy import, route, standalone route entry |
| `src/data/pricing.ts` | Add `COMMUNITY_CLASS_URL` constant (placeholder) |

