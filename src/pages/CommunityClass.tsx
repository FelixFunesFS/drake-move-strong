import { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";
import { buildPunchPassUrl, PUNCHPASS_URLS } from "@/data/pricing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImage from "@/assets/community-class-kettlebell-group.jpg?format=webp&w=1920";
import coachImage from "@/assets/david-double-kb-storefront-new.jpg?format=webp&w=768";
import drakeLogo from "@/assets/drake-fitness-logo2.png?format=webp&w=268";

const COMMUNITY_CLASS_URL = PUNCHPASS_URLS.communityClass;

const getReserveUrl = (content: string) =>
  buildPunchPassUrl(COMMUNITY_CLASS_URL, content, "community-class");

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJxVcMH1x5_ogR0ZGJ9vE38KA";

/** Compute the next 1st Saturday of the month */
function getNextFirstSaturday(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Find 1st Saturday of current month
  const first = new Date(year, month, 1);
  const dayOfWeek = first.getDay();
  const firstSat = new Date(year, month, 1 + ((6 - dayOfWeek + 7) % 7));

  // If it's still in the future (or today), use it; otherwise next month
  if (firstSat >= new Date(year, month, now.getDate())) {
    return firstSat;
  }
  const nextMonth = new Date(year, month + 1, 1);
  const nextDow = nextMonth.getDay();
  return new Date(year, month + 1, 1 + ((6 - nextDow + 7) % 7));
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const testimonials = [
  {
    quote:
      "I came in with chronic knee pain and now live pain free thanks to their guidance.",
    author: "Melissa F.",
    label: "Drake Fitness Member",
  },
  {
    quote:
      "He opened my eyes on how to be strong, move properly, and avoid senseless injuries.",
    author: "Chris P.",
    label: "Drake Fitness Member",
  },
  {
    quote:
      "I'm stronger in my 40s than I ever was in my 20s. The coaching here changed everything for me.",
    author: "Aaron Q.",
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

const faqs = [
  {
    q: "Do I need any experience?",
    a: "Not at all. This class is designed for all levels — complete beginners are welcome. Your coach will guide you through every movement.",
  },
  {
    q: "What should I bring?",
    a: "Just comfortable workout clothes and a water bottle. We provide all the equipment — kettlebells, mats, everything you need.",
  },
  {
    q: "Is parking available?",
    a: "Yes! There's free street parking along Avondale Ave and the surrounding side streets. Most people find a spot within a block.",
  },
  {
    q: "Can I bring a friend?",
    a: "Absolutely — the more the merrier. Just have them reserve a spot too so we can plan accordingly.",
  },
];

/* ── Dot indicator for carousel ── */
function CarouselDots({ api }: { api: CarouselApi | undefined }) {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    api.on("select", () => setSelected(api.selectedScrollSnap()));
  }, [api]);

  if (count <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === selected ? "bg-drake-gold" : "bg-white/30"
          }`}
          onClick={() => api?.scrollTo(i)}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
}

const CommunityClass = () => {
  const nextDate = useMemo(() => getNextFirstSaturday(), []);
  const nextDateStr = formatDate(nextDate);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

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

      {/* ── White Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
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
      <section className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Drake Fitness community kettlebell group class"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-drake-dark/90 via-drake-dark/70 to-drake-dark/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-hero text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] mb-6">
              <span className="text-white">STRONG STARTS</span>
              <br />
              <span className="text-drake-gold">HERE.</span>
            </h1>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl mb-4">
              A free community class — <strong className="text-white">next session {nextDateStr} at 10 AM.</strong>
              <br />
              Kettlebell strength + Original Strength mobility.
              <br />
              No experience needed. No cost. No commitment.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-3">
              <a
                href={getReserveUrl("hero-primary")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  RESERVE YOUR FREE SPOT
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <button
                onClick={scrollToExpect}
                className="text-white/70 hover:text-white text-sm flex items-center gap-1.5 transition-colors pt-2 sm:pt-3"
              >
                See what to expect
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-drake-gold/80 text-xs font-medium tracking-wide">
              Only 12 spots per class — reserve yours before they fill
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Event Detail Strip ── */}
      <section className="bg-drake-teal border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-8">
            {[
              {
                icon: Calendar,
                label: "NEXT CLASS",
                value: nextDateStr,
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
                <item.icon className="w-5 h-5 text-white mx-auto mb-2" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-1">
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
            <p className="text-xs font-bold tracking-[0.2em] text-drake-teal uppercase text-center mb-3">
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
                  <div className="w-10 h-10 rounded-full bg-drake-teal/15 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-drake-teal" />
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
                  <div className="w-10 h-10 rounded-full bg-drake-teal/15 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-drake-teal" />
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
                  <CheckCircle2 className="w-5 h-5 text-drake-teal shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Social Proof (Swipeable) ── */}
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
                5-star rating from 40+ reviews
              </span>
            </div>

            <Carousel
              opts={{ align: "start", loop: true }}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((t) => (
                  <CarouselItem
                    key={t.author}
                    className="basis-full md:basis-1/2"
                  >
                    <blockquote className="bg-drake-teal/10 border-l-4 border-drake-gold rounded-r-lg p-6 h-full flex flex-col justify-between">
                      <p className="text-white/90 text-lg italic leading-relaxed mb-4">
                        "{t.quote}"
                      </p>
                      <footer className="text-drake-gold text-sm font-medium">
                        — {t.author}, {t.label}
                      </footer>
                    </blockquote>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <CarouselDots api={carouselApi} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Meet Your Coach ── */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.2em] text-drake-teal uppercase text-center mb-3">
              YOUR GUIDE FOR THE DAY
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8">
            <AnimatedSection delay={0.1}>
              <img
                src={coachImage}
                alt="Coach David Drake with kettlebells"
                className="rounded-lg w-full object-cover aspect-[3/4] max-h-[400px] md:max-h-[500px]"
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Coach David Drake
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  David has coached movement and strength for over 25 years. With
                  a degree in Health & Exercise Science, he specializes in
                  helping people build real, lasting strength without breaking
                  their bodies down.
                </p>
                <p>
                  His approach is simple: move well first, then move often.
                  Every community class is coached hands-on — no guesswork.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {credentials.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-medium tracking-wide text-drake-teal bg-drake-teal/10 px-3 py-1.5 rounded-full"
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
            <p className="text-xs font-bold tracking-[0.2em] text-drake-teal uppercase text-center mb-3">
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
                  <div className="w-12 h-12 rounded-full bg-drake-teal text-white flex items-center justify-center font-hero text-xl font-bold mx-auto mb-4">
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

      {/* ── Community Block (with CTA) ── */}
      <section className="bg-drake-gold py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-drake-dark mb-4">
              This Is What a Real Training Community Feels Like.
            </h2>
            <p className="text-drake-dark/80 text-base leading-relaxed mb-8">
              Small group. Real coaching. No judgment.
              <br />
              Every first Saturday of the month at Drake Fitness in Avondale.
            </p>
            <a
              href={getReserveUrl("community-block-cta")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-drake-dark text-white hover:bg-drake-dark/90 gap-2"
              >
                RESERVE YOUR FREE SPOT
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.2em] text-drake-teal uppercase text-center mb-3">
              COMMON QUESTIONS
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              Got Questions? We've Got Answers.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              Next Class: {nextDateStr} · 10:00 AM · 2 Avondale Ave, Charleston, SC
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
