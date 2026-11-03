# TIME-001A — Final three-phase schedule review

Recorded 2026-11-03. IMPLEMENTED locally; uncommitted combined TIME-001/TIME-001A candidate.
This explicitly supersedes the Phase 2 pending status in the earlier
[TIME-001A review](TIME-001A-REVIEW.md) and [placeholder inventory](TIME-001A-PLACEHOLDER-INVENTORY.md).
Those documents, patches and screenshots retain their historical checkpoint meaning.

## Git, scope and environment

- Actual baseline/HEAD/local origin/main and read-only verified remote main:
  `14f3637f3bb9a806f3e6d800cad124cae6f2607a`.
- Existing branch `fix/AEGLYSAI-PORTAL-TIME-001-event-timeline`; one registered primary worktree.
- Archived the prior29-file candidate, source and production output under ignored
  `.community-drafts/time001a-final/previous-candidate/`, `before-src/` and `before-dist/`.
  Its checkpoint SHA256 is `6f04373ea0facae034a358dac7ebb94727998d90c934987895906ec77242f15c`.
- Existing localhost4321 listener remains PID58050, using Node24.22.1 from
  `/Users/shubhprabhat/.nvm/versions/node/v24.22.1/bin/node`, cwd the expected Portal root.
  No server restart, runtime/config/script/URL/port/process replacement or worktree change.
  Actual HTTP reads verify updated Home/2026 landing/challenges and preserved2027.
-680 prior TIME-001/TIME-001A evidence/public-asset files hash-identical. Banner/public assets,
  historical QA artifacts and unrelated/untracked work preserved. No prohibited repository
  accessed. No dependency, security-control, people/publication or research change.

## Authoritative confirmed schedule

Existing configuration: [`eventSchedule` and `scheduleCopy`](../../src/data/hackathons.ts).

| Phase | Dates | Mode |
| --- | --- | --- |
| Registration & Technical Qualification | October 1–November 6, 2026 | Online |
| Project Submission & Finalist Qualification | November 15–22, 2026 | Virtual judging and finalist selection |
| Grand Finale | November 28, 2026 | Hybrid — Online & On-site |

The configuration preserves a separate unconfirmed exact submission deadline. November22
is the end of the phase window, not an announced hour-specific cutoff. Public copy states
that distinction; no midnight, timezone, session start or end time is invented. Registration
labels and machine-readable Phase1 end remain November6, never November28.

Still unconfirmed: exact submission cutoff and session times, on-site venue, certificate
verification channel and issuance date. Certificate sample/eligibility, award funding and
results remain conditional. No issued certificate, confirmed prize payment or award date
is implied by the event schedule.

## Focused correction inventory

| Current source / surface | Prior checkpoint | Final behavior |
| --- | --- | --- |
| `src/data/hackathons.ts` | Phase2 dates and judging schedule unconfirmed | Confirmed Nov15–22 window and title/mode, separate unconfirmed exact deadline/session times; three-phase summary |
| `landing/CompetitionTimeline.astro` | Phase2 schedule pending, Finalist Selection title | Finalist Qualification title, two Phase2 time elements, confirmed dates, neutral reading note |
| `landing/EventHero.astro`, `SeriesHero.astro` | Registration/finale labels | All three phase labels from configuration |
| `landing/QualificationJourney.astro` | Registration/finale labels | All three windows; registration still ends Nov6 |
| `src/pages/hackathons/index.astro` | Two-date Challenges/final callout; pending resource note; no Awards date context | Three-date labels, derived resource schedule, Awards event-schedule note retaining funding/approval limitations |
| Shared/landing judging, RegistrationChannels, FAQ and hackathon SEO | Pending judging/submission window | Existing consumers automatically receive confirmed range and exact-time qualification through scheduleCopy |
| `src/pages/index.astro` | Event-discovery card without dates | Existing2026 card adds shared three-phase summary;2027 card and research metadata unchanged |
| Tests/browser harness | Phase2 pending assertions | Explicit confirmed dates/title/mode and cutoff separation, current-output scans, homepage coverage; historical pins preserved |

No blind replacement of historical text. Conditional configuration fallbacks for hypothetical
unconfirmed schedules remain in source; they are not rendered by the current confirmed2026
configuration. Old review/fixture literals remain historical evidence. Current generated
HTML and metadata have no stale Phase2 pending or blanket event-date announcement message.
Independent eligibility, legal/sponsor, appointment, venue and certificate uncertainty remains.

## Validation

- Node24.22.1. Final Astro check173 files, zero errors/warnings/hints. Production build28 pages.
- Full automated suite126 tests: **117 pass, 9 fail**. Fresh untouched-main build/test in the
  existing isolated Git-archive directory: **109/118 pass, same9fail**. Five upstream contract
  validation failures; four historical guards stop at the existing reports-route FINAL-001
  pin. Exact failure names recorded in `baseline-comparison.json`. No skip, suppression or
  unrelated baseline repair. Current assertions strengthened for confirmed Phase2 semantics.
- Focused timeline/date-source/operations/qualification/design/2027 tests:14/14 pass.
- Only four HTML routes differ from main: Home,2026 landing, challenge details and community
  submission (shared judging component). All24 others, including2027, byte-identical and
  checked against original main hashes. Protected forms/challenges/people/dependencies/config,
  styles and ModelD source remain guarded. Final inverse delta checks every changed current
  source/output pin and rejects unrelated modifications before older historical guards.
-96 Chromium before/after cases: Home,2026 landing and challenge details;
  320/390/768/1440px; both themes; JS/no-JS. No overflow or runtime/request exceptions;
  phase-arrow/focus and FAQ keyboard checks pass. All28 production routes render one h1.
-16 existing registration browser cases pass (external URLs, safe links, keyboard order/focus,
  support links, themes/no-JS/overflow). Only test transport was adapted to static request
  interception; its assertions remain unchanged. No external registration or form submission.
- Browser request interception serves archived/production bytes at the same localhost URL.
  No temporary HTTP server or active-development-process modification. Chrome exits through
  cleanup. Separate actual source HTTP smoke checks return200 on Home/2026/2027 and confirm
  source reload on the original process.
- Screenshots inspected: desktop final timeline and previous pending timeline; mobile light
  homepage card showing all three windows plus unchanged2027. Evidence also captures hero,
  Challenges, Awards, certificate, judging and expanded FAQ sections.
- Initial local check found optional Phase2 date narrowing, corrected before passing. Initial
  new preservation helper encountered literal dollar replacement in award source; corrected
  to callback replacement without changing historical pins or weakening checks. Failed logs
  retained separately. No Safari/Firefox, physical-device, manual-screen-reader, complete WCAG
  or live deployment verification claim.

Security remains unchanged: cache finding QA-H01 / GHSA-ch52-4w7c-c8xp and embedded Magicast
source-map-js concern QA-H02 / GHSA-68fv-2mgg-jv7q are **OPEN**, unsuppressed and unaccepted.

## Before/after evidence

Final browser evidence `.community-drafts/time001a-final/browser-1793725170208/`:

- Timeline: `before-1440-dark-timeline.png` → `after-1440-dark-timeline.png`.
- Mobile timeline: `before-320-light-timeline.png` → `after-320-light-timeline.png`.
- Homepage: `before-320-light-home-community.png` → `after-320-light-home-community.png`.
- Matching hero/Challenges/Awards/judging/FAQ filenames use `before-*` and `after-*`.

Registration evidence:
`.community-drafts/time001a-final/registration-browser-1793725199679/`.
Reproducible primary browser harness: `scripts/community/time001a.browser.mjs`.
Existing registration harness source retained; adapted transport copy:
`.community-drafts/time001a-final/registration.browser.mjs`.

Logs/manifests in `.community-drafts/time001a-final/`: `check-final.log`, `build-final.log`,
`tests-final.log`, `main-build.log`, `main-tests.log`, `focused-tests.log`, `browser.log`,
`registration-browser.log`, `localhost-smoke.json`, `baseline-comparison.json`,
`protected-hashes.json`, `date-scan.json`. Earlier failed-run logs retained.

Canonical combined diff: `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked
candidate diffs against `/dev/null`. Exact bytes in ignored `review.patch`; SHA256 and actual
inventory in `checkpoint.json`, outside tracked documents to avoid self-reference. Nothing
staged. Inventory below includes all work from TIME-001 through this final correction.

## Proposed PR description

Title: `fix(portal): finalize AEGYTHON 2026 schedule`

Publish the confirmed three-phase schedule from the existing central event configuration:
online registration/technical qualification October1–November6; project submission/finalist
qualification November15–22 through virtual judging and finalist selection; hybrid grand
finale November28. Keep the phase window distinct from an unconfirmed exact submission
cutoff, with venue, session times and certificate operations still qualified.

Update timeline, Challenges, registration/qualification, judging, Awards, FAQ, homepage event
card and applicable metadata. Preserve forms, six challenges, rules/rubrics, funding and
publication gates, research wording,2027 and development configuration.

Validation: clean Astro check and28-page build;14 focused tests;96 responsive/theme/JS browser
cases plus16 registration cases and28-route rendering pass. Full117/126 retains the same
nine failures verified on untouched main109/118.24 unrelated routes are byte-identical.
Existing cache/Magicast findings remain open. See final review for screenshots, inventories
and limitations.

## Review/delivery checkpoint

Stop before staging, committing, pushing, PR creation, merge or deployment. Request separate
review and delivery authorization for the concrete combined diff above. No TIME-002 work.

## Exact combined changed-file inventory

- `docs/DEVELOPMENT_LOG.md`
- `docs/hackathons/TIME-001-REVIEW.md`
- `docs/hackathons/TIME-001A-FINAL-REVIEW.md`
- `docs/hackathons/TIME-001A-PLACEHOLDER-INVENTORY.md`
- `docs/hackathons/TIME-001A-REVIEW.md`
- `docs/specs/HACKATHON_EXPERIENCE_SPEC.md`
- `scripts/community/md002-preservation.mjs`
- `scripts/community/registration-channels.test.mjs`
- `scripts/community/time001-preservation.json`
- `scripts/community/time001-preservation.mjs`
- `scripts/community/time001.test.mjs`
- `scripts/community/time001a-final-preservation.json`
- `scripts/community/time001a-final-preservation.mjs`
- `scripts/community/time001a-preservation.json`
- `scripts/community/time001a-preservation.mjs`
- `scripts/community/time001a.browser.mjs`
- `scripts/community/time001a.test.mjs`
- `scripts/site.test.mjs`
- `src/components/hackathons/CertificateShowcase.astro`
- `src/components/hackathons/HackathonRules.astro`
- `src/components/hackathons/RegistrationChannels.astro`
- `src/components/hackathons/SeriesHero.astro`
- `src/components/hackathons/landing/CompetitionRules.astro`
- `src/components/hackathons/landing/CompetitionTimeline.astro`
- `src/components/hackathons/landing/EventHero.astro`
- `src/components/hackathons/landing/QualificationJourney.astro`
- `src/components/hackathons/landing/landing-interactions.js`
- `src/data/hackathonExperience.ts`
- `src/data/hackathonSeo.ts`
- `src/data/hackathons.ts`
- `src/pages/hackathons/events.astro`
- `src/pages/hackathons/index.astro`
- `src/pages/index.astro`
