
# Replace About Hero Video with New YouTube Video

## Overview
Replace the About page hero background video with a new YouTube video (`cHcFBxvLNaQ`) that loops from 24 seconds to 43 seconds.

## Current State

| Element | Current Value |
|---------|---------------|
| Video ID | `RX9zOxhayFk` |
| Start Time | 30 seconds (hardcoded) |
| End Time | 42 seconds (hardcoded) |
| Location | About page hero section |

## Proposed Changes

| Element | New Value |
|---------|-----------|
| Video ID | `cHcFBxvLNaQ` |
| Start Time | 24 seconds |
| End Time | 43 seconds |

## Technical Implementation

### Step 1: Update VideoHero Component Props
Add optional `startTime` and `endTime` props to make the component configurable:

```typescript
interface VideoHeroProps {
  videoId: string;
  startTime?: number;  // NEW - defaults to 30
  endTime?: number;    // NEW - defaults to 42
  // ... existing props
}
```

### Step 2: Update VideoHero Logic
Replace hardcoded values with prop-driven configuration:

| Location | Current | Updated |
|----------|---------|---------|
| `playerVars.start` | `30` | `startTime` prop |
| `seekTo()` calls | `30` | `startTime` prop |
| Time check condition | `>= 42` | `>= endTime` prop |

### Step 3: Update About Page
Update the VideoHero usage on the About page:

```tsx
// BEFORE
<VideoHero 
  videoId="RX9zOxhayFk" 
  fallbackImage={kbCollection}
  ...
/>

// AFTER
<VideoHero 
  videoId="cHcFBxvLNaQ"
  startTime={24}
  endTime={43}
  fallbackImage={kbCollection}
  ...
/>
```

## Files to Modify

| File | Change |
|------|--------|
| `src/components/VideoHero.tsx` | Add `startTime` and `endTime` props with defaults |
| `src/pages/About.tsx` | Update video ID and add timing props |

## Result
The About page hero will display the new video (`cHcFBxvLNaQ`) playing the segment from 24s to 43s on a seamless loop, maintaining the same visual styling and behavior (muted autoplay, scroll-aware pause/resume, HD quality).
