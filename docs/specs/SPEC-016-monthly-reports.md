# SPEC-016 — COM-008B: Draft monthly reporting

Recorded 2026-10-11 before implementation. Scope: Draft monthly reporting in static Astro, preserving portal routes/themes. Status: Draft scaffold IMPLEMENTED and TESTED; upstream contract/publication BLOCKED; no publication/deployment authorization.

Canonical sources: scripts/community for collection/validation/reporting, src/data/community for explicitly reviewed public records, COM-001 contract in [contract provenance](../community/CONTRACTS.md). Fixtures are tests only. Unknown data is unavailable, never zero.

Acceptance: accessible responsive routes/links, source/date attribution, privacy-minimal allowlists, missing-data/error states, no fake counts/claims. VERIFIED plus explicit publication permission and reviewed provenance required for showcases. Only approved closed-period reports may publish. October 2026 remains open; no cumulative-to-monthly reconstruction.

Validation/traceability: scripts/community/*.test.mjs API failure/pagination/validation/permission/aggregation tests and scripts/site.test.mjs route/metadata/assets/privacy checks. See [sprint review](../community/SPRINT_REVIEW.md) for actual results/blockers. COM-003B live intake blocked by absent authorized service; COM-008B final upstream compatibility blocked by upstream commit/approval pending for COM-008A.

## Implemented behavior and requirements-to-tests traceability

Canonical COM-008A 1.0.0 monthly reports now validated with copied upstream schema/semantic code. Exact pinned source bytes, deduplicated references, metric contract/count/coverage checks and immutable revision history; pending/approved/withdrawn publication state. Separate owner approval required, sources/metrics verified, quality complete and month closed. GitHub observation drafts remain distinct and never publish as impact. No reports supplied; October open. See integration guide for inputs/artifacts and version approval limits.

## COM-ARCH-001 architecture update — 2026-10-11

Use [ADR-007](../adr/ADR-007-google-workspace.md) and the [manual export/security workflow](../community/WORKSPACE_EXPORTS.md). Google Forms responder links are externally configured through existing participant/project settings. Private Sheets are administrative source of truth; private Drive stores consent/submission/review evidence. Only approved sanitized JSON enters Portal adapters. No database, client-side Sheets access, private IDs/tokens/emails or unapproved records in public artifacts. Missing links/exports retain coming-soon/unavailable states. Manual review/export initially; automation PLANNED pending verified permissions/privacy. COM-001 evidence contract unchanged; no invented COM-008A replacement.

Acceptance traceability: public-export.test.mjs rejects nested private Workspace IDs/links, emails and credentials; site.test.mjs validates responder URLs reject private/editor/prefilled links and preserves closed states. Existing contracts tests retain status/consent gates. Workspace provisioning and real signed-out form/privacy checks remain pending, not claimed tested.

## COM-INTEGRATION-001 — authoritative contracts, 2026-10-11

[ADR-008](../adr/ADR-008-evidence-contract-integration.md) and [integration guide](../community/INTEGRATION_GUIDE.md) supersede earlier schema/COM-008A absence/mapping statements. Local current upstream bytes and semantic validators copied exactly; version remains 1.0.0, interoperability PROVISIONAL pending approved immutable source commit. Offline Python build/test dependency; bounded parsing and local artifact integrity. Distinct owner digest/ID authorization is mandatory, not source-supplied verification. No approved production records. See [requirements-to-tests](../community/TRACEABILITY.md).

HACK-CHALLENGE-006: the Portal list now has six choices, including AI for Everyday Life as an explicit extension pending COM-003A alignment. Project validation/filtering derives from that list (sixth filter index 5); dashboard/report evidence levels, units and contract schemas remain unchanged. No new participation/adoption counts inferred. [SPEC-019](SPEC-019-everyday-ai-challenge.md) records content, Form mapping and upstream requirements.
