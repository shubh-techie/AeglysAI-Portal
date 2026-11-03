# TIME-001 — Three-phase timeline review

Recorded 2026-11-03. IMPLEMENTED locally, uncommitted; no delivery authorized.

## Git and deployment evidence

- Verified fetched origin/main and task HEAD: `14f3637f3bb9a806f3e6d800cad124cae6f2607a`.
- Branch: `fix/AEGLYSAI-PORTAL-TIME-001-event-timeline`.
- Initial branch MD-002 at `4d16728a37928562e42efcc9d3410fc400491303`, clean tree; only primary registered worktree. Existing branches, ignored artifacts and historical directories preserved.
- Public GitHub API: [Pages run 40957013422](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40957013422), same main SHA; build and deploy jobs successful. Live `/hackathons/` still serves old timeline; these changes are local.

## Content and boundaries

1. Registration & Technical Qualification: October 1 – November 6, 2026; Online. Mandatory qualification and organizer evidence review.
2. Project Submission & Finalist Selection: Schedule to be announced; Virtual judging. Eligible projects/prototypes, evidence and demonstrations reviewed to select finalists. No date, deadline, time or time zone invented.
3. Grand Finale: November 28, 2026; Hybrid — Online & On-site. Selected finalists demonstrate and present to judging panel. Venue and start time unspecified; no awards added.

Nine old TBA badges and blanket timeline date disclaimers replaced. Existing native ordered list, phase-selection controls, tokens and responsive grid reused. Confirmed dates use `time` elements and strong emphasis. Selection note now correctly identifies only Phase 2 as pending. Qualification, team, rubric, registration, people/publication, security, 2027 and research content preserved. Landing intentionally retains its existing dark event palette under either site theme.

## Source discrepancies (unchanged)

- `EventHero.astro`: “Event dates to be announced”; `CompetitionRules.astro`: “Judges, dates and results are not confirmed.” These blanket statements outside the timeline predate this instruction and need organizer reconciliation.
- Existing rules, interaction explanations, OPERATIONS and JUDGING_FRAMEWORK describe Google Meet finalist demos and five-minute demo/Q&A. Hybrid finale mode is supplied by TIME-001; do not infer an on-site venue or silently rewrite approved judging rules.
- `hackathons.ts` has November 2026 / January 2027 dates on retired proposal records; these are not the current three-phase schedule and are retained.
- No connected private sources or prohibited repositories accessed.

## Validation

Node 24.22.1. Astro check: zero errors/warnings/hints. Production build: 28 HTML routes. Only `/hackathons/` HTML differs from freshly built main; other 27 HTML files byte-identical, including 2027. Dependencies, public assets, configuration and shared CSS untouched.

Full suite: 120 tests, 111 pass, 9 fail. Untouched main baseline: 118 tests, 109 pass, same 9 failures. Five existing upstream contract-fixture validations fail; four historical preservation tests stop at the existing `dist/community/reports/index.html` FINAL-001 byte pin. No unrelated fixes or relaxed assertions. Historical projection adds exact inverse TIME-001 changes and SHA pins; unexpected current-byte drift is rejected. Focused timeline/2027/design/qualification/operations tests: 8/8 pass.

Before/after Chromium: 32 cases, widths 320/390/768/1440, light/dark, JS/no-JS; no overflow or runtime exceptions. Keyboard Tab/focus checks included. Screenshots inspected at 320 light and 1440 dark; initial screenshot caught stale enhanced TBA note, corrected before final run. No Safari/Firefox, physical-device or manual screen-reader certification. Evidence and harness in ignored `.community-drafts/time001/`; exact final artifact paths recorded in checkpoint manifest. Temporary test servers are stopped by harness cleanup.

Existing security findings remain **OPEN**: QA-H01 http-cache-semantics / GHSA-ch52-4w7c-c8xp and QA-H02 Magicast embedded source-map-js / GHSA-68fv-2mgg-jv7q. No remediation, suppression, waiver or fresh security clearance claimed.

## Proposed draft PR

Title: `fix(portal): clarify AEGYTHON 2026 event timeline`

Replace the nine undated milestones with three clear phases. Registration and mandatory technical qualification run October 1–November 6, 2026 online; project submission and finalist selection use virtual judging with schedule explicitly pending; the November 28 grand finale is hybrid. Retain existing qualification instructions, evidence requirements, judging rubrics and selection policies.

Reuse the timeline's ordered list and responsive styling, with machine-readable confirmed dates and corrected enhanced selector copy. Add phase semantics and exact preservation regressions. Astro check/build and focused tests pass; full suite retains nine verified baseline failures. Browser evidence covers both themes, keyboard, no-JS and 320–1440 px. Existing security findings remain open. Outside-timeline blanket pending-date copy and Google Meet wording require organizer reconciliation, as documented above.

Stop before staging, commit, push, PR creation, merge or deployment. TIME-002 not started. Canonical diff hash is stored outside tracked documents to avoid self-reference.

## Final checkpoint evidence

- Navigation browser: 28 cases PASS, zero runtime exceptions; isolated `.community-drafts/time001/navigation/` screenshots and results.
- Registration browser: 16 cases PASS, zero runtime exceptions; `.community-drafts/reg-001/browser-1793723547933/`.
- Final timeline/browser and HTTP route run: 32 before/after cases PASS, all 28 original HTML routes respond HTTP 200 with h1. Evidence `.community-drafts/time001/browser-1793723535552/`; source harness `.community-drafts/time001/browser.mjs`. Timeline uses inherited dark palette in both global themes, as before.
- Before/after screenshots: `before-320-light.png`, `after-320-light.png`, `before-1440-dark.png`, `after-1440-dark.png` within that final browser directory. Screenshots contain public page content only.
- Full logs: `.community-drafts/time001/{check,build,tests,baseline-tests,focused-tests,navigation,browser-final-routes,registration-browser-final}.log`.
- Exact changed-file inventory (nine files):
  - `docs/DEVELOPMENT_LOG.md`
  - `docs/hackathons/TIME-001-REVIEW.md`
  - `docs/specs/HACKATHON_EXPERIENCE_SPEC.md`
  - `scripts/community/md002-preservation.mjs`
  - `scripts/community/time001-preservation.json`
  - `scripts/community/time001-preservation.mjs`
  - `scripts/community/time001.test.mjs`
  - `src/components/hackathons/landing/CompetitionTimeline.astro`
  - `src/components/hackathons/landing/landing-interactions.js`

Canonical diff: binary Git diff from HEAD for tracked changes followed by sorted untracked
file diffs against `/dev/null`, with external diffs disabled. Exact bytes and SHA-256 in
ignored `.community-drafts/time001/review.patch` and `checkpoint.json`. No staging required.
Date/placeholder scan covers landing sources, event data, OPERATIONS and JUDGING_FRAMEWORK;
new timeline has only three confirmed ISO dates and one explicitly pending Phase 2 schedule.
Historical unconfirmed eligibility/prize/publication details remain appropriately unchanged.
