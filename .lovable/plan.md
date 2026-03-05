

# Plan: Abandon Cloudflare Worker, Use Direct Edge Function URLs

## The Problem

The `curl` output proves the Cloudflare Worker is **not intercepting traffic**. The `set-cookie` header shows `Domain=lovable.app` — meaning `drake.fitness` resolves to Lovable's own Cloudflare proxy (185.158.133.1), which handles the request before your Cloudflare Worker zone ever sees it. Your Worker routes exist but traffic never flows through your Cloudflare account. This is a fundamental limitation of Lovable's custom domain architecture and cannot be fixed from either side.

## Solution

Use the `og-redirect` edge function URL directly in share buttons. Crawlers read the OG meta tags from the HTML response; human visitors get redirected to the real page via JavaScript.

## Changes

### 1. Add JavaScript redirect to `og-redirect` edge function

Add `<script>window.location.replace("${canonicalUrl}")</script>` to the HTML body in `buildHtmlResponse()`. Crawlers ignore JS and read the meta tags; real users get redirected instantly.

**File:** `supabase/functions/og-redirect/index.ts`

### 2. Update `SocialShareButtons` to use edge function URLs

Restore the `OG_REDIRECT_BASE` pattern. Share URLs become:
`https://ktktwcbvambkcrpfflxi.supabase.co/functions/v1/og-redirect/insights/{slug}`

**File:** `src/components/insights/SocialShareButtons.tsx`

### 3. Update `InsightPost.tsx` share URL generation

Pass the og-redirect URL to share buttons instead of the canonical URL.

**File:** `src/pages/InsightPost.tsx`

### 4. Delete Cloudflare Worker

You can remove the `drake-crawler-proxy` Worker from your Cloudflare dashboard and its routes — it serves no purpose since traffic never reaches it.

### 5. Update plan document

Update `.lovable/plan.md` to reflect the new architecture.

## Limitations

This approach works for **intentional shares** (clicking share buttons). If someone manually pastes `drake.fitness/insights/slug` into Facebook, it will still show generic metadata because the SPA can't serve OG tags server-side. For most use cases (share buttons, social posting), this is sufficient.

