# HACK-CHALLENGE-006 review handover

Proposed PR title: AEGLYSAI-HACK-CHALLENGE-006: AI for Everyday Life
Future commit: feat(hackathon): AEGLYSAI-HACK-CHALLENGE-006 add everyday AI challenge
Current local branch: feat/AEGLYSAI-HACK-CHALLENGE-006-everyday-ai; base 8a4d182.
Proposed PR base: feat/AEGLYSAI-COM-002-github-metrics while prior sprint is unmerged; switch proposed base to main only after related base is included. Nothing committed/pushed/staged, no PR/merge/deployment.

Description: Add a sixth open-innovation AI/ML/GenAI challenge with safe executable-prototype requirements, a matching conceptual SVG, 3×2 desktop layout and existing selector/gallery integration. Preserve mandatory individual qualification, maximum-four selected teams, required source/README/reproduction/two-minute video and distinct judging rounds. Explicitly mark it a Portal extension pending five-track COM-003A alignment.

[ADR-010](../adr/ADR-010-everyday-ai-portal-extension.md), [SPEC-019](../specs/SPEC-019-everyday-ai-challenge.md), [challenge/Form/upstream guide](AI_FOR_EVERYDAY_LIFE.md).

## Actual validation

Node 24 Astro check 104 files, zero diagnostics; build 27 pages; all 46 tests passed. Initial new selector assertion failed due to Astro scoped attributes, corrected and rerun. All six SVG XML sources valid and unique; original five vectors unchanged. Tests cover sixth selection/provenance/examples/safety, all existing qualifications/judging, schema hashes, owner/consent gates, generated links and visuals. No new dependency or client bundle.

Twenty actual Chrome production-preview cases passed across two pages/two themes and 1440/1024/768/390/320 widths, with correct 3/2/1 grid, six diagrams, no overflow, focus/reduced-motion and label contrast above 4.5:1. Eight isolated synthetic gallery cases passed, including actual keyboard Space selection of sixth category; fixture records/approvals never entered production. Screenshot artifacts: .community-drafts/challenge-006/screenshots/after-tiles-light-1440.png and after-detail-dark-390.png plus all other widths/themes. Temporary browsers/servers stopped.

Production disclosure scan found no tested credential/private/fixture markers; four pinned schema/validator hashes unchanged. No Google Forms/private service/source repository changed. Existing dependency/disclosure/approved-data blockers remain. Documentation/whitespace outcomes recorded in development log. Checks are bounded local verification, not deployment or comprehensive accessibility certification.

## Compatibility and owner actions

Portal offers six choices; research COM-003A still offers five. Exact manual Form choice: **AI for Everyday Life**; normalized export ID **ai-for-everyday-life**. Add to final Selected challenge and any registration/qualification preference selector, preserve existing choices and review conditional branching. No Form was edited.

Separately authorize source track brief, COM-003A README/selection/templates/choice checks and fixtures; do not imply that proposed source path exists. Evidence/recognition/adoption/monthly 1.0.0 schemas have no challenge enum, so remain unchanged; sixth option never becomes participation/adoption or an extra evidence level. Dashboard/monthly category data still requires declared units/periods/review; no sample counts seeded. Project categories derive from the canonical Portal list and retain consent/owner validation.

## Exact changed-file inventory

44 files, all scoped to this sixth-choice addition and its documentation/tests.

- README.md
- docs/DEVELOPMENT_LOG.md
- docs/adr/ADR-009-challenge-architecture-visuals.md
- docs/adr/ADR-010-everyday-ai-portal-extension.md
- docs/adr/README.md
- docs/community/CONTRACTS.md
- docs/community/TRACEABILITY.md
- docs/community/WORKSPACE_EXPORTS.md
- docs/hackathons/AI_FOR_EVERYDAY_LIFE.md
- docs/hackathons/HACK-CHALLENGE-006-REVIEW.md
- docs/hackathons/JUDGE_INVITATION_TEMPLATE.md
- docs/hackathons/LAUNCH_READINESS.md
- docs/hackathons/OPERATIONS.md
- docs/hackathons/PARTICIPANT_INVITATION_TEMPLATE.md
- docs/hackathons/README.md
- docs/hackathons/SUBMISSION_REQUIREMENTS.md
- docs/hackathons/VISUAL_ASSETS.md
- docs/specs/HACKATHON_EXPERIENCE_SPEC.md
- docs/specs/README.md
- docs/specs/SPEC-012-hackathon-submissions.md
- docs/specs/SPEC-013-impact-dashboard.md
- docs/specs/SPEC-014-project-showcase.md
- docs/specs/SPEC-016-monthly-reports.md
- docs/specs/SPEC-018-challenge-architecture-visuals.md
- docs/specs/SPEC-019-everyday-ai-challenge.md
- scripts/community/challenge-visuals.test.mjs
- scripts/community/everyday-ai.test.mjs
- scripts/site.test.mjs
- src/assets/hackathon/ai-for-everyday-life.svg
- src/components/community/ReviewedGallery.astro
- src/components/hackathons/ChallengeDiagram.astro
- src/components/hackathons/EventCard.astro
- src/components/hackathons/SeriesHero.astro
- src/data/community/challenges.json
- src/data/hackathonExperience.ts
- src/data/hackathonSeo.ts
- src/data/hackathonVisuals.ts
- src/data/hackathons.ts
- src/pages/community/index.astro
- src/pages/community/submit.astro
- src/pages/hackathons/[event].astro
- src/pages/hackathons/events.astro
- src/pages/hackathons/index.astro
- src/styles/hackathon-experience.css
