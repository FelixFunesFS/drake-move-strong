import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check, MapPin, ArrowRight, Activity, Users, Volume2, Star,
  Navigation, Clock, Car, ShieldCheck, HeartPulse, Dumbbell,
  Ban, GraduationCap, Gauge, Heart, CalendarDays, Shield
} from "lucide-react";
import { INTRO_URL } from "@/data/pricing";

import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import communityTurkishGetup from "@/assets/community-turkish-getup-class.jpg";
import davidGobletSquat from "@/assets/david-goblet-squat-kb-rack.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Low-Impact Fitness for Joint Pain",
  "description": "A joint-friendly fitness program for adults in Avondale and West Ashley who want results without aggravating pain.",
  "provider": localBusinessSchema,
  "areaServed": [
    { "@type": "Place", "name": "Avondale" },
    { "@type": "Place", "name": "West Ashley" },
    { "@type": "City", "name": "Charleston" }
  ],
  "serviceType": "Fitness Training"
};

const whoThisIsFor = [
  { icon: Dumbbell, title: "Your joints ache after traditional workouts", description: "High-impact classes leave you worse off than when you started." },
  { icon: Ban, title: "You've been told to 'just stretch more'", description: "Stretching alone doesn't build the strength you need to stay pain-free." },
  { icon: HeartPulse, title: "PT ended but you're not confident training alone", description: "You need guided, progressive training — not just exercises on a printout." },
  { icon: ShieldCheck, title: "You want to get stronger without making things worse", description: "Smart loading builds resilience. We teach you how." }
];

const ourApproach = [
  { icon: Activity, text: "Controlled movements", description: "Every rep is coached for quality, not speed." },
  { icon: ShieldCheck, text: "Stable positions", description: "We build strength from safe, supported positions first." },
  { icon: Gauge, text: "Gradual progression", description: "Load increases only when your body is ready." },
  { icon: Heart, text: "Respect for joint limitations", description: "Exercises are modified to work with your body, not against it." }
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

const introIncludes = [
  { icon: GraduationCap, text: "Learn joint-safe movement patterns", description: "Master controlled exercises that protect — not punish — your joints." },
  { icon: Gauge, text: "Start at your level, progress at your pace", description: "No pressure to keep up. Every session meets you where you are." },
  { icon: Users, text: "Coach-led guidance every step", description: "Real coaching, not just counting reps. Your form matters here." },
  { icon: Heart, text: "Feel better after training, not worse", description: "Energized, not exhausted. Strong, not sore." }
];

const faqs = [
  {
    question: "Is this safe for people with chronic joint pain?",
    answer: "Yes. Our coaches are trained to modify every exercise based on your specific limitations. We work around pain — never through it. Many members come to us with chronic back, knee, hip, or shoulder issues and see improvement within weeks."
  },
  {
    question: "What if I can't do certain exercises?",
    answer: "That's expected and completely fine. Every exercise has modifications. Our coaches will adjust movements in real-time based on what your body can handle that day. No two members do the exact same workout."
  },
  {
    question: "How is this different from physical therapy?",
    answer: "Physical therapy focuses on rehabilitation from a specific injury. Our program builds on that foundation — we help you develop lasting strength, mobility, and confidence to stay active long-term. Many members come to us after PT ends."
  },
  {
    question: "Do I need a doctor's clearance?",
    answer: "We recommend checking with your doctor if you have an acute injury or recent surgery. For general joint pain, stiffness, or chronic conditions, our low-impact approach is designed to be safe and progressive. We'll ask about your health history before your first class."
  }
];

const finalCTAFeatures = [
  { icon: CalendarDays, title: "Flexible Scheduling", description: "Morning, afternoon, and evening classes" },
  { icon: MapPin, title: "Avondale Location", description: "Easy access from West Ashley & Charleston" },
  { icon: Users, title: "Small Group Training", description: "Maximum attention, minimum intimidation" },
  { icon: Shield, title: "Joint-Friendly Environment", description: "Every exercise modified to your needs" }
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
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={studioMobilityTraining}
            alt="Low-impact mobility training at Drake Fitness in Charleston"
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
                <span className="text-accent font-bold uppercase tracking-wider text-sm">AVONDALE & WEST ASHLEY</span>
              </span>
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Low-Impact Fitness for Joint Pain
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-semibold">
                Try 3 Classes Free
              </p>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 md:mb-10 leading-relaxed">
                Train again without fear of making things worse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <a href={INTRO_URL} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    Claim 3 Free Classes
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <Link to="/schedule">
                    View Schedule
                  </Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Serving Avondale & West Ashley</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>All Levels Welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Coach-Led Sessions</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-12 md:py-16 lg:py-24 lg:pb-32 bg-background overflow-x-clip">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">WHO THIS IS FOR</span>
                <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 uppercase leading-tight">
                  If Exercise Has <span className="text-primary">Let You Down</span> Before
                </h2>

                <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                  {whoThisIsFor.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl border-l-4 border-accent">
                      <item.icon className="text-primary h-5 w-5 md:h-6 md:w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary text-primary-foreground p-5 md:p-8 rounded-2xl">
                  <h3 className="font-hero text-xl md:text-2xl font-bold mb-3 uppercase">This Program Was Built for You</h3>
                  <p className="text-primary-foreground/80 leading-relaxed text-sm md:text-base">Joint pain doesn't mean you should stop moving. It means you need better guidance and smarter loading. Our 3-Class Intro exists to change that — safely and intentionally.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1} className="overflow-visible">
              <div className="relative overflow-visible">
                <div className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={davidCoachingForm}
                    alt="David coaching a member on proper form at Drake Fitness"
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:absolute lg:-bottom-8 lg:-left-8 mt-6 lg:mt-0 bg-accent text-accent-foreground p-5 md:p-8 rounded-xl shadow-xl max-w-sm mx-auto lg:mx-0">
                  <p className="font-heading text-2xl md:text-3xl font-bold mb-2">85%</p>
                  <p className="font-semibold text-sm md:text-base">of our members are over 30 — training smarter than ever</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonial Strip */}
      <AnimatedSection animation="fadeInUp" delay={0.2}>
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-background border-l-4 border-accent p-6 rounded-r-xl">
                <div className="flex gap-1 text-accent mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg italic text-muted-foreground mb-3 leading-relaxed">
                  "I have had 3 lower back surgeries - was in constant pain... David and his team helped me get back to working out consistently and build strength. I am forever grateful for this place - it truly changed my life!"
                </p>
                <p className="text-foreground font-medium">— Caitlin P., Verified Google Review</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Low-Impact Approach Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">OUR APPROACH</span>
              <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">
                How We Train Around Pain
              </h2>
              <p className="text-xl text-muted-foreground">We don't "push through pain." We train around it — and often reduce it.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {ourApproach.map((item, index) => (
                <div key={index} className="bg-background p-8 md:p-10 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <item.icon className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="font-hero text-xl md:text-2xl font-bold mb-3 uppercase">{item.text}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
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
                  We modify intelligently so you can <strong className="text-primary">train with confidence.</strong>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3-Class Intro Offer Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={davidGobletSquat}
                  alt="Coach-led training session at Drake Fitness Charleston"
                  className="w-full h-full"
                />
                <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-accent text-accent-foreground px-4 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-lg">
                  <span className="text-xs md:text-sm uppercase tracking-wide">Limited Spots Available</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div>
                <span className="section-eyebrow text-primary">THE OFFER</span>
                <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase leading-tight">
                  What Is the <span className="text-primary">3-Class Intro?</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  A low-pressure introduction to joint-friendly training at Drake Fitness — scaled to your level. Try 3 classes free over 30 days.
                </p>

                <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                  {introIncludes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <item.icon className="text-primary-foreground h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg mb-1">{item.text}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary border-l-4 border-accent p-6 md:p-8 rounded-r-2xl mb-8">
                  <p className="text-lg font-semibold mb-2">No Pressure. No Contracts.</p>
                  <p className="text-muted-foreground text-sm md:text-base">No "keep up or fall behind" environment. Just smart, sustainable training that respects your joints.</p>
                </div>

                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <a href={INTRO_URL} target="_blank" rel="noopener noreferrer">
                    Claim 3 Free Classes
                    <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="py-12 md:py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8 md:mb-12">
              <span className="section-eyebrow text-primary">REAL RESULTS</span>
              <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground uppercase">
                Members Who Trained Through Pain
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="bg-background p-6 md:p-10 rounded-2xl shadow-lg">
                <div className="flex gap-1 text-accent mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-3 text-sm md:text-lg leading-relaxed">
                  "I had a bad back injury that was not getting better with physical therapy... Dave was BETTER than all physical therapists I've ever had."
                </p>
                <p className="text-foreground font-medium text-sm md:text-base">— Cara S., Verified Google Review</p>
              </div>
              <div className="bg-background p-6 md:p-10 rounded-2xl shadow-lg">
                <div className="flex gap-1 text-accent mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-3 text-sm md:text-lg leading-relaxed">
                  "His knowledge about the way the body mechanically works has helped me continue to exercise after multiple surgeries."
                </p>
                <p className="text-foreground font-medium text-sm md:text-base">— Vanessa H., Verified Google Review</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Environment Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">THE ENVIRONMENT</span>
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

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <span className="section-eyebrow text-primary">FREQUENTLY ASKED</span>
              <h2 className="font-hero text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground uppercase">
                Common Questions About Low-Impact Training
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-secondary rounded-xl border-none px-6">
                    <AccordionTrigger className="text-left font-bold text-base md:text-lg hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="section-eyebrow text-primary">VISIT US</span>
              <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
                Located in <span className="text-primary">Avondale, Charleston</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mt-4">5 minutes from West Ashley • Free parking on-site</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <GoogleMapEmbed height="450px" />
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-background p-8 md:p-10 rounded-2xl shadow-lg h-full flex flex-col justify-center">
                <h3 className="font-hero text-xl md:text-2xl font-bold mb-6 md:mb-8 uppercase">Getting Here</h3>
                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                      <MapPin className="text-primary-foreground h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg mb-1">Address</h4>
                      <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                        2 Avondale Ave, Charleston, SC 29407
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Clock className="text-primary-foreground h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg mb-1">Hours</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Mon-Fri: 5:30 AM - 7:00 PM</p>
                      <p className="text-muted-foreground text-sm md:text-base">Sat: 8:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Car className="text-primary-foreground h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg mb-1">Parking</h4>
                      <p className="text-muted-foreground text-sm md:text-base">Free on-site parking available</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-6 md:mt-8">
                  <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">READY TO GET STARTED?</span>
              <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">
                Train Again Without Fear
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 md:mb-10">
                Spots are limited to keep coaching quality high. Experience joint-friendly training with no commitment.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 md:p-12 mb-10 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
                {finalCTAFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex-shrink-0 flex items-center justify-center">
                      <item.icon className="text-accent-foreground h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/70 text-sm md:text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold uppercase tracking-wide whitespace-normal text-center">
                  <a href={INTRO_URL} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Claim 3 Free Classes Now
                  </a>
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
