# SPEC-012 — COM-003B: Submission verification

Recorded 2026-10-11 before implementation. Scope: Submission verification in static Astro, preserving portal routes/themes. Status: Scaffold IMPLEMENTED and TESTED; live intake BLOCKED; no publication/deployment authorization.

Canonical sources: scripts/community for collection/validation/reporting, src/data/community for explicitly reviewed public records, COM-001 contract in [contract provenance](../community/CONTRACTS.md). Fixtures are tests only. Unknown data is unavailable, never zero.

Acceptance: accessible responsive routes/links, source/date attribution, privacy-minimal allowlists, missing-data/error states, no fake counts/claims. VERIFIED plus explicit publication permission and reviewed provenance required for showcases. Only approved closed-period reports may publish. October 2026 remains open; no cumulative-to-monthly reconstruction.

Validation/traceability: scripts/community/*.test.mjs API failure/pagination/validation/permission/aggregation tests and scripts/site.test.mjs route/metadata/assets/privacy checks. See [sprint review](../community/SPRINT_REVIEW.md) for actual results/blockers. COM-003B live intake blocked by absent authorized service; COM-008B final upstream compatibility blocked by upstream commit/approval pending for COM-008A.

## Implemented behavior and requirements-to-tests traceability

Single COM-003A technical offering, five exact upstream challenge labels. Preview fields: title, challenge, public repository, optional demo, description, technologies, reproducibility and explicit consent(default not granted). Review statuses RECEIVED/PENDING_REVIEW/VERIFIED/REJECTED/WITHDRAWN. Reuse existing hackathonForms.project private Google responder gate; null service keeps native preview disabled with no action/network/storage. Once authorized, link to service rather than route personal data through Git. Static preview is implemented; live receipt/reviewer persistence and service integration testing BLOCKED by absent approved private service/operational contract. Existing three-event program unchanged. Local upstream challenge commit returned HTTP404 remotely; only repository link shown. Test mapping contracts.test.mjs + site closed-intake/privacy checks.

Review transitions forbid RECEIVED→VERIFIED; Pending review precedes verification. Withdrawal revokes public permission and cannot silently restore Verified. contracts.test.mjs executes these transitions. Persistence remains delegated to the unavailable authorized service.

## COM-ARCH-001 architecture update — 2026-10-11

Use [ADR-007](../adr/ADR-007-google-workspace.md) and the [manual export/security workflow](../community/WORKSPACE_EXPORTS.md). Google Forms responder links are externally configured through existing participant/project settings. Private Sheets are administrative source of truth; private Drive stores consent/submission/review evidence. Only approved sanitized JSON enters Portal adapters. No database, client-side Sheets access, private IDs/tokens/emails or unapproved records in public artifacts. Missing links/exports retain coming-soon/unavailable states. Manual review/export initially; automation PLANNED pending verified permissions/privacy. COM-001 evidence contract unchanged; no invented COM-008A replacement.

Acceptance traceability: public-export.test.mjs rejects nested private Workspace IDs/links, emails and credentials; site.test.mjs validates responder URLs reject private/editor/prefilled links and preserves closed states. Existing contracts tests retain status/consent gates. Workspace provisioning and real signed-out form/privacy checks remain pending, not claimed tested.

## COM-003B-FIX-001 — finalized rule correction, 2026-10-11

Supersedes prior three-event, optional-video, team-TBD and single-rubric proposals; preserved historical records are not current instructions. One hackathon, five existing canonical challenge records. Mandatory individual registration/fork/clone/run A/B/C/understanding/evidence/selection; every team member qualifies, Model D not required. Individuals or teams of two to four, one leader, unique team ID, no duplicate membership, approved changes verified in private Sheets. Executable MVP/prototype/PoC and maximum-two-minute video required, no webcam requirement; slides/walkthrough alone insufficient. Exact required artifacts and both 100-point rubrics in [handbook](../hackathons/README.md), [submission](../hackathons/SUBMISSION_REQUIREMENTS.md) and [judging](../hackathons/JUDGING_FRAMEWORK.md). Round 1 selects finalists; Round 2 Google Meet five-minute demo/five-minute Q&A ranks, no combined scores. Capacity five to ten proposed, quality-dependent. Legacy URLs preserved as retired proposal pages. No new dates/prizes/appointments. Google Forms/Sheets/Drive and Meet only, no database/accounts/private-data API.

Acceptance/tests: site.test.mjs COM-003B-FIX-001 asserts five choices, qualification/team rules, working project/video fields, independent round weights, private-roster language, closed Forms and legacy compatibility; existing privacy/contracts/reporting/media/speaking regressions retained. Operational Forms, deadlines and privacy/permissions remain pending; no live intake or judging claim.

HACK-VISUAL-001 (2026-10-11): shared EventCard/ChallengeDiagram now render the five existing choices with code-authored conceptual SVGs, HTML focus/minimum prototypes and larger diagrams at existing detail anchors. [SPEC-018](SPEC-018-challenge-architecture-visuals.md) governs this visual enhancement; qualification/team/submission/judging rules unchanged.
