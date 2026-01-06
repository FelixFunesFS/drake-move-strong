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
  },
  {
    name: "Vanessa H.",
    quote: "His knowledge about the way the body mechanically works has helped me continue to exercise after multiple surgeries.",
    result: "Training through multiple surgeries",
    theme: "Long-Term Adaptability",
    stars: 5
  },
  {
    name: "Marc G.",
    quote: "Better shape now than most of my adult life.",
    result: "Life-long transformation",
    theme: "Sustainable Results",
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

// Extended Reviews with Full Context (for featured placements on local SEO pages)
export const EXTENDED_REVIEWS = {
  caraS: {
    name: "Cara S.",
    quote: "I had a bad back injury that was not getting better with physical therapy. I missed being physically active and in shape, and longed to get back to exercising. I was so pleasantly surprised to see that Dave was BETTER than all physical therapists I have ever had. Moreover, I have had multiple different personal trainers and have been a part of many different group work out classes (i.e. orange theory), and he was better than them too!",
    shortQuote: "Better than any physical therapist or personal trainer I've ever had.",
    theme: "Professional Quality",
    result: "Recovered from back injury",
    stars: 5
  },
  vanessaH: {
    name: "Vanessa H.",
    quote: "I have been working with David for about 3 years now, on and off. I had a severe ankle injury that required multiple surgeries, ultimately resulting in ankle fusion (where the ankle is no longer a joint). He has helped me maintain strength and muscle in between surgeries; his knowledge about the way the body mechanically works has helped me to continue to exercise. After the final fusion surgery, we have worked together to modify movements to still achieve results. I am well on my way to being in the shape I was in pre accident. The other members of the classes are super encouraging and it feels more communal than a big box gym.",
    shortQuote: "His knowledge about the way the body mechanically works has helped me continue to exercise after multiple surgeries.",
    theme: "Long-Term Adaptability",
    result: "Training through ankle fusion surgery",
    duration: "3 years",
    stars: 5
  },
  paulB: {
    name: "Paul B.",
    quote: "David Drake is literally the best. Coming out of the pandemic winter, my head and body were in a bad place. 30 lbs heavier and feeling hyper unmotivated. Starting to workout with David was the kick start I needed, and his consistent and specific training to my goals and needs has taken exercise as something I've done off and on into something I look forward to every single day of my life. His wealth of knowledge in exercise science is clear, but it's his approach and natural intuition for how to maximize the potential for a specific individual that is his real gift. I live out of state and do the vast majority of our one on one sessions over Zoom and it's still worth every penny.",
    shortQuote: "Exercise went from something I did off and on into something I look forward to every day.",
    theme: "Complete Transformation",
    result: "Lost 30 lbs, daily habit formed",
    stars: 5
  },
  jenniferR: {
    name: "Jennifer R.",
    quote: "As a lifelong fitness enthusiast and career bodyworker, I tend to have a high standard for instructors of all varieties. David brings the knowledge, technique, and vibe every single time. I've experienced both private sessions to work on form and sequencing of movements (Turkish get ups, kettlebell swings, etc) as well as his classes (small groups with community feel) and always walk away with a great workout and lots of useful knowledge of intelligent movement. As someone who tends towards yoga and a more flowy type of workouts, I have to say that his style is not only complimentary to it, but is the only true strength training I've stuck with long term and it's because of the variety and solidity his method of training brings.",
    shortQuote: "The only true strength training I've stuck with long term.",
    theme: "Expert Credibility",
    result: "Long-term strength training convert",
    background: "Bodyworker & yoga practitioner",
    stars: 5
  },
  caitlinP: {
    name: "Caitlin P.",
    quote: "I have had 3 lower back surgeries - was in constant pain... David and his team helped me get back to working out consistently and build strength. I am forever grateful for this place - it truly changed my life!",
    shortQuote: "I have had 3 lower back surgeries... they helped me get back to working out consistently.",
    theme: "Post-Surgery Safety",
    result: "Back to training after 3 surgeries",
    stars: 5
  }
};
