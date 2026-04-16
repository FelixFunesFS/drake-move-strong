

## Send the 4 win-back preview emails to felixfunes2001.ff@gmail.com

### What exists today
The `send-nurture-previews` edge function currently sends **all** nurture previews (welcome + win-back) to a hardcoded list of 2 recipients. It doesn't accept input — there's no way to specify just one address or just the win-back set. The "Send Preview Emails" button in `/admin/email-sequences` calls it with no arguments.

### Plan — make it targeted

**1. Update `supabase/functions/send-nurture-previews/index.ts`**
- Accept an optional JSON body: `{ to?: string, sequence?: "welcome" | "win-back" }`
- If `to` is provided → use that single address instead of the hardcoded `RECIPIENTS` list
- If `sequence` is provided → filter the `emails` array to only that sequence
- Defaults preserved (no body = current behavior)

**2. Add a "Send Win-Back Preview" button to `/admin/email-sequences`**
- Place it inside the **Win-Back** tab next to the existing controls
- Clicking it prompts for an email (default: `felixfunes2001.ff@gmail.com`) and calls the function with `{ to, sequence: "win-back" }`
- Success toast: "4 win-back previews sent to {email}"

**3. Deploy `send-nurture-previews`**

**4. For this immediate request**: after deployment, I'll invoke the function directly with `{ to: "felixfunes2001.ff@gmail.com", sequence: "win-back" }` to send the 4 win-back drafts (Day 0, 4, 7, 12) to Felix right now — no clicking required.

### Result
Felix gets 4 emails in his inbox (subject-prefixed `[win-back] …`) within ~30 seconds, and you have a reusable button for future single-recipient previews.

