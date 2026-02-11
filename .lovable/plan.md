

# Update Mobile Contact Bar: Replace "Call Now" with "View Schedule"

## Current State
The `MobileContactBar` component at the bottom of mobile screens has two buttons:
- **Call Now** (links to `tel:8438175420`)
- **Text Us** (links to `sms:8438175420`)

## Change
Replace the "Call Now" button with a "View Schedule" button that navigates to `/schedule`.

### `src/components/MobileContactBar.tsx`
- Replace the `Phone` icon import with `Calendar` from lucide-react
- Change the first button from an `<a href="tel:...">` to a React Router `<Link to="/schedule">`
- Update label from "Call Now" to "View Schedule"
- Import `Link` from `react-router-dom`

The "Text Us" button remains unchanged.

