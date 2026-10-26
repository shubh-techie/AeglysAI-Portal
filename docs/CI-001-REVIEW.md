# AEGLYSAI-PORTAL-CI-001 — Pages failure review

Recorded 2026-10-26. Status: local corrective diff for review; not staged, committed,
pushed, submitted as a PR, merged or deployed. Production success is unverified.

## Verified baseline and causal evidence

- Original repository: `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
  Origin: `https://github.com/shubh-techie/AeglysAI-Portal.git`.
  Original checkout remains on `feat/AEGLYSAI-PORTAL-UX-001-research-navigation`
  at `a5cab8330ab6113121b3f5a0d5807e131e51db9c`, with a clean index/worktree.
- Isolated worktree: `/private/tmp/aeglysai-portal-ci-001`;
  branch: `fix/AEGLYSAI-PORTAL-CI-001-pages-build`.
- Fetched `origin/main`, worktree HEAD and failed run HEAD all equal
  `792247774a39c7e72b540a7895c0b66058881469` (PR #25 merge).
  PR #23 merged at `cf275ef`; PR #24 at `a03d08d`. Existing PR branches were not modified.
- Authenticated read-only Actions API returned run attempt 1, event `push`, conclusion
  `failure`, workflow `.github/workflows/deploy-pages.yml` and build job `121716068953`.
  [Failed run](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40363840679).
- Logs identify **Verify generated site (`npm test`)** as the first failing step:
  64 tests, 62 pass, two fail. Installation, Python validators, type checks and
  27-page static build all succeeded. Artifact upload and dependent deployment
  were skipped, rather than independently failing.
- Runner: Ubuntu 24.04.5, Node **24.21.0**, npm **11.19.0**,
  `ASTRO_TELEMETRY_DISABLED=1`. `.nvmrc` selects Node 24. Workflow permissions,
  concurrency, credentials restrictions and deployment branch guard remain unchanged.

The two failures and their causes are independently reproduced locally:

1. `hackathon-motion.test.mjs:25`: 404 historical normalized HTML hash actual
   `8d9df13d97fa4fb1dcc6da94e9e95f10005d137a8358983931f441561bf247e1`, expected
   `8f75d4162e63a4e0b7ffc8587770ba06a7b53ad91cd1d07fc941085a1d46dd52`.
   The historical guard compared the new authorized navigation header against the old
   whole-page baseline. Its existing `originalHeader` normalization was omitted in
   both ordinary-route and community exception branches.
2. `site.test.mjs:143`: script count **3 !== 2**. Its old page-specific allowance
   omitted `data-research-nav-init`, which coexists with theme and page enhancements.

Git comparison of `ca47d9964c05930bc0476f00141b9702915653f4` with integration merge
`f422c55292d2b1f7b9bd73e6f0b9c10eb20a7bf0` proves the previously corrected sections
were replaced by older assertions during integration. This is a test integration
regression, not evidence that application functionality or security should be removed.

## Minimal correction and exact scope

1. `scripts/community/hackathon-motion.test.mjs`: restore original-header normalization
   in both historical comparisons; remove unused `existsSync` import. Keep all
   historical fixture hashes, protected-source hashes and consumed stylesheet checks.
2. `scripts/site.test.mjs`: count each of the five approved initializer markers
   independently, require exactly one occurrence per present initializer, and include
   research navigation in the scoped inline-script allowance. Keep no-network,
   no-external-script, theme-first, PDF restrictions and no-client-bundle checks.
3. `docs/CI-001-REVIEW.md`: this evidence, delivery and controlled integration plan.
4. `docs/DEVELOPMENT_LOG.md`: append this task's actual outcome.

No application, route, fixture, dependency, lockfile, workflow, security policy, banner,
form, date, rubric, challenge or public-content changes. The independent UX tests
still protect all 27 routes outside the header and validate the new header destinations.
EVENT tests retain schema, consent, draft, scheduling, shared-role and filter coverage.

## Reproduction and validation

Evidence is local/ignored under `.community-drafts/ci-001/` in this worktree:
`run.json`, `jobs.json`, `build-job.log`, installation logs, `before-*`, `after-*`
and mutation logs. Authentication tokens and signed download URLs were not written
into evidence. Logs are evidence artifacts, not proposed public source changes.

Used official Node 24.21.0 darwin-arm64 distribution; archive SHA-256 verified against
Node's published SHASUMS256.txt:
`bed7eea5325e1108f32ce5228ddd6a5f0f08a499ee42aa7442aea583702f6057`.
Exact Node/npm versions and workflow commands/environment match; operating system
and Python host differ. Docker is installed but no daemon is available. No Linux
reproduction or hosted-action equivalence is claimed.

- `npm ci`: exit 0, fresh lockfile install (277 installed/278 audited on macOS).
- Workflow's `python3 -m venv .community-drafts/contract-venv` and pinned requirements
  installation: exit 0; existing upstream contract tests executed, not skipped.
- Before correction: `npm run check` exit 0 (128 files, 0 errors/warnings, 1 unused-import
  hint); `npm run build` exit 0, 27 pages; `npm test` exit 1, **62/64**, with the exact
  hosted failure messages/hash values above.
- After correction: check exit 0 (128 files, zero errors/warnings/hints); build exit 0,
  27 pages; test exit 0, **64/64**. No test removed/skipped and no fixture regenerated.
- Bounded negative regression probes temporarily altered generated HTML, then restored
  original bytes in `finally`: unexpected script, duplicate navigation initializer,
  fetch inside an approved initializer and changed protected 404 content all correctly
  failed their focused guards. These prove the repaired assertions retain rejection
  behavior; they do not alter source or production data.
- Local artifact preflight: 27 HTML pages, index present, no symlinks, readable tar
  containing `./index.html`. No Pages upload/deployment action was executed locally.
- `git diff --check`: passes. No lint script exists.

## Security disposition

`npm audit --json` after correction exits **1**, one high-severity transitive
`http-cache-semantics` 4.2.0 finding, [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp).
The manual Magicast embedded source-map concern from SEC-001/SEC-002 remains open
and is separate from this audit count. Neither finding is fixed or accepted here;
no waiver, override, suppression or bypass is approved. Coordinate remediation with
SEC-002's separate assessment worktree. Package manifest/lock hashes match baseline.

The actual Pages workflow has **no explicit audit-failing step**; npm ci reports
findings without failing. Audit status is therefore an outstanding security readiness
limitation, not the observed cause of this run's failed test step. No control is removed.

## Controlled delivery, verification and rollback

Proposed commit and PR title: `fix(ci): repair GitHub Pages build after integration`.
Proposed PR base `main`, head `fix/AEGLYSAI-PORTAL-CI-001-pages-build`.

PR description:

> Integration restored older generated-site assertions, causing the Pages workflow's
> Verify generated site step to fail despite a successful 27-page build. Restore
> historical-header normalization and account for the approved navigation initializer
> alongside theme/page scripts. No runtime, content, dependency, fixture or workflow
> changes. Includes CI failure evidence and local validation documentation.
>
> Node 24.21.0/npm 11.19.0: original 62/64 failure reproduced exactly; corrected check,
> 27-page build and 64/64 tests pass. Negative probes still reject unauthorized scripts,
> duplicates, network calls and protected-content changes. Chromium results are recorded
> below. Hosted Ubuntu/Pages deployment remains unverified. One high cache audit finding
> and Magicast embedded source-map risk remain open; no audit waiver/bypass approved.

Review exact inventory/diff hash before authorizing staging, commit, normal branch push
or draft PR creation. This task does none of those actions. Workflow currently triggers
on main push/manual dispatch, not pull_request; do not claim pre-merge hosted checks ran.
After approval and formal review, merge only with preserved history under separate
permission. The resulting main push should run the unchanged Pages workflow. Verify
new head SHA, check/build/tests, artifact upload, deploy success and environment URL;
then smoke-test all original routes, Research/mobile navigation, themes, hackathon
links and hidden draft partners. Only actual successful Actions and Pages records
establish deployment success. Do not rerun the old failed SHA expecting this fix.

If a confirmed regression requires rollback, prepare a new reviewed revert commit of
this future corrective commit on a feature branch; retain all history and security
controls. Do not reset main, force-push or bypass tests. Reverting test corrections
would restore the known CI failure and requires explicit release-owner review.

## Browser acceptance and remaining limitations

Existing Chromium harnesses passed on the corrected worktree:

- Navigation: **28 cases**, zero runtime exceptions; widths 320, 375, 390, 430,
  768, 1024 and 1440 in light/dark with enhanced and no-JavaScript navigation.
  Includes Research destinations, keyboard/touch, dialog focus containment/restoration,
  Escape/Close/backdrop dismissal, reduced motion, touch targets and overflow checks.
  Evidence/screenshots: `.community-drafts/ux-001a/`.
- Showcase: **eight viewport/theme cases plus no-JavaScript**, production hidden-draft
  state and isolated synthetic category/filter/carousel interactions.
  Evidence/screenshots: `.community-drafts/event-001/run-1793034903512/`.
  Synthetic records were confined to an ignored fixture build, not production content.
- Both harnesses exited 0 and cleaned up their temporary browser/server processes.

Safari, Firefox, physical-device and actual manual screen-reader sessions were not run.
Local tar validation does not reproduce GitHub artifact service, OIDC, environment
permissions, CDN, DNS or production deployment behavior. A successful future hosted
run is expected for these corrected assertions, but cannot be guaranteed or claimed
before it runs. Remaining dependency findings prevent a full security-clear claim.
