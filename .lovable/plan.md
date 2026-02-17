

# About Page Content Review and Recommendations

## Current Page Structure (top to bottom)

1. VideoHero ("Why We Exist")
2. Philosophy section (2-col with info boxes)
3. David Drake bio (dark section)
4. Nick Poppa bio (gray section)
5. TestimonialHero (review quote)
6. "See It In Action" (2 videos)
7. Values section (3 cards: Community, Safety, Results)
8. PhilosophyQuote (full-width dark block)
9. Studio Gallery (30 images)
10. CTA ("Start Reset Week")

That is **10 sections** on a single page. Here is what I recommend changing and what should stay as-is.

---

## 1. Coach Bios -- Tighten the Copy

### David Drake (lines 212-215)
**Problem**: His bio is a single 80-word paragraph that reads like a resume. On mobile it becomes a wall of text.

**Recommendation**: Split into a punchy lead sentence + a shorter second sentence. Cut the filler.

Current (80 words):
> "David brings more than 25 years of experience helping people move better, eliminate pain, and build strength that supports real life. With formal training in corrective exercise, mobility development, and StrongFirst-style kettlebell methodology, he coaches with the precision of a body mechanic -- someone who understands how the body is designed to move and how to restore that natural function when injuries, stress, or modern habits get in the way. His approach blends skill, science, and practical strength work to create long-term results that keep clients capable, confident, and resilient."

Proposed (~50 words, two paragraphs):
> "David brings **25+ years** of experience helping people **move better**, **eliminate pain**, and **build real-world strength**. Trained in corrective exercise, mobility development, and StrongFirst kettlebell methodology, he coaches like a **body mechanic** -- restoring how your body was designed to move."
>
> "His approach blends skill, science, and practical strength work for results that last."

### Nick Poppa (lines 276-281)
**Problem**: Two paragraphs is fine length-wise, but the first one reads like a medical history list. It buries the value proposition.

**Recommendation**: Lead with what he does for clients, then briefly reference his personal journey.

Current first paragraph:
> "Originally from Long Island, Nick's own journey through football injuries, a torn labrum, concussions, chronic back pain, and gut issues led him to discover a deeper world of human movement, lifestyle balance, and functional wellness."

Proposed:
> "Nick specializes in bridging the gap between **rehabilitation and performance** -- helping clients improve posture, stability, and functional strength through corrective exercise and holistic coaching."
>
> "His own journey through sports injuries and chronic pain gave him firsthand understanding of what it takes to rebuild from the ground up."

This puts the client benefit first and the backstory second.

---

## 2. Studio Gallery -- Too Many Images

**Problem**: The gallery currently has **30 images**. That is excessive -- it slows page load, overwhelms the viewer, and dilutes impact. Most visitors will not scroll through all 30.

**Recommendation**: Trim to **12-16 of the strongest, most diverse images**. Keep a good mix of:
- Studio interior (2-3)
- Group training action (3-4)
- Coach portraits/coaching moments (3-4)
- Community/outdoor (2-3)
- Equipment/atmosphere (1-2)

Remove duplicates and similar compositions (e.g., multiple kettlebell close-ups, multiple dog photos, multiple overhead press shots).

---

## 3. Values Section -- Potentially Redundant

**Problem**: The 3 Values cards (Community, Safety, Results) repeat themes already covered in the Philosophy section and coach bios above. Visitors have already read about mobility-first training, community, and safe coaching by this point.

**Recommendation**: Keep it but move it higher -- swap positions with the "See It In Action" videos. Videos work better as a late-page element (visitors who scroll that far are engaged enough to watch). Values work better as a quick visual break between the coach bios and videos.

---

## 4. PhilosophyQuote Block -- Consider Removing

**Problem**: This is a full-width dark quote section that sits between the Values cards and the Studio Gallery. It is essentially a third "quote moment" on the page (after the accented subtitle in the hero and the TestimonialHero). Three quotes on one page dilutes impact.

**Recommendation**: Remove the PhilosophyQuote block entirely. The TestimonialHero already provides a powerful quote break. The page flows better going straight from Values into the Studio Gallery.

---

## 5. Leave As-Is (No Changes Needed)

- **VideoHero**: Good with the new CTAs
- **Philosophy section**: Clean 2-column layout, scannable info boxes
- **TestimonialHero**: Strong social proof break between coaches and videos
- **CTA Section**: Clear conversion point at the bottom

---

## Summary of Changes

| Section | Action |
|---|---|
| David bio | Tighten from ~80 to ~50 words, split into 2 short paragraphs |
| Nick bio | Reorder: lead with client value, backstory second |
| Values section | Move above "See It In Action" videos |
| PhilosophyQuote | Remove (redundant third quote) |
| Studio Gallery | Trim from 30 to ~14 images |

### Files Changed
- `src/pages/About.tsx` -- all changes are in this single file

