export interface InsightPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'strength' | 'movement' | 'purpose';
  author: 'david' | 'nick';
  publishedAt: string;
  readTime: number;
  thumbnail: string;
  videoId?: string;
  featured?: boolean;
  tags: string[];
}

export const authorInfo = {
  david: {
    name: "David Drake",
    title: "Owner & Head Coach",
    bio: "25+ years experience in strength training and functional movement. StrongFirst Kettlebell Certified.",
    image: "/src/assets/coach-nick-portrait.jpg"
  },
  nick: {
    name: "Nick Poppa",
    title: "Corrective Exercise & Holistic Coach",
    bio: "Specializes in corrective exercise, mobility, and holistic wellness approaches.",
    image: "/src/assets/nick-holistic-coaching.jpg"
  }
};

export const insightPosts: InsightPost[] = [
  {
    id: "1",
    slug: "why-kettlebells-build-real-world-strength",
    title: "Why Kettlebells Build Real-World Strength",
    excerpt: "Discover why kettlebell training creates functional strength that translates to everyday life, not just the gym.",
    content: `
      <p>At Drake Fitness, we believe strength should serve you in real life—not just look good in a mirror. That's why kettlebells are a cornerstone of our training philosophy.</p>
      
      <h3>What Makes Kettlebells Different?</h3>
      <p>Unlike traditional weights that isolate muscles, kettlebells force your body to work as a complete system. Every swing, press, or carry engages multiple muscle groups while challenging your balance and coordination.</p>
      
      <h3>Real-World Applications</h3>
      <ul>
        <li><strong>Lifting groceries:</strong> Turkish get-ups mirror the movement of standing up while holding weight</li>
        <li><strong>Playing with kids:</strong> Swings build explosive hip power for running and dynamic movement</li>
        <li><strong>Yard work:</strong> Carries strengthen grip and core stability for sustained physical work</li>
      </ul>
      
      <h3>The Movement Quality Factor</h3>
      <p>We emphasize proper form over heavy weight. A well-executed kettlebell swing with 16kg teaches your body more than a sloppy lift with 32kg. This approach builds strength that lasts and reduces injury risk.</p>
      
      <p><strong>Ready to experience functional strength training?</strong> Our small group classes provide expert coaching to ensure you move better from day one.</p>
    `,
    category: 'strength',
    author: 'david',
    publishedAt: '2024-03-15',
    readTime: 5,
    thumbnail: '/src/assets/kettlebell-training.jpg',
    featured: true,
    tags: ['kettlebells', 'functional strength', 'training philosophy']
  },
  {
    id: "2",
    slug: "5-minute-morning-mobility-routine",
    title: "5-Minute Morning Mobility Routine",
    excerpt: "Start your day with this simple mobility sequence that reduces stiffness and prepares your body for movement.",
    content: `
      <p>You don't need an hour-long yoga session to feel better. This 5-minute routine addresses the most common areas of stiffness and sets you up for a productive day.</p>
      
      <h3>The Routine</h3>
      <p><strong>1. Cat-Cow (1 minute)</strong><br>
      Wakes up your spine and shoulders. Move slowly and breathe deeply.</p>
      
      <p><strong>2. Hip Circles (1 minute)</strong><br>
      Restores hip mobility after a night of sleeping. 30 seconds each direction.</p>
      
      <p><strong>3. Thoracic Rotation (1 minute)</strong><br>
      Opens up your upper back—crucial if you sit at a desk. 30 seconds per side.</p>
      
      <p><strong>4. Deep Squat Hold (1 minute)</strong><br>
      Restores natural hip and ankle mobility. Use a doorframe for support if needed.</p>
      
      <p><strong>5. Shoulder Pass-Throughs (1 minute)</strong><br>
      Improves shoulder range of motion. Use a resistance band or towel.</p>
      
      <h3>Why It Works</h3>
      <p>This sequence targets the joints that lose mobility fastest in modern life: hips, thoracic spine, and shoulders. Five minutes every morning compounds into significant improvements over time.</p>
      
      <p><strong>Want personalized mobility work?</strong> Our corrective exercise sessions identify your specific restrictions and create custom solutions.</p>
    `,
    category: 'movement',
    author: 'nick',
    publishedAt: '2024-03-10',
    readTime: 4,
    thumbnail: '/src/assets/mobility-class.jpg',
    videoId: 'wDtDMNnrF00',
    featured: false,
    tags: ['mobility', 'morning routine', 'flexibility']
  },
  {
    id: "3",
    slug: "how-to-stay-consistent-even-when-life-gets-busy",
    title: "How to Stay Consistent (Even When Life Gets Busy)",
    excerpt: "Practical strategies to maintain your training routine when work, family, and life demand your attention.",
    content: `
      <p>The biggest obstacle to fitness isn't lack of knowledge—it's consistency. Here's how we help our members stay on track even during their busiest seasons.</p>
      
      <h3>1. Define Your Non-Negotiables</h3>
      <p>Don't aim for perfection. Identify 2-3 weekly sessions you can realistically commit to. For most people, that's enough to maintain strength and mobility.</p>
      
      <h3>2. Schedule It Like a Meeting</h3>
      <p>Training sessions in your calendar are more likely to happen than "when I have time" workouts. Our fixed class schedule helps create this structure.</p>
      
      <h3>3. Have a Minimum Viable Workout</h3>
      <p>Can't make it to the gym? Keep a 15-minute home routine ready: some swings, push-ups, and mobility work. Something is always better than nothing.</p>
      
      <h3>4. Connect to Your Why</h3>
      <p>Are you training to keep up with your kids? To avoid back pain? To feel confident? Revisit this reason when motivation dips.</p>
      
      <h3>5. Join a Community</h3>
      <p>Training alone requires willpower. Training with others creates accountability. Our small group format means people notice when you're absent—in the best way.</p>
      
      <h3>The Long Game</h3>
      <p>We've worked with members for years. The ones who succeed don't train perfectly—they train consistently. They show up even when they don't feel like it, and they trust the process.</p>
      
      <p><strong>Ready to build sustainable habits?</strong> Our coaching emphasizes long-term consistency over short-term intensity.</p>
    `,
    category: 'purpose',
    author: 'david',
    publishedAt: '2024-03-05',
    readTime: 6,
    thumbnail: '/src/assets/group-training.jpg',
    featured: false,
    tags: ['motivation', 'consistency', 'lifestyle']
  },
  {
    id: "4",
    slug: "the-truth-about-mobility-and-aging",
    title: "The Truth About Mobility and Aging",
    excerpt: "Why maintaining mobility matters more than strength as you age, and what you can do about it starting today.",
    content: `
      <p>Most people accept stiffness and reduced range of motion as inevitable parts of aging. We don't. Here's why mobility should be your top priority as you get older.</p>
      
      <h3>Mobility vs. Flexibility</h3>
      <p>Flexibility is passive range of motion—how far you can stretch. Mobility is active range of motion—how far you can move with control and strength. We care about the latter.</p>
      
      <h3>Why It Matters</h3>
      <p>Limited mobility doesn't just mean you can't touch your toes. It means:</p>
      <ul>
        <li>Higher injury risk from compensating with other joints</li>
        <li>Reduced quality of life (can't play with grandkids, garden, travel comfortably)</li>
        <li>Accelerated joint degeneration from moving poorly</li>
      </ul>
      
      <h3>The Good News</h3>
      <p>Mobility can be restored at any age. We've seen 60-year-olds regain hip mobility they lost in their 30s. It requires consistent work, but the payoff is enormous.</p>
      
      <h3>Where to Start</h3>
      <p>Focus on these key areas:</p>
      <ul>
        <li><strong>Hips:</strong> Deep squats, hip circles, 90/90 stretches</li>
        <li><strong>Thoracic spine:</strong> Rotations, extensions, cat-cow variations</li>
        <li><strong>Shoulders:</strong> Pass-throughs, wall slides, band pull-aparts</li>
        <li><strong>Ankles:</strong> Calf stretches, ankle circles, controlled squats</li>
      </ul>
      
      <p><strong>Want a mobility assessment?</strong> We identify your specific restrictions and create a personalized plan to restore movement quality.</p>
    `,
    category: 'movement',
    author: 'nick',
    publishedAt: '2024-02-28',
    readTime: 5,
    thumbnail: '/src/assets/studio-mobility-training.jpg',
    featured: false,
    tags: ['mobility', 'aging', 'joint health']
  },
  {
    id: "5",
    slug: "desk-worker-strength-essentials",
    title: "Desk Worker Strength Essentials",
    excerpt: "The specific exercises desk workers need to counteract sitting and maintain functional strength for life outside the office.",
    content: `
      <p>If you sit for 8+ hours daily, your body adapts—and not in good ways. Here's how to fight back with smart strength training.</p>
      
      <h3>The Sitting Problem</h3>
      <p>Prolonged sitting creates:</p>
      <ul>
        <li>Tight hip flexors that limit hip extension</li>
        <li>Weak glutes from being constantly stretched</li>
        <li>Rounded shoulders from keyboard posture</li>
        <li>Inactive core muscles</li>
      </ul>
      
      <h3>The Solution: Targeted Strength Work</h3>
      
      <p><strong>1. Hip Extension Exercises</strong><br>
      Deadlifts, swings, and bridges restore what sitting takes away. We emphasize strong hip drive in all movements.</p>
      
      <p><strong>2. Pulling Movements</strong><br>
      Rows and face pulls combat forward shoulder posture. We program 2:1 pulling to pushing ratios for desk workers.</p>
      
      <p><strong>3. Anti-Flexion Core Work</strong><br>
      Planks and carries teach your core to resist the hunched position you're in all day.</p>
      
      <p><strong>4. Thoracic Mobility</strong><br>
      Your upper back loses extension from looking at screens. We open it back up with specific mobility drills.</p>
      
      <h3>Training Frequency</h3>
      <p>Three 45-minute sessions per week is enough to counteract sitting damage and build functional strength. More isn't always better—consistency is.</p>
      
      <h3>The Drake Fitness Approach</h3>
      <p>We see dozens of desk workers weekly. Our programs specifically address sitting-related dysfunction while building practical strength for life outside the office.</p>
      
      <p><strong>Book a movement assessment</strong> to see how sitting affects your body and get a personalized plan.</p>
    `,
    category: 'strength',
    author: 'david',
    publishedAt: '2024-02-20',
    readTime: 6,
    thumbnail: '/src/assets/one-on-one-coaching.jpg',
    featured: false,
    tags: ['desk workers', 'posture', 'corrective exercise']
  },
  {
    id: "6",
    slug: "building-training-habits-that-last",
    title: "Building Training Habits That Last",
    excerpt: "Science-backed strategies to make fitness a permanent part of your life, not another failed New Year's resolution.",
    content: `
      <p>Most people approach fitness as motivation-driven: they start when they feel excited and quit when that feeling fades. Here's a better way.</p>
      
      <h3>Habits Beat Motivation</h3>
      <p>Motivation fluctuates. Habits persist. The goal isn't to stay pumped up forever—it's to build systems that work even when you don't feel like it.</p>
      
      <h3>The Four Habit Laws</h3>
      
      <p><strong>1. Make It Obvious</strong><br>
      Keep your gym bag in your car. Put your mobility band where you see it every morning. Visual cues trigger action.</p>
      
      <p><strong>2. Make It Attractive</strong><br>
      Train with people you like. Choose exercises you don't hate. Fitness should add to your life, not feel like punishment.</p>
      
      <p><strong>3. Make It Easy</strong><br>
      Choose a gym on your commute route. Have a 10-minute backup workout for busy days. Reduce friction.</p>
      
      <p><strong>4. Make It Satisfying</strong><br>
      Track your workouts. Notice how you feel after training. Celebrate small wins. Immediate rewards reinforce habits.</p>
      
      <h3>The Two-Day Rule</h3>
      <p>Never skip two days in a row. Miss Monday? Make sure you hit Wednesday. This simple rule prevents slides into inactivity.</p>
      
      <h3>Community as a Habit Tool</h3>
      <p>Training in a group creates social accountability. You're less likely to skip when people expect you. Our small group format leverages this naturally.</p>
      
      <h3>Start Small, Stay Consistent</h3>
      <p>Don't commit to 6 days per week if you can only realistically do 3. Better to hit 3 sessions consistently for a year than 6 sessions for a month.</p>
      
      <p><strong>Ready to build sustainable fitness habits?</strong> Our coaching focuses on long-term behavior change, not quick fixes.</p>
    `,
    category: 'purpose',
    author: 'nick',
    publishedAt: '2024-02-15',
    readTime: 7,
    thumbnail: '/src/assets/community-gym-moment.jpg',
    featured: false,
    tags: ['habits', 'behavior change', 'long-term success']
  }
];
