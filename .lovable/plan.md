

# Remove Consultation Page and Finalize SEO Files

## Changes

### 1. Delete `src/pages/Consultation.tsx`
Remove the entire file -- the standalone consultation form page.

### 2. `src/App.tsx`
- Remove the `Consultation` lazy import
- Remove `/consultation` from `STANDALONE_ROUTES`
- Remove the `<Route path="/consultation" ...>` line

### 3. `public/sitemap.xml`
- Remove the `/consultation` entry (lines 58-62)
- Remove the `/reset-week` entry (lines 48-52) since it just redirects to `/reset` which is already listed -- search engines penalize redirect URLs in sitemaps

### 4. No changes to `public/robots.txt`
Already properly configured with all private route blocks and the sitemap reference.

## SEO Readiness Summary

After these changes, both files are ready for publishing:

- **Sitemap URL:** `https://drake.fitness/sitemap.xml`
- **robots.txt** blocks private routes, allows social crawlers, and references the sitemap
- **Sitemap** contains only live, non-redirecting public pages: core pages, blog posts, and local SEO service pages

You can submit the sitemap directly in Google Search Console at `https://drake.fitness/sitemap.xml`.

