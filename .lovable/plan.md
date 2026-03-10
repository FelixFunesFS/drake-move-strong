

## Fix: Stale "Today" Classes Not Being Cleaned Up

### Problem
The sync function has two cleanup mechanisms, but neither catches today's classes when PunchPass no longer lists them:

1. **Delete old classes** (line 420-424): Uses `class_date < today` — strictly less than, so today's rows survive
2. **Orphan cleanup** (line 455-482): Only checks dates present in the scrape — since PunchPass doesn't return today's classes after they pass, today is not in `uniqueDates`

Result: 4 stale Tuesday March 10 rows with `last_synced_at` from Feb 27 persist indefinitely.

### Fix
Add a third cleanup step after the existing orphan cleanup: delete rows for dates that are **before the earliest scraped date** and **not already deleted** by the `< today` filter. This covers the gap where today's date falls between the two existing checks.

In `supabase/functions/sync-punchpass-schedule/index.ts`, after the existing cleanup block (~line 482), add:

```typescript
// Cleanup 2: Remove rows for dates before the earliest scraped date
// (catches "today" rows when PunchPass no longer shows today's classes)
if (uniqueDates.length > 0) {
  const earliestScrapedDate = uniqueDates.sort()[0];
  const { error: staleError } = await supabaseAdmin
    .from('punchpass_schedule')
    .delete()
    .lt('class_date', earliestScrapedDate);

  if (staleError) {
    console.warn('Stale date cleanup error:', staleError);
  }
}
```

This is safe because:
- If PunchPass starts from Wednesday, any Tuesday (or earlier) rows are definitively outdated
- It's idempotent — the existing `< today` delete already handles most past dates; this catches the edge case where today equals a date no longer on PunchPass

### Single file change
- `supabase/functions/sync-punchpass-schedule/index.ts` — add ~10 lines after line 482

