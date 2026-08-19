# Intake Form Edge-Case Hardening

Audit the current `/intake` wizard and fix the edge cases most likely to break real submissions or degrade the user experience.

## Goals
- Prevent failed submissions caused by validation gaps, oversized payloads, or environment quirks.
- Improve mobile accessibility and recovery from errors.
- Keep the form email/PDF-only (no backend storage) per the prior decision.

## Email delivery — resolved approach

Emailing is already wired up (the `/intake` page builds the PDF in the browser and posts it to a backend function that sends it through Resend). Two things are wrong today, both in the send function's addresses:

- It sends from Resend's shared test address, which only delivers to the Resend account owner — every other recipient is rejected with a 403, so the client's copy never arrives.
- It sends the studio copy to `ddrake311@gmail.com`, which is not the account owner address, so that copy is being rejected too.

The fix is straightforward because `drake.fitness` is already a verified sending domain in the Resend account (sending enabled). Nothing needs to be set up or verified.

### Changes
1. Send from a real Drake address on the verified domain: `Drake Fitness <intake@drake.fitness>`. This removes the test-address restriction, so both David and the client receive their copies with the PDF attached.
2. Change the studio recipient from `ddrake311@gmail.com` to `david@drake.fitness`.
3. Keep reply-to behavior sensible: David's copy replies to the client, the client's copy replies to `david@drake.fitness`.
4. Treat the client copy as best-effort — if it fails, log it, still return success for the studio copy, and have the confirmation screen point the client at the download button.
5. Keep the "Download my copy" button on the confirmation screen as a permanent safety net.

Notes: no DNS work is needed, and this does not conflict with Lovable's built-in email, which uses the separate `notify.www.drake.fitness` subdomain. `mailto:` is not an option here — browsers ignore attachment parameters, so it cannot carry a generated PDF.

4. Keep the "Download my copy" button as the permanent safety net either way.


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
