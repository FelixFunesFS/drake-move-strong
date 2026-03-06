

# Plan: Replace Coach Nick with Coach Misty Lister

Nick is being removed from the entire site and replaced with Misty Lister. Blog posts previously authored by Nick will be reassigned to David Drake. This is a significant cross-cutting change touching ~10 files.

## Scope of Changes

### 1. Add Misty's Image to Project
- Copy the uploaded image to `src/assets/coach-misty-lister.jpg`

### 2. Core Data Files

**`src/data/insights.ts`**
- Replace `nick` author key with `misty` in the `authorInfo` object
- Update name to "Coach Misty", title to "Yoga & Mobility Coach"
- Update bio with Misty's provided bio (condensed to match existing format)
- Replace image import from `nick-holistic-coaching.jpg` to `coach-misty-lister.jpg`
- Update the `author` type from `'david' | 'nick'` to `'david' | 'misty'`

**`src/data/trustStats.ts`**
- Rename `nickCredentials` to `mistyCredentials`
- Update credentials to reflect Misty's background: 250/500-hour yoga training, SUP coaching, strength/mobility/breath focus

**`src/data/trustStats.ts` — `BRAND_QUOTES.collaboration`**
- Change "David and Nick" to "David and Misty"

### 3. Page Updates

**`src/pages/About.tsx`** (Nick's bio section, lines ~228-300)
- Replace `nickImage` import with Misty's image
- Update heading from "NICK POPPA" to "MISTY LISTER"
- Update title from "Holistic Health & Movement Specialist" to "Yoga & Mobility Coach"
- Update subtitle from "Posture • Stability • Mobility • Strength" to "Strength • Mobility • Breath • Recovery"
- Rewrite bio paragraphs with Misty's provided content
- Update image alt text and overlay text
- Remove `studioNickDavidTogether` import if no longer used elsewhere

**`src/pages/Coaching.tsx`** (Coach cards, lines ~303-315)
- Replace `nickCoach` import with Misty's image
- Update card: name to "Coach Misty Lister", title to "Yoga & Mobility Coach"
- Update description and alt text

**`src/pages/NewYearChallenge.tsx`** (Coach card, lines ~393-412)
- Replace `nickImage` import with Misty's image
- Update name from "Nick Poppa" to "Misty Lister", title to "Yoga & Mobility Coach"
- Update description text

**`src/pages/services/LowImpactFitnessCharleston.tsx`** (line ~151-155)
- Replace `nickHolisticCoaching` import with Misty's image
- Update alt text from "Coach Nick" to "Coach Misty"

**`src/pages/Schedule.tsx`** (FAQ, line 47)
- Change "David or Nick" to "David or Misty"

**`src/pages/FAQ.tsx`** (FAQ, line 37)
- Change "David or Nick" to "David or Misty"

**`src/pages/services/ResetWeekCharleston.tsx`** (line 51)
- Change "David or Nick" to "David or Misty"

### 4. Schedule Component

**`src/components/schedule/WeekDayColumn.tsx`** (line 9)
- Add a `'misty'` case with a new color (e.g., `bg-rose-100 text-rose-700`)
- Keep the `'nick'` case temporarily as a fallback (existing schedule data may reference Nick until updated)

### 5. Admin Blog CMS

**`src/pages/admin/Blog.tsx`** (line 288)
- Replace `<SelectItem value="nick">Coach Nick</SelectItem>` with `<SelectItem value="misty">Coach Misty</SelectItem>`

### 6. Database Migration

- Update any existing `blog_posts` rows where `author = 'nick'` to `author = 'david'` (reassign to David)
- This ensures no blog posts reference a nonexistent author

### 7. Admin Image Selector (cosmetic)

**`src/components/admin/ImageSelector.tsx`**
- Add Misty's image to the available image list
- Nick's images can remain (they're still valid studio photos)

### 8. Existing Blog Content Components

**`src/components/insights/BlogContentComponents.tsx`** — No Nick-specific references found in the content components, so no changes needed there.

## What Will NOT Break
- The `InsightPost` type uses `author: 'david' | 'nick'` — updating this to `'david' | 'misty'` and migrating DB rows ensures type safety
- The `AuthorBio` component dynamically reads from `authorInfo`, so it automatically picks up the new Misty data
- Share buttons, SEO, and OG tags are unaffected (they reference post data, not author keys directly)
- Nick's asset files stay in the repo (they may be used in gallery/atmosphere strips as general studio photos)

## Summary
- **1 new asset** copied
- **~10 files** updated (data, pages, components)
- **1 DB migration** (reassign nick's blog posts to david)
- No structural or routing changes needed

