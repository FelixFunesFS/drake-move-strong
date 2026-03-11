

## Low-Impact Page Refinements

### 1. Reword "Members Who Trained Through Pain"

You're right — "Trained Through Pain" implies pushing through discomfort, which contradicts the entire page philosophy. The testimonials beneath it are about people who *came in with pain* and found a way to *train safely despite it*. Better framing:

**"Members Who Found a Way Back"**

This positions Drake Fitness as the solution for people who thought they couldn't train anymore. It's aspirational and outcome-focused rather than pain-focused. It aligns with the testimonial content (back injury recovery, post-surgery training).

### 2. Remove "Common Issues" section (redundant)

The "Common Issues We Help With" section (lines 267-296) overlaps with "Who This Is For" and interrupts the flow between "Our Approach" and "The Offer." Remove it entirely.

### 3. Swap "Who This Is For" image to group class photo

Replace `davidCoachingForm` import with `community-turkish-getup-class.jpg` — shows real members training together, which is stronger social proof for a section about self-identification.

### 4. Hero clarity — add class format line

Add a line between "Try 3 Classes Free" and the subtitle: **"KB Strong — Coach-led strength & mobility classes in small groups."** This tells the visitor exactly what they're signing up for.

### Changes

**File: `src/pages/services/LowImpactFitnessCharleston.tsx`**
- Line 22: Change import from `david-coaching-form.jpg` to `community-turkish-getup-class.jpg`
- Lines 132-136: Insert class format descriptor line after "Try 3 Classes Free"
- Lines 204-205: Update image alt text to match new group photo
- Lines 267-296: Delete entire "Common Issues" section
- Line 363: Change heading to "Members Who Found a Way Back"

