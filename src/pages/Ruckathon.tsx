import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Footprints,
  UserCheck,
  Route,
  Backpack,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Users,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";

import heroImage from "@/assets/ruckathon-hero-group.jpg";
import ruckathonImage from "@/assets/ruckathon-sandbag-lunge.jpg";
import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png?format=webp&w=268";

const RALLYUP_URL = "https://warriorsurf.rallyup.com/ruckathon2026/Campaign/Details";

interface RuckathonClass {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  instructor: string | null;
  punchpass_url: string | null;
  spots_remaining: number | null;
  location: string | null;
}

const includedCards = [
  {
    icon: Footprints,
    title: "Mobility Prep",
    description: "15 minutes of targeted mobility for hips, shoulders, and spine to keep you moving freely.",
  },
  {
    icon: UserCheck,
    title: "Movement Coaching",
    description: "Posture and movement coaching to reduce pain and prevent hotspots during your ruck.",
  },
  {
    icon: Route,
    title: "Coached Ruck",
    description: "A coached 1–2 mile ruck through the neighborhood at your pace with expert guidance.",
  },
  {
    icon: Backpack,
    title: "Gear Tips",
    description: "Tips on pack setup, footwear selection, and pacing strategy for event day.",
  },
];

const bringList = [
  "Your rucksack (weighted or unweighted)",
  "Comfortable, weather-appropriate clothing",
  "Ruck-worthy footwear (broken in)",
];

const Ruckathon = () => {
  const [classes, setClasses] = useState<RuckathonClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data, error } = await supabase
          .from("punchpass_schedule")
          .select("*")
          .ilike("class_name", "%ruckathon%")
          .gte("class_date", new Date().toISOString().split("T")[0])
          .order("class_date", { ascending: true });

        if (!error && data) {
          setClasses(data);
        }
      } catch (err) {
        console.error("Error fetching ruckathon classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${display}:${m} ${ampm}`;
  };

  return (
    <>
      <SEO
        title="Ruckathon Prep Class | Free for Warrior Surf 2026 Participants"
        description="Get ruck-ready with Drake Fitness. Free Ruckathon Prep Class for registered Warrior Surf 2026 participants. Mobility, coached ruck, and gear tips."
        canonical="https://drake.fitness/ruckathon"
      />

      {/* Minimal Header */}
      <header className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={drakeLogo}
                alt="Drake Fitness"
                className="h-10 md:h-14 w-auto"
                width={134}
                height={64}
              />
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm md:text-base">
              <a href={classes[0]?.punchpass_url || RALLYUP_URL} target="_blank" rel="noopener noreferrer">
                Reserve Your Spot
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-drake-dark/95 via-drake-dark/80 to-drake-dark/50 z-10" />
          <img
            src={heroImage}
            alt="Drake Fitness ruckathon group photo outdoors"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 w-full text-white pt-28 md:pt-24 pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-drake-gold/20 backdrop-blur-sm border border-drake-gold/40 rounded-full px-5 py-2 mb-6"
            >
              <span className="text-drake-gold font-bold uppercase tracking-wider text-xs md:text-sm">
                Free for Registered Participants
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 uppercase tracking-tight"
            >
              Get Ruck-Ready for
              <br />
              <span className="text-drake-gold">Warrior Surf 2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed font-light max-w-3xl"
            >
              Drake Fitness is proud to be a donor and training partner for the 2026 Warrior Surf Ruckathon at James Island County Park.
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
                className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto shadow-[var(--shadow-gold)] hover:scale-105 transition-transform group"
              >
                <a href={RALLYUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  View the Ruckathon Campaign
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Intro */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow text-primary">Training Partner</span>
            <h2 className="font-hero text-3xl md:text-5xl font-bold text-foreground mb-6 uppercase">
              Show Up Strong for <span className="text-primary">Veterans & Families</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              To help you show up strong for veterans and their families, we're hosting a special{" "}
              <strong className="text-foreground">Ruckathon Prep Class</strong> that's free for all registered participants.
            </p>
            <Button asChild variant="outline" size="lg" className="group">
              <a href={RALLYUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Learn About the Ruckathon Campaign
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-drake-dark text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="text-drake-gold font-bold uppercase tracking-wider text-sm mb-2 block">
              Your Prep Session
            </span>
            <h2 className="font-hero text-3xl md:text-5xl font-bold mb-6 uppercase">
              What's <span className="text-drake-gold">Included</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {includedCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all h-full">
                  <div className="w-14 h-14 bg-drake-gold rounded-full flex items-center justify-center mb-5">
                    <card.icon className="text-drake-dark w-6 h-6" />
                  </div>
                  <h3 className="font-hero text-xl font-bold mb-3 uppercase">{card.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{card.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="mb-8 lg:mb-0">
                <span className="section-eyebrow text-primary">Come Prepared</span>
                <h2 className="font-hero text-3xl md:text-5xl font-bold text-foreground uppercase mb-8">
                  What to <span className="text-primary">Bring</span>
                </h2>
                <div className="space-y-4">
                  {bringList.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 bg-card p-5 rounded-xl border border-border"
                    >
                      <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                      <span className="text-foreground text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-3 bg-drake-gold/20 rounded-2xl transform rotate-2" />
                <img
                  src={ruckathonImage}
                  alt="Sandbag overhead lunge during outdoor ruck training"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Live Class Schedule */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow text-primary">Upcoming Sessions</span>
            <h2 className="font-hero text-3xl md:text-5xl font-bold text-foreground mb-6 uppercase">
              Ruckathon <span className="text-primary">Prep Classes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two Saturday sessions to get your body and gear dialed in before the big day.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse text-muted-foreground">Loading schedule…</div>
            </div>
          ) : classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {classes.map((cls, index) => (
                <AnimatedSection key={cls.id} delay={index * 0.15}>
                  <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all shadow-lg">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(cls.class_date)}
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(cls.start_time)}{cls.end_time ? ` – ${formatTime(cls.end_time)}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{cls.location || "Drake Fitness Studio"}</span>
                      </div>
                      {cls.instructor && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <UserCheck className="w-4 h-4" />
                          <span>Coach {cls.instructor}</span>
                        </div>
                      )}
                      {cls.spots_remaining !== null && (
                        <div className="flex items-center gap-2 text-drake-gold font-semibold text-sm">
                          <Users className="w-4 h-4" />
                          <span>{cls.spots_remaining} spots remaining</span>
                        </div>
                      )}
                    </div>
                    {cls.punchpass_url && (
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                        <a href={cls.punchpass_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Reserve Spot
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center">
              <p className="text-muted-foreground text-lg">
                No upcoming Ruckathon Prep classes scheduled. Check back soon!
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Limited Spots Urgency */}
      <section className="py-12 md:py-16 bg-drake-gold">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="w-8 h-8 text-drake-dark" />
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-drake-dark uppercase">
                Limited to 15 Participants
              </h2>
            </div>
            <p className="text-drake-dark/80 text-lg max-w-xl mx-auto">
              Small class size means personalized coaching and attention for every participant. Reserve your spot early.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-drake-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-hero text-3xl md:text-5xl font-bold mb-6 uppercase">
              Ready to <span className="text-drake-gold">Ruck?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Register for the Warrior Surf Ruckathon, then reserve your free prep class and show up ready to go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto hover:scale-105 transition-transform group"
              >
                <a href={RALLYUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  Register for the Ruckathon
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              {classes[0]?.punchpass_url && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-drake-gold text-drake-gold hover:bg-drake-gold/10 font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto group"
                >
                  <a href={classes[0].punchpass_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    Reserve Prep Class
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-drake-dark border-t border-white/10 text-center text-white/50 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Drake Fitness · Charleston, SC</p>
          <p className="mt-1">
            <Link to="/" className="hover:text-white/80 transition-colors">Back to drake.fitness</Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Ruckathon;
