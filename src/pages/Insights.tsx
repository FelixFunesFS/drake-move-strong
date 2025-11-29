import { useState } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import InsightCard from "@/components/insights/InsightCard";
import { insightPosts } from "@/data/insights";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import heroImage from "@/assets/hero-coaching-session.jpg";

type CategoryFilter = 'all' | 'strength' | 'movement' | 'purpose';

const Insights = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredPosts = activeCategory === 'all'
    ? insightPosts
    : insightPosts.filter(post => post.category === activeCategory);

  const featuredPost = insightPosts.find(post => post.featured);

  return (
    <>
      <Helmet>
        <title>Move Better Insights | Drake Fitness Charleston</title>
        <meta 
          name="description" 
          content="Expert insights on strength, movement, and purpose from Drake Fitness coaches. Learn how to move better and live better through functional training and mobility work." 
        />
      </Helmet>

      <Hero
        title="Move Better Insights"
        subtitle="Expert guidance on strength, movement, and purpose from our coaching team"
        backgroundImages={[heroImage]}
      />

      {/* Category Filters */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(['all', 'strength', 'movement', 'purpose'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category === 'all' ? 'All Insights' : category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {activeCategory === 'all' && featuredPost && (
            <AnimatedSection animation="fadeInUp" className="mb-16">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                  Featured
                </p>
                <InsightCard post={featuredPost} />
              </div>
            </AnimatedSection>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedSection
                key={post.id}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <InsightCard post={post} />
              </AnimatedSection>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No posts found in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Ready to Move Better?"
        title="Start Your Journey Today"
        subtitle="Experience expert coaching that helps you build strength, improve movement, and find purpose in your training."
        ctaText="Book Free Assessment"
        ctaLink="/contact"
        variant="primary"
      />
    </>
  );
};

export default Insights;
