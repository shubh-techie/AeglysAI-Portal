# CONTENT-002A — Approved public-feed integration review

Historical candidate checkpoint; current baseline, sync acceptance and limitations are in [FINAL review](CONTENT-002A-FINAL-REVIEW.md).

Recorded2026-10-26. Local implementation ready for review, **not staged/committed/published**.
Supersedes the earlier uncommitted Sheets/Drive candidate, preserved under ignored
`.community-drafts/content-002a/preserved-reviewed-candidate` with its original manifest.

## Baseline and scope

Origin/main and task HEAD: `f7e9c12414c2795d7ddcdbdcae965d9406101fbb`. Latest observed
Pages run40411897198 succeeded at that revision; no new release was dispatched. QA PR34
is still draft/open/unmerged with no reviews observed, not security acceptance. Explicit
owner instructions authorize continuing CONTENT002A locally despite the earlier QA
sequencing gate. QA commit68cbbf4/branch and219 evidence files remain preserved.

Primary root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, fresh-main branch
`feat/AEGLYSAI-PORTAL-CONTENT-002A-drive-feed`. Node24.22.1/npm11.19.1/Astro7.3.4;
observed sole primary loopback4321 listener PID18137. Previous primary14283 was identified
and stopped natively before switching; uncommitted work carried without reset/stash/clean.
Historical branches/worktrees/source/assets/banner and other repositories untouched.

The baseline production showcase already used EVENT-002's fixed approved snapshot pair,
not demo.ts. The earlier local `preview/profiles-demo.ts` hardcoded six sample records;
those identities are now removed from code and supplied through a regenerated ignored
local feed. Production remains static and honest-empty until a real approved pair exists.

## Source and permission assessment

Connected Drive/Sheets skills used read-only against the exact owner sources. Metadata,
public-profile columns and bounded approval flags were read; consent-reference/reviewer/
review-note/role-evidence/private-folder columns were not downloaded. No Workspace writes,
registrations, private master export, credentials or private source IDs in public code.
Six actual rows remain DEMO_DO_NOT_PUBLISH with No consent/content/asset approvals and
Not granted usage permission. Local sample use explicitly requested by owner is not
public rights or independent exact-content approval. Real professional links omitted.

Six referenced PNG originals were streamed through authenticated connector references
into ignored0600 local demo storage only. No bearer references saved, no public/images
copy. Python's certificate-store download failed; system curl succeeded with normal TLS
verification (no verification bypass). All six PNGs fully decoded with existing Sharp,
1254×1254; generic illustrated samples, not identity verification. Available Drive metadata
did not establish ownership/public usage rights. Named approved folder is not evidence.
No approved production feed URL, real publication snapshot or owner approval produced.

## Architecture

See [mapping/operations](SHEETS_DRIVE_PROFILE_IMPORT.md),
[SPEC027](../specs/SPEC-027-sheets-drive-profile-import.md) and
[ADR014](../adr/ADR-014-reviewed-public-feed-transport.md).

- Offline strict sanitized-table adapter maps Profiles/Roles/Assets/Approvals into the
  existing EVENT-002 snapshot. Stable people support multiple approved roles; Partner
  remains an organization record. Generic speaker requires a separate explicit keynote
  category decision; Sheet timezone/date/submission never establishes approval.
- Operator-side configurable HTTPS feed plus independently reviewed expected digest.
  Strict envelope reuses registry, owner expiry/digest, privacy and image validators.
  Existing approved organization host allowlist, same-origin public HTTPS image URLs,
  no queries/credentials/redirects, bounded streaming/timeouts. No visitor fetching of
  Sheet, feed, approvals, Drive links or credentials. No backend/database/dependency.
- Complete validated versions enter ignored staging; current pointer changes atomically
  only after local bytes validate. Network/502/503/504 may retain only exact pinned,
  unexpired, asset-valid cache. Malformed/missing/redirected/changed/revoked/expired
  proposals reject without fallback. A new trusted pin prevents old-cache resurrection;
  approved empty replacement handles unpublish. Offline cannot discover new remote
  revocation until local expiry: explicit owner pin/replacement/deploy remains necessary.
- Recommend existing GitHub Pages custom domain for immutable digest-named feed JSON and
  versioned public images, not raw private Drive downloads. No hosting was created.
  Staging is still followed by reviewed Git delivery of the approved pair/assets. Merely
  fetching does not publish. Production Community Showcase continues through EVENT-002.
- Local DEMO exporter reads sanitized actual Sheet rows, produces an ignored feed and
  hashes local avatars. Preview page reads that feed, reuses existing renderer and
  explains simulated flags/counters. Renderer adds only an optional server-side image
  availability callback; default production behavior is unchanged. Dev-only ID-enumerated
  avatar route serves PNG bytes with no-store/nosniff. Missing/mismatched images become
  initials. Neither route nor avatar originals enters either production build config.

## Before/after evidence

| Verification | Earlier reviewed candidate | Revised feed candidate |
| --- | --- | --- |
| Astro diagnostics |149 files, zero diagnostics |154 files, zero diagnostics |
| Full tests |93/93 |101/101, zero failures/skips |
| Production pages |28, unchanged |28, all HTML byte-identical to baseline |
| Explicit dev-config build |28, no demo |28, no demo/avatar routes/files |
| Preview records |Hardcoded six samples |Regenerated feed from six actual Sheet rows |
| Avatar preview |Initials only |Six decoded Drive-backed local-only PNG samples |
| Browser matrix |28 cases |28 cases at seven widths, two themes, JS/no-JS |

New feed groups cover trusted digest/independent approval, unavailable/expired cache,
malformed/changed/missing/redirected/revoked responses, withdrawal replacement, destination/
size/privacy limits, asset URL manifest and actual isolated CLI staging/offline retention/
failed refresh pointer preservation. Existing import groups cover multiple roles, missing
or withdrawn consent, private fields/formulas, asset ownership/credit/digest/path gates,
CLI exclusive/contained output. Existing86 tests include registry13 groups with isolated
approved/rejected/unpublish builds and2026/2027/navigation/registration regressions.
No clean install; existing offline Python parser environment and installed dependencies reused.

Chrome155/macOS matrix320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS checks six
cards/four categories/one main/no overflow/noindex/all six loaded avatars. Judge filter
yields two cards. Zero runtime/HTTP errors in successful matrix. Mobile320/light and
1440/dark screenshots inspected; new evidence runs are isolated, not historical overwrites.
Initial image probes found missing dynamic-route static-path enumeration; corrected before
final passing run. A fixed400ms image-readiness check was insufficient; final harness waits
for actual completion/decode, and scrolls images into view for screenshot painting.
Failed probes remain separate evidence, not reported as application release regressions.

Regeneration probe changes/restores one local exported name without Astro edits; page
reflects new feed. A mismatched avatar digest produces initials; restoring feed restores
six images. Live Sheet not edited, no claim of automatic Sheet polling/sync. New avatar
IDs may require dev restart for static-path enumeration. Optional real links absent
because not approved; synthetic link/URL checks remain covered by existing validators.

Both builds scanned for demo names/IDs/private Sheet/consent-note markers. No production
snapshot/approval pair or original avatar assets created. Source/credential/link/whitespace
checks and baseline asset preservation verified. No actual real-person approval, hosted
feed integration or production publication claimed. Safari/Firefox/physical devices/manual
screen readers untested. No full WCAG/penetration certification.

## Security, operations and delivery

Current npm audit: one high http-cache-semantics finding, unsuppressed. Magicast0.5.5
still declares embedded source-map-js1.2.1. Both remain OPEN, without acceptance. Digest
and Boolean attestations are not authenticated identity/consent evidence. Real rollout
still needs exact public copy/role/link/affiliation verification, photo ownership/usage/
attribution approval, independent owner digest manifest, security/code/privacy review,
authorized Git/PR/merge/deploy. Retained offline cache cannot provide immediate remote
revocation; short validity, explicit pin and urgent unpublish remain operational controls.

Operator steps and hosting/configuration examples are in the guide. Do not copy demo
staging into production. No browser private URLs/tokens or public raw Drive references.
No database, backend, Google Sheet changes, security suppression or unrelated feature.
QA001 remains open. No staging, commit, push, merge, deployment or next task.

Ignored evidence `.community-drafts/content-002a-feed`: check/build/tests/devconfig-build,
audit-live, image-decode, timestamped browser results/screenshots, update-probe-final and
review manifest. Prior evidence retained. Canonical diff recorded separately to avoid
self-reference; this review's exact inventory is frozen in that manifest.

Proposed PR: `feat(portal): support approved Drive-backed profile feed`. Explain controlled
operator-side transport, independent digest pin, strict fallback, local regenerated demo,
101 passing tests, unchanged production HTML and unresolved security/rights/browser limits.
Draft only after separate review authorization. This is not approval to host real records.
