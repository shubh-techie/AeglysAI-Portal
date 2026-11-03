# SPEC-028 — Coordinated Portal completion

Recorded2026-10-26 for FINAL-001. Local implementation pending owner review, no release
or maintenance activation. Initial main d71c03e; working base94a38f8 preserved the then-draft
PR36 dependency. Final remote refresh confirms PR36 merged as cf9d9ef with successful Pages
deployment; its tree equals the working base. No duplicate/cherry-picked preview code or
agent merge. Scope is split into UI/approved contracts, research status and handoff.

## Acceptance

- Existing2026 EventNav retains Challenges/Qualification/Timeline/Awards/Judging/FAQs/
  Full rules, adding People & Partners to the approved showcase and Community to the
  existing support heading. Keyboard/focus/active/hover/native anchors and wrapping
  layouts must work at320/375/390/430/768/1024/1440, both themes and without JS.
- Existing People & Partners renderer gains circular presentation on its public route,
  accessible filtering and explicit consent/rights/affiliation/role gates. No records
  seeded. Participant/rules/forms/challenges/team-size/dates and2027 remain intact.
- EVENT-002 v1.1 adds Speaker and Organizer person categories; v1.0 remains accepted for
  its original categories. New categories under v1.0 reject. Owner and snapshot versions
  must match; all digests/consent/withdrawal/asset restrictions continue. Keynote Speaker
  remains separate. Operator mapping never upgrades an unconfirmed speaker to keynote.
- People source stays private and preview-only, with Pending/Approved/dropdown/multi-role
  behavior and original photos retained. No automatic publishing/ADC bypass/public feed.
- Model D status follows only the bounded verified offline Research acceptance: research
  implementation complete, experimental, enforcement_authority=NONE. Internal synthetic
  checks are not external effectiveness, commercial readiness or security/distribution
  clearance. Retain drift/mock-feedback failures and external-validation limitations.
- Preserve all historical byte fixtures. New test-only projection pins both current bytes
  and explicit FINAL-001 inverse deltas before applying old assertions. New live-output
  tests independently require new navigation/status/version semantics; unpinned edits fail.
- Check/build/full suite, existing browser/navigation/site matrices, new focus/scroll/role
  checks, privacy/credential/output scans and open audit findings must be reported truthfully.

No new backend/CMS/database/dependency, research artifact copy, profile publication,
security waiver or Git/production action. Delivery is a review checkpoint only. Full
[release review](../handoff/FINAL-001-REVIEW.md),
[evidence boundaries](../handoff/FINAL-001-RESEARCH-EVIDENCE.md) and
[maintenance runbook](../handoff/PORTAL-MAINTENANCE.md).

## CI-003 — Clock-aware historical report guards, 2026-11-03

IMPLEMENTED locally for review, no deployment: retain every existing historical byte pin
while validating the reports archive's live UTC open period independently. The page already
renders the current UTC month; FINAL-001 pins recorded October2026, whereas TIME-001A pins
recorded November2026. Only the exact paragraph's validated current month projects to its
historical value for byte comparisons. Stale, missing, duplicate or invalid periods fail;
all non-period bytes remain protected. No global normalization or stale production output.

Actual Pages41681904433 on merged main17d159e failed npm test with four reports-route pin
errors; preceding main14f3637 reproduces the same four with pinned Python setup. Five earlier
local contract failures were missing-jsonschema environment failures, not hosted failures.
Four new tests cover raw current output, month/year/leap transitions, both original pins,
Buffer behavior, tamper rejection and isolation from the five approved timeline endpoints.
Two TIME-001A hash loops retain their original November target for future rollovers.

Unchanged workflow shell commands pass in an isolated repaired copy:130/130 tests, no skips;
175-file Astro check clean;28-page build. All28 HTML files byte-identical to main;96responsive/
theme/JS/no-JS browser cases,16registration cases and28-route rendering pass. No application,
workflow, dependency, configuration or security-control change. Existing environment and
artifacts preserved; security findings OPEN. Hosted CI and authorized release/production
verification remain required; see [CI-003 review](../qa/CI-003-REVIEW.md).
