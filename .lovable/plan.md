

# Blog CMS Migration Plan

## Overview
Migrate blog data from hardcoded `src/data/insights.ts` to a database-driven CMS, while keeping the rich custom React content components as code-side overrides. This also includes fixing the og-redirect edge function so Facebook reads blog-specific OG tags.

## Important Design Decision
10 of the 11 blog posts have **custom React components** in `BlogContentComponents.tsx` (1,675 lines of rich, interactive JSX with icons, images, internal links). These cannot be stored in a database. The approach:
- **Database** stores post metadata (title, slug, excerpt, category, author, dates, tags, OG image, featured flag) and a basic HTML `content` fallback
- **Code** keeps the rich React component overrides via `blogContentMap` -- if a slug has a custom component, it renders that instead of the DB content
- **New posts** created via admin will use the HTML content field (no custom React component needed)
- **No visual/UX changes** to any existing blog page

## Step 1: Create `blog_posts` Database Table

```sql
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  seo_title text,
  excerpt text NOT NULL,
  content text DEFAULT '',
  category text NOT NULL CHECK (category IN ('education', 'trust', 'conversion')),
  author text NOT NULL CHECK (author IN ('david', 'nick')),
  published_at date NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  thumbnail_url text,
  og_image text,
  video_id text,
  featured boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active posts" ON public.blog_posts FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Step 2: Seed Existing Posts
Insert all 11 existing blog posts into the table using the data insert tool. Thumbnail URLs will use the existing blog-images storage bucket URLs. HTML content stored as fallback.

## Step 3: Update og-redirect Edge Function
- Remove hardcoded `blogPosts` map
- Query `blog_posts` table by slug using Supabase client
- Replace `<meta http-equiv="refresh">` with `<script>window.location.replace(...)</script>` to prevent Facebook crawler from following the redirect

## Step 4: Update Frontend Data Layer
- Create a new hook `useBlogPosts()` that fetches from the `blog_posts` table
- Update `Insights.tsx` to use the hook instead of importing from `src/data/insights.ts`
- Update `InsightPost.tsx` to fetch individual post by slug from DB
- Keep `blogContentMap` for rich component overrides -- if slug has a custom component, render it; otherwise render DB HTML content
- Keep `authorInfo` and `categoryInfo` as static data (small, rarely changing)
- Preserve the `InsightPost` interface for type compatibility

## Step 5: Admin Blog Management Page
- New page at `/admin/blog` with table listing all posts
- Create/Edit form with fields: title, seo_title, slug (auto-generated from title), excerpt, category, author, published_at, read_time, tags, featured, is_active, content (rich text area)
- Add nav item to `AdminLayout.tsx`

## Step 6: Remove Static Data
- Remove blog post array from `src/data/insights.ts` (keep `authorInfo`, `categoryInfo`, `getBlogOgImageUrl`, and `InsightPost` interface)

## Files Changed
- `supabase/functions/og-redirect/index.ts` -- query DB + JS redirect fix
- `src/data/insights.ts` -- remove post array, keep types/utils
- `src/pages/Insights.tsx` -- fetch from DB
- `src/pages/InsightPost.tsx` -- fetch from DB
- `src/components/admin/AdminLayout.tsx` -- add Blog nav item
- New: `src/hooks/useBlogPosts.ts`
- New: `src/pages/admin/Blog.tsx`
- `src/App.tsx` -- add admin blog route
- New DB migration for `blog_posts` table

