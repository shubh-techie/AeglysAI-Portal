# Speaking showcase authoring — schema1.0.0

Recorded 2026-11-12. Static, review-gated authoring; no live Google source or publishing service.

## Conference metadata

`src/data/presentations.ts` remains authoritative for approved name, organizer, dates, venue,
role, talk title/abstract, participation and slides. Preserve stable slugs/detail URLs.
`src/data/speakingContent.ts` derives the showcase through `speakingShowcaseSchema` in
`src/data/speakingShowcase.ts`. Do not duplicate event facts into Astro markup.

Keep status separate from calendar passage. Completed requires actual recorded delivery;
invitation/acceptance or an elapsed date is insufficient. Withhold unknown titles instead of
inventing them. GICITE's stored Upcoming status is retained; the new listing now explains its
scheduled dates have passed and completion is unverified. ETIC still awaits written confirmation.

## Photographs: zero to four per event initially

1. Obtain exact-image publication rights, any required subject consent and approved captions,
   alt text and credit. Store private correspondence/originals outside public source/assets.
2. Review image content and metadata, remove private EXIF/location data and optimize the
   source dimensions/file size before approving its exact final bytes. No attendee identities
   or organizer-owned images/logos may be assumed cleared from a filename or event invitation.
3. Put only cleared final images under `src/assets/speaking/`, with stable lowercase asset
   paths. Never put unapproved originals in public/; Astro copies that directory wholesale.
4. Add a record under `approvedPhotos[eventSlug]` in `speakingContent.ts` containing id,
   eventId, assetPath, SHA256, descriptive alt, caption, credit, sourceUrl, rightsBasis,
   rightsReference and explicit content/publication/subject-consent approvals. A rights basis
   is OWNER_AUTHORIZED or LICENSED. Unknown/private fields and rights/source URLs fail closed.
5. Run check/build/full tests, inspect generated thumbnails/full images and gallery behavior,
   review the exact diff and obtain separate delivery approval. No UI component edits needed.

The validator rejects cross-event photos, duplicates, more than four records, false/missing
approvals, missing/outside/symlink-escaping files, sources over8MiB and digest changes. Astro
then decodes approved media and generates lazy responsive WebP variants plus a full view
bounded to1920px. Treat configured source assets as public: build optimization is not a
confidentiality boundary. Changing an approved image invalidates the stored digest.

No photos are seeded for any real conference in this task. Synthetic four-photo fixtures
exist only in ignored isolated test builds; they are not participation evidence.

## Recordings and resources

Add approved recording metadata to the structured list in `speakingContent.ts`: exact11-character
YouTube ID, title/channel, context, metadata source/date and publication approval. URLs are
constructed centrally; no autoplay, initial iframe or remote thumbnail. Changing a conference
association also requires a public associationSource and matching event.recordingIds. Never
infer a conference recording from a similar topic or the speaker's identity alone.

The three owner-supplied video IDs were verified via official YouTube oEmbed on2026-11-12;
all titles explicitly identify AEGYTHON2026. They remain separate from ATAI/GICITE/ETIC.
Only the existing approved ATAI first-slide PNG is public. Full PDF and any additional slide
assets require their own existing publication gates; no invented downloads or full-deck promise.

## Future approved Google Sheets/Drive export

A future operator workflow may map stable event IDs, public metadata, photo metadata and
approval decisions into this same versioned contract. Source-only fields such as internal
Drive IDs, Notes, contact information, consent evidence and private source URLs must never be
exported. Download/inspect/clear source assets privately, produce an exact digest-bound packet,
then submit it through repository review. Status flags alone do not establish rights or owner
approval. No browser Sheets fetch, automatic deployment or public feed exists here.

Changing the schema requires an explicit version/review and rejection of incompatible input.
Do not bypass validation to publish pending, withdrawn or unapproved content.

## SPEAK-001A: recording thumbnails and inline player

Use validated IDs or HTTPS YouTube watch/shorts/embed/youtu.be URLs via youtubeId;
canonicalize before deriving watch/thumbnail/embed addresses. Existing event associations
remain unchanged. `SPEAK-001A-THUMBNAILS.json` pins the three inspected JPEG sources.
`node scripts/community/cache-speaking-thumbnails.mjs --verify` checks their exact bytes.
`--refresh` downloads only to ignored review candidates; inspect dimensions/content and
metadata before copying approved candidates to src/assets/speaking-videos and updating pins.
Do not publish blank/default/unavailable images. Astro converts approved sources to local
WebP; new uncached IDs get the styled fallback. The video card imports by ID automatically.

Play is enhanced from a native external link, using Enter/Space; without JavaScript both
thumbnail and Watch on YouTube remain external links. Only activation creates the selected
privacy-enhanced iframe, with descriptive title/fullscreen and no autoplay parameter.
External viewing remains accessible when privacy controls, CSP, region, age or owner
restrictions block embedding. Cross-origin restrictions prevent reliable detection of
YouTube player error pages; do not equate iframe load or HTTP200 with successful streaming.

## SPEAK-001B: owner-approved event images

`src/data/speakingPhotos.ts` holds approved photos keyed by existing event IDs; first photo
is featured, remaining entries are supporting thumbnails. No EventCard/PhotoGallery markup
changes per event. `SPEAK-001B-IMAGES.json` records all ten submitted originals, publication/
exclusion reasons, source hashes, exact integer privacy crops and approved variant hashes.
Owner explicitly authorized these images and Courtesy of Shubh Prabhat attribution;
photo authenticity does not promote engagement statuses. Slides/posters/webpages are
captioned as those media types, not photographs of completed delivery.

Keep all original bytes in private QA storage. Reproduce approved sanitized variants with
`node scripts/community/prepare-speaking-photos.mjs <private-original-directory>`. This
offline command checks original hashes, applies only recorded crops/resize/WebP encoding,
strips metadata by default and rejects variant digest drift. Only sanitized display sources
enter src/assets/speaking/conferences; Astro produces responsive lazy thumbnails and full
views from them. Do not copy uncropped participant lists, meeting codes, private screens
or source originals into public/. The pipeline uses Astro's existing sharp installation.

## Current workflow: SPEAK-001D automatic discovery

The earlier hand-maintained approvedPhotos map and publish-copy command are superseded by
SPEAK-001D-DISCOVERY.md. Review and place ready images in explicitly mapped public folders,
optionally add per-image caption metadata, run npmrunconference:refresh, then reload Speaking.
No image array or component edit. Production build discovers automatically and exports only
optimized generated images. Original/private QA preparation commands remain historical tools;
the legacy publish command now delegates to discovery and cannot recreate old thumbnails as
new source images. No maximum of four photos remains in the active schema.

## SPEAK-001E viewer

No new authoring step: the fullscreen viewer uses the current discovered gallery. Click a
photo in a card or event details; use Previous/Next, arrow keys, thumbnails, Home/End while
focused on thumbnails, or horizontal swipes. Vertical mobile gestures retain scrolling.
Close/Escape/backdrop restores the source-photo focus; closing over event details leaves
that parent open and scroll-locked. Native full-image links and details remain the no-JS
alternative. Event metadata/recording association still requires verified structured source
data; photo presence never changes status. Source masters and optimized assets are unchanged.


## 2026-11-12 — SPEAK-001E final card and viewer alignment (local review)

Equal-height conference cards now use fixed 16:9 media, aligned statuses/dates and bottom actions. Photo and event-detail actions share one accessible fullscreen viewer, including an empty-gallery event. Extended metadata stays in that viewer; native disclosures/image links remain usable without JavaScript. Explicit owner-folder aliases are supported by existing build-time discovery; publication approval boundaries remain unchanged. No video implementation or event-status changes.

Validated Astro check (204 files, zero errors/warnings/hints), production build (28 routes), 151/151 tests, and 28 Chromium viewport/theme/JavaScript cases. All 27 unrelated HTML pages and Watch & Learn HTML are unchanged; 20 public files and ten private originals retain their hashes. See docs/speaking/SPEAK-001E-FINAL-REVIEW.md for screenshots, dimensions, exact inventory and limitations. Cache/Magicast findings remain OPEN. Uncommitted review only; no staging, delivery or deployment.


## Future approved conferences — SPEAK-001F

Use the existing `Presentation` metadata contract in `src/data/presentations.ts`: stable slug, approved publication state, conference name/date/location/format/organizer/source, role/status and delivery evidence, nullable confirmed talk title, description and optional abstract. `publishedPresentations()` gates records and creates existing detail routes; do not publish drafts or infer delivery from images. No Astro component edits are required.

For photos, add an explicitly approved `src/data/conferenceFolders.json` mapping for the same event slug, with a safe canonical folder, optional approved aliases, factual display name, public source URL, credit and publicationReady state. This mapping describes asset publication, not a duplicate conference-content record. Never let an unknown folder create an event. Do not put unapproved material under public/. Keep rejected files/private masters in private staging. After approval, place ready images in the mapped folder and run `npm run conference:refresh`, then reload; production uses `npm run build` and a separately authorized deployment. No Astro restart is normally needed after refresh; copy-only watching is not promised.

The derived versioned `speakingEventSchema` includes photoDirectory, photoPublicationApproved and imageAttribution together with existing event metadata and discovered photos. Generic safe generated paths allow future conferences; decoding, size, digest and cross-event checks remain enforced. Optional per-image caption/alt/fit sidecars do not require a manual image array. New event/content changes still require normal evidence and review; adding a photograph to an already approved folder requires no preservation-pin edit.

The UI follows existing MediaCard principles (16:9 media, flex column, shared surface/text/muted/cyan tokens, bottom action) without modifying or importing its carousel. Fixed summary slots use the first sentence of approved descriptions with visual two-line clamping; full details remain in the viewer/native disclosure. Entire noninteractive card surfaces open the viewer; links and native controls retain their own behavior.


## Current editorial card presentation — SPEAK-001G

Supersedes earlier F card-only visual guidance, preserving its event/discovery contract. Two photo-backed cards per desktop/tablet row; one per mobile row. Render events chronologically. Image-backed cards use16:9 approved contain/cover framing, tiny photo count, minimal status, short event name, dates and role/confirmed-format summary. Long names/talks/descriptions and status qualifications remain in the existing overlay/native disclosure. Unknown role/format wording is omitted from short summaries but retained in full details. Empty events use a compact text entry, with no blank media slot. Explore Event is the single primary action. Native filters remain keyboard/no-JS usable, styled as text tabs.

Media presence is determined by actual discovered content inside the existing media boundary; adding/removing ready photographs requires no Astro changes. CSS :has switches between photographic and compact treatments. The gallery/viewer/discovery implementations and no-JS alternatives are unchanged. No new design system, CMS, dependency or asset approval is introduced.


## Current card and upload workflow — SPEAK-001H

H supersedes the G presentation: three equal-height cards on wide desktop, two on tablet and one on mobile. Every event keeps a16:9 slot; no-photo events have a branded placeholder. Main previews show one hero, two side-by-side photos, three in a large/small arrangement, or the first four in a2×2 mosaic. All photos, including beyond four, remain in the overlay. No per-photo code or array edits.

Owner-designated upload paths `public/conference/ATAI-2026/`, `GICITE-2026/` and `ETIC-2026/` are explicitly mapped aliases of the existing canonical folders. Do not duplicate an image between canonical and alias directories. On case-insensitive macOS the hyphenated upper/lower spellings resolve to the same directory; on case-sensitive CI the policy supports both. Unknown folders remain unpublished. Place only publication-approved, privacy-reviewed images in ready folders; raw/private/unverified images stay outside public/. Existing original exclusions remain unchanged.

Supported extensions JPG/JPEG/PNG/WebP are case-insensitive; decode/type/size validation still applies. Sort is natural numeric English filename order (`photo-2` before `photo-10`) with deterministic raw-name tie-breaks. After upload/removal run `npm run conference:refresh`, then reload. Existing Astro need not restart after refresh; copy-only watching is not promised. Normal production build also refreshes, and live changes require separately authorized deployment. Optional alt/caption/fit sidecars remain recommended. No API key, dependency, CMS or browser filesystem access.

Latest owner-confirmed showcase statuses: ATAICompleted, GICITECompleted, ETICInvitationAccepted. Exact GICITE delivery date remains null; ETIC organizer confirmation/role/title remain unconfirmed. Status evidence is explicit and independent of image availability. Earlier linked engagement records remain protected snapshots and are labelled accordingly.


## Current photo viewer — compact white SPEAK-001H follow-up

Supersedes prior fullscreen photo-dialog presentation only. Conference cards and filters retain their H collage layout. Clicking a photo opens a centered white/light-gray compact dialog in either site theme, with conference name, complete image, first verified caption sentence, Previous/counter/Next and Close. No photo-dialog thumbnails or metadata sidebar. Single images hide Previous/Next; arrows/Home/End/swipe, Escape, focus containment/restoration and scroll lock remain supported.

View Event Details remains the native accessible disclosure containing dates/role/status/organizer/location/talk/description/evidence notes/site/approved recording links and full photo captions/courtesy. Photo galleries in that disclosure retain their own thumbnail navigation. Attribution is preserved there rather than adding metadata to the compact photo dialog. Without JavaScript, native details and original image links remain usable. Image publication approval and refresh/build instructions are unchanged.


## Interaction correction — SPEAK-001H-FIX

Supersedes the white-overlay follow-up's JavaScript disclosure behavior. Photo, title, card body/whitespace and View Photos & Details all open the same white dialog. Primary native summary is enhanced with dialog semantics; its default disclosure toggle is prevented when JavaScript is active. Keyboard users activate the photo links or primary action with Enter/Space as appropriate. External links remain independent. Nonfocusable card surfaces restore focus to the primary action; photo activation restores its photo link.

Cards never expand in JavaScript mode. Full event metadata/website/recording links are available inside the dialog's Full event details disclosure; photo counter/navigation and courtesy remain. The existing card details markup stays as the no-JavaScript fallback. No-JS intentionally uses native disclosure expansion rather than a scripted modal. Do not reintroduce details.open=true on card clicks or clone photo sections/IDs into the dialog. Scroll locking preserves scrollbar space to avoid underlying layout shifts. No image/data/discovery contract change.


## Mandatory current boundary — final SPEAK-001H-FIX

This supersedes earlier instructions to add conference recordingIds or video links to event details. Do not put video IDs/URLs in conference records or EventCard. Current strict event schema rejects recordingIds. Configure every video only in the existing speakingContent.ts recordings array. Event classification/owner provenance belongs to the video record; no reverse reference or existing conference card is required. Conferences work with no videos configured.

Watch&Learn renders all configured recordings using VideoCard, exactly once. Current inventory is3AEGYTHON community recordings and1GICITE2026conference recording. Cache each approved YouTube thumbnail under src/assets/speaking-videos/<ID>.jpg and update SPEAK-001A-THUMBNAILS.json; existing cache-speaking-thumbnails.mjs --verify checks exact bytes. Unknown title/channel stays neutral/null with explicit OWNER_SUPPLIED metadata rather than invented verification. Click-only nocookie players and separate YouTube/no-JS links use existing video.js. Never load players or external thumbnail images initially.

Conference photos/details continue to use the one white dialog from card surfaces/photo/primary action. No YouTube controls or recording links in that dialog, including its Full event details disclosure. Preserve independently verified event statuses/approved photos; removing a video never hides a conference card.


## Current video authoring — SPEAK-001I

This supersedes the earlier instruction to edit speakingContent.ts's inline recordings array. Edit src/data/speakingRecordings.json. A minimal approved record is:

```json
{"id":"YOUTUBE_ID_OR_STANDARD_HTTPS_VIDEO_URL","title":"Approved title","category":"Technical recording","description":"Optional approved description","publicationApproved":true}
```

IDs normalize through the existing YouTube validator. Keep IDs unique. Optional eventId requires associationSource; association is video-side provenance and does not control conference rendering. Do not claim verified metadata by default: omitted channel/source/date remain null and verification defaults to OWNER_SUPPLIED. Explicit VERIFIED records still require supporting metadata. Keep unknown titles neutral.

Run npm run speaking:thumbnails to fetch and decode missing approved HQ thumbnails into src/assets/speaking-videos and update SPEAK-001A-THUMBNAILS.json. Review those assets and changes, then npm run check, npm run build and npm test. Existing reviewed bytes are reused; mismatches are rejected rather than overwritten. --verify checks offline; --refresh creates review candidates only. Old unused caches are retained for explicit review, not deleted automatically. No API key or production-build network call is needed. Saving the data triggers normal Astro source refresh; reload the page after the asset-generation command. Production changes require build and deployment.

VideoCarousel derives all slides, positions and range counts from the approved list. Without JavaScript it remains a native horizontally scrollable row with usable external links. Playback is click-only and independent of navigation. Dragging a thumbnail suppresses accidental playback. Cross-origin iframe gestures belong to YouTube after playback begins; use carousel controls or the surrounding card area to navigate.
