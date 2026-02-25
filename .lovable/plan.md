

# Fix Blog Posts Showing Homepage Info When Shared

## Problem

`index.html` still contains hardcoded Open Graph and Twitter meta tags with the homepage title and description (lines 14–16, 19, 25, 88–91). When a blog post is shared on social media, crawlers read these static tags from the raw HTML instead of the dynamic tags injected by `react-helmet`. This causes every shared blog link to display "Drake Fitness - Mobility-First Functional Strength Training in Charleston, SC" instead of the actual article title and excerpt.

## Root Cause

Social media crawlers (Facebook, LinkedIn, X) read raw HTML. When they find duplicate meta tags — one hardcoded in `index.html` and one injected by `react-helmet` — they typically use the first occurrence. The hardcoded homepage tags always win.

## Fix

### `index.html` — Remove all hardcoded OG/Twitter meta tags

Remove these duplicated tags that conflict with the `<SEO>` component:

- **Line 14**: `<meta property="og:type" content="website" />`
- **Line 15**: `<meta property="og:url" content="https://drake.fitness" />`
- **Line 19**: `<meta name="twitter:card" content="summary_large_image" />`
- **Line 25**: `<link rel="canonical" href="https://drake.fitness" />`
- **Line 88**: `<meta property="og:title" content="Drake Fitness - ...">`
- **Line 89**: `<meta name="twitter:title" content="Drake Fitness - ...">`
- **Line 90**: `<meta property="og:description" content="Charleston's premier ...">`
- **Line 91**: `<meta name="twitter:description" content="Charleston's premier ...">`

The `<SEO>` component (via `react-helmet`) already injects all of these dynamically on every page, including blog posts. Removing the static duplicates ensures `react-helmet` is the sole source of truth, allowing each blog post's unique title, description, and image to appear correctly.

### No other file changes needed

The `InsightPost.tsx` component already correctly passes `post.title`, `post.excerpt`, `post.thumbnail`, and `ogType="article"` to the `<SEO>` component. The issue is purely the conflicting static tags in `index.html`.

## Technical Note

`react-helmet` works by manipulating the `<head>` DOM after React renders. Modern social crawlers (Facebook, LinkedIn) do execute JavaScript before reading meta tags. By removing the hardcoded duplicates, the dynamically injected blog-specific tags become the only tags present, and crawlers will read the correct article information.

