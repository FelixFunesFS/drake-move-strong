// Centralized Pricing Data - Single Source of Truth
// All pricing information for Drake Fitness

export const INTRO_URL = "https://drakefitness.punchpass.com/catalogs/purchase/pass/254246?check=1773100034";

export const PRICING = {
  // Intro Offers
  introExperience: {
    price: 0,
    duration: "30 days",
    classes: 3,
    label: "3-Class Intro Experience",
    description: "3 free classes over 30 days",
    schedule: "KB Strong — Strength & Mobility: Mon/Wed/Fri 8am & 11am, Thu 6pm",
    upsell: {
      price: 110,
      originalPrice: 225,
      discount: "50%",
      window: "7 days after 3rd class"
    }
  },
  
  // Monthly Memberships
  foundation: {
    price: 200,
    frequency: "month",
    classes: "8 classes/month",
    label: "Foundation Membership",
    description: "8 classes per month, perfect for getting started or flexible schedules"
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
  introExperience: INTRO_URL,
  // Keep resetWeek as alias for backward compatibility
  resetWeek: INTRO_URL,
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
