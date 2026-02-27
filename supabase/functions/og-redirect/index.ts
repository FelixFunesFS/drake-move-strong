import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';
const SITE_URL = 'https://drake.fitness';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const funcIndex = pathParts.indexOf('og-redirect');
    const remainingParts = pathParts.slice(funcIndex + 1);
    
    let slug: string | undefined;
    if (remainingParts[0] === 'insights' && remainingParts[1]) {
      slug = remainingParts[1];
    } else if (remainingParts[0]) {
      slug = remainingParts[0];
    }

    if (!slug) {
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${SITE_URL}/insights` },
      });
    }

    // Query blog_posts table
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, seo_title, excerpt, og_image, author, published_at')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (!post) {
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${SITE_URL}/insights` },
      });
    }

    const canonicalUrl = `${SITE_URL}/insights/${slug}`;
    const ogImageUrl = `${BLOG_IMAGE_BASE}/${post.og_image}`;
    const displayTitle = escapeHtml(post.seo_title || post.title);
    const authorName = post.author === 'david' ? 'Coach Drake' : 'Coach Nick';

    // Return HTML with OG tags + JS redirect (not meta refresh)
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${displayTitle}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:site_name" content="Drake Fitness">
  <meta property="article:published_time" content="${post.published_at}">
  <meta property="article:author" content="${escapeHtml(authorName)}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${displayTitle}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${ogImageUrl}">

  <!-- JS redirect prevents crawlers from following -->
  <script>window.location.replace("${canonicalUrl}");</script>
</head>
<body>
  <p>Redirecting to <a href="${canonicalUrl}">${displayTitle}</a>...</p>
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
