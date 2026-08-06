# Drake Fitness Client Intake Form

Rebuild the uploaded single-file intake form as a native, on-brand page at `/intake` — public (no login), submissions delivered to David as email + PDF, nothing stored in the database.

## What gets built

**1. Public intake page — `/intake`**
- Multi-step wizard (7 steps): Contact → Medical history → Injuries & therapies → Nutrition & habits → Lifestyle & fitness → Goals → Agreement & waiver.
- Sticky progress bar with "Step 3 of 7" and percentage, same as the uploaded form.
- All conditional logic preserved: female-only questions appear only when Sex = Female; "Yes" answers reveal their detail field; the "exercised in the past" question appears only when currently not exercising.
- Per-step validation — the user can't advance with a required field blank; the first invalid field is focused and announced.
- Review-free flow ending in the two legal documents (Client Agreement + Liability Waiver) with typed name, date, and a drawn signature.
- Page is `noindex` (it's a private form, not an SEO page) and excluded from the sitemap.

**2. Brand + accessibility treatment**
- Rebuilt with the project's shadcn components (Input, Textarea, RadioGroup, Checkbox, Select, Button, Card) and Drake tokens — Oswald headings, Montserrat/Inter body, teal/gold accents — replacing the uploaded red/gray palette.
- Reuses the existing `SignaturePad` component already used for member contracts (Fabric canvas, touch-friendly, clear/undo), sized responsively instead of a fixed 500px.
- Mobile-first: single-column below `md`, two-up for City/State/ZIP on larger screens, 16px input font (prevents iOS zoom), 44px minimum tap targets, `h-dvh`-safe sticky footer nav with Back/Next, safe-area padding for notched phones.
- Accessibility: every field has a real `<label>`, radio/checkbox groups use fieldset + legend, error messages tied via `aria-describedby`, step changes announced through an `aria-live` region, 1–10 scale rendered as an accessible radio group (not a bare slider), full keyboard path end to end, one `<main>`.

**3. Submission — email + PDF, no storage**
- On submit, the browser generates a clean multi-page PDF of all answers plus the signature image and legal text.
- The PDF (base64) is posted to a new `send-intake-form` edge function, which emails it as an attachment to `david@drake.fitness` with the client's name/phone/email in the body, and sends the client a copy of their own submission.
- The client also gets an immediate "Download your copy" button on the confirmation screen, so the PDF is never lost even if email fails.
- No `intake_submissions` table, no admin list view — nothing is written to the database, matching your choice.

## Technical notes

- New files: `src/pages/Intake.tsx`, `src/components/intake/` (step renderer, field components, schema), `src/lib/intakePdf.ts`, `supabase/functions/send-intake-form/index.ts`.
- The question schema from the uploaded HTML is ported verbatim into a typed TS file, so wording changes later are a one-line edit.
- Validation with `zod` (already in the project) — client-side, plus a required-field and email/phone shape check in the edge function before it sends.
- PDF built with `jspdf` (added as a dependency) rather than the CDN script the upload used, so it's bundled and works offline/CSP-safe.
- Email goes through the existing Resend connector used by the win-back sequence.
- Route added to `App.tsx` in the public group, outside `ProtectedRoute`.

## One thing to be aware of

Sending from `david@drake.fitness` requires the `drake.fitness` domain to be verified in Resend — the same blocker hit during the win-back preview sends. Until that's verified, David's copy will deliver but the client-copy email to outside addresses will fail. The download button means no submission is ever lost regardless.
