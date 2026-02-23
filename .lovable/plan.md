

# Fix: Remove Confusing mailto Redirect from Contact Form

## Problem

When a visitor submits the contact form, two things happen simultaneously:
1. The form data is saved to the database via the `send-contact-form` edge function (working correctly)
2. The browser tries to open the visitor's email client via a `mailto:` link

This creates a jarring, confusing experience -- the user sees "Thanks for reaching out!" but then their email app pops open asking them to manually send an email they thought was already submitted.

## Root Cause

The `mailto:` redirect (line 54) was likely added as a fallback before the edge function was fully working. Now that the edge function reliably saves to `contact_submissions`, the mailto is redundant.

## Solution

Remove the `mailto:` redirect and update the success flow to clearly confirm the submission was received.

### File: `src/pages/Contact.tsx` (lines 38-64)

**Remove:**
- The `mailto:` URL construction and `window.location.href` redirect (lines 47-54)

**Update:**
- Only show success toast after confirming the edge function succeeded
- If the edge function fails, show an error toast with a fallback suggestion to call directly
- Improve the success message to set clear expectations

```tsx
// Simplified flow:
try {
  const { data, error } = await supabase.functions.invoke('send-contact-form', {
    body: formData
  });

  if (error) throw error;

  toast.success("Message sent! We'll get back to you within 24 hours.");
  setFormData({ firstName: "", lastName: "", ... });
} catch (error) {
  toast.error("Something went wrong. Please try again or call us at (843) 817-5420.");
}
```

## What This Changes

| Aspect | Before | After |
|---|---|---|
| Form submit | Saves to DB + opens email client | Saves to DB only |
| Success feedback | Confusing dual action | Clear confirmation message |
| Error handling | Silently continues to mailto | Shows error with phone fallback |

## Impact

- Visitors get a clean, modern form experience with no unexpected redirects
- All submissions are still saved to `contact_submissions` for David to review
- No changes needed to the edge function -- it already works correctly

**File modified:** `src/pages/Contact.tsx` (handleSubmit function only)
