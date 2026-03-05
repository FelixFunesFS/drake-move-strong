
# Architecture: Social OG Tags via Direct Edge Function URLs

## How It Works

Since Lovable's custom domain proxy intercepts all traffic before any user Cloudflare Worker can run, share buttons use the `og-redirect` Supabase Edge Function URL directly.

- **Share buttons** link to: `https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect/insights/{slug}`
- **Crawlers** (Facebook, LinkedIn, Twitter, etc.) read OG meta tags from the HTML response
- **Human visitors** are instantly redirected to `https://drake.fitness/insights/{slug}` via `window.location.replace()`
- **Copy Link** still copies the canonical `drake.fitness` URL for clean sharing

## Limitations

This works for **intentional shares** (clicking share buttons). Manually pasting `drake.fitness/insights/slug` into Facebook will show generic SPA metadata since the Cloudflare Worker cannot intercept traffic.

## Files

- `supabase/functions/og-redirect/index.ts` — Edge function serving OG HTML + JS redirect
- `src/components/insights/SocialShareButtons.tsx` — Share buttons using og-redirect URLs
- `src/pages/InsightPost.tsx` — Passes `slug` prop to share buttons
