# ADR-015 — Static speaking-event and media publication contract

Recorded 2026-11-12. Accepted for this local implementation under SPEAK-001; no publication
or deployment approval inferred.

The portal already owns approved speaking metadata in `presentations.ts`, consumed by Home,
detail pages and Speaking. Event photos and recordings need their own rights/association
checks without duplicating conference facts or changing those consumers.

Derive a versioned `1.0.0` showcase bundle from the existing approved records. Add an offline
strict schema and an explicit approved-photo map/recording list, not a database or live feed.
Keep stable presentation slugs as event IDs. Preserve recorded participation status; an
elapsed date can display a completion-unverified note but cannot establish delivery.

Photos live under `src/assets/speaking/` only after human content/rights/subject-consent review.
Require a matching digest, confined real path, credit and public rights/source references;
limit each event to four initially. Import only referenced approved assets through Astro's
image pipeline. Produce responsive WebP thumbnails and a bounded full-image view. No private
originals, invitations or consent evidence in public/. Source assets configured for a public
build must themselves be safe to publish; optimization is not a substitute for metadata review.

Recordings use validated YouTube IDs and approved public metadata; conference association
needs explicit source support. Use ordinary watch links so players and remote thumbnails do
not load before a visitor chooses YouTube. The three supplied videos identify AEGYTHON2026,
so keep them in the community-recordings section rather than attach them to conferences.

Reuse native anchors, radio filtering and dialog for progressive enhancement. No-JS image
links remain usable; JavaScript adds gallery navigation, focus containment/return and Escape.
No new library, CMS, database, endpoint, credentials or browser Workspace access.

Alternatives: putting every media field into the legacy presentation interface expands shared
consumers unnecessarily; a separate duplicate event store risks status/date drift; automatic
YouTube embeds add unsolicited network/player cost; externally hosted pending images risk
rights/privacy disclosure. The derived static bundle preserves ownership and review boundaries.

Future Sheets/Drive work can export the sanitized schema after independent owner/rights review.
This ADR does not provision that workflow or make approval booleans proof of genuine consent.
See [SPEC-010](../specs/SPEC-010-speaking-presentations.md) and
[authoring guide](../speaking/SPEAK-001-AUTHORING.md). Existing security findings remain OPEN.

## SPEAK-001A — owner-requested playback enhancement (2026-11-12)

The owner explicitly supersedes the watch-link-only media decision for Speaking video cards.
Keep the same community-recording classifications and external watch actions. Download the
three public hqdefault thumbnails through the controlled offline authoring process, pin
source/digests, inspect for actual content, then optimize and serve locally. No build-time
network fetch. Create only the selected youtube-nocookie iframe following user activation;
no API key, player API script or page-load iframe. Preserve external links for blocked embeds.
The privacy-enhanced endpoint still contacts YouTube after activation; it does not establish
zero tracking or guarantee playback availability. No CSP or dependency change.

## SPEAK-001C — compact conference cards and progressive event dialogs

Keep canonical event/photo data unchanged. Reuse PhotoGallery with a compact16:9 mode for
manual card carousels and full default mode in event details. Cropping is CSS presentation
only; full sanitized source views remain available. Native details/summary provide complete
no-JavaScript content. On supporting browsers, move that same content into one event dialog
per card on activation and restore it on close; do not clone hidden content or duplicate IDs.
A shared reference-counted scroll lock coordinates event dialogs with the existing nested
image lightbox, retaining focus/Escape behavior without allowing background scroll.

This is a local UI implementation decision, not publication/release approval. Watch&Learn
remains byte-identical. Untracked owner originals under public/conference are outside the
proposed source inventory; do not include raw files in delivery or silently relocate them.

## SPEAK-001D — approved folder discovery supersedes manual photo arrays

Use explicit reviewed folder/event policy and operator publication-ready placement; discover
files at build/refresh time, validate actual image decoding, preserve inputs, and generate
metadata-stripped noncropped displays/thumbnails. Optional per-file captions retain verified
semantics; absence of captions gets neutral labels, never inferred delivery. No photo-count
maximum. Unknown folders never enter the production conference artifact. Existing dev script
and Astro configuration remain unchanged; refresh updates an imported generatedJSON. Build
runs discovery before Astro and prunes only generated dist/conference to approved outputs.

Only six media interiors vary in historical projections; surrounding HTML, CSS, event data
and exact package-script delta remain pinned, with raw-output and add/remove build tests.
This replaces fixed photo counts and manual image arrays, not content/consent controls.
See SPEAK-001D-DISCOVERY.md for the approved operator workflow and limitations.

## SPEAK-001E — one fullscreen photo viewer with verified event context

Use one native photo dialog for all discovered galleries. Render event facts as escaped
attributes from the existing typed event record, then populate the viewer with textContent
on activation. Derive photos/thumbnails/counts from the clicked gallery DOM; no image list
or per-photo component is added. Associated recording links come only from existing verified
event IDs; the AEGYTHON community recordings remain unassociated.

Desktop uses94%viewport and70/30 photo/context columns; mobile uses95%viewport with image,
controls,thumbnails,then details in a separate scroll area. Contain rendering preserves the
complete approved image. Reuse the shared reference-counted scroll lock for photo viewing
from an event dialog; close restores focus and leaves its parent locked. Native image links
remain the no-JavaScript fallback. This is local implementation, not release approval.


## 2026-11-12 — SPEAK-001E final card and viewer alignment (local review)

Equal-height conference cards now use fixed 16:9 media, aligned statuses/dates and bottom actions. Photo and event-detail actions share one accessible fullscreen viewer, including an empty-gallery event. Extended metadata stays in that viewer; native disclosures/image links remain usable without JavaScript. Explicit owner-folder aliases are supported by existing build-time discovery; publication approval boundaries remain unchanged. No video implementation or event-status changes.

Validated Astro check (204 files, zero errors/warnings/hints), production build (28 routes), 151/151 tests, and 28 Chromium viewport/theme/JavaScript cases. All 27 unrelated HTML pages and Watch & Learn HTML are unchanged; 20 public files and ten private originals retain their hashes. See docs/speaking/SPEAK-001E-FINAL-REVIEW.md for screenshots, dimensions, exact inventory and limitations. Cache/Magicast findings remain OPEN. Uncommitted review only; no staging, delivery or deployment.


## 2026-11-12 — SPEAK-001F dynamic event/media-card closure (local review)

Reconciled all ten submitted originals and nine archived owner-folder image copies against saved hashes; no original missing, no Git restoration required. Existing publication exclusions remain private. Current ready count remains ATAI1/GICITE4/ETIC0. Added a complete factual asset inventory, generic validated conference asset paths and derived photo-directory/approval/attribution fields to the existing event contract. Existing presentations.ts and approved folder policy configure future events without Astro changes; no parallel event store or CMS. Compact summaries use existing approved descriptions. Card surface, image and action open the same accessible viewer. MediaCard/MediaCarousel and YouTube sources remain unchanged.

Validated clean Astro check204files, 28-route production build, 152/152 automated tests and28 Chromium viewport/theme/JS cases. New isolated real-build fixture proves a future approved event/photo directory renders while draft events and rejected/unknown folders stay unpublished. Existing image add/remove and production-inclusion tests pass.27unrelated HTML routes and Watch&Learn HTML unchanged; credential/private-meeting scans clear. See docs/speaking/SPEAK-001F-REVIEW.md and SPEAK-001F-ASSETS.json for exact evidence/inventories. No staging,commit,push,PR mutation,merge or deployment; PR42 remains draft/open. Cache and Magicast findings remain OPEN.


## SPEAK-001H status evidence extension — 2026-11-12

Owner expressly confirms GICITE completion and ETIC invitation acceptance for the current Speaking showcase. Extend the existing event contract with optional strict statusEvidence `{basis: OWNER_CONFIRMED, reference: public HTTPS source}`. Completed events require recorded delivery or this explicit confirmation; noncompleted events cannot carry a delivery date. Preserve null when the exact delivery day was not supplied. Photos and elapsed event dates remain insufficient. Existing invalid-status tests remain and new provenance tests reject PHOTO_EXISTS as a completion basis.

This is an owner-supplied editorial update, not independent conference verification or a new content system. Existing presentation-record routes remain earlier snapshots to satisfy the explicit27-route preservation requirement; links from updated cards identify them as Earlier engagement record. A future canonical detail-record alignment requires a separately reviewed scope rather than silently changing protected routes. Original source records, private evidence and past review reports remain unchanged.


## Owner-mandated independent conference/video sections — 2026-11-12

SPEAK-001H-FIX supersedes earlier bidirectional recordingIds relationships and event-dialog video links. Conference metadata/photos and Watch&Learn recordings remain two arrays in the existing versioned static content bundle; no new store/service. Event schemas/components have no video IDs/URLs. A video may carry an eventId classification and association provenance, without requiring a matching card or reverse video list on that card. Empty video configuration does not affect event rendering. Duplicate identifiers, source/digest checks, verified-metadata rules and publication controls remain enforced; invalid input still fails validation.

Rejected retaining required reverse references or merely hiding video controls in the dialog, because either would preserve the unwanted rendering/data dependency. Selected independent rendering through the existing EventCard and VideoCard. Real build with recordings=[] proves unchanged conference HTML. Videos appear only in Watch&Learn; the photo/details overlay remains unified and video-free.


### SPEAK-001I extension — local implementation, 2026-11-12

Use a native horizontal scroll-snap carousel with the existing Media styling conventions, rather than a carousel dependency. A JSON recordings list feeds the existing validated schema and VideoCard; shared pure YouTube normalization is usable by both Astro and the Node authoring command. A manual approved-thumbnail sync keeps external downloads out of browser startup and production builds. Future records require data and asset review, not component edits. Keep the existing scoped-script security gate unchanged by composing the carousel controller with the already scoped video initializer. Conferences and videos remain independent.
