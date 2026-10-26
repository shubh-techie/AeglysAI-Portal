# REG-001 — Future operator-controlled registration reconciliation

Recorded 2026-10-26. **PLANNED procedure only; no import or live integration implemented.**
Complements [SPEC-026](../specs/SPEC-026-registration-channels.md),
[existing operations](OPERATIONS.md) and [Workspace export boundary](../community/WORKSPACE_EXPORTS.md).

Unstop/Luma are additional public channels. The official AeglysAI registration,
individual qualification, organizer selection, team approval and submission process
remain authoritative. Discord membership is community participation, never registration
or evidence of qualification/selection. No registration or attendance totals are combined.

## Preconditions for a separately reviewed operation

An authorized operator must first verify provider account permissions, legitimate export
capability, allowed processing purposes, necessary fields, participant notice/consent,
retention and access controls. No API/export capability was verified by visiting a listing.
Do not scrape participant profiles or infer private data from public counters. If an
authorized export is unavailable, keep registration channels separate and ask applicants
to follow the official process. Do not invent an integration or require unnecessary data.

Keep raw exports outside this public repository, public assets, CI artifacts, browser
storage and public logs. Use the existing approved private administrative environment
only after explicit permission; this task does not edit its master Sheet, add fields,
grant access or create a new spreadsheet/database. No credentials in Portal source.

## Minimum matching contract

- Scope each candidate to one event and channel. A provider-issued registration ID can
  identify a source row and prevent reprocessing, but does not establish the same person
  across channels. Verify that it is stable and authorized to process before collecting it.
- Prefer an organizer-issued opaque event registration reference, voluntarily supplied
  and privately verified through an approved process, if that collection is separately
  authorized. Do not silently add a new reference question to existing Forms.
- An immutable provider account ID (for example a GitHub numeric account ID) may support
  matching only when specifically authorized, purpose-limited and ownership verified.
  A name, similar handle or public profile URL alone is not proof of identity.
- Do not match by personal email, phone, student identifiers, device fingerprints or
  fuzzy names by default. Hashing contact details does not make them anonymous or grant
  permission to process them. Do not embed private matching IDs in public URLs or Git.
- Missing/conflicting identifiers stay unmatched for private human review. Do not merge,
  overwrite, reject or select an applicant automatically. Maintain distinct source
  references until an authorized reviewer resolves the match.

## Proposed private review sequence

1. Obtain a separately approved, minimum-field export through verified provider tooling.
   Record channel, event, safe export revision/digest and receipt time privately. Preserve
   source revision provenance for idempotent review; do not expose row contents in logs.
2. Check event scope, export integrity, duplicate source IDs and permitted fields. Reject
   unexpected contacts/notes/secrets. Treat text as untrusted; neutralize spreadsheet
   formula cells before any separately reviewed spreadsheet/CSV output. This task adds
   no CSV writer, download collector, parser or automatic Sheet append operation.
3. Produce a private proposed match list using only authorized stable IDs. Distinguish
   `UNMATCHED`, `REVIEW_REQUIRED`, `MATCH_CONFIRMED` and `WITHDRAWN`. These future review
   labels do not change existing official registration or selection states.
4. An authorized reviewer checks conflicts, withdrawn entries and identity evidence.
   Where approved, link channel provenance to an existing official registration reference;
   otherwise instruct the applicant to complete official registration. Do not assume
   external signup substitutes for the official Form or create duplicate official records.
5. Only the established organizer process can record qualification review, selection,
   selected-team membership and submission receipt. External registration, a match or a
   Discord join must never set any of those flags or imply a prize/certificate entitlement.
6. Apply an approved change set to the existing private master only after operation-level
   authorization. Maintain a minimum private audit trail and an operator-reviewed rollback
   plan; no merge of totals or public roster follows automatically.
7. Honor consent/withdrawal/corrections in every linked private source under approved
   retention rules. Public profiles require their own content/consent approval and the
   EVENT-002 sanitized snapshot contract. Reconciliation is not publication permission.

Manual conflict/withdrawal review, provider capability checks, matching field approval,
privacy/security review and operation-specific authorization are prerequisites for any
future implementation. None of these private operations was performed in REG-001.
