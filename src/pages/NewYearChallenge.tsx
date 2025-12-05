import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Phone, MapPin, ArrowRight, Users, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CountdownTimer from '@/components/CountdownTimer';
import OptimizedImage from '@/components/OptimizedImage';
import { SEO } from '@/components/SEO';
import AnimatedSection from '@/components/AnimatedSection';

import drakeLogo from '@/assets/drake-logo.png';
import heroImage from '@/assets/group-training.jpg';
import davidImage from '@/assets/david-outside.jpg';
import nickImage from '@/assets/coach-nick-new.jpg';
import studioImage from '@/assets/studio-full-view.jpg';

// January 31, 2026 at midnight EST
const OFFER_END_DATE = new Date('2026-01-31T23:59:59-05:00');

const painPoints = [
  "Tired of starting over every January?",
  "Dealing with back pain, stiffness, or old injuries?",
  "Overwhelmed by crowded gyms and confusing programs?",
  "Looking for sustainable fitness, not quick fixes?",
];

const offerIncludes = [
  "Unlimited classes for 30 days",
  "Free movement assessment ($75 value)",
  "Access to all class types",
  "Progress tracking included",
  "Expert coaching every session",
];

const benefits = [
  {
    icon: Target,
    title: "Mobility First",
    description: "We fix how you move before adding intensity—preventing injury and building lasting strength.",
  },
  {
    icon: Users,
    title: "Expert Coaching",
    description: "Small classes led by David or Nick every session. Never more than 8 people.",
  },
  {
    icon: TrendingUp,
    title: "Real Results",
    description: "Track your progress with regular assessments and see measurable improvements.",
  },
];

const steps = [
  { number: "01", title: "Book", description: "Schedule your free movement assessment" },
  { number: "02", title: "Train", description: "Join unlimited classes with expert coaches" },
  { number: "03", title: "Transform", description: "Move better, feel stronger, live fully" },
];

const testimonials = [
  {
    name: "Sarah M.",
    age: 45,
    quote: "After just 8 weeks, my chronic back pain is gone. I wish I'd found Drake Fitness years ago.",
    result: "Pain-free in 8 weeks",
    stars: 5,
  },
  {
    name: "Mike T.",
    age: 52,
    quote: "The mobility-first approach changed everything. I'm stronger and more flexible than I was in my 30s.",
    result: "Stronger than ever",
    stars: 5,
  },
  {
    name: "Jennifer L.",
    age: 38,
    quote: "Lost 25 lbs and gained so much confidence. The coaches truly care about your success.",
    result: "Lost 25 lbs",
    stars: 5,
  },
];

const faqs = [
  {
    question: "I'm a complete beginner—is this for me?",
    answer: "Absolutely! Most of our members started with zero fitness experience. Every exercise is scaled to your current ability, and our coaches guide you every step of the way.",
  },
  {
    question: "I have injuries or chronic pain. Can I still participate?",
    answer: "Yes! Our mobility-first approach is specifically designed to work around limitations and actually improve them. Many members come to us because of pain and leave feeling better than they have in years.",
  },
  {
    question: "What happens after the first month?",
    answer: "After your challenge month, you can continue with our regular membership at $199/month (no contract), or choose a class pack that fits your schedule. No pressure—we want what's right for you.",
  },
  {
    question: "How is this different from a regular gym?",
    answer: "Unlike big-box gyms, every class is coached by an expert (David or Nick). We focus on movement quality over intensity, and you'll never feel lost or ignored. It's personal training in a small group setting.",
  },
  {
    question: "Can I cancel if it's not for me?",
    answer: "The January Challenge is a one-time payment with no ongoing commitment. If it's not the right fit, you're under no obligation to continue. We're confident you'll love it.",
  },
];

const NewYearChallenge = () => {
  const scrollToOffer = () => {
    document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="New Year Challenge - 50% Off First Month | Drake Fitness Charleston"
        description="Start 2025 stronger with our January Challenge. Get 50% off your first month of unlimited classes at Drake Fitness Charleston. Expert coaching, mobility-first training."
        canonical="https://drake.fitness/new-year"
      />

      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
        <Link to="/">
          <img src={drakeLogo} alt="Drake Fitness" className="h-10 md:h-12 w-auto" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroImage}
            alt="Group fitness training at Drake Fitness"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-drake-dark/80 via-drake-dark/70 to-drake-dark/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block bg-drake-gold text-drake-dark font-bold text-xs md:text-sm uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              Limited Time Offer
            </span>
            
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-primary-foreground mb-4 leading-tight">
              New Year. New You.<br />
              <span className="text-drake-gold">50% Off.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start 2026 stronger with our January Challenge — unlimited classes for just <span className="text-drake-gold font-bold">$99</span> your first month
            </p>

            <div className="mb-8">
              <p className="text-sm text-primary-foreground/60 mb-3 uppercase tracking-wider">Offer ends in:</p>
              <CountdownTimer targetDate={OFFER_END_DATE} />
            </div>

            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Claim Your Spot <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-drake-gold" /> No long-term contract</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-drake-gold" /> Expert coaching</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-drake-gold" /> Beginner-friendly</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-drake-teal py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="section-eyebrow text-drake-gold">Sound Familiar?</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground mb-10">
              Is This You?
            </h2>
            
            <div className="space-y-4 text-left max-w-xl mx-auto">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="w-6 h-6 rounded border-2 border-drake-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-drake-gold" />
                  </div>
                  <span className="text-primary-foreground text-lg">{point}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-primary-foreground/80 text-xl mt-10 font-semibold">
              There's a better way →
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution/Benefits Section */}
      <section className="bg-drake-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-teal">The Solution</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark">
              The Drake Fitness Difference
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="p-8 text-center h-full bg-card border-0 shadow-card">
                  <div className="w-16 h-16 bg-drake-cool-gray rounded-xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-drake-teal" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-drake-dark mb-3">{benefit.title}</h3>
                  <p className="text-drake-slate-gray">{benefit.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer-section" className="bg-drake-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <Card className="relative overflow-hidden bg-card border-4 border-drake-gold p-8 md:p-12">
                <div className="absolute top-0 right-0 bg-drake-gold text-drake-dark font-bold text-sm uppercase px-6 py-2 rounded-bl-lg">
                  January Special
                </div>

                <div className="text-center mb-8">
                  <h2 className="font-hero text-3xl md:text-4xl uppercase text-drake-dark mb-4">
                    Your 2025 Transformation Starts Here
                  </h2>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-drake-slate-gray line-through text-2xl">$199</span>
                    <span className="text-5xl md:text-6xl font-hero font-bold text-drake-teal">$99</span>
                  </div>
                  <p className="text-drake-slate-gray text-lg">First month unlimited access</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-drake-dark mb-4">What's Included:</h3>
                    <ul className="space-y-3">
                      {offerIncludes.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-drake-teal rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                          <span className="text-drake-dark">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-drake-light rounded-lg p-6 text-center">
                      <p className="text-sm text-drake-slate-gray mb-2">Offer ends in:</p>
                      <CountdownTimer targetDate={OFFER_END_DATE} variant="compact" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-10 py-6 rounded-lg w-full md:w-auto"
                  >
                    <Link to="/contact">Start My Challenge</Link>
                  </Button>
                  <p className="text-drake-slate-gray text-sm mt-4">
                    Limited spots available • No commitment required
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-drake-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-teal">Simple Process</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark">
              How It Works
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.15} className="text-center">
                <div className="relative">
                  <span className="font-hero text-7xl md:text-8xl text-drake-teal/10 font-bold">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="font-hero text-2xl uppercase text-drake-dark mb-2">{step.title}</h3>
                    <p className="text-drake-slate-gray">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-drake-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-gold">Success Stories</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground">
              Real Results From Real People
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="p-6 h-full bg-card border-0 shadow-card">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-drake-gold text-drake-gold" />
                    ))}
                  </div>
                  <p className="text-drake-dark italic mb-4">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <p className="font-bold text-drake-dark">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-drake-teal font-semibold text-sm">{testimonial.result}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Coaches */}
      <section className="bg-drake-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-teal">Expert Guidance</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark">
              Meet Your Coaches
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <AnimatedSection>
              <Card className="overflow-hidden border-0 shadow-card">
                <div className="aspect-[4/3] relative">
                  <OptimizedImage
                    src={davidImage}
                    alt="David Drake"
                    className="w-full h-full object-cover"
                    objectPosition="center 20%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-drake-dark via-drake-dark/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-hero text-2xl text-primary-foreground">David Drake</h3>
                    <p className="text-drake-gold">Owner & Head Coach</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-drake-slate-gray">25+ years experience • StrongFirst certified kettlebell instructor</p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Card className="overflow-hidden border-0 shadow-card">
                <div className="aspect-[4/3] relative">
                  <OptimizedImage
                    src={nickImage}
                    alt="Coach Nick"
                    className="w-full h-full object-cover"
                    objectPosition="center 20%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-drake-dark via-drake-dark/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-hero text-2xl text-primary-foreground">Nick Poppa</h3>
                    <p className="text-drake-gold">Corrective Exercise Specialist</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-drake-slate-gray">Holistic coaching specialist • Movement & mobility expert</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-drake-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-teal">Questions?</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark">
              Common Questions
            </h2>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg border-0 shadow-card px-6">
                  <AccordionTrigger className="text-left font-heading font-semibold text-drake-dark hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-drake-slate-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-drake-gold py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark mb-6">
              Your 2025 Transformation Starts Now
            </h2>
            
            <div className="mb-8">
              <CountdownTimer targetDate={OFFER_END_DATE} variant="compact" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-drake-dark/60 line-through text-xl">$199</span>
              <span className="text-4xl md:text-5xl font-hero font-bold text-drake-dark">$99</span>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-drake-dark hover:bg-drake-dark/90 text-primary-foreground font-bold text-lg px-10 py-6 rounded-lg"
            >
              <Link to="/contact">Claim Your Spot Now</Link>
            </Button>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10 text-drake-dark">
              <a href="tel:8438175420" className="flex items-center gap-2 hover:underline">
                <Phone className="h-5 w-5" />
                (843) 817-5420
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                2 Avondale Ave, Charleston, SC
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-drake-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/60 text-sm">
            <Link to="/">
              <img src={drakeLogo} alt="Drake Fitness" className="h-8 w-auto" />
            </Link>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms</Link>
            </div>
            <p>© {new Date().getFullYear()} Drake Fitness</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-drake-dark/95 backdrop-blur-sm border-t border-drake-gold/20 p-4 md:hidden z-50">
        <Button
          asChild
          className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold py-4"
        >
          <Link to="/contact">Start My Challenge — $99</Link>
        </Button>
      </div>
    </>
  );
};

export default NewYearChallenge;
