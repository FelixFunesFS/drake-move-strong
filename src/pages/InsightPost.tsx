import { useParams, Navigate, Link } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { insightPosts, authorInfo, categoryInfo } from "@/data/insights";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import BlogArticleCard from "@/components/insights/BlogArticleCard";
import { blogContentMap } from "@/components/insights/BlogContentComponents";
import { SEO } from "@/components/SEO";
import { StructuredData, buildArticleSchema } from "@/components/StructuredData";
import { format } from "date-fns";
import AnimatedSection from "@/components/AnimatedSection";
import SocialShareButtons from "@/components/insights/SocialShareButtons";

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = insightPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  const author = authorInfo[post.author];
  const relatedPosts = insightPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.category === post.category || p.featured)
    .slice(0, 3);

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    author: author.name,
    publishedAt: post.publishedAt,
    thumbnail: post.thumbnail,
    url: `https://drake.fitness/insights/${post.slug}`
  });

  // Get the custom content component for this article
  const CustomContent = slug ? blogContentMap[slug] : null;

  return (
    <>
      <SEO
        title={post.title}
        seoTitle={post.seoTitle}
        description={post.excerpt}
        canonical={`https://drake.fitness/insights/${post.slug}`}
        ogType="article"
        article={{ publishedAt: post.publishedAt, author: author.name }}
      />
      <StructuredData data={articleSchema} />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary/95" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-center py-24 md:py-32">
          <div className="inline-block px-4 py-2 bg-drake-gold/20 border border-drake-gold rounded-full mb-6">
            <span className="text-drake-gold font-bold uppercase tracking-wider text-sm">
              {categoryInfo[post.category].name}
            </span>
          </div>
          <h1 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 uppercase tracking-tight max-w-5xl mx-auto">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-drake-gold" />
              <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-drake-gold" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-drake-gold" />
              <span>{categoryInfo[post.category].name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back to All Articles */}
          <div className="mb-8 pb-6 border-b border-border">
            <Link 
              to="/insights" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </div>

          {/* Render custom content component if available, otherwise use HTML fallback */}
          {CustomContent ? (
            <CustomContent />
          ) : (
            <>
              {/* Featured Image */}
              <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>

              {/* Video Embed (if available) */}
              {post.videoId && (
                <div className="mb-16">
                  <div className="bg-foreground rounded-2xl overflow-hidden shadow-2xl">
                    <YouTubeEmbed videoId={post.videoId} title={post.title} />
                    <div className="p-6 bg-foreground text-white">
                      <p className="text-gray-300 leading-relaxed">
                        Watch: Understanding the concepts discussed in this article.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content - HTML fallback for posts without custom components */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-hero prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-ul:my-6 prose-li:text-muted-foreground prose-li:mb-2 prose-li:text-lg
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-blockquote:bg-muted prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-drake-gold prose-blockquote:not-italic prose-blockquote:text-lg prose-blockquote:text-muted-foreground
                  [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:leading-relaxed [&_.lead]:mb-8
                  [&_.key-insight]:bg-background [&_.key-insight]:border-2 [&_.key-insight]:border-primary [&_.key-insight]:rounded-2xl [&_.key-insight]:p-8 [&_.key-insight]:my-8
                  [&_.key-insight_h3]:flex [&_.key-insight_h3]:items-center [&_.key-insight_h3]:gap-3 [&_.key-insight_h3]:text-foreground [&_.key-insight_h3]:mb-4
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Buttons - After Content */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Share this article:</p>
            <SocialShareButtons 
              url={`https://drake.fitness/insights/${post.slug}`}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-16 bg-muted rounded-2xl p-8">
            <div className="flex items-start gap-6">
              <img 
                src={author.image} 
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-hero font-bold text-xl uppercase mb-1">{author.name}</h3>
                <p className="text-primary font-medium mb-3">{author.title}</p>
                <p className="text-muted-foreground leading-relaxed">{author.bio}</p>
              </div>
            </div>
          </div>

          {/* CTA Box - Only show for posts without custom content components */}
          {!CustomContent && (
            <div className="mt-16 bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl p-10 md:p-12 text-center">
              <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">Ready to Train the Right Way?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Reset Week is where it starts. No pressure. No contracts. Just smart training that actually works for bodies over 40.
              </p>
              <Link 
                to="/reset-week-charleston"
                className="inline-flex items-center px-10 py-5 bg-drake-gold text-foreground font-bold text-lg rounded hover:bg-drake-gold/90 transition-all transform hover:-translate-y-1 shadow-xl uppercase tracking-wide"
              >
                <ArrowRight className="mr-2 w-5 h-5" /> Start Your Reset Week
              </Link>
              <p className="text-gray-300 mt-6 text-sm">Charleston, SC • Limited Spots Available</p>
            </div>
          )}

        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase">Continue Reading</h2>
              <p className="text-muted-foreground text-lg">More insights on training smarter, not harder</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <AnimatedSection key={relatedPost.id} animation="fadeInUp" delay={index * 0.1}>
                  <BlogArticleCard post={relatedPost} variant="default" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground text-white rounded-3xl p-10 md:p-12 text-center">
            <div className="w-20 h-20 bg-drake-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-hero text-3xl md:text-4xl font-bold mb-4 uppercase">Get Training Insights in Your Inbox</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Charleston members who receive weekly tips on training smarter, moving better, and staying pain-free.
            </p>
            <form className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-drake-gold" 
                />
                <button 
                  type="submit" 
                  className="px-8 py-4 bg-drake-gold text-foreground font-bold rounded-lg hover:bg-drake-gold/90 transition-colors uppercase tracking-wide whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightPost;
