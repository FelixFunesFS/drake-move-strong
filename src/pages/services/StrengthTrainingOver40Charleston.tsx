import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight, Shield, TrendingUp, Heart } from "lucide-react";

import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import davidGobletSquat from "@/assets/david-goblet-squat-kb-rack.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Strength Training for Adults Over 40",
  "description": "Safe, structured, and sustainable strength training for adults over 40 in Charleston, SC. Build strength without wrecking your joints.",
  "provider": localBusinessSchema,
  "areaServed": {
    "@type": "City",
    "name": "Charleston",
    "containedInPlace": {
      "@type": "State",
      "name": "South Carolina"
    }
  },
  "serviceType": "Fitness Training"
};

const trainingFocus = [
  { icon: Shield, text: "Proper mechanics" },
  { icon: TrendingUp, text: "Controlled loading" },
  { icon: Heart, text: "Stability and balance" },
  { icon: Check, text: "Long-term strength, not short-term exhaustion" }
];

const whoTrainsHere = [
  "Adults 40–65",
  "Busy professionals",
  "Parents getting back into fitness",
  "People who've tried gyms before and quit due to pain",
  "Anyone who wants strength without intimidation"
];

const whatToExpect = [
  "Guided warm-up and mobility work",
  "Strength exercises scaled to your ability",
  "Coaching cues to keep you safe",
  "A pace that challenges without overwhelming"
];

export default function StrengthTrainingOver40Charleston() {
  return (
    <>
      <SEO
        title="Strength Training for Adults Over 40 | Charleston, SC | Drake Fitness"
        description="Build strength, confidence, and resilience without wrecking your joints or risking injury. Safe, structured strength training for adults 40+ in Charleston."
        canonical="https://drake.fitness/strength-training-over-40-charleston"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroKettlebellTraining}
            alt="Kettlebell strength training at Drake Fitness in Charleston"
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
              <span className="section-eyebrow text-accent">CHARLESTON, SC</span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-primary-foreground">
                Strength Training for Adults Over 40 in Charleston — Safe, Structured, and Sustainable
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                Build strength, confidence, and resilience without wrecking your joints or risking injury.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/consultation">
                  Schedule Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE REALITY</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                After 40, the Old "Push Harder" Approach Stops Working
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>Recovery slows. Joints complain.<br />And most gyms aren't designed for bodies that need intelligent progression.</p>
                <p>That doesn't mean strength isn't for you.<br /><strong className="text-foreground">It means the approach has to change.</strong></p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How We Train Differently Section */}
      <section className="py-16 md:py-24 bg-secondary section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">HOW WE TRAIN DIFFERENTLY</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                At Drake Fitness, Strength Training Is:
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">Coached (not self-directed)</span>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">Progressive (not random)</span>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">Joint-friendly (not ego-driven)</span>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-muted-foreground mb-8">
                  We focus on:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainingFocus.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-lg text-muted-foreground font-medium">
                  You'll get stronger without feeling beat up.
                </p>
              </div>
              <div>
                <OptimizedImage
                  src={davidGobletSquat}
                  alt="Coach David demonstrating goblet squat form at Drake Fitness"
                  className="rounded-2xl shadow-lg"
                  aspectRatio="video"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who Trains Here Section */}
      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">WHO TRAINS HERE</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                This Program Is Built For:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {whoTrainsHere.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-lg text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg font-semibold text-primary text-center">
                You don't need to be "in shape" to start.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-accent">WHAT TO EXPECT</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Each Session Includes:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {whatToExpect.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-lg">{step}</span>
                  </li>
                ))}
              </ul>
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
                <span className="section-eyebrow text-primary">SERVING CHARLESTON LOCALS</span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  A Smarter, Calmer Gym Experience
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">2 Avondale Ave, Charleston, SC 29407</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Located in Avondale, Drake Fitness serves Charleston and West Ashley adults who want a smarter, calmer gym experience.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-accent-foreground">
                Start Strength Training That Actually Fits Your Body
              </h2>
              <p className="text-lg text-accent-foreground/80 mb-6">Try Reset Week — 7 days of unlimited classes for just $49.</p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/reset-week">
                  Start Reset Week — $49
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
