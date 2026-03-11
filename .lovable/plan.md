

## Condense Misty's Bio Section

**Problem**: Four paragraphs of bio text — too much real estate for a partner coach (not even a staff coach).

**Solution**: Merge into two short paragraphs. Cut the SUP backstory detail and the "expect a strong flow" paragraph. Keep what matters to the reader: her credentials, what her classes focus on, and the member discount.

### Change

**File:** `src/pages/About.tsx` — lines 257-269

Replace the 4-paragraph `div.space-y-4` content with 2 concise paragraphs:

**Paragraph 1** (credentials + class focus):
> A 500-hour certified yoga teacher at Satsang Yoga Charleston, Misty brings over a decade of movement coaching experience. Her classes focus on **strength, mobility, and breath** — helping students move well in and out of the gym.

**Paragraph 2** (community tie-in + discount):
> As a Drake Fitness member herself, Misty is passionate about how yoga supports **performance, recovery, and longevity**. Drake members receive a discount on her classes.

This cuts from ~80 words × 4 paragraphs to ~60 words × 2 paragraphs — roughly 50% reduction. No structural or layout changes needed.

