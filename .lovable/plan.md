

# Implement Legacy URL Redirects and 404 Noindex Fix

## Changes

### 1. `src/App.tsx` - Add legacy redirects and query param detection

- Add redirect routes for old URLs before the catch-all `*` route:
  - `/personal-training` → `/coaching`
  - `/group-fitness` → `/classes`
  - `/meet-the-team` → `/about`
  - `/videos` → `/member/videos`
- Add query parameter detection in `AppLayout` to redirect `?blog=y` or `?blogcategory=*` URLs to `/insights`

### 2. `src/pages/NotFound.tsx` - Add noindex meta tag and improve design

- Add `<Helmet>` with `<meta name="robots" content="noindex">` so Google stops indexing dead pages
- Add a proper page title via Helmet
- Improve the 404 page design to match the Drake Fitness brand with links to popular pages (Home, Schedule, Contact, About)

These two file changes will resolve all 17 flagged pages in Google Search Console (9 duplicates + 8 soft 404s). After deployment, you can click "Validate Fix" in Search Console to trigger a re-crawl.

