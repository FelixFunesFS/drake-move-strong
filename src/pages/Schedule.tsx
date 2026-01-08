import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink, RefreshCw } from "lucide-react";
import scheduleCommunityImage from "@/assets/schedule-community-group.jpg";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScheduleQuickView } from "@/components/schedule/ScheduleQuickView";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Schedule = () => {
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const syncSchedule = async () => {
    if (!isAdmin) {
      toast({
        title: "Admin only",
        description: "Please sign in with an admin account to sync the schedule.",
        variant: "destructive",
      });
      return;
    }

    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-punchpass-schedule');
      if (error) {
        toast({
          title: "Sync Failed",
          description: "Could not sync schedule. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Schedule Synced",
          description: `${data?.classes_synced || 0} classes updated.`,
        });
        // Reload the page to show updated data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error syncing schedule:', error);
      toast({
        title: "Sync Failed",
        description: "An error occurred while syncing.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

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

        {/* Quick View - Today's & Tomorrow's Classes */}
        <section className="py-8 md:py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-hero text-xl md:text-2xl font-bold uppercase">
                  Quick <span className="text-primary">View</span>
                </h2>
                <p className="text-sm text-muted-foreground">Today's and tomorrow's classes at a glance</p>
              </div>
              {isAdmin ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={syncSchedule}
                  disabled={syncing}
                  className="text-muted-foreground hover:text-primary self-start sm:self-auto"
                >
                  <RefreshCw className={`w-4 h-4 mr-1.5 ${syncing ? 'animate-spin' : ''}`} />
                  {syncing ? 'Syncing...' : 'Sync Schedule'}
                </Button>
              ) : null}
            </div>
            <div className="max-w-4xl mx-auto">
              <ScheduleQuickView />
            </div>
          </div>
        </section>

        <section className="py-6 md:py-8 bg-background flex-1">
          <div className="container mx-auto px-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-hero text-xl md:text-2xl font-bold uppercase">
                Book Your <span className="text-primary">Class</span>
              </h2>
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://drakefitness.punchpass.com/classes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Open Full Schedule
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
              <iframe 
                src="https://drakefitness.punchpass.com/classes?embed=true&hidefilter=true"
                title="Drake Fitness Class Schedule"
                className="w-full border-0"
                style={{ 
                  height: 'calc(100vh - 280px)',
                  minHeight: '500px'
                }}
                loading="lazy"
              />
            </div>
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
