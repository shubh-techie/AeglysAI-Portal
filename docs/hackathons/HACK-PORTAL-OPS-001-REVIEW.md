# HACK-PORTAL-OPS-001 — review handover

Status: implemented/tested onboarding and recognition criteria; original sample certificate displayed and all seven verified responder links enabled. Local uncommitted change only. Baseline 8cb6a8d retained; no research repository changes. No open public Portal PRs observed during audit.

## Proposed Git review

Branch: feat/AEGLYSAI-HACK-PORTAL-OPS-001-forms-certificates

Suggested commit: feat(hackathon): AEGLYSAI-HACK-PORTAL-OPS-001 integrate forms and certificates

PR title: AEGLYSAI-HACK-PORTAL-OPS-001: Registration Forms and Certificate Showcase

Proposed base: fix/AEGLYSAI-COM-PIN-001-upstream-contracts while prior baseline remains unmerged; main only after that baseline is present. Do not combine prior community/contracts/six-challenge commits into this task's logical commit. No commit or PR created.

Suggested PR description:

> The hackathon had no verified responder mapping and unavailable CTAs appeared as disabled buttons. Map seven organizer-supplied Forms to their actual roles, independently gate availability/publication/opening, and provide contextual registration, qualification, selected-team and role onboarding. Preserve six diagrams, individual selection/max-four teams, working-project/two-minute video and both judging rounds.
>
> Add eight distinct approval-based recognition categories and a sanitized sample template. The organizer’s follow-up authorizes all seven public intake links and an original navy/cyan certificate sample. The sample contains placeholder details and an explicit Sample — Not Valid for Verification caption. No database, credentials, private Workspace calls, participant records or certificate issuance added.
>
> Validation: Node 24 Astro check zero diagnostics (107 files), 27-page build, 48 tests passed; isolated active-state fixture build verifies all seven safe responder links. 32 local Chrome cases across four routes/four widths/two themes plus eight final landing checks passed; existing localhost:4321 reflects the active registration link and sample; 417 relative documentation paths resolve, 34 public text assets have no tested disclosure markers, and git diff --check passes. Three existing high dependency advisories remain. No live submissions, private Workspace ACL testing, hosted CI or deployment claimed.

## Sources and implementation

[Verified Forms mapping / configuration actions](GOOGLE_FORMS_SETUP.md), [SPEC-020](../specs/SPEC-020-hackathon-portal-operations.md), [ADR-007](../adr/ADR-007-google-workspace.md), [traceability](../community/TRACEABILITY.md), [development log](../DEVELOPMENT_LOG.md).

All seven public canonical responder pages returned HTTP 200 without sign-in redirect or a closed notice. Availability may change and does not demonstrate successful receipt. No actual personal information submitted. No Form was edited. All four observed selectors already have Track 6: AI for Everyday Life.

## Outstanding owner actions

1. Review the original hackathon-themed sample visually. The latest instruction supersedes the missing-reference requirement. No personal example name/signature or invented QR/verification URL will be published.
2. Operate intake under approved notices, retention/deletion, necessary-contact collection and private administrator permissions. All seven open=true following the organizer’s follow-up authorization; verified links alone do not authorize intake.
3. Ensure final submission requires validation, data/model/dependency attribution/licensing, known limitations and appropriate declarations. Require separate public-project permission; current form lacks an explicit consent field.
4. Obtain explicit profile/photo permission for speakers/mentors/judges, collect approved biography/LinkedIn for roles missing those fields, and confirm appointments/participation privately before public display.
5. Operate registration-ID/team-ID allocation, individual selection and unique maximum-four rosters privately. Ensure qualifier gets the required registration ID. Approve actual judging/results/recognition per category; Portal issues nothing.
6. Resolve existing dependency advisories under a separate scoped change; approved sanitized community records, durable evidence archives and upstream sixth COM-003A track alignment remain separate.

## Exact changed-file inventory

36 files; ignored reference/test artifacts are excluded.

- `README.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-007-google-workspace.md`
- `docs/community/TRACEABILITY.md`
- `docs/community/WORKSPACE_EXPORTS.md`
- `docs/hackathons/CERTIFICATE_POLICY.md`
- `docs/hackathons/GOOGLE_FORMS_SETUP.md`
- `docs/hackathons/HACK-PORTAL-OPS-001-REVIEW.md`
- `docs/hackathons/OPERATIONS.md`
- `docs/hackathons/README.md`
- `docs/hackathons/SUBMISSION_REQUIREMENTS.md`
- `docs/hackathons/VISUAL_ASSETS.md`
- `docs/specs/HACKATHON_EXPERIENCE_SPEC.md`
- `docs/specs/README.md`
- `docs/specs/SPEC-012-hackathon-submissions.md`
- `docs/specs/SPEC-020-hackathon-portal-operations.md`
- `scripts/community/hackathon-ops.test.mjs`
- `scripts/site.test.mjs`
- `src/components/HackathonRegistration.astro`
- `src/components/hackathons/CertificateShowcase.astro`
- `src/components/hackathons/FormCta.astro`
- `src/components/hackathons/ParticipantJourney.astro`
- `src/components/hackathons/PeopleSection.astro`
- `src/components/hackathons/SeriesHero.astro`
- `src/components/hackathons/TechnicalIcon.astro`
- `src/data/community/submissions.ts`
- `src/data/hackathonCertificates.ts`
- `src/data/hackathonExperience.ts`
- `src/data/hackathonForms.ts`
- `src/data/hackathonPeople.ts`
- `src/data/hackathonSeo.ts`
- `src/data/hackathons.ts`
- `src/pages/community/submit.astro`
- `src/pages/hackathons/community.astro`
- `src/pages/hackathons/index.astro`
- `src/styles/hackathon-experience.css`
