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
