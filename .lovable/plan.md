# Fix the class schedule (empty + stale) and keep it live

## What's actually wrong

Verified against the live backend:

- The schedule table holds 56 classes, all dated Sept 1–19. Nothing is dated today or later, so the schedule page and the "today/upcoming" widgets legitimately have nothing to show.
- The last successful data write was **Sept 3, 01:00 UTC**. Nothing has been written in 18 days.
- The automatic refresh job *is* running every 4 hours and reports "succeeded" — but that only means the request was queued. Every recorded outbound call failed with `Timeout of 5000 ms reached`. The scheduler gives the refresh 5 seconds; scraping the PunchPass page takes far longer, so the call is cut off.
- Whether the scrape itself also fails (expired scraping key, out of credits, changed page layout) is **not yet confirmed** — recent function logs are empty. Step 1 below confirms it before anything else.
- The schedule page has no "data is stale" safety net. A fallback banner component already exists and is used by the small upcoming-classes widget, but the main schedule page never renders it — so a stale feed shows as a silently blank page instead of pointing people to PunchPass.

## The fix, in order

**1. Confirm the scrape still works**
Run the refresh manually once and read the function logs. This tells us whether it's only the 5-second cutoff, or also a broken scraping key / changed PunchPass layout. Everything after this adapts to what we find.

**2. Make the refresh fire-and-forget**
Change the scheduled job so it stops waiting on the scrape:
- Raise the scheduler's HTTP timeout well above the scrape time (60s).
- Have the refresh function acknowledge the request immediately and finish the scrape in the background, so a slow PunchPass page can never abort a run again.

**3. Make failures visible instead of silent**
Add a small sync-health record (last attempt, last success, rows written, error text) written on every run, surfaced on the admin schedule page with a manual "Sync now" button and a plain-language status line. Silent 18-day gaps become impossible to miss.

**4. Give the public page a safe fallback**
On the main schedule page, when data is missing or older than 24 hours, show the existing amber banner with a "View live schedule on PunchPass" link instead of an empty grid. Same treatment for the today/tomorrow banner on the home page.

**5. Backfill now**
Once the refresh runs clean, pull the current PunchPass schedule so today forward is populated, and clear out expired rows.

## Technical notes

- Root cause confirmed: `net._http_response` shows `Timeout of 5000 ms reached` on every retained cron call to `sync-punchpass-schedule`; `cron.job_run_details` reports success because pg_net queues asynchronously.
- Job 5 (`0 1,5,9,13,17,21 * * *`) gets `timeout_milliseconds := 60000` added to its `net.http_post` call; the function wraps the Firecrawl scrape + upsert in `EdgeRuntime.waitUntil()` and returns `202` immediately.
- New table `public.sync_status` (`name`, `last_attempt_at`, `last_success_at`, `rows_written`, `last_error`) with GRANTs: `select` to `authenticated`, `all` to `service_role`, RLS policy limiting reads to `has_role(auth.uid(),'admin')`. Written from the function with the service role.
- `src/pages/Schedule.tsx` consumes the existing `useScheduleStaleness` hook and renders `ScheduleFallbackBanner`, matching the pattern already in `UpcomingClassesWidget.tsx`.
- Auth model of the sync function is unchanged (cron key in `public.cron_keys`).
