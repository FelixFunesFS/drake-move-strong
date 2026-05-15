import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import {
  getNextFirstSaturday,
  formatCommunityClassDate,
} from "@/lib/communityClassDate";

interface CommunityClassInviteProps {
  image: string;
}

const CommunityClassInvite = ({ image }: CommunityClassInviteProps) => {
  const nextDateStr = useMemo(
    () => formatCommunityClassDate(getNextFirstSaturday()),
    [],
  );

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <AnimatedSection animation="fadeInUp">
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3] md:aspect-[5/4]">
              <OptimizedImage
                src={image}
                alt="Drake Fitness community kettlebell strength + mobility class in Avondale, Charleston"
                className="w-full h-full"
                aspectRatio="auto"
              />
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground font-heading font-bold uppercase tracking-wide text-xs px-3 py-1.5 rounded-full shadow-lg">
                Free · Monthly
              </div>
            </div>
          </AnimatedSection>

          {/* Copy */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <p className="section-eyebrow text-primary">
              FREE · FIRST SATURDAY OF EVERY MONTH · 10 AM
            </p>
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-5 leading-tight">
              Meet the Community.{" "}
              <span className="text-primary">Try Kettlebells.</span> No Pressure.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              An open, all-levels strength + mobility class taught by a Drake
              Fitness instructor. Perfect for beginners, anyone returning to
              fitness, or locals curious about kettlebells — no experience or
              membership required.
            </p>

            {/* Next class line */}
            <div className="flex items-center gap-2 mb-5 text-foreground font-heading font-semibold">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <span>
                Next class: {nextDateStr} · 10:00 AM ET
              </span>
            </div>

            {/* Qualifier chips */}
            <div className="flex flex-wrap gap-2 mb-7">
              {[
                "Beginner Friendly",
                "No Membership Needed",
                "All Levels Coached",
              ].map((label) => (
                <span
                  key={label}
                  className="text-xs font-heading font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full bg-muted text-foreground border border-border"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wide group"
              >
                <Link to="/community-class">
                  Reserve Your Spot
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/community-class"
                className="text-primary hover:text-primary/80 font-heading font-semibold underline-offset-4 hover:underline text-sm sm:text-base"
              >
                Learn what to expect →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CommunityClassInvite;
