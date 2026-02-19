

# Fix: Replace Mobile Hero Image with Uploaded Photo

## What Went Wrong

The `public/images/hero-mobile.jpg` file already existed with an old group class photo. When the copy was attempted, the old file content was not properly replaced. The code change (pointing to `/images/hero-mobile.jpg`) was correct, but the actual image file still contains the old photo.

## Fix

**File: `public/images/hero-mobile.jpg`**

Re-copy the uploaded image (`user-uploads://IMG_6990-3.jpg`) to `public/images/hero-mobile.jpg`, ensuring it overwrites the existing file with the correct photo.

That is the only change needed -- the code in `Home.tsx` and `Hero.tsx` is already wired up correctly.

