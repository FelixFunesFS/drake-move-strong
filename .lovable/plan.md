

# Add "Pressing Reset" Mobility Warm-Up Video

## Overview
Add a dedicated video section featuring the "Pressing Reset" mobility warm-up (inspired by Original Strength) with brand-aligned messaging that emphasizes David's approach to starting every training session with mobility work.

## Video Details
- **YouTube URL**: `https://youtu.be/Vb91A46rLr8?si=OGqXuPl0ranAL-Rv`
- **Extracted Video ID**: `Vb91A46rLr8`
- **Title**: "Pressing Reset" Mobility Warm-Up

---

## Placement Options (Recommendation: About Page)

Based on the existing site structure, there are three strategic locations:

| Location | Pros | Cons |
|----------|------|------|
| **About Page** (after "Coaching Philosophy" video) | Expands the coaching methodology showcase; creates a "video duo" | May lengthen page |
| **Schedule Page** (in "Training Videos" section) | Shows how sessions begin; practical context | Already has 2 videos |
| **Reset Week Page** (new section) | Thematically aligned with "reset" concept | SEO page, less about methodology |

**Recommendation**: **About Page** — Add as a second video in the "See It In Action" section, creating a 2-column grid that showcases both the coaching philosophy and the mobility warm-up method.

---

## Design Approach

Transform the existing single-video section into a 2-video grid with individual titles and descriptions:

```text
┌─────────────────────────────────────────────────────────────┐
│         SEE IT IN ACTION                                    │
│    Our Training Approach in Action                          │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │                     │  │                     │          │
│  │   [Coaching         │  │   [Pressing Reset   │          │
│  │    Philosophy       │  │    Video]           │          │
│  │    Video]           │  │                     │          │
│  │                     │  │                     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│   Our Coaching           Pressing Reset                     │
│   Philosophy             The Method                         │
│   "Watch how we help     "Every session begins              │
│    clients move better"   with this..."                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Brand-Aligned Messaging

### Video Title
**"Pressing Reset"** — The Method

### Video Description
*"I start every training session with this mobility warm-up inspired by Original Strength. It helps reset your nervous system and prepare your body for movement."*

### Supporting Copy (for the section)
- **Eyebrow**: `SEE IT IN ACTION`
- **Section Title**: `Our Training Approach in Action`
- **Section Subtitle**: `Watch how we warm up the body, coach movement, and build strength`

---

## Technical Implementation

### File: `src/pages/About.tsx`

**Current structure** (lines 331-347):
```tsx
<section className="py-16 md:py-24 bg-drake-dark section-slant-top">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <p className="section-eyebrow text-drake-gold text-center">SEE IT IN ACTION</p>
      <h2 className="...">Our <span className="text-primary">Coaching Philosophy</span></h2>
      <p className="text-xl text-center text-gray-300 mb-12">Watch how we help clients move better</p>
      <YouTubeEmbed videoId="wDtDMNnrF00" title="Drake Fitness Coaching Philosophy" />
    </div>
  </div>
</section>
```

**New structure**:
```tsx
<section className="py-16 md:py-24 bg-drake-dark section-slant-top">
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto">
      <p className="section-eyebrow text-drake-gold text-center">SEE IT IN ACTION</p>
      <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase text-white">
        Our Training <span className="text-primary">Approach in Action</span>
      </h2>
      <p className="text-xl text-center text-gray-300 mb-12">
        Watch how we warm up the body, coach movement, and build strength
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video 1: Coaching Philosophy */}
        <div>
          <YouTubeEmbed videoId="wDtDMNnrF00" title="Drake Fitness Coaching Philosophy" />
          <h3 className="font-hero text-xl font-bold mt-4 text-white uppercase">
            Our Coaching Philosophy
          </h3>
          <p className="text-gray-400 mt-2">
            Watch how we help clients move better and build sustainable strength.
          </p>
        </div>
        
        {/* Video 2: Pressing Reset */}
        <div>
          <YouTubeEmbed videoId="Vb91A46rLr8" title="Pressing Reset Mobility Warm-Up" />
          <h3 className="font-hero text-xl font-bold mt-4 text-white uppercase">
            Pressing Reset — <span className="text-primary">The Method</span>
          </h3>
          <p className="text-gray-400 mt-2">
            I start every training session with this mobility warm-up inspired by Original Strength. 
            It helps reset your nervous system and prepare your body for movement.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Responsive Behavior

| Screen Size | Layout |
|-------------|--------|
| Mobile (<768px) | Single column, videos stacked |
| Tablet/Desktop (≥768px) | 2-column grid side by side |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/About.tsx` | Update "See It In Action" section with 2-video grid |

---

## Summary

This approach:
1. Expands the existing video section rather than creating a new one
2. Uses brand-aligned messaging connecting to David's "mobility-first" philosophy  
3. Keeps the page flow logical: Philosophy → Coaches → Videos → Values
4. Creates a visually balanced 2-column layout
5. Uses descriptive copy that connects "Pressing Reset" to the Original Strength methodology

