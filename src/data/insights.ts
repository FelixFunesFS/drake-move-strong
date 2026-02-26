// Image imports for proper Vite bundling
import davidCoachingForm from '@/assets/david-coaching-form.jpg';
import studioNickDavidTogether from '@/assets/studio-nick-david-together.jpg';
import studioMobilityTraining from '@/assets/studio-mobility-training.jpg';
import studioFloorExercise from '@/assets/studio-floor-exercise.jpg';
import studioFullView from '@/assets/studio-full-view.jpg';
import nickHolisticCoaching from '@/assets/nick-holistic-coaching.jpg';
// New authentic photos for blog thumbnails
import davidCoachingTurkishGetup from '@/assets/david-coaching-turkish-getup.jpg';
import membersOverheadLungeNaturalLight from '@/assets/members-overhead-lunge-natural-light.jpg';
import groupOverheadPressClass from '@/assets/group-overhead-press-class.jpg';
import memberWeightedVestBandTraining from '@/assets/member-weighted-vest-band-training.jpg';
import membersTurkishGetupLunge from '@/assets/members-turkish-getup-lunge.jpg';
import membersDoubleKettlebellRack from '@/assets/members-double-kettlebell-rack.jpg';
import blogKettlebellOverheadGroup from '@/assets/blog-kettlebell-overhead-group.jpg';
import studioGroupOverhead from '@/assets/studio-group-overhead.jpg';

// Permanent storage URL builder for OG images (won't change between builds)
const BLOG_IMAGE_BASE = 'https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/blog-images';
export const getBlogOgImageUrl = (filename: string) => `${BLOG_IMAGE_BASE}/${filename}`;

export interface InsightPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  content: string;
  category: 'education' | 'trust' | 'conversion';
  author: 'david' | 'nick';
  publishedAt: string;
  readTime: number;
  thumbnail: string;
  ogImage: string;
  videoId?: string;
  featured?: boolean;
  tags: string[];
}

export const authorInfo = {
  david: {
    name: "Coach Drake",
    title: "Owner & Head Coach",
    bio: "25+ years experience in strength training and functional movement. StrongFirst Kettlebell Certified.",
    image: davidCoachingTurkishGetup
  },
  nick: {
    name: "Coach Nick",
    title: "Corrective Exercise & Holistic Coach",
    bio: "Specializes in corrective exercise, mobility, and holistic wellness approaches.",
    image: nickHolisticCoaching
  }
};

export const categoryInfo = {
  education: {
    name: "Education",
    description: "Learn the fundamentals of movement, strength training principles, and how your body actually works. Science-backed insights made accessible.",
    color: "blue",
    icon: "GraduationCap",
  },
  trust: {
    name: "Trust",
    description: "Stories, philosophies, and transparent insights into our coaching approach. Understand who we are and why we do what we do.",
    color: "green",
    icon: "ShieldCheck",
  },
  conversion: {
    name: "Decision Support",
    description: "Overcome objections, address concerns, and get clarity on whether Drake Fitness is right for you. No pressure, just honest answers.",
    color: "amber",
    icon: "Target",
  }
};

export const insightPosts: InsightPost[] = [
  {
    id: "1",
    slug: "why-traditional-workouts-stop-working-after-40",
    title: "Why Traditional Workouts Stop Working After 40",
    seoTitle: "Why Workouts Fail After 40: Complete 2026 Guide",
    excerpt: "And What Actually Does Work for Long-Term Strength and Mobility",
    content: `
      <p class="lead">If you've been training for years and suddenly feel like your body isn't responding the way it used to, you're not alone. After 40, the rules change — but most gyms keep teaching the same playbook.</p>
      
      <p>High-intensity workouts that once made you feel invincible now leave you sore, stiff, and exhausted. Recovery takes longer. Joints ache. And the results you used to see? They've slowed down or stopped entirely.</p>
      
      <p>The problem isn't your effort. It's the approach. Let's talk about why traditional workouts fail after 40 — and what actually works instead.</p>

      <h2>The Intensity Trap: Why "Go Hard or Go Home" Stops Working</h2>
      
      <blockquote>"I used to crush myself in the gym. Now, crushing myself just crushes me."<br><small>— Common sentiment from members over 40</small></blockquote>
      
      <p>In your 20s and 30s, your body could handle almost anything. You could train hard, recover fast, and push through soreness without much consequence. But after 40, your body's recovery systems slow down. Hormones shift. Connective tissue becomes less forgiving.</p>
      
      <p>Traditional high-intensity training assumes your body can absorb endless stress and bounce back quickly. When that's no longer true, those workouts don't build you up — they break you down.</p>
      
      <div class="key-insight">
        <h3>The Key Insight</h3>
        <p>Intensity without intention creates fatigue, not fitness. What you need is strategic training that respects your body's current capacity while still challenging it to grow.</p>
      </div>

      <h2>What Your Body Actually Needs After 40</h2>
      
      <p>The shift isn't about doing less — it's about doing what matters more. Your body still needs challenge, but the type of challenge changes.</p>

      <h3>1. Movement Quality First</h3>
      <p>Before adding weight or speed, ensure your joints move well and your body can control the ranges of motion you're asking it to perform.</p>

      <h3>2. Breathing Mechanics</h3>
      <p>Proper breathing creates core stability and allows your body to handle load without compensation. Most people skip this entirely.</p>

      <h3>3. Progressive Loading</h3>
      <p>Strength still matters — but it needs to be built on a foundation of control. Load comes after movement quality is established.</p>

      <h3>4. Recovery Strategy</h3>
      <p>Training is stress. Recovery is adaptation. Without intentional recovery, you're just accumulating fatigue.</p>

      <p><strong>Bottom line:</strong> Your body still wants to get stronger. But it needs a smarter path to get there — one that prioritizes longevity over short-term intensity.</p>

      <h2>The Three Phases of Smart Training</h2>
      
      <p>At Drake Fitness, we structure training around three progressive phases. Most gyms skip straight to Phase 3 — which is why people get hurt or burn out.</p>

      <h3>Phase 1: Reset & Restore (1-2 weeks)</h3>
      <p>This is where Reset Week lives. We restore joint mobility, teach proper breathing patterns, and rebuild movement foundations. No heavy weights. No exhausting circuits. Just intentional, controlled movement.</p>

      <h3>Phase 2: Build Control (4-6 weeks)</h3>
      <p>Once movement quality is established, we introduce load — but with strict control. This phase teaches your body to handle resistance without compensation. Tempo matters more than weight.</p>

      <h3>Phase 3: Express Strength (Ongoing)</h3>
      <p>Now you're ready for intensity. With a solid foundation, your body can handle heavier loads, faster movements, and more complex training — without breaking down.</p>

      <div class="warning-box">
        <h3>Why Most Gyms Skip This Process</h3>
        <p>Because it's slower. It's less flashy. And it requires actual coaching — not just supervision. But skipping these phases is why people end up injured, frustrated, or stuck.</p>
        <p>We'd rather take the time to do it right than rush you into workouts your body isn't ready for.</p>
      </div>

      <h2>What This Looks Like in Real Life</h2>
      
      <p>Let's make this concrete. Here's what a typical member experiences when they start training the right way after years of traditional workouts.</p>

      <div class="testimonial-box">
        <h3>Sarah, 47 — Charleston, SC</h3>
        <p class="quote">"I thought I was just getting old. Turns out, I was just training wrong."</p>
        <ul>
          <li><strong>Week 1-2 (Reset Week):</strong> Sarah learned how to breathe properly, restored shoulder and hip mobility, and practiced foundational movements without any pain.</li>
          <li><strong>Week 3-8 (Build Control):</strong> We introduced kettlebells, bodyweight strength work, and loaded carries — all with strict form and tempo control. Her back pain disappeared.</li>
          <li><strong>Week 9+ (Express Strength):</strong> Now Sarah deadlifts, presses, and swings kettlebells with confidence. She's stronger than she was at 35 — and pain-free.</li>
        </ul>
      </div>

      <p><strong>This isn't magic.</strong> It's just respecting the process. When you give your body what it actually needs — not what fitness trends say you should do — results follow.</p>

      <h2>Common Objections (And The Truth)</h2>
      
      <p>We hear these concerns all the time. Let's address them directly.</p>

      <h3>"I don't have time to go slow. I need results now."</h3>
      <p>Going slow at the start actually gets you results faster. Skipping the foundation means you'll hit a wall sooner — or worse, get injured and have to start over. Smart training is faster than reckless training.</p>

      <h3>"I'm not that out of shape. Can't I just jump into regular classes?"</h3>
      <p>Maybe. But most people overestimate their movement quality. Reset Week isn't about fitness level — it's about movement literacy. Even experienced lifters benefit from revisiting the basics.</p>

      <h3>"Won't this be too easy? I like feeling challenged."</h3>
      <p>Controlling movement is harder than it looks. Most people discover muscles they didn't know they had. And once you've built the foundation, the challenge comes — but in a way your body can actually handle.</p>

      <h3>"I've tried everything. Why would this be different?"</h3>
      <p>Because most programs focus on what you do, not how you do it. We focus on movement quality, breathing mechanics, and progressive loading. That's not trendy — but it works.</p>

      <h2>The Bottom Line</h2>
      
      <p>Traditional workouts stop working after 40 because they're built for recovery systems you no longer have. The solution isn't to push harder — it's to train smarter.</p>
      
      <p>You don't need more intensity. You need better movement, proper breathing, and progressive loading that respects where your body is right now.</p>
      
      <p><strong>That's what Reset Week teaches. And that's why it works.</strong></p>
    `,
    category: 'education',
    author: 'david',
    publishedAt: '2026-01-05', // Most recent
    readTime: 8,
    thumbnail: davidCoachingForm,
    ogImage: getBlogOgImageUrl('david-coaching-form.jpg'),
    featured: true,
    tags: ['training philosophy', 'over 40', 'smart training']
  },
  {
    id: "2",
    slug: "the-drake-philosophy-why-we-train-differently",
    title: "The Drake Philosophy: Why We Train Differently",
    seoTitle: "Drake Fitness Philosophy: Why Our Training Works",
    excerpt: "Discover the principles behind our coaching approach and why we prioritize movement quality over workout intensity. Learn what makes Drake Fitness different from traditional gyms.",
    content: `
      <p class="lead">Every gym has equipment. Most have trainers. What sets Drake Fitness apart isn't what we have — it's how we think about movement, strength, and your long-term success.</p>
      
      <h2>Movement Quality Over Intensity</h2>
      <p>The fitness industry sells intensity. More reps. Heavier weights. Harder workouts. But intensity without quality creates problems. We've seen too many people hurt themselves chasing "more" when they should have focused on "better."</p>
      
      <p>Our approach prioritizes how you move before how much you lift. This doesn't mean easy workouts — it means smart ones.</p>

      <h2>Coaching, Not Counting Reps</h2>
      <p>Anyone can count your reps. Real coaching means:</p>
      <ul>
        <li>Identifying movement restrictions before they become injuries</li>
        <li>Modifying exercises to match your body's current capacity</li>
        <li>Progressing you at the right pace — not too slow, not too fast</li>
        <li>Teaching you to understand your own body</li>
      </ul>
      
      <p>We limit class sizes specifically to ensure you get actual coaching attention, not just supervision.</p>

      <h2>Long-Term Thinking</h2>
      <p>We measure success in years, not weeks. The question isn't "how hard was your workout today?" It's "can you still move well at 60, 70, 80?"</p>
      
      <p>Every exercise we teach, every progression we use, is designed with your long-term health in mind. That's not always the fastest path — but it's the one that lasts.</p>

      <h2>Community That Supports</h2>
      <p>Our members aren't competing against each other. They're supporting each other. When someone struggles with a movement, others offer encouragement. When someone achieves a milestone, the whole group celebrates.</p>
      
      <p>This culture doesn't happen by accident. We cultivate it intentionally because sustainable fitness requires community.</p>

      <p><strong>Ready to experience a different approach?</strong> Start with Reset Week and see what training with intention feels like.</p>
    `,
    category: 'trust',
    author: 'david',
    publishedAt: '2025-11-15',
    readTime: 6,
    thumbnail: studioNickDavidTogether,
    ogImage: getBlogOgImageUrl('studio-nick-david-together.jpg'),
    featured: true,
    tags: ['philosophy', 'coaching', 'values']
  },
  {
    id: "3",
    slug: "understanding-mobility-vs-flexibility",
    title: "Understanding Mobility vs. Flexibility: What You Really Need",
    seoTitle: "Mobility vs Flexibility: Key Differences Explained",
    excerpt: "Most people confuse mobility with flexibility. Learn the critical difference and why mobility training is essential for pain-free movement.",
    content: `
      <p class="lead">You can touch your toes, but your hips still feel tight. You can stretch for hours, but your shoulders still ache. What's going on?</p>
      
      <p>The answer lies in the difference between flexibility and mobility — and why most people focus on the wrong one.</p>

      <h2>Flexibility: Passive Range of Motion</h2>
      <p>Flexibility is how far a joint can move when an external force (gravity, your hand, a partner) pushes it there. It's passive. You're not controlling the movement — something else is.</p>
      
      <p>Stretching improves flexibility. But flexibility alone doesn't help you move better or feel better during daily activities.</p>

      <h2>Mobility: Active Range of Motion</h2>
      <p>Mobility is how far a joint can move when YOU control the movement with strength and stability. It's active. Your muscles are engaged throughout the range.</p>
      
      <p>This is what actually matters for:</p>
      <ul>
        <li>Getting in and out of a car without pain</li>
        <li>Picking things up from the floor safely</li>
        <li>Playing with your kids or grandkids</li>
        <li>Training without injury</li>
      </ul>

      <h2>Why Stretching Alone Doesn't Work</h2>
      <p>You can stretch your hamstrings every day and still "feel tight." Why? Because your nervous system doesn't trust that range of motion.</p>
      
      <p>If you can't control a position with strength, your brain limits access to it. Stretching without strengthening creates passive range you can't actually use.</p>

      <h2>How We Build Real Mobility</h2>
      <p>At Drake Fitness, mobility work includes:</p>
      <ul>
        <li><strong>Controlled articular rotations:</strong> Moving joints through their full range with active control</li>
        <li><strong>End-range strength training:</strong> Building strength in your deepest positions</li>
        <li><strong>Movement pattern training:</strong> Integrating mobility into functional movements</li>
      </ul>

      <p><strong>Want a mobility assessment?</strong> We identify your specific restrictions and create a personalized plan to restore movement quality.</p>
    `,
    category: 'education',
    author: 'nick',
    publishedAt: '2025-10-20',
    readTime: 7,
    thumbnail: membersOverheadLungeNaturalLight,
    ogImage: getBlogOgImageUrl('members-overhead-lunge-natural-light.jpg'),
    featured: false,
    tags: ['mobility', 'flexibility', 'movement quality']
  },
  {
    id: "4",
    slug: "too-out-of-shape-to-start-reset-week-for-beginners",
    title: '"I\'m Too Out of Shape to Start": Why Reset Week Is Perfect for Beginners',
    seoTitle: "Too Out of Shape? Why Reset Week Works for Beginners",
    excerpt: "Address the fear of starting. Learn why our program is specifically designed for people who feel unprepared.",
    content: `
      <p class="lead">We hear this concern constantly: "I need to get in shape before I can come to your gym." It makes sense — but it's exactly backwards.</p>
      
      <h2>The Chicken-and-Egg Problem</h2>
      <p>If you wait until you're "in shape enough" to start training, you'll never start. That's not motivational speak — it's just logic. Getting in shape is why you need training. It's not a prerequisite.</p>

      <h2>Why Reset Week Works for Beginners</h2>
      <p>Reset Week was specifically designed for people who:</p>
      <ul>
        <li>Haven't exercised regularly in years</li>
        <li>Feel intimidated by traditional gyms</li>
        <li>Have old injuries or movement restrictions</li>
        <li>Don't know where to start</li>
      </ul>
      
      <p>We don't throw you into a high-intensity class and hope you survive. We meet you where you are.</p>

      <h2>What "Beginner-Friendly" Actually Means Here</h2>
      <p>At Drake Fitness, every exercise has progressions and regressions. If a goblet squat is too challenging, we modify it. If a plank is too hard, we adjust the position.</p>
      
      <p>You'll never be asked to do something your body can't handle. That's not soft — it's smart.</p>

      <h2>Real Stories from Members Who Started "Out of Shape"</h2>
      <blockquote>"I couldn't touch my toes when I started. Now I deadlift 135 pounds and my back pain is gone."<br><small>— Sarah, 47</small></blockquote>
      
      <blockquote>"I was 50 pounds overweight and hadn't exercised in 10 years. They didn't make me feel embarrassed — they made me feel capable."<br><small>— Tom, 52</small></blockquote>

      <h2>The Only Requirement</h2>
      <p>Show up. That's it. We'll handle the rest.</p>
      
      <p><strong>Ready to prove to yourself that you can do this?</strong> Reset Week is waiting.</p>
    `,
    category: 'conversion',
    author: 'david',
    publishedAt: '2025-09-18',
    readTime: 5,
    thumbnail: groupOverheadPressClass,
    ogImage: getBlogOgImageUrl('group-overhead-press-class.jpg'),
    featured: false,
    tags: ['beginners', 'getting started', 'reset week']
  },
  {
    id: "5",
    slug: "why-we-dont-believe-in-no-pain-no-gain",
    title: "Why 'No Pain No Gain' Is the Worst Advice for Long-Term Fitness",
    seoTitle: "No Pain No Gain Myth: Proven Alternative (2025)",
    excerpt: "For decades, the fitness industry has told you that if it doesn't hurt, it doesn't work. We disagree — here's why.",
    content: `
      <p class="lead">For decades, the fitness industry has told you that if it doesn't hurt, it doesn't work. We disagree.</p>
      
      <h2>Pain Is Information, Not a Goal</h2>
      <p>Pain tells you something is wrong. It's your body's warning system. Training through pain doesn't build toughness — it creates damage.</p>
      
      <p>Discomfort? That's different. Challenge is uncomfortable. Growth is uncomfortable. But sharp pain, joint pain, or pain that lingers after workouts? That's your body asking you to stop.</p>

      <h2>The "No Pain, No Gain" Problem</h2>
      <p>This mindset leads to:</p>
      <ul>
        <li>Injuries that sideline you for weeks or months</li>
        <li>Chronic joint problems that accumulate over years</li>
        <li>Burnout and exercise aversion</li>
        <li>Negative associations with movement</li>
      </ul>
      
      <p>We see people every week who "pushed through" pain in their 30s and are now paying for it in their 40s and 50s.</p>

      <h2>What We Believe Instead</h2>
      <p><strong>Smart effort over maximum effort.</strong> We push you — but intelligently. We challenge you — but appropriately. We help you find the line between productive discomfort and counterproductive pain.</p>
      
      <p><strong>Longevity over intensity.</strong> We'd rather you train consistently for 20 years than intensely for 2 years before burning out or getting hurt.</p>
      
      <p><strong>Progress over punishment.</strong> Training should make you feel capable, not broken. If you leave every session feeling destroyed, something is wrong with the programming — not your effort.</p>

      <h2>How This Changes Results</h2>
      <p>Counterintuitively, training smarter leads to better results. When you're not constantly recovering from excessive stress, you can train more consistently. Consistency beats intensity every time.</p>

      <p><strong>Experience training that builds you up.</strong> Reset Week is your introduction to a better way.</p>
    `,
    category: 'trust',
    author: 'nick',
    publishedAt: '2025-08-12',
    readTime: 6,
    thumbnail: studioMobilityTraining,
    ogImage: getBlogOgImageUrl('studio-mobility-training.jpg'),
    featured: false,
    tags: ['philosophy', 'pain', 'training approach']
  },
  {
    id: "6",
    slug: "can-i-train-with-old-injury",
    title: "Can I Train With an Old Injury? How We Work Around Pain",
    seoTitle: "Training With Injuries: Complete Safety Guide",
    excerpt: "Learn how our coaches modify exercises and create personalized progressions for members with injuries or limitations.",
    content: `
      <p class="lead">That old knee injury. The shoulder surgery from five years ago. The back that "goes out" sometimes. Can you still train? Absolutely — and here's how we make it work.</p>
      
      <h2>Injuries Don't Mean You Can't Train</h2>
      <p>Most injuries don't prevent all exercise — they prevent certain exercises. The key is knowing which movements are safe and which need modification or avoidance.</p>
      
      <p>At Drake Fitness, we don't give you a generic workout and hope it fits. We assess your specific situation and build around it.</p>

      <h2>Our Process</h2>
      <h3>1. Assessment</h3>
      <p>Before you touch a weight, we learn about your injury history. What hurts? What movements are limited? What have doctors or physical therapists said?</p>

      <h3>2. Movement Screening</h3>
      <p>We watch you move. Not to judge — to understand. Where do you compensate? What feels restricted? This tells us more than any questionnaire.</p>

      <h3>3. Modification</h3>
      <p>Every exercise has alternatives. Can't squat deep? We find your safe depth. Shoulder won't go overhead? We work around it. There's always an option.</p>

      <h3>4. Progression</h3>
      <p>As you get stronger and more mobile, we expand what's possible. Many members eventually do movements they thought were forever off-limits.</p>

      <h2>Real Examples</h2>
      <ul>
        <li><strong>Knee replacement:</strong> Modified lunges and step-ups, avoiding deep flexion initially</li>
        <li><strong>Shoulder impingement:</strong> Landmine presses instead of overhead pressing</li>
        <li><strong>Lower back history:</strong> Core stability emphasis, hip hinge mastery before deadlifts</li>
      </ul>

      <h2>When to Consult a Professional First</h2>
      <p>If you're currently in acute pain or have an undiagnosed issue, see a doctor or physical therapist first. We work with healthcare providers, not instead of them.</p>

      <p><strong>Have questions about training with your specific injury?</strong> Book a consultation and we'll talk through it honestly.</p>
    `,
    category: 'conversion',
    author: 'nick',
    publishedAt: '2025-07-25',
    readTime: 8,
    thumbnail: memberWeightedVestBandTraining,
    ogImage: getBlogOgImageUrl('member-weighted-vest-band-training.jpg'),
    featured: false,
    tags: ['injuries', 'modifications', 'safety']
  },
  {
    id: "7",
    slug: "how-breathing-controls-movement",
    title: "How Breathing Controls Movement (And Why Most People Get It Wrong)",
    seoTitle: "How Breathing Improves Movement: 4 Key Benefits",
    excerpt: "Your breath is the foundation of movement quality. Learn why proper breathing mechanics matter more than you think.",
    content: `
      <p class="lead">Before you worry about your squat form or deadlift technique, ask yourself: are you breathing correctly? For most people, the answer is no.</p>
      
      <h2>Breathing Isn't Just About Oxygen</h2>
      <p>We think of breathing as simple gas exchange. In, out, repeat. But breathing does much more:</p>
      <ul>
        <li>Creates intra-abdominal pressure for spinal stability</li>
        <li>Positions your ribcage for optimal shoulder mechanics</li>
        <li>Regulates your nervous system's stress response</li>
        <li>Influences your ability to access certain ranges of motion</li>
      </ul>

      <h2>The Chest Breathing Problem</h2>
      <p>Most adults breathe shallowly into their chest. This pattern:</p>
      <ul>
        <li>Creates tension in the neck and shoulders</li>
        <li>Limits core stability during lifting</li>
        <li>Keeps the nervous system in a stressed state</li>
        <li>Reduces available mobility in the thoracic spine</li>
      </ul>
      
      <p>You can have perfect exercise form, but if your breathing is dysfunctional, you're building on a weak foundation.</p>

      <h2>What Good Breathing Looks Like</h2>
      <p>Proper diaphragmatic breathing involves:</p>
      <ul>
        <li>Expansion in all directions (front, sides, back)</li>
        <li>Minimal shoulder and neck movement</li>
        <li>A relaxed exhale that naturally engages the core</li>
        <li>A rhythm that matches the demands of the movement</li>
      </ul>

      <h2>How We Teach It</h2>
      <p>In Reset Week, we spend time on breathing before any loaded exercise. This might feel basic, but it's foundational. Members consistently report that breathing work alone reduces back pain and improves their ability to move.</p>

      <p><strong>Ready to build on a solid foundation?</strong> Reset Week starts with the basics — including the breath.</p>
    `,
    category: 'education',
    author: 'nick',
    publishedAt: '2025-06-08',
    readTime: 5,
    thumbnail: studioFloorExercise,
    ogImage: getBlogOgImageUrl('studio-floor-exercise.jpg'),
    featured: false,
    tags: ['breathing', 'core stability', 'fundamentals']
  },
  {
    id: "8",
    slug: "what-makes-drake-fitness-different-from-charleston-gyms",
    title: "What Makes Drake Fitness Different From Other Charleston Gyms",
    seoTitle: "Charleston's Best Gym: 5 Reasons to Choose Drake",
    excerpt: "A transparent look at our unique approach to coaching, programming, and member experience.",
    content: `
      <p class="lead">Charleston has no shortage of gyms. So why would you choose Drake Fitness? Here's an honest comparison.</p>
      
      <h2>Small Class Sizes (And We Mean It)</h2>
      <p>We cap classes at 8 people. Not 15. Not 20. Eight. This ensures every person gets individual attention during every session. If you've ever felt invisible in a group fitness class, you'll notice the difference immediately.</p>

      <h2>Coaches Who Actually Coach</h2>
      <p>Our coaches don't just demonstrate exercises and count reps. They:</p>
      <ul>
        <li>Watch your movement quality throughout every session</li>
        <li>Provide real-time corrections and modifications</li>
        <li>Know your injury history and adjust accordingly</li>
        <li>Track your progress and adjust programming</li>
      </ul>
      
      <p>This requires more coaches per member — which is why we keep classes small.</p>

      <h2>Programming That Progresses</h2>
      <p>Generic workouts don't create lasting results. Our programming:</p>
      <ul>
        <li>Builds systematically week over week</li>
        <li>Balances strength, mobility, and conditioning</li>
        <li>Adapts to individual needs within group settings</li>
        <li>Respects recovery and prevents burnout</li>
      </ul>

      <h2>Community Without Competition</h2>
      <p>We don't post leaderboards. We don't encourage you to beat others. Our culture emphasizes personal progress and mutual support.</p>
      
      <p>This attracts members who want to get better, not members who want to win.</p>

      <h2>Investment in Long-Term Results</h2>
      <p>We're not the cheapest option. We're not trying to be. Our pricing reflects the coaching quality, class sizes, and programming that produce real, lasting results.</p>

      <p><strong>See the difference for yourself.</strong> Reset Week is your risk-free introduction.</p>
    `,
    category: 'trust',
    author: 'david',
    publishedAt: '2025-05-14',
    readTime: 5,
    thumbnail: studioFullView,
    ogImage: getBlogOgImageUrl('studio-full-view.jpg'),
    featured: false,
    tags: ['about us', 'Charleston', 'comparison']
  },
  {
    id: "9",
    slug: "how-much-time-do-i-really-need",
    title: "How Much Time Do I Really Need? Training for Busy Schedules",
    seoTitle: "3 Hours/Week to Results: Realistic Fitness Guide",
    excerpt: "Realistic expectations for time commitment and how to make consistent progress with a demanding schedule.",
    content: `
      <p class="lead">You're busy. Work, family, commute, responsibilities. Where does fitness fit? Here's an honest look at the minimum effective dose.</p>
      
      <h2>The Truth About Time Requirements</h2>
      <p>Three 45-minute sessions per week is enough to:</p>
      <ul>
        <li>Build and maintain strength</li>
        <li>Improve mobility and movement quality</li>
        <li>Boost energy and reduce stress</li>
        <li>Create meaningful health changes</li>
      </ul>
      
      <p>That's 2.25 hours per week. Less than most people spend on Netflix in a day.</p>

      <h2>Quality Over Quantity</h2>
      <p>More isn't always better. Three focused sessions with quality coaching beats five random workouts. We've seen members training 2-3 times per week outperform those who train 6 times per week at other gyms.</p>
      
      <p>Why? Because smart programming and proper recovery matter more than volume.</p>

      <h2>Making It Work With Your Schedule</h2>
      <p>Our class schedule is designed for working professionals:</p>
      <ul>
        <li>Early morning options before work</li>
        <li>Evening slots after normal work hours</li>
        <li>Consistent times that become routine</li>
        <li>Sessions that start and end on time</li>
      </ul>

      <h2>The Real Barrier Isn't Time</h2>
      <p>Most "I don't have time" objections are actually "I haven't prioritized this." We get it — life is demanding. But investing 2-3 hours weekly in your health pays dividends in every other area of life.</p>
      
      <p>Better energy. Less pain. More capacity for everything else.</p>

      <h2>Start With What You Have</h2>
      <p>Can you commit to two sessions per week? Start there. Consistency with two beats inconsistency with five.</p>

      <p><strong>Let's find what fits your life.</strong> Book a consultation to discuss your schedule.</p>
    `,
    category: 'conversion',
    author: 'david',
    publishedAt: '2025-04-22',
    readTime: 6,
    thumbnail: blogKettlebellOverheadGroup,
    ogImage: getBlogOgImageUrl('blog-kettlebell-overhead-group.jpg'),
    featured: false,
    tags: ['time management', 'busy schedules', 'efficiency']
  },
  {
    id: "10",
    slug: "what-real-strength-actually-means",
    title: "What \"Real Strength\" Actually Means",
    seoTitle: "Real Strength Explained: Ultimate Guide (2025)",
    excerpt: "It's Not What Most People Think",
    content: ``,
    category: 'education',
    author: 'david',
    publishedAt: '2025-12-10',
    readTime: 9,
    thumbnail: studioGroupOverhead,
    ogImage: getBlogOgImageUrl('studio-group-overhead.jpg'),
    featured: true,
    tags: ['strength', 'functional training', 'philosophy']
  },
  {
    id: "11",
    slug: "the-power-of-pressing-reset",
    title: 'The Power of "Pressing Reset" at Drake Fitness',
    seoTitle: "The Power of Pressing Reset: Mobility Warm-Up Guide (2025)",
    excerpt: "How our signature warm-up circuit activates your nervous system and prepares your body to train with purpose.",
    content: `
      <p class="lead">At Drake Fitness, our training philosophy is built on three pillars: <strong>movement</strong>, <strong>strength</strong>, and <strong>purpose</strong>. To help our clients achieve their best results, we utilize a specialized warm-up mobility circuit known as "Pressing Reset." This sequence is designed to bridge the gap between daily life and intense training by activating the nervous system and preparing the spine.</p>

      <h2>Warming Up the Spine and Neck</h2>

      <p>The circuit begins with foundational movements like <strong>Baby Rocks</strong> (between 3 to 20 repetitions) and <strong>Head Nods</strong> performed from a squat position. By using your eyes to create a full range of motion during head nods and rotations, you effectively activate spinal mobility.</p>

      <p>We also incorporate <strong>Baby Hindu Push-ups</strong>, focusing on a tight belly and a smooth range of motion while staying low to the ground.</p>

      <h2>Activating the Mind-Body Connection</h2>

      <p>A key component of "Pressing Reset" is creating a strong mind-body connection through deliberate movement. We utilize:</p>

      <ul>
        <li><strong>Segment Rolls:</strong> Using both the legs and arms to lead the body in a full 360-degree rotation to warm up the spine non-aggressively.</li>
        <li><strong>Dead Bugs:</strong> To activate the brain, we alternate dropping the right arm and left leg while keeping the belly tight and back flat to the floor.</li>
        <li><strong>Glute and Hip Activation:</strong> We use hip extensions (glute bridges) and supine shin boxes to open the hips and activate the glutes, typically in the 10 to 20-rep range.</li>
      </ul>

      <h2>Finishing with Dynamic Movement</h2>

      <p>To complete the reset, we focus on the lumbar spine with <strong>Russian Twists</strong> before moving into <strong>Leopard Crawls</strong>. When performing a leopard crawl, it is vital to keep your knees just one inch off the ground and your hips lower than your shoulders. Remember to breathe through your nose and let your belly relax as you alternate patterns between the right and left sides of the body.</p>

      <div class="key-insight">
        <h3>The Result</h3>
        <p>By the time you finish this circuit, your body is no longer just "awake" — it is <strong>ready to train</strong>. Whether you are a seasoned athlete or just starting your fitness journey, Pressing Reset ensures you move with the purpose and strength required for a successful workout.</p>
      </div>

      <p><strong>Want to experience Pressing Reset for yourself?</strong> Join us for a class or start with Reset Week to see how this warm-up transforms your training.</p>
    `,
    category: 'education',
    author: 'david',
    publishedAt: '2025-05-15',
    readTime: 5,
    thumbnail: studioFloorExercise,
    ogImage: getBlogOgImageUrl('studio-floor-exercise.jpg'),
    videoId: "Vb91A46rLr8",
    featured: true,
    tags: ['mobility', 'warm-up', 'pressing reset', 'nervous system', 'spine health']
  }
];
