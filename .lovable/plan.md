

# Improve Mobile Text Readability: Hero Subtitle + Image Overlay Cards

## Problem

Two areas have text that's undersized on mobile screens:

1. **Hero subtitle** starts at `text-sm` (14px) -- too small for a conversion-critical paragraph over a busy hero image
2. **"What Makes Us Different" card descriptions** start at `text-xs` (12px) -- the smallest Tailwind size, hard to read over gradient-darkened images

**Principle**: Text overlaid on images needs to be 1 step larger than the same text on a plain background, because visual noise behind the text reduces perceived contrast and readability.

## Changes

### 1. Hero subtitle -- bump mobile size (`src/components/Hero.tsx`)

**Line 123** -- change `text-sm sm:text-base md:text-lg` to `text-base sm:text-lg md:text-xl`

This moves the mobile floor from 14px to 16px and scales up across breakpoints, making the Reset Week value proposition easier to scan on small screens.

### 2. Image overlay card text -- bump mobile sizes (`src/components/CommunityReasonsSection.tsx`)

**Line 160 (card title)** -- change `text-base sm:text-lg md:text-xl` to `text-lg sm:text-xl md:text-xl`

Bumps the mobile title from 16px to 18px so it reads as a clear heading even at small widths.

**Line 164 (card description)** -- change `text-xs sm:text-sm md:text-base` to `text-sm sm:text-base md:text-base`

Raises the mobile floor from 12px to 14px -- the minimum comfortable reading size for text on image overlays.

## Summary

| Element | Current mobile | Proposed mobile |
|---|---|---|
| Hero subtitle | `text-sm` (14px) | `text-base` (16px) |
| Card title | `text-base` (16px) | `text-lg` (18px) |
| Card description | `text-xs` (12px) | `text-sm` (14px) |

## Files changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 123: bump subtitle responsive sizes up one tier |
| `src/components/CommunityReasonsSection.tsx` | Lines 160, 164: bump card title and description sizes up one tier |
