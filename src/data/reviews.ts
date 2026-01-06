// Centralized verified Google Reviews data
// Source: Google Business Profile - Drake Fitness (31 reviews, 5.0 rating)

export interface Review {
  name: string;
  quote: string;
  result?: string;
  theme: string;
  stars?: number;
}

// Reset Week-Aligned Reviews (Fear Reduction, Beginner Safety)
export const RESET_WEEK_REVIEWS: Review[] = [
  {
    name: "Felix F.",
    quote: "The coaches are incredibly attentive, they watch your form, make adjustments, and explain why certain movements matter… you feel confident in every exercise.",
    theme: "Beginner Confidence",
    stars: 5
  },
  {
    name: "D. Ramos",
    quote: "I wasn't comfortable in this new body and didn't know how to move it correctly… He really assesses your needs and makes sure you don't get hurt.",
    theme: "Restarting Safely",
    stars: 5
  },
  {
    name: "Caitlin P.",
    quote: "I have had 3 lower back surgeries… they helped me get back to working out consistently.",
    result: "Back to training after 3 surgeries",
    theme: "Post-Surgery Safety",
    stars: 5
  },
  {
    name: "Turner W.",
    quote: "Even in the group classes, if you're a beginner, he will make sure you are comfortable and learn proper form.",
    theme: "Group Class Comfort",
    stars: 5
  }
];

// Longevity-Aligned Reviews (Long-Term Results, Life Impact)
export const LONGEVITY_REVIEWS: Review[] = [
  {
    name: "Aaron Q.",
    quote: "I'm stronger in my 40s than ever before… His knowledge and adaptability have made a significant impact.",
    result: "Stronger than ever at 40+",
    theme: "40s Strength",
    stars: 5
  },
  {
    name: "Chris P.",
    quote: "He opened my eyes on how to be strong, move properly, and avoid senseless injuries.",
    result: "Years of injury-free training",
    theme: "Injury Prevention",
    stars: 5
  },
  {
    name: "Paul B.",
    quote: "Exercise went from something I did off and on into something I look forward to every day.",
    result: "Daily habit formed",
    theme: "Habit Formation",
    stars: 5
  },
  {
    name: "Stuart S.",
    quote: "I have never been stronger, both physically and mentally!",
    result: "Complete transformation",
    theme: "Mind + Body",
    stars: 5
  },
  {
    name: "Tim R.",
    quote: "I'm stronger now at 45 than I've ever been.",
    result: "Peak strength at 45",
    theme: "Age-Defying",
    stars: 5
  }
];

// High-Impact General Reviews (Featured across site)
export const FEATURED_REVIEWS: Review[] = [
  {
    name: "Melissa F.",
    quote: "I came in with chronic knee pain and now live pain free thanks to their guidance.",
    result: "Pain-free living",
    theme: "Pain Resolution",
    stars: 5
  },
  {
    name: "Cara S.",
    quote: "Better than any physical therapist or personal trainer I've ever had.",
    result: "Expert coaching",
    theme: "Professional Quality",
    stars: 5
  },
  {
    name: "Mike K.",
    quote: "David pays close attention to detail and makes every workout count.",
    result: "Coaching excellence",
    theme: "Attention to Detail",
    stars: 5
  },
  {
    name: "Sarah J.",
    quote: "Whether you're a beginner or recovering from injury, Drake Fitness meets you where you are.",
    result: "Inclusive approach",
    theme: "Accessibility",
    stars: 5
  }
];

// Combined reviews for Success Stories page
export const ALL_VERIFIED_REVIEWS: Review[] = [
  ...FEATURED_REVIEWS.slice(0, 2),
  ...LONGEVITY_REVIEWS.slice(0, 2),
  ...RESET_WEEK_REVIEWS.slice(2, 3),
  FEATURED_REVIEWS[1]
];
