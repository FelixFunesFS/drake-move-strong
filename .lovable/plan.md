

# Add "The Power of Pressing Reset" Blog Post

## Overview

Add a new blog post (id: "11") to the insights data file with the provided content and embedded YouTube video.

## File Change

### `src/data/insights.ts`

Append a new entry to the `insightPosts` array after the existing post #10 (line 583):

**Post metadata:**
- **id**: `"11"`
- **slug**: `"the-power-of-pressing-reset"`
- **title**: `The Power of "Pressing Reset" at Drake Fitness`
- **seoTitle**: `The Power of Pressing Reset: Mobility Warm-Up Guide (2025)`
- **excerpt**: `How our signature warm-up circuit activates your nervous system and prepares your body to train with purpose.`
- **videoId**: `"Vb91A46rLr8"` (the YouTube video will auto-embed above the content)
- **category**: `education`
- **author**: `david`
- **publishedAt**: `2025-05-15`
- **readTime**: `5`
- **thumbnail**: `studioFloorExercise` (already imported)
- **featured**: `true`
- **tags**: `['mobility', 'warm-up', 'pressing reset', 'nervous system', 'spine health']`

**HTML content** will include the full article text structured with:
- Lead paragraph introducing the three pillars
- H2 sections: "Warming Up the Spine and Neck", "Activating the Mind-Body Connection", "Finishing with Dynamic Movement"
- Bullet lists for the exercises in the mind-body section
- Closing paragraph about readiness to train

The existing `InsightPost.tsx` page will automatically render the YouTube video embed above the HTML content since `videoId` is provided.

## Technical Details

- No new files or components needed
- No new image imports needed (`studioFloorExercise` is already imported at line 5)
- The `InsightPost.tsx` rendering pipeline handles `videoId` + HTML content automatically
- The `friendlyLabels` in `ChatMessage.tsx` already cover any Reset Week links if referenced

