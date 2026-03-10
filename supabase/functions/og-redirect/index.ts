import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';
const SITE_URL = 'https://drake.fitness';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Static OG metadata for non-blog pages
const STATIC_PAGES: Record<string, { title: string; description: string; image?: string }> = {
  '/': {
    title: 'Drake Fitness | Gym & Mobility Training in Charleston, SC',
    description: 'Strength, mobility, and longevity training for adults 35+ in West Ashley, Charleston. Small group classes, personal coaching, and a supportive community.',
  },
  '/classes': {
    title: 'Group Fitness Classes | Drake Fitness Charleston',
    description: 'Small group strength and mobility classes in West Ashley. Kettlebells, bodyweight, and functional training for all fitness levels.',
  },
  '/coaching': {
    title: 'Personal Training Charleston SC | Drake Fitness',
    description: 'One-on-one personal training and coaching in Charleston. Customized programs for strength, mobility, and injury prevention.',
  },
  '/pricing': {
    title: 'Membership & Pricing | Drake Fitness Charleston',
    description: 'Flexible membership options for group classes and personal training. No long-term contracts. Try 3 classes free.',
  },
  '/about': {
    title: 'About Drake Fitness | Our Story & Coaches',
    description: 'Meet David Drake & Misty Lister. Learn about our evidence-based approach to strength and mobility training in Charleston, SC.',
  },
  '/schedule': {
    title: 'Class Schedule | Drake Fitness Charleston',
    description: 'View our weekly group fitness class schedule. Morning and evening classes available in West Ashley, Charleston.',
  },
  '/contact': {
    title: 'Contact Drake Fitness | Charleston, SC',
    description: 'Get in touch with Drake Fitness. Located at 2 Avondale Ave, Charleston, SC 29407. Call (843) 817-5420.',
  },
  '/faq': {
    title: 'FAQ | Drake Fitness Charleston',
    description: 'Frequently asked questions about Drake Fitness memberships, classes, and training programs.',
  },
  '/try-free-charleston': {
    title: '3-Class Intro Experience — Try Strength Training Free | Charleston, SC',
    description: 'Try 3 free classes at Drake Fitness in Charleston over 30 days. No pressure, no contracts. A smarter way to start strength training.',
  },
  '/intro': {
    title: '3-Class Intro Experience | Drake Fitness Charleston',
    description: 'Try Drake Fitness free with 3 classes over 30 days. No pressure, no contracts. Experience our strength and mobility classes in West Ashley.',
  },
  '/success-stories': {
    title: 'Success Stories | Drake Fitness Charleston',
    description: 'Real results from real members. See how Drake Fitness has helped Charleston adults get stronger, move better, and live pain-free.',
  },
  '/insights': {
    title: 'Training Insights & Blog | Drake Fitness',
    description: 'Expert articles on strength training, mobility, longevity, and fitness for adults 35+. Evidence-based guidance from Charleston coaches.',
  },
  '/intro': {
    title: '3-Class Intro Experience | Drake Fitness Charleston',
    description: 'Try Drake Fitness free with 3 classes over 30 days. No pressure, no contracts. Experience our strength and mobility classes in West Ashley.',
  },
  '/strength-training-charleston': {
    title: 'Mobility & Strength Training in Charleston, SC | Drake Fitness',
    description: "Train smarter, move better, and get strong without pain. Charleston's premier mobility and strength training studio. Try 3 classes free.",
  },
  '/west-ashley-fitness': {
    title: 'West Ashley Fitness Studio | Drake Fitness Charleston',
    description: 'Small group strength and mobility training in West Ashley, Charleston. Located at 2 Avondale Ave. Try 3 classes free.',
  },
  '/low-impact-fitness-charleston': {
    title: 'Low Impact Fitness Charleston SC | Drake Fitness',
    description: 'Joint-friendly strength and mobility training in Charleston. Build strength without pain. Perfect for adults 35+ and injury recovery.',
  },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const funcIndex = pathParts.indexOf('og-redirect');
    const remainingParts = pathParts.slice(funcIndex + 1);

    // Reconstruct the page path
    const pagePath = '/' + remainingParts.join('/');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Look up custom OG image for this path
    const { data: customOg } = await supabase
      .from('page_og_images')
      .select('image_filename')
      .eq('path', pagePath)
      .single();

    const customOgUrl = customOg
      ? `${supabaseUrl}/storage/v1/object/public/og-images/${customOg.image_filename}`
      : null;

    // Check static pages first
    const staticMeta = STATIC_PAGES[pagePath];
    if (staticMeta) {
      return buildHtmlResponse(
        staticMeta.title,
        staticMeta.description,
        `${SITE_URL}${pagePath === '/' ? '' : pagePath}`,
        customOgUrl || staticMeta.image || DEFAULT_OG_IMAGE
      );
    }

    // Check for blog post: /insights/:slug
    if (remainingParts[0] === 'insights' && remainingParts[1]) {
      const slug = remainingParts[1];

      const { data: post } = await supabase
        .from('blog_posts')
        .select('title, seo_title, excerpt, og_image, author, published_at')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (post) {
        const canonicalUrl = `${SITE_URL}/insights/${slug}`;
        const ogImageUrl = `${BLOG_IMAGE_BASE}/${post.og_image}`;
        const displayTitle = post.seo_title || post.title;
        const authorName = post.author === 'david' ? 'Coach Drake' : 'Coach Misty';

        return buildHtmlResponse(
          displayTitle,
          post.excerpt,
          canonicalUrl,
          customOgUrl || ogImageUrl,
          {
            type: 'article',
            publishedAt: post.published_at,
            author: authorName,
          }
        );
      }
    }

    // Fallback: redirect to homepage
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: SITE_URL },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildHtmlResponse(
  title: string,
  description: string,
  canonicalUrl: string,
  imageUrl: string,
  article?: { type: string; publishedAt: string; author: string }
): Response {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const ogType = article ? 'article' : 'website';

  const articleTags = article
    ? `
  <meta property="article:published_time" content="${article.publishedAt}">
  <meta property="article:author" content="${escapeHtml(article.author)}">`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Drake Fitness">${articleTags}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${imageUrl}">
</head>
<body>
  <p>Redirecting to <a href="${canonicalUrl}">${safeTitle}</a>...</p>
  <script>window.location.replace("${canonicalUrl}")</script>
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
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
