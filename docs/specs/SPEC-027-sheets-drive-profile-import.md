# SPEC-027 — Controlled Sheets/Drive public-feed imports

Recorded2026-10-26 for CONTENT-002A, baseline
`f7e9c12414c2795d7ddcdbdcae965d9406101fbb`. IMPLEMENTED locally, pending review;
no real publication or feed hosting. Extends SPEC-025/ADR-013 and
[ADR-014](../adr/ADR-014-reviewed-public-feed-transport.md).

Private Sheets/Drive → human verification/sanitized tables → existing EVENT-002 snapshot
and independently digest-bound approval → public feed/verified HTTPS assets → operator
fetch/staging → reviewed Git publication. Stable profiles/multiple roles and existing
categories/rendering are reused. Generic speaker never automatically means keynote.

Acceptance: configurable server-side feed URL and independent digest; strict schema,
consent/owner expiry/withdrawal and image hash/rights checks; bounded network operations;
no credentials/private Sheet references/browser fetching. Keep last exact pinned valid
snapshot on availability failure only; reject malformed/changed/revoked/stale proposals.
Never automatically turn input flags into independent owner approval. Existing cache
cannot know offline revocation; explicit expiry/pin/replacement controls remain mandatory.

Local preview reads regenerated ignored feed from six actual demo Sheet rows; no
hardcoded profile identities. Dev-only avatar endpoint serves exact hashed PNGs from
ignored storage. Missing/changed files use existing initials. Clearly label DEMO and
simulate renderer flags only in that isolated projection. Both normal and explicitly
selected dev-config production builds must exclude all demo routes/images/markers.

No production snapshot pair seeded, private Workspace mutation, public image grant,
backend/database/dependency/security-control change or registration/2027 change.
[Operator mapping](../hackathons/SHEETS_DRIVE_PROFILE_IMPORT.md) and
[review/evidence](../hackathons/CONTENT-002A-REVIEW.md) define operations and limitations.
Validate check/build/full tests, approvals/rejections/offline/cache/transport/assets,
production equality/privacy, responsive theme/no-JS images and feed regeneration.

## CONTENT-002A-FINAL extension

Read-only Google API sync via external gcloud ADC, one ignored source config and explicit
publicationEnabled=false. Map bounded known columns, never private evidence columns;
verify download capability, folder ancestry, approved owner identity, explicit rights,
MIME/size/MD5-stable bytes, full decode/pixel bound and metadata before candidate copy.
New profiles/multiple roles/image formats/replacements need source/config data changes,
not component edits. Dev middleware reads new IDs dynamically; production excludes it.
Current real source grants/required initial public extension columns and usable ADC are
not established. [Operator guide](../hackathons/PROFILE_OPERATOR_GUIDE.md) and
[final report](../hackathons/CONTENT-002A-FINAL-REVIEW.md) distinguish implementation,
isolated acceptance and blocked live verification. No profiles published.


## Single People tab preview extension — 2026-10-26

Minimal read-only layout=people adapter checks header A:I, reads only A:H, excludes
Notes values, and preserves raw roles/status for local review. It does not convert
Pending or Approved into publication approval and cannot generate real publication
candidates. Distinct repeated roles share one stable person; conflicting identities
reject, Withdrawn/Revoked entries are suppressed. Authenticated local photo copies keep
original bytes; circular display uses CSS only. Real and fictional sections reuse the
existing card renderer via a DEV-only projection guarded against production builds.
Local filter/status presentation must not alter normal production HTML/controller bytes.
Operator staging is denied to Vite browser file serving while preserving existing deny
rules; explicit local image middleware remains membership/digest gated. No credentials,
private source IDs or Notes in public output. Existing EVENT-002 remains unchanged.
[Guide](../hackathons/PEOPLE_PREVIEW_GUIDE.md),
[review](../hackathons/CONTENT-002A-PEOPLE-REVIEW.md).
