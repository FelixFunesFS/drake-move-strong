

## Domain Standardization + Welcome Page SEO Fix

### Two Issues to Address

**1. Welcome page should not be publicly indexed**

`/welcome` is a post-purchase redirect from PunchPass — not a page people should find via Google. It needs:
- `noindex, nofollow` meta tag added to the page via `react-helmet`
- **Not** added to the sitemap (it currently isn't — good)
- Added to `robots.txt` Disallow list alongside `/auth`
- No changes needed to the route itself — it should remain publicly accessible (no auth gate) since PunchPass redirects users there who may not have site accounts

**2. All URLs must use `www.drake.fitness`**

Every reference currently uses `https://drake.fitness`. Since `www.drake.fitness` is the primary domain, update across:

| File | Change |
|------|--------|
| `public/sitemap.xml` | All ~30 `<loc>` URLs → `https://www.drake.fitness/...` |
| `public/robots.txt` | Sitemap line → `https://www.drake.fitness/sitemap.xml` |
| `src/components/SEO.tsx` | Default canonical, `toAbsoluteUrl()`, default ogImage → `www.drake.fitness` |
| `src/components/StructuredData.tsx` | Business schema URLs |
| `src/pages/Welcome.tsx` | Add `noindex` meta + update canonical to `www` |
| ~20 page files | Update `canonical` prop values to `www.drake.fitness` |

### Welcome Page Specific Changes

In `src/pages/Welcome.tsx`, add a `noindex` directive:
```tsx
<Helmet>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
```

And update the canonical to `https://www.drake.fitness/welcome`.

In `public/robots.txt`, add:
```
Disallow: /welcome
```

### Implementation

This is a bulk find-and-replace of `https://drake.fitness` → `https://www.drake.fitness` across all affected files, plus the `noindex` addition for the Welcome page and robots.txt update.

