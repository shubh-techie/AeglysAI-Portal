# SPEC-011 — COM-002: Verified GitHub metrics

Recorded 2026-10-11 before implementation. Scope: Verified GitHub metrics in static Astro, preserving portal routes/themes. Status: IMPLEMENTED and TESTED locally; READY_FOR_REVIEW; no publication/deployment authorization.

Canonical sources: scripts/community for collection/validation/reporting, src/data/community for explicitly reviewed public records, COM-001 contract in [contract provenance](../community/CONTRACTS.md). Fixtures are tests only. Unknown data is unavailable, never zero.

Acceptance: accessible responsive routes/links, source/date attribution, privacy-minimal allowlists, missing-data/error states, no fake counts/claims. VERIFIED plus explicit publication permission and reviewed provenance required for showcases. Only approved closed-period reports may publish. October 2026 remains open; no cumulative-to-monthly reconstruction.

Validation/traceability: scripts/community/*.test.mjs API failure/pagination/validation/permission/aggregation tests and scripts/site.test.mjs route/metadata/assets/privacy checks. See [sprint review](../community/SPRINT_REVIEW.md) for actual results/blockers. COM-003B live intake blocked by absent authorized service; COM-008B source contract pinned; final activity publication blocked by owner/data approval.

## Implemented behavior and requirements-to-tests traceability

Collector: public repository metadata plus fully paginated PRs(all states), issues(excluding PR objects), releases(excluding drafts) and attributed contributors(excluding owner/bots). Stable numeric IDs deduplicate list responses. Bounded retry/backoff and Retry-After/reset handling; unsafe next origins, repeated links or incomplete pagination fail closed. Missing values null with category-only diagnostics. UTC observation timestamp, source URLs and limitations; no author identities stored. Optional rolling 14-day traffic requires explicit ALLOW_GITHUB_TRAFFIC=1 plus a purpose-supplied GITHUB_METRICS_TOKEN. No existing credentials discovered automatically. Live draft .community-drafts is ignored, never imported by the site. Review manifest approved+digest+public review URL required for public metrics. Test mapping metrics.test.mjs + contracts.test.mjs. No historical stars/forks inferred. Scheduled collection is shared with draft report workflow, not automatic publication.

## COM-INTEGRATION-001 — authoritative contracts, 2026-10-11

[ADR-008](../adr/ADR-008-evidence-contract-integration.md) and [integration guide](../community/INTEGRATION_GUIDE.md) supersede earlier schema/COM-008A absence/mapping statements. Local current upstream bytes and semantic validators copied exactly; version remains 1.0.0, source pin PUBLISHED_MAIN_VERIFIED; activity publication separately gated. Offline Python build/test dependency; bounded parsing and local artifact integrity. Distinct owner digest/ID authorization is mandatory, not source-supplied verification. No approved production records. See [requirements-to-tests](../community/TRACEABILITY.md).

COM-PIN-001: [published source provenance](../community/CONTRACTS.md) supersedes local-only/source-approval blockers for the four pinned evidence contracts. All schema/validator/fixture bytes match public main revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee. Data publication, consent, independence and immutable report review remain separately gated; no synthetic activity published.
