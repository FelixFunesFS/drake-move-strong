import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Dumbbell, Quote, Calendar, Users, Trophy, Heart, Zap } from "lucide-react";
import { AdConfig, TextOverlay, ImageEffect, OutputSize, OUTPUT_SIZES } from "@/lib/canvasCompositor";

export interface AdTemplate {
  id: string;
  name: string;
  description: string;
  category: "promotion" | "motivational" | "event" | "community" | "testimonial";
  icon: React.ElementType;
  suggestedImageCategories: string[];
  config: Partial<AdConfig>;
  suggestedCopy: {
    headline?: string;
    subheadline?: string;
    cta?: string;
  };
}

const TEMPLATES: AdTemplate[] = [
  // Promotional Templates
  {
    id: "class-promo",
    name: "Class Promotion",
    description: "Promote a specific class or program",
    category: "promotion",
    icon: Dumbbell,
    suggestedImageCategories: ["group", "training"],
    config: {
      headline: {
        text: "KETTLEBELL FUNDAMENTALS",
        position: "center",
        fontSize: 64,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Build strength. Move better.",
        position: "center",
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "Book Your Spot →",
        position: "bottom",
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 90,
        contrast: 110,
        saturation: 95,
        overlay: { color: "#1A1A1A", opacity: 0.55, gradient: "bottom" },
      },
      outputSize: OUTPUT_SIZES[0], // Instagram Square
    },
    suggestedCopy: {
      headline: "KETTLEBELL FUNDAMENTALS",
      subheadline: "Build strength. Move better.",
      cta: "Book Your Spot →",
    },
  },
  {
    id: "free-trial",
    name: "Free Trial Offer",
    description: "Attract new members with a trial offer",
    category: "promotion",
    icon: Zap,
    suggestedImageCategories: ["studio", "training"],
    config: {
      headline: {
        text: "FREE WEEK",
        position: "center",
        fontSize: 84,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Experience Drake Fitness",
        position: "center",
        fontSize: 28,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "Claim Your Free Week",
        position: "bottom",
        fontSize: 22,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 85,
        contrast: 115,
        saturation: 90,
        overlay: { color: "#0B4A52", opacity: 0.6, gradient: "full" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "FREE WEEK",
      subheadline: "Experience Drake Fitness",
      cta: "Claim Your Free Week",
    },
  },
  // Motivational Templates
  {
    id: "motivational-quote",
    name: "Motivational Quote",
    description: "Inspiring quote with bold typography",
    category: "motivational",
    icon: Quote,
    suggestedImageCategories: ["training", "outdoor"],
    config: {
      headline: {
        text: "IF YOU CAN MOVE BETTER, YOU CAN LIVE BETTER",
        position: "center",
        fontSize: 56,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "— Drake Fitness",
        position: "center",
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "",
        position: "bottom",
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 80,
        contrast: 120,
        saturation: 85,
        overlay: { color: "#1A1A1A", opacity: 0.65, gradient: "full" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "IF YOU CAN MOVE BETTER, YOU CAN LIVE BETTER",
      subheadline: "— Drake Fitness",
    },
  },
  {
    id: "daily-motivation",
    name: "Daily Motivation",
    description: "Short, punchy motivational message",
    category: "motivational",
    icon: Heart,
    suggestedImageCategories: ["equipment", "training"],
    config: {
      headline: {
        text: "SHOW UP",
        position: "center",
        fontSize: 96,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Your future self will thank you",
        position: "center",
        fontSize: 28,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "",
        position: "bottom",
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 95,
        contrast: 115,
        saturation: 100,
        overlay: { color: "#1A1A1A", opacity: 0.5, gradient: "bottom" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "SHOW UP",
      subheadline: "Your future self will thank you",
    },
  },
  // Event Templates
  {
    id: "workshop-event",
    name: "Workshop/Event",
    description: "Promote workshops and special events",
    category: "event",
    icon: Calendar,
    suggestedImageCategories: ["group", "studio"],
    config: {
      headline: {
        text: "MOBILITY WORKSHOP",
        position: "top",
        fontSize: 52,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Saturday, Jan 15 • 10AM",
        position: "center",
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "Limited Spots • Register Now",
        position: "bottom",
        fontSize: 22,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 85,
        contrast: 110,
        saturation: 95,
        overlay: { color: "#0B4A52", opacity: 0.7, gradient: "full" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "MOBILITY WORKSHOP",
      subheadline: "Saturday, Jan 15 • 10AM",
      cta: "Limited Spots • Register Now",
    },
  },
  {
    id: "challenge-event",
    name: "Fitness Challenge",
    description: "Promote a fitness challenge or competition",
    category: "event",
    icon: Trophy,
    suggestedImageCategories: ["training", "group"],
    config: {
      headline: {
        text: "30-DAY CHALLENGE",
        position: "center",
        fontSize: 68,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Transform Your Movement",
        position: "center",
        fontSize: 30,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "Starts January 1st",
        position: "bottom",
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 90,
        contrast: 120,
        saturation: 110,
        overlay: { color: "#1A1A1A", opacity: 0.55, gradient: "bottom" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "30-DAY CHALLENGE",
      subheadline: "Transform Your Movement",
      cta: "Starts January 1st",
    },
  },
  // Community Templates
  {
    id: "member-spotlight",
    name: "Member Spotlight",
    description: "Highlight member achievements",
    category: "community",
    icon: Users,
    suggestedImageCategories: ["training", "group"],
    config: {
      headline: {
        text: "MEMBER SPOTLIGHT",
        position: "top",
        fontSize: 42,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: '"Drake Fitness changed my life"',
        position: "center",
        fontSize: 36,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "— Sarah M., Member since 2023",
        position: "bottom",
        fontSize: 18,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 95,
        contrast: 105,
        saturation: 100,
        overlay: { color: "#1A1A1A", opacity: 0.5, gradient: "bottom" },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: "MEMBER SPOTLIGHT",
      subheadline: '"Drake Fitness changed my life"',
      cta: "— Sarah M., Member since 2023",
    },
  },
  // Story Format
  {
    id: "story-promo",
    name: "Story Promo",
    description: "Vertical format for Instagram/Facebook Stories",
    category: "promotion",
    icon: LayoutTemplate,
    suggestedImageCategories: ["training", "coaches"],
    config: {
      headline: {
        text: "TRAIN WITH US",
        position: "center",
        fontSize: 72,
        fontFamily: "Oswald",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      subheadline: {
        text: "Functional Strength • Mobility • Community",
        position: "center",
        fontSize: 28,
        fontFamily: "Inter",
        fontWeight: "normal",
        color: "#F2B544",
        shadow: true,
        textAlign: "center",
      },
      cta: {
        text: "Swipe Up to Book",
        position: "bottom",
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#FFFFFF",
        shadow: true,
        textAlign: "center",
      },
      effects: {
        brightness: 90,
        contrast: 110,
        saturation: 100,
        overlay: { color: "#1A1A1A", opacity: 0.5, gradient: "bottom" },
      },
      outputSize: OUTPUT_SIZES[1], // Instagram Story (1080x1920)
    },
    suggestedCopy: {
      headline: "TRAIN WITH US",
      subheadline: "Functional Strength • Mobility • Community",
      cta: "Swipe Up to Book",
    },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  promotion: "bg-blue-100 text-blue-700",
  motivational: "bg-amber-100 text-amber-700",
  event: "bg-purple-100 text-purple-700",
  community: "bg-green-100 text-green-700",
  testimonial: "bg-pink-100 text-pink-700",
};

interface AdTemplatesProps {
  onSelectTemplate: (template: AdTemplate) => void;
}

export function AdTemplates({ onSelectTemplate }: AdTemplatesProps) {
  const categories = ["promotion", "motivational", "event", "community"];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Ad Templates</CardTitle>
        </div>
        <CardDescription>
          Start with a pre-designed template and customize it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => {
          const categoryTemplates = TEMPLATES.filter((t) => t.category === category);
          if (categoryTemplates.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold capitalize text-muted-foreground">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => onSelectTemplate(template)}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                    >
                      <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{template.name}</span>
                          {template.config.outputSize?.name.includes("Story") && (
                            <Badge variant="secondary" className="text-xs py-0">
                              Story
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export { TEMPLATES };
