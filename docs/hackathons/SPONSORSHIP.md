# AeglysAI Community Hackathon Sponsorship — V1

Recorded 2026-10-04, PORTAL-014. Public page and configuration implemented locally
for organizer review; no sponsors, funds, agreements or recognition confirmed.
AeglysAI is an open-source research and engineering initiative, not represented
here as a corporation. Purpose: support prizes, community activities and accessible
technical learning. No hiring access or participant-data benefit.

## Proposed configurable tiers

| Tier | Proposed USD minimum | Proposed recognition, subject to written terms |
| --- | --- | --- |
| Community Supporter | $250+ | Name/logo on sponsorship page; applicable event acknowledgement |
| Challenge Sponsor | $500+ | Community benefits; applicable challenge acknowledgement and communications |
| Prize Sponsor | $1,000+ | Challenge benefits; agreed prize-pool contribution acknowledgement and applicable winner/final-results communication |
| Series Sponsor | $2,500+ | Three-event recognition; series sponsorship logo section, communications and final summary |

These are proposals, not automatic acceptance, invoices or guaranteed deliverables.
Recognition is limited to agreed scope after confirmation and permission. Event-page,
communication and certificate placement are future manual work; no logos exist now.

## Workflow and status

Sponsor Interest → Organizer Review → Tier / Event Selection → Written Terms Shared
→ Questions / Negotiation → Both Parties Agree → Logo Permission → Contribution Confirmed
→ CONFIRMED SPONSOR → Public Recognition.

Conceptual private statuses: INTERESTED, UNDER_REVIEW, TERMS_PENDING, CONFIRMED,
COMPLETED. Only CONFIRMED and explicitly approved public profiles render. Acceptance
also requires agreed terms, contribution confirmation and name/logo permission.
Private intake/contact/negotiation records must stay outside this public repository;
status support is not permission to store private organizations here. COMPLETED does
not render under the V1 confirmed-only rule; archival recognition policy: TBD.

## Configuration and prize treatment

`src/data/hackathonSponsorship.ts` owns tiers, public-approved profiles,
`SPONSOR_INTEREST_FORM_URL = null`, `SPONSOR_INTEREST_OPEN = false` and
`SPONSORSHIP_CONTACT_EMAIL = null`. Missing URL displays
“Sponsorship Interest Form — Opening Soon”. Reuse the HTTPS Google responder URL
validator. Open only after terms/privacy and signed-out form access are reviewed.
Do not invent a contact address or expose personal phone numbers.

Base prizes derive from event configuration: planned USD $300 per hackathon.
Confirmed additional sponsorship is currently USD $0; total is USD $300 planned base.
No source verifies base funding, so the page does not label this a confirmed funded pool.
Prize eligibility and payment are subject to official event rules. Only verified cash
specifically allocated to an agreed event increases totals; never count pledges, all
sponsor revenue or in-kind value as prize funding. Organizer must prevent double
allocation and retain evidence privately. Receiving cash and assigning a prize budget
are separate decisions. Funding, currencies/accounting and allocation approvals: TBD.

## Certificate acknowledgement

All four gates must hold: confirmed sponsorship; written certificate branding rights;
sponsor-approved name/logo use; organizer-approved final certificate design. Optional
footer: “Community Hackathon supported by [Sponsor Name]” or “Prize supported by
[Sponsor Name]”. Never overpower issuer, participant, achievement or event identity.
AeglysAI remains issuer unless separately formally agreed. Sponsorship buys no
achievement certificate and changes no [eligibility](CERTIFICATE_POLICY.md).
No actual certificate or sponsor artwork generated.

## Independence, privacy and intellectual property

Sponsorship does not purchase or influence participant selection, qualification,
judging scores, winner selection, research conclusions, roadmap, authorship, speaking
or judging positions, awards or achievement certificates. Judges follow the published
rubric; sponsor representatives follow normal selection/conflict disclosure and
recusal/reassignment. No guaranteed role.

No automatic access to participant email/phone, applications, judge information,
private submissions/scores or personal data. Any future sharing requires appropriate
consent and a separately documented process. Keep responses, terms, contacts and
review notes private with restricted access. Purpose, retention/deletion, correction
and private contact: TBD before collection.

No automatic transfer of AeglysAI IP, participant code/submissions, research or
documentation. Separate IP arrangements require separate written agreement.

## In-kind support

Cloud credits, developer tooling, technical resources, educational licenses and event
resources may be considered. Verify availability, restrictions and usefulness; do not
assign public monetary value without agreement. In-kind acceptance/equivalence to tier
thresholds: TBD. No account/credit redemption infrastructure implemented.

## Recommended Google Sponsor Interest Form

Fields: Organization Name; Contact Name; Business Email; Organization Website;
LinkedIn/Company Profile; Industry; Country; Interested Sponsorship Level (Community
Supporter / Challenge Sponsor / Prize Sponsor / Series Sponsor / Other); Interested
Event (Hackathon 01 / 02 / 03 / Entire Series); Contribution Type (Financial / In-kind /
Technical resources / Cloud credits / Other); Approximate Contribution; Logo/brand
availability; Short message; Consent to be contacted.

For individual applicants, organization-field applicability: TBD; collect only necessary
information. Do not collect payment/card/bank information through Google Forms.
Responses remain private. No payments, Stripe/PayPal, backend, database, authentication
or automatic acceptance in V1. Google Form → private review → discussion → agreed
terms → confirmed contribution → confirmed sponsor → approved recognition.

## Organizer launch gates

Approve eligible sponsors/individuals, suitability checks, tier recognition/scope,
contribution timing, cash/in-kind treatment, logo rights, certificate approvals,
contact/privacy and acceptance evidence. Refunds, cancellation, postponement,
recognition removal and binding IP provisions: TBD — LEGAL/ORGANIZER REVIEW.
Use [draft terms](SPONSORSHIP_TERMS_DRAFT.md); this page does not establish a binding
agreement, launch the form or confirm any sponsor.

## Current rule alignment — 2026-10-11

COM-003B-FIX-001 supersedes older proposal wording: one AI/ML and Cybersecurity Hackathon, five challenges, mandatory individual qualification (A/B/C sufficient, Model D not required), teams of one to four with every member qualified/selected. Working executable project and maximum-two-minute demonstration video required; Round 1 selects finalists, Round 2 five-minute live demo plus five-minute Q&A over Google Meet ranks them. See the [current handbook](README.md), [submission requirements](SUBMISSION_REQUIREMENTS.md) and [judging framework](JUDGING_FRAMEWORK.md). Dates/Forms remain unconfigured; no private rosters or scores published.
