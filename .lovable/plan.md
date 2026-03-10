

# Schedule Sync Bug: Cancelled Classes Persist

## The Problem

The sync function has a critical gap in its deletion logic:

1. **Line 420-424**: It deletes classes where `class_date < today` (past dates only)
2. **Lines 430-443**: It upserts scraped classes by conflict key (`class_date, start_time, class_name, is_online`)

**What's missing**: If a class is cancelled or removed from PunchPass, it simply won't appear in the scraped markdown. But the old database row for that class is never deleted — the upsert only updates or inserts, it doesn't remove rows that no longer exist on PunchPass.

Result: cancelled classes remain visible on the website indefinitely until their date passes.

## The Fix

After upserting the freshly scraped classes, **delete any rows for the synced date range that were NOT in the scraped data**. This is a "sync = source of truth" pattern.

### Implementation (1 file: `supabase/functions/sync-punchpass-schedule/index.ts`)

After the upsert block (line ~453), add a cleanup step:

1. Collect all unique dates from the scraped data
2. Build a set of conflict keys from the scraped classes: `(class_date, start_time, class_name, is_online)`
3. Query all existing rows for those dates
4. Delete any row whose conflict key doesn't appear in the scraped set

```text
Scraped from PunchPass     DB (before sync)          DB (after fix)
─────────────────────      ──────────────────        ──────────────────
KB Strong 6pm Mar 10       KB Strong 6pm Mar 10      KB Strong 6pm Mar 10
                           Foundation 8am Mar 10     (deleted — cancelled)
Functional 9am Mar 11      Functional 9am Mar 11     Functional 9am Mar 11
```

This ensures the database is an exact mirror of what PunchPass shows. The cleanup only touches dates that appear in the current scrape (typically ~7-14 days), so it won't accidentally delete far-future classes that PunchPass hasn't rendered yet.

### Safety guard
If the scrape returns 0 classes (Firecrawl failure), the function already exits early at line 351 without touching the DB — so a bad scrape won't wipe everything.

