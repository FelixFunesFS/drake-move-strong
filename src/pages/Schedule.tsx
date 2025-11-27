import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Schedule = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const schedule = {
    Monday: [
      { time: "6:00 AM", class: "Foundation Flow™", coach: "Coach Nick", badge: "Beginner Friendly", spots: 8 },
      { time: "7:15 AM", class: "Functional Strength™", coach: "David Drake", badge: "All Levels", spots: 3 },
      { time: "9:00 AM", class: "Mobility Reset™", coach: "Coach Nick", badge: "Recovery", spots: 12 },
      { time: "5:30 PM", class: "KB Strong™", coach: "David Drake", badge: "Advanced", waitlist: true },
      { time: "6:45 PM", class: "Functional Flow Online™", coach: "Coach Nick", badge: "Live Zoom", unlimited: true },
    ],
    Tuesday: [
      { time: "6:00 AM", class: "Foundation Flow™", coach: "Coach Nick", badge: "Beginner Friendly", spots: 6 },
      { time: "7:15 AM", class: "Functional Strength™", coach: "David Drake", badge: "All Levels", spots: 5 },
      { time: "9:00 AM", class: "Mobility Reset™", coach: "Coach Nick", badge: "Recovery", spots: 10 },
    ],
    Wednesday: [
      { time: "6:00 AM", class: "Foundation Flow™", coach: "Coach Nick", badge: "Beginner Friendly", spots: 7 },
      { time: "7:15 AM", class: "Functional Strength™", coach: "David Drake", badge: "All Levels", spots: 4 },
      { time: "5:30 PM", class: "KB Strong™", coach: "David Drake", badge: "Advanced", spots: 2 },
      { time: "6:45 PM", class: "Functional Flow Online™", coach: "Coach Nick", badge: "Live Zoom", unlimited: true },
    ],
    Thursday: [
      { time: "6:00 AM", class: "Foundation Flow™", coach: "Coach Nick", badge: "Beginner Friendly", spots: 9 },
      { time: "7:15 AM", class: "Functional Strength™", coach: "David Drake", badge: "All Levels", spots: 6 },
      { time: "9:00 AM", class: "Mobility Reset™", coach: "Coach Nick", badge: "Recovery", spots: 11 },
    ],
    Friday: [
      { time: "6:00 AM", class: "Foundation Flow™", coach: "Coach Nick", badge: "Beginner Friendly", spots: 5 },
      { time: "7:15 AM", class: "Functional Strength™", coach: "David Drake", badge: "All Levels", spots: 7 },
    ],
    Saturday: [
      { time: "8:00 AM", class: "Weekend Warrior™", coach: "David Drake & Coach Nick", badge: "Community Strength", spots: 10 },
      { time: "9:30 AM", class: "Mobility Reset™", coach: "Coach Nick", badge: "Recovery", spots: 15 },
    ],
  };

  const getBadgeVariant = (badge: string) => {
    if (badge === "Beginner Friendly") return "secondary";
    if (badge === "All Levels") return "default";
    if (badge === "Advanced") return "destructive";
    if (badge === "Recovery") return "secondary";
    if (badge === "Live Zoom") return "outline";
    return "default";
  };

  return (
    <main>
      <Hero
        eyebrow="CLASS TIMES"
        title="Weekly Class Schedule"
        subtitle="All classes are coach-led, mobility-first, and beginner-friendly."
      />

      <section className="py-8 md:py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <Alert className="max-w-3xl mx-auto bg-drake-gold/20 border-drake-gold text-white">
            <Info className="h-5 w-5" />
            <AlertDescription className="text-base">
              <strong>New or unsure where to start?</strong> We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {weekDays.map((day) => (
              <div key={day}>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-primary uppercase">
                  {day}
                </h2>
                <div className="space-y-4">
                  {schedule[day as keyof typeof schedule].map((session, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="grid md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-2">
                          <p className="text-2xl font-bold text-primary">{session.time}</p>
                          <p className="text-sm text-muted-foreground">{session.duration || "60 min"}</p>
                        </div>
                        <div className="md:col-span-5">
                          <div className="flex items-start gap-2 mb-2">
                            <h3 className="text-xl font-bold">{session.class}</h3>
                            <Badge variant={getBadgeVariant(session.badge)}>
                              {session.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            Coach: {session.coach}
                          </p>
                        </div>
                        <div className="md:col-span-3 text-center">
                          {session.waitlist ? (
                            <Badge variant="destructive" className="text-sm px-3 py-1">
                              Waitlist Only
                            </Badge>
                          ) : session.unlimited ? (
                            <Badge variant="outline" className="text-sm px-3 py-1">
                              Unlimited Spots
                            </Badge>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold text-foreground">{session.spots} spots left</span>
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Button 
                            asChild 
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={session.waitlist}
                          >
                            <Link to="/contact">
                              {session.waitlist ? "Join Waitlist" : "Book Class"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">CLASS LEVELS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Class Type <span className="text-primary">Guide</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { badge: "Beginner Friendly", desc: "Perfect for newcomers. Gentle pacing with detailed instruction." },
              { badge: "All Levels", desc: "Scalable for everyone. Modifications provided for all fitness levels." },
              { badge: "Advanced", desc: "For regular members ready to push harder with proper form." },
              { badge: "Recovery", desc: "Focused on restoration, mobility work, and joint health." },
              { badge: "Live Zoom", desc: "Join remotely from anywhere with real-time coaching." },
              { badge: "Community Strength", desc: "Saturday group session with dynamic energy." },
            ].map((type, index) => (
              <div key={index} className="bg-card p-4 rounded-lg border border-border">
                <Badge variant={getBadgeVariant(type.badge)} className="mb-2">
                  {type.badge}
                </Badge>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Get Started?"
        subtitle="Book your first class or start with a free movement assessment."
        ctaText="Book Now"
        ctaLink="/contact"
        variant="gold"
        slanted={true}
      />
    </main>
  );
};

export default Schedule;
