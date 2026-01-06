import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// Reusable schema builders
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "name": "Drake Fitness",
  "image": "https://drake.fitness/og-image.jpg",
  "url": "https://drake.fitness",
  "telephone": "(843) 817-5420",
  "email": "ddrake311@gmail.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2 Avondale Ave",
    "addressLocality": "Charleston",
    "addressRegion": "SC",
    "postalCode": "29407",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.7876",
    "longitude": "-79.9877"
  },
  "sameAs": [
    "https://www.instagram.com/drakefitnesschs/",
    "https://www.facebook.com/profile.php?id=100063722011333"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "31",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ]
};

export const buildFAQSchema = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});

export const buildArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.thumbnail,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Drake Fitness",
    "logo": {
      "@type": "ImageObject",
      "url": "https://drake.fitness/logo.png"
    }
  },
  "datePublished": article.publishedAt,
  "dateModified": article.publishedAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});
