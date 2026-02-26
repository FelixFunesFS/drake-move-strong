

# Upload Blog Thumbnails to Permanent Cloud Storage

## Why This Matters
Currently, blog thumbnails are Vite-imported assets that get hashed filenames on each build (e.g., `/assets/david-coaching-form-abc123.jpg`). When these URLs are used in OG meta tags, they break every time you redeploy because the hash changes. Uploading them to Lovable Cloud file storage gives each image a permanent, stable URL.

## Implementation Steps

### 1. Create a public storage bucket for blog images
Create a `blog-images` storage bucket with public read access and appropriate RLS policies so images are accessible to anyone (crawlers included).

### 2. Upload the 11 blog thumbnail images to the bucket
Upload each of the following assets to the `blog-images` bucket with clean, permanent filenames:

| Current Asset | Storage Filename |
|---|---|
| `david-coaching-form.jpg` | `david-coaching-form.jpg` |
| `studio-nick-david-together.jpg` | `studio-nick-david-together.jpg` |
| `members-overhead-lunge-natural-light.jpg` | `members-overhead-lunge-natural-light.jpg` |
| `group-overhead-press-class.jpg` | `group-overhead-press-class.jpg` |
| `studio-mobility-training.jpg` | `studio-mobility-training.jpg` |
| `member-weighted-vest-band-training.jpg` | `member-weighted-vest-band-training.jpg` |
| `studio-floor-exercise.jpg` | `studio-floor-exercise.jpg` |
| `studio-full-view.jpg` | `studio-full-view.jpg` |
| `blog-kettlebell-overhead-group.jpg` | `blog-kettlebell-overhead-group.jpg` |
| `studio-group-overhead.jpg` | `studio-group-overhead.jpg` |
| `nick-holistic-coaching.jpg` | `nick-holistic-coaching.jpg` |

### 3. Create a helper for permanent OG image URLs
Add a utility function that builds the public storage URL for any blog image:
```
https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images/{filename}
```

### 4. Update `src/data/insights.ts` with a dual-image approach
Each post keeps its existing Vite-imported `thumbnail` (used for rendering on the page with optimized loading) and gains a new `ogImage` field pointing to the permanent storage URL (used only for social sharing meta tags).

### 5. Update the `<SEO>` component usage in `InsightPost.tsx`
Pass `post.ogImage` (the permanent URL) to the `ogImage` prop of `<SEO>`, while continuing to use `post.thumbnail` (the Vite asset) for the visible page image.

## Limitation
The actual file upload to the storage bucket must be done manually through the Lovable Cloud UI — I can create the bucket and policies via migration, set up all the code to reference the permanent URLs, but you'll need to upload the image files themselves through the storage interface.

## Alternative: Skip the Upload
Since we confirmed Facebook/LinkedIn execute JavaScript and read `react-helmet` tags, the Vite-hashed URLs do work for those platforms as long as the deployment stays live. The permanent URLs are mainly insurance against hash changes breaking cached OG images. If you're comfortable republishing and re-scraping when needed, the current setup may be sufficient.

