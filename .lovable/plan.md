
# Plan: UTM Attribution Tracking — COMPLETED

## What Was Done

Added `buildPunchPassUrl()` helper to `src/data/pricing.ts` and tagged every PunchPass checkout link across 13 files with unique `utm_content` values.

## UTM Content Tags Reference

| `utm_content` | Location |
|---|---|
| `nav-try-free` | Desktop nav "Try Free" button |
| `nav-mobile-try-free` | Mobile nav "Try 3 Classes Free" |
| `home-start-here-inline` | Home "Sign up" text link |
| `home-start-here-cta` | Home "Claim Your 3 Free Classes" button |
| `home-bottom-cta` | Home bottom CTA section |
| `community-reasons-cta` | Community reasons section |
| `pricing-intro-card` | Pricing intro card |
| `pricing-foundation` | Pricing Foundation membership |
| `pricing-unlimited` | Pricing Longevity Unlimited |
| `pricing-remote-support` | Pricing Remote Support |
| `pricing-flex-pack` | Pricing 10-Class Pack |
| `pricing-not-sure-cta` | Pricing "Not sure" section |
| `pricing-bottom-cta` | Pricing bottom CTA |
| `schedule-top-cta` | Schedule top banner |
| `schedule-bottom-cta` | Schedule bottom CTA |
| `intro-nav-cta` | Try Free landing nav |
| `intro-hero-cta` | Try Free landing hero |
| `intro-bottom-cta` | Try Free landing bottom |
| `intro-sticky-mobile` | Try Free sticky mobile bar |
| `west-ashley-hero` | West Ashley hero CTA |
| `west-ashley-bottom` | West Ashley bottom CTA |
| `strength-hero` | Strength Training hero |
| `strength-middle-cta` | Strength Training mid-page |
| `strength-bottom-cta` | Strength Training bottom |
| `low-impact-hero` | Low Impact hero |
| `low-impact-middle-cta` | Low Impact mid-page |
| `low-impact-bottom-cta` | Low Impact bottom |
| `reset-week-hero` | Reset Week hero |
| `reset-week-step-claim` | Reset Week step "Claim your pass" |
| `reset-week-bottom-cta` | Reset Week bottom |
| `insights-bottom-cta` | Insights bottom CTA |
| `success-stories-bottom-cta` | Success Stories bottom |

## External UTM Convention (for ads, not in code)

- **Facebook Ads**: `?utm_source=facebook&utm_medium=cpc&utm_campaign=intro-offer&utm_content=ad-spring-2026`
- **Google Business Profile**: `?utm_source=google&utm_medium=organic&utm_content=gbp-website-link`
- **Instagram bio**: `?utm_source=instagram&utm_medium=social&utm_content=bio-link`
