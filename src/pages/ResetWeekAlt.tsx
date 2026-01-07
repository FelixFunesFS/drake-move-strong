import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Dumbbell, 
  HeartPulse, 
  Shield, 
  Infinity, 
  UserCheck, 
  Footprints, 
  Users, 
  Gauge,
  GraduationCap,
  Heart,
  Handshake,
  Check,
  X,
  ArrowRight
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";
import { TrustStatsBar } from "@/components/TrustStatsBar";
import { MicroTrustBadges } from "@/components/MicroTrustBadges";
import { PhilosophyQuote } from "@/components/PhilosophyQuote";
import { LongevityBlock } from "@/components/LongevityBlock";

import heroImage from "@/assets/hero-kettlebell-training.jpg";
import groupTrainingImage from "@/assets/group-kettlebell-training.jpg";

const RESET_WEEK_URL = "https://app.punchpass.com/org/5765/passes?tags=reset-week";

const audienceCards = [
  {
    icon: Dumbbell,
    title: "Beginners or Restarters",
    description: "Starting fresh or getting back into fitness after time off. You need a safe, supportive environment to rebuild confidence.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: HeartPulse,
    title: "Adults 30-65",
    description: "Dealing with stiffness, pain, or fear of injury. You want to move better without risking further damage.",
    iconBg: "bg-drake-gold/20",
    iconColor: "text-drake-dark"
  },
  {
    icon: Shield,
    title: "Consistency Seekers",
    description: "You want confidence and consistency, not punishment. A sustainable approach that fits your life.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  }
];

const whatHappens = [
  {
    icon: Infinity,
    title: "Unlimited Classes for 7 Days",
    description: "Attend as many sessions as you want. Find your rhythm and build momentum.",
    iconBg: "bg-drake-gold",
    iconColor: "text-drake-dark"
  },
  {
    icon: UserCheck,
    title: "Coach-Guided First Session",
    description: "Personal introduction to ensure you feel comfortable and understand the approach.",
    iconBg: "bg-primary",
    iconColor: "text-white"
  },
  {
    icon: Footprints,
    title: "Mobility-Focused Workouts",
    description: "Joint-friendly training that prioritizes how you move, not just how much you lift.",
    iconBg: "bg-drake-gold",
    iconColor: "text-drake-dark"
  },
  {
    icon: Users,
    title: "Small Group Environment",
    description: "Train alongside supportive people who understand your journey.",
    iconBg: "bg-primary",
    iconColor: "text-white"
  },
  {
    icon: Gauge,
    title: "No Pressure to \"Keep Up\"",
    description: "Work at your own pace. Progress is personal, not competitive.",
    iconBg: "bg-drake-gold",
    iconColor: "text-drake-dark"
  }
];

const differenceCards = [
  {
    icon: Footprints,
    title: "Mobility-First Training",
    description: "We start with how you move, not how much you lift. Better movement equals better results.",
    gradient: "from-primary to-primary/80"
  },
  {
    icon: GraduationCap,
    title: "Expert Modifications",
    description: "Our coaches are trained to modify every movement for your body and experience level.",
    gradient: "from-drake-gold to-yellow-500"
  },
  {
    icon: Heart,
    title: "Feel-First Focus",
    description: "We care about how your body feels, not just how much weight you can move.",
    gradient: "from-primary to-primary/80"
  },
  {
    icon: Handshake,
    title: "Supportive Community",
    description: "Accountability without intimidation. Everyone here is rooting for your success.",
    gradient: "from-drake-gold to-yellow-500"
  }
];

const ifItFeelsRight = [
  {
    title: "Choose a Simple Membership",
    description: "2x, 3x, or Unlimited weekly sessions — pick what fits your schedule."
  },
  {
    title: "Keep Building a Weekly Habit",
    description: "Consistency over intensity. Show up, move better, feel the difference."
  },
  {
    title: "Move Pain-Free Long Term",
    description: "Build strength that lasts and keeps your body feeling young."
  }
];

const ifNotForYou = [
  { text: "No pressure" },
  { text: "No contracts" },
  { text: "You still leave stronger and more confident" }
];

const ResetWeekAlt = () => {
  return (
    <>
      <SEO 
        title="Reset Week Charleston | $49 for 7 Days | Try Us 2026"
        description="Move better, feel stronger, stay pain-free. A safe, guided reset for people restarting fitness — even if gyms haven't worked before. 7 days unlimited for $49."
        canonical="https://drake.fitness/reset"
      />

      {/* Minimal Header */}
      <header className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/favicon.png" 
                alt="Drake Fitness" 
                className="h-12 w-auto"
              />
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
                Start Reset Week
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-drake-dark/95 via-drake-dark/75 to-drake-dark/50 z-10" />
          <img 
            src={heroImage} 
            alt="Reset Week at Drake Fitness" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 w-full text-white pt-28 md:pt-24 pb-16">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-drake-gold/20 backdrop-blur-sm border border-drake-gold/40 rounded-full px-6 py-2 mb-6"
            >
              <span className="text-drake-gold font-bold uppercase tracking-wider text-sm">Limited Offer • 7 Days Only</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-hero text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 uppercase tracking-tight"
            >
              Move Better.<br />
              Feel Stronger.<br />
              <span className="text-drake-gold">Stay Pain-Free.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light max-w-3xl"
            >
              A safe, guided reset for people restarting fitness — even if gyms haven't worked before.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-10 py-6 h-auto shadow-[var(--shadow-gold)] hover:scale-105 transition-transform group"
              >
                <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  Start Your Reset Week – $50
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <div className="flex flex-col text-sm text-gray-300 mt-2 sm:mt-0 sm:ml-4">
                <span className="font-semibold text-white">7 Days, Unlimited Classes</span>
                <span>No commitment required</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <TrustStatsBar 
        variant="compact" 
        stats={['sessions', 'charlestonians', 'experience', 'classSize']}
        className="bg-muted/50"
      />

      {/* Who It's For Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="section-eyebrow text-primary">Is This For You?</span>
            <h2 className="font-hero text-4xl md:text-5xl font-bold text-foreground mb-6 uppercase">
              Who <span className="text-primary">Reset Week</span> Is For
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              This program is designed for real people with real challenges — not elite athletes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audienceCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="bg-muted p-6 md:p-10 rounded-2xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary h-full">
                  <div className={`w-20 h-20 ${card.iconBg} rounded-full flex items-center justify-center mb-6`}>
                    <card.icon className={`${card.iconColor} w-8 h-8`} />
                  </div>
                  <h3 className="font-hero text-2xl font-bold mb-4 uppercase text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Testimonial for Reset Week Audience */}
          <AnimatedSection delay={0.3} className="mt-12">
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-2xl border border-primary/20 shadow-lg">
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => <span key={i} className="text-drake-gold text-xl">★</span>)}
              </div>
              <p className="text-lg text-foreground italic text-center mb-4">
                "I wasn't comfortable in this new body and didn't know how to move it correctly… He really assesses your needs and makes sure you don't get hurt."
              </p>
              <p className="text-center font-semibold text-foreground">— D. Ramos</p>
              <p className="text-center text-sm text-primary">Started with Reset Week</p>
            </div>
          </AnimatedSection>

          {/* Micro Trust Badges */}
          <MicroTrustBadges 
            badges={['local', 'reviews', 'safe']} 
            variant="inline" 
            className="mt-8"
          />
        </div>
      </section>

      {/* Philosophy Quote */}
      <PhilosophyQuote variant="inline" quote="philosophy" className="bg-muted/30" />

      {/* What Happens During Reset Week */}
      <section className="py-12 md:py-24 bg-drake-dark text-white md:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-drake-gold font-bold uppercase tracking-wider text-sm mb-2 block">Your Journey</span>
              <h2 className="font-hero text-4xl md:text-5xl font-bold mb-8 uppercase">
                What Happens During<br />
                <span className="text-drake-gold">Reset Week</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Seven days designed to help you move better, feel stronger, and build confidence in a supportive environment.
              </p>

              <div className="space-y-4">
                {whatHappens.map((item, index) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-5 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 ${item.iconBg} rounded-full flex items-center justify-center`}>
                      <item.icon className={`${item.iconColor} w-5 h-5`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 uppercase">{item.title}</h4>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative h-[500px] lg:h-[700px] w-full hidden lg:block">
              <div className="absolute inset-0 bg-drake-gold rounded-3xl transform rotate-3 translate-x-3 translate-y-3" />
              <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl transform -rotate-2">
                <img 
                  src={groupTrainingImage} 
                  alt="Small group fitness class at Drake Fitness" 
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-12 md:py-24 bg-background md:[clip-path:polygon(0_15%,100%_0,100%_100%,0_100%)]">
        <div className="container mx-auto px-4 pt-12">
          <AnimatedSection className="text-center mb-16">
            <span className="section-eyebrow text-primary">Our Approach</span>
            <h2 className="font-hero text-4xl md:text-5xl font-bold text-foreground mb-6 uppercase">
              Why Drake Fitness Is <span className="text-primary">Different</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just focus on getting you tired. We focus on getting you better.
            </p>
          </AnimatedSection>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {differenceCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="relative group h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl transform group-hover:scale-105 transition-transform duration-300`} />
                  <div className="relative bg-card m-1 p-6 md:p-8 rounded-2xl h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <card.icon className="text-primary w-7 h-7" />
                    </div>
                    <h3 className="font-hero text-xl font-bold mb-3 uppercase text-foreground">{card.title}</h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* After Reset Week Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="section-eyebrow text-primary">What's Next?</span>
            <h2 className="font-hero text-4xl md:text-5xl font-bold text-foreground mb-6 uppercase">
              What Happens <span className="text-primary">After</span> Reset Week
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* If It Feels Right */}
            <AnimatedSection>
              <div className="bg-card p-10 lg:p-12 rounded-3xl shadow-xl border-4 border-primary relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Check className="text-white w-7 h-7" />
                    </div>
                    <h3 className="font-hero text-2xl md:text-3xl font-bold uppercase text-foreground">If It Feels Right</h3>
                  </div>
                  
                  <ul className="space-y-5">
                    {ifItFeelsRight.map((item) => (
                      <li key={item.title} className="flex items-start gap-4">
                        <Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* If Not For You */}
            <AnimatedSection delay={0.1}>
              <div className="bg-card p-10 lg:p-12 rounded-3xl shadow-xl border-2 border-border relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <X className="text-muted-foreground w-7 h-7" />
                    </div>
                    <h3 className="font-hero text-2xl md:text-3xl font-bold uppercase text-foreground">If It's Not For You</h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    No hard feelings. Seriously. We want you to find what works for you.
                  </p>
                  
                  <ul className="space-y-4">
                    {ifNotForYou.map((item) => (
                      <li key={item.text} className="flex items-center gap-3 text-lg">
                        <div className="w-2 h-2 bg-drake-gold rounded-full" />
                        <span className="text-foreground font-medium">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-drake-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-hero text-4xl md:text-5xl font-bold mb-6 uppercase">
              Ready to <span className="text-drake-gold">Reset</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Seven days. Unlimited classes. Zero commitment. Just a chance to see if Drake Fitness is right for you.
            </p>
            
            {/* Longevity Block */}
            <LongevityBlock variant="minimal" className="mb-10" />
            
            <Button 
              asChild 
              size="lg" 
              className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-lg px-10 py-6 h-auto shadow-[var(--shadow-gold)] hover:scale-105 transition-transform group"
            >
              <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                Start Your Reset Week – $50
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-50 md:hidden">
        <Button 
          asChild 
          className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-base py-4 h-auto"
        >
          <a href={RESET_WEEK_URL} target="_blank" rel="noopener noreferrer">
            Start Reset Week – $50
          </a>
        </Button>
      </div>
    </>
  );
};

export default ResetWeekAlt;
