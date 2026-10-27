# Specifications

Add or update a SPEC when implementing significant functionality. Specifications below document their stated scope and status; they do not imply that the separate AeglysAI research specification has been finalized.

Use sequential filenames such as `SPEC-001-short-title.md`. Include:

- Title, identifier, actual recording date and revision context.
- Problem, intended behavior, scope and exclusions.
- Requirements and acceptance criteria.
- Relevant routes, data, accessibility and deployment constraints.
- Clear IMPLEMENTED, PLANNED or EXPERIMENTAL status for each relevant capability.
- Validation plan and outcomes actually observed.
- Open questions, related ADRs and implementation/evidence references.

Separate proposed behavior from existing behavior. For a retrospective specification, identify it as such and cite the source code or commits it describes. Do not backdate it or present it as a previously approved document.

The separate AeglysAI research repository owns its research specification and finalized hypotheses. Do not invent them in this portal repository. Use the root [README.md](../../README.md) and [development log](../DEVELOPMENT_LOG.md) for the current portal baseline and pending work.

Follow the reading order and development workflow in [AGENTS.md](../../AGENTS.md).

## Specifications

- [SPEC-001 — Creator profile and research identity](SPEC-001-creator-profile.md): PORTAL-003 implementation and portrait fallback requirements.
- [SPEC-002 — aegisai.world root-path migration](SPEC-002-custom-domain.md): PORTAL-005 production URL configuration, occurrence audit and validation requirements.

- [SPEC-003 — Community hackathon program](SPEC-003-hackathon-program.md): planned events, configurable community roles and registration integrity.

- [SPEC-004 — Speakers, judges and participation workflow](SPEC-004-participation-workflow.md): PORTAL-006 public profiles, configurable forms, privacy and invitation templates.

- [SPEC-005 — Communications and launch readiness](SPEC-005-launch-readiness.md): PORTAL-007 templates, operations, proposed scoring and social metadata.

- [SPEC-006 — Production domain migration to aeglysai.com](SPEC-006-aeglysai-domain.md): PORTAL-008 origin-only migration, URL audit and validation.

- [SPEC-007 — AegisAI → AeglysAI brand migration](SPEC-007-aeglysai-brand.md): PORTAL-009 current identity, social card and classified historical/compatibility references.

- [SPEC-008 — Light/dark theme system](SPEC-008-light-dark-theme.md): PORTAL-010 preference, accessibility and minimal-script requirements.

- [SPEC-009 — Media Coverage](SPEC-009-media-coverage.md): verified publisher-reported metadata, six external articles, publisher image thumbnails/fallbacks, responsive all-six carousels on Home and /media/.

- [SPEC-010 — Speaking & Presentations](SPEC-010-speaking-presentations.md): approval-gated local PDF listing/detail templates, first-page previews, fallback viewer and conditional homepage integration. IMPLEMENTED locally with editorial hero, featured invitation, filtered engagement gallery and separate topic/slide library; full deck remains private.


## Current implementation index — 2026-10-07

All nine numbered specifications and the existing
[Hackathon Experience specification](HACKATHON_EXPERIENCE_SPEC.md) now distinguish
current committed implementation from their original task snapshots. Current source
baseline: `74c2963` (PR #14 merge). Domain history in SPEC-002 is superseded by SPEC-006;
current image behavior is covered by SPEC-007/SPEC-009. No duplicate specification was added.

See the [feature-status matrix and roadmap](../../README.md#feature-status-and-roadmap),
[frontend architecture](../../README.md#frontend-architecture-and-content-ownership),
[Git version history](../PROJECT_HISTORY.md#verified-git-tags--2026-10-07-audit) and
[engineering changelog](../DEVELOPMENT_LOG.md). Speaking & Presentations was PLANNED at the audited commit; the subsequent local implementation is documented in SPEC-010. Its /speaking/ route/templates now exist in the working tree, but no approved slides or delivered engagement are asserted.
Historical acceptance/test counts remain evidence for their original tasks, not a current
route count or a newly executed validation run.

PORTAL-SPEAKING-FINAL extends existing SPEC-010 in place (no duplicate specification).
[Speaking evidence tracker](../speaking/SPEAKING_EVIDENCE_TRACKER.md) records artifact availability
and organizer follow-ups separately from public runtime records.

## Community sprint contracts — 2026-10-11

- [SPEC-011-github-metrics](SPEC-011-github-metrics.md)
- [SPEC-012-hackathon-submissions](SPEC-012-hackathon-submissions.md)
- [SPEC-013-impact-dashboard](SPEC-013-impact-dashboard.md)
- [SPEC-014-project-showcase](SPEC-014-project-showcase.md)
- [SPEC-015-adoption-showcase](SPEC-015-adoption-showcase.md)
- [SPEC-016-monthly-reports](SPEC-016-monthly-reports.md)

- [SPEC-017 — contributor recognition integration](SPEC-017-contributor-recognition.md): provisional upstream credit/consent/withdrawal adapter.

- [SPEC-018 — challenge architecture visuals](SPEC-018-challenge-architecture-visuals.md): five conceptual diagrams and responsive shared tiles.

- [SPEC-019 — AI for Everyday Life](SPEC-019-everyday-ai-challenge.md): sixth Portal topic, safe prototype requirements and upstream follow-up.

- [SPEC-020 — Hackathon operations](SPEC-020-hackathon-portal-operations.md): verified seven-stage Forms registry, gated onboarding and certificate recognition; preview reference and opening approvals pending.

2026-10-14: AEGLYSAI-HACK-DESIGN-002 extends the existing
[Hackathon Experience specification](HACKATHON_EXPERIENCE_SPEC.md), SPEC-018 and SPEC-020
with the exclusive international landing presentation. No duplicate hackathon SPEC created.

- [SPEC-022 — Research navigation](SPEC-022-research-navigation.md): shared native Research disclosure, mobile accordion and unchanged destinations. SPEC-021 is reserved by the separate EVENT-001 branch.

- [SPEC-023 — Hackathon 2027 coming soon](SPEC-023-hackathon-2027-coming-soon.md): future announcement route and shared Hackathon navigation disclosure; local review status and evidence recorded separately.

- [SPEC-024 — Homepage experience](SPEC-024-homepage-experience.md): homepage-only hierarchy, research boundaries and event discovery, with before/after and preservation validation.

- [SPEC-025 — Approved public showcase registry](SPEC-025-approved-public-showcase-registry.md): sanitized JSON export, independent approval and integration with the existing EVENT-001 showcase; no live Sheet or real public seed.

- [SPEC-026 — External registration channels](SPEC-026-registration-channels.md): Unstop/Luma discovery, Discord support and a planned private reconciliation boundary; official qualification/selection remains authoritative.

- [SPEC-027 — Controlled Sheets/Drive profile imports](SPEC-027-sheets-drive-profile-import.md): sanitized adapter, pinned public-feed transport and regenerated development-only DEMO; no real publication.
