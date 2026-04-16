

## Re-aligning the win-back plan to your actual list

### What you're telling me
- The CSV has **67 rows with real data**, not 281
- My earlier read of "281 rows" likely included blank/spacer rows, header artifacts, or a system export footer
- You want to know: **what is the previous tool actually counting, and is anything else being included that shouldn't be?**

### Likely sources of the 281 vs. 67 gap
1. **Empty rows** — PunchPass/Google Contacts exports often pad with hundreds of blank rows
2. **Rows with only a phone number** (no email) — useless for an email campaign
3. **Rows tagged `Current clients` / `KB Strong Membership`** — active members, must be excluded
4. **Rows with `Email Marketing Permission: false` or `Do Not Email: true`** — legally excluded
5. **Duplicate emails** across `E-mail Address`, `E-mail 2`, `E-mail 3` columns
6. **Non-contact rows** — e.g. business contacts, vendors, family members mixed into the export

### What I'll do (once approved → default mode)

**Step 1 — Audit script (read-only, ~1 min)**
Run a Python audit on `/tmp/contacts.csv` that prints a clear breakdown:
```
Total rows in file:          XXX
  - Completely empty rows:   XXX
  - Rows with no email:      XXX
  - Rows with email:         XXX
    - Tagged "Current":      XXX  (excluded)
    - Marketing opt-out:     XXX  (excluded)
    - Duplicates:            XXX  (deduped)
    - ✅ Eligible for winback: XXX
```
This confirms whether your "67 with data" matches what I count, and tells us exactly how many people the campaign actually reaches.

**Step 2 — Segment the eligible list**
Bucket the eligible contacts by recency of last attendance:
- **Hot** (visited in last 12 mo)
- **Warm** (1–3 yrs ago)
- **Cold** (3+ yrs or unknown)

**Step 3 — Output cleaned CSV**
Save `/mnt/documents/winback-list-cleaned.csv` with: `email, first_name, last_name, last_attendance, attendances_count, segment` — ready to upload to Resend Audiences.

**Step 4 — Show you the audit summary in chat**
You'll see exactly how many people are in each bucket before we move on to template updates and the landing page.

### Revised conversion expectation
- If true eligible list is ~50–60 people, **10% = 5–6 conversions** is still realistic
- If it's smaller (e.g. 30), you'll want to combine with paid retargeting or SMS to hit a meaningful number

### Recommendation
Approve this and I'll run the audit first — no template or page changes yet. Once we know the real eligible count, we'll decide whether to proceed with the full 5-email sequence or a tighter 2–3 email blast (better fit for a small warm list).

