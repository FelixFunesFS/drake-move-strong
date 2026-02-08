

# Fix Instructor Resolution in PunchPass Sync

## The Problem

The sync runs every 6 hours and is working correctly. However, **instructor names are missing for most in-person classes**. Here's why:

1. PunchPass doesn't always include instructor names in the page text for in-person classes
2. The `resolveInstructors()` function tries to copy the instructor from a ZOOM twin (same date + time) to its in-person twin -- but if neither has an instructor in that sync batch, both stay null
3. Each sync upserts ALL classes, so if a later sync parses classes without instructors, it **overwrites** previously-resolved instructor data with null

## The Fix

### 1. Preserve existing instructors during upsert (`sync-punchpass-schedule/index.ts`)

Before upserting, query the database for existing instructor values. If the newly parsed class has `instructor: null` but the existing DB row has an instructor, keep the existing value.

### 2. Expand the `DEFAULT_INSTRUCTORS` mapping

Currently only "kettlebell flow" maps to Nick and "ruckathon" to David. Add "kb strong" to the defaults so in-person KB Strong classes get an instructor when no ZOOM twin provides one.

However, KB Strong is taught by both David and Nick depending on the time slot, so a simple default won't work. Instead, we should expand the resolution logic.

### 3. Improved resolution: check DB for ZOOM twins

After Pass 1 (in-batch twin matching) and Pass 2 (default mapping), add a Pass 3: for any class still without an instructor, query the DB for a ZOOM twin at the same date+time that already has an instructor from a previous sync.

## File Changes

### `supabase/functions/sync-punchpass-schedule/index.ts`

**Change 1 -- Add DB-aware instructor resolution (new Pass 3)**

After `resolveInstructors(classes)`, add logic to:
- Query existing `punchpass_schedule` rows for the date range being synced
- For any parsed class still missing an instructor, check if the DB has a twin (same date + time, different `is_online`) with an instructor populated
- Copy that instructor to the parsed class

```text
// Pseudocode
const existingClasses = await supabaseAdmin
  .from('punchpass_schedule')
  .select('class_date, start_time, instructor, is_online')
  .in('class_date', uniqueDates)
  .not('instructor', 'is', null);

for (const c of classes) {
  if (!c.instructor) {
    const twin = existingClasses.find(
      e => e.class_date === c.class_date && e.start_time === c.start_time && e.instructor
    );
    if (twin) c.instructor = twin.instructor;
  }
}
```

**Change 2 -- Preserve existing instructors on upsert**

Before the upsert, for any class that still has `instructor: null`, check the existing DB row (same conflict key) and keep the existing instructor value if one exists.

This ensures syncs never *erase* previously resolved instructor data.

## Expected Result

After this fix:
- ZOOM classes continue to get instructors from PunchPass parsing
- In-person twins automatically inherit the instructor from their ZOOM counterpart (via DB lookup)
- Once an instructor is set, future syncs won't erase it
- The refresh button on the schedule page will show instructor badges for all classes

No changes needed to the UI -- the refresh button and instructor badge display are already implemented.
