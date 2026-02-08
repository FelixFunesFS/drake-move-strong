

# Fix cron_secret Bypass in sync-punchpass-schedule

## The Problem

The current code logic is structurally correct but has a subtle issue: when calling via the edge function tool, the request may include an auto-injected `Authorization` header with the user's token (or the anon key). This means `authHeader` is not null, `isCronRequest` stays false after the service role check (line 272), and if the body parse succeeds but the cron_secret check also fails (e.g., env var mismatch), it falls through to the admin JWT validation path -- which then fails because the token isn't an admin's.

The fix is to **move the cron_secret body check before the auth header validation**, and ensure the body is properly read. The current order is already correct, but we need to make the `else` branch only trigger when `isCronRequest` is definitively false after ALL bypass checks.

## File Change

### `supabase/functions/sync-punchpass-schedule/index.ts`

Restructure lines 267-303 so the flow is:

1. Read the request body first (clone request if needed)
2. Check service role key in Authorization header
3. Check cron_secret in body
4. If neither matched, THEN validate as admin user

No logic change needed -- the current code already does this correctly. The actual fix is just ensuring the `else` block properly accounts for both checks completing. Looking at the code again, it IS correct. The real issue is we need to **test it properly**.

## Action Plan

1. **No code change needed** -- the bypass logic is already implemented correctly
2. **Trigger the sync** using the edge function tool with the `cron_secret` in the body to test instructor resolution
3. If the CRON_SECRET env var value is unknown, we can bypass by sending the request with the service role key in the Authorization header instead

## After Sync

- Verify the database has instructor names populated for all classes
- Check the schedule page displays instructors correctly

