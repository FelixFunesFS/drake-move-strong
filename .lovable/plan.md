
# Clean Up Duplicate Schedule Entries and Fix Parser

## Problem Identified

Found **6 incorrect duplicate entries** - ZOOM classes stored with `is_online: false` and no instructor:

| Date | Time | Class Name | Issue |
|------|------|------------|-------|
| Jan 27 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |
| Jan 29 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |
| Feb 3 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |
| Feb 5 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |
| Feb 10 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |
| Feb 12 | 6:45 AM | ZOOM Kettlebell Flow | `is_online: false`, no instructor |

These have correct counterparts (same URL) with `is_online: true` and proper instructor names.

## Root Cause

The parser has two paths to detect ZOOM classes:
1. GMT suffix in time string (`8:00 amGMT-05:00`)
2. "ZOOM" in class name

When a ZOOM class appears without the GMT suffix (edge case), the parser sets the class name but forgets to also set `is_online: true`.

## Solution

### Step 1: Delete Incorrect Duplicates

Delete the 6 entries where:
- Class name starts with "ZOOM"
- `is_online` is `false` (should be `true`)

### Step 2: Fix Parser Logic

In `supabase/functions/sync-punchpass-schedule/index.ts`, ensure that when a class name containing "ZOOM" is detected, `is_online` is set to `true` immediately (currently this check happens but may be overwritten or not persistent).

The fix: Move the `is_online` check AFTER the class name is captured, ensuring it's always applied.

### Step 3: Re-sync Schedule

Trigger a fresh sync to verify no duplicates are created.

---

## Technical Details

### Database Cleanup SQL

```sql
DELETE FROM punchpass_schedule 
WHERE class_name LIKE 'ZOOM%' 
  AND is_online = false;
```

This removes entries where the class name indicates ZOOM but was incorrectly flagged as in-person.

### Parser Fix

Current flow has a race condition:
```text
1. Detect time with GMT suffix → set isOnline = true
2. Capture class name
3. Check if class name contains "ZOOM" → set isOnline = true, location = "Online (Zoom)"
```

The issue: Step 1 might not trigger for all ZOOM classes (not all have GMT suffix), and step 3's changes may not persist properly to the final object.

Fix: Ensure the check in step 3 is applied to the final class object before pushing to the array:
```typescript
// Before adding to classes array
if (className.toLowerCase().includes('zoom')) {
  isOnline = true;
  if (!location) location = 'Online (Zoom)';
}
```

### Expected Outcome

After cleanup and parser fix:
- 6 duplicate entries removed
- All ZOOM classes correctly have `is_online: true`
- Each time slot has at most 2 entries: 1 in-person + 1 ZOOM (when both are offered)
- Fresh sync produces clean data
