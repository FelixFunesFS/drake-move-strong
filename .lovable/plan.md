

# Fix Blog Social Previews with Prerender Edge Function

## Problem
`react-helmet` injects blog-specific OG tags via JavaScript, but crawlers that don't execute JS (X/Twitter, Slack, Discord) only see the static homepage tags in `index.html`.

## Solution: Crawler-Detection Edge Function
Create an edge function that intercepts requests to `/insights/:slug`, detects crawler user-agents, and returns a minimal HTML page with the correct OG tags. Regular users get redirected to the normal SPA.

**This approach works within Lovable's architecture** because we can use a dedicated URL for sharing (e.g., `https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect/insights/:slug`) or instruct users to share via a share URL pattern.

### However -- the realistic limitation
Since we cannot control Lovable's CDN routing, crawlers hitting `https://drake.fitness/insights/...` will still get the static `index.html`. The edge function only works if the shared URL points to the function endpoint.

## Practical Alternative: Update `index.html` Fallback Strategy
Since true SSR isn't possible on Lovable hosting, the best pragmatic approach:

1. **Test Facebook/LinkedIn first** -- these platforms execute JS and should already show blog-specific previews correctly
2. **For X/Twitter/Slack fallback** -- update the `index.html` fallback OG tags to be more generic ("Read training insights from Drake Fitness") so at least the fallback isn't misleading
3. **Add a `og-blog-fallback.png`** -- a branded generic image for blog sharing that says "Drake Fitness Insights" rather than showing the homepage hero

## Steps
1. Test current blog URLs in Facebook Sharing Debugger to confirm dynamic tags work there
2. If Facebook works: no code changes needed for major platforms
3. Optionally create a generic blog fallback OG image and update `index.html` meta tags to detect `/insights/` paths (not possible statically -- confirms the SPA limitation)

## Bottom Line
The titles and images ARE being set correctly in the code. The question is whether the platform you're sharing on executes JavaScript. Facebook and LinkedIn do. X/Twitter and Slack often don't. For full coverage across all platforms, the site would need to be deployed on a host that supports prerendering (Vercel, Netlify, Cloudflare Pages).

