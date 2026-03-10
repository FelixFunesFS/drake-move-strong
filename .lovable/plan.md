

# Plan: Separate OG Source Image Selection for Blog Posts

## The Problem

Currently, blog posts use the same image (`og_image` field in `blog_posts`) for both the social preview and as a fallback display image. When the admin clicks "Generate" in the OG Manager, it feeds that same image to the AI cropper. The issue is that many blog hero images are tall/portrait-oriented -- great for the page but terrible for the 1.91:1 OG crop, leading to cut-off heads.

## The Right Approach

Add a way for the admin to pick a **different, wider source image** specifically for OG generation -- without touching the blog post's hero/thumbnail. Two pieces:

1. **A curated set of wide "OG source" images** uploaded to the existing `blog-images` bucket (or a new prefix like `og-sources/`). These are landscape-oriented photos that crop well at 1200x630. The admin can also paste any URL.

2. **An image picker in the OG Generate dialog** that shows available wide images from the bucket, letting the admin visually choose the best source before the AI crops it.

## Changes

### 1. Add an image picker to the Generate dialog
**File**: `src/pages/admin/OGImages.tsx`

- In the generate dialog (currently just a URL text input), add a visual grid of available images from the `blog-images` bucket
- Fetch the bucket file list via `supabase.storage.from('blog-images').list()`
- Show thumbnails in a scrollable grid; clicking one fills the source URL field
- Keep the manual URL input as a fallback
- For blog posts, pre-select the post's current `og_image` but make it easy to pick a different one
- Add a filter/search to narrow down images by filename

### 2. No database changes needed

The existing `page_og_images` table already stores the AI-cropped result mapped to the path. The source image is just an input to the AI function -- the blog post's `og_image` and `thumbnail_url` fields remain untouched.

### 3. Workflow improvement

The dialog flow becomes:
1. Admin clicks "Generate" on a blog post row
2. Dialog opens showing a grid of available images from the bucket
3. Admin picks a wide landscape photo (or pastes a URL)
4. Clicks "Generate" -- AI crops it to 1200x630 with face preservation
5. Result is stored in `og-images` bucket and mapped via `page_og_images`
6. The blog post's hero image and thumbnail remain unchanged

## Files Affected

- **Edit**: `src/pages/admin/OGImages.tsx` -- add image picker grid in generate dialog, fetch bucket listing

