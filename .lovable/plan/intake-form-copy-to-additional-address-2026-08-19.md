# Intake form: copy to additional address

## Goal
Send a copy of every submitted intake form PDF to `ddrake311@gmail.com` in addition to the existing `david@drake.fitness` studio copy.

## Changes
1. Update `supabase/functions/send-intake-form/index.ts`:
   - Add `ddrake311@gmail.com` as a `cc` recipient on the studio email.
   - Keep the client copy unchanged and best-effort.
2. Update the `/intake` success screen copy to mention that the form was also copied to the additional address.
3. Redeploy the `send-intake-form` Edge Function.

## Outcome
David and `ddrake311@gmail.com` both receive the studio intake email with the signed PDF attached; the client still receives their own copy.