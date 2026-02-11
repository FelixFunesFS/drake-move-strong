

# SEO Meta Tag Optimization for Zero-Click Queries

## Goal
Improve click-through rates on queries that have impressions but zero or low clicks by rewriting meta titles and descriptions to better match searcher intent.

## Target Queries and Page Mapping

| Query | Impressions | Clicks | Target Page | Issue |
|-------|------------|--------|-------------|-------|
| gyms near me (27) | 27 | 0 | Home | Title says "Mobility Training" -- searchers expect "gym" |
| group fitness classes near me (12) | 12 | 0 | Schedule | Title doesn't mention "group fitness classes" |
| workout classes near me (7) | 7 | 1 | Schedule | Same -- missing "workout classes" keyword |
| charleston personal trainer (7) | 7 | 1 | Coaching | Title says "1:1 Personal Training" but not "Personal Trainer" |
| drake gym (34) | 34 | 0 | Home | "Gym" not in title or description |

## Changes

### 1. `src/pages/Home.tsx` -- SEO tag
**Current:**
- Title: `Charleston Mobility Training 2026 | Proven Results | Drake`
- Description: `Expert-led functional strength and mobility training in Charleston, SC...`

**Proposed:**
- Title: `Drake Fitness Charleston | Gym & Mobility Training | Proven Results`
- Description: `Charleston's coach-led gym for functional strength, mobility, and group fitness classes. Small groups, 25+ years experience. Start Reset Week -- $50.`

**Why:** Adds "gym" and "group fitness classes" to capture "gyms near me," "drake gym," and "group fitness classes near me."

### 2. `src/pages/Schedule.tsx` -- SEO tag
**Current:**
- Title: `Class Schedule & Programs Charleston | Book Today | Drake Fitness`
- Description: `View our weekly class schedule and programs in Charleston...`

**Proposed:**
- Title: `Group Fitness Classes Charleston | Weekly Schedule | Drake Fitness`
- Description: `Book group fitness and workout classes in Charleston. Morning & evening sessions: Foundation Flow, Functional Strength, KB Strong. Small groups, expert coaching.`

**Why:** Leads with "Group Fitness Classes" and adds "workout classes" to match both zero-click queries.

### 3. `src/pages/Coaching.tsx` -- SEO tag
**Current:**
- Title: `1:1 Personal Training Charleston | Complete Guide 2026`
- Description: `Personalized coaching with David Drake or Coach Nick...`

**Proposed:**
- Title: `Personal Trainer Charleston SC | 1:1 Coaching | Drake Fitness`
- Description: `Top-rated personal trainer in Charleston, SC. Custom programs for mobility, strength, and injury recovery with 25+ years experience. Book your consultation.`

**Why:** Puts "Personal Trainer" as the lead keyword to match "charleston personal trainer" exactly.

## Files Changed
- `src/pages/Home.tsx` (1 line -- SEO component props)
- `src/pages/Schedule.tsx` (2 lines -- SEO component props)
- `src/pages/Coaching.tsx` (1 line -- SEO component props)

## Notes
- No structural or layout changes -- only meta title and description strings
- Canonical URLs stay the same
- Keeps brand name "Drake Fitness" in all titles for branded query reinforcement
