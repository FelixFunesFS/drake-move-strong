
# Fix PunchPass Schedule Parser for Missing ZOOM Classes and Instructors

## Overview

This update fixes the schedule sync to properly capture:
1. All ZOOM classes (currently being missed due to timezone suffix in time format)
2. Instructor names (David, Nick) for all classes
3. Both in-person AND ZOOM versions of the same class as separate entries

## What's Happening Now

The current parser has three issues:

| Issue | Current Behavior | Expected Behavior |
|-------|-----------------|-------------------|
| ZOOM classes | Skipped (time format `8:00 amGMT-05:00` not recognized) | Captured with `is_online: true` |
| Instructors | All showing `null` | Should show "David" or "Nick" |
| Dual offerings | Only in-person captured | Both in-person and ZOOM captured separately |

## Solution

### Changes to Edge Function

**File:** `supabase/functions/sync-punchpass-schedule/index.ts`

**1. Update Time Matching to Capture ZOOM Classes**

```text
Current regex:  /^(\d{1,2}:\d{2}\s*(?:am|pm))$/i
New regex:      /^(\d{1,2}:\d{2}\s*(?:am|pm))(GMT[+-]\d{2}:\d{2})?$/i
```

When the timezone suffix (GMT-05:00) is present, automatically flag the class as ZOOM/online.

**2. Expand Lookahead Window for Instructor Detection**

Increase scan from 8 to 12 lines ahead to ensure instructor names are captured even when class details span multiple lines.

**3. Improve Instructor Name Matching**

Match variations: "David", "Nick", "Coach Nick" (case-insensitive) and normalize the output.

**4. Handle Dual Class Entries**

Both in-person and ZOOM versions will be stored as separate rows. The existing unique constraint on `class_date, start_time, class_name, is_online` already allows this since `is_online` differs between the two.

---

## Technical Details

### Parser Logic Updates

```text
Time Detection Flow:
+-------------------+     +------------------+     +-------------------+
| Match time format |---->| Has GMT suffix?  |---->| Set is_online     |
| with optional GMT |     | (e.g., -05:00)   |     | = true for ZOOM   |
+-------------------+     +------------------+     +-------------------+

Lookahead Scanning:
Line 1: Class name + URL
Line 2: ONLINE indicator (optional)
Line 3: Duration (e.g., "1 hour")
Line 4: Location
Line 5-8: Spots remaining
Line 9-12: Instructor name <-- Currently missed, needs expanded window
```

### Database Impact

No schema changes needed. The existing `punchpass_schedule` table with unique constraint on `(class_date, start_time, class_name, is_online)` will correctly store:
- `KB STrong Group Fitness` at `8:00 AM` with `is_online: false` (in-person)
- `ZOOM KB STrong` at `8:00 AM` with `is_online: true` (online)

### Expected Results After Fix

| Class | Time | Instructor | Is Online | Location |
|-------|------|------------|-----------|----------|
| KB STrong Group Fitness | 8:00 AM | David | false | Drake Fitness Studio |
| ZOOM KB STrong | 8:00 AM | David | true | Online (Zoom) |
| Mobility & Core | 12:00 PM | Nick | false | Drake Fitness Studio |

## Testing

After deployment, I'll trigger a manual sync to verify:
- All classes have instructor names populated
- ZOOM classes are correctly identified with `is_online: true`
- Both in-person and ZOOM versions appear as separate entries
- Schedule page displays all options correctly
