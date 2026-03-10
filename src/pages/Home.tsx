import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, Navigation } from "lucide-react";
import { GoogleReviewsBadge, GOOGLE_REVIEWS } from "@/components/GoogleReviewsBadge";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import TrustStatsBar from "@/components/TrustStatsBar";
import LongevityBlock from "@/components/LongevityBlock";
import { INTRO_URL } from "@/data/pricing";
// WebP hero images with responsive sizes
import heroImage1Desktop from "@/assets/hero-group-turkish-getup.jpg?format=webp&w=1920";
import heroMobileImage from "@/assets/hero-mobile-kb-press.jpg?format=webp&w=768";

import davidCoach from "@/assets/david-goblet-squat-kb-rack.jpg?format=webp&w=768";
import coachMisty from "@/assets/coach-misty-lister.png?format=webp&w=768";
import startHereImage from "@/assets/outdoor-sandbag-training.jpg?format=webp&w=768";
import Marquee from "@/components/Marquee";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
import TestimonialCard from "@/components/TestimonialCard";
import { getStaggerDelay } from "@/lib/motionConfig";
import CommunityReasonsSection from "@/components/CommunityReasonsSection";
import { FEATURED_REVIEWS } from "@/data/reviews";
import { TodayClassesBanner } from "@/components/schedule/TodayClassesBanner";
// New authentic training photos
import groupOverheadPressClass from "@/assets/group-overhead-press-class.jpg?format=webp&w=768";

import communityTurkishGetupClass from "@/assets/community-turkish-getup-class.jpg?format=webp&w=768";
import communityKettlebellRackPair from "@/assets/community-plank-rows-kettlebells-new.jpg?format=webp&w=768";
import communityGroupClass from "@/assets/community-group-class.jpg?format=webp&w=768";
interface HomeProps {
  bannerVisible?: boolean;
}

const Home = ({ bannerVisible = false }: HomeProps) => {
  return <>
      <SEO title="Drake Fitness Charleston | Gym & Mobility Training | Try 3 Classes Free" description="Charleston's coach-led gym for functional strength, mobility, and group fitness classes. Small groups, 25+ years experience. Try 3 classes free." canonical="https://drake.fitness" />
      <StructuredData data={localBusinessSchema} />
      
      <main>
      <Hero 
        bannerVisible={bannerVisible}
        fullViewport={true}
        imagePositionMobile="center 40%"
        eyebrow={
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            Avondale • West Ashley • Charleston
          </span>
} title={<>Move Better.<br /><span className="text-accent drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Live Stronger.</span><br />Stay Pain-Free.</>} subtitle="Try 3 classes free — experience small-group, mobility-first training at Drake Fitness in Avondale. No commitment, no cost." primaryCTA={{
        text: "Try 3 Classes Free",
        link: "#intro-experience"
      }} secondaryCTA={{
        text: "View Schedule",
        link: "/schedule"
      }} backgroundImages={[heroImage1Desktop]} backgroundImagesMobile={[heroMobileImage]} autoRotate={false} />

      {/* Brand Values Marquee */}
      <section className="py-4 md:py-6 bg-drake-dark overflow-hidden border-y border-drake-gold/20">
        <Marquee speed="slow" gradient={false} pauseOnHover={false}>
          {["SMALL GROUP COACHING", "KETTLEBELL & MACE SPECIALISTS", "CORRECTIVE EXERCISE", "JOINT-FRIENDLY TRAINING", "25+ YEARS EXPERIENCE", "AVONDALE • WEST ASHLEY • CHARLESTON"].map((text, i) => <span key={i} className="text-xl sm:text-2xl md:text-4xl font-hero font-bold text-drake-gold uppercase px-4 sm:px-6 md:px-8 whitespace-nowrap flex items-center">
              {text}
              <span className="text-white/40 mx-4 md:mx-6">•</span>
            </span>)}
        </Marquee>
      </section>

      {/* Today's Classes Banner - After Marquee on all devices */}
      <div className="md:hidden">
        <TodayClassesBanner />
      </div>

      {/* START HERE - 3-Class Intro Experience */}
      <section id="intro-experience" className="py-16 md:py-24 bg-muted scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-none shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <AnimatedSection animation="slideInLeft" className="p-8 md:p-8 lg:p-12">
                <p className="section-eyebrow text-primary mb-4">TRY US FREE</p>
                <h2 className="font-hero text-3xl md:text-3xl lg:text-4xl font-bold mb-6 uppercase leading-tight">
                  If You Feel Stiff, Achy, or Out of Shape...<br />
                  <span className="text-primary">You're in the Right Place.</span>
                </h2>
                <p className="text-lg mb-6 text-muted-foreground">We specialize in helping:</p>
                <ul className="space-y-2 md:space-y-2 mb-6 md:mb-6 lg:mb-8">
                  {["Adults 30–65 with limited time", "Desk workers with back/hip stiffness", "People returning from injury", "Anyone wanting long-term, pain-free strength"].map((item, index) => <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-base">{item}</span>
                    </li>)}
                </ul>

                {/* How It Works Steps */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="font-hero text-sm font-bold uppercase text-primary mb-3">How It Works</p>
                  <div className="space-y-2">
                    {[
                      { step: "1", text: "Claim your free pass below" },
                      { step: "2", text: "Pick a Strength & Mobility class (KB Strong) — Mon/Wed/Fri 8am or 11am, Thu 6pm" },
                      { step: "3", text: "Show up — we handle the rest" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{item.step}</span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Class Intro Card */}
                <div className="bg-muted border border-border rounded-xl p-4 md:p-4 lg:p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-hero font-bold text-primary">FREE</span>
                    <span className="text-muted-foreground text-lg">3 classes / 30 days</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "3 small-group classes free",
                      "30 days from your first visit to use all 3",
                      "Expert, joint-friendly coaching on kettlebells & movement",
                      "No commitment required"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="w-full px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-base min-h-[48px]">
                    <a href={INTRO_URL} target="_blank" rel="noopener noreferrer" className="text-center">Claim Your 3 Free Classes</a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Love it? Get your first month for $110 (50% off) when you join within 7 days of your 3rd class.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slideInRight" delay={0.1} className="relative h-full min-h-[400px] md:min-h-[500px] hidden md:block">
                <OptimizedImage src={startHereImage} alt="Personal coaching session at Drake Fitness" className="h-full w-full" aspectRatio="auto" />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <AnimatedSection animation="fadeInUp">
        <TrustStatsBar variant="horizontal" stats={['sessions', 'charlestonians', 'experience', 'rating']} className="border-y border-border" />
      </AnimatedSection>

      {/* Testimonial Carousel */}
      <AnimatedSection animation="fadeInUp">
        <TestimonialCard testimonials={[
          ...FEATURED_REVIEWS.map(r => ({ quote: r.quote, author: r.name, result: r.result })),
          { quote: "I'm stronger in my 40s than ever before… His knowledge and adaptability have made a significant impact.", author: "Aaron Q.", result: "Stronger than ever at 40+" },
          { quote: "The coaches are incredibly attentive, they watch your form, make adjustments, and explain why certain movements matter.", author: "Felix F." },
          { quote: "Better than any physical therapist or personal trainer I've ever had.", author: "Cara S.", result: "Expert coaching" },
        ]} />
      </AnimatedSection>

      {/* Community + Reasons Section */}
      <CommunityReasonsSection
        images={{
          turkishGetup: communityTurkishGetupClass,
          kettlebellRack: communityKettlebellRackPair,
          overheadPress: groupOverheadPressClass,
          communityGroup: communityGroupClass,
        }}
      />

      {/* MEET THE TEAM */}
      <section className="py-16 md:py-24 bg-muted section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <p className="section-eyebrow text-primary text-center">MEET THE TEAM</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Expert Coaches with <span className="text-primary">25+ Years Experience</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Experience, Expertise & Care
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow">
                <div className="h-96 mb-4 overflow-hidden rounded-lg">
                  <OptimizedImage src={davidCoach} alt="David Drake coaching kettlebell technique" className="w-full h-full" aspectRatio="auto" />
                </div>
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">David Drake</h3>
                <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">Owner & Head Coach</p>
                <p className="text-muted-foreground mb-4">
                  With more than 25 years of training experience, a degree in Health and Exercise Science, and a career recognized early as Charleston's Best Personal Trainer, David is a master of movement and functional strength.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn More About David</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow">
                <div className="h-96 mb-4 overflow-hidden rounded-lg">
                  <OptimizedImage src={coachMisty} alt="Coach Misty Lister yoga and mobility specialist" className="w-full h-full" aspectRatio="auto" />
                </div>
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">Misty Lister</h3>
                <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">Yoga Partner · Members Save</p>
                <p className="text-muted-foreground mb-4">
                  Misty runs independent yoga classes at Drake Fitness. Drake members receive a discount on her classes.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Explore Yoga Classes</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Longevity Block - Before Final CTA */}
      <AnimatedSection animation="fadeInUp">
        <LongevityBlock />
      </AnimatedSection>

      {/* Local Trust Block */}
      <AnimatedSection animation="fadeInUp">
        <section className="py-12 bg-muted border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg">Located in Avondale, Charleston</p>
                  <p className="text-muted-foreground">2 Avondale Ave • 5 min from West Ashley</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" size="lg">
                  <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <CTASection eyebrow="GET STARTED" title="Ready to Move Better, Feel Stronger?" ctaText="Try 3 Classes Free" ctaLink={INTRO_URL} variant="primary" slanted={true} />
      </AnimatedSection>
    </main>
    </>;
};
export default Home;
