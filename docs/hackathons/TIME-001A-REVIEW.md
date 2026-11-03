# TIME-001 + TIME-001A — Combined event schedule review

Recorded 2026-11-03. IMPLEMENTED locally, uncommitted review checkpoint. This extends
[TIME-001](TIME-001-REVIEW.md); its earlier results, inventory and outstanding discrepancy
snapshot remain historical. This record describes the complete proposed combined change.

## Baseline and environment

- Actual fetched/tracked main, remote main (read-only `git ls-remote`), branch HEAD and
  task baseline: `14f3637f3bb9a806f3e6d800cad124cae6f2607a`.
- Branch: `fix/AEGLYSAI-PORTAL-TIME-001-event-timeline`; one registered primary worktree.
- Preserved all nine uncommitted TIME-001 files in ignored
  `.community-drafts/time001a/previous-candidate/` before extension, plus source/output
  snapshots. Its original patch/hash/evidence remain unchanged.
- Existing `http://localhost:4321` listener PID58050 uses
  `/Users/shubhprabhat/.nvm/versions/node/v24.22.1/bin/node`, cwd
  `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`. No restart, process replacement,
  URL/port/runtime/script/configuration or worktree change. Actual localhost smoke reads
  return200 for 2026 landing/challenges and2027; updated labels reload through the
  existing source process. Source-path/runtime evidence is from lsof and `.astro/dev.json`.
- 301 prior TIME-001 evidence/public-asset files hash-identical. Public assets/banner,
  historical QA paths and excluded content were not edited. No other repository accessed.
- Untouched-main validation used a Git archive at
  `/private/tmp/aeglysai-time001a-main-14f3637`, with existing node_modules symlinked;
  no Git worktree created or active checkout switched. No remote write or new deployment.

## Configuration and public content

Central configuration: [`src/data/hackathons.ts`](../../src/data/hackathons.ts),
`eventSchedule`, `eventScheduleCopy` and `scheduleCopy`. Existing `events[0]` launch/submission
labels and schedule reference derive from it. ISO calendar-day values are formatted in UTC,
without inferred local start times. Registration/finale labels are not independently copied
into consumers. The typed pending value is null, distinct from a confirmed value.

| Field | Confirmed content / pending boundary |
| --- | --- |
| Event | AEGYTHON 2026, existing program identity |
| Phase 1 | Registration & Technical Qualification; October 1–November 6, 2026; Online |
| Phase 2 | Project Submission & Finalist Selection; Virtual judging; dates and submission deadline unconfirmed |
| Judging | Virtual project review/finalist selection; detailed judging and submission schedule announced separately |
| Phase 3 | Grand Finale; November 28, 2026; Hybrid — Online & On-site |
| Venue | Not confirmed; on-site venue details announced separately |
| Certificate verification | Not confirmed; details communicated through official AEGYTHON channels |
| Certificate issuance | Date not confirmed; no issued-certificate or deadline promise |

Three labeled phases replace the original nine TBA milestones. Hero, Challenges, detail
hero, registration/qualification, final callout and FAQ expose the confirmed dates. Shared
and landing judging messages qualify Phase 2 specifically. Certificate operations use the
requested official-channel sentence; the sample remains clearly invalid for verification.
Main/challenge description, Open Graph and Twitter metadata use the same date summaries.
No structured Event JSON-LD, venue/start-time metadata or verification URL is fabricated.

The [126-row placeholder inventory](TIME-001A-PLACEHOLDER-INVENTORY.md) records file/line,
existing wording and classified action: A confirmed corrections, B specifically pending
operations, C historical/preservation evidence, D unrelated/future announcements. Source
and rendered “before” text is archived; test expectations/pins are additionally inventoried.
Post-change HTML/metadata tests find no generic blanket event-date pending message on active
2026 pages. Remaining TBA/TBD wording qualifies age/geography, appointments, funding or
sponsor/legal arrangements. 2027 and unrelated speaking metadata are retained.

Unchanged: six challenge definitions/diagrams, form URLs and opening/approval gates,
qualification fork/clone/run/evidence steps, team rules, two independent rubrics and finalist
selection, award/funding qualifications, certificate categories/sample approval, partners/
people restrictions, Model D/research wording, dependencies, public assets and security gates.
The event palette remains intentionally dark under either global theme, as before.

Earlier blanket-date discrepancies reported in TIME-001 are resolved here under explicit
TIME-001A authorization. Existing Google Meet demo/Q&A format remains in approved rules and
explanations; the hybrid finale sentence does not assert a venue, new duration or revised
rubric. Retired proposal month windows remain explicitly non-current. No external listing,
private source or other repository was changed or newly audited.

## Validation and limits

- Node24.22.1; final Astro check172 files: zero errors, warnings or hints.
- Production build:28 pages. Only `/hackathons/`, `/hackathons/events/` and
  `/community/submit/` HTML differ from main; the latter reuses shared HackathonRules.
  All25 unrelated HTML routes, including2027, are byte-identical and guarded by hashes.
- Full automated suite125 tests: **116 pass, 9 fail**. Untouched main118 tests:
  **109 pass, 9 fail**. Failure names match exactly: five upstream contract validations;
  four historical byte-preservation tests stop at the existing reports-route FINAL-001
  pin. No skips, suppressions, weakened historical hashes or unrelated fixes. Initial
  isolated-main run lacked the expected ignored output parent directory and had two extra
  harness setup failures; after creating that directory, the final baseline reproduces the
  established nine. Both logs retained.
- Existing-current assertions for obsolete event-wide pending/Opening Soon wording were
  replaced with confirmed-date and specifically pending-deadline/eligibility assertions.
  Exact additive inverse pins project TIME-001A back to preserved TIME-001, then historical
  guards; altered current bytes are rejected. Five new tests cover confirmation states,
  date propagation/calendar formatting, public/SEO consistency, certificate/award/FAQ
  boundaries, protected sources and all25 unchanged routes.
- Focused date/timeline/design/qualification/operations/2027 suite:13/13 pass.
- Chromium64 before/after cases: landing and challenge-detail pages,320/390/768/1440px,
  light/dark, JS/no-JS. Explicit theme/overflow checks, phase-selector arrow/focus behavior
  and native FAQ Enter-key behavior pass; zero runtime/request exceptions. All28 production
  routes render with one h1. Browser request interception serves archived/built bytes at
  the existing localhost URL; it neither restarts nor reconfigures the active server and
  blocks external requests. A separate actual HTTP smoke check verifies existing source
  server output. No forms submitted or external services contacted.
- Screenshots reviewed at mobile and desktop for hero, Challenges and certificates;
  final evidence also includes timeline, judging, awards and expanded FAQs. Early new-harness
  selector/Enter-simulation failures and logs retained; no product workaround applied.
- No Safari/Firefox, physical-device, manual screen-reader, full-WCAG or live deployment
  verification claim. Existing primary development server intentionally stays running;
  temporary Chrome processes are closed by harness cleanup. No preview server was started.

Both existing security issues remain **OPEN**, unsuppressed and unaccepted:
QA-H01 http-cache-semantics / GHSA-ch52-4w7c-c8xp and QA-H02 Magicast embedded
source-map-js / GHSA-68fv-2mgg-jv7q. This content correction provides no security clearance.

## Before/after screenshots and evidence

Final screenshots/results:
`.community-drafts/time001a/browser-1793724668030/`.

- Desktop hero: `before-1440-dark-series.png` → `after-1440-dark-series.png`.
- Mobile hero: `before-320-light-series.png` → `after-320-light-series.png`.
- Mobile Challenges: `before-320-light-challenges.png` → `after-320-light-challenges.png`.
- Certificate wording: `before-1440-dark-certificates.png` → `after-1440-dark-certificates.png`.
- Timeline, awards, judging, FAQ: matching `before-*` / `after-*` filenames in that directory.
- Original pre-TIME-001 timeline: retained in
  `.community-drafts/time001/browser-1793723535552/before-1440-dark.png`.

Logs and reproducibility under ignored `.community-drafts/time001a/`:
`check-final.log`, `build-final.log`, `tests-final.log`, `main-build.log`,
`main-tests-final.log`, `focused-tests.log`, `date-tests-final.log`, `browser-verified.log`,
`baseline-comparison.json`, `localhost-smoke.json`, `protected-hashes.json`.
Browser source: `scripts/community/time001a.browser.mjs`.

Canonical combined diff bytes and SHA-256: `review.patch` and `checkpoint.json` in that
ignored evidence directory. Definition: `git diff --no-ext-diff --binary HEAD`, followed by
sorted untracked candidate diffs against `/dev/null`; no staging required. Hash is recorded
outside tracked documents to avoid self-reference. Inventory below includes both tasks.

## Proposed PR description

Title: `fix(portal): clarify AEGYTHON 2026 event timeline`

Replace nine undated milestones with three phases and use the existing event data module
as the authoritative schedule. Registration and mandatory technical qualification run
October1–November6, 2026 online; virtual project review selects finalists on a schedule still
to be confirmed; the grand finale is November28 in hybrid mode.

Derive hero, Challenges, registration, timeline, FAQ and SEO date labels from that schedule.
Qualify judging/submission, venue and certificate details separately, with no invented venue,
time, deadline, verification link or issuance promise. Preserve qualification instructions,
forms, team rules, rubrics, awards, people/publication gates, research wording and2027.

Validation: clean Astro check,28-page build,13 focused tests,64 Chromium before/after cases
and28-route rendering pass. Full suite116/125 retains the identical nine failures verified
on untouched main109/118. All25 unrelated routes are byte-identical. Existing cache/Magicast
security findings remain open. See combined review/inventory for evidence and limitations.

## Delivery boundary

Nothing staged, committed, pushed, merged or deployed; no PR created. After separate review
and authorization, deliver TIME-001 and TIME-001A together as one focused event-timeline PR.
TIME-002 not started; it remains gated on authorized merge and production verification.

## Exact combined changed-file inventory

- `docs/DEVELOPMENT_LOG.md`
- `docs/hackathons/TIME-001-REVIEW.md`
- `docs/hackathons/TIME-001A-PLACEHOLDER-INVENTORY.md`
- `docs/hackathons/TIME-001A-REVIEW.md`
- `docs/specs/HACKATHON_EXPERIENCE_SPEC.md`
- `scripts/community/md002-preservation.mjs`
- `scripts/community/registration-channels.test.mjs`
- `scripts/community/time001-preservation.json`
- `scripts/community/time001-preservation.mjs`
- `scripts/community/time001.test.mjs`
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
