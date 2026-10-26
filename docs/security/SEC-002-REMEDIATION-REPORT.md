# SEC-002 — Remediation evaluation and validation report

Recorded 2026-10-26. **Assessment-only delivery: no package, lockfile, feature, CI or
runtime changes adopted. Both residual findings remain open; no acceptance approved.**

Read the [security assessment](SEC-002-SECURITY-ASSESSMENT.md) and
[disposition matrix](SEC-002-ADVISORY-MATRIX.md) for technical reasoning and owner decisions.


## SEC-002-DOC publication refresh — 2026-10-26

Documentation-only review prepared from fresh main
`bdc94b28428f7fbf05de6aa949ed43cea46f8ef8` in
`/private/tmp/aeglysai-portal-sec-002-doc`, branch
`docs/AEGLYSAI-PORTAL-SEC-002-DOC`. No commit, push, PR or merge is authorized yet.
PR #25 navigation and PR #26 CI correction are now merged. Pages run
[40373450637](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40373450637)
and its deployment report success for that same main SHA at `https://aeglysai.com/`;
this is deployment evidence, not security acceptance.

The sections below preserve the **original investigation snapshot** at `a03d08d...`:
its feature-branch states, latest-release observations, runtime coverage and test counts
apply to those explicitly pinned inputs, not to current main. Current main's manifest
and lockfile are byte-identical to the investigated dependency baseline. All 72 files
in the original evidence checksum index were verified without modifying that worktree.
A fresh lockfile audit on this publication baseline still exits **1**, one high cache
finding; Magicast's embedded-code residual remains separately open. No owner risk
acceptance has been approved. No dependency remediation or runtime revalidation is
claimed by publishing these documents. See the report's publication validation section.


## Original investigation Git and proposed inventory

Original root: `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
Isolated worktree/root: `/private/tmp/aeglysai-portal-sec-002`.
Remote: `https://github.com/shubh-techie/AeglysAI-Portal.git`.
Branch: `fix/AEGLYSAI-PORTAL-SEC-002-remaining-advisories`.
Original investigation baseline/HEAD: `a03d08d14261e5f2e0fac1a063aec69e4658cf8d`.
This is current main at initial remote verification and includes merged SEC-001 #24.

Only four reviewable files are changed/added:

1. `docs/security/SEC-002-SECURITY-ASSESSMENT.md`
2. `docs/security/SEC-002-ADVISORY-MATRIX.md`
3. `docs/security/SEC-002-REMEDIATION-REPORT.md`
4. `docs/DEVELOPMENT_LOG.md` (chronological append)

No staging, commit, push, PR creation, merge, deployment, history rewrite, override,
fork, node_modules edit as a fix, audit suppression or dependency upgrade. The proposed
commit supplied by the task remains `fix(portal): address remaining dependency security findings`;
its actual scope is assessment documentation, not a claim of patched dependencies.
All changes remain local for separate authorization/review.

The original UX checkout and user-owned banner commit were not modified. Original HEAD
was `ddc584f...`; external ref drift to `a5cab83...` was observed during this task, with
identical tree content and clean status. Banner SHA-256 remains
`22d1a4a304c2806010493536c824aebba89e4494a7d9aa04365a6bab92ad9203`.
No prohibited repository was inspected as a task target or modified.

## Reproducible dependency baseline

Node **24.13.0**, npm **11.6.2**, macOS. Fresh `npm ci` in SEC-002 installed 278
packages / audited 279 and exited 0; the audit warning did not make installation fail.
`npm ls --all --json` and both `npm explain` commands exited 0. No invalid dependency
tree or manifest/lock inconsistency was reported. The lock stayed byte-identical to
main/SEC-001: SHA-256
`3d6b0320d7a575b0c759d66b029e1fd7c6b728f661b63994349b01ac25bcf5f4`.

Reproduce from the pinned baseline in an isolated Portal checkout with Node 24:

```sh
npm ci
npm ls --all --json
npm explain http-cache-semantics --json
npm explain magicast --json
npm audit --json
```

Do not append an audit ignore/omit flag or interpret expected exit 1 as success.
The npm client prints an environment min-release-age warning; it is not a vulnerability
or an audit bypass. No global npm configuration changed. A Python HTTPS client had a
local trust-store error during source retrieval; system curl with normal certificate
verification succeeded. No TLS bypass was used.

| Evidence scope | Audit before | Audit after | Interpretation |
| --- | --- | --- | --- |
| Main/SEC-002 real lock | one high; exit 1 | one high; exit 1 | No change; cache stays visible |
| SEC-001 independent worktree, identical lock | one high; exit 1 | Not modified/reinstalled here | Confirms baseline, not another additive finding |
| Original local UX, older feature lock | six high + one moderate; exit 1 | Not modified/reinstalled here | Separate legacy feature baseline |
| Ignored full-graph cache 4.3-only scratch lock | real baseline above | zero; exit 0 | Metadata-range candidate only, not adopted or declared fixed |
| Magicast embedded code | manual open residual | manual open residual | Not independently represented by npm audit |

Candidate scratch changed exactly `node_modules/http-cache-semantics`, with no package
paths added/removed. Its compatible graph passed `npm ls --all --package-lock-only --json`.
No candidate lock or npm-audit result was substituted into the real worktree.

## Source verification and candidate rationale

During the original investigation, official registry metadata, versioned tarballs, published advisory API records and
maintainer discussions were captured under `.community-drafts/sec-002/`. Tarball
SHA-512 integrity was verified before extracting selected source/package files.

- Cache 4.2.0 gitHead `83810982b8f8996b101ed761548ea7e87a9132ea`.
- Cache 4.3.0 gitHead `b1d4bd682fbab0252985de45219f4e7497c0067c`.
- source-map-js 1.2.2 gitHead `0a1d334fd1e55a47df97fcd60a7915d46df3b08a`.
- Magicast bundle fingerprint and bounded public API evidence are in the assessment.

No verified upstream cache fix was identified. Relevant function source hashes match
in 4.2/4.3; for example maxAge SHA-256 is
`804a69b3e0f3582c3c56b90d525ad484b01da6d87679714a633e51f7a1d21f31`
in both. Cookie/private/no-store/must-revalidate/proxy-revalidate helper outcomes also
match. 4.3 introduces useful unrelated changes, but a range exit alone cannot satisfy
this task's remediation proof. The inspected Astro 7.4.2 tarball retains Magicast and
the same relevant TTL decision pattern. No broad framework update was justified.

No official fixed Magicast rebuild was found in the original investigation. The external source-map-js upgrade
already present cannot replace its embedded copy. A narrow Portal wrapper would not
intercept all internal library callers; aliases do not rewrite bundled CLI functions.
No permanent dependency patch/fork/postinstall mechanism was introduced. Existing
static architecture and reviewed input boundaries are exposure controls, not code fixes.

## Validation executed, with exact scopes

### Main/SEC-002 baseline

All at `a03d08d...`, unchanged main application source and real main lock:

| Check | Outcome |
| --- | --- |
| Fresh npm ci / full npm ls / owner explains | PASS |
| Astro check | PASS: 120 files, zero diagnostics |
| Production build | PASS: 27 static pages |
| Existing baseline suite | PASS: 53/53 |
| V8 coverage evidence | No Magicast module in check/build; production remote image functions and CachePolicy constructor zero calls |
| Final audit | FAIL/open: one high cache advisory |
| Whitespace / local documentation links | PASS; no lint script configured |

Coverage was collected with temporary NODE_V8_COVERAGE paths, not dependency edits.
It establishes observed normal-path execution, not absence of every possible future
input or integration path. Bounded Magicast/cache probes use synthetic inputs, no
actual cookies, remote requests or resource-exhaustion payloads.

### Explicit feature compatibility source copy

`/private/tmp/aeglysai-portal-sec-002-compat` is an **untracked isolated source copy**,
not a Git merge, branch update or source change in SEC-002. Inputs:

- UX #25 `ca47d9964c05930bc0476f00141b9702915653f4` (includes UX-001A and compatibility tests).
- EVENT #23 `0148e3b9da08b8bdaaf9f41f75884d876fd686b8`.
- Exact main/SEC-002 lock/dependency installation from `a03d08d...`.

UX's already prepared overlapping test resolutions are retained; the log is not used
as a runtime input. Nonconflicting feature files were checked byte-for-byte against
their owning commits. The user's banner-only commit is excluded. No unmerged feature
file is included in SEC-002's proposed diff.

| Compatibility check | Outcome |
| --- | --- |
| Astro check | PASS: 128 files, zero diagnostics on retry |
| Production build | PASS: 27 pages |
| Combined automated suites | PASS: 64/64 |
| Research/mobile navigation Chrome | PASS: 28 cases: seven requested widths × two enhanced themes plus seven widths × two no-JS system themes; zero exceptions |
| Showcase Chrome | PASS: eight viewport/theme cases plus no-JS, isolated synthetic profiles |
| Existing hackathon Chrome | PASS: 1440/768/390px; six cards, nine form links, qualification, timeline, judging, motion, pause, reduced motion, no-JS; no overflow, observed CLS 0 |
| Theme-specific smoke | PASS: mobile 390px and desktop 1440px toggle, persistence across route navigation and return-to-system behavior |

One sandboxed compatibility check attempt exited 139 with macOS
`SecItemCopyMatching failed -50`. Retrying the same Astro check with normal OS access
passed; no type assertion, audit, test or security control was disabled. Do not report
the initial attempt as passing. Browser harnesses terminate their Chrome/HTTP servers.
No Forms submission, private registration data or social endpoint was used.

The combined automated suite verifies seven categories, configuration-only partners,
hidden drafts, shared person roles, filtering, timezone/DST boundaries, consent,
suppression, team limits and schema rejection. Historical source/output/style guards
preserve the original challenges, forms/qualification links, dates, rubrics, research
status and all 27 pages. Chrome/AX-tree checks are not manual screen-reader certification.
Safari/Firefox, physical devices, Linux native execution and production deployment
remain unverified.

## Evidence index and reproduction probes

Ignored evidence directory `.community-drafts/sec-002/` includes:

- `baselines.json`, `baseline-audit-counts.json`, `pr24.json`, `preservation.json`.
- `npm-ci.log`, `npm-ls.json`, `explain-cache.json`, `explain-magicast.json`, `diagnostic-exits.json`.
- `audit-before.json`, `audit-after.json`, `audit-sec001.json`, `audit-ux-local.json`,
  `audit-candidate-cache430.json`, `candidate-lock-tree.json`.
- Versioned registry/advisory JSON, `candidate-integrities.json`, source tarballs,
  `cache-upstream.diff`, `astro-latest-remote.diff` and upstream issue/comment JSON.
- `cache-probe.mjs/json`, `magicast-probe.mjs/json`, `coverage-summary.json`, raw coverage.
- `check.log`, `build.log`, `tests.log`, `compat-check.log` (failed sandbox attempt),
  `compat-check-retry.log`, `compat-build.log`, `compat-tests.log`, `compat-inputs.json`.
- `navigation-browser.log`, `showcase-browser.log`, `hackathon-browser.log`,
  `theme-browser.mjs/log`, and artifact checksums in `evidence-sha256.json`.

Compatibility screenshots/results reside under that copy's ignored `.community-drafts/ux-001a/`,
`event-001/`, `design-005/` and `sec-002-theme/` directories. They are local evidence,
not committed screenshots or deployed assets. Retain/export them if reviewers need
full raw artifacts; versioned sources and the bounded probe below allow reproduction.

This standalone bounded check reproduces Magicast's legacy consumer reachability on
the pinned main lock without altering any installed dependency:

```sh
node --input-type=module <<'NODE'
import { parseModule, generateCode } from 'magicast';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { SourceMapConsumer } = require('source-map-js');
for (const line of [0, 0.5]) {
  let reads = 0;
  const map = { version: 3, sections: [{
    offset: { get line() { reads++; return line; }, column: 0 },
    map: { version: 3, sources: ['input.js'], names: [],
      sourcesContent: ['export const n = 1;'], mappings: 'AAAA' }
  }] };
  if (line === 0.5) assert.throws(() => new SourceMapConsumer(map));
  else new SourceMapConsumer(map);
  reads = 0;
  const mod = parseModule('export const n = 1;', { sourceFileName: 'input.js' });
  const result = generateCode(mod, {
    inputSourceMap: map, sourceMapName: 'output.map', format: false
  });
  assert.equal(reads, 1);
  assert.ok(result.map);
  console.log({ line, embeddedConsumerOffsetReads: reads, generated: true });
}
NODE
```

For the cache comparison, obtain the official versioned dist metadata with
`npm view http-cache-semantics@4.2.0 dist --json` and the corresponding 4.3.0 command.
Verify the downloaded archives' SHA-512 against that metadata, extract only their
package.json/index.js into separate ignored candidate folders, and compare the three
function hashes/probe outcomes listed in the assessment. The captured executable
`cache-probe.mjs` implements this bounded comparison and stubbed Astro call; its
inputs and all results are documented rather than represented as a deployed exploit.

## Final disposition and integration considerations

**Retain both findings open.** No safe, technically proven minimal remediation was
identified in the inspected official releases. Investigation acceptance is complete;
security closure is not. If release timing requires an exception, obtain a named,
explicit, time-limited owner decision covering both findings and review triggers.
No acceptance is inferred from PR #24's merge or ordinary CI results.

The original SEC-002 investigation was based on then-main, without importing unmerged
features. Current publication is independently based on fresh main after EVENT/UX/CI
integration. The original SEC-002 branch is not merged or copied wholesale. Only the
three security documents are reused and refreshed; current main's development log is
preserved in full with a new append. No historical entry or overlapping test resolution
is replaced. No merge or force update is attempted by SEC-002-DOC.

## SEC-002-DOC publication validation and review checkpoint

Current review baseline: `bdc94b28428f7fbf05de6aa949ed43cea46f8ef8` (fresh main,
PR #26 merge). Proposed documentation commit:
`docs(security): document SEC-002 residual dependency findings`.
Branch/worktree: `docs/AEGLYSAI-PORTAL-SEC-002-DOC` at
`/private/tmp/aeglysai-portal-sec-002-doc`. No duplicate SEC-002 documents existed on
this main baseline. The source SEC-002 worktree and its uncommitted log remain intact.

Validation performed for this documentation refresh:

- Verified root, remote, main/PR ancestry and current successful deployment via GitHub
  API. Navigation and CI correction exist in main; success is not a security waiver.
- Current `package.json` and `package-lock.json` byte-match the historical investigation.
  Installed graph versions described by the unchanged lock remain Astro 7.3.4,
  Vite 8.3.3, cache 4.2.0, Magicast 0.5.5 and resolved source-map-js 1.2.2.
- All **72/72 original evidence SHA-256 entries** match files in the retained local
  investigation evidence directory. Cache method/probe, Magicast bounded probe and
  coverage result JSON agree with the documented tables; this task did not rerun those
  behavioral probes or reinterpret limited reachability as remediation.
- Fresh `npm audit --json` against the current main lock, Node 24.21.0/npm 11.19.0,
  exits **1** with **one high** http-cache-semantics finding; no change from SEC-002.
  This is a lockfile audit, not a new dependency installation or runtime validation.
- Primary GitHub advisories rechecked: cache affected `<=4.2.0`, no listed patched
  version; source-map-js affected `>=1.0.0 <1.2.2`, patched external release 1.2.2.
  Historical upstream latest-version claims are explicitly scoped to original evidence,
  not newly claimed registry-wide release research.
- Local Markdown links/paths and repository commit references checked. Dependency
  gitHead references checked against recorded upstream metadata. Bounded credential/
  private-key scan and manual scope review found no credential values, registration
  data, restricted research or sensitive recovery information in the proposed docs.
- Documentation whitespace and exact four-file inventory checks pass. No package,
  lockfile, source, tests, workflows, branding/banner or configuration changes; current
  main's existing development log is retained byte-for-byte before the new append.
- No documentation/lint script is configured in package.json. Per AGENTS.md's
  documentation-only guidance, application check/build/tests were not rerun for this
  prose-only diff. Historical test runs above remain evidence for their pinned inputs;
  current successful hosted Pages run is separately identified, not a newly executed
  local test suite.

Only the three named security documents and append-only development log are proposed.
Reviewable canonical patch/hash and validation evidence are retained locally under
`.community-drafts/sec-002-doc/`; they are not extra proposed source files. Raw historical
artifacts remain local, not publicly uploaded. Reviewers may request a safe evidence
export; no account token or private artifact is automatically published.

**Checkpoint:** local documentation ready for review. No files staged, committed or
pushed; no PR/review/merge or task closure claimed. Obtain explicit scope authorization
before one documentation commit, normal branch push and PR targeting main. Obtain
separate review and explicit authorization before a history-preserving merge, then
verify actual main/PR state before closing SEC-002-DOC or starting another task.
Security-owner acceptance remains **NOT APPROVED** for both residual findings.
