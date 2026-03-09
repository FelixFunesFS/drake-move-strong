

# Fix: Tavily Extract Returning Cached/Stale Spot Counts

## Problem
Tavily's Extract API caches page content. When the sync runs, it gets stale HTML with old spot counts (10/10/20) instead of current values (8/9/19). This means no matter how often the cron runs, spots won't update until Tavily's cache expires.

## Solution
Add a cache-busting timestamp parameter to the PunchPass URL so Tavily treats each request as a unique URL and fetches fresh content.

## Changes

**File: `supabase/functions/sync-punchpass-schedule/index.ts`**

Change the Tavily extract URL from:
```
urls: ['https://drakefitness.punchpass.com/classes']
```
To:
```
urls: [`https://drakefitness.punchpass.com/classes?_t=${Date.now()}`]
```

This single-line change forces Tavily to fetch a fresh version of the page on every sync, ensuring spot counts, instructor data, and class availability are always current.

After deploying, trigger a manual sync to verify the fix pulls the correct spot counts (8, 9, 19).

