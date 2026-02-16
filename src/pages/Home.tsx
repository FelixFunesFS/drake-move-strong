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
// WebP hero images with responsive sizes
import heroImage1Desktop from "@/assets/hero-group-turkish-getup.jpg?format=webp&w=1920";
import heroImage1Mobile from "@/assets/hero-group-turkish-getup.jpg?format=webp&w=768";
import davidCoach from "@/assets/david-goblet-squat-kb-rack.jpg?format=webp&w=768";
import coachNick from "@/assets/nick-holistic-coaching.jpg?format=webp&w=768";
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
import gymInteriorWide from "@/assets/gym-interior-wide.jpg?format=webp&w=1920";
import communityTurkishGetupClass from "@/assets/community-turkish-getup-class.jpg?format=webp&w=768";
import communityKettlebellRackPair from "@/assets/community-plank-rows-kettlebells-new.jpg?format=webp&w=768";
interface HomeProps {
  bannerVisible?: boolean;
}

const Home = ({ bannerVisible = false }: HomeProps) => {
  return <>
      <SEO title="Drake Fitness Charleston | Gym & Mobility Training | Proven Results" description="Charleston's coach-led gym for functional strength, mobility, and group fitness classes. Small groups, 25+ years experience. Start Reset Week — $50." canonical="https://drake.fitness" />
      <StructuredData data={localBusinessSchema} />
      
      <main>
      <Hero 
        bannerVisible={bannerVisible}
        fullViewport={true}
        eyebrow={
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            Avondale • West Ashley • Charleston
          </span>
      } title={<>Move Better.<span className="hidden sm:inline"><br /></span> <span className="text-accent">Live Stronger.</span><span className="hidden sm:inline"><br /></span> Stay Pain-Free.</>} subtitle="7-Day Mobility Reset Week: Unlimited Classes for $50. Start feeling the difference with small-group, mobility-first training at Drake Fitness in Avondale." primaryCTA={{
        text: "Start Your Reset Week for $50",
        link: "#reset-week"
      }} backgroundImages={[heroImage1Desktop]} backgroundImagesMobile={[heroImage1Mobile]} autoRotate={false} />

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
      <TodayClassesBanner />

      {/* START HERE - Moved up after Today's Classes */}
      <section id="reset-week" className="py-16 md:py-24 bg-muted scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-none shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <AnimatedSection animation="slideInLeft" className="p-8 md:p-12">
                <p className="section-eyebrow text-primary mb-4">START HERE</p>
                <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight">
                  If You Feel Stiff, Achy, or Out of Shape...<br />
                  <span className="text-primary">You're in the Right Place.</span>
                </h2>
                <p className="text-lg mb-6 text-muted-foreground">We specialize in helping:</p>
                <ul className="space-y-3 mb-8">
                  {["Adults 30–65 with limited time", "Desk workers with back/hip stiffness", "Busy parents who need flexibility & results", "Former athletes seeking longevity", "People returning from injury", "Anyone wanting long-term, pain-free strength"].map((item, index) => <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-base">{item}</span>
                    </li>)}
                </ul>
                <p className="text-base font-semibold mb-6">
                  No experience needed. No pressure. Just expert guidance.
                </p>
                {/* Reset Week Purchase Card */}
                <div className="bg-muted border border-border rounded-xl p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-hero font-bold text-primary">$50</span>
                    <span className="text-muted-foreground text-lg">for 7 days</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    {[
                      "7 days of unlimited classes",
                      "All class types: Foundation Flow, KB Strong, Mobility Reset & more",
                      "Expert, joint-friendly coaching",
                      "No commitment required"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="w-full">
                    <a href="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219" target="_blank" rel="noopener noreferrer" className="text-center">Start Your Reset Week</a>
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slideInRight" delay={0.1} className="relative h-full min-h-[400px] md:min-h-[600px]">
                <OptimizedImage src={startHereImage} alt="Personal coaching session at Drake Fitness" className="h-full w-full" aspectRatio="auto" />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* THE METHOD - Moved up after START HERE */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src={gymInteriorWide} 
            alt="" 
            className="w-full h-full object-cover"
            aspectRatio="auto"
            transparent
            hideLoadingPlaceholder
          />
        </div>
        
        {/* Dark Overlay for Contrast */}
        <div className="absolute inset-0 bg-drake-dark/85" />
        
        {/* Subtle Teal/Gold Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-drake-gold/10" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp">
            <p className="section-eyebrow text-drake-gold text-center">THE METHOD</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase text-white">
              A Simple System That <span className="text-drake-gold">Delivers Real Results</span>
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12">
              Expert-Guided Training That Works
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-white/30" style={{
              width: '66.67%',
              left: '16.67%'
            }} />
            
            {[{
              number: "1",
              title: "Start Reset Week",
              description: "Try 7 days of unlimited classes for just $50 — no commitment, no pressure.",
              bgColor: "bg-white"
            }, {
              number: "2",
              title: "Train",
              description: "Join the right class track — Foundation Flow, Functional Strength, Mobility Reset, KB Strong, or Weekend Warrior.",
              bgColor: "bg-drake-gold"
            }, {
              number: "3",
              title: "Progress",
              description: "We check mobility and strength regularly so you can see and feel your improvements.",
              bgColor: "bg-drake-teal"
            }].map((step, index) => (
              <AnimatedSection key={index} animation="scaleIn" delay={getStaggerDelay(index)} className="text-center relative z-10">
                <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center ${step.bgColor === 'bg-white' ? 'text-drake-dark' : 'text-white'} text-3xl font-bold mx-auto mb-6 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="font-hero text-2xl font-bold mb-3 uppercase text-white">{step.title}</h3>
                <p className="text-lg text-gray-200">{step.description}</p>
              </AnimatedSection>
            ))}
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
                  <OptimizedImage src={coachNick} alt="Coach Nick Poppa demonstrating sandbag training" className="w-full h-full" aspectRatio="auto" />
                </div>
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">Coach Nick Poppa</h3>
                <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">Holistic Movement Specialist</p>
                <p className="text-muted-foreground mb-4">
                  Nick bridges the gap between rehabilitation and performance. His approach helps clients improve posture, stability, mobility, and strength through sustainable lifestyle and movement habits.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn More About Nick</Link>
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
                <Button asChild size="lg">
                  <a href="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219" target="_blank" rel="noopener noreferrer">Start Reset Week</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <CTASection eyebrow="GET STARTED" title="Ready to Reset How You Move?" ctaText="Start Reset Week — $50" ctaLink="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219" variant="primary" slanted={true} />
      </AnimatedSection>
    </main>
    </>;
};
export default Home;
