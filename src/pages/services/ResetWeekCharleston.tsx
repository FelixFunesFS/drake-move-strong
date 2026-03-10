import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, ArrowRight, User, Dumbbell, Heart } from "lucide-react";
import { INTRO_URL } from "@/data/pricing";

import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";
import davidCoachingForm from "@/assets/david-coaching-form.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3-Class Intro Experience - Charleston Strength Training",
  "description": "Try Drake Fitness free with 3 classes over 30 days. A smarter way to start strength training in Charleston, SC.",
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
    "price": "0",
    "priceCurrency": "USD",
    "description": "3 free classes over 30 days"
  }
};


const whatYoullExperience = [
  { icon: User, title: "Coach-Led Sessions", description: "Every class is guided by David or Misty — you're never left to figure it out on your own." },
  { icon: Dumbbell, title: "Movement Guidance", description: "Learn how your body should move before adding weight or intensity." },
  { icon: Dumbbell, title: "Strength Basics", description: "Introduction to functional movements like squats, hinges, carries, and presses." },
  { icon: Heart, title: "Confidence Building", description: "By the end of your 3 classes, you'll know you can do this — and you'll want to keep going." }
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
  "3 free classes over 30 days",
  "KB Strong — Mon/Wed/Fri 8am & 11am, Thu 6pm",
  "Coach-guided introduction",
  "Mobility-focused, joint-friendly workouts",
  "Small group environment",
  "No pressure to \"keep up\""
];

export default function ResetWeekCharleston() {
  return (
    <>
      <SEO
        title="3-Class Intro Experience — Try Strength Training Free | Charleston, SC"
        description="Most people don't need more workouts — they need a better starting point. Try 3 free classes at Drake Fitness in Charleston. KB Strong: Mon/Wed/Fri 8am & 11am, Thu 6pm."
        canonical="https://drake.fitness/try-free-charleston"
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
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Try 3 Classes Free<br className="hidden sm:block" />
                <span className="text-accent">Charleston Strength Training</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
                No experience needed. No card required. Just show up.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-bold uppercase tracking-wide whitespace-normal text-center">
                <a href={INTRO_URL} target="_blank" rel="noopener noreferrer">
                  Claim Your Free Classes
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </a>
              </Button>
              <p className="text-primary-foreground/60 text-sm mt-4">Beginners & restarters welcome · West Ashley</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-12 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Claim Your Free Pass", desc: "Sign up in 30 seconds — no card required" },
              { step: "2", title: "Pick Your Class", desc: "KB Strong: Mon/Wed/Fri 8am & 11am, Thu 6pm" },
              { step: "3", title: "Show Up", desc: "We handle the rest — coaching, form, and encouragement" }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 text-center md:text-left md:flex-col md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section className="py-12 md:py-16 lg:py-20 lg:pb-28 bg-background overflow-x-clip">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">WHAT YOU'LL EXPERIENCE</span>
                <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 uppercase leading-tight">
                  3 Classes That Prepare You<br className="hidden sm:block" />
                  <span className="text-primary">For Real Results</span>
                </h2>

                <div className="space-y-4 md:space-y-6">
                  {whatYoullExperience.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center">
                        <item.icon className="text-accent-foreground h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1} className="overflow-visible">
              <div className="relative overflow-visible">
                <div className="h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={groupKettlebellTraining}
                    alt="Small group training session with coach"
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:absolute lg:-bottom-6 lg:-left-6 mt-6 lg:mt-0 bg-primary text-primary-foreground p-5 md:p-8 rounded-xl shadow-xl max-w-sm mx-auto lg:mx-0">
                  <p className="font-hero text-xl md:text-2xl font-bold mb-2 uppercase">Your Foundation</p>
                  <p className="text-primary-foreground/80 text-sm md:text-base">Build the movement patterns that will carry you for years.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-10 md:mb-16">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">WHO IT'S PERFECT FOR</span>
              <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 uppercase">
                The Intro Experience Is Designed For You If...
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
              {perfectFor.map((item, index) => (
                <div key={index} className="bg-primary-foreground/5 backdrop-blur-sm p-5 md:p-8 rounded-xl border border-primary-foreground/10 hover:border-accent/50 transition-all">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-accent rounded-lg flex items-center justify-center">
                      <item.icon className="text-accent-foreground h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <h3 className="font-hero text-lg md:text-xl font-bold mb-1 md:mb-2 uppercase">{item.title}</h3>
                      <p className="text-primary-foreground/80 text-sm md:text-base">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="mt-10 md:mt-16 text-center">
              <div className="bg-accent/20 border-2 border-accent p-5 md:p-8 rounded-2xl max-w-2xl mx-auto">
                <p className="text-base md:text-xl font-semibold mb-2 break-words leading-relaxed">
                  "I have had 3 lower back surgeries - was in constant pain... David and his team helped me get back to working out consistently and build strength. I am forever grateful for this place - it truly changed my life!"
                </p>
                <p className="text-primary-foreground/80 text-sm md:text-base">— Caitlin P., Verified Google Review</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
              <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 uppercase leading-tight">
                Ready to Start the Right Way?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-3 md:mb-4 leading-relaxed">
                The 3-Class Intro gives you the foundation, confidence, and clarity you need to succeed.
              </p>
              <p className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10">
                No pressure. No intimidation. Just smart, guided training.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="bg-background rounded-2xl p-5 sm:p-8 md:p-10 lg:p-12 shadow-2xl max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="font-hero text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 uppercase">What's Included — Free</h3>
                <div className="h-1 w-16 md:w-24 bg-accent mx-auto mb-4 md:mb-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-primary h-5 w-5 md:h-6 md:w-6 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-bold uppercase tracking-wide whitespace-normal">
                  <a href={INTRO_URL} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    Claim 3 Free Classes
                  </a>
                </Button>
                <p className="text-muted-foreground text-xs md:text-sm mt-4">Available spots are limited to maintain small group sizes</p>
                <p className="text-primary font-semibold text-sm mt-2">Love it? Get 50% off your first month — $110 instead of $225</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-primary-foreground/80 text-lg mb-2">Questions about the Intro Experience?</p>
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
              <h3 className="font-hero text-2xl font-bold mb-2 uppercase">Proudly Serving Charleston</h3>
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
