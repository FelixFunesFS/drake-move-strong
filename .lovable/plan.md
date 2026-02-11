

# Use mailto: for Contact Form Submission

## Overview
Replace the edge function call with a `mailto:` link approach. When the user submits the contact form, it will open their email client with a pre-filled email to `ddrake311@gmail.com` containing all the form details. The database save via the edge function will remain as a backup record.

## Changes

### `src/pages/Contact.tsx` -- Update `handleSubmit`

Modify the form submission handler to:
1. Still save the submission to the database via the edge function (keeps a record of inquiries)
2. After saving, open a `mailto:ddrake311@gmail.com` link with the form data pre-filled in the subject and body
3. Subject line: "New Inquiry from [First] [Last] - [Interest]"
4. Body: formatted with name, email, phone, interest, and message

```typescript
// After successful DB save, open mailto
const subject = encodeURIComponent(
  `New Inquiry from ${formData.firstName} ${formData.lastName}${formData.interest ? ` - ${formData.interest}` : ''}`
);
const body = encodeURIComponent(
  `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nInterest: ${formData.interest || 'Not specified'}\n\nMessage:\n${formData.message}`
);
window.location.href = `mailto:ddrake311@gmail.com?subject=${subject}&body=${body}`;
```

The success toast and form reset will still fire after opening the email client.

### No other file changes needed
- The edge function stays as-is for database recording
- The existing `mailto:ddrake311@gmail.com` link in the contact details card remains unchanged

## Note
The `mailto:` approach requires the visitor to have an email client configured on their device. The form data is also saved to the database as a fallback so no inquiries are lost.

