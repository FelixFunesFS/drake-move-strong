// Image imports for author bios
import davidCoachingTurkishGetup from '@/assets/david-coaching-turkish-getup.jpg';
import nickHolisticCoaching from '@/assets/nick-holistic-coaching.jpg';

// Permanent storage URL builder for OG images (won't change between builds)
const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';
export const getBlogOgImageUrl = (filename: string) => `${BLOG_IMAGE_BASE}/${filename}`;

export interface InsightPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  content: string;
  category: 'education' | 'trust' | 'conversion';
  author: 'david' | 'nick';
  publishedAt: string;
  readTime: number;
  thumbnail: string;
  ogImage: string;
  videoId?: string;
  featured?: boolean;
  tags: string[];
}

export const authorInfo = {
  david: {
    name: "Coach Drake",
    title: "Owner & Head Coach",
    bio: "25+ years experience in strength training and functional movement. StrongFirst Kettlebell Certified.",
    image: davidCoachingTurkishGetup
  },
  nick: {
    name: "Coach Nick",
    title: "Corrective Exercise & Holistic Coach",
    bio: "Specializes in corrective exercise, mobility, and holistic wellness approaches.",
    image: nickHolisticCoaching
  }
};

export const categoryInfo = {
  education: {
    name: "Education",
    description: "Learn the fundamentals of movement, strength training principles, and how your body actually works. Science-backed insights made accessible.",
    color: "blue",
    icon: "GraduationCap",
  },
  trust: {
    name: "Trust",
    description: "Stories, philosophies, and transparent insights into our coaching approach. Understand who we are and why we do what we do.",
    color: "green",
    icon: "ShieldCheck",
  },
  conversion: {
    name: "Decision Support",
    description: "Overcome objections, address concerns, and get clarity on whether Drake Fitness is right for you. No pressure, just honest answers.",
    color: "amber",
    icon: "Target",
  }
};
