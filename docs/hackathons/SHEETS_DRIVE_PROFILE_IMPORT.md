# CONTENT-002A — Operator profile mapping

For the current routine authenticated workflow, see [operator quick guide](PROFILE_OPERATOR_GUIDE.md). The local middleware now supports new avatar IDs/formats without restart. Earlier manual-export steps below remain supported.

Status: local implementation awaiting review. Extends [EVENT-002](PUBLIC_SHOWCASE_REGISTRY.md)
and [SPEC-027](../specs/SPEC-027-sheets-drive-profile-import.md). Source Sheet/Drive IDs,
private consent references, reviewers, notes and raw dumps must stay outside Git/public.
No Sheet or Drive mutation is required. Use connected read-only access; no credentials
in scripts, exports or browser code. This adapter never connects to Google itself.

## Mapping and human gates

| Source | Sanitized packet / required decision |
| --- | --- |
| Profiles.profile_id | Stable profile_id; one canonical human across Roles |
| display_name/public_title/organization/short_bio | Reviewed public identity/title/affiliation/bio; optional fields omitted when absent |
| public_linkedin_url/public_website_url | Reviewed public HTTPS URLs only; Partner supports website, not LinkedIn |
| publication_status | Must be PUBLIC_APPROVED; DEMO_DO_NOT_PUBLISH is rejected |
| category | Discovery hint only; never infers role approval |
| Roles.profile_id/event_year | Known profile and exactly2026 |
| Roles.role | Human maps to registry_category: Judge, Mentor, Partner or explicitly confirmed Keynote Speaker |
| role_approved | Explicit true after private role evidence verification |
| Assets.drive_photo_file_id | Resolve privately; never put Drive ID/URL in sanitized packet or public manifest |
| Assets.public_copy_path | Curated local /images/... path, digest and approved alt text |
| usage_permission/asset_approved | Private ownership/rights review; packet rights, attribution, ownership_verified, usage_permission_verified, asset_approved; display_credit_required must be false |
| Approvals consent/content/asset/withdrawn | Exact profile-keyed booleans; consent/content true, withdrawn false; asset approval required for any image |
| consent_record_reference_private/reviewed_by/notes_private | Excluded entirely, not merely hidden in HTML |

Packet is a strict JSON object with snapshotId, positive revision, exportedAt (ISO instant),
exportId, sourceRevision and arrays Profiles/Roles/Assets/Approvals. Exact executable
field definitions are in `scripts/community/profile-import.ts`. Export tokens must be
opaque public-safe stable identifiers, not private Sheet IDs. Empty optional cells are
omitted; normalize source Yes/No to real booleans only after review. Unknown columns,
contacts, unsafe links/formula-shaped text, duplicates and orphan references reject.
No CSV/spreadsheet output is generated. Do not feed a Sheet dump into this CLI.

The current Sheet lacks digest-bound owner approval and several explicit verification
fields; operators must supply reviewed decisions, never default them to true. A generic
speaker cannot automatically map to the narrower Keynote Speaker category. Multi-role
people share one profile; organizations use Partner records and cannot double as people.
The official timezone stays null; no schedule is inferred from Sheet locale/timezone.

## Image intake

Resolve exact Assets/Profile file IDs privately and compare IDs, MIME, bytes, size,
parent folder, ownership authority and exact usage grant. A shared file or folder called
Approved_For_Publication proves none of these. Connector metadata may omit owners or
image dimensions; missing evidence blocks copying. Verify the full downloaded raster
with a trusted image decoder, review metadata/GPS, obtain exact photo/alt/credit rights,
and prepare reviewed local derivatives. Current registry checks supported extension,
magic signature, containment,10MiB maximum and SHA-256; it is not an exhaustive image
malware/metadata scanner. Rights requiring visible credits are unsupported by this
renderer and must be resolved before import. Do not falsely assert display-credit-free rights.

Only after those gates copy authorized bytes to a reviewed `public/images/...` destination;
never expose a Drive URL or copy private staging directories wholesale. Add the final
local path/hash/alt, rights and public-safe attribution to Assets. The adapter validates
existing approved files; it does not download or copy unapproved originals. Changing
text, links, roles, alt, image bytes/path or attribution changes snapshot content and
requires renewed exact-content owner review. A changed file without a manifest update
fails byte validation. Current six demo images remain uncopied to public assets because rights are not granted; explicitly requested local-only demo copies remain ignored.

## Local workflow

Select Node24 and the established Python contract environment. Create sanitized input
outside Git and a fresh ignored output directory. From repository root:

```sh
node scripts/community/profile-import.mjs /absolute/private/sanitized-tables.json .community-drafts/review-run/candidate.json
node scripts/community/event-registry.mjs validate .community-drafts/review-run/candidate.json /absolute/private/owner-approval.json
```

CLI output uses exclusive creation and is restricted to the real ignored
`.community-drafts` tree. Failure emits a generic diagnostic without candidate values.
A successful candidate is **not published or owner-approved**. Follow EVENT-002's
independent owner approval binding exact digest, snapshot/revision, full record IDs,
valid approval/expiry instants, privacy/rights review and controlled Git/PR/deployment.
The CLI never writes production inputs or an approval manifest. Withdrawal requires an
approved replacement snapshot/unpublish build/deploy; do not re-import withdrawn rows.
This adapter rejects the complete packet on withdrawal; prepare the explicitly reviewed
remaining record set rather than silently dropping rows. Static caches/history remain.

## Reviewed public-feed transport

Host the sanitized approved envelope on the existing organization-controlled GitHub
Pages site, preferably an immutable `/community-feed/<snapshot-digest>.json` and
content-versioned `/images/...` files. This is a recommendation, not a created resource.
Supported hosts are aeglysai.com and shubh-techie.github.io; adding another host needs
review. Keep images on the same origin as the feed. Stable public HTTPS paths have no
authentication/query/private Drive IDs. Image bytes still must match the snapshot's
approved asset digest and rights. No public image rights are currently established.

Envelope: strict `{schemaVersion:"1.0.0", snapshot:<EVENT-002>, approval:<EVENT-002 owner
manifest>, images:[{path:"/images/...png",url:"https://aeglysai.com/images/...png"}]}`.
Every approved asset appears exactly once; no extra fields/images. The independent
reviewed snapshot digest is supplied outside the fetched envelope. It is not a signature
or proof of real consent. No approved hosted feed URL was supplied/created in this task.

```sh
export AEGLYSAI_SHOWCASE_FEED_URL=https://aeglysai.com/community-feed/REVIEWED-DIGEST.json
export AEGLYSAI_SHOWCASE_FEED_SHA256=REVIEWED_SNAPSHOT_SHA256
node scripts/community/profile-feed.mjs
```

Replace placeholders only after owner review. Variables are operator-only, never
PUBLIC-prefixed or embedded in client code. The command accepts no Google tokens or
private Sheets. HTTPS host allowlist, same-origin images, no redirects/cookies/auth,
15-second request timeouts,1MiB JSON/10MiB per image limits and strict existing validation
apply. Verified images and snapshot pair are written only under ignored versioned
`.community-drafts/profile-feed/snapshot-*`. `current.json` points to the last fully
validated version; replacement is atomic. Failed attempts can leave ignored incomplete
staging directories but do not change the pointer. Do not treat those as valid exports.

Offline/network or502/503/504 can retain a revalidated exact pinned cache while approval
is current and all local assets still match.404, redirect, malformed, changed, revoked,
withdrawn or expired proposals fail without fallback. A newer reviewed digest makes an
older cache unusable; an approved empty replacement removes old records. Offline clients
cannot discover a newly remote revocation before local expiry; urgent unpublish requires
explicit pin/replacement/deployment, and cached public copies cannot be recalled.

Inspect staging privately, then use the existing controlled review workflow to deliver
only the approved snapshot/approval pair to `src/data/community` and verified approved
asset files to public/images. No automatic copy into production, commit or deployment.
Production Community Showcase already reads that pair through EVENT-002 and never
imports demo data. Merely running the fetch command does not change the public site.

## Regenerated local DEMO

Six actual sample rows were read through bounded connected Sheets access. Prepare a
sanitized local JSON array containing only profile_id, display_name, category
(speaker/judge/mentor/partner), public_title, short_bio, publication_status
(DEMO_DO_NOT_PUBLISH). Omit private IDs, approval evidence and unapproved professional links.
Use local avatar copies named by stable profile ID under ignored
`.community-drafts/content-002a-feed/demo-images/<profile_id>.png` for explicitly authorized
local preview only. They are not public assets or real identity/appointment evidence.

```sh
node scripts/community/profile-demo.mjs .community-drafts/content-002a-feed/demo-rows.json
npm run dev -- --background
```

This regenerates `.community-drafts/content-002a-feed/preview-feed.json` atomically, hashes
existing PNG files and never creates a publication candidate/approval. Visit
http://localhost:4321/__demo/profiles/. Page reads current feed on each request, without
hardcoded identities. Update/export an allowed Sheet field and rerun the command to
refresh cards, without editing Astro components. The verification modified a local
exported row and restored it; it did not edit the live Sheet. Current dev middleware reads new avatar IDs dynamically; restart is no longer required.

The dev-only `/images/content002-demo/<id>.png` route validates feed membership,PNG
signature/size/digest and returns no-store/nosniff bytes. Missing/changed images yield
initials in the preview. DEMO notice explains simulated category/approval counters and
that speaker samples do not prove keynote appointments. Neither demo route nor original
avatar files enters production builds, including builds explicitly using the dev config.
Actual source approval flags remain No; this demo path cannot publish real content.
