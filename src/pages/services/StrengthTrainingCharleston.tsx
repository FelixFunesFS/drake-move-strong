import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { 
  Check, MapPin, ArrowRight, Star, Users, Briefcase, Heart, Bike, Calendar,
  Dumbbell, HeartPulse, ShieldCheck, Ban,
  PersonStanding, Wind, Weight,
  GraduationCap, Gauge,
  Presentation, TrendingUp,
  CalendarDays, Shield
} from "lucide-react";

import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import davidGobletSquat from "@/assets/david-goblet-squat-kb-rack.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobility & Strength Training in Charleston, SC",
  "description": "Train smarter, move better, and get strong without pain. The premier mobility and strength training studio in Charleston.",
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

const whoThisIsFor = [
  { icon: Dumbbell, title: "You've tried gyms before and it didn't stick", description: "Traditional gyms leave you confused, intimidated, or injured." },
  { icon: HeartPulse, title: "Your back, knees, or shoulders feel beat up", description: "Pain and stiffness are getting in the way of daily life." },
  { icon: ShieldCheck, title: "You want strength without risking injury", description: "Smart training that builds you up, not breaks you down." },
  { icon: Ban, title: "You're done with extreme workouts", description: "No more crushing yourself just to prove you worked out." }
];

const whyWorkoutsStopWorking = [
  { icon: PersonStanding, title: "How You Move", description: "Joint mobility and movement quality come first — not reps and sets." },
  { icon: Wind, title: "How You Breathe", description: "Proper breathing creates stability and prevents compensation patterns." },
  { icon: Weight, title: "How You Control Load", description: "Strength without control leads to injury. We teach both." }
];

const resetWeekIncludes = [
  { icon: GraduationCap, text: "Learn how to move safely and confidently", description: "Master the fundamentals before adding intensity." },
  { icon: Gauge, text: "Rebuild control before adding intensity", description: "Establish proper movement patterns that last." },
  { icon: Users, text: "Train with coaching, not chaos", description: "Every session is guided by experienced coaches." },
  { icon: Heart, text: "See how your body should feel after training", description: "Energized, not exhausted. Strong, not sore." }
];

const charlestonAdvantages = [
  { icon: Briefcase, title: "Long Workdays & Desk Jobs", description: "Charleston professionals need training that undoes desk damage — not adds to it." },
  { icon: Heart, title: "High Stress Lifestyles", description: "Our training helps you manage stress through movement, not add to it with extreme workouts." },
  { icon: Bike, title: "Active Weekends", description: "Train to enjoy Charleston's outdoor lifestyle — beaches, trails, and activities." },
  { icon: Calendar, title: "Training That Fits Real Life", description: "We design programs around your schedule, not fitness trends." }
];

const whatMakesDifferent = [
  { icon: Presentation, title: "Coaching Over Crowd Control", description: "You get real attention, not just supervision. Every movement is coached." },
  { icon: TrendingUp, title: "Progression Without Panic", description: "Structured programs that build on each session — no random workouts." },
  { icon: Dumbbell, title: "Strength Without Punishment", description: "Build strength that serves your life, not destroys your body." },
  { icon: Users, title: "Small Group Attention", description: "Limited class sizes ensure quality coaching for every member." },
  { icon: PersonStanding, title: "Movement-First Approach", description: "Quality movement before heavy loads — always." },
  { icon: Star, title: "Results You Can Feel", description: "Better movement, less pain, more confidence — in weeks, not months." }
];

const finalCTAFeatures = [
  { icon: CalendarDays, title: "Flexible Scheduling", description: "Morning, afternoon, and evening classes available" },
  { icon: MapPin, title: "West Ashley Location", description: "Easy access from anywhere in Charleston" },
  { icon: Users, title: "Small Group Training", description: "Maximum attention, minimum intimidation" },
  { icon: Shield, title: "No Pressure Environment", description: "Start at your level, progress at your pace" }
];

export default function StrengthTrainingCharleston() {
  return (
    <>
      <SEO
        title="Mobility & Strength Training in Charleston, SC | Drake Fitness"
        description="Train smarter, move better, and get strong without pain. Charleston's premier mobility and strength training studio. Start with Reset Week — $49."
        canonical="https://drake.fitness/strength-training-charleston"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroKettlebellTraining}
            alt="Strength training at Drake Fitness in Charleston, SC"
            className="w-full h-full"
            priority
            transparent
            hideLoadingPlaceholder
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full mb-6">
                <span className="text-accent font-bold uppercase tracking-wider text-sm">Charleston, SC</span>
              </span>
              <h1 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Mobility & Strength Training in Charleston, SC
              </h1>
              <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-semibold">
                Start With Reset Week
              </p>
              <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                Train Smarter. Move Better. Get Strong Without Pain.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                <Link to="/reset-week">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Start Reset Week — $49
                </Link>
              </Button>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Serving Charleston & West Ashley</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Beginner-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Coach-Led Small Groups</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">WHO THIS IS FOR</span>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase leading-tight">
                  If You Live or Work in <span className="text-primary">Charleston</span>...
                </h2>
                
                <div className="space-y-6 mb-10">
                  {whoThisIsFor.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-secondary rounded-xl border-l-4 border-accent">
                      <item.icon className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
                  <h3 className="font-hero text-2xl font-bold mb-3 uppercase">This Program Was Built for You</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">Most of our members come to us after years of pushing through workouts that stopped helping. Reset Week exists to change that — safely and intentionally.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative">
                <div className="h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={groupKettlebellTraining}
                    alt="Diverse group of adults training with coach in Charleston"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-accent text-accent-foreground p-8 rounded-xl shadow-xl max-w-sm">
                  <p className="font-heading text-3xl font-bold mb-2">85%</p>
                  <p className="font-semibold">of our members are over 30 and starting from scratch</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Workouts Stop Working Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">THE PROBLEM</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Why Workouts Stop Working</h2>
              <p className="text-xl text-muted-foreground">Most gyms focus on intensity first. We focus on what actually matters.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {whyWorkoutsStopWorking.map((item, index) => (
                <div key={index} className="bg-background p-10 rounded-2xl shadow-lg text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="font-hero text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-primary text-primary-foreground p-12 rounded-3xl max-w-4xl mx-auto text-center">
              <h3 className="font-hero text-3xl font-bold mb-4 uppercase">When These Foundations Are Missing...</h3>
              <p className="text-xl text-primary-foreground/80 mb-6">Progress slows and pain shows up — especially after 30 or 40.</p>
              <p className="text-2xl font-bold text-accent">Reset Week rebuilds those basics so strength training actually works again.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reset Week Offer Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={davidGobletSquat}
                  alt="Personal training session at Drake Fitness Charleston"
                  className="w-full h-full"
                />
                <div className="absolute top-8 right-8 bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold shadow-lg">
                  <span className="text-sm uppercase tracking-wide">Limited Spots Available</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div>
                <span className="section-eyebrow text-primary">THE OFFER</span>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase leading-tight">
                  What Is <span className="text-primary">Reset Week?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Reset Week is a low-pressure, beginner-friendly introduction to Drake Fitness.
                </p>

                <div className="space-y-5 mb-10">
                  {resetWeekIncludes.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <item.icon className="text-primary-foreground h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.text}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary border-l-4 border-accent p-8 rounded-r-2xl mb-8">
                  <p className="text-lg font-semibold mb-2">No Pressure. No Contracts.</p>
                  <p className="text-muted-foreground">No "keep up or fall behind" environment. Just smart, sustainable training.</p>
                </div>

                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    Claim Your Reset Week Spot
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Charleston Advantage Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">LOCAL ADVANTAGE</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Why Charleston Clients Choose Drake Fitness</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {charlestonAdvantages.map((item, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm p-10 rounded-2xl border border-primary-foreground/20">
                  <item.icon className="text-accent h-10 w-10 mb-6" />
                  <h3 className="font-hero text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-background text-foreground p-12 rounded-3xl text-center max-w-4xl mx-auto">
              <h3 className="font-hero text-3xl font-bold mb-6 uppercase">Our Approach Helps Charleston Members:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <Check className="text-primary h-8 w-8 mb-3" />
                  <p className="font-bold">Stay Consistent</p>
                </div>
                <div className="flex flex-col items-center">
                  <Check className="text-primary h-8 w-8 mb-3" />
                  <p className="font-bold">Recover Better</p>
                </div>
                <div className="flex flex-col items-center">
                  <Check className="text-primary h-8 w-8 mb-3" />
                  <p className="font-bold">Train Without Fear</p>
                </div>
                <div className="flex flex-col items-center">
                  <Check className="text-primary h-8 w-8 mb-3" />
                  <p className="font-bold">Build Real Strength</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Makes Different Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">THE DRAKE DIFFERENCE</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">What Makes Drake Fitness Different</h2>
              <p className="text-xl text-muted-foreground">This isn't about doing more — it's about doing what works.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whatMakesDifferent.map((item, index) => (
                <div key={index} className={`p-10 rounded-2xl border-2 border-transparent hover:border-primary transition-colors ${index === 5 ? 'bg-accent' : 'bg-secondary'}`}>
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${index === 5 ? 'bg-foreground' : 'bg-primary'}`}>
                    <item.icon className={`h-7 w-7 ${index === 5 ? 'text-accent' : 'text-primary-foreground'}`} />
                  </div>
                  <h3 className={`font-hero text-2xl font-bold mb-4 uppercase ${index === 5 ? 'text-accent-foreground' : ''}`}>{item.title}</h3>
                  <p className={`leading-relaxed ${index === 5 ? 'text-accent-foreground font-medium' : 'text-muted-foreground'}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">REAL RESULTS</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">What Charleston Members Are Saying</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-background p-10 rounded-2xl shadow-lg">
                <div className="flex text-accent text-xl mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground text-lg italic mb-6 leading-relaxed">"This is the first gym where I didn't feel broken after workouts."</p>
                <p className="font-semibold">— Sarah M., West Ashley</p>
              </div>

              <div className="bg-background p-10 rounded-2xl shadow-lg">
                <div className="flex text-accent text-xl mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground text-lg italic mb-6 leading-relaxed">"I finally feel confident lifting again."</p>
                <p className="font-semibold">— Mike T., Charleston</p>
              </div>

              <div className="bg-background p-10 rounded-2xl shadow-lg">
                <div className="flex text-accent text-xl mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground text-lg italic mb-6 leading-relaxed">"Reset Week changed how my body feels."</p>
                <p className="font-semibold">— Jennifer L., Mount Pleasant</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-background p-12 rounded-3xl shadow-xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-5xl">G</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start text-accent text-2xl mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
                  </div>
                  <p className="text-3xl font-heading font-bold mb-2">4.9 out of 5 Stars</p>
                  <p className="text-muted-foreground text-lg">Based on 127+ Google Reviews from Charleston members</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">READY TO GET STARTED?</span>
              <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">Start Your Reset Week Today</h2>
              <p className="text-xl text-primary-foreground/80 mb-10">Spots are limited to keep coaching quality high. Join Charleston's premier mobility and strength studio.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-12 mb-10 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {finalCTAFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex-shrink-0 flex items-center justify-center">
                      <item.icon className="text-accent-foreground h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-6 text-xl font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Claim Your Reset Week Spot Now
                  </Link>
                </Button>
                <p className="text-primary-foreground/60 mt-6 text-sm">Limited to 12 spots per week • No credit card required</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center">
              <p className="text-primary-foreground/60 mb-4">Questions? Call or text us:</p>
              <a href="tel:+18438175420" className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors">
                (843) 817-5420
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
