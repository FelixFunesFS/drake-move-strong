import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Lightbulb, AlertTriangle, MessageCircle, CheckCircle2,
  Footprints, Wind, Dumbbell, RotateCcw, Eye, Search, Wrench, TrendingUp,
  Heart, Shield, Users, Calendar, Clock, Target, Sparkles, Brain, Zap,
  Activity, Scale, UserCheck, BadgeCheck, ChevronRight, X, AlertCircle,
  HeartPulse, ShieldCheck, CalendarCheck, Compass, HandHeart,
  SlidersHorizontal, Infinity, Moon, Frown, Trophy, Hourglass,
  VolumeX, Bed, Flame, Home, CalendarDays, RefreshCw, Phone
} from "lucide-react";
import SmartGalleryImage from "@/components/SmartGalleryImage";

import davidCoachingForm from "@/assets/david-coaching-form.jpg";
import blogNoPainNoGainHero from "@/assets/blog-no-pain-no-gain-hero.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import mobilityClass from "@/assets/mobility-class.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";
import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import kettlebellFormCheck from "@/assets/kettlebell-form-check.jpg";
import studioFloorExercise from "@/assets/studio-floor-exercise.jpg";
import studioFullView from "@/assets/studio-full-view.jpg";
import outdoorTraining from "@/assets/outdoor-training.jpg";
import blogKettlebellOverheadGroup from "@/assets/blog-kettlebell-overhead-group.jpg";

// =====================================================
// Why Traditional Workouts Stop Working After 40
// =====================================================
export const WhyTraditionalWorkoutsContent = () => {
  return (
    <>
      {/* Intro Section */}
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          If you've been training for years and suddenly feel like your body isn't responding the way it used to, you're not alone. After 40, the rules change — but most gyms keep teaching the same playbook.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          High-intensity workouts that once made you feel invincible now leave you sore, stiff, and exhausted. Recovery takes longer. Joints ache. And the results you used to see? They've slowed down or stopped entirely.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The problem isn't your effort. It's the approach. Let's talk about why traditional workouts fail after 40 — and what actually works instead.
        </p>
      </div>

      {/* Featured Image */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage
          src={davidCoachingForm}
          alt="Mature adult training with proper form and mobility focus"
          aspectRatio="video"
        />
      </div>

      {/* Section 1: The Intensity Trap */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Why High-Intensity Training Fails After 40
        </h2>
        
        <div className="bg-muted p-8 rounded-2xl mb-8 border-l-4 border-drake-gold">
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "I used to crush myself in the gym. Now, crushing myself just crushes me."
          </p>
          <p className="text-sm text-muted-foreground/70 mt-3">— Common sentiment from members over 40</p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          In your 20s and 30s, your body could handle almost anything. You could train hard, recover fast, and push through soreness without much consequence. But after 40, your body's recovery systems slow down. Hormones shift. Connective tissue becomes less forgiving.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Traditional high-intensity training assumes your body can absorb endless stress and bounce back quickly. When that's no longer true, those workouts don't build you up — they break you down.
        </p>

        <div className="bg-background border-2 border-primary rounded-2xl p-8 mb-8">
          <h3 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase flex items-center gap-3">
            <div className="w-10 h-10 bg-drake-gold rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-foreground" />
            </div>
            The Key Insight
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Intensity without intention creates fatigue, not fitness. What you need is strategic training that respects your body's current capacity while still challenging it to grow.
          </p>
        </div>
      </div>

      {/* Section 2: What Your Body Actually Needs */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What Bodies Over 40 Need: 4 Training Essentials
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The shift isn't about doing less — it's about doing what matters more. Your body still needs challenge, but the type of challenge changes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: Footprints, title: "1. Movement Quality First", desc: "Before adding weight or speed, ensure your joints move well and your body can control the ranges of motion you're asking it to perform." },
            { icon: Wind, title: "2. Breathing Mechanics", desc: "Proper breathing creates core stability and allows your body to handle load without compensation. Most people skip this entirely." },
            { icon: Dumbbell, title: "3. Progressive Loading", desc: "Strength still matters — but it needs to be built on a foundation of control. Load comes after movement quality is established." },
            { icon: RotateCcw, title: "4. Recovery Strategy", desc: "Training is stress. Recovery is adaptation. Without intentional recovery, you're just accumulating fatigue." },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-8 rounded-xl border-2 border-transparent hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-hero text-xl font-bold mb-3 uppercase">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            <strong className="text-foreground">Bottom line:</strong> Your body still wants to get stronger. But it needs a smarter path to get there — one that prioritizes longevity over short-term intensity.
          </p>
        </div>
      </div>

      {/* Section 3: The Three Phases */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          How Smart Training Works: 3 Progressive Phases
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          At Drake Fitness, we structure training around three progressive phases. Most gyms skip straight to Phase 3 — which is why people get hurt or burn out. This phased approach is what sets <Link to="/strength-training-charleston" className="text-primary font-semibold hover:underline">Charleston strength training at Drake Fitness</Link> apart.
        </p>

        <div className="space-y-8">
          {[
            { num: 1, title: "Phase 1: Reset & Restore", desc: "This is where Reset Week lives. We restore joint mobility, teach proper breathing patterns, and rebuild movement foundations. No heavy weights. No exhausting circuits. Just intentional, controlled movement.", duration: "1-2 weeks" },
            { num: 2, title: "Phase 2: Build Control", desc: "Once movement quality is established, we introduce load — but with strict control. This phase teaches your body to handle resistance without compensation. Tempo matters more than weight.", duration: "4-6 weeks" },
            { num: 3, title: "Phase 3: Express Strength", desc: "Now you're ready for intensity. With a solid foundation, your body can handle heavier loads, faster movements, and more complex training — without breaking down.", duration: "Ongoing" },
          ].map((phase) => (
            <div key={phase.num} className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary transition-colors">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-hero text-2xl font-bold">
                    {phase.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-hero text-2xl font-bold text-foreground mb-3 uppercase">{phase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{phase.desc}</p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    <span>Duration: {phase.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-foreground text-white p-10 rounded-2xl">
          <h3 className="font-hero text-2xl font-bold mb-4 uppercase flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-drake-gold" />
            Why Most Gyms Skip This Process
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Because it's slower. It's less flashy. And it requires actual coaching — not just supervision. But skipping these phases is why people end up injured, frustrated, or stuck.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We'd rather take the time to do it right than rush you into workouts your body isn't ready for.
          </p>
        </div>
      </div>

      {/* Section 4: Real Life Example */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Real Results: How Charleston Members Train Smarter
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Let's make this concrete. Here's what a typical member experiences when they start training the right way after years of traditional workouts.
        </p>

        <div className="bg-muted rounded-2xl p-10 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-hero text-2xl font-bold text-primary">S</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Sarah, 47 — West Ashley, SC</h3>
              <p className="text-muted-foreground italic">"I thought I was just getting old. Turns out, I was just training wrong."</p>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Sarah discovered our <Link to="/reset-week-charleston" className="text-primary font-semibold hover:underline">Reset Week program</Link> through a neighbor's recommendation—and it changed how she approached training entirely.
          </p>
          
          <div className="space-y-6">
            {[
              { week: "Week 1-2 (Reset Week)", desc: "Sarah learned how to breathe properly, restored shoulder and hip mobility, and practiced foundational movements without any pain." },
              { week: "Week 3-8 (Build Control)", desc: "We introduced kettlebells, bodyweight strength work, and loaded carries — all with strict form and tempo control. Her back pain disappeared." },
              { week: "Week 9+ (Express Strength)", desc: "Now Sarah deadlifts, presses, and swings kettlebells with confidence. She's stronger than she was at 35 — and pain-free." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.week}</p>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-drake-gold/10 border border-drake-gold rounded-2xl p-8">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            <strong className="text-foreground">This isn't magic.</strong> It's just respecting the process. When you give your body what it actually needs — not what fitness trends say you should do — results follow.
          </p>
        </div>
      </div>

      {/* Section 5: Common Objections */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Frequently Asked Questions About Training Over 40
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We hear these concerns all the time. Let's address them directly.
        </p>

        <div className="space-y-6">
          {[
            { q: `"I don't have time to go slow. I need results now."`, a: "Going slow at the start actually gets you results faster. Skipping the foundation means you'll hit a wall sooner — or worse, get injured and have to start over. Smart training is faster than reckless training." },
            { q: `"I'm not that out of shape. Can't I just jump into regular classes?"`, a: "Maybe. But most people overestimate their movement quality. Reset Week isn't about fitness level — it's about movement literacy. Even experienced lifters benefit from revisiting the basics." },
            { q: `"Won't this be too easy? I like feeling challenged."`, a: "Controlling movement is harder than it looks. Most people discover muscles they didn't know they had. And once you've built the foundation, the challenge comes — but in a way your body can actually handle." },
            { q: `"I've tried everything. Why would this be different?"`, a: "Because most programs focus on what you do, not how you do it. We focus on movement quality, breathing mechanics, and progressive loading. That's not trendy — but it works." },
          ].map((item, i) => (
            <div key={i} className="bg-background border-2 border-border rounded-xl p-8">
              <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-drake-gold" />
                {item.q}
              </h3>
              <p className="text-muted-foreground leading-relaxed pl-9">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Traditional vs. Smart Training: Quick Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-background rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-4 text-left font-hero uppercase">Factor</th>
                <th className="px-6 py-4 text-left font-hero uppercase">Traditional Training</th>
                <th className="px-6 py-4 text-left font-hero uppercase">Smart Training (Drake)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Recovery Time</td>
                <td className="px-6 py-4 text-muted-foreground">2-4 days soreness</td>
                <td className="px-6 py-4 text-primary font-medium">1-2 days, minimal</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Injury Risk</td>
                <td className="px-6 py-4 text-muted-foreground">High (cumulative damage)</td>
                <td className="px-6 py-4 text-primary font-medium">Low (controlled progression)</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Long-Term Results</td>
                <td className="px-6 py-4 text-muted-foreground">Diminishing after 40</td>
                <td className="px-6 py-4 text-primary font-medium">Sustainable for decades</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Coaching Focus</td>
                <td className="px-6 py-4 text-muted-foreground">Rep counting</td>
                <td className="px-6 py-4 text-primary font-medium">Movement quality</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Best For</td>
                <td className="px-6 py-4 text-muted-foreground">20s-30s athletes</td>
                <td className="px-6 py-4 text-primary font-medium">Adults 35+ seeking longevity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6: The Bottom Line */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Start Training Smarter Today
        </h2>

        <div className="bg-foreground text-white rounded-2xl p-10 mb-8">
          <p className="text-xl leading-relaxed mb-6">
            Traditional workouts stop working after 40 because they're built for recovery systems you no longer have. The solution isn't to push harder — it's to train smarter.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            You don't need more intensity. You need better movement, proper breathing, and progressive loading that respects where your body is right now.
          </p>
          <p className="text-xl leading-relaxed font-bold text-drake-gold">
            Ready to see how this works? <Link to="/reset-week-charleston" className="underline hover:text-white">Reset Week</Link> is where most Charleston members start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Movement Quality", sub: "Over intensity" },
            { title: "Progressive Loading", sub: "Over random workouts" },
            { title: "Coaching", sub: "Over crowd control" },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// =====================================================
// The Drake Philosophy: Why We Train Differently
// =====================================================
export const DrakePhilosophyContent = () => {
  return (
    <>
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          Every gym has equipment. Most have trainers. What sets Drake Fitness apart isn't what we have — it's how we think about movement, strength, and your long-term success.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={coachingSession} alt="Coach guiding proper movement form" aspectRatio="video" />
      </div>

      {/* Visual Break: 4 Pillars */}
      <section className="py-12 bg-primary text-white rounded-2xl mb-16 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-hero text-3xl md:text-4xl font-bold mb-4 uppercase">Our Four Pillars</h2>
          <p className="text-gray-200 text-lg">The foundation of everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Scale, title: "Movement Quality", desc: "How you move before how much you lift" },
            { icon: Eye, title: "Real Coaching", desc: "We watch, correct, and guide every rep" },
            { icon: Calendar, title: "Long-Term Focus", desc: "Success measured in years, not weeks" },
            { icon: Users, title: "Supportive Community", desc: "No egos, just encouragement" },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <item.icon className="w-10 h-10 text-drake-gold mx-auto mb-4" />
              <h3 className="font-hero text-lg font-bold mb-2 uppercase">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Movement Quality Section */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Movement Quality Over Intensity
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          The fitness industry sells intensity. More reps. Heavier weights. Harder workouts. But intensity without quality creates problems. We've seen too many people hurt themselves chasing "more" when they should have focused on "better."
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Our approach prioritizes how you move before how much you lift. This doesn't mean easy workouts — it means smart ones.
        </p>
      </div>

      {/* Coaching Section with Icon List */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Coaching, Not Counting Reps
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Anyone can count your reps. Real coaching means:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Search, text: "Identifying movement restrictions before they become injuries" },
            { icon: Wrench, text: "Modifying exercises to match your body's current capacity" },
            { icon: TrendingUp, text: "Progressing you at the right pace — not too slow, not too fast" },
            { icon: Brain, text: "Teaching you to understand your own body" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-muted p-6 rounded-xl">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl">
          <p className="text-lg text-foreground leading-relaxed">
            We limit class sizes specifically to ensure you get actual coaching attention, not just supervision.
          </p>
        </div>
      </div>

      {/* Long-Term Thinking */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Long-Term Thinking
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          We measure success in years, not weeks. The question isn't "how hard was your workout today?" It's "can you still move well at 60, 70, 80?"
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every exercise we teach, every progression we use, is designed with your long-term health in mind. That's not always the fastest path — but it's the one that lasts.
        </p>
      </div>

      {/* Community Section */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Community That Supports
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Our members aren't competing against each other. They're supporting each other. When someone struggles with a movement, others offer encouragement. When someone achieves a milestone, the whole group celebrates.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          This culture doesn't happen by accident. We cultivate it intentionally because sustainable fitness requires community.
        </p>
      </div>
    </>
  );
};

// =====================================================
// Understanding Mobility vs. Flexibility
// =====================================================
export const MobilityVsFlexibilityContent = () => {
  return (
    <>
      <div className="mb-12">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          You can touch your toes, but your hips still feel tight. You can stretch for hours, but your shoulders still ache. What's going on?
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The answer lies in the difference between flexibility and mobility — and why most people focus on the wrong one.
        </p>
      </div>

      {/* Short Answer Block for AI Extraction */}
      <div className="bg-primary/5 border-2 border-primary rounded-xl p-6 mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">Short Answer</p>
        <p className="text-lg text-foreground leading-relaxed">
          Flexibility is passive range of motion. Mobility is active control through that range. Mobility is what actually matters for pain-free daily movement.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={mobilityClass} alt="Mobility training session" aspectRatio="video" />
      </div>

      {/* Definition Boxes - Comparison Table */}
      <div className="mb-12">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-background rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-4 text-left font-hero uppercase">Factor</th>
                <th className="px-6 py-4 text-left font-hero uppercase">Flexibility</th>
                <th className="px-6 py-4 text-left font-hero uppercase">Mobility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Type</td>
                <td className="px-6 py-4 text-muted-foreground">Passive</td>
                <td className="px-6 py-4 text-primary font-medium">Active</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Control</td>
                <td className="px-6 py-4 text-muted-foreground">External force</td>
                <td className="px-6 py-4 text-primary font-medium">Self-controlled</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">How Trained</td>
                <td className="px-6 py-4 text-muted-foreground">Static stretching</td>
                <td className="px-6 py-4 text-primary font-medium">Controlled movement drills</td>
              </tr>
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">Daily Impact</td>
                <td className="px-6 py-4 text-muted-foreground">Limited transfer</td>
                <td className="px-6 py-4 text-primary font-medium">High functional benefit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-t-4 border-gray-400 text-center">
          <h3 className="font-hero text-xl font-bold uppercase mb-2">Flexibility</h3>
          <p className="text-lg font-medium text-muted-foreground">Passive Range of Motion</p>
          <p className="text-sm text-muted-foreground mt-2">How far you CAN go</p>
        </div>
        <div className="bg-primary/10 p-6 rounded-xl border-t-4 border-primary text-center">
          <h3 className="font-hero text-xl font-bold uppercase mb-2">Mobility</h3>
          <p className="text-lg font-medium text-primary">Active Range of Motion</p>
          <p className="text-sm text-muted-foreground mt-2">How far you CAN CONTROL</p>
        </div>
      </div>

      {/* Two Column Deep Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-muted p-8 rounded-2xl border-t-4 border-gray-400">
          <h2 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase">Flexibility</h2>
          <p className="text-primary font-semibold mb-4">Passive Range of Motion</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Flexibility is how far a joint can move when an external force (gravity, your hand, a partner) pushes it there. It's passive. You're not controlling the movement — something else is.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Stretching improves flexibility. But flexibility alone doesn't help you move better or feel better during daily activities.
          </p>
        </div>
        <div className="bg-primary/10 p-8 rounded-2xl border-t-4 border-primary">
          <h2 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase">Mobility</h2>
          <p className="text-primary font-semibold mb-4">Active Range of Motion</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mobility is how far a joint can move when YOU control the movement with strength and stability. It's active. Your muscles are engaged throughout the range.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium">
            This is what actually matters for pain-free movement.
          </p>
        </div>
      </div>

      {/* Why This Matters in Charleston */}
      <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl mb-16">
        <h3 className="font-hero text-xl font-bold text-foreground mb-4 uppercase">Why This Matters for Charleston Residents</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Whether you spend your day at a desk in downtown Charleston, stand for long shifts in the service industry, or enjoy the active lifestyle our area offers—from paddleboarding to hiking—mobility is what determines how you feel afterward. Our <Link to="/mobility-fitness-avondale" className="text-primary font-semibold hover:underline">Avondale studio</Link> specializes in building the active control you need for pain-free movement in real life.
        </p>
      </div>

      {/* What Mobility Matters For */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Why Mobility Matters
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, text: "Getting in/out of a car" },
            { icon: Dumbbell, text: "Picking things up safely" },
            { icon: Users, text: "Playing with kids/grandkids" },
            { icon: Shield, text: "Training without injury" },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-6 rounded-xl text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-background border-2 border-primary rounded-2xl p-8 mb-16">
        <h3 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-drake-gold" />
          Why Stretching Alone Doesn't Work
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          You can stretch your hamstrings every day and still "feel tight." Why? Because your nervous system doesn't trust that range of motion.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          If you can't control a position with strength, your brain limits access to it. Stretching without strengthening creates passive range you can't actually use.
        </p>
      </div>

      {/* How We Build Mobility */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          How We Build Real Mobility
        </h2>
        <div className="space-y-6">
          {[
            { title: "Controlled Articular Rotations", desc: "Moving joints through their full range with active control" },
            { title: "End-Range Strength Training", desc: "Building strength in your deepest positions" },
            { title: "Movement Pattern Training", desc: "Integrating mobility into functional movements" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-muted p-6 rounded-xl">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// =====================================================
// Too Out of Shape to Start
// =====================================================
export const TooOutOfShapeContent = () => {
  return (
    <>
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          We hear this concern constantly: "I need to get in shape before I can come to your gym." It makes sense — but it's exactly backwards.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={groupKettlebellTraining} alt="Beginner-friendly group training" aspectRatio="video" />
      </div>

      {/* The Problem */}
      <div className="bg-foreground text-white p-10 rounded-2xl mb-16">
        <h2 className="font-hero text-2xl font-bold mb-4 uppercase flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-drake-gold" />
          The Chicken-and-Egg Problem
        </h2>
        <p className="text-gray-300 leading-relaxed">
          If you wait until you're "in shape enough" to start training, you'll never start. That's not motivational speak — it's just logic. Getting in shape is why you need training. It's not a prerequisite.
        </p>
      </div>

      {/* Who Reset Week Is For */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Who Reset Week Is Designed For
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Reset Week was specifically designed for people who:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Clock, text: "Haven't exercised regularly in years" },
            { icon: Shield, text: "Feel intimidated by traditional gyms" },
            { icon: Activity, text: "Have old injuries or movement restrictions" },
            { icon: Compass, text: "Don't know where to start" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-muted p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-foreground font-medium">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-muted-foreground mt-8 leading-relaxed">
          We don't throw you into a high-intensity class and hope you survive. We meet you where you are.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Real Stories from Members Who Started "Out of Shape"
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted p-8 rounded-2xl border-l-4 border-drake-gold">
            <p className="text-lg text-muted-foreground italic mb-4">
              "I couldn't touch my toes when I started. Now I deadlift 135 pounds and my back pain is gone."
            </p>
            <p className="font-semibold text-foreground">— Sarah, 47, West Ashley</p>
          </div>
          <div className="bg-muted p-8 rounded-2xl border-l-4 border-drake-gold">
            <p className="text-lg text-muted-foreground italic mb-4">
              "I was 50 pounds overweight and hadn't exercised in 10 years. They didn't make me feel embarrassed — they made me feel capable."
            </p>
            <p className="font-semibold text-foreground">— Tom, 52, Downtown Charleston</p>
          </div>
        </div>
      </div>

      {/* The Only Requirement */}
      <div className="bg-primary text-white p-10 rounded-2xl text-center">
        <h2 className="font-hero text-3xl font-bold mb-4 uppercase">The Only Requirement</h2>
        <p className="text-2xl font-bold text-drake-gold mb-4">Show up.</p>
        <p className="text-gray-200 text-lg">That's it. We'll handle the rest.</p>
      </div>
    </>
  );
};

// =====================================================
// Why We Don't Believe in No Pain No Gain
// =====================================================
export const NoPainNoGainContent = () => {
  return (
    <>
      {/* Intro Section */}
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          "No pain, no gain" sounds tough.
        </p>
        <p className="text-xl text-foreground leading-relaxed font-medium">
          It also sends more people out of gyms than it brings in.
        </p>
      </div>

      {/* Featured Image */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={blogNoPainNoGainHero} alt="Smart coaching emphasizing proper form over intensity" aspectRatio="video" />
      </div>

      {/* Section 1: Pain Is Not Progress */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Why Pain During Exercise Isn't Progress
        </h2>
        
        {/* Teal callout */}
        <div className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl mb-8">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            Pain doesn't mean you're getting stronger. It means your body is under stress it hasn't adapted to yet.
          </p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          There's a difference between the brief discomfort of effort — muscles working, breath deepening — and actual pain. Short-term soreness is part of training. Persistent pain is a warning sign.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Your body communicates through sensation. When it sends pain signals, it's not testing your toughness — it's asking you to back off before something breaks.
        </p>

        {/* Key Insight Card */}
        <div className="bg-background border border-border rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">Key Insight</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The best athletes don't push through pain — they train around it. They've learned that ignoring signals leads to setbacks, not breakthroughs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Why This Advice Fails Long-Term */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Why This Advice Fails Long-Term
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          "No pain, no gain" creates a dangerous framework:
        </p>

        <div className="space-y-4 mb-10">
          {[
            { icon: VolumeX, title: "Encourages Ignoring Feedback", desc: "You learn to push through signals your body sends for protection." },
            { icon: AlertTriangle, title: "Rewards Overuse", desc: "The more you hurt, the 'harder' you think you're working." },
            { icon: Bed, title: "Penalizes Recovery", desc: "Rest days feel like weakness instead of necessary adaptation." },
            { icon: Flame, title: "Burns People Out", desc: "Constant discomfort isn't sustainable — mentally or physically." },
          ].map((item, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amber callout */}
        <div className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-r-xl">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            That's why so many people quit — right when they "should" be seeing results.
          </p>
        </div>
      </div>

      {/* Section 3: Real Strength Feels Different */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What Sustainable Strength Actually Feels Like
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Sustainable strength doesn't leave you broken. It builds you up:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: ShieldCheck, title: "Improves Confidence", desc: "You feel capable, not constantly battling your body.", gradient: "from-green-500 to-emerald-600" },
            { icon: TrendingUp, title: "Increases Capability", desc: "You can do more — lift heavier, move better, last longer.", gradient: "from-blue-500 to-indigo-600" },
            { icon: Zap, title: "Leaves You Energized", desc: "Training should add to your life, not deplete it.", gradient: "from-purple-500 to-violet-600" },
            { icon: Home, title: "Shows Up in Daily Life", desc: "You notice it when you pick up your kids, carry groceries, or play sports.", gradient: "from-primary to-teal-600" },
          ].map((item, i) => (
            <div key={i} className={`bg-gradient-to-br ${item.gradient} text-white rounded-2xl p-8`}>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-hero text-xl font-bold mb-3 uppercase">{item.title}</h3>
              <p className="text-white/90 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Gold callout */}
        <div className="border-l-4 border-drake-gold bg-drake-gold/10 p-6 rounded-r-xl">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            If training constantly beats you up, something is off. Real progress feels like growth — not punishment.
          </p>
        </div>
      </div>

      {/* Section 4: How Drake Fitness Does It Differently */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          How Drake Fitness Does It Differently
        </h2>

        {/* Teal gradient box with checklist */}
        <div className="bg-gradient-to-br from-primary to-teal-800 text-white rounded-2xl p-8 md:p-10 mb-8">
          <p className="text-xl font-bold mb-6">We believe:</p>
          <div className="space-y-4">
            {[
              "Control comes before load — we don't add weight until your body can handle the movement pattern with precision.",
              "Progression should feel earned — not forced, not rushed. Every step forward builds on the last.",
              "Recovery is part of training — not an afterthought. It's when your body actually gets stronger.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-drake-gold flex-shrink-0 mt-0.5" />
                <p className="text-white/90 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xl font-bold text-drake-gold">
            Our goal isn't to destroy you in an hour. It's to keep you training for years.
          </p>
        </div>

        {/* Gray follow-up */}
        <div className="bg-muted rounded-xl p-6">
          <p className="text-muted-foreground leading-relaxed">
            In the long run, the tortoise beats the hare. Slow, consistent progress with intelligent training creates results that last — without the injuries, burnout, or frustration.
          </p>
        </div>
      </div>

      {/* Section 5: Who This Matters Most For */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Who This Matters Most For
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          This approach resonates most with:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: CalendarDays, title: "Adults Over 30", desc: "When recovery slows down and your body demands smarter training.", bgColor: "bg-blue-100 dark:bg-blue-950/50", iconColor: "text-blue-600 dark:text-blue-400" },
            { icon: RefreshCw, title: "People Restarting Fitness", desc: "After time off, injury, or burnout from previous training approaches.", bgColor: "bg-green-100 dark:bg-green-950/50", iconColor: "text-green-600 dark:text-green-400" },
            { icon: HandHeart, title: "Anyone Tired of Being Sore", desc: "Constant discomfort isn't a badge of honor — it's a sign something's wrong.", bgColor: "bg-amber-100 dark:bg-amber-950/50", iconColor: "text-amber-600 dark:text-amber-400" },
            { icon: Infinity, title: "Anyone Who Wants Longevity", desc: "Not just for the next few months — for the rest of your life.", bgColor: "bg-purple-100 dark:bg-purple-950/50", iconColor: "text-purple-600 dark:text-purple-400" },
          ].map((item, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          If joint pain or past injuries have kept you away from fitness, you might also benefit from our <Link to="/low-impact-fitness-charleston" className="text-primary font-semibold hover:underline">low-impact fitness approach</Link>.
        </p>

        {/* Inline CTA */}
        <div className="bg-gradient-to-r from-primary to-teal-700 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xl font-bold text-center md:text-left">Curious how this works in practice? Reset Week is your introduction.</p>
          <Link 
            to="/reset-week-charleston"
            className="inline-flex items-center gap-2 px-8 py-4 bg-drake-gold text-foreground font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-lg uppercase tracking-wide whitespace-nowrap"
          >
            See How We Train Differently
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Section 6: Final Message Card */}
      <div className="mb-16">
        <div className="bg-background border-2 border-drake-gold rounded-2xl p-10 text-center shadow-lg">
          <div className="w-16 h-16 bg-drake-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="w-8 h-8 text-drake-gold" />
          </div>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
            Strong Doesn't Have to Hurt
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Real strength builds quietly — through controlled movement, smart progression, and intentional recovery. Pain isn't progress. It's a warning. The strongest people we train are the ones who learned to listen.
          </p>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-br from-primary to-teal-900 text-white rounded-3xl p-10 md:p-12 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">
          Ready to Experience Pain-Free Progress?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
          Reset Week teaches you how to build real strength — without beating up your body in the process.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link 
            to="/reset-week-charleston"
            className="inline-flex items-center gap-2 px-10 py-5 bg-drake-gold text-foreground font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-xl uppercase tracking-wide"
          >
            <CalendarCheck className="w-5 h-5" />
            Start Reset Week Now
          </Link>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all uppercase tracking-wide"
          >
            <Phone className="w-5 h-5" />
            Talk to a Coach
          </Link>
        </div>
        <p className="text-white/70 text-sm">
          <Phone className="w-4 h-4 inline mr-2" />
          (843) 817-5420 — Charleston, SC
        </p>
      </div>
    </>
  );
};

// =====================================================
// Training With Old Injury
// =====================================================
export const TrainingWithInjuryContent = () => {
  return (
    <>
      <div className="mb-12">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          That old knee injury. The shoulder surgery from five years ago. The back that "goes out" sometimes. Can you still train? Absolutely — and here's how we make it work.
        </p>
      </div>

      {/* Short Answer Block for AI Extraction */}
      <div className="bg-primary/5 border-2 border-primary rounded-xl p-6 mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">Short Answer</p>
        <p className="text-lg text-foreground leading-relaxed">
          Yes, you can train with old injuries—if movement is assessed and exercises are modified correctly. Most injuries don't prevent all exercise; they prevent specific exercises.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={kettlebellFormCheck} alt="Coach helping with form" aspectRatio="video" />
      </div>

      {/* FAQ-style Key Message */}
      <div className="bg-primary/10 border-l-4 border-primary p-8 rounded-r-2xl mb-16">
        <h2 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase">
          Is It Safe to Train With an Old Injury?
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          In most cases, yes. Most injuries don't prevent all exercise — they prevent certain exercises. The key is knowing which movements are safe and which need modification or avoidance.
        </p>
      </div>

      {/* Our Process */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Our Process
        </h2>
        <div className="space-y-6">
          {[
            { num: 1, title: "Assessment", desc: "Before you touch a weight, we learn about your injury history. What hurts? What movements are limited? What have doctors or physical therapists said?" },
            { num: 2, title: "Movement Screening", desc: "We watch you move. Not to judge — to understand. Where do you compensate? What feels restricted? This tells us more than any questionnaire." },
            { num: 3, title: "Modification", desc: "Every exercise has alternatives. Can't squat deep? We find your safe depth. Shoulder won't go overhead? We work around it. There's always an option." },
            { num: 4, title: "Progression", desc: "As you get stronger and more mobile, we expand what's possible. Many members eventually do movements they thought were forever off-limits." },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-6 bg-muted p-8 rounded-2xl">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-hero text-xl font-bold flex-shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="font-hero text-xl font-bold text-foreground mb-2 uppercase">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Examples */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Real Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { condition: "Knee Replacement", solution: "Modified lunges and step-ups, avoiding deep flexion initially" },
            { condition: "Shoulder Impingement", solution: "Landmine presses instead of overhead pressing" },
            { condition: "Lower Back History", solution: "Core stability emphasis, hip hinge mastery before deadlifts" },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-6 rounded-xl">
              <h3 className="font-bold text-primary mb-2">{item.condition}</h3>
              <p className="text-muted-foreground text-sm">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* When to See a Professional */}
      <div className="bg-foreground text-white p-10 rounded-2xl mb-16">
        <h3 className="font-hero text-2xl font-bold mb-4 uppercase flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-drake-gold" />
          When to Consult a Professional First
        </h3>
        <p className="text-gray-300 leading-relaxed">
          If you're currently in acute pain or have an undiagnosed issue, see a doctor or physical therapist first. We work with healthcare providers, not instead of them.
        </p>
      </div>

      {/* Reassurance CTA */}
      <div className="bg-gradient-to-r from-primary to-teal-700 text-white rounded-2xl p-10 text-center">
        <h3 className="font-hero text-2xl font-bold mb-4 uppercase">
          Still Unsure If Training Is Right for You?
        </h3>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Reset Week is designed for exactly this situation. We assess your movement, work around your limitations, and show you what's possible—safely.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/reset-week-charleston" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-drake-gold text-foreground font-bold rounded-lg hover:bg-yellow-400 transition-all uppercase tracking-wide"
          >
            <Calendar className="w-5 h-5" /> Try Reset Week
          </Link>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all uppercase tracking-wide"
          >
            <Phone className="w-5 h-5" /> Talk to a Coach First
          </Link>
        </div>
      </div>
    </>
  );
};

// =====================================================
// How Breathing Controls Movement
// =====================================================
export const BreathingControlsMovementContent = () => {
  return (
    <>
      <div className="mb-12">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          Before you worry about your squat form or deadlift technique, ask yourself: are you breathing correctly? For most people, the answer is no.
        </p>
      </div>

      {/* Short Answer Block for AI Extraction */}
      <div className="bg-primary/5 border-2 border-primary rounded-xl p-6 mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">Short Answer</p>
        <p className="text-lg text-foreground leading-relaxed">
          Proper breathing creates core stability, positions your ribcage for better mechanics, and regulates your nervous system. Without correct breathing, even perfect exercise form is built on a weak foundation.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={studioFloorExercise} alt="Floor exercise focusing on breathing" aspectRatio="video" />
      </div>

      {/* Breathing Isn't Just About Oxygen */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Breathing Isn't Just About Oxygen
        </h2>
        <p className="text-lg text-muted-foreground mb-8">We think of breathing as simple gas exchange. In, out, repeat. But breathing does much more:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Shield, text: "Creates intra-abdominal pressure for spinal stability" },
            { icon: Activity, text: "Positions your ribcage for optimal shoulder mechanics" },
            { icon: Brain, text: "Regulates your nervous system's stress response" },
            { icon: Zap, text: "Influences your ability to access certain ranges of motion" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-muted p-6 rounded-xl">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Problem */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Chest Breathing Problem
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Most adults breathe shallowly into their chest. This pattern:</p>
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-8 rounded-2xl">
          <ul className="space-y-3">
            {[
              "Creates tension in the neck and shoulders",
              "Limits core stability during lifting",
              "Keeps the nervous system in a stressed state",
              "Reduces available mobility in the thoracic spine",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-lg text-muted-foreground mt-8 leading-relaxed">
          You can have perfect exercise form, but if your breathing is dysfunctional, you're building on a weak foundation.
        </p>
      </div>

      {/* What Good Breathing Looks Like */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What Good Breathing Looks Like
        </h2>
        <div className="bg-primary/10 border border-primary p-8 rounded-2xl">
          <p className="text-lg text-foreground mb-6 font-medium">Proper diaphragmatic breathing involves:</p>
          <ul className="space-y-3">
            {[
              "Expansion in all directions (front, sides, back)",
              "Minimal shoulder and neck movement",
              "A relaxed exhale that naturally engages the core",
              "A rhythm that matches the demands of the movement",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Earlier Reset Week Link */}
      <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-6 rounded-r-xl mb-16">
        <p className="text-lg text-foreground leading-relaxed">
          <strong>This is why Reset Week starts with breathing.</strong> Before we add any load or intensity, we ensure your breathing mechanics create the foundation for safe movement. <Link to="/reset-week-charleston" className="text-primary font-bold hover:underline">Learn more about Reset Week →</Link>
        </p>
      </div>

      {/* How We Teach It */}
      <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl">
        <h3 className="font-hero text-xl font-bold text-foreground mb-4 uppercase">How We Teach It</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          In Reset Week, we spend time on breathing before any loaded exercise. This might feel basic, but it's foundational. Members consistently report that breathing work alone reduces back pain and improves their ability to move.
        </p>
      </div>
    </>
  );
};

// =====================================================
// What Makes Drake Fitness Different
// =====================================================
export const WhatMakesDrakeDifferentContent = () => {
  return (
    <>
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          Charleston has no shortage of gyms. West Ashley alone has a dozen options within a few miles. So why do members drive past other gyms to train with us in Avondale? Here's an honest comparison.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={studioFullView} alt="Drake Fitness studio" aspectRatio="video" />
      </div>

      {/* Key Differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: Users,
            title: "Small Class Sizes",
            highlight: "12 People Max",
            desc: "Not 20. Not 30. Twelve max. This ensures every person gets individual attention during every session.",
          },
          {
            icon: UserCheck,
            title: "Coaches Who Coach",
            highlight: "Real Guidance",
            desc: "Our coaches don't just demonstrate and count. They watch, correct, and know your history.",
          },
          {
            icon: TrendingUp,
            title: "Progressive Programming",
            highlight: "Systematic Growth",
            desc: "No random workouts. Our programming builds systematically week over week.",
          },
          {
            icon: Heart,
            title: "Community Without Competition",
            highlight: "Support Over Scores",
            desc: "No leaderboards. No pressure to beat others. Just personal progress and mutual support.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-muted p-8 rounded-2xl">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-hero text-xl font-bold text-foreground mb-1 uppercase">{item.title}</h3>
            <p className="text-primary font-semibold text-sm mb-3">{item.highlight}</p>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* What Coaching Means */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          What Real Coaching Means
        </h2>
        <div className="space-y-4">
          {[
            "Watch your movement quality throughout every session",
            "Provide real-time corrections and modifications",
            "Know your injury history and adjust accordingly",
            "Track your progress and adjust programming",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-primary/10 p-5 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-foreground font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment */}
      <div className="bg-foreground text-white p-10 rounded-2xl text-center">
        <h2 className="font-hero text-2xl font-bold mb-4 uppercase">Investment in Long-Term Results</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We're not the cheapest option. We're not trying to be. Our pricing reflects the coaching quality, class sizes, and programming that produce real, lasting results.
        </p>
        <p className="text-drake-gold font-bold text-lg">
          See the difference for yourself. Reset Week is your risk-free introduction.
        </p>
      </div>
    </>
  );
};

// =====================================================
// How Much Time Do I Really Need
// =====================================================
export const HowMuchTimeContent = () => {
  return (
    <>
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          You're busy. Work, family, commute, responsibilities. Where does fitness fit? Here's an honest look at the minimum effective dose.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <SmartGalleryImage src={blogKettlebellOverheadGroup} alt="Kettlebell overhead press group training" aspectRatio="video" />
      </div>

      {/* The Truth */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Truth About Time Requirements
        </h2>
        <div className="bg-primary text-white p-10 rounded-2xl mb-8">
          <p className="text-center mb-6">
            <span className="font-hero text-5xl font-bold text-drake-gold">3</span>
            <span className="text-2xl ml-2">sessions × 45 minutes = </span>
            <span className="font-hero text-5xl font-bold text-drake-gold">2.25</span>
            <span className="text-2xl ml-2">hours/week</span>
          </p>
          <p className="text-center text-gray-200">Less than most people spend on Netflix in a day.</p>
        </div>
        <p className="text-lg text-muted-foreground mb-6">This is enough to:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Dumbbell, text: "Build strength" },
            { icon: Activity, text: "Improve mobility" },
            { icon: Zap, text: "Boost energy" },
            { icon: HeartPulse, text: "Better health" },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-6 rounded-xl text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charleston Lifestyle Reference */}
      <div className="bg-muted rounded-xl p-6 mb-16">
        <p className="text-lg text-muted-foreground leading-relaxed">
          <strong className="text-foreground">For Charleston residents:</strong> Our Avondale location means most West Ashley members are 5-10 minutes away. Early morning classes mean you can train before downtown traffic, and evening sessions fit after a normal workday.
        </p>
      </div>

      {/* Quality Over Quantity */}
      <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl mb-16">
        <h2 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase">
          Quality Over Quantity
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          More isn't always better. Three focused sessions with quality coaching beats five random workouts. We've seen members training 2-3 times per week outperform those who train 6 times per week at other gyms. <strong className="text-foreground">Smart programming and proper recovery matter more than volume.</strong>
        </p>
      </div>

      {/* Schedule Options */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Making It Work With Your Schedule
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Our class schedule is designed for working professionals:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Calendar, text: "Early morning options before work" },
            { icon: Clock, text: "Evening slots after normal work hours" },
            { icon: RotateCcw, text: "Consistent times that become routine" },
            { icon: CheckCircle2, text: "Sessions that start and end on time" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-muted p-5 rounded-xl">
              <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Real Barrier */}
      <div className="bg-background border-2 border-primary rounded-2xl p-8 mb-16">
        <h3 className="font-hero text-xl font-bold text-foreground mb-4 uppercase flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-drake-gold" />
          The Real Barrier Isn't Time
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Most "I don't have time" objections are actually "I haven't prioritized this." We get it — life is demanding. But investing 2-3 hours weekly in your health pays dividends in every other area of life. Better energy. Less pain. More capacity for everything else.
        </p>
      </div>

      {/* Start Simple */}
      <div className="bg-foreground text-white p-10 rounded-2xl text-center">
        <h2 className="font-hero text-2xl font-bold mb-4 uppercase">Start With What You Have</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Can you commit to two sessions per week? Start there.
        </p>
        <p className="text-drake-gold font-bold text-xl">
          Consistency with two beats inconsistency with five.
        </p>
      </div>
    </>
  );
};

// =====================================================
// What Real Strength Actually Means
// =====================================================
export const WhatRealStrengthContent = () => {
  return (
    <>
      {/* Intro Section with teal border */}
      <div className="mb-16">
        <p className="text-2xl text-muted-foreground leading-relaxed font-light border-l-4 border-primary pl-6">
          When most people hear "strength," they think heavy weights. Maxing out. Grinding through reps. But that's only part of the picture—and often, not the most important part.
        </p>
      </div>

      {/* Section 1: Strength Is Control */}
      <div className="bg-muted rounded-2xl p-10 mb-16">
        <h2 className="font-hero text-3xl font-bold text-foreground mb-6 uppercase">Strength Is Control</h2>
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          Real strength means:
        </p>
        <ul className="space-y-4 text-lg text-muted-foreground">
          {[
            { bold: "You can control your body", text: "through full ranges of motion without compensation" },
            { bold: "You can handle load safely", text: "without breaking down your movement patterns" },
            { bold: "You move with confidence", text: "in any situation life throws at you" },
            { bold: "You don't fear everyday tasks", text: "like lifting, carrying, or moving" },
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="w-7 h-7 text-primary mr-4 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">{item.bold}</strong> {item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-16 space-y-6">
        <p className="text-xl text-muted-foreground leading-relaxed">
          Strength that only exists in the gym isn't very useful. This is exactly what we teach in <Link to="/reset-week-charleston" className="text-primary font-semibold hover:underline">Reset Week</Link>.
        </p>
        <p className="text-xl text-muted-foreground leading-relaxed">
          If you can deadlift 300 pounds but can't pick up a bag of groceries without tweaking your back—that's not real strength. If you can bench press your body weight but your shoulder hurts when you reach overhead—that's not functional capacity.
        </p>
      </div>

      {/* Visual Break - 3 Pillars */}
      <div className="bg-primary py-16 px-8 rounded-2xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
          <div>
            <Activity className="w-16 h-16 mx-auto mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-3 uppercase">Movement Quality</h3>
            <p className="text-gray-200">Control comes before load</p>
          </div>
          <div>
            <Shield className="w-16 h-16 mx-auto mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-3 uppercase">Injury Prevention</h3>
            <p className="text-gray-200">Strength that protects</p>
          </div>
          <div>
            <HeartPulse className="w-16 h-16 mx-auto mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-3 uppercase">Daily Confidence</h3>
            <p className="text-gray-200">Strength for real life</p>
          </div>
        </div>
      </div>

      {/* Section 2: Why Machines Create False Confidence */}
      <div className="mb-16">
        <h2 className="font-hero text-4xl font-bold text-foreground mb-8 uppercase">Why Machines Create False Confidence</h2>
        
        <div className="bg-red-50 border-l-4 border-red-600 p-8 rounded-r-xl mb-12">
          <p className="text-xl text-foreground leading-relaxed mb-4">
            Machines can make you feel strong—without building strength you can actually use.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            They're not inherently bad. But they shouldn't be your foundation.
          </p>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Here's the problem with machine-based training:
        </p>

        <div className="space-y-6 mb-12">
          {[
            { icon: X, title: "Lock You Into Fixed Paths", desc: "Your body doesn't move in perfectly straight lines in real life. Machines force you into unnatural movement patterns that don't transfer to functional activities." },
            { icon: Scale, title: "Remove Balance Demands", desc: "The machine stabilizes the weight for you. You never learn to create stability from your own body—which is what you need when lifting groceries or carrying a child." },
            { icon: Brain, title: "Reduce Coordination", desc: "Real strength requires multiple muscle groups working together in coordinated patterns. Machines isolate muscles, which sounds good in theory—but doesn't build functional capacity." },
          ].map((item, index) => (
            <div key={index} className="bg-background border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-hero text-2xl font-bold text-foreground mb-4 flex items-center uppercase">
                <item.icon className="w-8 h-8 text-red-600 mr-4" />
                {item.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-2xl p-10">
          <p className="text-xl text-foreground leading-relaxed font-semibold mb-4">
            You can load a leg press with 500 pounds and still struggle to squat your own body weight properly.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            That's the disconnect. That's false confidence.
          </p>
        </div>
      </div>

      {/* Section 3: Strength That Carries Over */}
      <div className="mb-16">
        <h2 className="font-hero text-4xl font-bold text-foreground mb-8 uppercase">Strength That Carries Over</h2>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          At Drake Fitness, we build strength differently. Our approach focuses on movements that actually transfer to your daily life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-primary text-white rounded-2xl p-8">
            <Dumbbell className="w-12 h-12 mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-4 uppercase">Controlled Free Movement</h3>
            <p className="text-gray-200 leading-relaxed">
              We use barbells, dumbbells, kettlebells, and your own body weight. You learn to control the load through space—just like real life demands.
            </p>
          </div>

          <div className="bg-foreground text-white rounded-2xl p-8">
            <Scale className="w-12 h-12 mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-4 uppercase">Stability-Focused Exercises</h3>
            <p className="text-gray-200 leading-relaxed">
              Before we add weight, we ensure you can stabilize your own body. Core strength. Breathing mechanics. Joint control. These come first.
            </p>
          </div>

          <div className="bg-gray-800 text-white rounded-2xl p-8">
            <Activity className="w-12 h-12 mb-4 text-drake-gold" />
            <h3 className="font-hero text-2xl font-bold mb-4 uppercase">Loaded Carries</h3>
            <p className="text-gray-200 leading-relaxed">
              Walking with weight teaches your body to maintain position under load—one of the most functional strength patterns you can train.
            </p>
          </div>

          <div className="bg-drake-gold text-foreground rounded-2xl p-8">
            <UserCheck className="w-12 h-12 mb-4 text-primary" />
            <h3 className="font-hero text-2xl font-bold mb-4 uppercase">Coaching You Can Feel</h3>
            <p className="text-gray-800 leading-relaxed">
              Small classes mean we catch compensations before they become habits. You get real-time feedback on every rep.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-xl">
          <p className="text-xl text-foreground leading-relaxed font-semibold mb-4">
            Nothing flashy. Everything intentional.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're not here to make you sore. We're here to make you capable.
          </p>
        </div>
      </div>

      {/* Section 4: Why This Matters in Real Life */}
      <div className="mb-16 bg-muted py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-hero text-4xl font-bold text-foreground mb-8 uppercase">Why This Matters in Real Life</h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Real strength shows up when you need it—not just when you're in the gym. This is the foundation of <Link to="/strength-training-charleston" className="text-primary font-semibold hover:underline">strength training at Drake Fitness</Link>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: ShieldCheck, title: "Lifting Groceries", desc: "Multiple bags. Awkward angles. One trip from the car. That's functional strength." },
              { icon: Heart, title: "Carrying Kids", desc: "Holding a toddler on your hip for 20 minutes. Picking them up off the floor repeatedly. That requires real core strength." },
              { icon: Home, title: "Moving Furniture", desc: "Rearranging a room. Helping a friend move. You need strength, stability, and coordination—not just max weight on a bar." },
              { icon: Activity, title: "Staying Active Without Fear", desc: "Hiking. Playing with your dog. Picking up a new sport. Real strength gives you confidence to move freely." },
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-hero text-xl font-bold text-foreground uppercase">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-10 shadow-lg border-2 border-primary">
            <p className="text-2xl text-foreground leading-relaxed font-bold mb-4 text-center">
              That's the kind of strength most people actually want.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Not a number on a leaderboard. Not a max lift you'll never use. Just the ability to live your life without limitation.
            </p>
          </div>
        </div>
      </div>

      {/* Section 5: The Reset Week Philosophy */}
      <div className="mb-16">
        <h2 className="font-hero text-4xl font-bold text-foreground mb-8 uppercase">The Reset Week Philosophy</h2>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          This is why Reset Week exists.
        </p>

        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          We're not trying to break you down in week one. We're not testing your max lifts or pushing you to failure. We're teaching you what real strength feels like—and how to build it sustainably.
        </p>

        <div className="space-y-6 mb-12">
          {[
            { icon: ShieldCheck, title: "Without Overwhelm", desc: "We introduce movements progressively. You learn the patterns before we add complexity or load." },
            { icon: HandHeart, title: "Without Pressure", desc: "No one's watching the clock. No one's comparing your numbers. You move at your pace." },
            { icon: Heart, title: "Without Unnecessary Pain", desc: "Soreness is not the goal. Movement quality is. If something hurts, we modify it." },
          ].map((item, index) => (
            <div key={index} className="flex items-start bg-muted rounded-xl p-8">
              <item.icon className="w-10 h-10 text-primary mr-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-hero text-2xl font-bold text-foreground mb-3 uppercase">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white rounded-2xl p-10">
          <p className="text-2xl leading-relaxed font-bold mb-6">
            It's about building confidence first—then building capacity.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            Because if you don't trust your body, you'll never push it to grow. And if you don't understand the movements, you'll never build strength that lasts.
          </p>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-foreground text-white rounded-2xl p-12 text-center">
        <Dumbbell className="w-16 h-16 mx-auto mb-8 text-drake-gold" />
        <h2 className="font-hero text-4xl md:text-5xl font-bold mb-6 uppercase">Curious? See What Real Strength Feels Like</h2>
        <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
          Reset Week is your no-pressure introduction. Discover what your body can actually do—and build from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link 
            to="/reset-week-charleston"
            className="px-10 py-5 bg-drake-gold text-foreground font-bold text-lg rounded-lg hover:bg-drake-gold/90 transition-all transform hover:-translate-y-1 shadow-2xl uppercase tracking-wide inline-flex items-center"
          >
            <ArrowRight className="mr-2 w-5 h-5" /> Start Reset Week
          </Link>
          <Link 
            to="/schedule"
            className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg hover:bg-white/20 transition-all border-2 border-white/30 uppercase tracking-wide inline-flex items-center"
          >
            <Calendar className="mr-2 w-5 h-5" /> View Schedule
          </Link>
        </div>
        <p className="text-gray-400 text-sm">
          Questions? Call us: <a href="tel:+18438175420" className="text-drake-gold hover:text-drake-gold/80 font-bold">(843) 817-5420</a>
        </p>
      </div>
    </>
  );
};

// Map slugs to content components
export const blogContentMap: Record<string, React.FC> = {
  'why-traditional-workouts-stop-working-after-40': WhyTraditionalWorkoutsContent,
  'the-drake-philosophy-why-we-train-differently': DrakePhilosophyContent,
  'understanding-mobility-vs-flexibility': MobilityVsFlexibilityContent,
  'too-out-of-shape-to-start-reset-week-for-beginners': TooOutOfShapeContent,
  'why-we-dont-believe-in-no-pain-no-gain': NoPainNoGainContent,
  'can-i-train-with-old-injury': TrainingWithInjuryContent,
  'how-breathing-controls-movement': BreathingControlsMovementContent,
  'what-makes-drake-fitness-different-from-charleston-gyms': WhatMakesDrakeDifferentContent,
  'how-much-time-do-i-really-need': HowMuchTimeContent,
  'what-real-strength-actually-means': WhatRealStrengthContent,
};