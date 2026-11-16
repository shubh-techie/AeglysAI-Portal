# Phase2 generated conference asset CI correction

Recorded2026-11-16. Baseline:908f93eb2135e5d0893080861208efefd6130f69, merged PR49. Branch:fix/AEGLYSAI-PORTAL-HACK-2026-phase2-asset-preservation.

## Evidence and root cause

[Failed Pages run43909586596](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/43909586596): Check types/Build static site passed; Verify generated site failed in phase2.test.mjs with ENOENT for `dist/conference/_generated/gicite-2026/2218e7a80a809e4fe836e92c58191e61941cdccdd141e744d20090e75862ab50-display.webp`. Deployment was not successful.

The snapshot had pinned20macOS-generated conference display/thumbnail names as immutable files. Their names contain hashes of native image-encoder output. Linux amd64 produces valid different bytes/names from the same originals. Exact reported absence reproduced in an isolated Linux build; the corrected tests pass against that identical build. No photograph is missing from the approved input set.

## Correction and coverage

- Remove only those20generated-conference entries from fixed pins; all59remaining pins and every before/after phase record remain unchanged.
- Require current build inventory instead. Validate canonical event-folder/hash/variant paths and exact expected file bytes. Missing files remain fatal; no ignored ENOENT or optional reads.
- Read-only rediscovery fully decodes/re-encodes approved originals and must reproduce the current inventory.
- Require exact generated output set, every Speaking reference and decodable WebP images; stale/unapproved extras fail.
- Regression fixtures exercise alternate encoder output, old-path failure, missing and tampered static/generated files, unsafe paths and attempted reintroduction of machine-specific pins.

No application, asset source, component, dependency, workflow, theme or security-control changes. Fixed Astro CSS/copied media/thumbnail pins remain mandatory. No broad `_astro` or generated-output exclusion.

## Validation actually performed

- Astro check:233files, zero errors/warnings/hints.
- Production build:28routes, approved conference counts3/6/1.
- Full local suite:186/186passing, zero skips (Node24.22.1/existing pinned Python environment).
- Targeted suite:7/7passing.
- Isolated Linux amd64 Node24: clean npmci, Astro check,28route build and7/7targeted tests pass. Exact original filename is absent with ENOENT in that same Linux output.
- Full186Linux suite was not run. Actual GitHub-hosted validation remains pending PR integration; the workflow runs on main/manual dispatch, not PRs.
- All90portable public output files byte-identical locally; no browser rerun needed for this test-only change.
- Original conference files, approval policy, image counts, timeline and links unchanged.
- git diff --check passes; owner localhost4321/PID76010 and worktree preserved.

Evidence retained ignored under .community-drafts/phase2-assets-ci: failed-job.log, targeted.log, check.log, build.log, tests.log and linux.log. Container source copy has no Git credentials; host Node/server/config were not changed. Temporary containers are removed.

## Exact scope

1. docs/DEVELOPMENT_LOG.md
2. docs/qa/PHASE2-ASSETS-CI-REVIEW.md
3. scripts/community/phase2-preservation.json
4. scripts/community/phase2-preservation.mjs
5. scripts/community/phase2.test.mjs
6. scripts/community/phase2-assets.test.mjs

Owner authorizes commit/push/PR. Proposed commit:`fix(ci): validate current conference image assets`. No merge or deployment authorized. HTTP cache and Magicast/source-map findings remain OPEN; previously observed dependency advisories are not fixed/accepted by this change. Safari/Firefox/physical-device/manual-screen-reader limitations remain unchanged.
