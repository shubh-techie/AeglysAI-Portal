# SPEC-015 — COM-007B: Independent adoption evidence

Recorded 2026-10-11 before implementation. Scope: Independent adoption evidence in static Astro, preserving portal routes/themes. Status: IMPLEMENTED and TESTED locally; READY_FOR_REVIEW; no publication/deployment authorization.

Canonical sources: scripts/community for collection/validation/reporting, src/data/community for explicitly reviewed public records, COM-001 contract in [contract provenance](../community/CONTRACTS.md). Fixtures are tests only. Unknown data is unavailable, never zero.

Acceptance: accessible responsive routes/links, source/date attribution, privacy-minimal allowlists, missing-data/error states, no fake counts/claims. VERIFIED plus explicit publication permission and reviewed provenance required for showcases. Only approved closed-period reports may publish. October 2026 remains open; no cumulative-to-monthly reconstruction.

Validation/traceability: scripts/community/*.test.mjs API failure/pagination/validation/permission/aggregation tests and scripts/site.test.mjs route/metadata/assets/privacy checks. See [sprint review](../community/SPRINT_REVIEW.md) for actual results/blockers. COM-003B live intake blocked by absent authorized service; COM-008B source contract pinned; final activity publication blocked by owner/data approval.

## Implemented behavior and requirements-to-tests traceability

Route /community/adoption/: canonical upstream adoption 1.0.0 document with separate owner ID allowlist. Verified current assertions only; superseded/withdrawn hidden. Independence and executed outcome required for independent claims, citations/usage distinguished. No records supplied. See integration guide for exact fields and correction semantics.

## COM-ARCH-001 architecture update — 2026-10-11

Use [ADR-007](../adr/ADR-007-google-workspace.md) and the [manual export/security workflow](../community/WORKSPACE_EXPORTS.md). Google Forms responder links are externally configured through existing participant/project settings. Private Sheets are administrative source of truth; private Drive stores consent/submission/review evidence. Only approved sanitized JSON enters Portal adapters. No database, client-side Sheets access, private IDs/tokens/emails or unapproved records in public artifacts. Missing links/exports retain coming-soon/unavailable states. Manual review/export initially; automation PLANNED pending verified permissions/privacy. COM-001 evidence contract unchanged; no invented COM-008A replacement.

Acceptance traceability: public-export.test.mjs rejects nested private Workspace IDs/links, emails and credentials; site.test.mjs validates responder URLs reject private/editor/prefilled links and preserves closed states. Existing contracts tests retain status/consent gates. Workspace provisioning and real signed-out form/privacy checks remain pending, not claimed tested.

## COM-INTEGRATION-001 — authoritative contracts, 2026-10-11

[ADR-008](../adr/ADR-008-evidence-contract-integration.md) and [integration guide](../community/INTEGRATION_GUIDE.md) supersede earlier schema/COM-008A absence/mapping statements. Local current upstream bytes and semantic validators copied exactly; version remains 1.0.0, source pin PUBLISHED_MAIN_VERIFIED; activity publication separately gated. Offline Python build/test dependency; bounded parsing and local artifact integrity. Distinct owner digest/ID authorization is mandatory, not source-supplied verification. No approved production records. See [requirements-to-tests](../community/TRACEABILITY.md).

COM-PIN-001: [published source provenance](../community/CONTRACTS.md) supersedes local-only/source-approval blockers for the four pinned evidence contracts. All schema/validator/fixture bytes match public main revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee. Data publication, consent, independence and immutable report review remain separately gated; no synthetic activity published.
