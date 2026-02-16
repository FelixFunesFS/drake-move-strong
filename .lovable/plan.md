
# Home Page Streamlining + TodayClassesBanner Enhancement

## Overview
Reduce scroll depth and content overload on the Home page by removing lower-value sections, showing tomorrow's classes when today is done, and fixing the hero subtitle copy. This tightens the conversion funnel while preserving trust signals.

## Changes

### 1. Fix Hero Subtitle Copy (`src/pages/Home.tsx`)
Remove "in just one week" from the subtitle text.

**Before:** "...Start feeling the difference in just one week with small-group..."
**After:** "...Start feeling the difference with small-group..."

### 2. TodayClassesBanner: Show Tomorrow's Schedule (`src/components/schedule/TodayClassesBanner.tsx`)
When no classes remain today, instead of showing a static "No more classes today" message with a link, fetch and display tomorrow's first 3 classes in the same card layout used for today.

- Add a `fetchTomorrowClasses` fallback inside the existing `fetchTodayClasses` function
- When today returns 0 results, query for tomorrow's classes (no time filter)
- Change the header label from "Today's Classes" to "Tomorrow's Classes" when showing tomorrow
- Keep the "Full Schedule" CTA button
- If tomorrow also has 0 classes, fall back to the current "see the full schedule" link

### 3. Remove "Progress You Can Measure" and "Expert Coaching, Ego-Free" Cards (`src/components/CommunityReasonsSection.tsx`)
Remove reasons 4 and 5 (the last two cards in the grid) from the `reasons` array. This simplifies the section to 3 reason cards + the Reset Week CTA card, which is a tighter, more scannable layout.

- Remove `reasons[3]` ("Progress you can measure") and `reasons[4]` ("Expert coaching, ego-free community")
- Remove the JSX that renders Reason 4 (line 136) and Reason 5 (lines 139-141)
- Remove unused imports: `TrendingUp`, `Heart`
- Remove `plankRows` and `communityGroupPhoto` from the `images` prop interface (and the Home page prop pass)
- The grid becomes: 3 reason cards + 1 CTA card (spanning 2 cols on desktop) -- a clean 2-row layout

### 4. Remove "WHO WE ARE" Section from Home Page (`src/pages/Home.tsx`)
Remove the entire "WHO WE ARE" section (lines 197-228). This content already exists on the About page. The Home page retains MEET THE TEAM which provides coach introductions with a "Learn More" link to About.

Also remove the now-unused `outdoorTraining` image import.

### 5. Remove "OUR PROGRAMS" Section from Home Page (`src/pages/Home.tsx`)
Remove the entire "OUR PROGRAMS" section (lines 277-325). The Schedule page already has this content, and the Home page has enough conversion paths without it.

Also remove unused imports: `kbCollection`, `maceTraining`, `communityMoment`, `memberYoga`, `studioGroupSquats` (verify each is still used elsewhere before removing).

## Resulting Home Page Flow (After Changes)

1. Hero (conversion-focused Reset Week offer)
2. Brand Values Marquee
3. Today's/Tomorrow's Classes Banner
4. START HERE
5. THE METHOD
6. Trust Stats
7. Testimonial Quote (with Google Reviews badge)
8. Community + 3 Reasons (streamlined)
9. MEET THE TEAM
10. RESULTS
11. Longevity Block
12. Local Trust Block
13. Final CTA

This removes ~3 full-viewport sections of scroll depth while keeping every trust signal (stats, testimonials, results, team) and every conversion CTA.

## Technical Details

### File: `src/pages/Home.tsx`
- Line 59: Remove "in just one week " from subtitle string
- Lines 197-228: Delete the WHO WE ARE section entirely
- Lines 277-325: Delete the OUR PROGRAMS section entirely
- Remove unused image imports (`outdoorTraining`, and any images only used in deleted sections)
- Remove unused imports for deleted sections (verify `communityGroupPhotoLarge` is still used in CommunityReasonsSection props)

### File: `src/components/schedule/TodayClassesBanner.tsx`
- Add `isTomorrow` state boolean
- Modify `fetchTodayClasses`: if today returns 0 results, compute tomorrow's date and query without a time filter
- Set `isTomorrow = true` when showing tomorrow's classes
- Update the header label to show "Tomorrow's Classes" when `isTomorrow` is true
- Update the empty-state message for when both today and tomorrow have 0 classes

### File: `src/components/CommunityReasonsSection.tsx`
- Remove reasons 4 and 5 from the `reasons` array (lines 52-66)
- Remove JSX rendering Reason 4 (line 136) and Reason 5 (lines 139-141)
- Remove `TrendingUp` and `Heart` from lucide imports
- Remove `plankRows` and `communityGroupPhoto` from the `images` interface
- The CTA card changes from `md:col-span-2` to `md:col-span-3` to fill the second row as a full-width banner

### File: `src/pages/Home.tsx` (CommunityReasonsSection props)
- Remove `plankRows` and `communityGroupPhoto` from the images prop object passed to `CommunityReasonsSection`
- Remove the corresponding image imports if no longer used elsewhere

### Files Changed
- `src/pages/Home.tsx` -- subtitle fix, remove WHO WE ARE, remove OUR PROGRAMS, clean imports
- `src/components/schedule/TodayClassesBanner.tsx` -- tomorrow fallback logic
- `src/components/CommunityReasonsSection.tsx` -- remove 2 reason cards, adjust grid
