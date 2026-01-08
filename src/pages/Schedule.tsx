import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import scheduleCommunityImage from "@/assets/schedule-community-group.jpg";
import { SEO } from "@/components/SEO";
import { NativeWeeklySchedule } from "@/components/schedule/NativeWeeklySchedule";

const Schedule = () => {
  return (
    <>
      <SEO
        title="Class Schedule Charleston | Book Today | Drake Fitness"
        description="View our weekly class schedule in Charleston. Morning and evening sessions available. Foundation Flow, Functional Strength, KB Strong, and more."
        canonical="https://drake.fitness/schedule"
      />
      
      <main>
        <Hero
          eyebrow="CLASS TIMES"
          title="Weekly Class Schedule"
          subtitle="All classes are coach-led, mobility-first, and beginner-friendly."
          backgroundImage={scheduleCommunityImage}
          className="h-[400px] md:h-[500px] lg:h-[600px]"
        />

        <section className="py-6 md:py-8 bg-primary text-white">
          <div className="container mx-auto px-4">
            <Alert className="max-w-3xl mx-auto bg-drake-gold/20 border-drake-gold text-white">
              <Info className="h-5 w-5" />
              <AlertDescription className="text-base">
                <strong>New or unsure where to start?</strong> We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Native Weekly Schedule */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="font-hero text-xl md:text-2xl font-bold uppercase">
                Book Your <span className="text-primary">Class</span>
              </h2>
              <p className="text-sm text-muted-foreground">Click any class to book your spot</p>
            </div>
            <NativeWeeklySchedule />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">CLASS LEVELS</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Class Type <span className="text-primary">Guide</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { badge: "Beginner Friendly", desc: "Perfect for newcomers. Gentle pacing with detailed instruction.", variant: "secondary" },
                { badge: "All Levels", desc: "Scalable for everyone. Modifications provided for all fitness levels.", variant: "default" },
                { badge: "Intermediate+", desc: "Some experience recommended. Higher intensity with complex movements.", variant: "destructive" }
              ].map((level, idx) => (
                <div key={idx} className="bg-card p-6 rounded-xl shadow-card text-center border border-border">
                  <Badge variant={level.variant as any} className="mb-4 text-sm px-4 py-1">{level.badge}</Badge>
                  <p className="text-muted-foreground">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          eyebrow="NEW HERE?"
          title="Try Reset Week — 7 Days Unlimited"
          subtitle="The best way to experience Drake Fitness. Just $49, no commitment."
          ctaText="Start Reset Week — $49"
          ctaLink="/reset-week"
          variant="primary"
          slanted={true}
        />
      </main>
    </>
  );
};

export default Schedule;
