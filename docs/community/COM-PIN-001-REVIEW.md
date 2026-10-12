# COM-PIN-001 published-source handover

Proposed PR: AEGLYSAI-COM-PIN-001: Pin Published Community Evidence Contracts
Future commit: fix(community): AEGLYSAI-COM-PIN-001 pin published evidence contracts
Current local branch: fix/AEGLYSAI-COM-PIN-001-upstream-contracts; base 9b53fd2.
Proposed PR base: feat/AEGLYSAI-HACK-CHALLENGE-006-everyday-ai until prior work is merged; target main only after it includes that base. No commit/push/PR/merge/deployment in this task.

Description: Pin existing unchanged evidence, recognition, adoption and monthly-impact schemas/validators/fixtures to the user-approved public source revision; replace stale local-only source status with recorded provenance. Preserve independent human/consent/publication approval and immutable report requirements. No schema or activity data changed.

## Source evidence

Candidate/main HEAD: [711c1556e27bd226c08fb6a8c7b0d9040b4c88ee](https://github.com/shubh-techie/AeglysAI/commit/711c1556e27bd226c08fb6a8c7b0d9040b4c88ee). Unauthenticated API repository visibility public, compare identical and merge base exact candidate; authoritative source is pinned revision, not mutable main. Verification recorded at 2026-10-12T01:26:47Z. All 34 scoped immutable raw files match: four schemas, six validator/helper/requirements files and 24 fixtures, no missing/extra files. All schemas 1.0.0 / Draft 2020-12. Source checkout untouched; system curl verified TLS after Python certificate-store failure.

| Schema | Upstream and Portal SHA-256 (identical) |
| --- | --- |
| evidence | 51760d5570ab5317d6c898d0eab12c8cdbcdb4b6779ee1233df7e33e5915ddc6 |
| recognition | 9f9093ad4834e54a4505c617ae02c52604d0a0789707a071a211c986c7be405e |
| adoption | c72ad408deeb5611498fdbbbc1fd66471d302e254206837fcc34631023793794 |
| monthly-impact | 4857b93e4c49d6cfb8deab6a365bd6627ca134c7c371298a481d3f7a48c3bb27 |

## Validation and remaining blockers

Astro check 104 files, zero diagnostics; build 27 pages; 46 tests passed. Source metadata and 24 fixture hashes verified offline alongside schemas/semantic helpers; eight positive/thirteen negative fixtures and all approval/consent/withdrawal/independence/snapshot/revision/open-period regressions pass. Generated local link/landmark/assets/six-diagram/workflow checks retained. Bounded privacy scan clear; no approved activity/owner allowlist or monthly report pages. Documentation/whitespace results in development log. No new browser/hosted CI/deployment claim.

Current npm audit: three high advisories, no automatic fix (http-cache-semantics, sharp, source-map-js). Broader historical research disclosure findings not re-audited by this contract-only source comparison. Private Forms/Sheets/Drive controls, genuine reviewed data/consent, owner authorization, durable archive policy and separate sixth-track COM-003A acceptance remain pending. Pinning source definitions does not authorize public activity or certify research effectiveness. October remains open. No release/tag/PR review inferred beyond the user-provided source approval and public-main verification.

[Current provenance](CONTRACTS.md), [integration guide](INTEGRATION_GUIDE.md), [inventory](CONTRACT_INVENTORY.json), [ADR-008](../adr/ADR-008-evidence-contract-integration.md), [SPEC-016](../specs/SPEC-016-monthly-reports.md), [traceability](TRACEABILITY.md).

## Exact changed files

27 files; only pin metadata/tests, current source-status copy and documentation.

- README.md
- docs/DEVELOPMENT_LOG.md
- docs/adr/ADR-001-github-metrics.md
- docs/adr/ADR-002-hackathon-submissions.md
- docs/adr/ADR-003-impact-dashboard.md
- docs/adr/ADR-004-project-showcase.md
- docs/adr/ADR-005-adoption-showcase.md
- docs/adr/ADR-006-monthly-reports.md
- docs/adr/ADR-007-google-workspace.md
- docs/adr/ADR-008-evidence-contract-integration.md
- docs/community/COM-PIN-001-REVIEW.md
- docs/community/CONTRACTS.md
- docs/community/CONTRACT_INVENTORY.json
- docs/community/INTEGRATION-001-REVIEW.md
- docs/community/INTEGRATION_GUIDE.md
- docs/community/SPRINT_REVIEW.md
- docs/community/TRACEABILITY.md
- docs/specs/SPEC-011-github-metrics.md
- docs/specs/SPEC-012-hackathon-submissions.md
- docs/specs/SPEC-013-impact-dashboard.md
- docs/specs/SPEC-014-project-showcase.md
- docs/specs/SPEC-015-adoption-showcase.md
- docs/specs/SPEC-016-monthly-reports.md
- docs/specs/SPEC-017-contributor-recognition.md
- scripts/community/integration.test.mjs
- scripts/community/upstream/MANIFEST.json
- src/pages/community/reports/index.astro
