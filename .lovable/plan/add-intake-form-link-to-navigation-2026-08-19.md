# Add Intake Form Link to Navigation

## Goal
Surface the `/intake` new-client intake form in the main site navigation so trial and returning visitors can find it.

## Changes
1. Update `src/components/Navigation.tsx`
   - Add an "Intake" (or "New Client Intake") item to the `navLinks` array.
   - Render it in both the desktop horizontal nav and the mobile slide-down menu.
   - Link to `/intake` using the existing React Router `Link` pattern.
2. Keep styling consistent with current nav items (text-foreground / text-primary active state).
3. No backend or routing changes needed; `/intake` already exists.

## Open decision
Label preference: "Intake", "New Client Intake", or "Start Here". Default to "Intake" unless instructed otherwise.
