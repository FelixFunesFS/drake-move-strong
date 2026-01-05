import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, ArrowRight, X, Shield, RotateCcw, Compass, Brain, User, Dumbbell, Heart, Sprout, RefreshCw, Calendar, Frown, HelpCircle, HeartHandshake } from "lucide-react";

import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";
import davidCoachingForm from "@/assets/david-coaching-form.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Reset Week - Charleston Strength Training Intro",
  "description": "Reset Week is a smarter way to start strength training in Charleston. 7 days of unlimited classes for $49.",
  "provider": localBusinessSchema,
  "areaServed": {
    "@type": "City",
    "name": "Charleston",
    "containedInPlace": {
      "@type": "State",
      "name": "South Carolina"
    }
  },
  "serviceType": "Fitness Training",
  "offers": {
    "@type": "Offer",
    "price": "49",
    "priceCurrency": "USD",
    "description": "7 days of unlimited classes"
  }
};

const problems = [
  { text: "Most gyms throw you in", description: "No assessment. No foundation. Just workouts you're not ready for." },
  { text: "You get hurt or frustrated", description: "Because your body wasn't prepared for the demands." },
  { text: "You quit", description: "And blame yourself — when really, the system failed you." },
  { text: "The cycle repeats", description: "You try again somewhere else, with the same result." }
];

const whatResetWeekSolves = [
  { icon: Shield, title: "Fear of Injury", description: "We start with mobility and movement quality — teaching your body how to move safely before adding load.", cta: "You'll learn proper form from day one." },
  { icon: RotateCcw, title: "Past Gym Failures", description: "Reset Week isn't about jumping into hard workouts. It's about building confidence, understanding your body, and creating sustainable habits.", cta: "This time will be different." },
  { icon: Compass, title: "Confusion", description: "You'll get clear guidance on what to do, how to do it, and why it matters. No guessing. No YouTube rabbit holes.", cta: "Just a clear path forward." },
  { icon: Brain, title: "Overwhelm", description: "Reset Week simplifies everything. Small group coaching. One week. One goal: help you feel ready.", cta: "No pressure. No chaos." }
];

const whatYoullExperience = [
  { icon: User, title: "Coach-Led Sessions", description: "Every class is guided by David or Nick — you're never left to figure it out on your own." },
  { icon: Dumbbell, title: "Movement Guidance", description: "Learn how your body should move before adding weight or intensity." },
  { icon: Dumbbell, title: "Strength Basics", description: "Introduction to functional movements like squats, hinges, carries, and presses." },
  { icon: Heart, title: "Confidence Building", description: "By the end of the week, you'll know you can do this — and you'll want to keep going." }
];

const perfectFor = [
  { icon: Sprout, title: "You're a Beginner", description: "You've never strength trained before and want to start the right way." },
  { icon: RefreshCw, title: "You're Restarting", description: "You used to train but took time off and need to rebuild your foundation." },
  { icon: Calendar, title: "You're Over 30", description: "Your body doesn't recover like it used to and you need smarter training." },
  { icon: Frown, title: "You're Tired of Being Sore", description: "You're done with workouts that leave you limping for days." },
  { icon: HelpCircle, title: "You Feel Lost", description: "You don't know where to start or what program is right for you." },
  { icon: HeartHandshake, title: "You Want Support", description: "You want coaching, not just a gym membership." }
];

const whatsIncluded = [
  "7 days of unlimited classes",
  "Coach-guided introduction",
  "Mobility-focused, joint-friendly workouts",
  "Small group environment",
  "No pressure to \"keep up\""
];

export default function ResetWeekCharleston() {
  return (
    <>
      <SEO
        title="Reset Week — A Smarter Way to Start Strength Training | Charleston, SC"
        description="Most people don't need more workouts — they need a better starting point. Reset Week gives you 7 days of unlimited classes for $49."
        canonical="https://drake.fitness/reset-week-charleston"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroKettlebellTraining}
            alt="Person training at Drake Fitness in Charleston"
            className="w-full h-full"
            priority
            transparent
            hideLoadingPlaceholder
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28 text-center">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Reset Week — A Smarter Way to Start<br />
                <span className="text-accent">Strength Training in Charleston</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                Most people don't need more workouts — they need a better starting point.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-6 text-xl font-bold uppercase tracking-wide">
                <Link to="/reset-week">
                  Start Reset Week — $49
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE PROBLEM</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">
                You Don't Need More Workouts
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                You need a better starting point.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <div key={index} className="bg-secondary p-8 rounded-xl border-l-4 border-destructive">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                      <X className="text-destructive h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{problem.text}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-accent/10 border-l-4 border-accent p-8 rounded-r-xl mt-12 max-w-3xl mx-auto">
              <p className="text-lg font-medium italic">
                "I've tried gyms before, but I always end up sore, confused, or injured. I just want something that works for my body."
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="section-eyebrow text-primary">THE SOLUTION</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">
                What Reset Week Solves
              </h2>
              <p className="text-xl text-muted-foreground">
                Reset Week is designed to eliminate the four biggest obstacles that stop people from succeeding in fitness.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {whatResetWeekSolves.map((item, index) => (
                <div key={index} className="bg-background p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="text-primary-foreground h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                  <p className="text-primary font-semibold">{item.cta}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">WHAT YOU'LL EXPERIENCE</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase leading-tight">
                  A Week That Prepares You<br />
                  <span className="text-primary">For Real Results</span>
                </h2>

                <div className="space-y-6">
                  {whatYoullExperience.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <item.icon className="text-accent-foreground h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative">
                <div className="h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={groupKettlebellTraining}
                    alt="Small group training session with coach"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-8 rounded-xl shadow-xl max-w-sm">
                  <p className="font-heading text-2xl font-bold mb-2 uppercase">Week One Foundation</p>
                  <p className="text-primary-foreground/80">Build the movement patterns that will carry you for years.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">WHO IT'S PERFECT FOR</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">
                Reset Week Is Designed For You If...
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {perfectFor.map((item, index) => (
                <div key={index} className="bg-primary-foreground/5 backdrop-blur-sm p-8 rounded-xl border border-primary-foreground/10 hover:border-accent/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <item.icon className="text-accent-foreground h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-2 uppercase">{item.title}</h3>
                      <p className="text-primary-foreground/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="mt-16 text-center">
              <div className="bg-accent/20 border-2 border-accent p-8 rounded-2xl inline-block max-w-2xl">
                <p className="text-xl font-semibold mb-2">
                  "I wish I had started here. It would have saved me years of frustration."
                </p>
                <p className="text-primary-foreground/80">— Current Member</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">
                Ready to Start the Right Way?
              </h2>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 leading-relaxed">
                Reset Week gives you the foundation, confidence, and clarity you need to succeed.
              </p>
              <p className="text-lg text-primary-foreground/70 mb-10">
                No pressure. No intimidation. Just smart, guided training.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="bg-background rounded-2xl p-10 md:p-12 shadow-2xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="font-heading text-3xl font-bold text-foreground mb-4 uppercase">What's Included in Reset Week</h3>
                <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-primary h-6 w-6 mt-1" />
                    <p className="text-muted-foreground text-lg">{item}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-6 text-xl font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Start Reset Week — $49
                  </Link>
                </Button>
                <p className="text-muted-foreground text-sm mt-4">Available spots are limited to maintain small group sizes</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-primary-foreground/80 text-lg mb-2">Questions about Reset Week?</p>
              <Link to="/contact" className="text-accent font-semibold underline hover:text-accent/80 transition-colors">
                Contact us — we're here to help
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Trust Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl font-bold mb-2 uppercase">Proudly Serving Charleston</h3>
              <p className="text-muted-foreground">West Ashley | Avondale | James Island | Downtown Charleston | Johns Island</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center text-center">
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground text-sm">Members Coached</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">5★</div>
                <p className="text-muted-foreground text-sm">Google Rating</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">8+</div>
                <p className="text-muted-foreground text-sm">Years in Charleston</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground text-sm">Coached Sessions</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
