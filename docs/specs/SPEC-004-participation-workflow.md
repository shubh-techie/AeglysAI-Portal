# SPEC-004 — Speakers, judges and participation workflow

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED publication filter/profile configuration: `21c5615`,
merged by `280730f` (PR #6). `8431b47` later centralized intake in `hackathonForms.ts`:
PARTICIPANT_REGISTRATION_URL, QUALIFICATION_SUBMISSION_URL, JUDGE_APPLICATION_URL,
SPEAKER_INTEREST_URL and PROJECT_SUBMISSION_URL. All are null with closed gates;
legacy names derive from them. Guest/judge slots remain empty; confirmation plus
explicit publicDisplayApproved is still required. No invitations or external intake
are established by these files. Speaker profiles have topics, but no eventAssignments
field; eventAssignments currently belongs to Judge. A separate public speaking-history
module is PLANNED in the [roadmap](../../README.md#next-work), not implemented here.

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

### Speaking module follow-up — 2026-10-07

The subsequent user-authorized module is IMPLEMENTED locally in
[SPEC-010](SPEC-010-speaking-presentations.md): /speaking/, approved-record detail templates
and conditional featured cards. The earlier roadmap-only status above records the prior
snapshot. Creator metadata remains unchanged; no supplied PDF/content, recorded delivery,
keynote confirmation or new public person is inferred. Existing proposed talks and hackathon
speaker/judge arrangements retain their original status.

## Original task record

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-006.
- Status: IMPLEMENTED locally, pending review; external forms, invitations and scheduling remain PLANNED.
- Baseline: PORTAL-005 foundation in `c21f16c`; extends [SPEC-003](SPEC-003-hackathon-program.md) without redesigning pages.

## Requirements and implementation

Preserve existing routes, navigation, design, research statuses, creator portrait and Git history.
The keynote remains Shubh Prabhat using centralized creator metadata and the existing photo;
no new event-confirmation claim is inferred.

`src/data/hackathonPeople.ts` provides three guest speaker and three judge slots with null
people, not fabricated invitations. Actual records allow only CONFIRMED or INVITED status.
Speakers support name, title, organization, photo/alt, bio, topics and LinkedIn URL.
Judges support name, title, organization, photo/alt, technical expertise, bio, LinkedIn URL
and typed event assignments. Organization, photo and LinkedIn may be null if not supplied.

`publicDisplayApproved` defaults to no approval unless explicitly set true. The shared
publication filter and card render only CONFIRMED people with explicit display approval.
Invited/unapproved people yield anonymous planned slots with no profile fields or asset links.
Only approved local photos are used; absent photos render no broken image. Private invitation
records must remain outside this public repository even though the renderer excludes them.

`PARTICIPANT_REGISTRATION_FORM_URL` and `JUDGE_INVITATION_FORM_URL` are null configuration
values in `src/data/hackathons.ts`. Participant CTAs read Register for Hackathon; the judge
CTA reads Apply to Judge. Missing links produce disabled buttons and explanatory text.
Per-event registration overrides remain; the old `PARTICIPANT_FORM_URL` is a compatibility
alias. Applications will initially use Google Forms/Drive. No authentication, participant
database, embedded form, private contact details, Drive IDs or internal notes are introduced.

## Invitations and privacy

Three draft templates in `docs/hackathons/` cover judge responsibilities, estimates and
conflict disclosure; speaker topic/audience/format/duration and explicit bio/photo display
permission; participant eligibility/timeline/provisional prize/deliverables/conduct/registration.
All unknown logistics, response channels and form URLs remain placeholders. No person is
invited, contacted or confirmed by creation of a template. Keep completed correspondence,
application data and conflict disclosures private. Public-profile approval is independent
of acceptance; record only approved public facts in repository source.

## Acceptance and validation

Run Node 24 `npm ci`, `npm run check`, `npm run build`, then `npm test`. Verify preserved
routes and mobile/desktop navigation. Regression checks must cover disabled workflow CTAs,
confirmed-with-permission publication versus invited/unapproved exclusion, absence of
invented URLs and private application fields, creator portrait reuse and event links.
Check templates and documentation links and `git diff --check`. Record actual outcomes
in [DEVELOPMENT_LOG.md](../DEVELOPMENT_LOG.md); no deployment or external workflow is implied.

## Pending operations

Create official forms and publish their privacy/handling terms; finalize event terms,
conduct reporting, review workload/dates and conflicts procedures; obtain acceptance and
public display consent before adding real profiles. Scheduling and keynote details remain
planned. No ADR is needed for this extension of existing static data/components.


## Observed local validation

Node v24.13.0 `npm ci` succeeded. `npm run check` reported zero errors, warnings and hints;
production builds generated ten pages; all eleven output/publication tests passed.
Local Chrome checked 44 route/viewport combinations at 1440, 768, 390 and 320px with
empty configuration, and another 44 with temporary synthetic populated profiles.
Confirmed/approved speaker bio/topics and judge expertise/event links rendered correctly;
invited and unapproved sentinel fields were absent from generated HTML. Responsive photo
sizing passed; fixture source was restored and final artifacts rebuilt without test people.
Temporary browsers/servers stopped. Documentation links and `git diff --check` passed.
No full automated accessibility audit, remote CI or deployment was performed. npm repeated
the existing environment warning and two high-severity dependency findings; dependencies
and lockfile were not changed.

## COM-003B-FIX-001 — finalized rule correction, 2026-10-11

Supersedes prior three-event, optional-video, team-TBD and single-rubric proposals; preserved historical records are not current instructions. One hackathon, five existing canonical challenge records. Mandatory individual registration/fork/clone/run A/B/C/understanding/evidence/selection; every team member qualifies, Model D not required. Individuals or teams of two to four, one leader, unique team ID, no duplicate membership, approved changes verified in private Sheets. Executable MVP/prototype/PoC and maximum-two-minute video required, no webcam requirement; slides/walkthrough alone insufficient. Exact required artifacts and both 100-point rubrics in [handbook](../hackathons/README.md), [submission](../hackathons/SUBMISSION_REQUIREMENTS.md) and [judging](../hackathons/JUDGING_FRAMEWORK.md). Round 1 selects finalists; Round 2 Google Meet five-minute demo/five-minute Q&A ranks, no combined scores. Capacity five to ten proposed, quality-dependent. Legacy URLs preserved as retired proposal pages. No new dates/prizes/appointments. Google Forms/Sheets/Drive and Meet only, no database/accounts/private-data API.

Acceptance/tests: site.test.mjs COM-003B-FIX-001 asserts five choices, qualification/team rules, working project/video fields, independent round weights, private-roster language, closed Forms and legacy compatibility; existing privacy/contracts/reporting/media/speaking regressions retained. Operational Forms, deadlines and privacy/permissions remain pending; no live intake or judging claim.
