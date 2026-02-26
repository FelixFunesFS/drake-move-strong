const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Blog post metadata for OG tags
const blogPosts: Record<string, { title: string; excerpt: string; ogImage: string; author: string; publishedAt: string }> = {
  "why-traditional-workouts-stop-working-after-40": {
    title: "Why Workouts Fail After 40: Complete 2026 Guide | Drake Fitness",
    excerpt: "And What Actually Does Work for Long-Term Strength and Mobility",
    ogImage: "david-coaching-form.jpg",
    author: "Coach Drake",
    publishedAt: "2026-01-05",
  },
  "the-drake-philosophy-why-we-train-differently": {
    title: "Drake Fitness Philosophy: Why Our Training Works | Drake Fitness",
    excerpt: "Discover the principles behind our coaching approach and why we prioritize movement quality over workout intensity.",
    ogImage: "studio-nick-david-together.jpg",
    author: "Coach Nick",
    publishedAt: "2025-11-15",
  },
  "understanding-mobility-vs-flexibility": {
    title: "Mobility vs Flexibility: Key Differences Explained | Drake Fitness",
    excerpt: "Most people confuse mobility with flexibility. Learn the critical difference and why mobility training is essential for pain-free movement.",
    ogImage: "members-overhead-lunge-natural-light.jpg",
    author: "Coach Drake",
    publishedAt: "2025-10-20",
  },
  "too-out-of-shape-to-start-reset-week-for-beginners": {
    title: "Too Out of Shape? Why Reset Week Works for Beginners | Drake Fitness",
    excerpt: "Address the fear of starting. Learn why our program is specifically designed for people who feel unprepared.",
    ogImage: "group-overhead-press-class.jpg",
    author: "Coach Drake",
    publishedAt: "2025-09-18",
  },
  "why-we-dont-believe-in-no-pain-no-gain": {
    title: "No Pain No Gain Myth: Proven Alternative (2025) | Drake Fitness",
    excerpt: "For decades, the fitness industry has told you that if it doesn't hurt, it doesn't work. We disagree — here's why.",
    ogImage: "studio-mobility-training.jpg",
    author: "Coach Drake",
    publishedAt: "2025-08-12",
  },
  "can-i-train-with-old-injury": {
    title: "Training With Injuries: Complete Safety Guide | Drake Fitness",
    excerpt: "Learn how our coaches modify exercises and create personalized progressions for members with injuries or limitations.",
    ogImage: "member-weighted-vest-band-training.jpg",
    author: "Coach Drake",
    publishedAt: "2025-07-25",
  },
  "how-breathing-controls-movement": {
    title: "How Breathing Improves Movement: 4 Key Benefits | Drake Fitness",
    excerpt: "Your breath is the foundation of movement quality. Learn why proper breathing mechanics matter more than you think.",
    ogImage: "studio-floor-exercise.jpg",
    author: "Coach Nick",
    publishedAt: "2025-06-08",
  },
  "what-makes-drake-fitness-different-from-charleston-gyms": {
    title: "Charleston's Best Gym: 5 Reasons to Choose Drake | Drake Fitness",
    excerpt: "A transparent look at our unique approach to coaching, programming, and member experience.",
    ogImage: "studio-full-view.jpg",
    author: "Coach Drake",
    publishedAt: "2025-05-14",
  },
  "how-much-time-do-i-really-need": {
    title: "3 Hours/Week to Results: Realistic Fitness Guide | Drake Fitness",
    excerpt: "Realistic expectations for time commitment and how to make consistent progress with a demanding schedule.",
    ogImage: "blog-kettlebell-overhead-group.jpg",
    author: "Coach Drake",
    publishedAt: "2025-04-22",
  },
  "what-real-strength-actually-means": {
    title: "Real Strength Explained: Ultimate Guide (2025) | Drake Fitness",
    excerpt: "It's Not What Most People Think",
    ogImage: "studio-group-overhead.jpg",
    author: "Coach Drake",
    publishedAt: "2025-12-10",
  },
  "the-power-of-pressing-reset": {
    title: "The Power of Pressing Reset: Mobility Warm-Up Guide (2025) | Drake Fitness",
    excerpt: "How our signature warm-up circuit activates your nervous system and prepares your body to train with purpose.",
    ogImage: "studio-floor-exercise.jpg",
    author: "Coach Drake",
    publishedAt: "2025-05-15",
  },
};

const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';
const SITE_URL = 'https://drake.fitness';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    // Extract slug from path: /og-redirect/insights/SLUG or /og-redirect/SLUG
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Remove "og-redirect" prefix
    const funcIndex = pathParts.indexOf('og-redirect');
    const remainingParts = pathParts.slice(funcIndex + 1);
    
    // Handle /insights/slug or just /slug
    let slug: string | undefined;
    if (remainingParts[0] === 'insights' && remainingParts[1]) {
      slug = remainingParts[1];
    } else if (remainingParts[0]) {
      slug = remainingParts[0];
    }

    const post = slug ? blogPosts[slug] : undefined;
    
    if (!post || !slug) {
      // Redirect to main insights page
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${SITE_URL}/insights` },
      });
    }

    const canonicalUrl = `${SITE_URL}/insights/${slug}`;
    const ogImageUrl = `${BLOG_IMAGE_BASE}/${post.ogImage}`;

    // Return minimal HTML with correct OG tags, then redirect via JS
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)}</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:site_name" content="Drake Fitness">
  <meta property="article:published_time" content="${post.publishedAt}">
  <meta property="article:author" content="${escapeHtml(post.author)}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${ogImageUrl}">

  <!-- Redirect real users to the actual page -->
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
</head>
<body>
  <p>Redirecting to <a href="${canonicalUrl}">${escapeHtml(post.title)}</a>...</p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
