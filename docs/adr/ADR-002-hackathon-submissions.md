# ADR-002 — COM-003B: Submission verification

Date 2026-10-11. Status proposed for review; implemented locally, not approved for production.

Context: static GitHub Pages portal with no backend/analytics; evidence/privacy rules forbid inferred adoption or public participant intake.
Decision: reuse Astro/design tokens and strict reviewed public content. Collector/reports run offline/CI as draft authoring, never runtime browser API calls. Intake delegates only to configured approved private responder service; missing service stays closed. COM-001 versioned evidence contract governs reviewed aggregates; COM-008A is now integrated locally; upstream approval and owner publication authorization remain required.
Alternatives: database/CMS/serverless writes rejected as unnecessary/unauthorized; public GitHub issue submissions rejected for privacy.
Consequences: reviewer action needed to approve records; unavailable states remain until real evidence/consent/service exist. Test privacy gates/failure paths and existing routes. SPEC-012 and sprint review record validation.

## COM-ARCH-001 update — 2026-10-11

The approved private administration choice is Google Forms, private Google Sheets and private Google Drive; public Portal data is a manual, reviewed sanitized JSON export. [ADR-007](ADR-007-google-workspace.md) governs this boundary and replaces the previously unspecified service choice. No browser Sheets API, database or export automation. Missing Forms/exports remain unavailable. COM-001 remains authoritative and owner/data authorization and closed-period evidence gate final reports.

COM-003B-FIX-001 correction (2026-10-11): current one-hackathon rules supersede the retained three-event proposal. Reuse canonical five challenge choices and shared HackathonRules component; keep old detail URLs as explicitly retired compatibility pages. Google Meet handles finalist demos, private Sheets verify individually selected rosters and scores, Forms collect three distinct stages. Static Portal cannot enforce private team membership or verify actual submissions; administrator gates required. No new database/library or private-data API.

COM-PIN-001: [published source provenance](../community/CONTRACTS.md) supersedes local-only/source-approval blockers for the four pinned evidence contracts. All schema/validator/fixture bytes match public main revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee. Data publication, consent, independence and immutable report review remain separately gated; no synthetic activity published.
