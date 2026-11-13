# SPEAK-001H — conference tile collage and split viewer review

Status: implemented and validated locally. No staging, commit, push, PR edit, merge or deployment. Existing A–G history/work/assets preserved.

## Verified baseline

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; freshly fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`; remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. PR42 remains draft/open/unmerged with no hosted checks/reviews reported. Prior G combined hash matched `64ffb1f9797049b78024abfd2c57d7ab35f8085adbf781602107f4e6e3991445` before editing. Localhost4321PID58050, Node24.22.1, configuration and original worktree preserved. Index empty.

## Implementation and image inventory

Three equal-height wide-desktop cards, two tablet columns, one mobile column; all keep fixed16:9 media and bottom View Event Details actions. One image is a hero, two side-by-side, three a larger image plus two smaller images, four or more a2×2 preview of the first four. All discovered images remain in the overlay. Empty ETIC is a branded button/placeholder and remains visible in All. Small photo-count labels reflect actual counts, never expected future uploads. No controls over image content; slide artwork retains contain fit, safe portrait uses its approved cover fit.

| Event / approved aliases | Current images | Current owner-supplied status |
| --- | --- | --- |
| ATAI / atai-2026, ATAI 2026, ATAI-2026 |1|Completed|
| GICITE / gicite-2026, GICITE_2026, GICITE-2026 |4|Completed|
| ETIC / etic-2026, ETIC-2026 |0|Invitation Accepted|

No new photos uploaded in this task; the owner's prospective3/4/2 example is not asserted as the actual inventory. Ten originals and fifteen public image files (five ready sources, ten optimized variants) are byte-identical. Two caption sidecars and generated descriptive inventory changed: GICITE portrait/poster no longer say completion unverified, but explicitly retain that an image does not establish delivery. Source dimensions/hashes/paths remain as recorded in SPEAK-001F-ASSETS.json; its old caption/status snapshots remain historical. Current descriptions are in speakingPhotos.generated.json and sidecars. Prior private/ambiguous image exclusions stay excluded. Attribution remains Courtesy of Shubh Prabhat. No synthetic photos or new organizer endorsement.

## Status integrity and protected records

Owner instruction H explicitly changes GICITE to Completed and ETIC to Invitation Accepted. Derived speakingContent records carry strict OWNER_CONFIRMED statusEvidence/public reference; no photograph or calendar inference. GICITE exact delivery date remains null, final talk title unconfirmed; no fabricated November6/7 delivery day. ETIC is never completed; written organizer confirmation, role/title remain unconfirmed. All/Completed/Invitation Accepted filters show3/2/1 via pointer and native keyboard selection. Obsolete Confirmed/Awaiting filter labels removed from the current showcase.

All27other routes, including earlier individual speaking records, remain byte-identical as explicitly requested. Those records consequently still contain their earlier GICITE confirmed/upcoming and ETIC acceptance-sent wording. Updated cards label those links **Earlier engagement record**, rather than silently presenting them as current owner confirmations. This scope distinction is intentional and a remaining content limitation; independent source verification/canonical detail-record updates are not claimed. Current showcase/overlay uses the owner's latest status.

Completed events require recorded delivery or explicit owner provenance, and noncompleted events cannot carry delivery dates. Existing unsupported-completion tests remain, with additional tests rejecting PHOTO_EXISTS provenance and retaining null dates after owner confirmation. Photo approval alone cannot change status.

## Dynamic uploads and gallery

Explicit approved hyphenated owner aliases support the requested upload directories on macOS and case-sensitive CI. Natural numeric filename sorting uses English numeric comparison plus deterministic raw-name tie-breaks. JPG/JPEG/PNG/WebP matching is case-insensitive, with actual format/decode/size checks. Unknown/publication-disabled folders and private staging are excluded. Invalid known-folder images fail closed before production generation. No photo-count ceiling.

After adding/removing an approved ready file: run `npm run conference:refresh`, then reload; existing Astro does not need restart. Production `npm run build` refreshes and includes optimized assets; a separate authorized deployment is needed for live changes. No file-copy-only hot-reload promise. New events still use existing metadata/folder policy, not Astro edits. No CMS, dependency/API key or browser filesystem.

Existing LinkedIn-style modal retains94%viewport desktop70/30 split, mobile stack/scroll, contain-fit full image, event facts/status/role/date/location/talk/description/links/courtesy, optional verified recording, controls outside image, dynamic `1 / 4` counter and thumbnails. Every collage cell opens the correct selected image. Placeholder and details actions also open the modal. Escape/arrows/Home/End/swipe, focus containment/restoration, background lock, Close/backdrop and error recovery remain. No-JS native details and full-image links remain usable; placeholder has the adjacent native disclosure alternative.

## Validation

- Astro check204files:0errors/warnings/hints. Production build28routes. Full automated suite154/154,0failures/skips.
- Real Astro add/remove tests3/5→4/6→3/5→2/5 verify dynamic counts and collage2/3/4 cells while all photos remain present. Approved-folder aliases/natural1,2,10 ordering tested. Mixed-case decoding, invalid images, unknown/rejected folders, future-event configuration and production optimized-only inclusion pass.
-28Chromium cases across320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS/reduced motion; all28routes render.0missing assets/runtime exceptions/overflow.
- All3desktop cards visible/equal-height;16:9 media; aligned44px-or-larger actions. At1440 all490.75px;390 all469.88px;320 all444.27px.
- Pointer and ArrowRight filter tests3/2/1. All collage-cell selections, thumbnails/counters, previous/next, arrows/Home/End, swipe, image decoding/error fallback and modal focus/Escape/close/lock pass. Empty placeholder opens correctly and restores focus. No-JS disclosure exposes full metadata/photos.
- Three YouTube thumbnails/click-only privacy-enhanced players/links unchanged and pass regressions. MediaCard/MediaCarousel unchanged. Watch&Learn HTML and27other route hashes unchanged. Credential/private-meeting-link scan clear. No security gate or npm audit changes.

Initial check caught duplicate-property override syntax, fixed with explicit Object.assign merge. Initial suite exposed obsolete filter-ID assertions, reconciled to the authorized statuses; no skips/suppression. Static Speaking/style pins updated only for reviewed changes; dynamic media boundaries remain protected.

Evidence `.community-drafts/speak001h/{check-verified,build-verified,tests-verified,browser-verified}.log`, preservation.json; layout-1794526206410/results.json contains28case metrics.

## Before/after and open-viewer screenshots

- [Before1440dark](../../.community-drafts/speak001h/layout-1794526206410/before-1440-dark.png) / [After1440dark](../../.community-drafts/speak001h/layout-1794526206410/after-1440-dark.png) / [After1440light](../../.community-drafts/speak001h/layout-1794526206410/after-1440-light.png).
- [Before390light](../../.community-drafts/speak001h/layout-1794526206410/before-390-light.png) / [After390light](../../.community-drafts/speak001h/layout-1794526206410/after-390-light.png) / [After390dark](../../.community-drafts/speak001h/layout-1794526206410/after-390-dark.png).
- [Desktop overlay](../../.community-drafts/speak001h/layout-1794526206410/viewer-gicite-2026-wru-key-talk-1440-dark.png) / [Mobile overlay](../../.community-drafts/speak001h/layout-1794526206410/viewer-gicite-2026-wru-key-talk-390-light.png).

Final desktop collage and mobile overlay visually inspected; earlier pass mobile cards also inspected. Screenshots/evidence remain ignored/local, not uploaded.

## Limitations and delivery boundary

Future photo uploads have not occurred. Only approved ready images may enter the mapped folders; old excluded originals are not automatically republished. Earlier protected detail-record status snapshots remain as explained above. No independent conference verification, exact GICITE delivery date or final talk title supplied. Chromium emulation is not physical-device/manual-screen-reader/cross-engine certification; YouTube streaming remains provider-dependent and intercepted in tests. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed.

Proposed commit after separate review: `feat(portal): add conference collage tiles and final status filters`. Continue existing draftPR42; do not duplicate or rewrite Speaking history. No hosted CI, merge or deployment claimed.

## Exact inventories and hashes

Combined canonical patch: tracked `git diff --no-ext-diff --binary HEAD` followed by sorted untracked patches against /dev/null. Incremental H compares pre-H before-working snapshot with HEAD fallback; normalized a/path,b/path headers. Ignored evidence excluded. SHA256 values and machine inventories in `.community-drafts/speak001h/checkpoint.json` alongside review.patch/incremental-review.patch, avoiding self-reference. Index remains empty.

### Incremental SPEAK-001H correction (28 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001D-DISCOVERY.md`
- `docs/speaking/SPEAK-001H-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `public/conference/gicite-2026/photo-01.webp.json`
- `public/conference/gicite-2026/photo-04.webp.json`
- `scripts/community/discover-speaking-images.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery.test.mjs`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-final-layout.test.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `scripts/site.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/data/conferenceFolders.json`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.generated.json`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined preserved workstream (83 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001A-REVIEW.md`
- `docs/speaking/SPEAK-001A-THUMBNAILS.json`
- `docs/speaking/SPEAK-001B-IMAGES.json`
- `docs/speaking/SPEAK-001B-REVIEW.md`
- `docs/speaking/SPEAK-001C-REVIEW.md`
- `docs/speaking/SPEAK-001D-DISCOVERY.md`
- `docs/speaking/SPEAK-001D-IMAGES.json`
- `docs/speaking/SPEAK-001D-REVIEW.md`
- `docs/speaking/SPEAK-001E-FINAL-REVIEW.md`
- `docs/speaking/SPEAK-001E-REVIEW.md`
- `docs/speaking/SPEAK-001F-ASSETS.json`
- `docs/speaking/SPEAK-001F-REVIEW.md`
- `docs/speaking/SPEAK-001G-REVIEW.md`
- `docs/speaking/SPEAK-001H-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `package.json`
- `public/conference/_generated/atai-2026/764e50dfe2073021ffd6444d54a90fcd741ad9394baeb1a3528baea361b74cbd-thumb.webp`
- `public/conference/_generated/atai-2026/8f72556bebfe70f582ecad3d40e078d9d23b3d70de673c8e07b81842633617dd-display.webp`
- `public/conference/_generated/gicite-2026/130de3026954de373ce79dafce044339518b48e4c32e7562f757862adaec8dc7-thumb.webp`
- `public/conference/_generated/gicite-2026/4614a53dc533e0ebcc02c48cfaf18272d5eb528b26fe07b39f083439393d2515-display.webp`
- `public/conference/_generated/gicite-2026/50e918d7931c92dc22bd34cf43fc021b0393331fabaff2fcbb9f8d63d0f21de1-thumb.webp`
- `public/conference/_generated/gicite-2026/5bb67f599dcd03d17ce51c21876b871f316563aa2513176c1f6981ba4c8d3dc4-thumb.webp`
- `public/conference/_generated/gicite-2026/6816a9c5c6b9923cdb0d9b38b1a4ea6a4a41102d54d7065ba76afdaf55ca8746-display.webp`
- `public/conference/_generated/gicite-2026/7f91f6b390eed8a68a6198073bcf409928b5ff7aca7e2bc7b529deb1a2752853-display.webp`
- `public/conference/_generated/gicite-2026/ca64bb366fc23d7f782fe7ef71f632f79ba7cfd9e62488499bc616955405fe75-thumb.webp`
- `public/conference/_generated/gicite-2026/dc363f745764341b6bf2c34cc0f204f554ad4610ddba3ba360d84f8b5aab9a06-display.webp`
- `public/conference/atai-2026/photo-01.webp`
- `public/conference/atai-2026/photo-01.webp.json`
- `public/conference/gicite-2026/photo-01.webp`
- `public/conference/gicite-2026/photo-01.webp.json`
- `public/conference/gicite-2026/photo-02.webp`
- `public/conference/gicite-2026/photo-02.webp.json`
- `public/conference/gicite-2026/photo-03.webp`
- `public/conference/gicite-2026/photo-03.webp.json`
- `public/conference/gicite-2026/photo-04.webp`
- `public/conference/gicite-2026/photo-04.webp.json`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/discover-speaking-images.mjs`
- `scripts/community/prepare-speaking-photos.mjs`
- `scripts/community/publish-speaking-photo-assets.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-conference.browser.mjs`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery-preservation.mjs`
- `scripts/community/speaking-discovery.browser.mjs`
- `scripts/community/speaking-discovery.test.mjs`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-final-layout.test.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-public-assets.test.mjs`
- `scripts/community/speaking-showcase.browser.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.browser.mjs`
- `scripts/community/speaking-video.test.mjs`
- `scripts/community/speaking-viewer.browser.mjs`
- `scripts/community/speaking-viewer.test.mjs`
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
- `src/data/conferenceFolders.json`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.generated.json`
- `src/data/speakingPhotos.ts`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`
