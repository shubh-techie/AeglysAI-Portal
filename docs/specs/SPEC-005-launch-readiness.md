# SPEC-005 — Hackathon communications and launch readiness

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED drafts and metadata configuration: `45fb2a2`, merged by
`07ebdf3` (PR #7). Draft communications are artifacts, not messages sent or completed
judging. Current `social.ts` and `hackathonSeo.ts` supply the local 1200×630
AeglysAI PNG preview, introduced during rebrand `5b5251c`; the original text-only
preview observation below is historical. Five canonical forms are null/closed;
qualification/certificate guidance comes from `8431b47`, sponsorship drafts from
`280fd65`. Organizer terms remain IN PREPARATION and actual launch remains PLANNED.
See the [launch checklist](../hackathons/LAUNCH_READINESS.md) for current gates.
No live CI/deployment or sending operation is asserted.

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

## Original task record

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-007.
- Status: IMPLEMENTED locally as draft communications/operations and portal copy/metadata; event launch remains PLANNED.
- Baseline: PORTAL-005 `c21f16c` and PORTAL-006 `21c5615`; continue existing feature branch, preserve Git history and design.

## Scope

Create eleven factual, reusable templates in `docs/hackathons/communications/` for registration
receipt, submission reminders/receipt, judge/speaker confirmations, event opening, final week,
approved results and verified contributor thanks. Each has a draft label, send condition and
unfilled operational placeholders. No contact, sending, mailing list or bulk-email infrastructure.

Document the full participant path from visitor through Forms registration/receipt, GitHub
challenge/build, submission, eligibility, independent review/scoring, results and winner announcement.
Create submission requirements and a transparent proposed scoring framework (25/20/20/15/10/10%)
with anchors, arithmetic, independent reviews, conflict disclosure/recusal, eligibility and tie handling.
Official terms must adopt/finalize procedures before launch; documenting a rubric is not completed judging.

Improve practical engineering copy for platform engineers, SREs, cloud/security/distributed
systems engineers: authorization, identity, risk, observability, resilience and incident response.
Publish proposed rubric and required/optional artifacts without redesigning pages. Preserve
planned status, provisional USD $300 per-event prize and Model D research boundary.

## Configuration and metadata

Shared registration, judge application and submission URLs default to null; per-event overrides
remain. Add named `SUBMISSION_FORM_URL` for the shared submission setting. No forms or private
Drive links are invented. Keep application data and filled correspondence outside this public repo.

`src/data/hackathonSeo.ts` supplies distinct hackathon SEO and optional social-image configuration.
Text-only Open Graph/Twitter previews remain until an approved local image with meaningful alt,
width and height is supplied. Layout emits absolute production image URLs and large-image cards
only when configured. No image, sponsor, partner or event-structured-data outcome is fabricated.
Other pages retain their existing metadata behavior. Use a real approved raster preview asset
(e.g. 1200×630) before setting the image; missing/unapproved assets must not be configured.

## Acceptance

Run Node 24 `npm ci`, `npm run check`, `npm run build`, then `npm test`. Verify all old/new routes,
links/assets/sitemap, proposed weights summing to 100%, required/optional artifacts, configurable
forms, absence of private links/fake profiles/results, accurate dates and provisional prize language.
Check mobile/desktop and root custom-domain routing in local production output. Inspect unchanged
GitHub Pages workflow and distinguish any live HTTP observation from deployment evidence.
Check documentation links and `git diff --check`. Record actual outcomes in the development log.

## Evidence and remaining work

See [launch checklist](../hackathons/LAUNCH_READINESS.md), [operations](../hackathons/OPERATIONS.md),
[judging](../hackathons/JUDGING_FRAMEWORK.md), [submissions](../hackathons/SUBMISSION_REQUIREMENTS.md)
and [communication index](../hackathons/communications/README.md). Official URLs, exact dates/time
zones, terms, prize funding/payment, independent judges, speaker arrangements, privacy/conduct
contacts and review/appeal/tie fallback remain pending. No launch or deployment is claimed.
No ADR is needed: existing static rendering and manual external application boundaries are retained.


## Observed validation

Node v24.13.0 `npm ci`, type check (zero errors/warnings/hints), production build (ten
pages) and all twelve tests passed. Final local Chrome checked 44 route/viewport cases.
Optional image configuration emitted absolute production image URLs, alt/dimensions
and large-image cards only for hackathon pages; temporary configuration was restored
and final output rebuilt as text-only previews. Documentation links and whitespace
checks passed. Existing live custom-domain home/hackathon routes returned HTTP 200 with
GitHub serving evidence; no current-task deployment or remote CI run is established.
Two existing npm high-severity findings remain; no dependency changes were made.

## COM-003B-FIX-001 — finalized rule correction, 2026-10-11

Supersedes prior three-event, optional-video, team-TBD and single-rubric proposals; preserved historical records are not current instructions. One hackathon, five existing canonical challenge records. Mandatory individual registration/fork/clone/run A/B/C/understanding/evidence/selection; every team member qualifies, Model D not required. Individuals or teams of two to four, one leader, unique team ID, no duplicate membership, approved changes verified in private Sheets. Executable MVP/prototype/PoC and maximum-two-minute video required, no webcam requirement; slides/walkthrough alone insufficient. Exact required artifacts and both 100-point rubrics in [handbook](../hackathons/README.md), [submission](../hackathons/SUBMISSION_REQUIREMENTS.md) and [judging](../hackathons/JUDGING_FRAMEWORK.md). Round 1 selects finalists; Round 2 Google Meet five-minute demo/five-minute Q&A ranks, no combined scores. Capacity five to ten proposed, quality-dependent. Legacy URLs preserved as retired proposal pages. No new dates/prizes/appointments. Google Forms/Sheets/Drive and Meet only, no database/accounts/private-data API.

Acceptance/tests: site.test.mjs COM-003B-FIX-001 asserts five choices, qualification/team rules, working project/video fields, independent round weights, private-roster language, closed Forms and legacy compatibility; existing privacy/contracts/reporting/media/speaking regressions retained. Operational Forms, deadlines and privacy/permissions remain pending; no live intake or judging claim.
