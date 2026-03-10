

## Audit: "$110 First Month" Clarity Across Pages

### The Problem

The $110 upsell is for the **Longevity Unlimited** plan ($225/mo, 50% off). But most pages just say "first month for $110" without specifying what that includes. A prospect reading "first month for $110" doesn't know if that's 8 classes (Foundation at $200) or unlimited classes (Longevity at $225). The value proposition is lost.

### Current State

| Page | Current Copy | Says "unlimited"? |
|------|-------------|-------------------|
| Home.tsx | "Get your first month for just $110" | No |
| Pricing.tsx | "Get your first month for just $110" | No |
| ResetWeekCharleston.tsx | "Get your first month for just $110" | No |
| ResetWeekAlt.tsx | "Get your first month for just $110" | No |
| Welcome.tsx | "first month of **unlimited classes** for just $110" | Yes |
| Chat assistant | "$110 instead of $225" | Yes (with price anchor) |

Only the Welcome page and chatbot communicate it clearly.

### Recommended Fix

Standardize all instances to mirror the Welcome page pattern — always say **"unlimited classes"** so the value is explicit:

- **Home.tsx (line 134)**: → "Get your first month of **unlimited classes** for just $110 when you join within 7 days of your 3rd class."
- **Pricing.tsx (line 122)**: → Same copy
- **ResetWeekCharleston.tsx (line 325)**: → "Love it? Get your first month of **unlimited classes** for just $110 when you join within 7 days"
- **ResetWeekAlt.tsx (line 130)**: → "Join within 7 days of your 3rd class and get your first month of **unlimited classes** for just $110."

Four files, one word addition each ("of unlimited classes"). No layout or structural changes needed.

