import { useParams, Navigate, Link } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowRight, Check, Lightbulb, AlertTriangle, Footprints, Wind, Dumbbell, RotateCcw, MessageCircle, CheckCircle2 } from "lucide-react";
import { insightPosts, authorInfo, categoryInfo } from "@/data/insights";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import BlogArticleCard from "@/components/insights/BlogArticleCard";
import { SEO } from "@/components/SEO";
import { StructuredData, buildArticleSchema } from "@/components/StructuredData";
import { format } from "date-fns";
import AnimatedSection from "@/components/AnimatedSection";

// Import blog hero image
import blogTraditionalWorkoutsHero from "@/assets/blog-traditional-workouts-hero.jpg";

const categoryBadgeConfig = {
  education: "bg-blue-600",
  trust: "bg-green-600",
  conversion: "bg-amber-600",
};

// Map for dynamically imported thumbnails
const thumbnailMap: Record<string, string> = {
  '@/assets/blog-traditional-workouts-hero.jpg': blogTraditionalWorkoutsHero,
};

const getThumbnail = (thumbnail: string) => {
  return thumbnailMap[thumbnail] || thumbnail;
};

// Specialized component for "Why Traditional Workouts" article
const WhyTraditionalWorkoutsContent = () => {
  return (
    <>
      {/* Intro Section */}
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          If you've been training for years and suddenly feel like your body isn't responding the way it used to, you're not alone. After 40, the rules change — but most gyms keep teaching the same playbook.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          High-intensity workouts that once made you feel invincible now leave you sore, stiff, and exhausted. Recovery takes longer. Joints ache. And the results you used to see? They've slowed down or stopped entirely.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The problem isn't your effort. It's the approach. Let's talk about why traditional workouts fail after 40 — and what actually works instead.
        </p>
      </div>

      {/* Featured Image */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={blogTraditionalWorkoutsHero}
          alt="Mature adult training with proper form and mobility focus in Charleston fitness studio"
          className="w-full h-auto max-h-96 object-cover"
        />
      </div>

      {/* Section 1: The Intensity Trap */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Intensity Trap: Why "Go Hard or Go Home" Stops Working
        </h2>
        
        {/* Quote Block */}
        <div className="bg-muted p-8 rounded-2xl mb-8 border-l-4 border-drake-gold">
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "I used to crush myself in the gym. Now, crushing myself just crushes me."
          </p>
          <p className="text-sm text-muted-foreground/70 mt-3">— Common sentiment from members over 40</p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          In your 20s and 30s, your body could handle almost anything. You could train hard, recover fast, and push through soreness without much consequence. But after 40, your body's recovery systems slow down. Hormones shift. Connective tissue becomes less forgiving.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Traditional high-intensity training assumes your body can absorb endless stress and bounce back quickly. When that's no longer true, those workouts don't build you up — they break you down.
        </p>

        {/* Key Insight Box */}
        <div className="bg-background border-2 border-primary rounded-2xl p-8 mb-8">
          <h3 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase flex items-center gap-3">
            <div className="w-10 h-10 bg-drake-gold rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-foreground" />
            </div>
            The Key Insight
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Intensity without intention creates fatigue, not fitness. What you need is strategic training that respects your body's current capacity while still challenging it to grow.
          </p>
        </div>
      </div>

      {/* Section 2: What Your Body Actually Needs */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What Your Body Actually Needs After 40
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The shift isn't about doing less — it's about doing what matters more. Your body still needs challenge, but the type of challenge changes.
        </p>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-muted p-8 rounded-xl border-2 border-transparent hover:border-primary transition-colors">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Footprints className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-hero text-xl font-bold mb-3 uppercase">1. Movement Quality First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Before adding weight or speed, ensure your joints move well and your body can control the ranges of motion you're asking it to perform.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-xl border-2 border-transparent hover:border-primary transition-colors">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Wind className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-hero text-xl font-bold mb-3 uppercase">2. Breathing Mechanics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Proper breathing creates core stability and allows your body to handle load without compensation. Most people skip this entirely.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-xl border-2 border-transparent hover:border-primary transition-colors">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-hero text-xl font-bold mb-3 uppercase">3. Progressive Loading</h3>
            <p className="text-muted-foreground leading-relaxed">
              Strength still matters — but it needs to be built on a foundation of control. Load comes after movement quality is established.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-xl border-2 border-transparent hover:border-primary transition-colors">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <RotateCcw className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-hero text-xl font-bold mb-3 uppercase">4. Recovery Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Training is stress. Recovery is adaptation. Without intentional recovery, you're just accumulating fatigue.
            </p>
          </div>
        </div>

        {/* Bottom Line Callout */}
        <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            <strong className="text-foreground">Bottom line:</strong> Your body still wants to get stronger. But it needs a smarter path to get there — one that prioritizes longevity over short-term intensity.
          </p>
        </div>
      </div>

      {/* Section 3: The Three Phases */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Three Phases of Smart Training
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          At Drake Fitness, we structure training around three progressive phases. Most gyms skip straight to Phase 3 — which is why people get hurt or burn out.
        </p>

        {/* Phase Cards */}
        <div className="space-y-8">
          <div className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary transition-colors">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-hero text-2xl font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-hero text-2xl font-bold text-foreground mb-3 uppercase">Phase 1: Reset & Restore</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This is where Reset Week lives. We restore joint mobility, teach proper breathing patterns, and rebuild movement foundations. No heavy weights. No exhausting circuits. Just intentional, controlled movement.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <ArrowRight className="w-4 h-4" />
                  <span>Duration: 1-2 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary transition-colors">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-hero text-2xl font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-hero text-2xl font-bold text-foreground mb-3 uppercase">Phase 2: Build Control</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once movement quality is established, we introduce load — but with strict control. This phase teaches your body to handle resistance without compensation. Tempo matters more than weight.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <ArrowRight className="w-4 h-4" />
                  <span>Duration: 4-6 weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary transition-colors">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-hero text-2xl font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-hero text-2xl font-bold text-foreground mb-3 uppercase">Phase 3: Express Strength</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Now you're ready for intensity. With a solid foundation, your body can handle heavier loads, faster movements, and more complex training — without breaking down.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <ArrowRight className="w-4 h-4" />
                  <span>Duration: Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-10 bg-foreground text-white p-10 rounded-2xl">
          <h3 className="font-hero text-2xl font-bold mb-4 uppercase flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-drake-gold" />
            Why Most Gyms Skip This Process
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Because it's slower. It's less flashy. And it requires actual coaching — not just supervision. But skipping these phases is why people end up injured, frustrated, or stuck.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We'd rather take the time to do it right than rush you into workouts your body isn't ready for.
          </p>
        </div>
      </div>

      {/* Section 4: Real Life Example */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What This Looks Like in Real Life
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Let's make this concrete. Here's what a typical member experiences when they start training the right way after years of traditional workouts.
        </p>

        {/* Testimonial Box */}
        <div className="bg-muted rounded-2xl p-10 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-hero text-2xl font-bold text-primary">S</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Sarah, 47 — Charleston, SC</h3>
              <p className="text-muted-foreground italic">"I thought I was just getting old. Turns out, I was just training wrong."</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Week 1-2 (Reset Week)</p>
                <p className="text-muted-foreground">Sarah learned how to breathe properly, restored shoulder and hip mobility, and practiced foundational movements without any pain.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Week 3-8 (Build Control)</p>
                <p className="text-muted-foreground">We introduced kettlebells, bodyweight strength work, and loaded carries — all with strict form and tempo control. Her back pain disappeared.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Week 9+ (Express Strength)</p>
                <p className="text-muted-foreground">Now Sarah deadlifts, presses, and swings kettlebells with confidence. She's stronger than she was at 35 — and pain-free.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-drake-gold/10 border border-drake-gold rounded-2xl p-8">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            <strong className="text-foreground">This isn't magic.</strong> It's just respecting the process. When you give your body what it actually needs — not what fitness trends say you should do — results follow.
          </p>
        </div>
      </div>

      {/* Section 5: Common Objections */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Common Objections (And The Truth)
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We hear these concerns all the time. Let's address them directly.
        </p>

        <div className="space-y-6">
          <div className="bg-background border-2 border-border rounded-xl p-8">
            <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-drake-gold" />
              "I don't have time to go slow. I need results now."
            </h3>
            <p className="text-muted-foreground leading-relaxed pl-9">
              Going slow at the start actually gets you results faster. Skipping the foundation means you'll hit a wall sooner — or worse, get injured and have to start over. Smart training is faster than reckless training.
            </p>
          </div>

          <div className="bg-background border-2 border-border rounded-xl p-8">
            <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-drake-gold" />
              "I'm not that out of shape. Can't I just jump into regular classes?"
            </h3>
            <p className="text-muted-foreground leading-relaxed pl-9">
              Maybe. But most people overestimate their movement quality. Reset Week isn't about fitness level — it's about movement literacy. Even experienced lifters benefit from revisiting the basics.
            </p>
          </div>

          <div className="bg-background border-2 border-border rounded-xl p-8">
            <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-drake-gold" />
              "Won't this be too easy? I like feeling challenged."
            </h3>
            <p className="text-muted-foreground leading-relaxed pl-9">
              Controlling movement is harder than it looks. Most people discover muscles they didn't know they had. And once you've built the foundation, the challenge comes — but in a way your body can actually handle.
            </p>
          </div>

          <div className="bg-background border-2 border-border rounded-xl p-8">
            <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-drake-gold" />
              "I've tried everything. Why would this be different?"
            </h3>
            <p className="text-muted-foreground leading-relaxed pl-9">
              Because most programs focus on what you do, not how you do it. We focus on movement quality, breathing mechanics, and progressive loading. That's not trendy — but it works.
            </p>
          </div>
        </div>
      </div>

      {/* Section 6: The Bottom Line */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Bottom Line
        </h2>

        <div className="bg-foreground text-white rounded-2xl p-10 mb-8">
          <p className="text-xl leading-relaxed mb-6">
            Traditional workouts stop working after 40 because they're built for recovery systems you no longer have. The solution isn't to push harder — it's to train smarter.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            You don't need more intensity. You need better movement, proper breathing, and progressive loading that respects where your body is right now.
          </p>
          <p className="text-xl leading-relaxed font-bold text-drake-gold">
            That's what Reset Week teaches. And that's why it works.
          </p>
        </div>

        {/* 3-Item Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Movement Quality</h3>
            <p className="text-muted-foreground text-sm">Over intensity</p>
          </div>

          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Progressive Loading</h3>
            <p className="text-muted-foreground text-sm">Over random workouts</p>
          </div>

          <div className="bg-muted p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Coaching</h3>
            <p className="text-muted-foreground text-sm">Over crowd control</p>
          </div>
        </div>
      </div>
    </>
  );
};

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

  // Check if this is a specialized article with custom content
  const isWhyTraditionalWorkouts = slug === 'why-traditional-workouts-stop-working-after-40';

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`https://drake.fitness/insights/${post.slug}`}
        ogType="article"
        article={{ publishedAt: post.publishedAt, author: author.name }}
      />
      <StructuredData data={articleSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 z-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
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
          
          {/* Render specialized content for specific articles */}
          {isWhyTraditionalWorkouts ? (
            <WhyTraditionalWorkoutsContent />
          ) : (
            <>
              {/* Featured Image */}
              <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={getThumbnail(post.thumbnail)}
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

              {/* Article Content - fallback for other posts */}
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

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl p-10 md:p-12 text-center">
            <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">Ready to Train the Right Way?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Reset Week is where it starts. No pressure. No contracts. Just smart training that actually works for bodies over 40.
            </p>
            <Link 
              to="/reset-week"
              className="inline-flex items-center px-10 py-5 bg-drake-gold text-foreground font-bold text-lg rounded hover:bg-drake-gold/90 transition-all transform hover:-translate-y-1 shadow-xl uppercase tracking-wide"
            >
              <ArrowRight className="mr-2 w-5 h-5" /> Start Your Reset Week
            </Link>
            <p className="text-gray-300 mt-6 text-sm">Charleston, SC • Limited Spots Available</p>
          </div>

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