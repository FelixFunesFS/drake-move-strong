

# Plan: Revert to Direct Edge Function URLs for Social Sharing

## The Problem

The curl test confirms it: even with the correct `User-Agent: facebookexternalhit/1.1` header and double quotes, the response is a **302 redirect from Lovable's proxy** (`Domain=lovable.app` cookie, IP `185.158.133.1`). Your Cloudflare Worker (`drake-crawler-proxy`) never fires because Lovable's own Cloudflare zone intercepts all traffic to `185.158.133.1` before your zone can process it.

This is a fundamental infrastructure constraint -- the domain points to Lovable's IP, which is behind Lovable's Cloudflare account, not yours. Your Worker route on your Cloudflare zone cannot intercept traffic that Lovable's zone handles first.

## What Needs to Change

Since the Worker-based approach cannot work with Lovable-hosted domains, we need to **revert** `SocialShareButtons.tsx` to use the direct `og-redirect` edge function URLs for social sharing. This is the proven approach that works.

### 1. `src/components/insights/SocialShareButtons.tsx`
- **Restore** the `OG_REDIRECT_BASE` constant
- **Share buttons** (Twitter, Facebook, LinkedIn): use `og-redirect` URL for `shareUrl` when a `slug` is provided
- **Copy Link**: use the `og-redirect` URL as well (so pasted links into Facebook Scheduler also get rich previews)
- Restore the `slug` prop usage

### 2. `.lovable/plan.md`
Update to document the correct architecture: direct edge function URLs for sharing, no Cloudflare Worker interception possible due to Lovable's proxy.

```text
# Architecture: Social OG Tags via Direct Edge Function

Lovable's infrastructure proxies all traffic through its own Cloudflare zone
(185.158.133.1), preventing personal Cloudflare Workers from intercepting
requests. Therefore, social sharing uses direct og-redirect Edge Function URLs.

Request flow (social share):
  User copies/shares link
    → og-redirect edge function URL
    → Crawler gets OG HTML with meta tags
    → Human gets JS redirect to drake.fitness/insights/slug

Files:
- supabase/functions/og-redirect/index.ts — Edge function serving OG HTML
- src/components/insights/SocialShareButtons.tsx — Share buttons (og-redirect URLs)
- src/pages/InsightPost.tsx — Passes slug prop to share buttons
```

### 3. No changes to `og-redirect/index.ts`
The edge function already works correctly.

## For Facebook Scheduler

After this revert, when you paste links into Facebook Scheduler, use the og-redirect URL format:
```
https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect/insights/your-slug
```

The Copy Link button will copy this URL automatically. Facebook will see the OG tags, show the rich preview, and when someone clicks, the JS redirect sends them to `drake.fitness`.

