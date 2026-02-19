

# Home Page Cleanup: Trust Nudge, Longevity Clarity, and Button Removal

## Changes Overview

Three targeted edits to the Home page to reduce redundancy and fix a messaging confusion.

---

## 1. Remove Trust Nudge Below Reset Week CTA

**Why:** The Trust Stats bar appears immediately after the Reset Week section, making the inline "25+ years of expert coaching. All ages & levels welcome." text redundant.

**File: `src/pages/Home.tsx`** (lines 110-112)

Delete:
```
<p className="text-xs text-center text-muted-foreground mt-3">
  25+ years of expert coaching. All ages &amp; levels welcome.
</p>
```

---

## 2. Remove "Start Reset Week" Button from Local Trust Block

**Why:** The final CTA section directly below already has a "Start Reset Week" button, making this one redundant next to "Get Directions."

**File: `src/pages/Home.tsx`** (lines 223-225)

Delete:
```
<Button asChild size="lg">
  <a href="...">Start Reset Week</a>
</Button>
```

---

## 3. Reframe the Longevity Block for Clarity

**The problem:** Users see "10+ Years" and assume it means coaching experience (which is already stated as "25+ years" elsewhere). The actual message is about client retention -- people staying with Drake Fitness for over a decade.

**Recommended approach -- reframe the headline to lead with "clients," not "years":**

**File: `src/components/LongevityBlock.tsx`**

Instead of the current layout:
```
10+
Years
Clients training with us for over a decade.
```

Change to:
```
10+ Year
Client Retention
Clients training with us for over a decade.
That doesn't happen from trends or hype...
```

Specific changes:
- Change the large "10+" text to **"10+ Year"** (keep the dramatic sizing)
- Change "Years" label to **"Client Retention"** (immediately clarifies what the number means)
- Keep the two supporting paragraphs as-is -- they reinforce the retention message perfectly once the headline is clear

This keeps the visual impact of the big number while eliminating the confusion. The word "Year" next to "10+" anchors it as a duration qualifier, and "Client Retention" makes the subject unmistakable.

**Why not merge with the final CTA:** The Longevity Block serves as a trust/social-proof moment between the team section and the location block. Merging it into the CTA would lose that emotional pause. The reframe solves the confusion without removing the section.

---

## Summary

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Remove trust nudge text (lines 110-112) |
| `src/pages/Home.tsx` | Remove "Start Reset Week" button from Local Trust Block (lines 223-225) |
| `src/components/LongevityBlock.tsx` | Change "10+" to "10+ Year" and "Years" to "Client Retention" |

