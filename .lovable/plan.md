
# Replace TrustStatsBar Background with Brand-Aligned Design

## Current State

The 4-stat section (Sessions, Charlestonians, Experience, Rating) currently has a simple gray background:
- `bg-muted/30` - a light gray tinted background
- No visual interest or brand connection

## Proposed Design

Replace with a Drake Fitness branded background using the signature **teal color** with subtle depth elements:

| Element | Current | Proposed |
|---------|---------|----------|
| **Background** | `bg-muted/30` | Dark teal gradient with subtle texture |
| **Text Colors** | Dark on light | White/light on dark for contrast |
| **Visual Depth** | Flat | Gradient overlay with gold accent borders |

## Technical Implementation

**File:** `src/components/TrustStatsBar.tsx`

### Changes to Horizontal Variant (lines 224-275):

1. **Update wrapper styling** - Add brand teal background with gradient overlay
2. **Update text colors** - Switch to white/light text for contrast on dark background
3. **Add decorative elements** - Subtle gold accent borders top/bottom
4. **Adjust icon backgrounds** - Lighter versions that pop on dark background

```tsx
// Horizontal variant wrapper changes:
<div 
  ref={ref}
  className={cn(
    "py-8 md:py-12 relative overflow-hidden",
    className
  )}
>
  {/* Brand teal background with gradient */}
  <div className="absolute inset-0 bg-drake-teal" />
  <div className="absolute inset-0 bg-gradient-to-br from-drake-teal via-drake-teal/95 to-drake-dark/80" />
  
  {/* Subtle gold accent borders */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-drake-gold/50 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-drake-gold/50 to-transparent" />
  
  {/* Content with updated colors */}
  <div className="container mx-auto px-4 relative z-10">
    ...
    {/* Value text: text-white */}
    {/* Label text: text-white/90 */}
    {/* Sublabel text: text-white/70 */}
    {/* Icon backgrounds: Semi-transparent white for pop */}
  </div>
</div>
```

### Updated Color Scheme for Dark Background

| Element | Before | After |
|---------|--------|-------|
| Value number | `text-foreground` | `text-white` |
| Label text | `text-foreground` | `text-white/90` |
| Sublabel text | `text-muted-foreground` | `text-white/70` |
| Icon circles | Colored backgrounds | `bg-white/20` with lighter icon colors |

## Visual Result

```text
┌─────────────────────────────────────────────────────────────┐
│ ═══════════════ subtle gold top border ═══════════════════ │
│                                                             │
│   ████████████████████████████████████████████████████████  │
│   ████   TEAL GRADIENT BACKGROUND   ██████████████████████  │
│   ████████████████████████████████████████████████████████  │
│                                                             │
│     🏋️            👥            📅            ⭐            │
│    10,000+       500+          25+           5.0            │
│   Sessions   Charlestonians  Years Exp   Google Rating      │
│                                                             │
│ ═══════════════ subtle gold bottom border ════════════════ │
└─────────────────────────────────────────────────────────────┘
```

## Summary

- Deep brand teal background with subtle gradient depth
- White text for high contrast and readability
- Gold accent borders for brand consistency
- Icon circles get semi-transparent white backgrounds to pop
- Maintains all existing animations and count-up functionality
- Only affects the horizontal variant (the one used on the Home page)
