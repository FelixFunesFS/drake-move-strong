

## Meta Pixel Integration — Best Approach

### Marketing Perspective

For a fitness studio like Drake Fitness, the Meta Pixel is essential for:
- **Retargeting** visitors who viewed pricing/schedule but didn't book
- **Lookalike audiences** based on people who completed bookings or submitted contact forms
- **Conversion tracking** to measure which ads drive actual class signups

The best strategy is a **two-tier implementation**: base PageView tracking on every page, plus targeted event tracking on high-value actions.

### Recommended Events to Track

| Event | Where | Why |
|---|---|---|
| `PageView` | Every page (base code) | Baseline traffic tracking |
| `ViewContent` | `/pricing`, `/classes`, `/schedule` | Track interest signals for retargeting |
| `Lead` | Contact form submission, chat lead capture | Track lead generation |
| `Schedule` | Class booking confirmation | Track conversions |
| `CompleteRegistration` | Auth signup | Track new account creation |
| `Contact` | Phone/email clicks | Track intent signals |

### Implementation Plan

**Approach**: Add the pixel base code to `index.html` (runs on every page load), then create a lightweight `useMetaPixel` hook that fires specific events on route changes and user actions. This is the cleanest pattern for a React SPA — the base code loads once, and React handles event dispatch.

**Why not a component?** The base pixel script must load before React hydrates to avoid missing the initial PageView. Placing it in `index.html` is the standard approach recommended by Meta.

### Files Changed

| File | Change |
|---|---|
| `index.html` | Add Meta Pixel base code snippet in `<head>` |
| `src/hooks/useMetaPixel.ts` | New hook — exports `trackEvent()` helper + fires `ViewContent` on route changes to key pages |
| `src/App.tsx` | Add `useMetaPixel` in the router to track page-level events |
| `src/components/chat/LeadCaptureForm.tsx` | Fire `Lead` event on form submit |
| `src/pages/Contact.tsx` | Fire `Lead` event on contact form submit |
| `src/components/schedule/BookingModal.tsx` | Fire `Schedule` event on booking confirmation |

### Security Note
The Pixel ID (`3183436728495189`) is a public identifier — it's safe to include directly in client-side code. This is how Meta intends it to be used.

