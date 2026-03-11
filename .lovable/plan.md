

## Fix Broken Logo in Email Preview

### Problem
The logo `<img>` uses a hardcoded URL (`https://drake-move-strong.lovable.app/images/drake-fitness-logo2.png`). In the preview environment, this domain may not serve the latest assets, or the sandboxed iframe may block cross-origin loading. The image appears broken.

### Solution
In the **client-side preview utility only** (`src/lib/emailTemplates.ts`), dynamically use `window.location.origin` to construct the logo URL so it always points to the current environment (preview or production). The **edge function** keeps the hardcoded production URL since it sends real emails.

### File Changes

| File | Change |
|---|---|
| `src/lib/emailTemplates.ts` | Replace hardcoded `https://drake-move-strong.lovable.app` with `${window.location.origin}` for the logo `src` |

Single line change — the `wrap()` function's `<img src="...">` will use the dynamic origin. No other files affected.

