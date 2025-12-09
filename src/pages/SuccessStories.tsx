import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import communityImage from "@/assets/community-gym-moment.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";

const SuccessStories = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: 42,
      challenge: "Chronic back pain from desk work",
      result: "Pain-free after 8 weeks",
      quote: "I used to wake up with back pain every single day. After just two months at Drake Fitness, I move better than I did in my 30s. The mobility work completely changed my life.",
      rating: 5,
    },
    {
      name: "Mike T.",
      age: 56,
      challenge: "Former athlete, multiple injuries",
      result: "Stronger and more mobile than ever",
      quote: "The coaching here is next-level. It's not just a workout — it's education, support, and real progress. David and Nick truly understand how bodies move.",
      rating: 5,
    },
    {
      name: "Jennifer L.",
      age: 38,
      challenge: "Busy mom, no fitness background",
      result: "Lost 25 lbs, gained confidence",
      quote: "I was intimidated to start, but the Foundation Flow class made it so approachable. Now I'm doing things I never thought possible. The community here is incredible.",
      rating: 5,
    },
    {
      name: "Robert K.",
      age: 61,
      challenge: "Hip replacement recovery",
      result: "Full mobility restored",
      quote: "After my hip replacement, I thought my active days were over. The 1:1 coaching helped me rebuild strength safely. Now I'm hiking again!",
      rating: 5,
    },
    {
      name: "Amanda R.",
      age: 35,
      challenge: "Postpartum recovery",
      result: "Core strength rebuilt",
      quote: "The coaches understood exactly what I needed post-pregnancy. They helped me rebuild my core safely and effectively. I feel stronger than before I had kids.",
      rating: 5,
    },
    {
      name: "David W.",
      age: 48,
      challenge: "Desk job, shoulder pain",
      result: "Pain eliminated, posture improved",
      quote: "My shoulder was so bad I couldn't lift my arm above my head. The corrective work and coaching fixed issues I'd had for years. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <>
      <SEO
        title="Success Stories & Testimonials"
        description="Read real transformation stories from Drake Fitness members in Charleston. Discover how our mobility-first approach helps people move better and live pain-free."
        canonical="https://drake.fitness/success-stories"
      />
      
      <main>
      <Hero
        eyebrow="SUCCESS STORIES"
        title="Real People. Real Results."
        subtitle="Stories of everyday adults who improved mobility, reduced pain, and built strength that changed their lives."
        backgroundImage={communityImage}
      />

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
                  <p className="font-bold text-lg">{testimonial.name}, {testimonial.age}</p>
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
        subtitle="Join us for a free mobility consultation and start your transformation."
        ctaText="Book Free Consultation"
        ctaLink="/contact"
        variant="primary"
        slanted={true}
      />
    </main>
    </>
  );
};

export default SuccessStories;
