# Approved public showcase registry — EVENT-002

Recorded 2026-10-26. IMPLEMENTED locally, pending review/delivery. No live Sheet,
administrator permissions, real profiles or content publication is authorized here.
[SPEC-025](../specs/SPEC-025-approved-public-showcase-registry.md) and
[ADR-013](../adr/ADR-013-approved-public-showcase-registry.md) define this extension
to [EVENT-001](../specs/SPEC-021-configurable-event-showcase.md).

## Publishing boundary

Private Google Sheet and private Drive evidence → administrator creates a sanitized
candidate **outside Git** → local JSON exporter → proposed snapshot → independent
content/privacy/owner review of exact snapshot → digest-bound approval → reviewed
Git change → existing Astro showcase → authorized Pages deployment.

The exporter accepts an already sanitized JSON contract, not raw response Sheets,
CSV files, arbitrary workbook tabs or a Google URL. It does not read master data,
extract consent evidence or prove administrative approval. No Google SDK, credentials,
browser connection, network fetch, database, backend or scheduled publishing service.
Live Sheet creation/population/sharing and real people/partner approval are separate
operations. Existing registration/qualification Forms and all six challenges stay intact.
The future 2027 page stays separate.

## Version 1.0.0 contract

Executable authority: [eventRegistry.ts](../../src/data/eventRegistry.ts), reusing
the strict [EVENT-001 schema](../../src/data/eventShowcase.ts). Unknown fields,
invalid references, duplicate IDs, unsupported categories and unknown schema versions
are rejected. Input bound: 1 MiB; parsed JSON rejects duplicate keys, depth over 64,
nonfinite/unsafe numbers using the existing offline parser. At most 1,000 records,
profiles and assets. The exporter/loader use generic diagnostics without input values.

| Envelope field | Contract |
| --- | --- |
| `schemaVersion` | Exact `1.0.0`; migration requires reviewed code/schema changes |
| `kind` | `PUBLIC_APPROVED` or `SYNTHETIC`; production always rejects synthetic |
| `snapshotId`, `revision` | Stable, public-safe snapshot namespace and positive integer revision |
| `exportedAt` | Valid timezone-bearing ISO instant, no later than validation time |
| `provenance` | Exact `method: controlled-sanitized-export`, opaque `exportId`, `sourceRevision` |
| `data` | Existing EVENT-001 `events`, `people`, `records` model |
| `assets` | Exact manifest of referenced local images and approved rights/attribution |

Provenance tokens identify a **sanitized export**, never a Sheet ID/URL, response-row
number, real person name, consent-file reference or internal review note. Keep any
mapping to private master data outside Git. They are administrative attestations, not
a cryptographic proof of the underlying Sheet. Export logs contain operation, schema,
snapshot ID/revision and SHA-256 only; never profiles, paths or private-source hashes.

Candidate-only controls are required exactly once for every corresponding ID:

| Field | States |
| --- | --- |
| `recordDecisions: [{recordId, state}]` | `approved`, `pending`, `revoked`, `withdrawn` |
| `profileConsents: [{personId, state}]` | `granted`, `pending`, `revoked`, `withdrawn` |

Missing/duplicate/unknown controls fail. Non-approved records are omitted. Withheld
profile consent removes all its roles and dependent teams. Withheld teams remove
roles associated with that team. Orphan profiles/assets are removed. Candidate controls
never enter the snapshot. An attempted approved publication with conflicting existing
consent/confirmation/content/organizer/branding/selection flags fails the **whole export**.
Unknown/private fields fail even on records otherwise destined to be withheld.

### Categories, identity and roles

Reuse the seven existing versioned category values: `Partner`, `Keynote Speaker`,
`Judge`, `Mentor`, `Participant`, `Team`, `Event Announcement`. These exact enum values
are stable wire identifiers in v1, not editable Sheet display labels. New categories
require extending the shared EVENT-001 model, tests and a reviewed contract version;
adding a row cannot bypass the allowlist. Extra partners need only new record IDs.

Events, people and records have stable IDs unique within their respective namespaces.
Names never serve as identity. A person is stored once in `people`; each event role
references `personId`. Duplicate event/person/category roles fail; different roles
share the same profile. Role rows cannot override the profile's name, designation,
organization, biography, expertise, image or website. Teams retain one-to-four reviewed
member IDs and the existing qualification/selection and duplicate membership rules.
Only person-role categories may reference profiles, and only teams may contain member
lists. Challenge references must match the current shared six-challenge model.

The existing `approvedCopy`, session, challenge, announcement date, affiliation,
website/LinkedIn, confirmation and approval fields retain EVENT-001 semantics. No
optional value needs a placeholder. Public text is plain text, screened and escaped
by the existing Astro renderer. Registry URLs must be public HTTPS with no credentials,
query or fragment; private/local hosts and Google Workspace links are rejected.

### Images and attribution

Existing profile/record images keep `{path, alt}`. Each referenced `/images/` raster
must have exactly one manifest entry:

```json
{
  "path": "/images/example-approved.webp",
  "sha256": "<64 lowercase hex characters of the approved file bytes>",
  "rights": "permission",
  "attribution": "Approved public credit text",
  "approved": true,
  "displayCreditRequired": false
}
```

`rights` accepts `owned`, `cc0`, `permission`; optional `sourceUrl` is a reviewed
public HTTPS URL. File presence, containment inside `public/images`, 10 MiB bound,
digest and PNG/JPEG/WebP/AVIF signatures are checked without remote retrieval. Alt text
is required by EVENT-001. Missing/mismatched images block publication. Current cards
are unchanged: assets requiring visible attribution are unsupported and must be
rejected (`displayCreditRequired: true` is invalid). Attribution remains in the public
snapshot; reviewers must verify actual rights and these attestations privately.

### Visibility, withdrawal and unpublish

Only otherwise approved `Published` or `Scheduled` records with public visibility and
no suppression can enter a snapshot. Dates do not grant approval. Scheduled records
require a start date. Existing inclusive-start/exclusive-end local calendar days and
IANA event timezone apply; unknown timezone blocks date-gated imports. Announcement
dates are informational. Current AEGYTHON timezone remains null; changing it needs
separate event-content approval, not a registry override.

Scheduled copy in a committed snapshot is **public repository content immediately**,
even before it appears in HTML. Do not commit embargoed/pending content. Future and
expired approved records are still filtered at build time by `publicShowcase`.

Withdrawal requires a fresh complete export that omits the person/record, a new owner
approval, rebuild and authorized deployment. The imported registry is replaced in full,
never merged with a previous registry snapshot. An empty approved snapshot unpublishes
all imported entries while preserving original EVENT-001 data. Revoke an approval to
block subsequent builds; this alone does not remove an already deployed static file.
An invalid build must not be deployed or represented as successful withdrawal. Review
CDN/browser caches and retained copies; suppression cannot erase Git history/downloads.
Revision monotonicity and rollback review are human Git-review duties, not a durable
counter or scheduler in this static system.

## Independent approval and integration

No production snapshot or approval is seeded by this task. The build reads only:

- `src/data/community/event-showcase.json`
- `src/data/community/event-showcase-approval.json`

Both absent preserves the exact existing EVENT-001 configuration. Either present alone,
invalid, escaping the input root, synthetic or mismatched blocks the build. A complete
valid pair is added to the existing configuration with strict collision checks; it
cannot replace existing profile/record IDs or alter existing event metadata. Existing
withheld partner drafts stay withheld. There is one showcase renderer and controller.

Owner approval is a separate strict JSON object:

```json
{
  "schemaVersion": "1.0.0",
  "snapshotId": "public-export-example",
  "revision": 1,
  "sha256": "<digest reported by the exporter>",
  "state": "approved",
  "approvedAt": "2026-10-26T12:00:00Z",
  "expiresAt": "2026-11-26T12:00:00Z",
  "reviewUrl": "https://example.org/public-safe-review-reference",
  "recordIds": ["approved-record-id"]
}
```

Digest is SHA-256 of UTF-8 `JSON.stringify(parsedSnapshot)`, preserving parsed key
order. Whitespace is irrelevant; changing content/key order requires new approval.
Exact snapshot ID/revision/digest and complete unique record ID set must match.
Approval cannot predate export or lie in the future; expiry must be later than approval
and the current build. `revoked` blocks publication. The exporter never creates this
approval; another authorized reviewer must verify consent, content, images and private
evidence, then obtain normal content/security/publication review. A JSON flag or digest
does not authenticate a human or replace that review. No private review URL is allowed.

## Commands and synthetic demonstration

Use Node 24 and the existing offline contract parser environment (see
[integration guide](../community/INTEGRATION_GUIDE.md)); no new dependency. Paths below
refer to sanitized input/proposals only. Private master data must not be supplied.

```sh
# Demonstration only; no real appointments or production file writes:
mkdir -p .community-drafts/event-002
node scripts/community/event-registry.mjs demo \
  scripts/community/event-registry-fixtures/synthetic-candidate.json \
  .community-drafts/event-002/synthetic-proposed.json

# Reviewed administrator workflow, using sanitized files outside this public checkout:
node scripts/community/event-registry.mjs export /secure/sanitized-candidate.json /secure/proposed-snapshot.json
node scripts/community/event-registry.mjs validate /secure/proposed-snapshot.json /secure/owner-approval.json
```

Outputs must be `.json` outside the checkout or under ignored `.community-drafts/`;
exclusive creation refuses overwrite. Repeated demos need a fresh output filename.
The CLI does not install snapshots into source/public/dist and never generates CSV or
spreadsheet output. Formula-leading text (`=`, `+`, `-`, `@`, including whitespace)
is rejected, not escaped and re-exported. Any future CSV writer needs its own reviewed
cell-escaping contract; do not turn JSON into Sheets/CSV blindly.

After independent approval, copying the validated pair and approved local images into
the tracked locations is a separate reviewed content change. Run Astro check, build,
full tests, privacy/source/output review and normal Git approval. Failed validation
blocks the proposed publication; do not suppress the failure or reuse a stale artifact.

Known limits: lexical privacy screening cannot recognize all sensitive prose/encoded
contacts; image signatures are not exhaustive file-safety certification; approvals
and provenance require trusted human review; static expiry/withdrawal needs deployment.
Existing cache and embedded Magicast security findings remain OPEN without waiver.
