# SPEAK-001C — compact conference cards and event-detail review

Status: local implementation complete; awaiting owner review. No staging,commit,push,PR edit,merge or deployment. Public-original relocation question remains pending; see privacy boundary below.

## Verified baseline and preserved work

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, origin `https://github.com/shubh-techie/AeglysAI-Portal.git`.
Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`, HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; fetched main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 is draft/open/unmerged, zero reviews/check-runs at inspection. SPEAK001 is committed/pushed; A/B remain preserved uncommitted local predecessors. Current work stays on the existing branch; no history rewrite or remote mutation. Existing localhost4321 PID58050/Node24.22.1/devconfig/worktree preserved.

## Scope and behavior

Only Conference Engagements cards change presentation. Featured technical engagement/hero, Watch&Learn, technical resources, proposed topics and collaboration CTA remain preserved. Cards have16:9 approved media, title/date/status, short verified subtitle/status qualification and ViewEventDetails. Three columns at1440, two at768/1024, one at320/375/390/430. Manual previous/next/counter, arrow keys and simulated touch swipes; no autoplay, transition or added animation. One-photo galleries hide redundant navigation. ETIC uses a concise text-based16:9 unavailable-image region.

PhotoGallery compact mode uses CSS cover crops; full sanitized source images remain available via expanded image links/lightbox. Card captions are hidden only in compact presentation, with accurate captions/credits retained in details and expanded view. All source assets/original hashes and data mappings unchanged.

Native details/summary provide a complete no-JavaScript alternative. Supported browsers move the same approved content into a native event dialog on activation, preserving IDs and avoiding cloned content. Full conference name, status/date/location/format/organizer/role, confirmed talk title or accurate uncertainty, approved description/abstract and source links are retained. Captioned event gallery included. No conference-associated recording links exist in verified data; the three AEGYTHON recordings remain only in Watch&Learn.

Dialogs have labelled titles, close buttons, native Escape/cancel handling, safe backdrop dismissal, explicit focus containment/restoration, small-screen scrolling and background-scroll locking. Reference-counted shared lock coordinates nested image/event dialogs. Browser testing found a rapid close/reopen race with separate saved-overflow values; fixed with the shared lock and idempotent close cleanup. Legacy Speaking browser commands delegate to the expanded matrix, retaining earlier image/video assertions.

## Image mapping and factual boundaries

[Existing owner-approved inventory](SPEAK-001B-IMAGES.json) remains authoritative:

- ATAI2026: one sanitized speaker-webpage capture. Completed remains unchanged.
- GICITE2026: four sanitized images: featured desk-photo portrait crop, introduction slide, session-slide crop and speaker poster. Confirmed engagement; completion remains unverified.
- ETIC2026: no enabled images. Awaiting written confirmation remains unchanged.

Attribution Courtesy of Shubh Prabhat throughout. Slides/posters/webpages retain factual captions; photo authenticity is not delivery/affiliation proof. No original byte changes, new associations or synthetic conference evidence. Directory names in the new owner folder are not silently used to enable previously excluded material.

## Validation evidence

- Astro check194files,0errors/warnings/hints.
- Production build28pages; isolated candidate build also28pages, using existing dependencies/config and excluding owner-added raw public originals.
- Complete automated suite142/142,0failures/skips. Pre-C140/140; two added compact-content/safety tests. Existing exact historical hashes retained through the pinned inverse Speaking delta; four synthetic approved photos still exercise real Astro optimization in ignored fixtures. Both card and detail instances are checked as ten anchors for five unique approved images, not ten distinct photographs.
-84Chromium before/after/fixture cases across all seven widths, both themes and JS/no-JS; all28routes render, no overflow/runtime exceptions/missing assets. Grid columns and16:9 geometry asserted. Manual carousel next/previous/arrows/simulated swipe, every event dialog, Tab/Shift+Tab containment, nested image view, Escape/close/backdrop, body-lock restoration and no-JavaScript disclosure/full-image navigation pass. Existing video decode/Enter/Space/correct iframe/external links/fallback assertions retained.
- Watch&Learn generated section and VideoCard/video.js are byte-identical to pre-C; event/photo configuration and canonical presentations hashes unchanged. Other27HTMLroutes byte-identical in both ordinary and isolated output.
- Candidate privacy/credential scans clear; no API/dependency/security-control changes. Existing approved photo crops and metadata-stripped variants remain unchanged. Test privacy assertion now checks generic meeting-link patterns rather than storing actual participant names or meeting identifiers in public test source.

Ignored evidence `.community-drafts/speak001c/`: check-final.log,build-final.log,candidate-build.log,tests-release-review.log,browser-release-review.log,protected-video.json,owner-public-originals.json,before-dist/,candidate/. Earlier isolated test attempts lacked docs/devconfig fixtures; complete archive setup fixes those harness failures. Screenshot decoding was corrected to exclude descendants of closed native details (cached rects alone are not visibility evidence). No tests disabled or gates relaxed.

## Before/after screenshots

Final browser directory: `.community-drafts/speak001c/conference-browser-1794513790074/`.

- [Before desktop](../../.community-drafts/speak001c/conference-browser-1794513790074/before-engagements-1440-dark.png) / [After desktop](../../.community-drafts/speak001c/conference-browser-1794513790074/engagements-1440-dark.png).
- [Before mobile](../../.community-drafts/speak001c/conference-browser-1794513790074/before-engagements-320-light.png) / [After mobile](../../.community-drafts/speak001c/conference-browser-1794513790074/engagements-320-light.png).
- [Mobile event dialog](../../.community-drafts/speak001c/conference-browser-1794513790074/event-modal-320-light.png) / [Desktop event dialog](../../.community-drafts/speak001c/conference-browser-1794513790074/event-modal-1440-dark.png).

Screenshots visually reviewed: compact cards, retained status qualifications, scrollable full details and touch-sized close/controls. Local evidence is ignored, not uploaded to GitHub.

## Concrete privacy boundary: new public/conference originals

Owner added nine images plus.DS_Store under public/conference after the B checkpoint. Hashes match previously reviewed originals; the folder contains uncropped participant/meeting/private-screen material and previously excluded poster/association cases. Astro copies all ten files verbatim into ordinary local dist/conference. The owner was asked whether to move the folder intact to ignored private QA; no answer received at checkpoint. It remains untouched/untracked, with all bytes preserved.

These owner files are explicitly OUTSIDE the proposed change inventory and canonical source patch. Do not stage them, upload the ordinary local distribution, or claim that ordinary build is privacy-cleared. Isolated candidate source/output excludes public/conference and passes all142tests/privacy checks; this is the validated source-delivery scope. Relocation remains a pending local privacy decision. No silent reset/clean/delete/move or build/config workaround was applied.

## Remaining limitations and delivery

Chromium/simulated gestures do not establish Safari/Firefox, physical touch-device or manual assistive-technology/full-WCAG conformance. Player requests remain intercepted in browser tests; external streaming restrictions unchanged. Generic existing image-lightbox title is retained; per-image alt/captions describe actual media type. No hosted CI/live deployment claim.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unsuppressed/unaccepted.

Proposed commit after approval: `feat(portal): add compact conference galleries and details`.
Proposed PR update: make Conference Engagements compact with manual16:9 carousels and progressive event-detail dialogs; preserve approved content/statuses/mappings, full-image views and all video behavior. Validation142/142,194-file clean check,28pages,84browser cases and27unchanged routes. Existing PR42 remains the focused delivery context; no new PR or remote change made. Owner must separately authorize delivery and address the raw-original privacy boundary.

## Inventory and canonical diff definition

Combined scoped candidate against HEAD includes uncommitted A+B+C. Canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, then sorted untracked task-file diffs using `git diff --no-ext-diff --binary --no-index /dev/null <path>`. Exclude ignored QA and owner public/conference originals. Incremental C compares sorted changed files against pre-C working snapshots (or HEAD where not already dirty), normalizing diff/old/new headers to a/<path> and b/<path>. Both patches/hashes stored separately in ignored SPEAK001C checkpoint to avoid self-reference. Index remains empty.

### Incremental SPEAK001C files

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001C-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.browser.mjs`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.browser.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.browser.mjs`
- `scripts/site.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/conference.js`
- `src/components/speaking/showcase/gallery.js`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined scoped A+B+C inventory

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001A-REVIEW.md`
- `docs/speaking/SPEAK-001A-THUMBNAILS.json`
- `docs/speaking/SPEAK-001B-IMAGES.json`
- `docs/speaking/SPEAK-001B-REVIEW.md`
- `docs/speaking/SPEAK-001C-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/prepare-speaking-photos.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.browser.mjs`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.browser.mjs`
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
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/VideoCard.astro`
- `src/components/speaking/showcase/conference.js`
- `src/components/speaking/showcase/gallery.js`
- `src/components/speaking/showcase/video.js`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.ts`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`
