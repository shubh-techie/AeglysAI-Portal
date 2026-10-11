# ADR-001 — COM-002: Verified GitHub metrics

Date 2026-10-11. Status proposed for review; implemented locally, not approved for production.

Context: static GitHub Pages portal with no backend/analytics; evidence/privacy rules forbid inferred adoption or public participant intake.
Decision: reuse Astro/design tokens and strict reviewed public content. Collector/reports run offline/CI as draft authoring, never runtime browser API calls. Intake delegates only to configured approved private responder service; missing service stays closed. COM-001 versioned evidence contract governs reviewed aggregates; COM-008A is now integrated locally; upstream approval and owner publication authorization remain required.
Alternatives: database/CMS/serverless writes rejected as unnecessary/unauthorized; public GitHub issue submissions rejected for privacy.
Consequences: reviewer action needed to approve records; unavailable states remain until real evidence/consent/service exist. Test privacy gates/failure paths and existing routes. SPEC-011 and sprint review record validation.

COM-INTEGRATION-001 update: [ADR-008](ADR-008-evidence-contract-integration.md) governs exact local upstream contracts, offline Python validators, separate owner approvals and provisional release compatibility. Earlier Portal-only adoption/report shapes and COM-008A absence claims are superseded; no upstream version altered. GitHub observations and project metadata remain distinct from reviewed community evidence.
