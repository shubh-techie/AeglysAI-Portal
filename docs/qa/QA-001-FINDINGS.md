# QA-001 — Findings, security/privacy assessment and proposed follow-ups

Recorded 2026-10-26 against `f7e9c12414c2795d7ddcdbdcae965d9406101fbb`.
See [release recommendation](QA-001-RELEASE-VERIFICATION.md). Findings describe the
current baseline, not changes introduced by QA. No application regression was reproduced.
Severity reflects release/operational impact; a governance blocker is not an exploit.

| ID | Severity | Finding | Provenance / disposition |
| --- | --- | --- | --- |
| QA-B01 | Blocking | Full security sign-off unavailable while H01/H02 remain unresolved without owner acceptance | Existing release-governance blocker; no waiver created |
| QA-B02 | Blocking | Real showcase publication lacks a verified exact-content/consent/rights/owner packet | Existing CONTENT-001 blocker; current honest empty state is correct |
| QA-H01 | High | http-cache-semantics4.2.0 remains in audit's affected range | Existing SEC-002 issue, still OPEN |
| QA-H02 | High | Magicast0.5.5 still declares inlined source-map-js1.2.1 | Existing manual residual; upstream severity context, Portal exploitability not established |
| QA-M01 | Medium | Repository Pages workflow has no PR trigger or explicit audit step | Previously documented CI gap confirmed; other remote protections not verified |
| QA-M02 | Medium | External event facts differ from the official pending Portal facts | Known REG-001 operational discrepancy, refreshed evidence |
| QA-M03 | Medium | Discord invitation has a fixed Nov14 expiry and needs owner follow-through | Known time-bound operational risk; currently accessible, not expired |
| QA-L01 | Low | Large original JPEG served at72/200px declarations without srcset | Existing asset, newly quantified QA optimization opportunity |
| QA-L02 | Low | Unreferenced brand-kit source images add artifact size | Existing public assets, newly quantified; not initial page-transfer cost |
| QA-L03 | Low | Actions use mutable major-version references | Existing supply-chain hardening opportunity, no compromise demonstrated |
| QA-L04 | Low | Existing browser harnesses reuse fixed artifact paths | Tooling preservation defect observed during QA; prior generated outputs refreshed |
| QA-I01 | Informational | Safari/Firefox/device/manual AT coverage incomplete | Explicit test-environment limit |
| QA-I02 | Informational | No field CWV, INP or Lighthouse score | Bounded lab measurements only |
| QA-I03 | Informational | No CSP or Referrer-Policy response header observed on sampled root response | Hardening review candidate, not proof of exploit |
| QA-I04 | Informational | Static withdrawal requires deployment and may lag600s cache policy | Existing design limitation; no live registry record to withdraw |

## QA-B01 / QA-H01 — Cache advisory remains open

Reproduce under Node24: `npm audit --json`; inspect `vulnerabilities.http-cache-semantics`.
Current result: exit1, one high package group, version4.2.0, reported range `<=4.2.0`,
[GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), reported CVSS7.5.
Path is Astro's transitive production-declared dependency; operational execution is the
build/developer toolchain, not a Node server in the public static Pages site.

Existing [SEC-002 assessment](../security/SEC-002-SECURITY-ASSESSMENT.md) records disputed
semantics and why exiting an audit range alone was not verified remediation. QA did not
re-resolve that upstream dispute or prove a Portal exploit. `fixAvailable` metadata,
deployment success, documentation and lack of an observed browser error are not acceptance.
No `audit fix`, override, suppression or severity downgrade. Proposed separate SEC follow-up:
evaluate a verified upstream correction/rebuild and actual reachability, or seek explicit
documented owner disposition through the existing security process. Not started here.

## QA-H02 — Embedded source-map concern

Reproduce: inspect `node_modules/magicast/package.json` `inlinedDependencies`, or run
`node -p "JSON.stringify(require('./node_modules/magicast/package.json').inlinedDependencies)"`.
Current Magicast0.5.5 declares source-map-js1.2.1 inlined. Resolved external source-map-js
is1.2.2; updating that separate package does not replace embedded code. Prior SEC-002
records the bounded library reachability investigation and
[GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) context.

This is a separately tracked manual residual, not a second npm-audit package group or
an end-to-end visitor exploit proved by QA. Remains OPEN without acceptance. Seek a
verified rebuilt/externalized implementation or separately reviewed alternative; no ad hoc
node_modules/postinstall patch. Code/security-owner review remains necessary.

## QA-B02 / QA-I04 — Publication and withdrawal boundary

Reproduce: both `src/data/community/event-showcase.json` and
`event-showcase-approval.json` are absent; inspect current community output and run
`node --test scripts/community/event-registry.test.mjs` with the established Python parser.
All13 groups passed within the86-test suite, including actual isolated approved, failed
private-field, and empty-replacement builds. No real appointment/profile was introduced.

Manual source review confirmed strict fields/privacy screening, unsafe-link/formula
rejection, approval/consent/suppression gates, stable profile/role references, local asset
rights/digest/containment checks, synthetic rejection, exact snapshot digest/ID/revision/
record-set binding, valid approval/expiry instants and failed-build behavior. Pending,
revoked and withdrawn data does not become public through the tested path. The loader
does not silently fall back when a proposed pair is partial/invalid; both absent preserves
the original withheld configuration.

Attestations/digests do not authenticate people or verify real consent/rights. Lexical
screening cannot recognize all sensitive prose. Source authority, exact copy/role/links,
asset rights and no current withdrawal still need private review. CONTENT-001 inventory
delivery did not authorize publication; do not treat templates, invitations, registration,
the creator profile or synthetic fixtures as event endorsement evidence.

Static suppression/revocation alone cannot remove an already deployed/downloaded file.
Successful replacement build/deploy and cache/history review are necessary. Sampled
production response has `Cache-Control: max-age=600`; current empty state exposes no
unapproved registry data, but future withdrawal timing must account for cached copies.

## QA-M01 / QA-L03 — CI and release controls

Reproduce by reading [deploy-pages.yml](../../.github/workflows/deploy-pages.yml).
It runs on main push/manual dispatch, not pull requests; there is no audit-failing step.
Thus configured post-merge deployment validation is not pre-merge PR validation and
does not enforce npm audit's open finding. Branch-protection/other external checks were
not audited, so no broader claim about all GitHub protections is made.

Positive controls: empty workflow-level permissions; job-scoped contents read and deploy
Pages/OIDC permissions; checkout does not persist credentials; Node from `.nvmrc`;
`npm ci`, pinned offline validator installation, check/build/test before artifact upload;
deploy restricted to main/github-pages environment. No secret added or workflow dispatched.

Actions are referenced by major tags (`@v7`, `@v5`), not immutable commit SHAs. This is
a hardening opportunity, not evidence of compromise or a new CVE. Proposed separate CI
task: reviewed PR verification and audit policy/owner handling, immutable action refs
with an update process, and verification of actual protection settings. Do not implement
an audit bypass or claim this QA supplies the missing policy.

## QA-M02 / QA-M03 — External channel operations

Reproduce signed out: open the Portal external channel section, then the owner-supplied
Unstop/Luma links. Unstop resolves to the Aegython listing and displays a ₹60,000 prize
claim and registration counter; Luma metadata exposes Nov6–28,2026 dates, Ranchi/offline
and national scope. Portal remains dates/eligibility pending, prize proposed/unconfirmed,
with its established qualification and finalist-review process. Do not turn external
claims into approved Portal facts or sum platform counts. The discrepancy notice and
official-authority copy mitigate but do not reconcile the messaging.

All seven official responder GETs and Unstop/Luma URLs returned200. No registrations,
payments, logins, roster exports or API capabilities were tested. Proposed separate owner
operation: align approved facts on the external platforms without automatically changing
Portal dates/rules. Real reconciliation remains a separately approved private process.

Discord public invite API returned200, matching configured code/server; expiry is
**November14,2026 at13:57:16 UTC**. Reproduce with the public invite API URL using
`with_expiration=true`; no authentication/join needed. Current validity does not promise
availability after expiry. Owner should renew/recheck before that instant and before a
later release; keep the one central configuration and do not silently open2027 registration.

## QA-L01 / QA-L02 — Asset efficiency

Reproduce with the asset inventory and public JPEG metadata in
[performance observations](QA-001-PERFORMANCE.md). The1829×1696 portrait is503,867 bytes,
declared200×200 or72×72 in generated pages, lazy-loaded with no srcset. It accounts for
about65% of the779,506 bytes of unique referenced first-party files. Observed lab timing
does not make this an active page-load failure; optimization is a separate scoped task.
Preserve the original and approved identity/rights; review smaller derivatives/srcset
and unnecessary metadata without changing publication facts. EXIF exists; no GPS IFD was
found by the bounded check, which is not exhaustive metadata/privacy certification.

Three unreferenced brand-kit PNG files total5,523,850 bytes of the8,676,165-byte build.
They enlarge distribution but were not referenced page assets, so do not attribute their
whole size to page transfer/LCP. Separately review public artifact packaging while
preserving original assets and the excluded banner. No asset deleted/resized in QA.

## QA-L04 — Generated evidence overwrite limitation

Reproduce: run an existing homepage/navigation/2026 harness twice; its fixed ignored
output directory is reused. QA runs refreshed earlier generated screenshots/results in
those locations before a pre-run archive was made. This does not show a product regression,
but prevents claiming every previous generated artifact was preserved byte-for-byte.
Prior per-task logs and historical worktrees remain untouched; source/assets/user-authored
work were not modified. Current evidence is archived under the QA root with checksums.

Proposed separate tooling task: accept an output root/run ID or isolate a copy before
execution; keep immutable per-run manifests. Do not fabricate/reconstruct old screenshot
evidence or silently relabel new outputs as historical verification. No tooling change
is included in this documentation diff.

## QA-I01 / QA-I02 / QA-I03 — Limits and hardening observations

Safari26.6.2 is installed, but the read-only WebDriver probe timed out before a usable
session was obtained; driver terminated without enabling settings. Firefox not installed
in checked application/command locations. No real mobile device/manual screen-reader
session, full WCAG audit, field/INP measurement or Lighthouse execution. See
[accessibility](QA-001-ACCESSIBILITY.md) and [performance](QA-001-PERFORMANCE.md).

Sampled production root response lacks CSP and Referrer-Policy headers; all audited
external anchor URLs are HTTPS and new-tab anchors have noopener. This is a separately
scoped hosting/header threat-model review candidate, not proof of XSS/data disclosure.
Existing inline scripts and Pages header capabilities must be considered before any
policy change; do not add a breaking meta policy as part of QA.

No separate follow-up task was started. QA-001 itself still needs formal review/closure.
