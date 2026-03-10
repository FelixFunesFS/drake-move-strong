

# Fix Cropped Cards + Rename "Reset Week" Routes & Copy

## Two Issues

### 1. Cropped Overlay Cards on SEO Pages

**Root cause**: On `StrengthTrainingCharleston` and `ResetWeekCharleston`, the stat cards (85% badge, "Your Foundation" card) use `lg:absolute lg:-bottom-8` to float outside their parent image container. The parent section has `overflow-x-clip` which helps, but the image wrapper itself has `overflow-hidden` via `rounded-2xl overflow-hidden`, clipping the card vertically.

**Fix**: The image container's `overflow-hidden` is needed for `rounded-2xl` corners. The overlay card sits *outside* the image div but inside a `relative` wrapper — this is already correct. The actual clipping comes from the section needing more bottom padding. Both pages already have `lg:pb-28` / `lg:pb-32` which should be sufficient.

`WestAshleyFitness` and `LowImpactFitnessCharleston` don't have floating overlay cards — they use inline content only, so no cropping issue there.

**Action**: Verify the `relative` wrapper on the image column in both pages properly contains the absolute card, and ensure no ancestor is clipping. Add `overflow-visible` to the `relative` wrapper div if needed.

### 2. "Reset Week" Naming — Marketing & Route Decision

**Marketing answer**: Yes, "Reset Week" should be fully removed from customer-facing copy. The offer is now "3-Class Intro Experience" (free, 30 days). "Reset Week" is confusing because:
- It implies a 1-week timeframe — the new offer is 30 days
- It implies a cost — the new offer is free
- It's a legacy brand name with no SEO equity worth preserving

**Route decision**: The URL `/reset-week-charleston` has been indexed by Google and may have backlinks. The safest approach:
- Create new canonical routes: `/intro` and `/try-free-charleston`
- Keep `/reset-week-charleston` and `/reset` as **permanent redirects** (301) to the new paths
- This preserves SEO juice while cleaning up the URL structure

## Files to Change (9 files)

### Cropping Fix (2 files)
1. **`src/pages/services/StrengthTrainingCharleston.tsx`** — Add `overflow-visible` to the `relative` wrapper div around the image + floating card
2. **`src/pages/services/ResetWeekCharleston.tsx`** — Same fix

### Route Rename (3 files)
3. **`src/App.tsx`**
   - New route: `/intro` → `ResetWeekAlt` component
   - New route: `/try-free-charleston` → `ResetWeekCharleston` component
   - Change `/reset` and `/reset-week` to redirect → `/intro`
   - Change `/reset-week-charleston` to redirect → `/try-free-charleston`

4. **`supabase/functions/og-redirect/index.ts`** — Add `/intro` and `/try-free-charleston` entries, keep old paths for redirect fallback

5. **`src/pages/services/ResetWeekCharleston.tsx`** — Update canonical URL to `/try-free-charleston`

### Copy Cleanup — Remove All "Reset Week" Text (6 files)
6. **`src/pages/About.tsx`** (line 72) — Change "Reset Week" link text to "3-Class Intro" and update href to `/try-free-charleston`
7. **`src/pages/InsightPost.tsx`** (lines 228-234) — Replace "Reset Week" copy with "3-Class Intro Experience" copy, update link to `/try-free-charleston`
8. **`src/components/Footer.tsx`** (line 46) — Change "Reset Week Charleston" to "Try Free Charleston" and update href
9. **`src/components/chat/ChatMessage.tsx`** — Update URL mappings from old paths to new
10. **`src/pages/admin/OGImages.tsx`** (line 34) — Update path and label

### Summary of New Route Structure

```text
/intro                    → Main intro landing page (was /reset)
/try-free-charleston      → SEO landing page (was /reset-week-charleston)
/reset                    → 301 redirect → /intro
/reset-week               → 301 redirect → /intro
/reset-week-charleston    → 301 redirect → /try-free-charleston
```

