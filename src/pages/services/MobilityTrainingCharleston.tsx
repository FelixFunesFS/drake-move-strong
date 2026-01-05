import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight } from "lucide-react";

import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import davidMaceTraining from "@/assets/david-mace-training.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobility Training",
  "description": "Mobility-focused training for adults 30-65 who feel stiff, tight, or limited and want to stay active safely in Charleston, SC.",
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

const benefits = [
  "Move through full ranges of motion",
  "Reduce stiffness and joint discomfort",
  "Improve balance, control, and stability",
  "Build strength without aggravating old injuries"
];

const idealFor = [
  "Feel stiff getting up, bending, or rotating",
  "Have aches in your back, hips, knees, or shoulders",
  "Sit most of the day",
  "Want to stay active long-term—not burn out",
  "Are returning to fitness after time away"
];

const firstVisitSteps = [
  "A brief movement assessment",
  "Simple mobility drills matched to your needs",
  "Light strength work focused on control, not intensity"
];

export default function MobilityTrainingCharleston() {
  return (
    <>
      <SEO
        title="Mobility Training in Avondale, Charleston | Drake Fitness"
        description="A smarter approach to strength and movement for adults 30–65 who feel stiff, tight, or limited—and want to stay active safely. Located in Avondale, Charleston."
        canonical="https://drake.fitness/mobility-training-charleston"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={studioMobilityTraining}
            alt="Mobility training session at Drake Fitness in Charleston"
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
                Mobility Training in Avondale, Charleston for Adults Who Want to Move Better Without Pain
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                A smarter approach to strength and movement for adults 30–65 who feel stiff, tight, or limited—and want to stay active safely.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/consultation">
                  Book Your Free Mobility Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE PROBLEM</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                If You Feel Tight, Sore, or Restricted When You Move, You're Not Alone
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>Most people don't need "more workouts."<br />They need <strong className="text-foreground">better movement.</strong></p>
                <p>Traditional gyms often skip mobility entirely—or rush through it as a warm-up. Over time, that leads to joint pain, compensation, and eventually injuries.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Drake Difference Section */}
      <section className="py-16 md:py-24 bg-secondary section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">THE DRAKE DIFFERENCE</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                At Drake Fitness, Mobility Isn't an Afterthought. It's the Foundation.
              </h2>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-muted-foreground mb-8">
                  Our mobility-focused training helps you:
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-lg text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-lg text-muted-foreground">
                  Everything is coached, intentional, and scaled to your body.
                </p>
              </div>
              <div>
                <OptimizedImage
                  src={davidMaceTraining}
                  alt="Coach David demonstrating mace training for mobility at Drake Fitness"
                  className="rounded-2xl shadow-lg"
                  aspectRatio="video"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">WHO THIS IS FOR</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                This Program Is Ideal If You:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {idealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-lg text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg font-semibold text-primary text-center">
                No prior experience required.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* First Visit Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-accent">YOUR FIRST VISIT</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                What Your First Visit Looks Like
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-primary-foreground/90 mb-8 text-center">
                Your first session starts with:
              </p>
              <ul className="space-y-4">
                {firstVisitSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-lg">{step}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg text-primary-foreground/90 text-center font-medium">
                No pressure. No judgment. Just a clear plan.
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
                <span className="section-eyebrow text-primary">LOCAL & CONVENIENT</span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  Serving Charleston & West Ashley
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">2 Avondale Ave, Charleston, SC 29407</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Drake Fitness is located in Avondale, serving clients throughout Charleston and West Ashley. Most members live or work nearby and want a gym that feels approachable—not overwhelming.
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
                Ready to Move Better and Feel More Confident in Your Body?
              </h2>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/consultation">
                  Book a Free Mobility Consultation
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
