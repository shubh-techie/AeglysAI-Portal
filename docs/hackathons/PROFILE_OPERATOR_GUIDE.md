# Profile operator quick guide

Current single-tab source selection and local real-photo dashboard: [People preview guide](PEOPLE_PREVIEW_GUIDE.md). The multi-tab commands below remain supported for their original contract.

CONTENT-002A-FINAL, local tooling pending review. **Publication is disabled.** No profiles
are published by these commands. Current live-API prerequisite: `doctor` returns
AUTH_REQUIRED because usable gcloud ADC was not available; source sharing URLs are not credentials.

## Initial setup, once

Use Node24 per docs/LOCAL_DEVELOPMENT.md. The single private operator config is
`.community-drafts/profile-source.json`, already initialized locally from the owner-supplied
Sheet and asset-folder IDs, mode0600. No IDs/credentials are committed or sent to browsers.
On another checkout, `node scripts/community/profile-sync.mjs init SHEET_ID FOLDER_ID`
creates it exclusively; replace the two placeholders with verified owner IDs. Never
rerun init to overwrite existing configuration. No source Sheet/folder sharing is changed.

The installed gcloud CLI must have organizer-authorized Application Default Credentials
with `https://www.googleapis.com/auth/spreadsheets.readonly` and
`https://www.googleapis.com/auth/drive.readonly`, and the credential identity must already
have access to the intended Sheet/library. Provision consent outside Git through the
organization's approved OAuth client/ADC process. No login, OAuth client creation,
service-account sharing, key download or credential extraction was done here. The CLI
captures `gcloud auth application-default print-access-token --quiet` in memory, never
prints/saves the token, and uses it only on fixed Google API hosts without redirects.
See [ADC user credentials](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
and [Drive download requirements](https://developers.google.com/workspace/drive/api/guides/manage-downloads).
Do not paste access tokens into code/config or assume plugin access authenticates this CLI.

The source config always requires publicationEnabled=false. Initial operator decisions:
roleMap (explicit confirmed categories), rightsMap (exact meaningful grants), allowed
Drive owner permission IDs and explicit local demo-avatar use. Ownership IDs are private
operator configuration, not public profile attributes. The initial approved-owner list
is empty: real asset candidates fail until authorized ownership is verified and configured.
A source Boolean or a matching owner ID does not independently prove photo usage rights.

For real candidates, initial Sheet setup must provide Profiles N header
`affiliation_verified`, Assets I/J headers `public_attribution`/`display_credit_required`.
No private cell values in those columns are read unless exact public extension headers
match. These fields are not currently provisioned by this task. Organizer must add them
without moving/replacing existing private columns, after reviewing its Sheet layout.
Existing source names/columns remain unchanged. No Sheets writes are made by sync.

## Routine workflow

1. **Edit Sheet:** update public name/title/bio/links and explicit role rows. One stable
   profile_id per person; add multiple Roles rows, each independently confirmed. Keep
   event_year2026. A generic speaker does not imply keynote; real source must explicitly
   use an approved mapping such as `keynote speaker`. Partners cannot double as human roles.
2. **Upload/replace image:** keep it within the configured library (nested folders allowed,
   ancestry bounded to eight levels), update matching Profiles/Assets file IDs if replacing
   with a new file. Supported PNG/JPEG/WebP/AVIF, maximum10MiB/40million pixels. Confirm
   owner, exact usage grant, public alt/attribution and no required visible credit. Strip
   sensitive EXIF/XMP/IPTC before uploading real publication copies; candidates reject it.
3. **Sync local DEMO:** `node scripts/community/profile-sync.mjs demo`. Only demo-prefixed
   IDs with DEMO_DO_NOT_PUBLISH are allowed; source grants are not converted into real
   approval. Avatars require explicit local demo permission in operator config. Names,
   multiple roles and changed bytes are read afresh through Google APIs, not hardcoded.
4. **Preview:** `npm run dev -- --background` if the identified server is stopped; open
   http://localhost:4321/__demo/profiles/. Existing server normally stays running. The
   dev middleware reads the current feed for each image request, so new IDs/formats need
   no component edit or restart. Missing or mismatched images use initials. Browser requests
   go only to local preview assets, never private Sheets/Drive APIs.
5. **Request real-content approval later:** `node scripts/community/profile-sync.mjs candidate`
   validates the complete real source set and produces only a sanitized ignored candidate
   plus verified asset bytes. DEMO IDs/flags, revoked/withdrawn rows, missing consent/content/
   role/image rights and unsupported fields reject. A mixed demo/real source must be
   prepared as an explicitly reviewed real dataset; demos cannot simply have flags flipped.
6. **Publish later:** independently review exact text/roles/consent/image rights and the
   snapshot digest. Then follow EVENT-002 owner manifest and separately authorized Git/PR/
   merge/deployment workflow. Any bio/link/role/image change requires fresh approval.
   There is no publish switch/command in sync and no scheduled/public endpoint activation.

`node scripts/community/profile-sync.mjs doctor` checks credentials, exact tabs/headers and
bounded read access without copying assets or saving raw rows. Source config is limited
to1000 rows per tab; tail IDs outside configured maxRows reject rather than silently
truncate. Private consent references/notes/reviewer/role-evidence/folder-path columns are
excluded. Failed source validation finishes before current preview replacement. Successful
image/feed updates are digest checked; a crash during local image-file replacement can
cause safe initials fallback until rerun. Versioned candidate failures remain ignored and
are never a valid publication. Do not copy incomplete staging directories into public.

## Errors and withdrawal

Errors are JSON codes without tokens/private row values: AUTH_REQUIRED, ACCESS_DENIED,
SOURCE_UNAVAILABLE, SOURCE_FOLDER, SOURCE_TOO_LARGE, OUTPUT_CONTAINMENT, SOURCE_HEADERS/TABS/ROW_LIMIT/ROW_ALIGNMENT/BOOLEAN, DUPLICATE_ID/ROLE,
ORPHAN_REFERENCE, APPROVAL_MISSING, PUBLIC_APPROVAL_REQUIRED, WITHDRAWN_OR_REVOKED,
ROLE_APPROVAL_OR_CATEGORY, ASSET_REFERENCE/RIGHTS_OR_CREDIT/OWNER_UNVERIFIED/OUTSIDE_LIBRARY/
METADATA/DECODE/PRIVATE_METADATA/CHANGED_DURING_SYNC. SOURCE_VALIDATION denotes strict schema,
link, field or registry rejection. Inspect source privately; do not paste raw exports in logs.

Withhold consent/content or mark withdrawn/revoked: the full real candidate rejects.
This does not automatically remove an already deployed profile. Obtain an explicitly
reviewed replacement/unpublish snapshot and deploy through the authorized release path;
static caches and Git history remain. Resync just before final owner review to catch source
changes. No operation can infer a withdrawal that happened after its read.

## Public feed design, not activation

Later host approved versioned JSON and asset bytes on existing organization Pages; the
path/domain/actual hosted URL must be approved and verified before configuration. No URL
was invented/activated. Operator-only `AEGLYSAI_SHOWCASE_FEED_URL` plus independently
reviewed `AEGLYSAI_SHOWCASE_FEED_SHA256` support `node scripts/community/profile-feed.mjs`.
It stages verified versions; does not publish. Exact pinned unexpired cache is used only
on availability failure; corrupt/changed/revoked/expired feeds reject without fallback.
Offline cannot learn fresh remote revocation until expiry/explicit pin update. Full
contract and image/owner limitations: [mapping guide](SHEETS_DRIVE_PROFILE_IMPORT.md).

Commands are implemented and exercised here: init success/exclusive preservation;
doctor/demo/candidate credential-failure path; sync engine positive/rejection paths and
preview acceptance through isolated authorized-API fixtures. **Live authenticated Google
sync is not certified until credentials/scopes/source access pass doctor and a real demo run.**
