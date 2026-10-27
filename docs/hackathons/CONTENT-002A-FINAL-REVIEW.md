# CONTENT-002A-FINAL — Profile operations review

Recorded2026-10-26. Implementation ready for review; **live authenticated source sync is
blocked by ADC setup, and no profiles/feed are published or production-approved**.

## Current baseline and preservation

Fetched main advanced to `305d0966f034c531009955a5fb9be23f474147d0`: QA PR34 is actually
merged/closed at that SHA, with Pages run40421530077 successful. No review objects were
observed; merge/deployment is not acceptance of the two open security concerns. Earlier
reports describing QA as draft/open were accurate at their checkpoints, superseded here.

Existing task branch `feat/AEGLYSAI-PORTAL-CONTENT-002A-drive-feed`, primary
`/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, HEAD fast-forwarded to that main.
Archived exact19-file candidate/manifest under ignored content-002a-final storage first.
Backed up the task's development-log append, incorporated merged QA log/docs, then restored
all task entries. No stash/reset/clean/history rewrite or staging. Prior source/avatar
bytes, QA219 evidence, worktrees/branches/banner/assets and other repositories preserved.
Primary localhost4321 observed PID30640, Node24.22.1/npm11.19.1/Astro7.3.4. Native stop
of identified18137 before reconciliation, then restored primary source server.

## What is implemented

One private mode0600 `.community-drafts/profile-source.json` references actual supplied
Sheet/library IDs, source role/rights mappings, owner allowlist, row bound, explicit demo
permission and literal publicationEnabled=false. IDs/credentials absent from tracked
configuration/client/public JSON. The config cannot enable publication. gcloud ADC
provides short-lived bearer credentials in memory; fixed read-only Sheets/Drive GETs,
no redirects, bounded responses/timeouts. A sharing URL or connector session does not
authenticate this CLI. No login, credential provisioning or sharing change performed.

Header-first bounded reads of Profiles/Roles/Assets/Approvals exclude consent-evidence,
private notes/reviewers, role-reference and folder-path columns. Unknown/reordered headers
fail before bulk values are read; public extension fields are read only under exact
expected headers. Identifier-tail checks reject source rows beyond configured limits;
no silent truncation. Raw source rows, owner IDs, file IDs or private evidence never enter
candidate JSON/log output. Only sanitized public fields/opaque export provenance survive.

Source image intake verifies matching Profile/Assets IDs, library ancestry, download
capability, supported MIME/size, configured approved owner identity for real candidates,
explicit usage/asset/credit assertions, MD5 byte stability, full decode/40million-pixel
bound, decoded MIME and SHA-256. Real candidates reject EXIF/XMP/IPTC.10MiB/file and
100MiB aggregate limits. Exact bytes go only to sanitized ignored candidate assets with
stable public-safe hashed paths, never automatically public/images. Rights attestations
and owner IDs are not independent legal/content evidence; EVENT-002 owner review remains.

New profiles, role rows, bios/links, new file IDs or replacements need Sheet/Drive data
changes and sync, not routine Astro/TS changes. Multiple roles share one person. Partner
organizations remain distinct. Generic speaker never implies a real keynote. DEMO IDs
cannot enter real candidates even with publication flags changed; DEMO mode also refuses
real IDs/status. Withheld consent/approval, withdrawal/revocation, duplicates, bad links,
missing assets and unavailable sources fail closed with sanitized error codes.

Preview uses the same existing renderer and ignored generated feed. Dev-only middleware
serves feed-member avatar bytes dynamically, including newly added IDs/formats, with
no-store/nosniff. No restart for new images. Missing/mismatched bytes use initials. Both
normal and explicit dev-config production builds exclude all demo routes/data/originals.
The old ID-enumerated endpoint was replaced, with its code preserved in the19-file archive.
All source/image reads finish before preview replacement. A crash mid local file replacement
can leave safe initials until rerun; incomplete candidate folders remain ignored, not valid exports.

## Confirmed commands and operational status

See [short operator guide](PROFILE_OPERATOR_GUIDE.md): edit Sheet → upload/replace image
→ sync → local preview → independent approval → separately authorize publication later.

- `node scripts/community/profile-sync.mjs init SHEET_ID FOLDER_ID`: implemented, success
  tested against supplied IDs; creates exclusive private config, does not modify Workspace.
- `node scripts/community/profile-sync.mjs doctor`: exercised; returns AUTH_REQUIRED.
- `node scripts/community/profile-sync.mjs demo`: exercised credential-failure path;
  preserves current preview. Positive sync engine/preview verified with isolated API fixtures.
- `node scripts/community/profile-sync.mjs candidate`: exercised credential-failure path;
  positive/negative candidate staging verified with fixtures, never creates owner approval.
- `npm run dev -- --background`, check/build/test commands retain existing Node24 workflow.
- Existing profile-import/profile-demo/profile-feed commands remain supported. Public-feed
  transport still requires explicit independently reviewed digest/config, stages only, and
  respects exact pinned unexpired availability fallback. Invalid/revoked/stale feeds do
  not resurrect old records. No production feed URL exists or was activated here.

Actual supported behavior is local source synchronization, sanitized candidate generation,
local preview and reviewed feed staging. There is **no automatic publishing/scheduler or
public endpoint activation**. Real publication remains the EVENT-002 independent owner
manifest, controlled Git/PR/merge/deployment path with separate authorization.

## Acceptance evidence

Astro check158 files, zero errors/warnings/hints. Full suite105/105, zero failures/skips:
previous101 plus four source-API groups. Normal and dev-config production builds28 pages;
normal HTML byte-identical to prior verified baseline (new main changes only QA docs).
Existing registry/consent/digest/withdrawal/feed offline/malformed/stale/cache and all
2026/2027/navigation/registration routes/regressions pass. No dependency/lockfile change.

Source acceptance uses isolated API fixtures, not private live master mutation. Tests
verify bio change, separately decoded replacement PNG, new fictional profile, multiple
roles, owner/rights/bytes/privacy checks, withholding/withdrawal, duplicate/missing assets,
unavailable service and invalid old owner digest after content change. Browser probe runs
actual synchronize operation, confirms changed bio/new cards/replacement image SHA through
local middleware and multiple roles, then restores original feed/avatar bytes. No Astro
component edits during that workflow. No live Sheet edits or claim of authenticated sync.

Chrome responsive28 cases:320/375/390/430/768/1024/1440, both themes, JS/no-JS; six avatars
loaded, four categories, single main/no overflow/noindex and Judge filter. Zero captured
runtime/HTTP errors. Existing semantic controls/themes/fallback preserved; no new user UI
or focus flow except existing preview. Physical devices, Safari/Firefox and manual AT not
verified. No full WCAG/security certification. All temporary verification browsers closed;
primary server retained. Prior failed JSON-fixture-directory placement was corrected before
passing full suite; no legacy tests weakened. No destructive historical evidence reruns.

Ignored evidence root `.community-drafts/content-002a-final`: check/build/tests/devconfig
logs, source-tests, doctor/live-demo/live-candidate error logs, browser results/screenshots,
acceptance-results, audit-live and review manifest. Prior19-file and older checkpoints
retained. Exact inventory/file hashes/canonical diff freeze separately to avoid self-reference.

## Security and remaining setup/activation blockers

Unsuppressed audit still reports one high http-cache-semantics finding; Magicast0.5.5
still declares embedded source-map-js1.2.1. Both OPEN; no risk waiver/suppression/control
change. gcloud installation is verified but usable authorized ADC is missing. Organizer
must provision approved OAuth scopes and source access outside Git, then pass doctor and
an actual live demo sync. That live acceptance is not substituted by connector access or
mock tests; implementation readiness is not completed operational commissioning.

Real source initial setup still needs explicit public affiliation/attribution/credit
columns, verified owner allowlist, exact role/consent/content/photo rights and no current
withdrawal. Final bounded connector recheck confirms six DEMO_DO_NOT_PUBLISH rows, No consent/content/asset approvals, Not granted image usage, and missing public extension headers. This connector read does not authenticate the separate gcloud CLI. No public image rights inferred
from the owner's local-demo request or source booleans. Resync before final owner review;
source changes after a read require another sync and fresh digest approval. Revoked source
sync rejects but does not automatically remove deployed content; controlled replacement/
unpublish/deployment and cache/history review remain mandatory.

Approved production-feed hosting design: organization-controlled existing Pages, immutable
versioned approved envelope and hashed image paths; exact URL/domain/path must be reviewed
and verified later. No URL/storage was invented or created. Existing transport's pinned
fallback cannot learn a new remote revocation while offline; expiry/explicit pin/update
controls remain necessary. No automatic publishing or hosted credential service introduced.

Stop before staging/commit/push/merge/deploy/activation. No unrelated task started.

## Exact review inventory

```text
astro.dev.config.mjs
docs/DEVELOPMENT_LOG.md
docs/adr/ADR-014-reviewed-public-feed-transport.md
docs/adr/README.md
docs/hackathons/CONTENT-002A-FINAL-REVIEW.md
docs/hackathons/CONTENT-002A-REVIEW.md
docs/hackathons/PROFILE_OPERATOR_GUIDE.md
docs/hackathons/SHEETS_DRIVE_PROFILE_IMPORT.md
docs/specs/README.md
docs/specs/SPEC-027-sheets-drive-profile-import.md
scripts/community/preview/ProfilesDemo.astro
scripts/community/preview/profiles-demo.ts
scripts/community/profile-demo.mjs
scripts/community/profile-feed.mjs
scripts/community/profile-feed.test.mjs
scripts/community/profile-feed.ts
scripts/community/profile-import.mjs
scripts/community/profile-import.test.mjs
scripts/community/profile-import.ts
scripts/community/profile-source-fixture.mjs
scripts/community/profile-source.test.mjs
scripts/community/profile-source.ts
scripts/community/profile-sync.mjs
scripts/community/profile-sync.ts
src/components/showcase/EventShowcase.astro
```
