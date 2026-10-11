# SPEC-017 — COM-005 integration: public-safe contributor recognition

Scope: integrate existing upstream recognition 1.0.0 into the community impact page; not a new onboarding/identity service. IMPLEMENTED locally, compatibility PROVISIONAL. [ADR-008](../adr/ADR-008-evidence-contract-integration.md) and [integration guide](../community/INTEGRATION_GUIDE.md).

recognition.json is the exact upstream schema document; draft/published/withdrawn and consent not-requested/granted/withdrawn remain distinct. Accepted contribution, public-attribution consent and source publication review required; separate owner digest and ID allowlist authorizes public display. Artifact-only and anonymous credit only; no personal profiles inferred. Withdrawal minimization preserves a contract tombstone and removes public credit. Unknown fields/versions, invalid withdrawal, missing permission and synthetic records cannot publish.

Impact page shows truthful unavailable state until inputs are approved. Existing themes/semantic headings/link labels retained, no new route or browser script. Tests integration.test.mjs cover upstream positive/negative fixtures, synthetic/missing-owner rejection, accepted consented credit and withdrawal/status failure; site.test.mjs covers generated links/landmarks/privacy. No actual contributor or consent claimed. Private consent/admin storage stays in Google Workspace.
