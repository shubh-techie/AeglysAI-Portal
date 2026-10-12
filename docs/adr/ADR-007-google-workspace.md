# ADR-007 — AEGLYSAI-COM-ARCH-001: Google Workspace administration

Date: 2026-10-11. Status: accepted by explicit user architecture decision; local implementation, not provisioned or deployed. Applies to COM-003B, COM-004, COM-006, COM-007B and COM-008B. Complements ADR-002 through ADR-006; replaces their unspecified private-service choice with Google Workspace.

## Context and decision

The Portal is static Astro with no database. Use externally configured Google Forms responder links for registration/submission, private Google Sheets as administrative source of truth and private Google Drive for consent, submissions and review evidence. Portal source contains only approved, sanitized JSON exports. Existing hackathonForms participant/project settings are canonical; null/closed settings retain unavailable states. No database, browser Sheets access, Workspace credentials, private identifiers or integration SDK introduced.

Private administration stays outside this public repository. Initial export/review is manual: see [workflow/security guidance](../community/WORKSPACE_EXPORTS.md). Existing COM-001 evidence 1.0.0 governs public aggregates; existing portal observation/project adapters retain their established formats. COM-008A is now available locally; provisional reports cannot be represented as compatible final reports or published. No new upstream evidence contract invented.

## Alternatives and consequences

Database or direct browser Sheets access rejected by explicit scope/privacy constraints. Automatic Workspace exports deferred until permissions and privacy controls are verified and separately authorized. Manual exports cost administrator time and may lag; source timestamps, missing states and review gates make this explicit. Public review references must point to sanitized public provenance, never private Sheets/Drive. A privacy pattern gate supplements existing schema/consent checks but cannot determine whether arbitrary prose or identifiers are confidential; human review remains mandatory.

## Acceptance and validation

Configured responder URLs must be HTTPS Google Forms with no credentials, queries, fragments or editor paths. Missing links remain closed. Every public input is privacy-screened before existing contract/status/consent validation. Tests reject nested private fields, contacts, Workspace evidence URLs and token patterns; generated-output regressions check links/privacy. Real Workspace provisioning, signed-out form checks and administrative permissions are pending; no private service accessed.

COM-003B-FIX-001 correction (2026-10-11): current one-hackathon rules supersede the retained three-event proposal. Reuse canonical five challenge choices and shared HackathonRules component; keep old detail URLs as explicitly retired compatibility pages. Google Meet handles finalist demos, private Sheets verify individually selected rosters and scores, Forms collect three distinct stages. Static Portal cannot enforce private team membership or verify actual submissions; administrator gates required. No new database/library or private-data API.

COM-INTEGRATION-001 update: [ADR-008](ADR-008-evidence-contract-integration.md) governs exact local upstream contracts, offline Python validators, separate owner approvals and provisional release compatibility. Earlier Portal-only adoption/report shapes and COM-008A absence claims are superseded; no upstream version altered. GitHub observations and project metadata remain distinct from reviewed community evidence.

COM-PIN-001: [published source provenance](../community/CONTRACTS.md) supersedes local-only/source-approval blockers for the four pinned evidence contracts. All schema/validator/fixture bytes match public main revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee. Data publication, consent, independence and immutable report review remain separately gated; no synthetic activity published.
