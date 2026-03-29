import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Dumbbell,
  Activity,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";
import { buildPunchPassUrl, PUNCHPASS_URLS } from "@/data/pricing";

import heroImage from "@/assets/community-turkish-getup-class.jpg?format=webp&w=1920";
import coachImage from "@/assets/david-double-kb-storefront-new.jpg?format=webp&w=768";
import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png?format=webp&w=268";

const COMMUNITY_CLASS_URL = PUNCHPASS_URLS.communityClass;

const getReserveUrl = (content: string) =>
  buildPunchPassUrl(COMMUNITY_CLASS_URL, content, "community-class");

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJxVcMH1x5_ogR0ZGJ9vE38KA";

const testimonials = [
  {
    quote:
      "Better than any physical therapist or personal trainer I've ever had.",
    author: "Cara S.",
    label: "Drake Fitness Member",
  },
  {
    quote:
      "I came in with chronic knee pain and now live pain free thanks to their guidance.",
    author: "Melissa F.",
    label: "Drake Fitness Member",
  },
];

const whoItsFor = [
  "Complete beginners who've never picked up a kettlebell",
  "Experienced lifters who want better movement quality",
  "Anyone who feels stiff, achy, or wants to move pain-free",
  "Adults 30–65+ who want sustainable, joint-friendly training",
];

const credentials = [
  "25+ Years Experience",
  "Health & Exercise Science Degree",
  "Original Strength Certified",
  "StrongFirst Instructor",
];

const CommunityClass = () => {
  const scrollToExpect = () => {
    document
      .getElementById("what-to-expect")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Free Kettlebell & Mobility Class in Charleston"
        seoTitle="Free Kettlebell & Mobility Class in Charleston — Drake Fitness Community Saturday"
        description="Join Drake Fitness every 1st Saturday at 10 AM in Avondale for a free community class. Kettlebell strength + Original Strength mobility. Coached by David Drake. All levels welcome."
        canonical="https://www.drake.fitness/community-class"
        ogType="website"
      />

      {/* ── Minimal Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-drake-dark/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <img
            src={drakeLogo}
            alt="Drake Fitness"
            className="h-10"
            loading="eager"
          />
          <a
            href={getReserveUrl("header-cta")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="sm" className="text-xs">
              RESERVE YOUR SPOT
            </Button>
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Drake Fitness community class doing Turkish get-ups"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-drake-dark/90 via-drake-dark/70 to-drake-dark/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase mb-6">
              <MapPin className="w-3.5 h-3.5 text-drake-gold" />
              AVONDALE · WEST ASHLEY · CHARLESTON
            </span>

            <h1 className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] mb-6">
              <span className="text-white">STRONG STARTS</span>
              <br />
              <span className="text-drake-gold">HERE.</span>
            </h1>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              A free community class — every 1st Saturday of the month.
              <br />
              Kettlebell strength + Original Strength mobility.
              <br />
              No experience needed. No cost. No commitment.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={getReserveUrl("hero-primary")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="lg" className="gap-2">
                  RESERVE YOUR FREE SPOT
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white gap-2"
                onClick={scrollToExpect}
              >
                SEE WHAT TO EXPECT
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Event Detail Strip ── */}
      <section className="bg-drake-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Calendar,
                label: "WHEN",
                value: "1st Saturday of Every Month",
              },
              { icon: Clock, label: "TIME", value: "10:00 AM" },
              {
                icon: MapPin,
                label: "WHERE",
                value: "Drake Fitness — 2 Avondale Ave",
                href: GOOGLE_MAPS_URL,
              },
              { icon: DollarSign, label: "COST", value: "100% Free" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-5 h-5 text-drake-gold mx-auto mb-2" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-drake-gold uppercase mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-drake-gold transition-colors underline underline-offset-2"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-white font-medium">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Do ── */}
      <section id="what-to-expect" className="bg-background py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.2em] text-drake-gold uppercase text-center mb-3">
              WHAT TO EXPECT
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              One Hour. Two Methods. Built for Every Body.
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              This isn't a pitch. It's a real workout — open to the community,
              coached from start to finish.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="text-foreground font-medium text-center mb-8">
              Each session includes two elements that work together:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Kettlebell Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-drake-gold/15 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-drake-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Kettlebell Strength Training
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Learn to swing, press, and carry with proper form. Kettlebells
                  build functional, full-body strength that carries over to
                  everything you do — from carrying groceries to staying strong
                  into your 60s and beyond.
                </p>
              </div>

              {/* OS Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-drake-gold/15 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-drake-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Original Strength Mobility
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A proven system of rolling, rocking, and breathing patterns
                  that restore your body's natural movement — loosening tight
                  hips, stiff spines, and locked-up shoulders. Think of it as a
                  reset for how your body moves.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Who it's for */}
          <AnimatedSection delay={0.25}>
            <h3 className="font-heading text-xl font-bold text-foreground text-center mb-6">
              Who this is for:
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {whoItsFor.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-drake-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="bg-drake-dark py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-drake-gold fill-drake-gold"
                />
              ))}
              <span className="text-white/60 text-sm ml-2">
                Google Reviews
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <blockquote key={t.author} className="text-center">
                  <p className="text-white/90 text-lg italic leading-relaxed mb-3">
                    "{t.quote}"
                  </p>
                  <footer className="text-drake-gold text-sm font-medium">
                    — {t.author}, {t.label}
                  </footer>
                </blockquote>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Meet Your Coach ── */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.2em] text-drake-gold uppercase text-center mb-3">
              YOUR GUIDE FOR THE DAY
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8">
            <AnimatedSection delay={0.1}>
              <img
                src={coachImage}
                alt="Coach David Drake with kettlebells"
                className="rounded-lg w-full object-cover aspect-[3/4] max-h-[500px]"
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Coach David Drake
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  David has been coaching movement and strength for over 25
                  years. He holds a degree in Health & Exercise Science and
                  specializes in helping people build real, lasting strength
                  without breaking their bodies down in the process.
                </p>
                <p>
                  His approach is simple: move well first, then move often.
                  Whether you've never trained before or you've been active your
                  whole life, David meets you exactly where you are.
                </p>
                <p>
                  Every community class is led personally by David — no
                  assistants, no guesswork.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {credentials.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-medium tracking-wide text-muted-foreground bg-muted px-3 py-1.5 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.2em] text-drake-gold uppercase text-center mb-3">
              HOW IT WORKS
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Three Steps to Your First Class
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Reserve Your Spot",
                desc: "Click the button below and grab your free spot. Space is limited to keep the class small and coached.",
              },
              {
                step: 2,
                title: "Show Up Saturday at 10 AM",
                desc: "Arrive at 2 Avondale Ave, Charleston at 10 AM. Wear comfortable workout clothes. No equipment needed — we provide everything.",
              },
              {
                step: 3,
                title: "Move, Learn & Connect",
                desc: "Experience a full coached session. Meet other people in the community. Leave feeling better than when you arrived.",
              },
            ].map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-drake-gold text-drake-dark flex items-center justify-center font-hero text-xl font-bold mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Block ── */}
      <section className="bg-drake-gold py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-drake-dark mb-4">
              This Is What a Real Training Community Feels Like.
            </h2>
            <p className="text-drake-dark/80 text-base leading-relaxed">
              Small group. Real coaching. No judgment.
              <br />
              Every first Saturday of the month at Drake Fitness in Avondale.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-drake-dark py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-4">
              <span className="text-white">Your Spot Is Free.</span>
              <br />
              <span className="text-drake-gold">Reserve It Now.</span>
            </h2>

            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              Every 1st Saturday · 10:00 AM · 2 Avondale Ave, Charleston, SC
              <br />
              Beginner-friendly · Coach-led · No equipment needed
            </p>

            <a
              href={getReserveUrl("final-cta")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="lg" className="gap-2 text-base">
                RESERVE YOUR FREE SPOT
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <p className="text-white/50 text-xs mt-6">
              Questions? Call or text:{" "}
              <a
                href="tel:+18438175420"
                className="hover:text-drake-gold transition-colors"
              >
                (843) 817-5420
              </a>{" "}
              ·{" "}
              <a
                href="mailto:david@drake.fitness"
                className="hover:text-drake-gold transition-colors"
              >
                david@drake.fitness
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Minimal Footer ── */}
      <footer className="bg-drake-dark border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Drake Fitness · 2 Avondale Ave,
            Charleston, SC 29407
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/drakefitnesschs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-drake-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100063722011333"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-drake-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@drakefitness"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-drake-gold transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CommunityClass;
