import { useState } from "react";
import { Search, GraduationCap, ShieldCheck, Target } from "lucide-react";
import { insightPosts, categoryInfo } from "@/data/insights";
import BlogArticleCard from "@/components/insights/BlogArticleCard";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import heroImage from "@/assets/insights-hero-turkish-getup-class.jpg";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";

type CategoryFilter = 'all' | 'education' | 'trust' | 'conversion';

const categoryIcons = {
  education: GraduationCap,
  trust: ShieldCheck,
  conversion: Target,
};

const categoryColors = {
  education: { bg: "bg-blue-600", hover: "hover:bg-blue-700" },
  trust: { bg: "bg-green-600", hover: "hover:bg-green-700" },
  conversion: { bg: "bg-amber-600", hover: "hover:bg-amber-700" },
};

const Insights = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = insightPosts
    .filter(post => activeCategory === 'all' || post.category === activeCategory)
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const featuredPosts = insightPosts.filter(post => post.featured);
  
  const getPostsByCategory = (category: 'education' | 'trust' | 'conversion') => 
    insightPosts.filter(post => post.category === category);

  const getCategoryCount = (category: 'education' | 'trust' | 'conversion') =>
    insightPosts.filter(post => post.category === category).length;

  return (
    <>
      <SEO
        title="Drake Fitness Blog | Training Insights & Education"
        description="Evidence-based insights on movement, strength training, and sustainable fitness for real people. Learn from expert coaches at Drake Fitness in Charleston."
        ogImage={heroImage}
        canonical="https://drake.fitness/insights"
      />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-primary/70 z-10" />
          <img 
            src={heroImage} 
            alt="Drake Fitness Blog" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-drake-gold/20 border border-drake-gold rounded-full mb-6">
              <span className="text-drake-gold font-bold uppercase tracking-wider text-sm">Knowledge & Insights</span>
            </div>
<h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 uppercase tracking-tight">
              Drake Fitness Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Evidence-based insights on movement, strength training, and sustainable fitness for real people
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg transition-all shadow-sm ${
                  activeCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All Articles
              </button>
              {(['education', 'trust', 'conversion'] as const).map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg transition-all flex items-center gap-2 ${
                      activeCategory === category
                        ? `${categoryColors[category].bg} text-white`
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{categoryInfo[category].name}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Featured Articles */}
      {activeCategory === 'all' && searchQuery === '' && featuredPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Featured</span>
                <h2 className="font-hero text-4xl md:text-5xl font-bold text-foreground uppercase">Must-Read Articles</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredPosts.map((post, index) => (
                <AnimatedSection key={post.id} animation="fadeInUp" delay={index * 0.1}>
                  <BlogArticleCard post={post} variant="featured" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Sections (when showing all) */}
      {activeCategory === 'all' && searchQuery === '' && (
        <>
          {/* Education Articles */}
          <section className="py-20 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-hero text-4xl font-bold text-foreground uppercase">Educational Articles</h2>
                  <p className="text-muted-foreground">Learn the science and principles behind effective training</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPostsByCategory('education').slice(0, 6).map((post, index) => (
                  <AnimatedSection key={post.id} animation="fadeInUp" delay={index * 0.1}>
                    <BlogArticleCard post={post} variant="default" />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Articles */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-hero text-4xl font-bold text-foreground uppercase">Trust-Building Articles</h2>
                  <p className="text-muted-foreground">Get to know our philosophy and approach</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPostsByCategory('trust').slice(0, 6).map((post, index) => (
                  <AnimatedSection key={post.id} animation="fadeInUp" delay={index * 0.1}>
                    <BlogArticleCard post={post} variant="compact" />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Conversion Articles */}
          <section className="py-20 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center">
                  <Target className="text-white w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-hero text-4xl font-bold text-foreground uppercase">Decision Support Articles</h2>
                  <p className="text-muted-foreground">Get answers to your questions and overcome concerns</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPostsByCategory('conversion').slice(0, 6).map((post, index) => (
                  <AnimatedSection key={post.id} animation="fadeInUp" delay={index * 0.1}>
                    <BlogArticleCard post={post} variant="default" />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Filtered Results */}
      {(activeCategory !== 'all' || searchQuery !== '') && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-hero text-3xl font-bold text-foreground uppercase">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : `${categoryInfo[activeCategory as keyof typeof categoryInfo]?.name || 'All'} Articles`}
              </h2>
              <p className="text-muted-foreground mt-2">{filteredPosts.length} articles found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <AnimatedSection key={post.id} animation="fadeInUp" delay={index * 0.05}>
                  <BlogArticleCard post={post} variant="default" />
                </AnimatedSection>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found. Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Ready to Train Smarter?"
        title="Start Your Reset Week"
        subtitle="No pressure. No contracts. Just smart training that actually works for bodies over 40."
        ctaText="Start Your Reset Week"
        ctaLink="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219"
        variant="primary"
      />
    </>
  );
};

export default Insights;
