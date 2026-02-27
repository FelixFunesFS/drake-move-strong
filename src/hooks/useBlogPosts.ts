import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { InsightPost } from '@/data/insights';
import { getBlogOgImageUrl } from '@/data/insights';

// Thumbnail imports for existing posts (Vite-bundled)
import davidCoachingForm from '@/assets/david-coaching-form.jpg';
import studioNickDavidTogether from '@/assets/studio-nick-david-together.jpg';
import membersOverheadLungeNaturalLight from '@/assets/members-overhead-lunge-natural-light.jpg';
import groupOverheadPressClass from '@/assets/group-overhead-press-class.jpg';
import studioMobilityTraining from '@/assets/studio-mobility-training.jpg';
import memberWeightedVestBandTraining from '@/assets/member-weighted-vest-band-training.jpg';
import studioFloorExercise from '@/assets/studio-floor-exercise.jpg';
import studioFullView from '@/assets/studio-full-view.jpg';
import blogKettlebellOverheadGroup from '@/assets/blog-kettlebell-overhead-group.jpg';
import studioGroupOverhead from '@/assets/studio-group-overhead.jpg';

// Map DB thumbnail filenames to Vite-bundled imports for existing posts
const thumbnailMap: Record<string, string> = {
  'david-coaching-form.jpg': davidCoachingForm,
  'studio-nick-david-together.jpg': studioNickDavidTogether,
  'members-overhead-lunge-natural-light.jpg': membersOverheadLungeNaturalLight,
  'group-overhead-press-class.jpg': groupOverheadPressClass,
  'studio-mobility-training.jpg': studioMobilityTraining,
  'member-weighted-vest-band-training.jpg': memberWeightedVestBandTraining,
  'studio-floor-exercise.jpg': studioFloorExercise,
  'studio-full-view.jpg': studioFullView,
  'blog-kettlebell-overhead-group.jpg': blogKettlebellOverheadGroup,
  'studio-group-overhead.jpg': studioGroupOverhead,
};

const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';

function resolveThumbnail(thumbnailUrl: string | null): string {
  if (!thumbnailUrl) return '';
  // Check if it's a known local asset filename
  if (thumbnailMap[thumbnailUrl]) return thumbnailMap[thumbnailUrl];
  // If it's already a full URL, use as-is
  if (thumbnailUrl.startsWith('http')) return thumbnailUrl;
  // Otherwise treat as a bucket filename
  return `${BLOG_IMAGE_BASE}/${thumbnailUrl}`;
}

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  seo_title: string | null;
  excerpt: string;
  content: string | null;
  category: string;
  author: string;
  published_at: string;
  read_time: number;
  thumbnail_url: string | null;
  og_image: string | null;
  video_id: string | null;
  featured: boolean | null;
  tags: string[] | null;
  is_active: boolean | null;
}

function mapToInsightPost(row: BlogPostRow): InsightPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    seoTitle: row.seo_title || undefined,
    excerpt: row.excerpt,
    content: row.content || '',
    category: row.category as InsightPost['category'],
    author: row.author as InsightPost['author'],
    publishedAt: row.published_at,
    readTime: row.read_time,
    thumbnail: resolveThumbnail(row.thumbnail_url),
    ogImage: row.og_image ? getBlogOgImageUrl(row.og_image) : '',
    videoId: row.video_id || undefined,
    featured: row.featured || false,
    tags: row.tags || [],
  };
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data as BlogPostRow[]).map(mapToInsightPost);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return mapToInsightPost(data as BlogPostRow);
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
