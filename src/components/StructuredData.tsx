import { Helmet } from 'react-helmet';
import { PRICING } from '@/data/pricing';
import { FEATURED_REVIEWS, LONGEVITY_REVIEWS } from '@/data/reviews';

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
  "@id": "https://www.drake.fitness#localbusiness",
  "name": "Drake Fitness",
  "image": "https://www.drake.fitness/og-image.png",
  "url": "https://www.drake.fitness",
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
    "https://www.facebook.com/profile.php?id=100063722011333",
    "https://www.youtube.com/@Drakefitness",
    "https://maps.app.goo.gl/opeP6dqsbidbY9GZ6"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "31",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    ...FEATURED_REVIEWS.slice(0, 2),
    ...LONGEVITY_REVIEWS.slice(0, 3)
  ].map(r => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": r.name
    },
    "reviewBody": r.quote
  })),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Membership Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": PRICING.introExperience.label,
        "description": PRICING.introExperience.description,
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": PRICING.foundation.label,
        "description": PRICING.foundation.description,
        "price": String(PRICING.foundation.price),
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": PRICING.unlimited.label,
        "description": PRICING.unlimited.description,
        "price": String(PRICING.unlimited.price),
        "priceCurrency": "USD"
      }
    ]
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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.drake.fitness#organization",
  "name": "Drake Fitness",
  "url": "https://www.drake.fitness",
  "logo": "https://www.drake.fitness/images/drake-fitness-logo2.png",
  "image": "https://www.drake.fitness/og-image.png",
  "telephone": "(843) 817-5420",
  "email": "ddrake311@gmail.com",
  "founder": {
    "@type": "Person",
    "name": "David Drake",
    "jobTitle": "Owner & Head Coach"
  },
  "sameAs": [
    "https://www.instagram.com/drakefitnesschs/",
    "https://www.facebook.com/profile.php?id=100063722011333",
    "https://www.youtube.com/@Drakefitness"
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

export const buildBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
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
      "url": "https://www.drake.fitness/images/drake-fitness-logo2.png"
    }
  },
  "datePublished": article.publishedAt,
  "dateModified": article.publishedAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});
