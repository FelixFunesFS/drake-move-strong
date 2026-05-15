## Goals

1. Kill the "no commitment / no cost" language — it undersells and undercuts the membership upsell.
2. Replace it with copy that frames the 3 free classes as a **try-before-you-join** experience leading into Foundation / Longevity Unlimited.
3. Add the **Wednesday 6:45 AM** KB Strong class everywhere the schedule is listed.
4. Update the Community Class PunchPass URL to `https://drakefitness.punchpass.com/classes/19998310`.

---

## Part 1 — New copy direction

Recommended replacement language (pick per-context, not one phrase everywhere):

- **Short headline / chip variants:**
  - `Try us free · Find your fit`
  - `3 classes. Real coaching. Then decide.`
  - `Start free. Stay strong.`

- **Subheads (longer):**
  - `3 free classes over 30 days — experience real coaching, then choose the membership that fits.`
  - `Try 3 classes free, then unlock your first month for $110.`
  - `Coach-led classes. Real results. Members save up to 50% on month one.`

- **Microcopy under CTAs (replaces "No commitment, no cost"):**
  - `Members save up to 50% on month one`
  - `3 classes free · Then $110 first month unlimited`
  - `No card required to start · Upgrade after class 3`

This keeps the friction-free entry point ("no card required to start") while clearly signaling that the path forward is a membership — eliminating the "we don't expect you to buy" tone.

---

## Part 2 — Files to update

### Copy replacements

| File | Current | New |
|---|---|---|
| `src/pages/Home.tsx` (Hero subtitle) | "...in Avondale. No commitment, no cost." | "...in Avondale. Then unlock your first month for $110." |
| `src/pages/Home.tsx` (offer card) | "No commitment required · Expert, joint-friendly coaching" | "Members save up to 50% on month one · Expert, joint-friendly coaching" |
| `src/pages/About.tsx` CTASection | "...with no commitment." | "...then choose the membership that fits." |
| `src/pages/SuccessStories.tsx` | same | same |
| `src/pages/Schedule.tsx` | same | same |
| `src/pages/FAQ.tsx` | "...no commitment, no cost. See if Drake Fitness is right for you." | "3 free classes over 30 days — then unlock your first month for $110." |
| `src/pages/Contact.tsx` SEO description | "...3 free classes, no commitment." | "...3 free classes, then $110 first month." |
| `src/pages/CommunityClass.tsx` | "No experience needed. No cost. No commitment." | "No experience needed. All levels welcome. Free monthly community class." (the free Saturday is genuinely free — keep "free" but drop "no commitment") |
| `src/pages/NewYearChallenge.tsx` | "Limited spots available • No commitment required" | "Limited spots available • Members save 50% on month one" |
| `src/pages/ResetWeekAlt.tsx` | "...no rush, no commitment." | "...at your own pace, with a clear next step." |
| `src/pages/services/LowImpactFitnessCharleston.tsx` | "...joint-friendly training with no commitment." | "...joint-friendly training. Members save 50% on month one." |
| `src/components/CommunityReasonsSection.tsx` | "3 free classes over 30 days. No commitment. No experience needed..." | "3 free classes over 30 days. No experience needed. Members save 50% on month one." |
| `src/pages/Pricing.tsx` checklist row | "No commitment required" | "First month 50% off after your 3rd class" |

### Schedule update — add Wednesday 6:45 AM

Update the canonical schedule string from `Mon/Wed/Fri 8am & 11am, Thu 6pm` to `Mon/Wed/Fri 8am & 11am, Wed 6:45am, Thu 6pm` in:

- `src/data/pricing.ts` (`introExperience.schedule`)
- `src/pages/Home.tsx` (How It Works step 2)
- `src/pages/Pricing.tsx`
- `src/pages/FAQ.tsx`
- `src/pages/Welcome.tsx` (if listed)
- `src/pages/ResetWeekAlt.tsx` (2 locations)
- `src/pages/services/ResetWeekCharleston.tsx` (3 locations)
- `src/pages/services/WestAshleyFitness.tsx`
- `src/components/admin/social/types.ts` `detailLine` (optional — admin-only social template)

Note: The actual class booking schedule is sourced from PunchPass via the sync system, so this is **copy only**. The 6:45 AM class will appear on the live `/schedule` page automatically once it exists in PunchPass.

### PunchPass URL update

- `src/data/pricing.ts` → `PUNCHPASS_URLS.communityClass`: `19802794` → `19998310`

---

## Out of scope

- Win-back catch-up edge function (deferred per earlier conversation).
- Visual / layout changes — copy only.
- Adding a 4th hero CTA or new components.

## Validation

After edits: grep for `no commitment`, `No commitment`, `no cost`, `No cost` to confirm zero remaining matches in `src/`. Verify `19802794` is fully replaced.
