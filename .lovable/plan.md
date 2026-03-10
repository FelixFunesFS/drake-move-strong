

## Add PunchPass Link to Step 1 in How It Works

In `src/pages/services/ResetWeekCharleston.tsx`, the "How It Works" stepper section lists 3 steps. Step 1 ("Claim Your Free Pass") says "Sign up in 30 seconds — no card required" but doesn't link anywhere. Step 2 already has a "View full schedule" link.

**Change**: Add a "Claim your pass" link under Step 1's description (both desktop and mobile versions) that links to `INTRO_URL`, matching the style of Step 2's schedule link.

Both the desktop grid (around line 120) and mobile timeline (around line 145) need the link added to the Step 1 item. The link will use the same `text-accent underline text-sm` styling as the existing "View full schedule" link.

