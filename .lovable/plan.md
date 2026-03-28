

## Plan: Email Client Compatibility Hardening

### Problems Found

Audited all 13 templates in `emailTemplates.ts` against Gmail, Apple Mail, Outlook (desktop/365/web), Yahoo, and mobile clients. Here are the issues that will cause broken rendering or formatting loss when copy-pasted into PunchPass:

| Issue | Affected Clients | Severity |
|-------|-------------------|----------|
| **Image URLs use `window.location.origin`** (Lovable preview domain) | All — images break entirely when pasted into PunchPass | Critical |
| **`@import` Google Fonts in `<style>`** | Gmail, Yahoo, Outlook strip `<style>` blocks entirely — wasted bytes, false confidence | Medium |
| **`object-fit: cover` on signature avatar** | Outlook desktop ignores it — avatar renders as stretched rectangle | High |
| **No VML fallback for circular avatar** | Outlook desktop — no `border-radius` support, shows square | High |
| **`rgba()` colors in footer** | Some older Outlook versions don't support rgba — text may vanish | Medium |
| **CTA button table missing `align="center"`** | Outlook, some Android clients — button hugs left edge | Medium |
| **`<div>` wrapping images** | Outlook desktop can add unexpected spacing around divs | Low-Medium |
| **Logo `height="auto"` as HTML attribute** | Outlook desktop ignores CSS height, may distort without explicit px | Low |
| **No `mso-line-height-rule: exactly`** | Outlook desktop inflates line-height unpredictably | Medium |

### What We'll Fix

**`src/lib/emailTemplates.ts`** — all changes in this one file:

1. **Swap image base URL** to the public storage bucket (`email-assets`) URL instead of `window.location.origin` — images will work regardless of where the HTML is pasted

2. **Remove `@import` font line** — provides no value since most clients strip it; the inline `font-family` fallback stacks already handle rendering

3. **Fix signature avatar** — use the pre-cropped `david-avatar-96.jpg` source image (already in the asset plan from memory) and add a VML `<v:oval>` conditional for Outlook desktop to render the circular crop

4. **Replace `rgba()` colors** with hex equivalents — footer text colors become solid hex values that every client renders

5. **Center CTA button** — add `align="center"` on the wrapping table so the button centers in Outlook and mobile

6. **Replace `<div>` image wrappers** with table cells — prevents Outlook from injecting extra spacing

7. **Add `mso-line-height-rule: exactly`** to body and key elements — locks Outlook line-height

8. **Add explicit logo height** — replace `height="auto"` with a calculated px value so Outlook doesn't distort

**`src/pages/admin/EmailSequences.tsx`** — add "Copy HTML" button:

9. **Copy HTML button** in the preview dialog header — copies the raw HTML string to clipboard with "Copied!" confirmation, so you can paste directly into PunchPass

### What This Does NOT Change

- Template content, copy, or sequence logic — untouched
- Admin preview UI layout — untouched (button is additive)
- Edge function templates — separate file, not affected

### Files

| File | Change |
|------|--------|
| `src/lib/emailTemplates.ts` | Fix image URLs, remove @import, VML avatar, rgba→hex, center CTA, div→table, MSO line-height, logo height |
| `src/pages/admin/EmailSequences.tsx` | Add "Copy HTML" button to preview dialog |

