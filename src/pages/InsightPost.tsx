import { useParams, Navigate } from "react-router-dom";
import { insightPosts } from "@/data/insights";
import InsightHero from "@/components/insights/InsightHero";
import AuthorBio from "@/components/insights/AuthorBio";
import RelatedPosts from "@/components/insights/RelatedPosts";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import OptimizedImage from "@/components/OptimizedImage";
import CTASection from "@/components/CTASection";
import { SEO } from "@/components/SEO";
import { StructuredData, buildArticleSchema } from "@/components/StructuredData";

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = insightPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
    thumbnail: post.thumbnail,
    url: `https://drake.fitness/insights/${post.slug}`
  });

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`https://drake.fitness/insights/${post.slug}`}
        ogType="article"
        article={{ publishedAt: post.publishedAt, author: post.author }}
      />
      <StructuredData data={articleSchema} />

      <InsightHero post={post} />

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-8 md:mb-12">
              <OptimizedImage
                src={post.thumbnail}
                alt={post.title}
                className="rounded-xl"
                aspectRatio="video"
              />
            </div>

            {/* Video Embed (if available) */}
            {post.videoId && (
              <div className="mb-8 md:mb-12">
                <YouTubeEmbed
                  videoId={post.videoId}
                  title={post.title}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
              {/* Main Content */}
              <div className="md:col-span-2 lg:col-span-3">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-hero prose-headings:uppercase prose-headings:tracking-tight
                    prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:my-6 prose-li:text-foreground prose-li:mb-2
                    prose-strong:text-primary prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="md:col-span-1 lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <AuthorBio author={post.author} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      <RelatedPosts posts={insightPosts} currentPostId={post.id} />

      <CTASection
        eyebrow="Ready to Apply These Insights?"
        title="Train with Expert Coaching"
        subtitle="Experience personalized guidance that helps you move better and reach your goals."
        ctaText="Book Free Assessment"
        ctaLink="/contact"
        variant="primary"
      />
    </>
  );
};

export default InsightPost;
