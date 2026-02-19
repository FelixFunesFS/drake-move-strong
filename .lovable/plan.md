

# Fix: Mobile Hero Image Not Updating

## Root Cause

The file at `public/images/hero-mobile.jpg` has failed to update across three separate copy attempts. The old indoor group class photo persists. This is likely a file system caching or overwrite issue with the public directory.

## Solution: Bypass the Problem Entirely

Instead of trying to overwrite the same file again, we will:

1. Save the uploaded image to a **new path** with a unique name to avoid any caching/overwrite conflicts
2. Import it through Vite's asset pipeline (like the desktop image) for reliable cache-busting

### Changes

**Step 1: Copy the uploaded image to a new location**

Copy `user-uploads://IMG_6990-4.jpg` to `src/assets/hero-mobile-new.jpg` (inside `src/assets/`, not `public/`).

**Step 2: Update `src/pages/Home.tsx`**

Replace the static path reference with a Vite-processed import:

```
// Remove this line:
const heroImage1Mobile = "/images/hero-mobile.jpg";

// Add this import near the top with the other image imports:
import heroImage1Mobile from "@/assets/hero-mobile-new.jpg?format=webp&w=768";
```

This approach:
- Uses a brand new filename, eliminating any overwrite issues
- Goes through Vite's image pipeline (format=webp, resized to 768w) for optimization
- Gets automatic cache-busting via content hashing in the built URL
- Matches the pattern already used for the desktop hero image

## Technical Details

| File | Change |
|------|--------|
| `src/assets/hero-mobile-new.jpg` | New file: copy of uploaded image |
| `src/pages/Home.tsx` (line 13) | Change from static path to Vite import |

No changes needed in `Hero.tsx` -- the `srcSet` logic already handles the mobile image correctly.

