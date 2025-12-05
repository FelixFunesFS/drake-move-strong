import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Dumbbell, Quote, Calendar, Users, Trophy, Heart, Zap, Sparkles, Star } from "lucide-react";
import { AdConfig, TextOverlay, TextBox, ShapeElement, ImageEffect, OutputSize, OUTPUT_SIZES } from "@/lib/canvasCompositor";

export interface AdTemplate {
  id: string;
  name: string;
  description: string;
  category: "promotion" | "motivational" | "event" | "community" | "premium";
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
  // === PREMIUM TEMPLATES ===
  {
    id: "premium-badge",
    name: "Class Promo with Badge",
    description: "Eye-catching design with corner badge",
    category: "premium",
    icon: Star,
    suggestedImageCategories: ["group", "training"],
    config: {
      shapes: [
        // Gold corner ribbon
        { type: 'pill', position: { x: 70, y: 8 }, size: { width: 25, height: 7 }, fill: '#F2B544', rotation: -12 },
        // Decorative line under headline
        { type: 'line', position: { x: 35, y: 58 }, size: { width: 30, height: 0.3 }, fill: '#F2B544' },
      ],
      textBoxes: [
        // "NEW" badge text
        { text: 'NEW CLASS', position: { x: 82, y: 11 }, fontSize: 22, fontFamily: 'Oswald', fontWeight: 'bold', color: '#1A1A1A', shadow: false, textAlign: 'center', rotation: -12 },
      ],
      headline: {
        text: 'KETTLEBELL 101',
        position: 'center',
        fontSize: 72,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Master the fundamentals',
        position: 'center',
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'Book Your Spot →',
        position: 'bottom',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 88,
        contrast: 115,
        saturation: 90,
        vignette: { intensity: 35, size: 55 },
        overlay: { color: '#1A1A1A', opacity: 0.55, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'KETTLEBELL 101',
      subheadline: 'Master the fundamentals',
      cta: 'Book Your Spot →',
    },
  },
  {
    id: "premium-minimal-quote",
    name: "Elegant Quote",
    description: "Minimalist design with decorative accents",
    category: "premium",
    icon: Sparkles,
    suggestedImageCategories: ["training", "outdoor"],
    config: {
      shapes: [
        // Top accent line
        { type: 'line', position: { x: 30, y: 28 }, size: { width: 40, height: 0.4 }, fill: '#F2B544' },
        // Bottom accent line
        { type: 'line', position: { x: 30, y: 72 }, size: { width: 40, height: 0.4 }, fill: '#F2B544' },
        // Corner accents
        { type: 'corner-accent', position: { x: 8, y: 8 }, size: { width: 8, height: 8 }, stroke: '#F2B544', strokeWidth: 3 },
        { type: 'corner-accent', position: { x: 84, y: 84 }, size: { width: 8, height: 8 }, stroke: '#F2B544', strokeWidth: 3, rotation: 180 },
      ],
      headline: {
        text: '"IF YOU CAN MOVE BETTER,\nYOU CAN LIVE BETTER"',
        position: 'center',
        fontSize: 52,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: '— DRAKE FITNESS',
        position: 'center',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: '',
        position: 'bottom',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 75,
        contrast: 115,
        saturation: 80,
        vignette: { intensity: 50, size: 45 },
        overlay: { color: '#1A1A1A', opacity: 0.7, gradient: 'full' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: '"IF YOU CAN MOVE BETTER,\nYOU CAN LIVE BETTER"',
      subheadline: '— DRAKE FITNESS',
    },
  },
  {
    id: "premium-event-badge",
    name: "Event with Date Badge",
    description: "Professional event promo with date circle",
    category: "premium",
    icon: Calendar,
    suggestedImageCategories: ["group", "studio"],
    config: {
      shapes: [
        // Date badge circle
        { type: 'circle', position: { x: 75, y: 12 }, size: { width: 18, height: 18 }, fill: '#F2B544', stroke: '#FFFFFF', strokeWidth: 4 },
        // Bottom CTA pill
        { type: 'pill', position: { x: 25, y: 82 }, size: { width: 50, height: 8 }, fill: '#0B4A52', opacity: 0.9 },
      ],
      textBoxes: [
        // Date inside badge
        { text: 'JAN\n15', position: { x: 84, y: 21 }, fontSize: 24, fontFamily: 'Oswald', fontWeight: 'bold', color: '#1A1A1A', shadow: false, textAlign: 'center' },
      ],
      headline: {
        text: 'MOBILITY\nWORKSHOP',
        position: 'center',
        fontSize: 68,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Unlock your movement potential',
        position: 'center',
        fontSize: 26,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'LIMITED SPOTS AVAILABLE',
        position: 'bottom',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: false,
        textAlign: 'center',
      },
      effects: {
        brightness: 85,
        contrast: 110,
        saturation: 90,
        vignette: { intensity: 30, size: 60 },
        overlay: { color: '#1A1A1A', opacity: 0.5, gradient: 'radial' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'MOBILITY\nWORKSHOP',
      subheadline: 'Unlock your movement potential',
      cta: 'LIMITED SPOTS AVAILABLE',
    },
  },
  {
    id: "premium-challenge",
    name: "Challenge Countdown",
    description: "Bold challenge announcement with urgency",
    category: "premium",
    icon: Trophy,
    suggestedImageCategories: ["training", "group"],
    config: {
      shapes: [
        // Top bar
        { type: 'rectangle', position: { x: 0, y: 0 }, size: { width: 100, height: 12 }, fill: '#F2B544' },
        // Bottom bar
        { type: 'rectangle', position: { x: 0, y: 88 }, size: { width: 100, height: 12 }, fill: '#0B4A52' },
      ],
      textBoxes: [
        { text: 'STARTS JAN 1ST', position: { x: 50, y: 6 }, fontSize: 28, fontFamily: 'Oswald', fontWeight: 'bold', color: '#1A1A1A', shadow: false, textAlign: 'center' },
      ],
      headline: {
        text: '30-DAY\nCHALLENGE',
        position: 'center',
        fontSize: 76,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Transform Your Movement',
        position: 'center',
        fontSize: 28,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'JOIN THE CHALLENGE',
        position: 'bottom',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: false,
        textAlign: 'center',
      },
      effects: {
        brightness: 90,
        contrast: 120,
        saturation: 105,
        vignette: { intensity: 25, size: 65 },
        overlay: { color: '#1A1A1A', opacity: 0.55, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: '30-DAY\nCHALLENGE',
      subheadline: 'Transform Your Movement',
      cta: 'JOIN THE CHALLENGE',
    },
  },
  {
    id: "premium-challenge-icons",
    name: "Challenge with Icons",
    description: "Bold challenge design with trophy and flame icons",
    category: "premium",
    icon: Trophy,
    suggestedImageCategories: ["training", "group"],
    config: {
      shapes: [
        // Top gradient bar
        { type: 'rectangle', position: { x: 0, y: 0 }, size: { width: 100, height: 8 }, fill: '#F2B544', opacity: 0.9 },
        // Bottom accent bar
        { type: 'rectangle', position: { x: 0, y: 92 }, size: { width: 100, height: 8 }, fill: '#0B4A52' },
        // Center decorative lines
        { type: 'line', position: { x: 20, y: 42 }, size: { width: 15, height: 0.4 }, fill: '#F2B544' },
        { type: 'line', position: { x: 65, y: 42 }, size: { width: 15, height: 0.4 }, fill: '#F2B544' },
      ],
      icons: [
        // Trophy icons on sides
        { iconKey: 'trophy', position: { x: 12, y: 50 }, size: 64, color: '#F2B544', rotation: 0 },
        { iconKey: 'trophy', position: { x: 88, y: 50 }, size: 64, color: '#F2B544', rotation: 0 },
        // Flame icons near bottom
        { iconKey: 'flame', position: { x: 25, y: 78 }, size: 40, color: '#F2B544', rotation: 0 },
        { iconKey: 'flame', position: { x: 75, y: 78 }, size: 40, color: '#F2B544', rotation: 0 },
      ],
      textBoxes: [
        { text: 'STARTS MONDAY', position: { x: 50, y: 4 }, fontSize: 22, fontFamily: 'Oswald', fontWeight: 'bold', color: '#1A1A1A', shadow: false, textAlign: 'center' },
      ],
      headline: {
        text: 'TRANSFORMATION\nCHALLENGE',
        position: 'center',
        fontSize: 68,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: '6 WEEKS • TOTAL BODY • RESULTS',
        position: 'center',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'CLAIM YOUR SPOT',
        position: 'bottom',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: false,
        textAlign: 'center',
      },
      effects: {
        brightness: 85,
        contrast: 115,
        saturation: 95,
        vignette: { intensity: 40, size: 50 },
        overlay: { color: '#1A1A1A', opacity: 0.6, gradient: 'radial' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'TRANSFORMATION\nCHALLENGE',
      subheadline: '6 WEEKS • TOTAL BODY • RESULTS',
      cta: 'CLAIM YOUR SPOT',
    },
  },
  {
    id: "premium-achievement",
    name: "Achievement Unlock",
    description: "Celebratory design with star and checkmark icons",
    category: "premium",
    icon: Star,
    suggestedImageCategories: ["training", "community"],
    config: {
      shapes: [
        // Gold circle background for star
        { type: 'circle', position: { x: 41, y: 15 }, size: { width: 18, height: 18 }, fill: '#F2B544' },
        // Bottom pill CTA background
        { type: 'pill', position: { x: 20, y: 82 }, size: { width: 60, height: 10 }, fill: '#0B4A52', opacity: 0.95 },
      ],
      icons: [
        // Central star icon
        { iconKey: 'star', position: { x: 50, y: 24 }, size: 56, color: '#1A1A1A', rotation: 0 },
        // Checkmark icons
        { iconKey: 'checkCircle', position: { x: 20, y: 65 }, size: 32, color: '#F2B544', rotation: 0 },
        { iconKey: 'checkCircle', position: { x: 50, y: 65 }, size: 32, color: '#F2B544', rotation: 0 },
        { iconKey: 'checkCircle', position: { x: 80, y: 65 }, size: 32, color: '#F2B544', rotation: 0 },
      ],
      textBoxes: [
        { text: 'Strength', position: { x: 20, y: 72 }, fontSize: 16, fontFamily: 'Inter', fontWeight: 'normal', color: '#FFFFFF', shadow: true, textAlign: 'center' },
        { text: 'Mobility', position: { x: 50, y: 72 }, fontSize: 16, fontFamily: 'Inter', fontWeight: 'normal', color: '#FFFFFF', shadow: true, textAlign: 'center' },
        { text: 'Community', position: { x: 80, y: 72 }, fontSize: 16, fontFamily: 'Inter', fontWeight: 'normal', color: '#FFFFFF', shadow: true, textAlign: 'center' },
      ],
      headline: {
        text: 'ACHIEVEMENT\nUNLOCKED',
        position: 'center',
        fontSize: 64,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: '',
        position: 'center',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'START YOUR JOURNEY',
        position: 'bottom',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: false,
        textAlign: 'center',
      },
      effects: {
        brightness: 80,
        contrast: 120,
        saturation: 85,
        vignette: { intensity: 45, size: 45 },
        overlay: { color: '#1A1A1A', opacity: 0.65, gradient: 'full' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'ACHIEVEMENT\nUNLOCKED',
      cta: 'START YOUR JOURNEY',
    },
  },
  // === STANDARD TEMPLATES ===
  {
    id: "class-promo",
    name: "Class Promotion",
    description: "Promote a specific class or program",
    category: "promotion",
    icon: Dumbbell,
    suggestedImageCategories: ["group", "training"],
    config: {
      headline: {
        text: 'KETTLEBELL FUNDAMENTALS',
        position: 'center',
        fontSize: 64,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Build strength. Move better.',
        position: 'center',
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'Book Your Spot →',
        position: 'bottom',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 90,
        contrast: 110,
        saturation: 95,
        vignette: { intensity: 25, size: 60 },
        overlay: { color: '#1A1A1A', opacity: 0.55, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'KETTLEBELL FUNDAMENTALS',
      subheadline: 'Build strength. Move better.',
      cta: 'Book Your Spot →',
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
        text: 'FREE WEEK',
        position: 'center',
        fontSize: 84,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Experience Drake Fitness',
        position: 'center',
        fontSize: 28,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'Claim Your Free Week',
        position: 'bottom',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 85,
        contrast: 115,
        saturation: 90,
        vignette: { intensity: 30, size: 55 },
        overlay: { color: '#0B4A52', opacity: 0.6, gradient: 'full' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'FREE WEEK',
      subheadline: 'Experience Drake Fitness',
      cta: 'Claim Your Free Week',
    },
  },
  {
    id: "motivational-quote",
    name: "Motivational Quote",
    description: "Inspiring quote with bold typography",
    category: "motivational",
    icon: Quote,
    suggestedImageCategories: ["training", "outdoor"],
    config: {
      headline: {
        text: 'IF YOU CAN MOVE BETTER, YOU CAN LIVE BETTER',
        position: 'center',
        fontSize: 56,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: '— Drake Fitness',
        position: 'center',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: '',
        position: 'bottom',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 80,
        contrast: 120,
        saturation: 85,
        vignette: { intensity: 40, size: 50 },
        overlay: { color: '#1A1A1A', opacity: 0.65, gradient: 'full' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'IF YOU CAN MOVE BETTER, YOU CAN LIVE BETTER',
      subheadline: '— Drake Fitness',
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
        text: 'SHOW UP',
        position: 'center',
        fontSize: 96,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Your future self will thank you',
        position: 'center',
        fontSize: 28,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: '',
        position: 'bottom',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 95,
        contrast: 115,
        saturation: 100,
        vignette: { intensity: 30, size: 55 },
        overlay: { color: '#1A1A1A', opacity: 0.5, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'SHOW UP',
      subheadline: 'Your future self will thank you',
    },
  },
  {
    id: "workshop-event",
    name: "Workshop/Event",
    description: "Promote workshops and special events",
    category: "event",
    icon: Calendar,
    suggestedImageCategories: ["group", "studio"],
    config: {
      headline: {
        text: 'MOBILITY WORKSHOP',
        position: 'top',
        fontSize: 52,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Saturday, Jan 15 • 10AM',
        position: 'center',
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'Limited Spots • Register Now',
        position: 'bottom',
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 85,
        contrast: 110,
        saturation: 95,
        vignette: { intensity: 25, size: 60 },
        overlay: { color: '#0B4A52', opacity: 0.7, gradient: 'full' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'MOBILITY WORKSHOP',
      subheadline: 'Saturday, Jan 15 • 10AM',
      cta: 'Limited Spots • Register Now',
    },
  },
  {
    id: "member-spotlight",
    name: "Member Spotlight",
    description: "Highlight member achievements",
    category: "community",
    icon: Users,
    suggestedImageCategories: ["training", "group"],
    config: {
      headline: {
        text: 'MEMBER SPOTLIGHT',
        position: 'top',
        fontSize: 42,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: '"Drake Fitness changed my life"',
        position: 'center',
        fontSize: 36,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: '— Sarah M., Member since 2023',
        position: 'bottom',
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 95,
        contrast: 105,
        saturation: 100,
        vignette: { intensity: 20, size: 65 },
        overlay: { color: '#1A1A1A', opacity: 0.5, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[0],
    },
    suggestedCopy: {
      headline: 'MEMBER SPOTLIGHT',
      subheadline: '"Drake Fitness changed my life"',
      cta: '— Sarah M., Member since 2023',
    },
  },
  {
    id: "story-promo",
    name: "Story Promo",
    description: "Vertical format for Instagram/Facebook Stories",
    category: "promotion",
    icon: LayoutTemplate,
    suggestedImageCategories: ["training", "coaches"],
    config: {
      headline: {
        text: 'TRAIN WITH US',
        position: 'center',
        fontSize: 72,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      subheadline: {
        text: 'Functional Strength • Mobility • Community',
        position: 'center',
        fontSize: 28,
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#F2B544',
        shadow: true,
        textAlign: 'center',
      },
      cta: {
        text: 'Swipe Up to Book',
        position: 'bottom',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#FFFFFF',
        shadow: true,
        textAlign: 'center',
      },
      effects: {
        brightness: 90,
        contrast: 110,
        saturation: 100,
        vignette: { intensity: 30, size: 55 },
        overlay: { color: '#1A1A1A', opacity: 0.5, gradient: 'bottom' },
      },
      outputSize: OUTPUT_SIZES[1],
    },
    suggestedCopy: {
      headline: 'TRAIN WITH US',
      subheadline: 'Functional Strength • Mobility • Community',
      cta: 'Swipe Up to Book',
    },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  premium: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-300",
  promotion: "bg-blue-100 text-blue-700",
  motivational: "bg-amber-100 text-amber-700",
  event: "bg-purple-100 text-purple-700",
  community: "bg-green-100 text-green-700",
};

interface AdTemplatesProps {
  onSelectTemplate: (template: AdTemplate) => void;
}

export function AdTemplates({ onSelectTemplate }: AdTemplatesProps) {
  const categories = ["premium", "promotion", "motivational", "event", "community"];

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
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold capitalize text-muted-foreground">
                  {category}
                </h4>
                {category === "premium" && (
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Enhanced
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryTemplates.map((template) => {
                  const Icon = template.icon;
                  const isPremium = category === "premium";
                  return (
                    <button
                      key={template.id}
                      onClick={() => onSelectTemplate(template)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all text-left group ${
                        isPremium 
                          ? "border-amber-300 hover:border-amber-400 hover:bg-amber-50/50 bg-gradient-to-br from-amber-50/30 to-yellow-50/30" 
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className={`p-2 rounded-md transition-colors ${
                        isPremium 
                          ? "bg-gradient-to-br from-amber-100 to-yellow-100 group-hover:from-amber-200 group-hover:to-yellow-200" 
                          : "bg-muted group-hover:bg-primary/10"
                      }`}>
                        <Icon className={`h-5 w-5 ${isPremium ? "text-amber-700" : "text-primary"}`} />
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