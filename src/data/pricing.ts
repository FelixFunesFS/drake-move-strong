// Centralized Pricing Data - Single Source of Truth
// All pricing information for Drake Fitness

export const PRICING = {
  // Intro Offers
  resetWeek: {
    price: 50,
    duration: "7 days",
    label: "Reset Week",
    description: "7 days unlimited access"
  },
  
  // Monthly Memberships
  foundation: {
    price: 180,
    frequency: "month",
    classes: "8 classes/month",
    label: "Foundation Membership",
    description: "8 classes per month, perfect for beginners"
  },
  unlimited: {
    price: 225,
    frequency: "month",
    classes: "Unlimited",
    label: "Longevity Unlimited",
    description: "Unlimited classes, priority booking"
  },
  
  // Class Packs & Add-ons
  dropIn: {
    price: 30,
    per: "session",
    label: "Drop-In Class"
  },
  flexPack: {
    price: 300,
    sessions: 10,
    validity: "6 months",
    label: "10-Class Flex Pack"
  },
  
  // 1:1 Coaching (contact for rates)
  consultation: {
    price: 0,
    label: "Free Mobility Consultation",
    description: "30-minute consultation to discuss your goals"
  }
} as const;

// PunchPass URLs
export const PUNCHPASS_URLS = {
  resetWeek: "https://app.punchpass.com/org/9942/buy?passes=1023628",
  schedule: "https://drakefitness.punchpass.com/classes",
  passes: "https://drakefitness.punchpass.com/passes",
  catalog: "https://drakefitness.punchpass.com/catalog"
} as const;

// Helper functions
export const formatPrice = (price: number): string => `$${price}`;

export const getMembershipLabel = (key: keyof typeof PRICING): string => {
  return PRICING[key].label;
};
