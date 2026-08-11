# Intake Form Edge-Case Hardening

Audit the current `/intake` wizard and fix the edge cases most likely to break real submissions or degrade the user experience.

## Goals
- Prevent failed submissions caused by validation gaps, oversized payloads, or environment quirks.
- Improve mobile accessibility and recovery from errors.
- Keep the form email/PDF-only (no backend storage) per the prior decision.

## Proposed changes

### 1. Validation hardening
- Add future-date guard to `dob`.
- Restrict `state` to a two-letter state code (or validated name) and `zip` to a 5-digit / ZIP+4 pattern.
- Tighten `tel` regex so it accepts common formats but rejects clearly invalid strings.
- Validate `email` with the same Zod schema on the Edge Function that the UI uses.
- Require detail fields for `yn` groups (e.g., `otherIll`, `rx`) when the answer is "Yes".

### 2. Signature reliability
- Add a minimum-stroke guard so an accidental tap cannot satisfy the required signature.
- Ensure the Fabric canvas re-initializes correctly on orientation change / resize without losing the drawn signature.
- Test touch drawing on iOS Safari (Fabric `PencilBrush` + touch events).
- Compress the signature PNG before embedding it in the PDF to avoid oversized payloads.

### 3. PDF generation resilience
- Handle long text answers with `splitTextToSize` and page-break checks so paragraphs do not overflow.
- Confirm legal/waiver blocks do not get clipped across pages.
- Sanitize answers before PDF output to avoid malformed content breaking `jsPDF`.
- Cap generated PDF / base64 size and surface a clear error if it exceeds the Edge Function limit.

### 4. Submission robustness
- Disable the submit button after first click to prevent duplicate sends.
- Add a client-side retry with exponential backoff for network failures.
- Improve error messaging when the Edge Function returns 500/timeout.
- Surface a clear "download your copy" path whenever email delivery fails.

### 5. Accessibility & UX
- Announce step changes to screen readers with a polite live region.
- Preserve form progress across accidental refresh using `sessionStorage` (cleared on completion).
- Scroll the first invalid field into view and move focus to it.
- Ensure the sticky progress bar and sticky footer do not obscure inputs on small screens.
- Add visible "required" indicators and group-field legends.

### 6. Security & abuse
- Add a hidden honeypot field to the first step.
- Add a simple rate-limit token per IP/session on the Edge Function (in-memory, sufficient for a low-volume form).
- Validate `pdfBase64` is a valid data-URI-shaped string before passing to Resend.

## Out of scope
- Backend persistence of intake responses.
- SMS notifications or webhooks.

## Acceptance criteria
- All 7 steps submit successfully on desktop and mobile.
- A signature with fewer than 3 strokes is rejected as incomplete.
- Refreshing the page mid-wizard restores progress; completing it clears the saved progress.
- Submitting with an invalid email, future DOB, or bad ZIP shows a field-level error.
- A 500 from the Edge Function shows a human-readable message and the download button.
