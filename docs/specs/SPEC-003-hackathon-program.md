# SPEC-003 — Community hackathon program foundation

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED frontend: foundation `c21f16c` merged by `c966416`;
experience/handbook/event-detail implementation `8431b47` merged by `9030455`.
Names now use AeglysAI. Seven hackathon content routes exist, including sponsors
(`280fd65`, merge `ba5c514`); see the [route inventory](../../README.md#site-structure).
Events, keynote and all external participation operations remain PLANNED.
`hackathonForms.ts` owns five null/closed canonical form settings; aliases in
`hackathons.ts` are derived. `hackathonPeople.ts` owns speaker/judge records.
The source and operational boundaries supersede the original three-route/form notes
below. Current red treatment applies to the series and sponsors, not event/community
detail pages. Full closure/sponsorship scope is in the existing
[experience specification](HACKATHON_EXPERIENCE_SPEC.md).

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

## Original task record

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-005 — Hackathon Program Foundation (identifier supplied by user; distinct from the prior domain-migration task also labeled PORTAL-005).
- Status: IMPLEMENTED locally as an uncommitted diff on `feature/hackathon-program`; events and program arrangements remain PLANNED.
- Revision context: expanded after implementation to capture the supplied Task 5 requirements, observed validation and remaining launch conditions. This is not evidence of publication or deployment.

## Scope and requirements

Add static `/hackathons/`, `/hackathons/events/` and `/hackathons/community/` routes using
the existing Astro layout, URL helpers and visual system. Preserve all research routes,
creator metadata, portrait bytes, hosting configuration and Git history. Add Hackathons
to existing navigation. No backend, data collection or new architectural boundary is introduced.

The landing page presents the supplied program title, subtitle, description, audience,
three-event timeline, free participation, planned USD $300 prize per event, participation
steps, repository link, conduct expectations and evidence-oriented judging philosophy.
The events page gives each challenge its problem, challenge, timeline, eligibility,
deliverables, criteria, prize, submission process, provisional rules and open-source expectations.
The community page reuses the creator profile and supplies three empty guest speaker slots,
empty independent judge slots, participants and community partners sections.

`src/data/hackathons.ts` configures events, speakers, judges, registration/submission links
and CONFIRMED / INVITED / PLANNED / COMPLETED definitions. All current entries are PLANNED;
no invitation, participation, award or affiliation is inferred. Model D remains planned research.
No immigration or profile-building claims are permitted.

`PARTICIPANT_FORM_URL` defaults to null. Render a disabled Register Interest button with a
visible explanation until an official URL is supplied. Event-specific registration links
fall back to the shared form. Submission links remain absent until configured. Never invent URLs.
Prizes and rules are explicitly subject to official event terms until finalized.

## Program content

- Title: **AegisAI Community Hackathons**.
- Subtitle: **Build. Break. Measure. Improve.**
- Description: A community engineering program for exploring adaptive authorization, behavioral risk, cloud-native security and resilient distributed systems using the open-source AegisAI research platform.
- Target participants: Platform Engineers, Cloud Engineers, Security Engineers, SREs, Software Engineers, AI/ML Engineers, Researchers and Graduate Students.
- Participation: FREE. Each event has a planned USD $300 prize, subject to official event terms until finalized; no award is claimed.

| Planned event | Launch | Submission | Themes |
| --- | --- | --- | --- |
| AegisAI Adaptive Authorization Challenge | November 2026 | January 2027 | RBAC, ABAC, contextual risk, adaptive authorization, policy explainability |
| AegisAI Behavioral Risk Challenge | December 2026 | February 2027 | Behavioral anomaly detection, risk evidence, identity/context signals, explainability, false-positive reduction |
| AegisAI Autonomous Resilience Challenge | January 2027 | March 2027 | Incident detection, policy-bounded response, resilience, observability, distributed-system security |

Every event must present Problem, Challenge, Timeline, Eligibility, Deliverables, Judging
criteria, Prize, Submission process, Rules and Open-source expectations. Proposed judging
dimensions are technical correctness, security reasoning, architecture quality,
reproducibility, innovation, explainability and documentation. Final weights and procedures
remain pending. Challenge themes do not establish implemented or validated research capabilities.

The community page contains Keynote Speaker, Guest Speakers, Judges, Participants and
Community Partners sections. Shubh Prabhat is the creator and planned keynote speaker;
name, biography, role, profile links and supplied photo come from the existing creator
source rather than duplicated metadata. Three future guest speaker slots and three
independent judge slots contain no invented people. Status meanings are:

- **CONFIRMED:** participation or arrangements explicitly confirmed.
- **INVITED:** invitation sent; acceptance pending.
- **PLANNED:** proposed; arrangements not finalized.
- **COMPLETED:** finished, with supporting evidence available.

Never fabricate judges, participants, partners, sponsors, winners, submissions, attendance,
prizes awarded or speaker affiliations. Code of Conduct expectations cover respectful
participation, authorized testing, attribution and private handling of sensitive reports;
reporting contact and enforcement procedures are still pending.

## Acceptance and validation

Run Node 24 `npm ci`, `npm run check`, `npm run build`, then `npm test`. Check all nine
content routes plus custom 404, local assets/links, fragment targets, unique metadata,
sitemap, research integrity, unavailable registration and creator portrait reuse.
Responsive styles must wrap navigation and cards on narrow screens, and preserve focus
and reduced-motion support. Validation outcomes are recorded in the development log.

## Observed validation and evidence

Validation was performed during the implementation session on 2026-10-03 with Node
v24.13.0, as recorded in the [development log](../DEVELOPMENT_LOG.md):

- `npm ci` completed; `npm run check` reported zero errors, warnings or hints.
- `npm run build` generated ten pages including the custom 404; all nine `npm test` output checks passed.
- Local Chrome checks passed 44 route/viewport combinations: nine content routes, custom 404 and a missing route at 1440, 768, 390 and 320px. Styles, portrait decoding, headings, navigation and absence of horizontal overflow passed. Temporary browser and server processes were stopped.
- Documentation links and `git diff --check` passed. No full automated accessibility audit was performed for this task.
- Initial sandboxed install/build attempts failed with macOS credential-service errors; retries passed. npm reported its existing environment warning and two high-severity dependency findings involving `http-cache-semantics` and Astro. Dependency versions and lockfile were preserved.

Implementation references:

- [Program configuration](../../src/data/hackathons.ts), including `PARTICIPANT_FORM_URL`, events, roles and registration links.
- [Landing page](../../src/pages/hackathons/index.astro), [events page](../../src/pages/hackathons/events.astro) and [community page](../../src/pages/hackathons/community.astro).
- [Registration component](../../src/components/HackathonRegistration.astro) and [program navigation](../../src/components/HackathonNav.astro).
- [Creator data](../../src/data/creator.ts) and [reused creator profile](../../src/components/CreatorProfile.astro).
- [Production-output checks](../../scripts/site.test.mjs) and [configuration instructions](../../README.md#community-hackathon-configuration).

These outcomes describe local validation of the working tree. No commit, push, remote CI,
merge, deployment, registration collection or event completion is established.

## Remaining work

Official eligibility, exact dates/time zones, prize funding/payment and award conditions,
judging procedures, conduct reporting/enforcement contact, licenses, forms and confirmed
people remain pending. No real registration, deployed update or completed event is claimed.
No ADR is required: this extends the existing static data/component approach.


## PORTAL-006 extension — 2026-10-03

[SPEC-004](SPEC-004-participation-workflow.md) extends this foundation without redesign.
Actual speaker/judge records now allow CONFIRMED or INVITED, separately from anonymous
PLANNED slots and event status. Public profiles require confirmation and explicit display
approval. Participant CTAs now say Register for Hackathon and use
`PARTICIPANT_REGISTRATION_FORM_URL`; `PARTICIPANT_FORM_URL` remains a compatibility alias.
`JUDGE_INVITATION_FORM_URL` configures Apply to Judge. Both forms remain unset.
The earlier implementation observations above describe PORTAL-005, not a deployed workflow.

## COM-003B-FIX-001 — finalized rule correction, 2026-10-11

Supersedes prior three-event, optional-video, team-TBD and single-rubric proposals; preserved historical records are not current instructions. One hackathon, five existing canonical challenge records. Mandatory individual registration/fork/clone/run A/B/C/understanding/evidence/selection; every team member qualifies, Model D not required. Individuals or teams of two to four, one leader, unique team ID, no duplicate membership, approved changes verified in private Sheets. Executable MVP/prototype/PoC and maximum-two-minute video required, no webcam requirement; slides/walkthrough alone insufficient. Exact required artifacts and both 100-point rubrics in [handbook](../hackathons/README.md), [submission](../hackathons/SUBMISSION_REQUIREMENTS.md) and [judging](../hackathons/JUDGING_FRAMEWORK.md). Round 1 selects finalists; Round 2 Google Meet five-minute demo/five-minute Q&A ranks, no combined scores. Capacity five to ten proposed, quality-dependent. Legacy URLs preserved as retired proposal pages. No new dates/prizes/appointments. Google Forms/Sheets/Drive and Meet only, no database/accounts/private-data API.

Acceptance/tests: site.test.mjs COM-003B-FIX-001 asserts five choices, qualification/team rules, working project/video fields, independent round weights, private-roster language, closed Forms and legacy compatibility; existing privacy/contracts/reporting/media/speaking regressions retained. Operational Forms, deadlines and privacy/permissions remain pending; no live intake or judging claim.
