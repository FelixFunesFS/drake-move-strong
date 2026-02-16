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
    price: 209,
    frequency: "month",
    classes: "8 classes/month",
    label: "Foundation Membership",
    description: "8 classes per month, perfect for beginners"
  },
  unlimited: {
    price: 239,
    frequency: "month",
    classes: "Unlimited",
    label: "Longevity Unlimited",
    description: "Unlimited classes, priority booking"
  },
  
  // Class Packs & Add-ons
  dropIn: {
    price: 40,
    per: "session",
    label: "Drop-In Class"
  },
  flexPack: {
    price: 350,
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

// PunchPass URLs - Direct checkout links
export const PUNCHPASS_URLS = {
  resetWeek: "https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219",
  foundation: "https://drakefitness.punchpass.com/catalogs/purchase/membership/219877?check=1735866784",
  unlimited: "https://drakefitness.punchpass.com/catalogs/purchase/membership/219881?check=1735867211",
  remoteSupport: "https://drakefitness.punchpass.com/catalogs/purchase/membership/233268?check=1750796776",
  flexPack: "https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/219932",
  schedule: "https://drakefitness.punchpass.com/classes",
  passes: "https://drakefitness.punchpass.com/passes",
  catalog: "https://drakefitness.punchpass.com/catalog"
} as const;

// Helper functions
export const formatPrice = (price: number): string => `$${price}`;

export const getMembershipLabel = (key: keyof typeof PRICING): string => {
  return PRICING[key].label;
};
