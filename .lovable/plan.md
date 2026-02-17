
# Replace Footer Logo with Navigation Logo

## Change

Swap the footer logo from `drake-fitness-logo-kettlebell.png` to `drake-fitness-logo2.png` (the same logo used in the navigation bar).

## Technical Detail

**File: `src/components/Footer.tsx`** (line 3)

Change the import from:
```
import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png";
```
to:
```
import drakeLogo from "@/assets/drake-fitness-logo2.png";
```

No other changes needed -- the variable name (`drakeLogo`) stays the same, so the `<img>` tag continues to work as-is.
