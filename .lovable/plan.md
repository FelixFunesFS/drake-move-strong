

# Fix Outdated Meta Description in `index.html`

## The Problem

The `index.html` file contains a hardcoded fallback meta description (line 7) and OG/Twitter descriptions (lines 72-73) that reference the old **"7-Day Mobility Reset Week ($50)"** offer. This offer has been replaced by the **"3-Class Intro Experience (Free)"**.

While React Helmet overrides these on the homepage for browser users, **search engine crawlers and social media previews** may use the `index.html` fallback — especially for the root URL or when JavaScript doesn't execute (e.g., Facebook/Twitter link previews before the og-redirect kicks in).

The description is also **truncated** mid-sentence: `"...includes unlimited small‑group,"` — which looks broken in search results.

## The Fix (1 file: `index.html`)

Update 3 lines to match the current homepage SEO description already set in React Helmet:

1. **Line 7** — `<meta name="description">`: Update to match Home.tsx SEO component
2. **Line 72** — `<meta property="og:description">`: Same update
3. **Line 73** — `<meta name="twitter:description">`: Same update

New copy (matches `Home.tsx`):
> "Charleston's coach-led gym for functional strength, mobility, and group fitness classes. Small groups, 25+ years experience. Try 3 classes free."

