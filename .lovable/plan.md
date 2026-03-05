# Architecture: Social OG Tags via Cloudflare Worker

## How It Works

A Cloudflare Worker (`drake-crawler-proxy`) runs on drake.fitness/* and
www.drake.fitness/* routes. It detects social media crawlers by User-Agent
and proxies their requests to the Supabase `og-redirect` Edge Function.
Human visitors pass through to the Lovable origin normally.

Request flow:
  drake.fitness/insights/slug
    → Cloudflare edge (drake-crawler-proxy)
    → Crawler? → fetch og-redirect edge function → return OG HTML
    → Human?   → pass through to Lovable origin

- Share buttons and Copy Link use clean drake.fitness URLs
- Crawlers get rich OG tags transparently
- Humans see the normal SPA

## Files
- supabase/functions/og-redirect/index.ts — Edge function serving OG HTML
- src/components/insights/SocialShareButtons.tsx — Share buttons (canonical URLs)
- src/pages/InsightPost.tsx — Passes slug prop to share buttons
