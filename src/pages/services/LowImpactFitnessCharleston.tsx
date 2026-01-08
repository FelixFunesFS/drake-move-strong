import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight, Activity, Users, Volume2, Star } from "lucide-react";

import studioFloorExercise from "@/assets/studio-floor-exercise.jpg";
import nickHolisticCoaching from "@/assets/nick-holistic-coaching.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Low-Impact Fitness for Joint Pain",
  "description": "A joint-friendly fitness program for adults in Avondale and West Ashley who want results without aggravating pain.",
  "provider": localBusinessSchema,
  "areaServed": [
    {
      "@type": "Place",
      "name": "Avondale"
    },
    {
      "@type": "Place",
      "name": "West Ashley"
    },
    {
      "@type": "City",
      "name": "Charleston"
    }
  ],
  "serviceType": "Fitness Training"
};

const ourApproach = [
  "Controlled movements",
  "Stable positions",
  "Gradual progression",
  "Exercises that respect joint limitations"
];

const commonIssues = [
  "Back pain",
  "Knee discomfort",
  "Hip tightness",
  "Shoulder limitations",
  "General joint stiffness"
];

const environmentFeatures = [
  { icon: Users, text: "Small group or coached sessions" },
  { icon: Activity, text: "Clear instructions" },
  { icon: Volume2, text: "Encouraging coaches" }
];

export default function LowImpactFitnessCharleston() {
  return (
    <>
      <SEO
        title="Low-Impact Fitness for Joint Pain | Avondale & West Ashley | Drake Fitness"
        description="A joint-friendly fitness program for adults who want results without aggravating pain. Located in Avondale, serving West Ashley and Charleston."
        canonical="https://drake.fitness/low-impact-fitness-charleston"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={studioFloorExercise}
            alt="Low-impact floor exercise at Drake Fitness in Charleston"
            className="w-full h-full"
            priority
            transparent
            hideLoadingPlaceholder
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl">
              <span className="section-eyebrow text-accent">AVONDALE & WEST ASHLEY</span>
              <h1 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-primary-foreground uppercase">
                Low-Impact Fitness for Joint Pain in Avondale & West Ashley
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 md:mb-8">
                A joint-friendly fitness program for adults who want results without aggravating pain.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-8 py-4 md:py-5 text-base md:text-lg whitespace-normal text-center">
                <Link to="/consultation">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* If Exercise Has Let You Down Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE STRUGGLE</span>
              <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground uppercase">
                If Exercise Has Let You Down Before
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>If past workouts left you sore, inflamed, or discouraged—<strong className="text-foreground">this is different.</strong></p>
                <p>Joint pain doesn't mean you should stop moving.<br />It means you need <strong className="text-foreground">better guidance and smarter loading.</strong></p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Low-Impact Approach Section */}
      <section className="py-16 md:py-24 bg-secondary section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">OUR APPROACH</span>
              <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground uppercase">
                Our Low-Impact Approach
              </h2>
              <p className="text-lg text-muted-foreground">
                At Drake Fitness, we emphasize:
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <ul className="space-y-4">
                  {ourApproach.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-lg text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-lg text-muted-foreground font-medium">
                  We modify intelligently so you can train with confidence.
                </p>
              </div>
              <div>
                <OptimizedImage
                  src={nickHolisticCoaching}
                  alt="Coach Nick providing holistic coaching at Drake Fitness"
                  className="rounded-2xl shadow-lg"
                  aspectRatio="video"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <span className="section-eyebrow text-primary">COMMON ISSUES WE HELP WITH</span>
              <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground uppercase">
                Members Often Come In With:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="bg-secondary p-3 md:p-4 rounded-xl text-center">
                    <span className="text-foreground font-medium text-sm md:text-base">{issue}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-primary/10 rounded-xl text-center">
                <p className="text-base md:text-lg text-foreground">
                  We don't "push through pain."<br />
                  <strong className="text-primary">We train around it—and often reduce it.</strong>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8 md:mb-12">
              <span className="section-eyebrow text-primary">REAL RESULTS</span>
              <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground uppercase">
                Members Who Trained Through Pain
              </h2>
            </div>
          </AnimatedSection>

          {/* Featured Testimonial */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-3xl mx-auto mb-8 md:mb-12">
              <div className="bg-secondary border-l-4 border-accent p-5 md:p-8 rounded-r-xl">
                <div className="flex gap-1 text-accent mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                </div>
                <blockquote className="text-base md:text-xl italic text-foreground mb-3 md:mb-4 leading-relaxed break-words">
                  "I have had 3 lower back surgeries - was in constant pain... David and his team helped me get back to working out consistently and build strength. I am forever grateful for this place - it truly changed my life!"
                </blockquote>
                <cite className="text-muted-foreground font-medium text-sm md:text-base">— Caitlin P., Verified Google Review</cite>
              </div>
            </div>
          </AnimatedSection>

          {/* Supporting Testimonials */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-secondary p-4 md:p-6 rounded-xl">
                <div className="flex gap-1 text-accent mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-2 md:mb-3 text-sm md:text-base break-words leading-relaxed">
                  "I had a bad back injury that was not getting better with physical therapy... Dave was BETTER than all physical therapists I've ever had."
                </p>
                <p className="text-foreground font-medium text-xs md:text-sm">— Cara S., Verified Google Review</p>
              </div>
              <div className="bg-secondary p-4 md:p-6 rounded-xl">
                <div className="flex gap-1 text-accent mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-2 md:mb-3 text-sm md:text-base break-words leading-relaxed">
                  "His knowledge about the way the body mechanically works has helped me continue to exercise after multiple surgeries."
                </p>
                <p className="text-foreground font-medium text-xs md:text-sm">— Vanessa H., Verified Google Review</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Environment Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-accent">THE ENVIRONMENT</span>
              <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-6 uppercase">
                A Calm, Supportive Environment
              </h2>
              <p className="text-lg text-primary-foreground/90">
                This is not a loud, chaotic gym. You'll find:
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {environmentFeatures.map((feature, index) => (
                  <div key={index} className="bg-primary-foreground/10 p-6 rounded-xl text-center">
                    <feature.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <span className="text-primary-foreground font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-lg text-primary-foreground/90 text-center">
                A community of adults with similar goals.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Section */}
      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <OptimizedImage
                  src={studioDavidStorefront}
                  alt="Drake Fitness studio storefront in Avondale, Charleston"
                  className="rounded-2xl shadow-lg"
                  aspectRatio="video"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <span className="section-eyebrow text-primary">CONVENIENT LOCATION</span>
                <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground uppercase">
                  Easily Accessible from West Ashley & Charleston
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors">
                    2 Avondale Ave, Charleston, SC 29407
                  </a>
                </div>
                <p className="text-lg text-muted-foreground">
                  Drake Fitness is located in Avondale, easily accessible from West Ashley and greater Charleston.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-accent section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-accent-foreground uppercase">
                Train Again Without Fear of Making Things Worse
              </h2>
              <p className="text-base md:text-lg text-accent-foreground/80 mb-4 md:mb-6">Start with Reset Week — 7 days of unlimited classes for just $49.</p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 py-4 md:py-5 text-base md:text-lg whitespace-normal text-center">
                <Link to="/reset-week">
                  Start Reset Week — $49
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
