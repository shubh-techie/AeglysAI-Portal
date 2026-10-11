# COM-003B review packet

Proposed PR title / future commit: `feat(hackathon): AEGLYSAI-COM-003B add submission verification`
Branch reference: `feat/AEGLYSAI-COM-003B-hackathon-submissions`. No commit/PR/push created.

Description: Implement hackathon submissions in the static portal with reviewed data, privacy gates and truthful unavailable states. Preserve legacy content and design. See SPEC-012 and ADR-002 for acceptance/architecture.

Files owned:
- src/data/community/challenges.json
- src/data/community/submissions.ts
- src/pages/community/submit.astro
- docs/specs/SPEC-012-hackathon-submissions.md
- docs/adr/ADR-002-hackathon-submissions.md

Shared integration hunks: package.json command/test scripts, .gitignore draft exclusion, scripts/site.test.mjs, README, development log and spec/ADR indexes. Stage task-specific hunks only after authorization. These are not six committed implementations: branch refs start at 22930f5 and combined workspace diff is uncommitted.

Dependencies: COM-002 provides shared public-input/evidence adapter/navigation foundation. COM-004 and COM-008B use its observations as requested. COM-006 uses COM-003A challenge configuration and shares ReviewedGallery with COM-007B. No Speaking dependency change or unrelated research implementation.

Tests/results/security/open blockers: recorded in SPRINT_REVIEW.md; no hosted CI or deployment claimed. Real production screenshots stored in ignored review artifacts. No private participant records, tokens or unapproved metrics published. Research disclosure blockers and baseline dependency advisories must be resolved before publication.

COM-ARCH-001 follow-up: Google Workspace is the approved administration architecture; [ADR-007](../adr/ADR-007-google-workspace.md) and [manual export workflow](WORKSPACE_EXPORTS.md) govern configuration, privacy and review. The remaining intake blocker is provisioning/approved links, not an undecided service. No private resources connected or automation added.

COM-003B-FIX-001 follow-up: current one-event/five-challenge workflow, mandatory individual A/B/C qualification, selected teams of one to four, required executable project/two-minute video and separate two-round rubrics now supersede earlier partial-rule status. [Current handbook](../hackathons/README.md) and [Form operations](../hackathons/OPERATIONS.md) govern remaining launch configuration; private Sheets/Drive and Google Meet remain external, unconfigured services. Other contract/export/publication blockers unchanged.
