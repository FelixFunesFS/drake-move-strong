

# Plan: AI-Powered OG Image Generator + Admin Manager

## Overview

Build an edge function that uses AI to intelligently crop hero images to 1200x630 OG format with faces centered, a storage bucket to host the results, a database table to map pages to images, and an admin UI to manage it all. The `og-redirect` function will then serve page-specific images to social crawlers.

## Architecture

```text
Admin UI → generate-og-image edge function → Lovable AI (Gemini image model)
                                           → uploads to og-images bucket
                                           → saves mapping in page_og_images table

Social crawler → og-redirect edge function → queries page_og_images → serves custom image
```

## Changes

### 1. Database Migration

Create the `page_og_images` table and `og-images` storage bucket:

```sql
CREATE TABLE public.page_og_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text UNIQUE NOT NULL,           -- e.g. '/', '/about', '/classes'
  image_filename text NOT NULL,         -- filename in og-images bucket
  source_description text,              -- what hero image was used
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.page_og_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage OG images"
  ON public.page_og_images FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view OG images"
  ON public.page_og_images FOR SELECT
  USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('og-images', 'og-images', true);

CREATE POLICY "Admins can upload OG images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'og-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view OG images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'og-images');
```

### 2. New Edge Function: `generate-og-image`

**File**: `supabase/functions/generate-og-image/index.ts`

- Accepts `{ sourceImageUrl, pagePath, description }` from admin UI
- Calls Lovable AI (`google/gemini-2.5-flash-image`) with a prompt like: "Crop and reframe this fitness photo to exactly 1200x630 pixels for a social media preview. Keep all faces fully visible and centered. Do not add any text or watermarks."
- Sends the source image as an `image_url` content part
- Extracts the base64 result from the AI response
- Uploads to the `og-images` bucket as `{pagePath-slug}.png`
- Upserts the mapping into `page_og_images`
- Returns the public URL
- Handles 429/402 rate limit errors gracefully

### 3. Update `og-redirect` Edge Function

**File**: `supabase/functions/og-redirect/index.ts`

- After checking `STATIC_PAGES`, query `page_og_images` for the current path
- If a custom image exists, use `https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/og-images/{filename}` as the OG image URL
- Otherwise fall back to `DEFAULT_OG_IMAGE`
- Fix line 103: change `'Coach Nick'` to `'Coach Misty'`

### 4. Admin OG Image Manager Page

**File**: `src/pages/admin/OGImages.tsx`

A new admin page with:
- A table showing all pages (hardcoded list of ~11 static pages) with their current OG image status (custom vs default)
- Each row shows: page path, current OG image thumbnail (or "Default"), and action buttons
- **Generate button**: Opens a modal where admin selects/enters a source image URL (from existing assets or a URL), previews it, and clicks "Generate" to call the edge function
- **Preview**: Shows the resulting 1200x630 image inline
- **Delete**: Removes custom OG image, reverting to default
- Suggested source images pre-populated per page (the hero image mapping from the earlier plan)

### 5. Wire Up Admin Navigation

**File**: `src/components/admin/AdminLayout.tsx`
- Add nav item: `{ href: '/admin/og-images', label: 'OG Images', icon: Image }` (reuse existing `Image` import or use `Share2`)

**File**: `src/App.tsx`
- Add lazy import and route: `/admin/og-images` → `OGImages` component, protected with admin role

### 6. Update `config.toml`

Add the new edge function:
```toml
[functions.generate-og-image]
verify_jwt = false
```

## Page-to-Hero Mapping (Pre-populated in Admin UI)

| Page | Suggested Source |
|------|-----------------|
| `/` | `hero-group-turkish-getup.jpg` |
| `/about` | `david-coaching-turkish-getup.jpg` |
| `/classes` | `classes-hero-outdoor-mace.jpg` |
| `/coaching` | `hero-coaching-session.jpg` |
| `/pricing` | `pricing-hero-kettlebell.jpg` |
| `/schedule` | `schedule-community-group.jpg` |
| `/contact` | `contact-hero-class-turkish-getup.jpg` |
| `/success-stories` | `testimonial-group-training.jpg` |
| `/insights` | `insights-hero-turkish-getup-class.jpg` |
| `/reset-week-charleston` | `ruckathon-hero-group.jpg` |
| `/faq` | `community-group-photo-large.jpg` |

## Files Affected

- **New**: `supabase/functions/generate-og-image/index.ts`
- **New**: `src/pages/admin/OGImages.tsx`
- **Edit**: `supabase/functions/og-redirect/index.ts` (dynamic image lookup + Nick→Misty fix)
- **Edit**: `src/components/admin/AdminLayout.tsx` (add nav item)
- **Edit**: `src/App.tsx` (add route)
- **Migration**: Create table + bucket + RLS policies

