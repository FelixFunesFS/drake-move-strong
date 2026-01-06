import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Lightbulb, AlertTriangle, MessageCircle, CheckCircle2,
  Footprints, Wind, Dumbbell, RotateCcw, Eye, Search, Wrench, TrendingUp,
  Heart, Shield, Users, Calendar, Clock, Target, Sparkles, Brain, Zap,
  Activity, Scale, UserCheck, BadgeCheck, ChevronRight, X, AlertCircle,
  HeartPulse, ShieldCheck, CalendarCheck, Compass, HandHeart,
  SlidersHorizontal, Infinity, Moon, Frown, Trophy, Hourglass
} from "lucide-react";

import blogTraditionalWorkoutsHero from "@/assets/blog-traditional-workouts-hero.jpg";
import blogNoPainNoGainHero from "@/assets/blog-no-pain-no-gain-hero.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import mobilityClass from "@/assets/mobility-class.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";
import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import kettlebellFormCheck from "@/assets/kettlebell-form-check.jpg";
import studioFloorExercise from "@/assets/studio-floor-exercise.jpg";
import studioFullView from "@/assets/studio-full-view.jpg";
import outdoorTraining from "@/assets/outdoor-training.jpg";

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
        <img
          src={blogTraditionalWorkoutsHero}
          alt="Mature adult training with proper form and mobility focus"
          className="w-full h-auto max-h-96 object-cover"
        />
      </div>

      {/* Section 1: The Intensity Trap */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Intensity Trap: Why "Go Hard or Go Home" Stops Working
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
          What Your Body Actually Needs After 40
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
          The Three Phases of Smart Training
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          At Drake Fitness, we structure training around three progressive phases. Most gyms skip straight to Phase 3 — which is why people get hurt or burn out.
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
          What This Looks Like in Real Life
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
              <h3 className="font-bold text-xl mb-2">Sarah, 47 — Charleston, SC</h3>
              <p className="text-muted-foreground italic">"I thought I was just getting old. Turns out, I was just training wrong."</p>
            </div>
          </div>
          
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
          Common Objections (And The Truth)
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

      {/* Section 6: The Bottom Line */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Bottom Line
        </h2>

        <div className="bg-foreground text-white rounded-2xl p-10 mb-8">
          <p className="text-xl leading-relaxed mb-6">
            Traditional workouts stop working after 40 because they're built for recovery systems you no longer have. The solution isn't to push harder — it's to train smarter.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            You don't need more intensity. You need better movement, proper breathing, and progressive loading that respects where your body is right now.
          </p>
          <p className="text-xl leading-relaxed font-bold text-drake-gold">
            That's what Reset Week teaches. And that's why it works.
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
        <img src={coachingSession} alt="Coach guiding proper movement form" className="w-full h-auto max-h-96 object-cover" />
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
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          You can touch your toes, but your hips still feel tight. You can stretch for hours, but your shoulders still ache. What's going on?
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The answer lies in the difference between flexibility and mobility — and why most people focus on the wrong one.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <img src={mobilityClass} alt="Mobility training session" className="w-full h-auto max-h-96 object-cover" />
      </div>

      {/* Two Column Comparison */}
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
        <img src={groupKettlebellTraining} alt="Beginner-friendly group training" className="w-full h-auto max-h-96 object-cover" />
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
          Why Reset Week Works for Beginners
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
            <p className="font-semibold text-foreground">— Sarah, 47</p>
          </div>
          <div className="bg-muted p-8 rounded-2xl border-l-4 border-drake-gold">
            <p className="text-lg text-muted-foreground italic mb-4">
              "I was 50 pounds overweight and hadn't exercised in 10 years. They didn't make me feel embarrassed — they made me feel capable."
            </p>
            <p className="font-semibold text-foreground">— Tom, 52</p>
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
        <img src={blogNoPainNoGainHero} alt="Smart coaching emphasizing proper form over intensity" className="w-full h-auto max-h-96 object-cover" />
      </div>

      {/* Section 1: Pain Is Not Progress */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Pain Is Not Progress
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Pain doesn't mean you're getting stronger.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          It means your body is under stress it hasn't adapted to yet.
        </p>

        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-8 rounded-r-2xl mb-8">
          <p className="text-lg text-foreground leading-relaxed">
            <strong className="text-red-600 dark:text-red-400">Short-term soreness is normal.</strong><br />
            <strong className="text-red-600 dark:text-red-400">Persistent pain is a warning sign.</strong>
          </p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Your body communicates through sensation. When it sends pain signals, it's not testing your toughness — it's asking you to back off before something breaks.
        </p>
      </div>

      {/* Section 2: Why This Advice Fails Long-Term */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Why This Advice Fails Long-Term
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          "No pain, no gain":
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { title: "Encourages ignoring feedback", desc: "You learn to push through signals your body sends for protection." },
            { title: "Rewards overuse", desc: "The more you hurt, the \"harder\" you think you're working." },
            { title: "Penalizes recovery", desc: "Rest days feel like weakness instead of necessary adaptation." },
            { title: "Burns people out", desc: "Constant discomfort isn't sustainable — mentally or physically." },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-8 rounded-xl border-l-4 border-red-600">
              <div className="flex items-start gap-4">
                <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-foreground text-white p-10 rounded-2xl">
          <p className="text-xl leading-relaxed font-medium">
            That's why so many people quit — right when they "should" be seeing results.
          </p>
        </div>
      </div>

      {/* Section 3: Real Strength Feels Different */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          Real Strength Feels Different
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Sustainable strength:
        </p>

        <div className="space-y-6 mb-10">
          {[
            { title: "Improves confidence", desc: "You feel capable, not constantly battling your body." },
            { title: "Increases capability", desc: "You can do more — lift heavier, move better, last longer." },
            { title: "Leaves you energized — not wrecked", desc: "Training should add to your life, not deplete it." },
            { title: "Shows up in daily life", desc: "You notice it when you pick up your kids, carry groceries, or play sports." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-6 bg-background border-2 border-primary rounded-xl p-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-drake-gold/10 border-l-4 border-drake-gold p-8 rounded-r-2xl">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            If training constantly beats you up, something is off.
          </p>
        </div>
      </div>

      {/* Section 4: How Drake Fitness Does It Differently */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          How Drake Fitness Does It Differently
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We believe:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {[
            { icon: SlidersHorizontal, title: "Control comes before load", desc: "We don't add weight until your body can handle the movement pattern with precision." },
            { icon: TrendingUp, title: "Progression should feel earned", desc: "Not forced. Not rushed. Every step forward builds on the last." },
            { icon: Moon, title: "Recovery is part of training", desc: "Not an afterthought. It's when your body actually gets stronger." },
            { icon: Infinity, title: "Long-term matters most", desc: "We're not chasing quick fixes. We're building strength that lasts decades." },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-8 rounded-2xl">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-hero text-xl font-bold mb-3 uppercase">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white rounded-2xl p-10">
          <p className="text-xl leading-relaxed mb-4 font-medium">
            Our goal isn't to destroy you in an hour.
          </p>
          <p className="text-2xl leading-relaxed font-bold">
            It's to keep you training for years.
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

        <div className="space-y-6 mb-10">
          {[
            { icon: Hourglass, title: "Adults over 30", desc: "When recovery slows down and your body demands smarter training." },
            { icon: RotateCcw, title: "People restarting fitness", desc: "After time off, injury, or burnout from previous training approaches." },
            { icon: Frown, title: "Anyone tired of being sore", desc: "Constant discomfort isn't a badge of honor — it's a sign something's wrong." },
            { icon: Trophy, title: "Anyone who wants results that last", desc: "Not just for the next few months — for the rest of your life." },
          ].map((item, i) => (
            <div key={i} className="bg-background border-2 border-border rounded-xl p-8 hover:border-primary transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-drake-gold/10 border border-drake-gold rounded-2xl p-8">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            If that's you, Reset Week is the safest place to begin.
          </p>
        </div>
      </div>

      {/* Section 6: The Bottom Line */}
      <div className="mb-16">
        <h2 className="font-hero text-3xl md:text-4xl font-bold text-foreground mb-6 uppercase">
          The Bottom Line
        </h2>

        <div className="bg-foreground text-white rounded-2xl p-10 mb-8">
          <p className="text-xl leading-relaxed mb-6">
            Pain isn't progress. It's a warning.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            Real strength builds quietly — through controlled movement, smart progression, and intentional recovery.
          </p>
          <p className="text-2xl leading-relaxed font-bold text-drake-gold">
            👉 Strong doesn't have to hurt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Pain-Free Training", sub: "That actually builds strength" },
            { icon: CalendarCheck, title: "Sustainable Progress", sub: "Not short-term burnout" },
            { icon: Heart, title: "Training You'll Love", sub: "Because it works with your body" },
          ].map((item, i) => (
            <div key={i} className="bg-muted p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-br from-primary to-teal-900 text-white rounded-3xl p-10 md:p-12 text-center">
        <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">
          Ready to Train Without the Pain?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-200">
          Reset Week teaches you how to build real strength — without beating up your body in the process.
        </p>
        <Link 
          to="/reset-week"
          className="inline-flex items-center gap-2 px-10 py-5 bg-drake-gold text-foreground font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-xl uppercase tracking-wide"
        >
          <ArrowRight className="w-5 h-5" />
          Start Your Reset Week
        </Link>
        <p className="text-gray-300 mt-6 text-sm">Charleston, SC — Limited Spots Available</p>
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
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          That old knee injury. The shoulder surgery from five years ago. The back that "goes out" sometimes. Can you still train? Absolutely — and here's how we make it work.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <img src={kettlebellFormCheck} alt="Coach helping with form" className="w-full h-auto max-h-96 object-cover" />
      </div>

      {/* Key Message */}
      <div className="bg-primary/10 border-l-4 border-primary p-8 rounded-r-2xl mb-16">
        <h2 className="font-hero text-2xl font-bold text-foreground mb-4 uppercase">
          Injuries Don't Mean You Can't Train
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Most injuries don't prevent all exercise — they prevent certain exercises. The key is knowing which movements are safe and which need modification or avoidance.
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
      <div className="bg-foreground text-white p-10 rounded-2xl">
        <h3 className="font-hero text-2xl font-bold mb-4 uppercase flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-drake-gold" />
          When to Consult a Professional First
        </h3>
        <p className="text-gray-300 leading-relaxed">
          If you're currently in acute pain or have an undiagnosed issue, see a doctor or physical therapist first. We work with healthcare providers, not instead of them.
        </p>
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
      <div className="mb-16">
        <p className="text-xl text-foreground leading-relaxed mb-6 font-medium">
          Before you worry about your squat form or deadlift technique, ask yourself: are you breathing correctly? For most people, the answer is no.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <img src={studioFloorExercise} alt="Floor exercise focusing on breathing" className="w-full h-auto max-h-96 object-cover" />
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
          Charleston has no shortage of gyms. So why would you choose Drake Fitness? Here's an honest comparison.
        </p>
      </div>

      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
        <img src={studioFullView} alt="Drake Fitness studio" className="w-full h-auto max-h-96 object-cover" />
      </div>

      {/* Key Differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: Users,
            title: "Small Class Sizes",
            highlight: "8 People Max",
            desc: "Not 15. Not 20. Eight. This ensures every person gets individual attention during every session.",
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
        <img src={outdoorTraining} alt="Efficient outdoor training" className="w-full h-auto max-h-96 object-cover" />
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
};