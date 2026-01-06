import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Phone, MapPin, ArrowRight, Users, Target, TrendingUp, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import OptimizedImage from '@/components/OptimizedImage';
import { SEO } from '@/components/SEO';
import AnimatedSection from '@/components/AnimatedSection';

import drakeLogo from '@/assets/drake-logo.png';
import heroImage from '@/assets/group-training.jpg';
import davidImage from '@/assets/david-outside.jpg';
import nickImage from '@/assets/coach-nick-new.jpg';
import studioImage from '@/assets/studio-full-view.jpg';

const RESET_WEEK_URL = "https://app.punchpass.com/org/9942/buy?passes=1023628";

const painPoints = [
  "Tired of starting over every January?",
  "Dealing with back pain, stiffness, or old injuries?",
  "Overwhelmed by crowded gyms and confusing programs?",
  "Looking for sustainable fitness, not quick fixes?",
];

const offerIncludes = [
  "7 days of unlimited classes",
  "Access to all class types",
  "Expert coaching every session",
  "Small group attention (max 8 people)",
  "No commitment required",
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
    description: "See how your body responds in just one week. Feel the difference immediately.",
  },
];

const steps = [
  { number: "01", title: "Get Reset Week", description: "Purchase your 7-day unlimited pass" },
  { number: "02", title: "Pick Your Classes", description: "Choose from our full schedule" },
  { number: "03", title: "Feel the Difference", description: "Move better in just one week" },
];

const testimonials = [
  {
    name: "Felix F.",
    quote: "The coaches are incredibly attentive, they watch your form, make adjustments, and explain why certain movements matter… you feel confident in every exercise.",
    result: "Beginner confidence",
    stars: 5,
  },
  {
    name: "D. Ramos",
    quote: "I wasn't comfortable in this new body and didn't know how to move it correctly… He really assesses your needs and makes sure you don't get hurt.",
    result: "Restarting safely",
    stars: 5,
  },
  {
    name: "Caitlin P.",
    quote: "I have had 3 lower back surgeries… they helped me get back to working out consistently.",
    result: "Back after 3 surgeries",
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
    question: "What happens after Reset Week?",
    answer: "After your Reset Week, you can continue with our regular membership at $199/month (no contract), or choose a class pack that fits your schedule. No pressure—we want what's right for you.",
  },
  {
    question: "How is this different from a regular gym?",
    answer: "Unlike big-box gyms, every class is coached by an expert (David or Nick). We focus on movement quality over intensity, and you'll never feel lost or ignored. It's personal training in a small group setting.",
  },
  {
    question: "How many classes can I take during Reset Week?",
    answer: "Unlimited! Take as many classes as you'd like during your 7 days. We recommend starting with 2-3 classes and building from there based on how you feel.",
  },
];

const ResetWeek = () => {
  const scrollToOffer = () => {
    document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Reset Week Charleston | 7 Days $49 | Best Intro 2026"
        description="One week to reset how you move and feel. Get 7 days of unlimited classes at Drake Fitness Charleston for just $49. Expert coaching, mobility-first training. No commitment."
        canonical="https://drake.fitness/reset-week"
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
              Start Here
            </span>
            
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-primary-foreground mb-4 leading-tight">
              One Week to Reset<br />
              <span className="text-drake-gold">How You Move</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              7 days of unlimited classes for just <span className="text-drake-gold font-bold">$49</span>. Experience mobility-first training that actually works.
            </p>

            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Reset Week <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-drake-gold" /> No commitment</span>
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
                  Best Way to Start
                </div>

                <div className="text-center mb-8">
                  <h2 className="font-hero text-3xl md:text-4xl uppercase text-drake-dark mb-4">
                    Reset Week
                  </h2>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-5xl md:text-6xl font-hero font-bold text-drake-teal">$49</span>
                  </div>
                  <p className="text-drake-slate-gray text-lg">7 days unlimited access</p>
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
                      <Calendar className="h-10 w-10 text-drake-teal mx-auto mb-3" />
                      <p className="text-drake-dark font-semibold mb-1">Starts When You're Ready</p>
                      <p className="text-drake-slate-gray text-sm">Your 7 days begin with your first class</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-10 py-6 rounded-lg w-full md:w-auto"
                  >
                    <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
                      Get Reset Week — $49
                    </a>
                  </Button>
                  <p className="text-drake-slate-gray text-sm mt-4">
                    No commitment • No contract • Just results
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
              What Members Say
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
                    <p className="font-bold text-drake-dark">{testimonial.name}</p>
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
                    alt="Coach Nick Poppa"
                    className="w-full h-full object-cover"
                    objectPosition="center 20%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-drake-dark via-drake-dark/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-hero text-2xl text-primary-foreground">Nick Poppa</h3>
                    <p className="text-drake-gold">Holistic Coach</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-drake-slate-gray">Corrective exercise specialist • Mind-body integration expert</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="bg-drake-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <OptimizedImage
                src={studioImage}
                alt="Drake Fitness Studio"
                className="w-full rounded-lg shadow-lg"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <span className="section-eyebrow text-drake-gold">Our Space</span>
              <h2 className="font-hero text-3xl md:text-4xl uppercase text-primary-foreground mb-6">
                A Place You'll Actually Want to Train
              </h2>
              <div className="space-y-4 text-primary-foreground/80">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-drake-gold flex-shrink-0" />
                  <span>2 Avondale Ave, Charleston, SC 29407</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-drake-gold flex-shrink-0" />
                  <span>Morning and evening classes available</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-drake-gold flex-shrink-0" />
                  <span>Small groups, never more than 8 people</span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold mt-8"
              >
                <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
                  Start Reset Week
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-drake-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-drake-teal">Common Questions</span>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark">
              FAQs
            </h2>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-lg border-0 shadow-sm px-6"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-drake-dark hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-drake-slate-gray pb-5">
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
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl uppercase text-drake-dark mb-4">
              Ready to Reset?
            </h2>
            <p className="text-drake-dark/80 text-lg mb-8 max-w-xl mx-auto">
              One week. $49. No commitment. Just the chance to feel what functional fitness can do for you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-drake-dark hover:bg-drake-dark/90 text-white font-bold text-lg px-10 py-6 rounded-lg"
            >
              <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
                Get Reset Week — $49 <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-drake-dark/95 backdrop-blur-sm p-4 md:hidden z-50 border-t border-drake-gold/20">
        <Button
          asChild
          className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold py-4"
        >
          <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
            Start Reset Week — $49
          </a>
        </Button>
      </div>

      {/* Spacer for sticky CTA on mobile */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default ResetWeek;
