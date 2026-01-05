import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight, BookOpen, Target, Shield, Smile } from "lucide-react";

import oneOnOneCoaching from "@/assets/one-on-one-coaching.jpg";
import davidCoachingForm from "@/assets/david-coaching-form.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Personal Training for Beginners",
  "description": "Personal training in Avondale, Charleston for beginners and returners. A supportive starting point if you're new to fitness or coming back after time away.",
  "provider": localBusinessSchema,
  "areaServed": {
    "@type": "City",
    "name": "Charleston",
    "containedInPlace": {
      "@type": "State",
      "name": "South Carolina"
    }
  },
  "serviceType": "Personal Training"
};

const startingChallenges = [
  "It's been years since you trained",
  "You're worried about getting hurt",
  "You don't know where to start",
  "You've tried before and quit"
];

const trainingDifferent = [
  { icon: BookOpen, text: "Instructional, not intimidating" },
  { icon: Target, text: "Focused on movement quality" },
  { icon: Shield, text: "Built around your goals and limitations" },
  { icon: Smile, text: "Designed to help you feel confident quickly" }
];

const firstSessions = [
  "A conversation about your goals",
  "A simple movement screen",
  "Foundational exercises you can succeed at",
  "Clear next steps"
];

const bestFor = [
  "Beginners",
  "Adults returning after injury or time off",
  "People who want structure and accountability",
  "Anyone uncomfortable training alone"
];

export default function PersonalTrainingAvondale() {
  return (
    <>
      <SEO
        title="Personal Training in Avondale, Charleston | Beginners & Returners | Drake Fitness"
        description="A supportive starting point if you're new to fitness—or coming back after time away. Personal training in Avondale, Charleston for beginners and returners."
        canonical="https://drake.fitness/personal-training-avondale"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={oneOnOneCoaching}
            alt="One-on-one personal training session at Drake Fitness in Charleston"
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
              <span className="section-eyebrow text-accent">AVONDALE, CHARLESTON</span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-primary-foreground">
                Personal Training in Avondale, Charleston for Beginners and Returners
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                A supportive starting point if you're new to fitness—or coming back after time away.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/consultation">
                  Schedule a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Starting Again Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE CHALLENGE</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                Starting Again Is the Hardest Part
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Walking into a gym can feel intimidating—especially if:
              </p>
              <ul className="space-y-3">
                {startingChallenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg font-semibold text-primary">
                That's exactly who we work with.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Makes Our Training Different Section */}
      <section className="py-16 md:py-24 bg-secondary section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">THE DIFFERENCE</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                What Makes Our Personal Training Different
              </h2>
              <p className="text-lg text-muted-foreground">
                Personal training at Drake Fitness is:
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainingDifferent.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-lg text-muted-foreground font-medium">
                  You'll never feel rushed or judged.
                </p>
              </div>
              <div>
                <OptimizedImage
                  src={davidCoachingForm}
                  alt="Coach David providing personalized form coaching at Drake Fitness"
                  className="rounded-2xl shadow-lg"
                  aspectRatio="video"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Your First Sessions Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-accent">YOUR FIRST SESSIONS</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                We Start With:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {firstSessions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-lg">{step}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg text-primary-foreground/90 text-center font-medium">
                Progress is steady and realistic.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who This Is Best For Section */}
      <section className="py-16 md:py-24 bg-background section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">WHO THIS IS BEST FOR</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                This Program Is Perfect For:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bestFor.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-secondary p-4 rounded-xl">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Section */}
      <section className="py-16 md:py-24 bg-secondary section-slant-top-reverse">
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
                <span className="section-eyebrow text-primary">LOCAL, ACCESSIBLE, SUPPORTIVE</span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  A Safe Place to Start
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">2 Avondale Ave, Charleston, SC 29407</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Located in Avondale, Drake Fitness serves Charleston-area adults looking for a safe place to start.
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
                Take the Guesswork Out of Getting Started
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
