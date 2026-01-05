import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight, Activity, Users, Volume2 } from "lucide-react";

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
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-primary-foreground">
                Low-Impact Fitness for Joint Pain in Avondale & West Ashley
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                A joint-friendly fitness program for adults who want results without aggravating pain.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/consultation">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
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
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
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
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
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
      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-eyebrow text-primary">COMMON ISSUES WE HELP WITH</span>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                Members Often Come In With:
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="bg-secondary p-4 rounded-xl text-center">
                    <span className="text-foreground font-medium">{issue}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-primary/10 rounded-xl text-center">
                <p className="text-lg text-foreground">
                  We don't "push through pain."<br />
                  <strong className="text-primary">We train around it—and often reduce it.</strong>
                </p>
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
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
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
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  Easily Accessible from West Ashley & Charleston
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">2 Avondale Ave, Charleston, SC 29407</span>
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
      <section className="py-16 md:py-24 bg-accent section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-accent-foreground">
                Train Again Without Fear of Making Things Worse
              </h2>
              <p className="text-lg text-accent-foreground/80 mb-6">Start with Reset Week — 7 days of unlimited classes for just $49.</p>
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
