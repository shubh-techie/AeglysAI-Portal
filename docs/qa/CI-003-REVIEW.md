# CI-003 — Pages validation repair checkpoint

Recorded 2026-11-03. Local repair validated; **CI-003 remains OPEN** until authorized
release succeeds and production shows the approved timeline. Nothing staged or delivered.

## Verified baseline and actual failure

- Fetched main/task HEAD: `17d159eed7e0fb037c198e104c84223979704b3b`.
- PR40 merged at17:12:08Z on2026-11-03 with that exact SHA. Immediately preceding main:
  `14f3637f3bb9a806f3e6d800cad124cae6f2607a` (merge first parent).
- [Failed Pages41681904433](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/41681904433)
  is the main-push run for the merge SHA. Authenticated read-only API metadata and actual
  build-job126077465191 log retrieved. First failure: `npm test`, step8 **Verify generated
  site**, exit1,122pass/4fail/0skipped. Install, pinned validators, check and build passed;
  artifact upload and deployment skipped.
- Fresh branch `fix/AEGLYSAI-PORTAL-CI-003-timeline-deployment` from verified main after
  clean-tree and identical served-tree checks. One primary worktree; no unrelated cleanup,
  history rewrite, prohibited-repository access or additional Git worktree.

Every hosted failure reports:

```text
Error: FINAL-001 current byte pin differs: dist/community/reports/index.html
```

Exact failing tests:

- EVENT-001 preserves 25 other routes and all pre-existing community content/styles
- UX-002 retains historical bytes outside the pinned FINAL-001 status/navigation/showcase delta
- REG-001 preserves historical bytes outside the pinned FINAL-001 delta, including2027 and navigation
- UX-001 preserves all 27 routes outside the header, with the approved EVENT-001 community exception

Each reaches the reports-route SHA assertion in `final001-preservation.mjs`. No obsolete
hackathon date/title assertion failed.

## Root-cause evidence

`src/pages/community/reports/index.astro` already uses `new Date().toISOString().slice(0,7)`.
November's valid empty-archive paragraph starts `2026-11 remains an open reporting period`;
FINAL-001's old byte pin records `2026-10`. Neither the page nor workflow changed in PR40.

| Exact bytes | SHA-256 |
| --- | --- |
| Unchanged merged-main November HTML | `4a1b8f971d2dd50187f134219fe8454074e1cdb10062a46aea3ae93fdcd8c68a` |
| Same HTML, only paragraph month changed to October | `2e576eda1e7decd5ef51289f7563001708b6c2c2e15e9502aa1d19bdecde39d5` |
| Original FINAL-001 expected after hash | `2e576eda1e7decd5ef51289f7563001708b6c2c2e15e9502aa1d19bdecde39d5` |

This is a pre-existing UTC month-rollover defect in historical guards, not a timeline
regression. Two newer TIME-001A report guards record November and would fail next month.
They now use the same strict mechanism with their original November target. No fixture or
pin regenerated, no time freezing and no backdated public output.

## Previously reported nine failures versus CI

CI installed the declared pinned Python virtual environment; its five contract tests passed.
Default local Python3.12.9 lacks jsonschema, explaining those five local-only failures.
They resolve through existing workflow prerequisites, without validator or assertion changes.

| Complete workflow setup | Before | After |
| --- | --- | --- |
| Actual Actions run |126tests:122pass/4fail | No new hosted run requested |
| Unmodified merged main |126tests:122pass/4fail | Baseline retained |
| Immediately preceding main |118tests:114pass/4fail | Baseline retained |
| Repaired candidate | — |130tests:130pass/0fail/0skipped |

Actions and both unmodified baselines reproduce identical four failure names.

## Focused repair and validation

Test-only `reportingPeriodForHistory` accepts only the exact reports-index path, one precise
open-period paragraph and the correct current UTC month. Only its seven-character month
projects to the historical value; all surrounding HTML and existing byte hashes remain
checked. Four new tests inspect raw current output; exercise October/November/December,
year and leap-month transitions against both original hashes; preserve Buffer semantics;
reject stale/missing/duplicate/invalid periods and non-period HTML tampering; prove isolation
from the hackathon route and approved five phase endpoints. No tests removed or skipped.

Fresh Git archives under `/private/tmp/aeglysai-ci003-{main,previous,candidate}-...` execute
the unchanged workflow shell commands in order, leaving primary node_modules intact:

```sh
npm ci
python3 -m venv .community-drafts/contract-venv
.community-drafts/contract-venv/bin/python -m pip install -r scripts/community/upstream/scripts/community/requirements.txt
npm run check
npm run build
npm test
```

`ASTRO_TELEMETRY_DISABLED=1` matches CI. Hosted Node24.22.2/npm11.19.1; isolated local
Node24.22.1/npm11.19.1 on macOS arm64/Python3.12.9. Node installation/active runtime unchanged.
These reproduce validation commands/failure signatures, not the Linux runner/actions.
Primary check/build/full tests also pass using the isolated pinned Python through existing
`AEGLYSAI_CONTRACT_PYTHON`; no primary Python environment installed. Plain npm test without
declared workflow Python setup can still fail those local prerequisites.

- 175-file Astro check clean;28-page build; full130/130 tests pass, no skips.
- Focused reports/timeline/date-source/qualification/operations/design/2027 tests:18/18 pass.
- All28 HTML files byte-identical to merged main. No application, workflow, dependency,
  lockfile, configuration, audit setting, CI/security-control or source contract changes.
- 96responsive/theme/JS/no-JS browser cases on Home/2026 landing/challenges at320/390/768/1440px;
  keyboard phase/FAQ checks,28route renders and16existing registration cases pass. No overflow
  or runtime/request exceptions. Browser static interception starts no HTTP test server.
- Generated date scan retains October1–November6 registration/qualification online,
  November15–22 virtual project review/finalist selection and November28 hybrid finale.
  November22 is not an hour-specific deadline. No stale blanket event-date/Phase2 pending
  text; venue, exact cutoff/session times, eligibility and certificate logistics stay qualified.
- Privacy/credential scans cover all rendered HTML/CSS/JS/JSON/XML/text with no private-key,
  token, cloud-key, source-ID or private-preview findings. Existing publication/credential/
  privacy rejection tests pass with actual pinned validators. No private source accessed.
- 1,107 prior protected artifacts/assets hash-identical. Existing localhost4321 PID58050,
  Node24.22.1/cwd/worktree retained; no process termination, restart or unrelated file changes.
- No Safari/Firefox, physical-device, manual-AT or complete WCAG certification.

## Security and remaining release blockers

HTTP cache QA-H01 / GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js
QA-H02 / GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed and unaccepted. Fresh npm ci/audit
reported0, but cache remains4.2.0 and Magicast0.5.5 still declares inlined source-map-js1.2.1.
No dependency or verified remediation changed; audit metadata is not a security waiver.
Install-script notices remain in logs, with no bypass/approval changes.

Production GET returns200 but still lacks Phase2 ISO dates and retains blanket announcements.
Remaining: owner review/separate delivery authorization, applicable security decisions,
authorized merge, new successful Pages build/deploy and live dates/navigation verification
with actual deployed SHA/run. CI-003 is not complete. No staging/commit/push/PR/merge/
deployment/dispatch performed. TIME-002 not started.

## Evidence and proposed PR

Ignored `.community-drafts/ci003/`: `failed-run.json`, `job-126077465191.log`, main/previous/
candidate install/pip/check/build/test logs, `comparison.json`, `audit.json`, `output-scans.json`,
`reproductions.json`, `protected-hashes.json`, `live-before.json` and baseline output.
Browser `browser-1793726598557/`; registration `registration-browser-1793726624365/`.
Canonical patch/hash and inventory: `review.patch`, `checkpoint.json`, outside tracked text
to avoid self-reference. Nothing staged.

Proposed title: `fix(ci): restore Pages validation after timeline update`

Pages fails npm test because an October report-page pin encounters the valid November UTC
open-period label. Validate that current label, then project only its month for historical
comparisons; retain every existing pin and all remaining bytes. Add rollover, stale-date/
tamper and approved-timeline isolation tests. No website output/workflow/security changes.

Both unmodified main revisions reproduce the same four failures with workflow prerequisites.
The repaired candidate passes exact workflow commands and130/130 tests; all28 HTML pages
unchanged,96browser cases and16registration cases pass. Five earlier local contract failures
were missing Python prerequisites and did not fail in Actions. Cache/Magicast findings stay
open. Separate authorization and actual production verification remain required.

## Exact changed-file inventory

- `docs/DEVELOPMENT_LOG.md`
- `docs/qa/CI-003-REVIEW.md`
- `docs/specs/SPEC-028-portal-final-completion.md`
- `scripts/community/final001-preservation.mjs`
- `scripts/community/reporting-period-preservation.mjs`
- `scripts/community/reporting-period.test.mjs`
- `scripts/community/time001a.test.mjs`
