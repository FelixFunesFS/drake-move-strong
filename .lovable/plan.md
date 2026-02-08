
# Clean Up Footer, SEO Files, and Remove Admin Auth from Sync

## Overview

Three targeted changes: remove the Member Login link from the footer, clean up SEO files to block private routes, and simplify the sync function so it no longer requires admin authentication for manual triggers.

## Changes

### 1. `src/components/Footer.tsx`
- Remove the `<li><Link to="/auth">Member Login</Link></li>` line from the "Start Here" column

### 2. `public/robots.txt`
- Add `Disallow` rules for `/member/`, `/admin/`, `/coach/`, and `/auth` to prevent search engines from indexing private routes

### 3. `public/sitemap.xml`
- Already clean -- no admin/member/coach URLs are listed. No changes needed.

### 4. `supabase/functions/sync-punchpass-schedule/index.ts`
- Remove the entire admin JWT fallback block (lines 301-339) -- the `else` branch that checks for Bearer token, validates claims, and queries `user_roles` for admin role
- Keep the three cron/bypass checks (Authorization header matching anon key, body `cron_secret`, and `x-cron-secret` header)
- If none of the bypass checks match, simply allow the sync to proceed anyway (no auth gate) -- this makes the function callable by anyone, which is fine since it only reads from PunchPass and writes to the schedule table
- This means the client-side refresh button can trigger a sync directly if desired, without needing a logged-in admin

### What stays unchanged
- All admin, member, and coach routes/pages remain in `App.tsx`
- The pg_cron automatic 6-hour sync continues as-is
- All database tables and RLS policies remain intact
