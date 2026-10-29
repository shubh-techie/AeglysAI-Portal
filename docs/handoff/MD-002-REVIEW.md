# MD-002 — Model D research and architecture alignment

Recorded2026-10-29. IMPLEMENTED locally; awaiting owner review. No staging, commit,
push, PR creation, merge, deployment, source artifact publication or security waiver.

## Baseline

Target AeglysAI-Portal; correct primary checkout/remote verified. FINAL001 PR37 merged
e56b1b79c79a21b5d5d20539462425b18c576e2a. BRAND001 PR38 merged
8e59328c4427177f797f7dce9d6edfcad37d638a. New branch
fix/AEGLYSAI-PORTAL-MD-002-research-status-alignment starts from that freshly fetched main.
BRAND branch/commit preserved; no dirty work or duplicate feature code copied. No unrelated
repository accessed or modified; Research is read-only reference only.

## Evidence and claim boundaries

Research checkout530da21f95e6ad863e3e4c121f79564dbb4b9527, clean before/after audit.
Read policy/agent instructions, docs/aeglysai/specs/SPEC-020-BEHAVIORAL-INFERENCE.md,
research/modeld/README.md, research/acceptance/{REPORT,MATRIX,HANDOFF}.md and
research/results/modeld010-evidence/README.md. Existing frozen reports were inspected,
not rerun; no metrics, counts, thresholds, raw artifacts, weights or implementation copied.
Research public-sharing/security/legal blockers are not waived by this status summary.
Prior high-level boundaries remain in [FINAL evidence](FINAL-001-RESEARCH-EVIDENCE.md).

| Capability | Previous current display | Updated classification | Evidence and limits |
| --- | --- | --- | --- |
| Models A–C policy/contextual rules | Implemented | Implemented baseline, solid | Recorded separate-repo implementation; no new effectiveness audit |
| Model D card/ring | Complete text but planned/dashed styling | Research implementation complete, double boundary and text | Bounded offline scope; no enforcement |
| Offline behavioral inference | Behavior/behavioral intelligence planned | Research implementation complete, experimental | SPEC020/modeld/frozen acceptance; synthetic internal checks only |
| Eligibility/drift diagnostics | No separate completed scope | Research implementation complete, bounded | Acceptance matrix: generalized robustness unresolved; not mature drift monitoring |
| Experimental recommendation integration | All adaptive decisions planned | Offline integration complete, non-enforcing | SPEC020 acceptance: enforcement_authority=NONE |
| In-memory mock-feedback simulation | All feedback planned | Research implementation complete within isolated offline panel | Effectiveness unestablished; not real incident-response assurance |
| Production telemetry | Planned | Planned extension, dashed | No live integration established by frozen evidence |
| Production adaptive decision/control | Planned but visually adjacent to outcome vocabulary | Planned extension, separate panel | No Model D enforcement authority or authorization-readiness claim |
| Continuous live feedback | Planned | Planned extension, dashed | Mock simulation does not establish a production loop |
| Independent field validation | Unestablished | Remains unestablished | Internal acceptance is not external validation |

## Presentation and accessibility

Shared architecture figure on home/system page now separates baseline outcomes from
D evidence/recommendations and planned operational extensions. Concise three-state legend
uses words and solid/double/dashed borders. No arrows imply a D grant/denial. D card and
hero ring use completed experimental styling; labels/descriptions remain meaningful
without color. Mobile research nodes stack; labels wrap, NONE is readable. Existing routes,
themes, keyboard navigation and content remain. Static diagrams introduce no focus trap or
new interactive controls. Research page already states completed work/limitations accurately;
its A–C cards retain baseline state and D's dedicated section stays non-enforcing.

## Validation

Final results recorded below after checks. Raw evidence stays in ignored .community-drafts/md-002,
with before/after screenshots/results isolated from earlier tasks. Test-only explicit inverse
deltas retain historical byte assertions and reject unreviewed bytes; new live-output tests
assert three categories, correct nodes, D card and policy-outcome separation. Existing tests
were not removed to make checks pass. Historical documents and old fixtures remain historical.

## Limitations and release boundaries

Research safety/effectiveness/publication/security conclusions not independently audited.
No production enforcement, field validation, institutional/commercial readiness, mature drift
monitoring or closed-loop production feedback claimed. No protected data/assets published.
Open disputed http-cache-semantics high advisory and separate Magicast embedded source-map
concern remain OPEN/unsuppressed; no dependency/lockfile/workflow/security-control changes.
No new Lighthouse/field-CWV or full-WCAG certification. Safari/Firefox/physical-device/manual
screen-reader coverage unavailable. Real profiles remain approval-controlled and unpublished.
No Workspace/form writes. Owner/privacy/disclosure/security review still required before
publication. Canonical combined diff hash is kept outside tracked documents to avoid self-reference.

### Final local results

- Node24.22.1/npm11.19.1; Astro check167files,0errors/warnings/hints; production28pages;118/118automated tests,0failed/skipped.
- Before and after browser matrices:84cases each (3routes ×7widths ×2themes ×JS/noJS),0recorded runtime exceptions/overflow/image errors. After checks assert readable textual legend, completed nodes, D card state and isolated authority boundary. Widths320/375/390/430/768/1024/1440; both themes. Browser Chrome156. No new interactive diagram controls.
- Manually inspected after architecture320dark and1440dark screenshots: legend wraps, nodes remain readable and status panels separate without horizontal page overflow. Screenshots include home/research/architecture and hero before/after at320/1440 in both themes.
- Only index.html, research/index.html and architecture/index.html differ; other25HTML outputs byte-identical to baseline. Dependencies/public assets/lockfile/workflow unchanged;219archived QA files unchanged. Generated output excludes private/demo markers and preview route.
- Local Research HEAD530da21f unchanged and tree clean. No new Research test/reproduction performed. No unsupported Model D production capability marked complete.

### Before/after evidence paths (local only)

Under .community-drafts/md-002/: before/architecture-1440-dark.png and after/architecture-1440-dark.png; before/architecture-320-dark.png and after/architecture-320-dark.png; before/hero-1440-dark.png and after/hero-1440-dark.png. before/results.json and after/results.json retain all cases. check.log/build.log/tests.log/scans.json contain bounded validation evidence. Earlier exploratory harness errors (lazy image/old selector and a test that assumed D had a Research card) were corrected in test harness/assertions; no production feature workaround or dropped test coverage.

## Exact uncommitted inventory (13 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/handoff/MD-002-REVIEW.md`
- `docs/specs/README.md`
- `docs/specs/SPEC-029-model-d-status-alignment.md`
- `scripts/community/brand001-preservation.mjs`
- `scripts/community/homepage.test.mjs`
- `scripts/community/md002-preservation.json`
- `scripts/community/md002-preservation.mjs`
- `scripts/community/md002.test.mjs`
- `src/components/ArchitectureDiagram.astro`
- `src/components/ModelCard.astro`
- `src/pages/architecture.astro`
- `src/pages/index.astro`
