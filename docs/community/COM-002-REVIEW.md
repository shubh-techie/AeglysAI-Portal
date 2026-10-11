# COM-002 review packet

Proposed PR title / future commit: `feat(metrics): AEGLYSAI-COM-002 add verified GitHub metrics`
Branch reference: `feat/AEGLYSAI-COM-002-github-metrics`. No commit/PR/push created.

Description: Implement github metrics in the static portal with reviewed data, privacy gates and truthful unavailable states. Preserve legacy content and design. See SPEC-011 and ADR-001 for acceptance/architecture.

Files owned:
- scripts/community/metrics.mjs
- scripts/community/contracts.mjs
- scripts/community/evidence-1.0.0.schema.json
- scripts/community/metrics.test.mjs
- scripts/community/contracts.test.mjs
- scripts/community/test-fixture.mjs
- scripts/community/fixtures/
- src/data/community/input.ts
- src/data/community/metrics.ts
- src/components/community/CommunityNav.astro
- docs/community/CONTRACTS.md
- docs/specs/SPEC-011-github-metrics.md
- docs/adr/ADR-001-github-metrics.md

Shared integration hunks: package.json command/test scripts, .gitignore draft exclusion, scripts/site.test.mjs, README, development log and spec/ADR indexes. Stage task-specific hunks only after authorization. These are not six committed implementations: branch refs start at 22930f5 and combined workspace diff is uncommitted.

Dependencies: COM-002 provides shared public-input/evidence adapter/navigation foundation. COM-004 and COM-008B use its observations as requested. COM-006 uses COM-003A challenge configuration and shares ReviewedGallery with COM-007B. No Speaking dependency change or unrelated research implementation.

Tests/results/security/open blockers: recorded in SPRINT_REVIEW.md; no hosted CI or deployment claimed. Real production screenshots stored in ignored review artifacts. No private participant records, tokens or unapproved metrics published. Research disclosure blockers and baseline dependency advisories must be resolved before publication.
