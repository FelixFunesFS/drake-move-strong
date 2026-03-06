

# Plan: Fix Remaining Nick References

The previous implementation missed several files. Here are the 4 files that still reference Nick and need updating.

## 1. `src/pages/Home.tsx`
- **Line 16**: Change import from `nick-holistic-coaching.jpg` to `coach-misty-lister.png`
- **Line 180**: Update image src, alt text
- **Line 182**: Change "Coach Nick Poppa" to "Coach Misty Lister"
- **Line 183**: Change "Holistic Movement Specialist" to "Yoga & Mobility Coach"
- **Lines 184-186**: Replace Nick's description with Misty's condensed bio
- **Line 188**: Change "Learn More About Nick" to "Learn More About Misty"

## 2. `src/components/insights/AuthorBio.tsx`
- **Line 4**: Change type from `'david' | 'nick'` to `'david' | 'misty'`

## 3. `src/components/schedule/NativeWeeklySchedule.tsx`
- **Lines 17-18**: Change `case 'nick':` to `case 'misty':` and update styling to `bg-rose-100 text-rose-700`

## 4. `supabase/functions/sync-punchpass-schedule/index.ts`
- Update any instructor name mapping from Nick to Misty

These are the last remaining Nick references. No other structural or database changes needed.

