// Centralized Trust Data - Single Source of Truth
// All trust-related statistics, credentials, and quotes

// Master Statistics (Quantitative Proof)
export const TRUST_STATS = {
  // Core Numbers
  coachingSessions: "10,000+",
  charlestoniansHelped: "500+",
  yearsExperience: "25+",
  clientRetentionYears: "10+",
  
  // Google Reviews
  googleRating: 5.0,
  googleReviewCount: 31,
  googleReviewUrl: 'https://maps.app.goo.gl/opeP6dqsbidbY9GZ6',
  
  // Operational
  maxClassSize: 12,
  coachCount: 2,
  classTypes: 6,
};

// Authority & Credentials
export const AUTHORITY_STATS = {
  davidCredentials: [
    "B.S. in Health & Exercise Science — Furman University",
    "Corrective Exercise & Mobility Training Specialist",
    "StrongFirst-style Kettlebell Methodology",
    "Charleston's Best Personal Trainer — Charleston City Paper"
  ],
  nickCredentials: [
    "Holistic Movement & Lifestyle Coaching",
    "Posture • Stability • Mobility • Strength",
    "Rehabilitation to Performance Bridge"
  ]
};

// Brand Trust Signals (for badges/microcopy)
export const TRUST_SIGNALS = [
  { label: "Charleston-Based & Locally Trusted", key: "local" },
  { label: "Verified Google Reviews", key: "reviews" },
  { label: "25+ Years Combined Experience", key: "experience" },
  { label: "Movement-First, Pain-Aware Coaching", key: "coaching" },
  { label: "Safe • Personal • Proven", key: "safe" }
] as const;

// Philosophy Quotes (for blockquotes)
export const BRAND_QUOTES = {
  philosophy: {
    text: "Strength is a skill. Mobility is the foundation. Proper movement unlocks lasting health.",
    attribution: "Drake Fitness"
  },
  longevity: {
    text: "Some of our clients have trained with Drake Fitness for over 10 years. That doesn't happen because of trends or hype. It happens because the work is thoughtful, safe, and built for real life.",
    attribution: null
  },
  collaboration: {
    text: "David and Nick work together to design personalized programs that combine mobility, corrective movement, and functional strength — meeting you exactly where you are and guiding you toward sustainable results.",
    attribution: null
  },
  purpose: {
    text: "We help adults build strong, mobile, pain-free bodies that support their everyday lives.",
    attribution: "Drake Fitness"
  }
};

// Credential Table Data
export const CREDENTIAL_TABLE_DATA = [
  { label: "Sessions Coached", value: TRUST_STATS.coachingSessions },
  { label: "People Helped", value: `${TRUST_STATS.charlestoniansHelped} Charlestonians` },
  { label: "Coaching Experience", value: `${TRUST_STATS.yearsExperience} Years` },
  { label: "Client Retention", value: `${TRUST_STATS.clientRetentionYears}+ Years with Some Clients` },
  { label: "Education", value: "B.S. Health & Exercise Science" },
  { label: "Recognition", value: "Charleston's Best Personal Trainer" },
  { label: "Reviews", value: `${TRUST_STATS.googleReviewCount} Verified Google Reviews` },
  { label: "Training Style", value: "Mobility • Corrective • Strength" }
];

// Stats for TrustStatsBar component
export const STATS_CONFIG = {
  sessions: {
    value: TRUST_STATS.coachingSessions,
    label: "Sessions Coached",
    sublabel: "Experience that adds up"
  },
  charlestonians: {
    value: TRUST_STATS.charlestoniansHelped,
    label: "Charlestonians Helped",
    sublabel: "Moving better in real life"
  },
  experience: {
    value: TRUST_STATS.yearsExperience,
    label: "Years Experience",
    sublabel: "Skill built over decades"
  },
  retention: {
    value: TRUST_STATS.clientRetentionYears + "+",
    label: "Year Client Retention",
    sublabel: "Trust that lasts"
  },
  rating: {
    value: TRUST_STATS.googleRating.toString(),
    label: "Google Rating",
    sublabel: "Real feedback from real people"
  },
  reviews: {
    value: TRUST_STATS.googleReviewCount.toString(),
    label: "Verified Reviews",
    sublabel: "Charleston clients"
  },
  classSize: {
    value: TRUST_STATS.maxClassSize.toString(),
    label: "Max Class Size",
    sublabel: "Personal attention guaranteed"
  }
} as const;

export type StatKey = keyof typeof STATS_CONFIG;
