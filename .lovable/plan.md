

## Generate and Send 12 Nurture Sequence Preview Emails

### Current State
- Email domain `www.drake.fitness` is in **active_provisioning** (DNS still verifying)
- No transactional email infrastructure exists yet
- 12 email definitions (7 New Lead + 5 Win-Back) are hardcoded in `EmailSequences.tsx`
- Brand: Teal `#0B4A52`, Gold `#F2B544`, Oswald headings, Inter body

### What Will Be Built

**1. Edge Function: `send-nurture-previews`**
A single edge function that generates all 12 beautifully designed HTML emails and sends them via the Lovable email API to both recipients:
- `envision@mkqconsulting.com`
- `felixfunes2001.ff@gmail.com`

**2. Expert-Designed HTML Templates**
Each of the 12 emails will be a fully rendered, production-ready HTML email with:

| Design Element | Implementation |
|---|---|
| Header | Teal bar with Drake Fitness logo + "DRAKE FITNESS" wordmark |
| Body background | White (`#ffffff`) for email client compatibility |
| Headings | Oswald font (Arial fallback), dark `#1A1A1A` |
| Body text | Inter font (sans-serif fallback), `#6A6A6A` muted |
| CTA buttons | Gold `#F2B544` background, dark text, 12px border-radius |
| Footer | Teal background, studio address, phone, tagline |
| Layout | Single-column, 600px max-width, table-based for Outlook |
| Mobile | Responsive with viewport meta tag |

**3. Email Content by Type**

- **Relationship emails** (4): Rich layout with hero image placeholder, body copy, subtle CTA
- **Conversion emails** (3): Clear value prop, pricing callout card, bold gold CTA button
- **Personal touch emails** (3): Plain-text style, minimal formatting, short and warm

Each email includes: proper subject line, preview text, from-line, and full body copy written as an expert marketing copywriter matching Drake Fitness tone (direct, warm, "strength for life").

**4. Admin UI: "Send Previews" Button**
Add a button to the `EmailSequences.tsx` page header that triggers the edge function, with loading state and success/error toast feedback.

### Technical Flow

```text
Admin clicks "Send Preview Emails"
  → supabase.functions.invoke('send-nurture-previews')
    → Edge function builds 12 HTML emails
    → Sends each via Lovable email API (@lovable.dev/email-js)
    → From: noreply@www.drake.fitness
    → To: both recipients
    → Returns summary of sent/failed
  → Toast: "12 preview emails sent!"
```

### File Changes

| File | Action |
|---|---|
| `supabase/functions/send-nurture-previews/index.ts` | Create — edge function with 12 inline HTML templates + send logic |
| `supabase/functions/send-nurture-previews/deno.json` | Create — dependencies |
| `supabase/config.toml` | Add `[functions.send-nurture-previews]` entry |
| `src/pages/admin/EmailSequences.tsx` | Add "Send Preview Emails" button in header |

### Dependency
DNS verification for `www.drake.fitness` must complete before emails actually deliver. The function can be built and deployed now — sending will work once the domain is verified.

