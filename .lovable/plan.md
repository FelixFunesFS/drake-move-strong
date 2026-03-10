

## Issues Found

### 1. Edge Function Not Redeployed
The "earliest scraped date" cleanup code exists in the file but **was never deployed**. The logs confirm this — the sync ran 52 classes successfully but there's no "Stale date cleanup" log message. The March 10 rows (with `last_synced_at` from Feb 27) persist because the running version is the old code.

**Fix**: Deploy the updated edge function. This will immediately fix the TodayClassesBanner showing stale Tuesday classes on the next sync.

### 2. Misty Not in Instructor Resolution
The `DEFAULT_INSTRUCTORS` map (line 9-12) only has entries for `kettlebell flow → Nick` and `ruckathon → David`. Misty is not listed. If PunchPass shows Misty as instructor on certain classes, the scraper picks it up automatically. But if PunchPass omits her name on some classes, the fallback map won't resolve her.

**Fix**: Add Misty to the `DEFAULT_INSTRUCTORS` map for the classes she teaches (need to know which classes those are), OR confirm PunchPass always shows her name so no default mapping is needed.

### 3. How Sync Handles Changes/Modifications

Current sync behavior:
- **Upsert on composite key** (`class_date, start_time, class_name, is_online`): If a class changes time or name in PunchPass, it creates a new row AND leaves the old row orphaned
- **Orphan cleanup** (lines 455-482): Catches orphaned rows by comparing DB rows for scraped dates against scraped keys — this handles renames/time changes for dates in the scrape
- **Stale date cleanup** (lines 484-497, NOT YET DEPLOYED): Catches rows for dates no longer in the scrape at all (like today's passed classes)
- **Instructor changes**: Preserved via upsert — if PunchPass updates an instructor, the upsert overwrites the old value. If PunchPass omits an instructor, the sync preserves the existing DB value (lines 392-413)

So modifications ARE handled correctly — the orphan cleanup removes old versions and the upsert inserts new ones. The only gap was the "today" edge case, which the undeployed code fixes.

## Plan

1. **Deploy the edge function** — this is the primary fix; the code already exists but needs deployment
2. **Add Misty to DEFAULT_INSTRUCTORS** — need to confirm which classes she teaches to add the mapping
3. **Trigger a sync** after deployment to clean up stale March 10 rows

### Question needed
Which classes does Misty teach? (e.g., "Foundation Flow", specific days/times?) This determines whether we need a default mapping or if PunchPass already lists her name.

