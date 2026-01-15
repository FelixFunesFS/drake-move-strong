import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import communityImage from "@/assets/community-plank-rows-kettlebells.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";
import { GoogleReviewsBadge, GOOGLE_REVIEWS } from "@/components/GoogleReviewsBadge";
import { ExternalLink } from "lucide-react";
// New authentic training photos
import communityGroupPhotoLarge from "@/assets/community-group-photo-large.jpg";
import groupPlankRowsKettlebells from "@/assets/group-plank-rows-kettlebells.jpg";
import memberLungeWithStudioDog from "@/assets/member-lunge-with-studio-dog.jpg";
import membersTurkishGetupLunge from "@/assets/members-turkish-getup-lunge.jpg";

const SuccessStories = () => {
  // Verified Google Reviews - strategically mapped for conversion
  const testimonials = [
    {
      name: "Melissa F.",
      challenge: "Chronic knee pain",
      result: "Pain-free living",
      quote: "I came in with chronic knee pain and now live pain free thanks to their guidance.",
      rating: 5,
    },
    {
      name: "Caitlin P.",
      challenge: "3 lower back surgeries",
      result: "Back to consistent training",
      quote: "I have had 3 lower back surgeries… they helped me get back to working out consistently.",
      rating: 5,
    },
    {
      name: "Aaron Q.",
      challenge: "Wanted to stay strong in 40s",
      result: "Stronger than ever",
      quote: "I'm stronger in my 40s than ever before… His knowledge and adaptability have made a significant impact.",
      rating: 5,
    },
    {
      name: "Chris P.",
      challenge: "Injury prevention focus",
      result: "Years of safe training",
      quote: "He opened my eyes on how to be strong, move properly, and avoid senseless injuries.",
      rating: 5,
    },
    {
      name: "Paul B.",
      challenge: "Inconsistent with exercise",
      result: "Daily habit formed",
      quote: "Exercise went from something I did off and on into something I look forward to every day.",
      rating: 5,
    },
    {
      name: "Cara S.",
      challenge: "Tried other trainers/PTs",
      result: "Finally found what works",
      quote: "Better than any physical therapist or personal trainer I've ever had.",
      rating: 5,
    },
  ];

  return (
    <>
      <SEO
        title="Real Member Results Charleston | 5-Star Reviews"
        description="Read real transformation stories from Drake Fitness members in Charleston. Discover how our mobility-first approach helps people move better and live pain-free."
        canonical="https://drake.fitness/success-stories"
      />
      
      <main>
      <Hero
        eyebrow="SUCCESS STORIES"
        title="Real People. Real Results."
        subtitle="Verified reviews from Drake Fitness members in Charleston who improved mobility, reduced pain, and built lasting strength."
        backgroundImage={communityImage}
      />

      {/* Google Reviews Trust Badge */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <GoogleReviewsBadge variant="full" showSupportingText />
          <a 
            href={GOOGLE_REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mt-4 underline underline-offset-2"
          >
            Read all reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-card border border-border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-drake-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Challenge:</strong> {testimonial.challenge}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    <strong>Result:</strong> {testimonial.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Real Training in Action - Masonry Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">REAL TRAINING</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Training in <span className="text-primary">Action</span>
          </h2>
          
          {/* Masonry Grid - 3 columns with varying heights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <AnimatedSection animation="scaleIn" className="md:row-span-2">
              <OptimizedImage
                src={communityGroupPhotoLarge}
                alt="Drake Fitness community group training outdoors"
                aspectRatio="portrait"
                className="rounded-lg shadow-xl h-full"
              />
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.1}>
              <OptimizedImage
                src={groupPlankRowsKettlebells}
                alt="Group plank rows with kettlebells"
                aspectRatio="video"
                className="rounded-lg shadow-xl"
              />
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.2}>
              <OptimizedImage
                src={memberLungeWithStudioDog}
                alt="Member training with studio dog nearby"
                aspectRatio="video"
                className="rounded-lg shadow-xl"
              />
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.3} className="md:col-span-2">
              <OptimizedImage
                src={membersTurkishGetupLunge}
                alt="Members practicing Turkish get-up and lunge variations"
                aspectRatio="video"
                className="rounded-lg shadow-xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">THE COMMUNITY</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Join Our <span className="text-primary">Community</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection animation="scaleIn">
              <OptimizedImage
                src={memberYoga}
                alt="Drake Fitness member practicing yoga and mobility"
                aspectRatio="portrait"
                className="rounded-lg shadow-xl"
              />
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.2}>
              <OptimizedImage
                src={communityImage}
                alt="Drake Fitness community training together"
                aspectRatio="portrait"
                className="rounded-lg shadow-xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white section-slant-top">
        <div className="container mx-auto px-4 text-center">
          <p className="section-eyebrow text-drake-gold">YOUR TURN</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">
            Your Success Story <span className="text-drake-gold">Starts Here</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            These results aren't unique — they're what happens when you commit to movement quality, expert coaching, and sustainable progress.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Write Your Own Success Story?"
        subtitle="Start with Reset Week — 7 days of unlimited classes for just $50."
        ctaText="Start Reset Week — $50"
        ctaLink="/reset-week"
        variant="primary"
        slanted={true}
      />
    </main>
    </>
  );
};

export default SuccessStories;
