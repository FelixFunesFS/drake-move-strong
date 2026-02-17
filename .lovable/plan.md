
# Remove "David and Nick" Paragraph from About Page

## Change

Remove the callout box that reads: "David and Nick work together to create personalized training programs that combine mobility, corrective movement, and functional strength -- meeting you exactly where you are and guiding you toward sustainable results. Start with Reset Week to experience our approach."

## Technical Detail

**File: `src/pages/About.tsx`** (lines 266-270)

Delete the entire `<div>` block containing this paragraph:

```
<div className="bg-white border-l-4 border-primary rounded-lg p-6 shadow-sm mt-6">
  <p className="text-sm md:text-base text-muted-foreground">
    <strong className="text-foreground">David and Nick work together</strong> to create personalized training programs...
  </p>
</div>
```

This sits below the coach profiles section. The information is redundant since the individual coach bios above already communicate the team's approach, and the Reset Week CTA appears elsewhere on the site.
