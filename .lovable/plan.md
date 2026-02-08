

# Add Schedule Refresh Button (Simple Data Re-fetch)

## What Changed from the Previous Plan

The previous plan unnecessarily complicated things by adding admin-only sync logic to the refresh button. Since the PunchPass sync already runs automatically every 6 hours via pg_cron, the refresh button only needs to **re-query the database** for the latest data -- no Edge Function call needed.

## Changes

### `src/components/schedule/NativeWeeklySchedule.tsx`

- Import `RefreshCw` from lucide-react
- Add a `refreshing` state boolean
- Add a small icon button (matching existing nav button style: `variant="outline"`, `size="icon"`, `h-9 w-9`) next to the week navigation arrows on both mobile and desktop layouts
- On click: set `refreshing=true`, call the existing `fetchClasses()` function, then set `refreshing=false`
- While refreshing, the icon spins using `animate-spin` class

This is purely a client-side database re-fetch -- available to all users, no authentication required.

### `supabase/functions/sync-punchpass-schedule/index.ts`

- Add **Bypass 3**: check for `x-cron-secret` header matching the `CRON_SECRET` env var
- This is a one-line addition that allows triggering the sync via the tool for testing purposes without needing admin login

After deploying, I will trigger a sync to test the instructor resolution logic.

## Summary

```text
User clicks refresh -> fetchClasses() re-runs -> fresh data from DB
pg_cron (every 6h) -> sync-punchpass-schedule -> pulls from PunchPass -> DB updated
```

No admin-specific logic on the button. The automatic sync handles keeping data fresh from PunchPass.
