

# KB Strong Positioning + Coach Accuracy Audit

## Strategic Analysis

### Problem 1: Misty is misattributed
Misty teaches **Yoga & Mobility** only. But several pages blur the line:
- **Schedule FAQ** (line 47): "personalized coaching and form correction from David or Misty" — implies Misty coaches KB classes
- **Low Impact Fitness page**: Uses Misty's photo in the "Our Approach" section alongside low-impact strength content (controlled movements, gradual progression) — fine for yoga/mobility context, but the page never clarifies she teaches yoga specifically
- **Home page**: Coach card correctly says "Yoga & Mobility Coach" — no issue here
- **About page**: Correctly scoped — no issue

### Problem 2: "For beginners" alienates experienced prospects
Current cold traffic copy says "Strength & mobility training **for beginners**" — this actively repels:
- Experienced lifters looking for a new gym
- CrossFit refugees wanting smarter training
- Former athletes returning to fitness
- Anyone who doesn't self-identify as a "beginner"

**The Charleston market insight:** West Ashley/Avondale skews 30-55, professional, active-lifestyle. Many have *some* gym experience but feel stuck or banged up. They're not beginners — they're **undertrained or mis-trained**. Calling them beginners is a turn-off.

### The Better Framework: "We Meet You Where You Are"

Instead of "for beginners," position KB Strong as:
> **"Scaled to your level — whether you're starting fresh or 10 years in."**

This is the inclusive, Charleston-friendly framing:
- Beginners hear: "I won't be left behind"
- Experienced people hear: "I'll still be challenged"
- Injured/returning people hear: "They'll adapt for me"

## Proposed Changes

### A. ResetWeekCharleston.tsx (primary landing page)
- **Hero subtitle**: "Strength & mobility training for beginners" → **"Strength & mobility training — scaled to your level. No card required. Just show up."**
- **SEO meta**: Match the new subtitle
- **"Beginners & restarters welcome"** tag → **"All levels welcome · West Ashley"**
- **"Complete beginners"** in whoItsFor list → **"New to strength training"**

### B. Home.tsx
- **"How It Works" step 2**: Already says "Strength & Mobility class (KB Strong)" — good. No change needed.
- **Intro section "who we help" list**: Currently targets beginners well but doesn't exclude experienced. Leave as-is — the pain points (stiff, achy, desk workers) are universal.

### C. Schedule.tsx
- **FAQ answer** (line 47): "from David or Misty" → **"from David and our coaching team"** (accurate — Misty teaches yoga, not KB Strong)
- **KB Strong description** (line 108): "Our core kettlebell strength program." → **"Kettlebell strength & mobility — scaled for all levels."**

### D. FAQ.tsx
- **"Do I need experience?"** answer: Add "KB Strong classes are coached and scaled to every level — beginners get guided instruction, experienced athletes get challenged."
- **Class types answer**: Already updated. No change needed.

### E. Pricing.tsx
- **FAQ "Do I need experience?"**: Same update as FAQ.tsx
- **Foundation card** (line 166): "Ideal for beginners & restarters" → **"Ideal for getting started or flexible schedules"**

### F. Contact.tsx
- **FAQ "Do I need experience?"**: Same update pattern

### G. Welcome.tsx (post-purchase onboarding)
- **Step 1**: "Pick a KB Strong Class" → **"Pick a Strength & Mobility Class (KB Strong)"** (Tier 1 format — they just bought, still learning the name)
- **"all intro classes are KB Strong"** → **"All intro classes are Strength & Mobility (KB Strong)"**
- **Section title**: "Available KB Strong Classes" → **"Available Strength & Mobility Classes"**

### H. data/pricing.ts
- **Foundation description**: "perfect for beginners" → **"perfect for getting started or flexible schedules"**

### I. StrengthTrainingCharleston.tsx
- **Hero badge** (line 133): "Beginner-Friendly" → **"All Levels Welcome"**
- No other changes needed — the pain-point copy is universal and works for all levels

### J. LowImpactFitnessCharleston.tsx
- No Misty attribution issue — photo is contextually appropriate for mobility/yoga content
- No "beginner" language to fix

### Summary: 10 files, ~15 edits

The strategic shift: **"for beginners" → "scaled to your level / all levels"** across all cold and mid-funnel pages. This widens the funnel without losing the safety messaging that attracts cautious prospects.

