import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  seoTitle?: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedAt: string;
    author: string;
  };
}

export function SEO({
  title,
  seoTitle,
  description,
  canonical = 'https://drake.fitness',
  ogImage = 'https://drake.fitness/og-image.jpg',
  ogType = 'website',
  article,
}: SEOProps) {
  // Use seoTitle for meta tags if available, otherwise fall back to title
  const metaTitle = seoTitle || title;
  const fullTitle = metaTitle.includes('Drake Fitness') ? metaTitle : `${metaTitle} | Drake Fitness`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Article Meta (if applicable) */}
      {article && <meta property="article:published_time" content={article.publishedAt} />}
      {article && <meta property="article:author" content={article.author} />}
    </Helmet>
  );
}
