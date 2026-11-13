# SPEAK-001B — approved event gallery review

Status: implemented locally, awaiting owner review. No staging/commit/push/PR update/merge/deployment. “Included” below means candidate public source, not a live publication.

## Baseline and authorization

Branch: `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`. HEAD: `452035a6a56d4abd6100134378beab1c9ff4d879`; latest fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged. Prior SPEAK001A uncommitted candidate preserved; its independent checkpoint remains historical. No alteration of committed history or remote PR content. Owner explicitly confirms all ten images genuine and authorizes showcase use, requires attribution Courtesy of Shubh Prabhat and privacy crops, and prohibits arbitrary event mappings/status promotion.

Original10images retained byte-identical in ignored `.community-drafts/speak001b/originals/`; original SHA256 and true file formats recorded in [image inventory](SPEAK-001B-IMAGES.json). Some supplied .png filenames actually contain JPEG; byte preservation does not rename/re-encode originals. Raw images and sensitive identifiers never enter public/source assets.

## Exact event-to-image mapping

| Event | Included image | Basis / interpretation |
| --- | --- | --- |
| ATAI 2026 | atai-speaker-webpage | Explicit ATAI2026 organizer-page URL and matching approved talk title; webpage capture, not delivery photograph |
| GICITE 2026 | gicite-desktop-photo (featured) | Original desktop photograph visibly contains GICITE2026 branding; published crop excludes all private screens |
| GICITE 2026 | gicite-speaker-slide | Explicit GICITE name/dates in speaker-introduction slide; not completed-delivery evidence |
| GICITE 2026 | gicite-talk-session | Explicit GICITE branding in session slide; crop excludes meeting/browser/participant panels |
| GICITE 2026 | gicite-speaker-poster | Explicit GICITE2026 speaker announcement artwork; not completed-delivery evidence |
| ETIC 2026 | none | Existing text-only card remains |

Five excluded originals: `unmapped-zoom-talk` (matching title alone does not confirm event), `unmapped-speaker-list` (no visible event ID), `gicite-group-one` and `gicite-group-two` (near-duplicates with attendee/meeting details, unnecessary for four-image selection), `etic-speaker-poster` (Confirmed Speaker claim conflicts with required awaiting-confirmation status). Exclusion is not a claim that owner-supplied images are inauthentic.

All included captions/alt text distinguish real photograph, slide, poster and webpage capture. Only one included image is an actual desk photograph. ATAI remains Completed; GICITE completion remains unverified; ETIC remains awaiting confirmation. Authentic images do not independently establish successful delivery, organizer affiliation or IEEE approval claims appearing in supplied artwork.

## Image preparation and existing architecture

Exact crops in inventory: ATAI removes browser chrome; session capture retains slide area only; desktop source retains speaker portrait, excluding private screens. All10original hashes reverified. Only five sanitized WebP variants enter src/assets/speaking/conferences. Existing sharp optimizer performs deterministic integer crops, bounded1600px resize and WebP quality85, with metadata stripped; no generative or synthetic content. `prepare-speaking-photos.mjs` reproduces approved bytes and rejects original/variant digest drift. Astro creates responsive lazy WebP widths320/640/960/1280 as permitted by source width, and bounded full-view variants.

Structured `speakingPhotos.ts` configures gallery order and approvals; the first GICITE image is featured with three supporting thumbnails. Existing EventCard, PhotoGallery and gallery script are byte-identical to HEAD. Existing gallery 4:3 cover thumbnails use full-image lightbox/native links for complete views. First desktop review revealed the portrait was clipped by cover sizing; source-only crop corrected, with no component/style change. No new CMS/dependency/service.

## Preservation and validation

- Fresh Astro check191files: zero errors/warnings/hints;28-page production build.
- Full140/140tests, zero failures/skips, versus prior SPEAK001A138/138. Two added real-image mapping/privacy/pin tests; existing isolated four-photo synthetic pipeline retained. Its import injection is updated for structured photo data, not disabled. Original historical hashes remain in place through an exact inverse Speaking delta.
-84Chromium cases across320/375/390/430/768/1024/1440, light/dark, JS/no-JS and before/after/synthetic fixture; all28routes render. Real-image decode, one/four image per-gallery isolation, arrows, Escape/focus return and no-JS full-image navigation; existing fixture focus containment and error fallback continue. Video thumbnail/Enter/Space/player mappings and separate external links remain covered.
-27unrelated HTMLroutes byte-identical; actual Watch&Learn generated section byte-identical to pre-B. VideoCard/video.js/pageindex/styles/schema match protected SPEAK001A file hashes. No synthetic photos in normal build. ETIC remains gracefully text-only.
- All public variants visually inspected; EXIF/XMP/IPTC absent. Output scans reject meeting code, participant-name strings, private key/token patterns; excluded originals absent from source asset tree. No arbitrary event assignment or new delivery claims.
- Existing localhost4321 PID58050/Node24.22.1/config/worktree preserved. No active process restart or other repository access. Actual localhost HTTP requests for all five gallery variants return200/image-webp. No hosted CI/live deployment claim.

## Before/after screenshots and raw evidence

Before: [desktop](../../.community-drafts/speak001a/video-browser-1794507033676/engagements-1440-dark.png), [mobile](../../.community-drafts/speak001a/video-browser-1794507033676/engagements-320-light.png).
After: [desktop](../../.community-drafts/speak001b/gallery-browser-1794509974045/engagements-1440-dark.png), [mobile](../../.community-drafts/speak001b/gallery-browser-1794509974045/engagements-320-light.png).
Expanded gallery: [mobile](../../.community-drafts/speak001b/gallery-browser-1794509974045/real-gallery-320-light.png), [desktop](../../.community-drafts/speak001b/gallery-browser-1794509974045/real-gallery-1440-dark.png).

Ignored evidence under .community-drafts/speak001b: image-inventory.json, originals/, before-dist/, prior-working-file-hashes.json, prepare-final.log, check-final.log, build-final.log, tests-final.log, browser-release-review.log, local-image-results.json and browser output/results.json. Earlier screenshots before scrolling lazy images into view remain historical; final harness explicitly scrolls and asserts decode before section capture. A late lazy-request race during archived-root switching was corrected by binding requests to their originating navigation; final run reports zero missing assets.

## Limitations and release boundary

Originals remain private; only sanitized variants included. Owner authorization is recorded, not an independent legal/organizer audit. Two associations remain unknown; ETIC poster conflict remains unresolved. Gallery imagery is not a status upgrade. Chromium does not establish Safari/Firefox/device/manual-AT/full-WCAG conformance. External YouTube playback remains restriction-dependent and is intercepted in browser tests, unchanged from SPEAK001A.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, without suppression/acceptance. No security controls changed.

Proposed commit after separate authorization: `feat(portal): add approved conference photo galleries`. Existing draftPR42 is the delivery context; no new PR created or existing PR changed. Stop before staging/committing/pushing/merging/deploying. Owner must approve exact scope before any delivery.

## Canonical diff and file inventory

Combined candidate diff against HEAD includes the pre-existing uncommitted SPEAK001A changes. Canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, then sorted untracked file patches via `git diff --no-ext-diff --binary --no-index /dev/null <path>`. SHA256 and patch stored separately ignored in SPEAK001B checkpoint/review.patch to avoid self-reference. Incremental B inventory below compares each file against pre-B working snapshots or HEAD, so prior video work is not misreported as newly implemented.

### Incremental SPEAK001B files

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001B-IMAGES.json`
- `docs/speaking/SPEAK-001B-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/prepare-speaking-photos.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.browser.mjs`
- `src/assets/speaking/conferences/atai-speaker-webpage.webp`
- `src/assets/speaking/conferences/gicite-desktop-photo.webp`
- `src/assets/speaking/conferences/gicite-speaker-poster.webp`
- `src/assets/speaking/conferences/gicite-speaker-slide.webp`
- `src/assets/speaking/conferences/gicite-talk-session.webp`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.ts`

### Combined unstaged SPEAK001A + SPEAK001B inventory

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001A-REVIEW.md`
- `docs/speaking/SPEAK-001A-THUMBNAILS.json`
- `docs/speaking/SPEAK-001B-IMAGES.json`
- `docs/speaking/SPEAK-001B-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/prepare-speaking-photos.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.browser.mjs`
- `scripts/community/speaking-video.test.mjs`
- `scripts/site.test.mjs`
- `src/assets/speaking-videos/OLASKGI-aFw.jpg`
- `src/assets/speaking-videos/Uw6hD61RqNM.jpg`
- `src/assets/speaking-videos/tn5RhKbzRcw.jpg`
- `src/assets/speaking/conferences/atai-speaker-webpage.webp`
- `src/assets/speaking/conferences/gicite-desktop-photo.webp`
- `src/assets/speaking/conferences/gicite-speaker-poster.webp`
- `src/assets/speaking/conferences/gicite-speaker-slide.webp`
- `src/assets/speaking/conferences/gicite-talk-session.webp`
- `src/components/speaking/showcase/VideoCard.astro`
- `src/components/speaking/showcase/video.js`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.ts`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

Incremental B patch definition: sorted incremental files, individual binary no-index diffs against their pre-B working snapshot (or HEAD where unchanged before B), with diff/old/new header paths normalized to a/<path> and b/<path>. New files use /dev/null. Both incremental and combined patch hashes are stored in ignored checkpoint.json; originals/evidence are excluded.
