

# Revert Hero Text to Left-Aligned

Undo the previous right-alignment changes and restore left-aligned text on mobile.

## Changes in `src/components/Hero.tsx`

### 1. Content wrapper (line 104)
**Current:** `"text-right md:text-left ml-auto md:ml-0"`
**Restore to:** `"text-left"`

### 2. CTA container (line 131)
**Current:** `"items-end md:items-start"`
**Restore to:** `"items-start"`

This reverts both changes from the last edit, putting all hero text and buttons back to left-aligned on all screen sizes.

