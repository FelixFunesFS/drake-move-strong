import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { PUNCHPASS_URLS } from "@/data/pricing";

const Welcome = () => {
  return (
    <>
      <SEO
        title="Welcome to Drake Fitness | Book Your First Class"
        description="Your 3-Class Intro pass is active! Here's how to book your first class and what to expect at Drake Fitness."
        canonical="https://drake.fitness/welcome"
      />

      <main>
        <section className="pt-32 pb-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h1 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
                  You're In! <span className="text-primary">Welcome to Drake Fitness</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Your 3-Class Intro pass is active. Here's how to get started.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Step-by-step */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection animation="fadeInUp">
                <h2 className="font-hero text-2xl md:text-3xl font-bold uppercase mb-8 text-center">
                  Next Steps: <span className="text-primary">Book Your First Class</span>
                </h2>
              </AnimatedSection>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Pick a Strength & Mobility Class (KB Strong)",
                    description: "Choose from the schedule below — all intro classes are Strength & Mobility (KB Strong).",
                    icon: Calendar,
                  },
                  {
                    step: "2",
                    title: "Arrive 10 Minutes Early",
                    description: "Wear comfortable workout clothes. We provide all equipment — kettlebells, mats, and tools.",
                    icon: Clock,
                  },
                  {
                    step: "3",
                    title: "Show Up & We'll Guide You",
                    description: "We'll do a quick introduction, then coach you through the entire session with modifications as needed.",
                    icon: MapPin,
                  },
                ].map((item, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                    <div className="bg-white p-6 rounded-xl border border-border shadow-card flex items-start gap-4">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-hero text-lg font-bold uppercase mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Available Classes */}
              <AnimatedSection animation="fadeInUp" delay={0.3}>
                <div className="mt-10 bg-white p-6 md:p-8 rounded-xl border border-border shadow-card">
                  <h3 className="font-hero text-xl font-bold uppercase mb-4 text-primary">
                    Available KB Strong Classes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { day: "Monday", times: "8:00 AM & 11:00 AM" },
                      { day: "Wednesday", times: "8:00 AM & 11:00 AM" },
                      { day: "Friday", times: "8:00 AM & 11:00 AM" },
                      { day: "Thursday", times: "6:00 PM" },
                    ].map((cls, i) => (
                      <div key={i} className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="font-semibold">{cls.day}</span>
                          <span className="text-muted-foreground ml-2 text-sm">{cls.times}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild size="lg" className="w-full mt-6">
                    <a href={PUNCHPASS_URLS.schedule} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      Book Your First Class
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Upsell Note */}
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <div className="mt-8 bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                  <p className="text-lg font-semibold mb-2">Love It? Keep Going for Less.</p>
                  <p className="text-muted-foreground">
                    After your 3rd class, get your first month of unlimited classes for just <strong className="text-primary">$110</strong> (50% off $225) — if you join within 7 days.
                  </p>
                </div>
              </AnimatedSection>

              {/* Quick Links */}
              <AnimatedSection animation="fadeInUp" delay={0.5}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild variant="outline">
                    <Link to="/schedule">View Full Schedule</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Questions? Contact Us</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Welcome;
