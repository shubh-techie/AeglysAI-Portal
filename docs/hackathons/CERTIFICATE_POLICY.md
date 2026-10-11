# Digital certificate framework

PORTAL-013-FINAL, 2026-10-04. This defines future eligibility and issuance rules;
no certificates, recipient records, verification service or database are created.
Registration alone does not qualify. Event requirements and minimum valid-project
criteria must be published before intake. Issuance schedule, authorized issuer,
verification contact and correction/revocation procedure: TBD.

## Categories and eligibility

| Category | Required evidence before issuance |
| --- | --- |
| Certificate of Participation | Completed qualification; organizer selection; participation in the applicable event; valid final project meeting published minimum requirements |
| Certificate of Finalist | Official selection as a finalist under published event criteria |
| Certificate of Excellence / Winner | Officially declared winner or explicitly recognized exceptional submission; wording must distinguish recognition from a winner designation |
| Certificate of Appreciation | Judges, speakers or mentors who actually performed the corresponding role; invitation alone is insufficient |

No automatic certificates for registration, qualification alone, selection alone or
an incomplete project. Organizer verifies evidence and approves each issuance;
never invent attendance, performance, selection, winning or judging. Awards and
certificates are separate from prize payment. No employment or publication promise.

## Future certificate identifiers

Illustrative format: `AEGLYS-H01-P-0001`. H01 = Hackathon 01; H02 and H03 identify
later events. Role codes: P = Participant, F = Finalist, W = Winner, J = Judge,
S = Speaker, M = Mentor. Examples only, not issued records:

```text
AEGLYS-H01-P-0001
AEGLYS-H01-F-0001
AEGLYS-H01-W-0001
AEGLYS-H01-J-0001
AEGLYS-H01-S-0001
AEGLYS-H01-M-0001
```

Allocate unique sequential IDs privately per event/category and preserve a correction
trail; do not encode PII. A nonwinning Excellence identifier subtype remains TBD;
do not assign a Winner identifier or wording to imply an undeclared win.

## V1 private records and verification concept

Authorized organizers may maintain issuance records in restricted Google Sheets/Drive:
ID, event, category, approved recipient display name, actual issue date, approval/evidence
reference and correction status. Contacts, internal evidence and notes remain private.
No publicly shared response Sheet, participant database, authentication or backend.

Future verification may confirm an issued ID, event, category, date and approved
public display information using an organizer-controlled process. Verification channel
and publication consent are TBD; no verification URL or service is promised. Obtain
permission before displaying names. Never expose emails, phones, application responses,
internal selection notes, private Drive links or unpublished judge scores.

## Recommended participation wording

Use only after the applicable requirements are met, and adjust the actual event and
project description truthfully. The following is a template, not an issued certificate:

```text
AEGLYSAI COMMUNITY HACKATHON

CERTIFICATE OF PARTICIPATION

This certifies that

[Participant Name]

successfully participated in the

AeglysAI Adaptive Authorization Challenge

and completed a technical project exploring adaptive authorization,
Zero-Trust security and policy-bounded intelligence for distributed systems.

Certificate ID:
[ID]

Issued:
[Date]

aeglysai.com
```

Use actual issue date and verified eligibility; do not generate names or certificates
as part of foundation work. Event terms govern all eventual issuance.

## PORTAL-014 sponsor acknowledgement — 2026-10-04

Future participant, finalist and winner certificate footers may acknowledge sponsors
only after confirmed sponsorship, written certificate branding rights, sponsor name/logo
permission and organizer approval of the final design. AeglysAI remains issuer unless
otherwise formally agreed; sponsor acknowledgement cannot overpower issuer, recipient,
achievement or event title and does not change eligibility. Sponsorship purchases no
achievement certificate. See [sponsorship program](SPONSORSHIP.md) and
[draft terms](SPONSORSHIP_TERMS_DRAFT.md). No certificates are generated here.

## Current rule alignment — 2026-10-11

COM-003B-FIX-001 supersedes older proposal wording: one AI/ML and Cybersecurity Hackathon, five challenges, mandatory individual qualification (A/B/C sufficient, Model D not required), teams of one to four with every member qualified/selected. Working executable project and maximum-two-minute demonstration video required; Round 1 selects finalists, Round 2 five-minute live demo plus five-minute Q&A over Google Meet ranks them. See the [current handbook](README.md), [submission requirements](SUBMISSION_REQUIREMENTS.md) and [judging framework](JUDGING_FRAMEWORK.md). Dates/Forms remain unconfigured; no private rosters or scores published.
