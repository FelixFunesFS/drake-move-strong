

# Fix: Stale Spot Counts & Increase Sync Frequency

## Problem
1. **Spots are stale**: DB shows 10 spots for both classes, but PunchPass has 8 and 9. The sync captured data before recent bookings.
2. **Cron runs every 6 hours**, not 4: Schedule is `0 5,11,17,23 * * *` (UTC 5/11/17/23 = EST 12am/6am/12pm/6pm).

## Fix

### 1. Update cron to run every 4 hours
Change schedule from `0 5,11,17,23 * * *` to `0 1,5,9,13,17,21 * * *` (every 4 hours UTC = every 4 hours EST: 8pm, 12am, 4am, 8am, 12pm, 4pm).

This is a data operation — unschedule the old job and create a new one.

### 2. Trigger a manual sync now
Re-invoke the edge function to pull fresh spot counts immediately.

### 3. (Optional consideration) More frequent syncs
Even with 4-hour syncs, spots will still drift between syncs. The current 5-minute client-side refresh only re-reads the DB — it doesn't trigger a new PunchPass scrape. For truly live spots, you'd need syncs every 30-60 minutes, but that burns more Tavily API credits. The 4-hour cadence is a reasonable balance.

## Changes
- **Database**: Delete old cron job, create new one with 4-hour schedule
- **Edge function**: Trigger manual sync for immediate freshness
- **No code changes needed**

