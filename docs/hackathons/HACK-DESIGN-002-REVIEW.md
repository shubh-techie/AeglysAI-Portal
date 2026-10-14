# AEGLYSAI-HACK-DESIGN-002 — Review handover

Recorded 2026-10-14. Repository: shubh-techie/AeglysAI-Portal only. IMPLEMENTED locally on
`feat/AEGLYSAI-HACK-DESIGN-002-global-event`. Initial tree clean at `69b927a`; fetched origin,
created the requested branch and fast-forwarded to current main `4fc596d`, preserving all
prior commits. No research repository edits. No package change, push, PR, merge to main,
remote CI or deployment. Reviewable implementation diff; proposed commit below.

## Before and after

Before: red, compact three-line research-oriented hero, boxed network, basic cards and
small proposed-prize callout, one paragraph for the timeline, conventional judging lists.
After: midnight navy with cyan/electric blue, oversized Build Intelligence / Secure Tomorrow
identity and approved mark, open architectural network motif, event-facts strip, student
opportunities, stronger equal challenge cards, seven qualification stages and a distinct
nine-stage TBA timeline. Large configurable $300 proposed-award panel, decorative cup,
conditional recognition/sample and two independent championship-style rubric cards.

The [Agentware reference](https://www.agentwarehack.com/#prizes) informed identity scale,
section rhythm and prize emphasis. No source, text, imagery, brand or exact layout copied.
No international attendance, institution, partner, judge, award funding or result invented.
The landing deliberately remains dark in both global themes; header/footer keep their theme.

## Final section order

1. Immersive hero and primary registration
2. Six confirmed event facts
3. Local section navigation
4. Why the hackathon matters
5. Six challenge cards
6. LEARN / BUILD / COMPETE / CONNECT / SHOWCASE / GROW
7. Preserved planned activities and Foundation/Advanced starting points
8. Seven-step qualification pathway, registration/team context, detailed requirements and GitHub evidence
9. Nine-stage competition timeline and project action
10. Proposed prizes and conditional recognition/sample certificate
11. Preserved team eligibility and complete final-submission requirements
12. Two-round judging, independent exact 100-point rubrics and all tie/conflict/privacy rules
13. Speakers, judges, guests (approval-gated; otherwise To Be Announced)
14. Resources, FAQs and Code of Conduct; existing sponsor link
15. Final registration callout

## Content and CTA behavior

All six titles/IDs, architecture illustrations, difficulty, problem, focus, prototype and detail
links use unchanged shared components/data. Cards have equal weight, subtle elevation and
3×2 desktop / two tablet / one mobile columns. Challenge acceptance criteria unchanged.

Qualification is individual for every team member, A/B/C sufficient, Model D not required,
selection not guaranteed. Existing branch/document paths, environment/run observations,
architecture, technical observation, improvement/validation and sanitized log URLs retained.
No official repository write access. Selected 1–4-member teams retain leader/ID/roster and
no duplicate membership rules. Source/README/reproduction and maximum-two-minute video
remain mandatory. Finalists present five minutes plus five minutes Q&A over Google Meet.

Awards stay event-data-configurable, $300 today. PROPOSED AWARD — SUBJECT TO CONFIRMATION,
funding unconfirmed, final structure TBA, eligibility/payment/organizer approval prominent.
First-place spotlight is explicitly proposed, not an approved allocation. Eight certificate
categories retain individual eligibility/approval. Existing sample and invalidity disclaimer
preserved; registration alone earns nothing.

FormCta and all seven registry URLs/settings are unchanged. Hero/final registration is
primary; qualification submission is primary within its evidence callout. Team, project,
judge/speaker/mentor/guest actions are contextual secondary links. Closed/unavailable states
remain resolver-controlled; no hardcoded Forms URLs. External Forms preserve new-tab labels
and noopener/noreferrer. No private Workspace read, form submission or infrastructure edit.

## Validation and evidence

- Node 24.13.0 Astro check: zero diagnostics; production build: 27 pages.
- 50 automated tests pass, including route/assets/anchors, seven Forms mapping/gates,
  SVG safety, certificate gates, qualification, exact rubrics and source/private-data regressions.
- First production build crashed under macOS sandbox (`SecItemCopyMatching -50`);
  rerun with approved escalation succeeded. First final test run found the added script
  outside the existing script allowance; scoped inline-script gate updated, rerun passed.
- Browser caught navigation binding before document parsing completed; fixed with a
  DOMContentLoaded initialization gate. A stale screenshot harness was corrected using
  cache-disabled unique navigation and an isolated untouched baseline build.
- Local Chrome: 10 final landing cases, 1440/1024/768/390/320 × light/dark. One h1,
  no horizontal overflow, six unique nonzero SVGs, 3/2/1 columns, SVG label contrast ≥4.5:1,
  keyboard focus, named links in accessibility tree, no broken images, active challenges
  navigation, network/scroll/hover reduced-motion checks pass. Highest observed local CLS
  0.0026; this is a local observation, not field Core Web Vitals or Lighthouse certification.
- All 26 other generated HTML routes and consumed CSS match isolated main baseline after
  normalizing stylesheet filenames. Sponsors has a changed generated stylesheet name but
  identical stylesheet bytes/HTML content. Shared header/footer/components/data unchanged.
- Landing HTML approximately 77 KB raw / 18.5 KB gzip, including the six inline diagrams;
  no new runtime requests, fonts, dependencies or external JavaScript. Network movement
  finishes after four seconds; reduced motion disables all landing animation/transitions.
- Accessibility validation is bounded source/Chrome checks; no full WCAG audit, screen-reader
  certification, physical-device or low-bandwidth field testing claimed.
- Privacy checks and whitespace/link validation are recorded in the development log.
  No new credentials, participant records, fake profiles or confidential assets introduced.

Screenshots (ignored local artifacts): `.community-drafts/design-002/screenshots/` contains
before/after desktop/mobile heroes and after desktop/mobile challenges, qualification,
prizes, judging and certificate sample. Before is isolated unchanged `4fc596d`.

## Exact changed-file list

- `README.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/README.md`
- `docs/adr/ADR-009-challenge-architecture-visuals.md`
- `docs/adr/ADR-011-scoped-hackathon-event-landing.md`
- `docs/specs/README.md`
- `docs/specs/HACKATHON_EXPERIENCE_SPEC.md`
- `docs/specs/SPEC-018-challenge-architecture-visuals.md`
- `docs/specs/SPEC-020-hackathon-portal-operations.md`
- `docs/hackathons/VISUAL_ASSETS.md`
- `docs/hackathons/HACK-DESIGN-002-REVIEW.md`
- `scripts/site.test.mjs`
- `scripts/community/hackathon-design.test.mjs`
- `src/components/hackathons/landing/EventHero.astro`
- `src/components/hackathons/landing/EventNav.astro`
- `src/components/hackathons/landing/QualificationJourney.astro`
- `src/components/hackathons/landing/CompetitionTimeline.astro`
- `src/components/hackathons/landing/CompetitionRules.astro`
- `src/pages/hackathons/index.astro`
- `src/styles/hackathon-landing.css`

## Outstanding decisions and proposed Git details

Organizers must confirm dates/time zones, age/geographic eligibility, official terms/reporting
contact, $300 funding/allocation, judges/sessions/mentor capacity, private intake administration,
certificate issuance/verification and the separate upstream sixth-challenge alignment.
A polished frontend does not resolve these decisions or certify actual form receipt.

Proposed commit: `feat(hackathon): AEGLYSAI-HACK-DESIGN-002 redesign global event landing`.
Proposed PR to main: same title; describe exclusive landing design, unchanged event truth and
policy, approved Forms reuse, responsive/accessibility results and remaining event decisions.
Applicable successful CI must precede any authorized merge. No new deployment claimed.
