

# Plan: Cloudflare Worker Crawler Proxy + Expanded OG Tags

## What This Solves

When anyone shares a `drake.fitness` URL (blog post, classes page, etc.) on Facebook, LinkedIn, Slack, or iMessage, the social platform's crawler will be intercepted by a Cloudflare Worker and served the correct title, description, and image -- instead of the generic SPA homepage metadata.

## Changes

### 1. Update `og-redirect` edge function to support all site pages

Currently only handles blog posts. Expand to handle static pages with hardcoded OG data, plus keep the existing blog lookup.

**Route handling:**
- `/insights/:slug` -- database lookup (existing, keep as-is)
- `/classes`, `/coaching`, `/pricing`, `/about`, `/schedule`, `/contact`, `/faq`, `/reset-week-charleston`, `/success-stories` -- static OG metadata map
- `/` (homepage) -- site-level OG tags
- Remove the JS redirect (`window.location.replace`) since crawlers are the only consumers now

**File:** `supabase/functions/og-redirect/index.ts`

### 2. Simplify `SocialShareButtons` to use canonical URLs

Remove the `OG_REDIRECT_BASE` and `getShareUrl` helper. Share buttons will pass the canonical `drake.fitness/insights/:slug` URL directly, since the Cloudflare Worker handles crawler routing at the domain level.

**File:** `src/components/insights/SocialShareButtons.tsx`

### 3. Update `InsightPost.tsx` share button calls

Replace `getShareUrl(post.slug)` with the canonical URL `https://drake.fitness/insights/${post.slug}` in all three places where `SocialShareButtons` is rendered.

**File:** `src/pages/InsightPost.tsx`

### 4. Provide Cloudflare Worker code (as a code block for manual deployment)

The Worker cannot be deployed from within Lovable -- it must be added via the Cloudflare dashboard. I will provide the complete Worker script with:

- User-Agent detection for: `facebookexternalhit`, `LinkedInBot`, `Twitterbot`, `Slackbot`, `WhatsApp`, `Discordbot`, `Googlebot`
- If crawler: fetch `https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect{path}` and return the HTML
- If real user: `fetch(request)` passthrough to origin

You will deploy this in **Cloudflare Dashboard > Workers & Pages > Create Worker**, then add a route `drake.fitness/*` under **Workers Routes** for your domain.

## Deployment Steps (after implementation)

1. I update the edge function and share button code within Lovable (automatic deploy)
2. You copy the Cloudflare Worker code I provide into your Cloudflare dashboard
3. You add the Worker route `drake.fitness/*`
4. Test by pasting `drake.fitness/insights/any-slug` into [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

