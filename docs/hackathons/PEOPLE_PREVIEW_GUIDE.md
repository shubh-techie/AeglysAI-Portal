# Single People tab — local review dashboard

Recorded2026-10-26 for CONTENT-002A. Pending local review, no delivery/publication.
The active private config uses layout=people and the owner-supplied new Sheet/library.
The previous multi-tab config was backed up locally; existing workflows remain supported.
No source sharing, Notes values, credentials or private photograph references enter Git.

## Initial ADC login

The installed gcloud CLI supports these flags (local help checked); usable ADC is still
missing, so doctor/people-preview return AUTH_REQUIRED. A sharing URL or connected Drive
session does not authenticate this standalone CLI. Organizer must provide an approved
Desktop OAuth client JSON outside this checkout, with the Google Sheets and Drive APIs
enabled for its project, and log in as an identity already authorized for the private
Sheet/photo folder. Do not make either source public or place client/refresh tokens in Git.

```sh
gcloud auth application-default login \
  --client-id-file="/absolute/private/path/desktop-oauth-client.json" \
  --scopes="https://www.googleapis.com/auth/spreadsheets.readonly,https://www.googleapis.com/auth/drive.readonly" \
  --disable-quota-project
node scripts/community/profile-sync.mjs doctor
node scripts/community/profile-sync.mjs people-preview
```

Replace the placeholder path with the verified organizer-approved client file. Interactive
login was not executed here; no client/credential was created, exported or bypassed. The
command is documented by [Google's ADC setup guide](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
and [gcloud login reference](https://docs.cloud.google.com/sdk/gcloud/reference/auth/application-default/login).
The importer captures access tokens in memory and sends them only to fixed Google API
hosts, without redirects. Source reads are read-only and bounded.

## Source selection and routine use

Already performed locally:
`node scripts/community/profile-sync.mjs configure-people SHEET_ID FOLDER_ID`
with the actual owner-provided IDs. On another checkout replace placeholders only after
verifying the source. This backs up and atomically updates the one ignored0600 config,
`.community-drafts/profile-source.json`; publicationEnabled remains literal false.
Do not commit that file or its backups. Multi-tab init/candidate behavior remains available
for a separately reviewed real publication packet; People is preview-only.

The People header is Profile_ID, Role, Name, Affiliation / Company, Designation,
LinkedIn_URL, Photo_ID, Status, Notes. Header-only A1:I1 is checked; values come exclusively
from A:H. Notes values are never requested, copied, used as biographies or rendered.
No biography exists in this tab, so preview copy states pending review rather than
inventing one. LinkedIn must be reviewed HTTPS LinkedIn format; private credentials/URLs
are rejected. Source roles are displayed literally, including Organizer / Example;
no keynote/judge/mentor role is inferred from an unrelated organizer label.

Edit allowed source fields or upload/replace the photograph, update Photo_ID if needed,
then rerun people-preview after ADC is authorized. New rows need stable unique Profile_ID;
multiple role rows may share an ID only with exactly matching identity/photo/status
fields and distinct roles. Conflicting duplicates reject. Pending/Approved/Draft are
source labels, never publication approval. Withdrawn/Revoked entries are suppressed from
the next preview and their image endpoint becomes inaccessible through feed membership.
A source/API failure leaves the last local preview; it cannot discover an unseen remote
withdrawal while offline. Do not use a stale preview as approval evidence.

## Dashboard and photographs

Reuse the identified server on http://localhost:4321/__demo/profiles/. If stopped, select
Node24 and use the documented status/start lifecycle. The page has prominent
PREVIEW / NOT PUBLISHED labeling, a real-source section with source-status badges and
raw role filters, and a separately labeled fictional category-testing section. Real
Pending rows do not acquire synthetic approval flags. Names, affiliations/designations
and links are source-supplied and not independently verified by this dashboard.

Photographs are private local copies, not public assets. Existing byte/type/size/decode/
digest validation is shared with the ADC image loader; ADC also checks metadata MD5,
download capability and folder ancestry. Circular presentation is CSS only:
border-radius:50%, object-fit:cover. Originals are never resized/cropped/recompressed;
stored originals and served photo copies must have identical SHA-256. Missing/changed
bytes fall back to initials. New IDs and formats need no component edits or restart.

This task's initial three-record preview was prepared through separately authenticated
Drive/Sheets connector reads/materialization and the same People preparation/byte validator.
Their direct configured folder membership, MIME/size and local decoded digests were
verified. Connector metadata did not return authoritative owner/rights/MD5 fields; do
not claim those as verified. This successful preview is not proof the ADC CLI can log in.
Six existing fictional demo cards and original avatar bytes were retained separately.

## Privacy and publication boundary

Dev middleware exposes only feed-member hashed photos, with no-store/nosniff. Vite's
existing environment/key/Git deny list is preserved and extended to deny all ignored
operator staging, including direct and /@fs access. Source config/original-file HTTP
probes return403; explicit local preview photo paths return200. Browsers never receive
Sheet IDs, Drive IDs/tokens or Notes. No Google API connection from client code.

`node scripts/community/profile-sync.mjs candidate` rejects a People configuration with
PEOPLE_PUBLICATION_PACKET_REQUIRED before requesting a token, regardless of source status.
The single tab lacks explicit consent/role/asset rights and independent owner approval;
Status=Approved cannot fill those gaps. Use the existing EVENT-002 sanitized packet,
asset/consent/withdrawal validation and exact digest-bound owner manifest for any future
publication, through separately authorized review/Git/release. No snapshot pair or public
feed activated here. Normal and dev-config production builds omit the local route/data.
An accidental production previewItems caller throws rather than rendering private cards.

Cache/Magicast security findings remain open. Browser checks here are Chromium only;
Safari/Firefox/physical devices/manual screen reader remain unverified.
