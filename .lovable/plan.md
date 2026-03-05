

# Plan: Update for Cloudflare Worker `drake-crawler-proxy`

Now that your Cloudflare Worker (`drake-crawler-proxy`) intercepts crawler traffic at the domain level, the share buttons and Copy Link no longer need to use the long Supabase edge function URLs. Everything can use clean `drake.fitness` URLs.

## Changes Required

### 1. `src/components/insights/SocialShareButtons.tsx`
- **Remove** the `OG_REDIRECT_BASE` constant entirely
- **Share buttons** (Twitter, Facebook, LinkedIn): change `shareUrl` to use the canonical URL (`drake.fitness/insights/{slug}`) instead of the og-redirect URL
- **Copy Link**: already copies the canonical `url` prop -- no change needed here
- Update toast to say "Share link copied!" for clarity

### 2. `.lovable/plan.md`
Rewrite to reflect the new architecture:

```text
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
```

### 3. `supabase/functions/og-redirect/index.ts` -- no changes needed
The edge function already parses paths correctly. When the Worker fetches `og-redirect/insights/{slug}`, it extracts the slug and returns OG HTML. The JS redirect in the response is harmless since crawlers ignore JavaScript.

## Summary
Two files to update: `SocialShareButtons.tsx` (remove og-redirect URL, use canonical) and `.lovable/plan.md` (document new architecture). The edge function stays as-is.

