

## Issue
The "Push Winback to Resend" button opens a file picker, but the user expects it to "just push" — they've already uploaded the cleaned CSV earlier in our conversation, so making them re-find `/mnt/documents/winback-list-cleaned.csv` is unnecessary friction. The file lives on the server (Lovable artifacts), not on their local machine, so a browser file picker is the wrong UX entirely.

## Root cause
Looking at `src/pages/admin/EmailSequences.tsx`, the push button triggers a hidden `<input type="file">`, reads the CSV from the user's local disk, then sends it to the `push-winback-to-resend` edge function. The cleaned CSV is in `/mnt/documents/` on the Lovable sandbox — the browser cannot read it directly, and the user has no reason to download/re-upload it.

## Fix — embed the cleaned list server-side

**1. Bake the 37-contact cleaned list into the edge function**
Update `supabase/functions/push-winback-to-resend/index.ts`:
- Add a hardcoded `WINBACK_CONTACTS` array (37 entries: email + first_name) sourced directly from the audit we ran
- Make the `csv` body field optional — if absent, use the embedded list
- Keep CSV upload path as a fallback for future campaigns

**2. Simplify the admin UI**
Update `src/pages/admin/EmailSequences.tsx`:
- Remove the file-picker flow for the win-back push
- Replace with a single confirmation dialog: "Push 37 cleaned win-back contacts + 4 broadcast drafts to Resend?"
- On confirm → call the edge function with no CSV body → show audience ID + 4 broadcast IDs in a success toast
- Keep the templates payload (so the function uses the latest HTML)

**3. Deploy the updated edge function**

## After this
One click in `/admin/email-sequences` → 37 contacts synced + 4 drafts created in Resend → user reviews & schedules in the Resend dashboard. No file picker, no re-upload.

