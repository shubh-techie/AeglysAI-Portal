# Architectural decision records

Add an ADR when making an important architectural decision, such as changing the rendering model, hosting platform, content system or application boundaries. This directory currently contains guidance only; no historical decision or approval is reconstructed here.

Use sequential filenames such as `ADR-001-short-title.md`. Include:

- Title and identifier.
- Actual recording date and status: proposed, accepted, superseded or rejected.
- Context and constraints.
- The decision and scope.
- Alternatives considered and tradeoffs.
- Consequences and validation needs.
- Supporting specifications, implementation references and any superseding ADR.

Do not backdate a record. If documenting an existing choice retrospectively, say so explicitly, use the current recording date and cite the evidence; do not invent past rationale, alternatives or acceptance. Keep earlier decisions available when superseded and explain the relationship to the new record.

Read [AGENTS.md](../../AGENTS.md) first and record meaningful decisions in [DEVELOPMENT_LOG.md](../DEVELOPMENT_LOG.md).


## Current architecture reference — 2026-10-07

The [README architecture section](../../README.md#frontend-architecture-and-content-ownership)
records the implemented frontend at `74c2963`: static Astro/TypeScript/CSS, repository-owned
data/assets, existing GitHub Pages hosting, inline theme and scoped media carousel scripts.
[Media Coverage](../specs/SPEC-009-media-coverage.md) uses native DOM/CSS scrolling; commit
`85332d9` made no package.json/package-lock.json change. External publisher image URLs are
an asset availability dependency, not a new npm library or content backend. This is a
source-derived description, not a newly accepted architectural decision. No ADR has been
invented, replaced or backdated; previous decision-record guidance is preserved.

Speaking follow-up (2026-10-07): [SPEC-010](../specs/SPEC-010-speaking-presentations.md)
extends the same static data/component boundary with approval-gated local PDFs and a
native iframe viewer. No PDF rendering npm library or new hosting/backend decision is
introduced. The optional first-page authoring helper uses existing macOS sips or optional
system pdftoppm; it is not a production build/browser dependency. No new ADR is invented.

Speaking consolidation (2026-10-08): SPEC-010 extends the same typed static model with
explicit participation status and nullable slide assets. Publications retains project.ts papers;
presentations.ts owns all public talks and optional references to those papers. Shared components
render listing/details; no database, client router or new library. Private invitation/evidence
records stay outside this public repository; public metadata contains no private document paths.
This is a current architecture note, not a reconstruction of historical decision rationale.

Speaking UX follow-up (2026-10-08): engagement cards and featured wrapper reuse canonical
presentation records through a derived speakingView; engagement/slide availability are separate.
Native radio controls plus CSS :has filter the gallery without a new script/library. Unsupported
:has browsers keep every engagement visible. The shared PresentationCard now focuses on topics
and slide availability; detail/PDF conventions remain. See SPEC-010 for current composition.

PORTAL-SPEAKING-FINAL closure: same static records and detail route template; Acceptance Sent
adds an evidence-gated status, not another conference store. Shared SpeakerProfile consumes
creator.ts/photo; docs/speaking/SPEAKING_EVIDENCE_TRACKER.md is an artifact inventory outside
runtime metadata, with no private correspondence paths. No dependencies or hosting changes.

## Community sprint contracts — 2026-10-11

- [ADR-001-github-metrics](ADR-001-github-metrics.md)
- [ADR-002-hackathon-submissions](ADR-002-hackathon-submissions.md)
- [ADR-003-impact-dashboard](ADR-003-impact-dashboard.md)
- [ADR-004-project-showcase](ADR-004-project-showcase.md)
- [ADR-005-adoption-showcase](ADR-005-adoption-showcase.md)
- [ADR-006-monthly-reports](ADR-006-monthly-reports.md)

- [ADR-007 — Google Workspace administration](ADR-007-google-workspace.md): approved COM-ARCH-001 decision; manual sanitized exports.

- [ADR-008 — authoritative community contracts](ADR-008-evidence-contract-integration.md): provisional exact schemas, offline semantic validation and owner publication gates.

- [ADR-009 — challenge architecture SVGs](ADR-009-challenge-architecture-visuals.md): safe local vectors and shared card/detail rendering.

- [ADR-010 — sixth Portal challenge](ADR-010-everyday-ai-portal-extension.md): explicit COM-003A extension provenance and unchanged evidence schemas.

- [ADR-011 — Scoped international event landing](ADR-011-scoped-hackathon-event-landing.md): exclusive landing components/styles; unchanged shared routes, policy and intake.

- [ADR-013 — Controlled sanitized showcase snapshot](ADR-013-approved-public-showcase-registry.md): EVENT-002 export/review/build boundary extending the existing static showcase and private Workspace separation.
