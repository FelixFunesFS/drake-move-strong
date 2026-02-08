

# Fix Missing Instructors on Schedule Classes

## The Problem

The PunchPass page doesn't consistently show instructor names as standalone text lines. The parser only captures instructors when they appear as a plain "David" or "Nick" line in the extracted content. The result:

| Class | Instructor Found? |
|-------|------------------|
| ZOOM KB STrong | Yes (David or Nick) |
| KB STrong Group Fitness (in-studio) | Never |
| Kettlebell Flow (both versions) | Never |
| Ruckathon Prep 2026 | Never |

29 out of 69 upcoming classes are missing their instructor.

## The Solution

Add a **two-pass instructor resolution** step in the sync edge function, right after parsing and before saving to the database.

### Pass 1: Copy from ZOOM twin

Every in-studio class has a ZOOM counterpart at the same date and time. If the ZOOM version has an instructor but the in-studio version doesn't, copy it over.

```text
Same date + same time:
  ZOOM KB STrong     → instructor: "David"
  KB STrong In-Studio → instructor: null  -->  "David"
```

### Pass 2: Default instructor mapping

For classes where neither version has an instructor (like Kettlebell Flow), apply a configurable default mapping based on class name patterns:

```text
"Kettlebell Flow"  → "Nick"
"Ruckathon Prep"   → "David"
```

This mapping lives in a simple object at the top of the edge function, making it easy to update when class assignments change.

## File Change

### `supabase/functions/sync-punchpass-schedule/index.ts`

1. Add a `DEFAULT_INSTRUCTORS` mapping object near the top of the file:
   ```
   Kettlebell Flow → Nick
   Ruckathon → David
   ```

2. After the `parseScheduleFromMarkdown()` call and before the database upsert, add an instructor resolution function that:
   - Groups parsed classes by date + start_time
   - For each group, if any class has an instructor and others don't, copies it to the others
   - For remaining nulls, checks class name against the default mapping

This ensures every class gets an instructor regardless of what PunchPass shows, and it runs automatically on every sync (4x daily).

## What This Fixes

- All 29 in-studio "KB STrong Group Fitness" classes will show the correct instructor
- All 6 "Kettlebell Flow" classes will show "Nick"
- "Ruckathon Prep" classes will show "David"
- Future syncs will automatically resolve instructors the same way
- No manual intervention needed when classes are added or changed
