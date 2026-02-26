

# Blog OG Tag Strategy: Ensure Correct Social Previews

## Current State
- All 11 blog posts have unique `seoTitle`, `excerpt`, and `thumbnail` values passed to the `<SEO>` component
- Thumbnails are Vite-hashed asset imports that resolve to valid deployed URLs
- `react-helmet` injects `og:title`, `og:description`, `og:image`, and `og:type="article"` dynamically

## Problem
Social media crawlers have varying JavaScript support. While Facebook and LinkedIn generally execute JS, some crawlers (X/Twitter, Slack, Discord, iMessage) may not — meaning they see a blank `<head>` with no OG tags.

## Recommended Fix: Crawler-Aware Edge Function

Create a backend function that detects social media crawler user-agents and returns pre-built HTML with the correct OG tags for each blog URL. Regular users still get the normal SPA.

### Steps

1. **Create a `social-meta` edge function** that:
   - Checks the `User-Agent` for known crawlers (facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, etc.)
   - If it's a crawler hitting `/insights/:slug`, looks up the post data and returns a minimal HTML page with the correct `og:title`, `og:description`, `og:image`, and a redirect meta tag for real users
   - If it's not a crawler, passes through to the normal SPA

2. **Create a static blog metadata JSON** at build time or hardcoded in the edge function containing each post's slug, seoTitle, excerpt, and a **stable absolute URL** for the thumbnail image

3. **For thumbnail URLs**: Since Vite-hashed paths change on each build, the most reliable approach is to upload the blog thumbnails to file storage (Lovable Cloud) and use permanent URLs in OG tags. This ensures the `og:image` URL never breaks.

### Alternative: Simpler Approach (if crawlers do run JS)
If testing confirms Facebook/LinkedIn/X all pick up the current `react-helmet` tags correctly, no changes are needed — the current setup already works. We can verify this by:
- Pasting a blog URL into Facebook Sharing Debugger
- Checking LinkedIn Post Inspector
- Testing with X Card Validator

### What I Recommend
Test the current setup first with the Facebook Sharing Debugger after publishing. If the blog-specific title and image appear correctly, no code changes are needed. If they don't, we implement the edge function approach.

