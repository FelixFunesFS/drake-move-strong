

## Add Email Preview to Admin Email Sequences Page

### Approach

Add an "eye" icon button on each email card that opens a full-screen dialog/modal showing the rendered HTML email exactly as recipients will see it. The HTML is already built in the edge function — we'll extract the template-building logic into a shared approach by duplicating the HTML generation client-side (since the templates are static content, not dependent on server state).

### What Will Be Built

1. **Preview button on each EmailCard** — an eye icon next to the copy button
2. **Full-width Dialog** with an iframe rendering the email HTML
3. **Device toggle** (desktop 600px / mobile 375px) to preview responsiveness
4. **Client-side HTML generator** — port the `wrap()`, `ctaButton()`, and all 12 email body templates from the edge function into a local utility so previews render instantly without a network call

### File Changes

| File | Change |
|---|---|
| `src/lib/emailTemplates.ts` | New — contains all 12 email HTML generators (ported from edge function) |
| `src/pages/admin/EmailSequences.tsx` | Add preview button per card, add Dialog with iframe + device-size toggle |

### UX Flow

```text
Email Card → Click 👁 icon
  → Dialog opens with rendered HTML in sandboxed iframe
  → Toggle between "Desktop" (600px) and "Mobile" (375px) widths
  → Close dialog to return to list
```

No backend changes needed — all preview rendering happens client-side.

