

# Plan: Fix Face Cropping in OG Images

## Problem Analysis

Three issues are causing faces to be cut off in social previews:

1. **No AI-generated OG images exist yet** -- the `page_og_images` table is empty, so every page (including blog posts) falls back to raw source images that Facebook crops arbitrarily at 1.91:1, cutting off heads.

2. **Blog posts aren't covered by the admin tool** -- the OG Image Manager only lists static pages. The "Why We Train Differently" post uses `studio-nick-david-together.jpg` directly from the `blog-images` bucket with no face-aware cropping. Facebook applies its own crop and cuts off the top.

3. **Broken source URLs in admin tool** -- the generate dialog pre-fills `https://drake.fitness/src/assets/...` which doesn't resolve (Vite content-hashes asset paths). The AI edge function receives an invalid URL and fails silently.

4. **Minor: og-redirect line 32 still says "Coach Nick"** in the About page description.

## Changes

### 1. Fix source image URLs in Admin UI
**File**: `src/pages/admin/OGImages.tsx`
- Change the pre-populated URL from `https://drake.fitness/src/assets/...` to the deployed preview URL pattern or use the Supabase `blog-images` bucket for images that exist there
- For local assets, use the preview origin + Vite-resolved import paths, or let admin paste a working URL manually (remove the broken default)

### 2. Add blog posts to OG Image Manager
**File**: `src/pages/admin/OGImages.tsx`
- Add a second section: "Blog Post OG Images" that fetches all `blog_posts` and shows their current `og_image` with a Generate button
- When generating for a blog post, store the result in `page_og_images` with path `/insights/{slug}`
- The `og-redirect` function already checks `page_og_images` before falling back to blog_images (line 121), so this works without backend changes

### 3. Improve AI prompt for face preservation
**File**: `supabase/functions/generate-og-image/index.ts`
- Strengthen the prompt: emphasize that heads/faces must never be cropped, prefer showing full heads with some padding above, and use the bottom portion of the image if faces are at the top
- Add explicit instruction: "If faces are near the top of the image, position the crop so the top of their heads and hair are fully visible with at least 20px of space above"

### 4. Fix "Coach Nick" reference
**File**: `supabase/functions/og-redirect/index.ts`
- Line 32: Change "Coach Nick" to "Coach Misty" in the About page description

## Files Affected
- **Edit**: `src/pages/admin/OGImages.tsx` (fix URLs + add blog post section)
- **Edit**: `supabase/functions/generate-og-image/index.ts` (improve prompt)
- **Edit**: `supabase/functions/og-redirect/index.ts` (Coach Nick → Misty on line 32)

