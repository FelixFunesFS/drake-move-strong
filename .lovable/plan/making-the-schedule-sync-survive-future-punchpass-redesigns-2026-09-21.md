# Making the schedule sync survive future PunchPass redesigns

The outage happened because one fragile reader was the only source of truth, and nothing noticed when it quietly returned zero classes. The fix just shipped removes the silent-failure part. This plan removes the single-point-of-failure part and gives early warning when PunchPass changes again.

## The four layers

### 1. A second, independent way to read the schedule
PunchPass embeds a machine-readable copy of upcoming classes on the same page (a standards-based events list: name, start and end time, instructor, location, in-studio vs online, booking link). Verified today: it returns the next 10 classes, independent of how the page is styled.

The sync will read the page once and try both readers:
- Reader A: the visual layout reader (all ~60 classes, includes spots left).
- Reader B: the machine-readable events list (next ~10 classes, survives visual redesigns).

Whichever returns more classes wins. If A returns nothing but B works, the next few days stay accurate and an alert goes out saying the layout changed — the site keeps working while it gets fixed.

### 2. Sanity checks, not just "did it run"
Before saving, the sync rejects results that look wrong even though nothing errored:
- Zero classes parsed (already treated as a failure).
- A big unexplained drop — fewer than half the classes we had for the same date range last time.
- No classes at all for the next 7 days.
- Every class missing an instructor or a booking link (a sign the reader half-matched).

A rejected result leaves the existing schedule untouched rather than wiping it, and triggers an alert.

### 3. A daily self-test that catches drift early
A small daily check fetches the PunchPass page and confirms both readers still find classes, without writing anything. If reader A starts failing while reader B still works, David and envision@mkqconsulting.com get told days before anyone notices on the site.

### 4. Visible health, so it can't rot unnoticed
- A "Schedule sync" panel in the admin Schedule Manager: last successful refresh, classes saved, last error, and a "Refresh now" button.
- The public schedule already falls back to an amber "check PunchPass for latest times" notice when data is stale, so visitors never see a blank week.

## What the user sees
Nothing changes on the public site while everything works. When PunchPass changes again: the site keeps showing near-term classes from the backup reader, an email lands the same day, and the admin panel shows exactly what broke.

## Technical notes
- `supabase/functions/sync-punchpass-schedule/index.ts`: extract `parseScheduleFromHtml` (existing) and add `parseScheduleFromJsonLd` reading the `application/ld+json` `ItemList` of `Event` objects; merge by the existing conflict key `class_date|start_time|class_name|is_online`, preferring reader A rows (they carry `spots_remaining`). Record which reader supplied the rows in `sync_status.last_error`-adjacent fields.
- Add `sync_status` columns: `source text` (which reader won) and `rows_expected integer` (prior count for the same window) to support the drop check.
- Guard rails run before the upsert; on rejection call the existing `handleFailure` path (24h-throttled email to envision@mkqconsulting.com plus recovery notice) and return a non-2xx so failures are never reported as success.
- New edge function `schedule-sync-healthcheck` (read-only, no DB writes except `sync_status.last_attempt_at`), scheduled daily via `pg_cron` with `timeout_milliseconds := 60000`, alerting when either reader returns zero.
- Admin panel: a card in `src/pages/admin/ScheduleManager.tsx` reading `public.sync_status` (admin-only select policy already exists).
