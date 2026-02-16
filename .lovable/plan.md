
# Home Page Reorder + Schedule Page Cleanup + Email Update

## 1. Reorder Home Page Sections

Current order (after Hero):
1. Brand Values Marquee
2. Today's Classes Banner
3. WHO WE ARE
4. Trust Stats
5. Testimonial Quote
6. Community + 5 Reasons
7. **START HERE**
8. **THE METHOD**
9. OUR PROGRAMS
10. **MEET THE TEAM**
11. RESULTS
12. Longevity Block
13. Local Trust Block
14. Final CTA

New order (after Hero):
1. Brand Values Marquee
2. Today's Classes Banner
3. **START HERE** (moved up)
4. **THE METHOD** (moved up)
5. Trust Stats
6. Testimonial Quote
7. Community + 5 Reasons
8. **WHO WE ARE** (moved before Meet the Team)
9. **MEET THE TEAM**
10. OUR PROGRAMS
11. RESULTS
12. Longevity Block
13. Local Trust Block
14. Final CTA

### File: `src/pages/Home.tsx`
- Move the "START HERE" section (lines 133-163) to directly after TodayClassesBanner (after line 78)
- Move the "THE METHOD" section (lines 165-228) to directly after START HERE
- Move the "WHO WE ARE" section (lines 80-110) to directly before "MEET THE TEAM" (before line 280)
- Keep Trust Stats, Testimonial, and Community Reasons in their current relative order between METHOD and WHO WE ARE

## 2. Replace Schedule Page "Our Programs" with Home Page Version

The Schedule page currently has a detailed card-based "Our Programs" grid with images, badges, and descriptions (lines 141-243). Replace it with the simpler, more compact version from the Home page -- dark background with gold class names and short descriptions in a 3-column grid.

### File: `src/pages/Schedule.tsx`
- Replace the entire "Class Types Grid" section (lines 141-243, including the comparison table) with the Home page's OUR PROGRAMS section style (dark bg, simple cards, no images)
- Remove unused imports: `Badge`, `motion`, `ComparisonTable` and related components, and the 3 class images (`membersOverheadLungeNaturalLight`, `membersDoubleKettlebellRack`, `groupPlankRowsKettlebells`)
- Remove the `classTypes` array definition (lines 44-90) since it's no longer used

## 3. Remove Schedule Page Sections

### File: `src/pages/Schedule.tsx`
Remove these three sections entirely:
- **Quick Class Comparison table** (lines 187-240) -- already removed as part of step 2
- **Class Level Guide** section (lines 245-265)
- **"Not Sure Which Class is Right For You?"** section (lines 311-352)

## 4. Update All Emails to david@drake.fitness

Replace every instance of `ddrake311@gmail.com` with `david@drake.fitness` across these files:

| File | Occurrences |
|---|---|
| `src/components/Footer.tsx` | 2 (mailto + display text) |
| `src/components/StructuredData.tsx` | 1 (structured data JSON) |
| `src/pages/Contact.tsx` | 3 (mailto link + display text + form mailto) |
| `src/pages/Privacy.tsx` | 1 (mailto + text) |
| `src/pages/Terms.tsx` | 1 (mailto + text) |
| `src/pages/services/MobilityFitnessAvondale.tsx` | 3 (contact info + mailto + display) |
| `supabase/functions/chat-assistant/index.ts` | 1 (AI system prompt) |
| `supabase/functions/send-contact-form/index.ts` | 1 (comment reference) |

Also update the database chatbot knowledge base entries (2 occurrences in migrations) -- these will need a new migration to update the existing rows.

## Technical Notes

- No new dependencies or components are needed
- The Schedule page will become significantly shorter and more focused on booking (schedule grid at top, compact programs overview, videos, gallery, FAQ, CTA)
- The Home page section reorder is purely moving existing JSX blocks -- no content changes
- The edge functions `chat-assistant` and `send-contact-form` will need redeployment after email updates
- A database migration will update the chatbot knowledge base rows that reference the old email

## Files Changed
- `src/pages/Home.tsx` -- section reorder
- `src/pages/Schedule.tsx` -- replace programs section, remove 3 sections
- `src/components/Footer.tsx` -- email update
- `src/components/StructuredData.tsx` -- email update
- `src/pages/Contact.tsx` -- email update
- `src/pages/Privacy.tsx` -- email update
- `src/pages/Terms.tsx` -- email update
- `src/pages/services/MobilityFitnessAvondale.tsx` -- email update
- `supabase/functions/chat-assistant/index.ts` -- email update
- `supabase/functions/send-contact-form/index.ts` -- email update
- New database migration -- update chatbot knowledge base email references
