

# Fix: Blog OG Tags Not Showing on Facebook

## The Problem
When you share `drake.fitness/insights/the-drake-philosophy-why-we-train-differently` on Facebook, it shows the homepage title/image instead of the blog-specific one. This happens because Facebook's crawler reads the **static** `index.html` (lines 69-78) which has hardcoded homepage OG tags. The SPA's `react-helmet` tags load too late via JavaScript.

## The Fix
The `og-redirect` edge function already exists and serves correct blog-specific OG tags. The share buttons already use it. The issue is that **you pasted the browser URL** (`drake.fitness/insights/...`) instead of using the share button's URL.

**Two changes to make this foolproof:**

### 1. Remove hardcoded OG tags from `index.html`
Delete lines 69-78 (the static OG/Twitter tags). These override `react-helmet` on platforms that don't run JS and always show homepage info regardless of page. Without them, crawlers that DO run JS (Facebook, LinkedIn) will pick up the dynamic blog-specific tags from `react-helmet`.

### 2. Make share buttons more prominent + add share prompt
- Add a visible "Share This Article" prompt with the share buttons near the top of the article (after "Back to All Articles") so users naturally use the og-redirect URL
- Update the "Copy Link" toast to say "Share-optimized link copied! Previews will show correctly on all platforms."
- Add a floating share FAB on mobile so it's always accessible

This dual approach ensures:
- Facebook/LinkedIn (which run JS) see blog-specific tags even from browser URLs
- X/Twitter/Slack/Discord get correct tags when users share via the on-page buttons
- The copy link button copies the og-redirect URL, not the browser URL

