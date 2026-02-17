

# Move Hero Content Up 10% on Home Page

## Change

In `src/components/Hero.tsx`, reduce the top padding that pushes the content down. Currently the content starts at `pt-[25vh]` on mobile and `pt-[15vh]` on desktop. Subtract roughly 10vh from each.

### Current (line 73)
```
"items-start pt-[25vh] md:items-start md:pt-[15vh]"
```

### Proposed
```
"items-start pt-[15vh] md:items-start md:pt-[5vh]"
```

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 73: change `pt-[25vh]` to `pt-[15vh]` and `md:pt-[15vh]` to `md:pt-[5vh]` |

