# COM-006 review packet

Proposed PR title / future commit: `feat(community): AEGLYSAI-COM-006 add verified project showcase`
Branch reference: `feat/AEGLYSAI-COM-006-project-showcase`. No commit/PR/push created.

Description: Implement project showcase in the static portal with reviewed data, privacy gates and truthful unavailable states. Preserve legacy content and design. See SPEC-014 and ADR-004 for acceptance/architecture.

Files owned:
- src/data/community/projects.ts
- src/components/community/ReviewedGallery.astro
- src/pages/community/projects.astro
- docs/specs/SPEC-014-project-showcase.md
- docs/adr/ADR-004-project-showcase.md

Shared integration hunks: package.json command/test scripts, .gitignore draft exclusion, scripts/site.test.mjs, README, development log and spec/ADR indexes. Stage task-specific hunks only after authorization. These are not six committed implementations: branch refs start at 22930f5 and combined workspace diff is uncommitted.

Dependencies: COM-002 provides shared public-input/evidence adapter/navigation foundation. COM-004 and COM-008B use its observations as requested. COM-006 uses COM-003A challenge configuration and shares ReviewedGallery with COM-007B. No Speaking dependency change or unrelated research implementation.

Tests/results/security/open blockers: recorded in SPRINT_REVIEW.md; no hosted CI or deployment claimed. Real production screenshots stored in ignored review artifacts. No private participant records, tokens or unapproved metrics published. Research disclosure blockers and baseline dependency advisories must be resolved before publication.

COM-ARCH-001 follow-up: Google Workspace is the approved administration architecture; [ADR-007](../adr/ADR-007-google-workspace.md) and [manual export workflow](WORKSPACE_EXPORTS.md) govern configuration, privacy and review. The remaining intake blocker is provisioning/approved links, not an undecided service. No private resources connected or automation added.
