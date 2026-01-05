import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface PunchPassWidgetProps {
  type: "today" | "full";
  showHeading?: boolean;
  headingText?: string;
  eyebrow?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  variant?: "default" | "dark" | "accent";
}

const PunchPassWidget = ({
  type,
  showHeading = true,
  headingText,
  eyebrow,
  showCTA = true,
  ctaText = "View Full Schedule",
  ctaLink = "/schedule",
  className = "",
  variant = "default",
}: PunchPassWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const widgetUrl = type === "today" 
    ? "https://drakefitness.punchpass.com/widgets/today"
    : "https://drakefitness.punchpass.com/classes";

  const defaultHeading = type === "today" 
    ? "Today & Tomorrow" 
    : "Full Week Schedule";

  const defaultEyebrow = type === "today" 
    ? "CLASSES STARTING SOON" 
    : "CLASS SCHEDULE";

  const heading = headingText || defaultHeading;
  const eyebrowText = eyebrow || defaultEyebrow;

  // Variant styles
  const variantStyles = {
    default: "bg-background",
    dark: "bg-drake-dark text-white",
    accent: "bg-accent/10",
  };

  const eyebrowStyles = {
    default: "text-primary",
    dark: "text-drake-gold",
    accent: "text-primary",
  };

  const headingStyles = {
    default: "text-foreground",
    dark: "text-white",
    accent: "text-foreground",
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <AnimatedSection animation="fadeInUp" className={className}>
      <div className={`py-12 md:py-16 ${variantStyles[variant]}`}>
        <div className="container mx-auto px-4">
          {showHeading && (
            <div className="text-center mb-6 md:mb-8">
              <p className={`section-eyebrow ${eyebrowStyles[variant]}`}>{eyebrowText}</p>
              <h2 className={`font-hero text-2xl md:text-3xl font-bold uppercase ${headingStyles[variant]}`}>
                {heading}
              </h2>
            </div>
          )}

          {type === "today" ? (
            // Today Widget - Compact centered layout
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[380px] bg-white rounded-xl shadow-card border border-border overflow-hidden p-2">
                {isLoading && (
                  <div className="w-[350px] h-[300px] mx-auto flex flex-col items-center justify-center gap-4 p-4">
                    <Calendar className="w-8 h-8 text-primary animate-pulse" />
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                  </div>
                )}
                
                {hasError ? (
                  <div className="w-[350px] h-[300px] mx-auto flex flex-col items-center justify-center gap-4 p-4 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Unable to load schedule</p>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://drakefitness.punchpass.com/classes" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View on PunchPass
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <iframe
                    src={widgetUrl}
                    title="Drake Fitness - Today's Classes"
                    width="350"
                    height="300"
                    frameBorder="0"
                    loading="lazy"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`mx-auto block ${isLoading ? 'invisible absolute' : 'visible'}`}
                    style={{ border: "none" }}
                  />
                )}
              </div>

              {showCTA && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
                  <Button asChild variant="outline">
                    <Link to={ctaLink} className="inline-flex items-center gap-2">
                      {ctaText}
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <a 
                      href="https://drakefitness.punchpass.com/classes" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground"
                    >
                      Open in PunchPass
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Full Schedule Widget - Full width
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {isLoading && (
                  <div className="w-full h-[600px] md:h-[800px] flex flex-col items-center justify-center gap-4 p-8">
                    <Calendar className="w-12 h-12 text-primary animate-pulse" />
                    <Skeleton className="w-1/2 h-6" />
                    <div className="w-full max-w-md space-y-3">
                      <Skeleton className="w-full h-12" />
                      <Skeleton className="w-full h-12" />
                      <Skeleton className="w-full h-12" />
                      <Skeleton className="w-full h-12" />
                      <Skeleton className="w-full h-12" />
                    </div>
                  </div>
                )}
                
                {hasError ? (
                  <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <Calendar className="w-16 h-16 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground">Unable to load schedule</p>
                    <Button asChild size="lg">
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
                ) : (
                  <iframe
                    src={widgetUrl}
                    title="Drake Fitness Class Schedule"
                    className={`w-full h-[600px] md:h-[800px] border-0 ${isLoading ? 'invisible absolute' : 'visible'}`}
                    loading="lazy"
                    onLoad={handleLoad}
                    onError={handleError}
                  />
                )}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Powered by PunchPass
              </p>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PunchPassWidget;
