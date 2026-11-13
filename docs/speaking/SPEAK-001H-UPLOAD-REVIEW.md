# SPEAK-001H — approved upload integration review

Implemented locally; nothing staged, committed, pushed, merged or deployed. This is an asset refresh of the existing H implementation, not a redesign.

## Baseline and approval

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; last verified origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`; existing draftPR42 preserved. Owner explicitly confirms all newly uploaded conference-folder images are approved for tiles/gallery. Actual uploads:ATAI3,GICITE6,ETIC1; no second ETIC image was found or invented.

[Exact upload inventory](SPEAK-001H-UPLOADS.json) records each original filename/hash/format/size/dimensions, private unchanged original path, crop rectangle, ready path/hash, factual alt/caption and attribution. All ten source hashes verified after private preservation. Source originals remain ignored/local, not staged for public release.

## Assets and presentation

- ATAI2026_1/2/3 → ATAI2026_1/2/3.webp: speaker webpage, owner-mapped keynote listing and slide capture. Webpage browser chrome and slide participant strip excluded where applicable.
- GICITE_2026_1 through6 → corresponding WebP copies: session slide, two owner-approved group-session captures, privacy-safe portrait, announcement poster and introduction slide. Meeting URLs/browser chrome excluded; portrait excludes private document/meeting screens. Owner approval covers the supplied group photographs; no independent third-party-rights verification claimed.
- ETIC_2026_1 → ETIC_2026_1.webp: owner-approved announcement artwork, captioned without changing InvitationAccepted status or treating the poster as completed delivery.
- Five earlier prepared inputs and their sidecars are archived privately as superseded-ready copies, avoiding duplicate gallery entries. No original bytes discarded.

All ready copies use contain fit to preserve text/evidence within collage cells; optimized display variants and thumbnails come from the existing generator. All images credited Courtesy of Shubh Prabhat. Current generated inventory supplies exact display/thumb hashes and paths: src/data/speakingPhotos.generated.json. Ten ready images generate20optimized display/thumb assets in production. Source images/sidecars/private staging are excluded from production output by the existing finalizer.

Current gallery counts **ATAI3/GICITE6/ETIC1**. Tiles automatically show ATAI3-cell collage, first4GICITE images as mosaic, ETIC single hero; overlay includes all10photos, including GICITE5/6. No manual photo arrays, component edits or gallery-count limit. Dates/statuses remain ATAICompleted/GICITECompleted/ETICInvitationAccepted per prior owner instruction.

## Validation and preservation

- `conference:refresh` reports10images and3/6/1 counts. No manual historical/preservation-pin update: dynamic media regions handle the asset change as designed.
- Astro check204files:0errors/warnings/hints. Production build28routes. Full suite154passed,0failed/skipped.
- One historical asset test incorrectly assumed original review count was twice the current gallery count. It now asserts historical inventory10 independently; historical image hashes, approval/crop checks and all dynamic source/digest/count assertions remain intact.
-28Chromium cases at320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS with reduced motion. All28routes rendered;0missing images/runtime exceptions/overflow. Every configured photo decodes; collage cells select correct images; overlay includes6GICITE thumbnails and dynamically correct counters. Filters3/2/1, equal-height16:9 cards, Previous/Next, arrows/Home/End/swipe, Escape/focus/lock/close/error/no-JS pass.
- Gallery/components/discovery/schema/status contracts and preservation pins unchanged. YouTube sources/Watch&Learn HTML and27other route hashes unchanged. Privacy text/credential/meeting-link scans clear; visual inspection confirms sensitive browser/meeting chrome cropped from display copies.
- Existing localhost4321PID58050, Node runtime and worktree preserved. Earlier security findings (cache QA-H01 and Magicast QA-H02) remain OPEN.

Reproducible local evidence `.community-drafts/speak001h-upload/`: inventory.json,prepare.mjs,originals/,superseded-ready/,refresh-safe.log,check-safe.log,build-safe.log,tests.log,browser.log,preservation.json.

## Screenshots

[Before desktop](../../.community-drafts/speak001h-upload/layout-1794526784621/before-1440-dark.png) · [After desktop](../../.community-drafts/speak001h-upload/layout-1794526784621/after-1440-dark.png) · [Before390mobile](../../.community-drafts/speak001h-upload/layout-1794526784621/before-390-light.png) · [After390mobile](../../.community-drafts/speak001h-upload/layout-1794526784621/after-390-light.png) · [GICITE desktop overlay](../../.community-drafts/speak001h-upload/layout-1794526784621/viewer-gicite-2026-wru-key-talk-1440-dark.png) · [ETIC mobile overlay](../../.community-drafts/speak001h-upload/layout-1794526784621/viewer-etic-2026-390-light.png).

Desktop after screenshot visually reviewed; full metrics/screenshots in layout-1794526784621/results.json. Evidence is ignored/local. No hosted CI/live deployment claimed. Earlier protected individual record pages remain historical snapshots as documented in H; artwork does not silently update their content. Chromium emulation is not physical-device/manual-screen-reader/cross-engine certification.

## Inventory and hashes

Combined candidate canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked patches against /dev/null. Incremental upload patch compares pre-refresh before-working snapshot with HEAD fallback, including removed superseded inputs and original upload paths; old/new headers normalized to a/path,b/path. Private archives/evidence excluded. Hashes and complete inventories live in `.community-drafts/speak001h-upload/checkpoint.json` with review.patch/incremental-review.patch, avoiding self-reference. Index empty.

### Incremental upload changes (76 paths)

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001H-UPLOAD-REVIEW.md`
- `docs/speaking/SPEAK-001H-UPLOADS.json`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `public/conference/ETIC-2026/ETIC_2026_1.jpeg` (removed from public; preserved privately)
- `public/conference/ETIC-2026/ETIC_2026_1.webp`
- `public/conference/ETIC-2026/ETIC_2026_1.webp.json`
- `public/conference/_generated/atai-2026/25e1e1110c7fde2c4418cc8233e41d41f21da4f66fdc2bba76e6437a33d2452e-display.webp`
- `public/conference/_generated/atai-2026/764e50dfe2073021ffd6444d54a90fcd741ad9394baeb1a3528baea361b74cbd-thumb.webp` (removed from public; preserved privately)
- `public/conference/_generated/atai-2026/8624fd3d1ccca282e7744a404d5a687559858841d12683cb1930d98da5c51c6f-thumb.webp`
- `public/conference/_generated/atai-2026/8f72556bebfe70f582ecad3d40e078d9d23b3d70de673c8e07b81842633617dd-display.webp` (removed from public; preserved privately)
- `public/conference/_generated/atai-2026/b01f9ea3dd6f9f75b2e0fb380a833bbe7cc4c67a4150c315694f9cc5d72dc777-display.webp`
- `public/conference/_generated/atai-2026/b988fda0c5082a6605fed71e5f8af951e5b2177e9bed33c80402502f842a5178-display.webp`
- `public/conference/_generated/atai-2026/eb622ebc19b5470477f72d7df40026ed18b98d6d679041a612cc9480e86e277c-thumb.webp`
- `public/conference/_generated/atai-2026/ece7a7bb3fa95c68c6de36edd1c59d2a37b195907dcaa6e50e3fb1f57bb08aa1-thumb.webp`
- `public/conference/_generated/etic-2026/0c418a65db7ced49723d0be301e82bd9d7fb6d9b3748c6e284284f2cd990e65d-display.webp`
- `public/conference/_generated/etic-2026/b8d4d982ed7a3acaabc6426e863d52d8e263d2b4d8106449687d68446643b9ac-thumb.webp`
- `public/conference/_generated/gicite-2026/093b8e51a96ecee3a4d051b6ea2e8f786c5477179035b45bd582622456d2b53b-thumb.webp`
- `public/conference/_generated/gicite-2026/130de3026954de373ce79dafce044339518b48e4c32e7562f757862adaec8dc7-thumb.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/279c1ca9133834accfedc91e9039b44e391f74083166e3bd46c442671dd4a898-display.webp`
- `public/conference/_generated/gicite-2026/41d646c9e5c7df3c753c4b3a59927ab271d4d876cb795f55e3f0077847ff3200-display.webp`
- `public/conference/_generated/gicite-2026/4614a53dc533e0ebcc02c48cfaf18272d5eb528b26fe07b39f083439393d2515-display.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/50e918d7931c92dc22bd34cf43fc021b0393331fabaff2fcbb9f8d63d0f21de1-thumb.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/5bb67f599dcd03d17ce51c21876b871f316563aa2513176c1f6981ba4c8d3dc4-thumb.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/67ff6349d970ec9e30183de991ae17fed826e704e1d7c62fb491c786cd1aacb8-thumb.webp`
- `public/conference/_generated/gicite-2026/6816a9c5c6b9923cdb0d9b38b1a4ea6a4a41102d54d7065ba76afdaf55ca8746-display.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/7f91f6b390eed8a68a6198073bcf409928b5ff7aca7e2bc7b529deb1a2752853-display.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/bc4acad2cd5290f2d62103e722324a11be2ea61950a5389505d527e3e9105782-thumb.webp`
- `public/conference/_generated/gicite-2026/bfb455b1d29e2868be11471889b96fbb748b6c26f8414e9d8a96564a92f9c464-thumb.webp`
- `public/conference/_generated/gicite-2026/c04a67acaecdccce65d58fdc95471f623aa6e6a1f25d02e77c79c3cde33c2c2b-display.webp`
- `public/conference/_generated/gicite-2026/c658aff17aed5fa217772df666f1d50b732bdd832b783e47f0a7479f1d7d8a33-thumb.webp`
- `public/conference/_generated/gicite-2026/ca64bb366fc23d7f782fe7ef71f632f79ba7cfd9e62488499bc616955405fe75-thumb.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/d9cc8753c204f1b1da827fa7e421584359ab6e4fc35b8ada8bd956b420e459c5-display.webp`
- `public/conference/_generated/gicite-2026/dc363f745764341b6bf2c34cc0f204f554ad4610ddba3ba360d84f8b5aab9a06-display.webp` (removed from public; preserved privately)
- `public/conference/_generated/gicite-2026/de8f3cab87268cd26e94588fc7ba015ad6101e4eefc07872e31208367575a9e0-thumb.webp`
- `public/conference/_generated/gicite-2026/f04f7672841ea3ad4d2e66a6ea622d7e9129698aa176ff70b54ff69d4d0c8f81-display.webp`
- `public/conference/_generated/gicite-2026/f6c3a998254c9250e727d84e085449ec717677c5046f73b1b3e3b4b7099d9a47-display.webp`
- `public/conference/atai-2026/ATAI2026_1.png` (removed from public; preserved privately)
- `public/conference/atai-2026/ATAI2026_1.webp`
- `public/conference/atai-2026/ATAI2026_1.webp.json`
- `public/conference/atai-2026/ATAI2026_2.png` (removed from public; preserved privately)
- `public/conference/atai-2026/ATAI2026_2.webp`
- `public/conference/atai-2026/ATAI2026_2.webp.json`
- `public/conference/atai-2026/ATAI2026_3.png` (removed from public; preserved privately)
- `public/conference/atai-2026/ATAI2026_3.webp`
- `public/conference/atai-2026/ATAI2026_3.webp.json`
- `public/conference/atai-2026/photo-01.webp` (removed from public; preserved privately)
- `public/conference/atai-2026/photo-01.webp.json` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_1.jpeg` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_1.webp`
- `public/conference/gicite-2026/GICITE_2026_1.webp.json`
- `public/conference/gicite-2026/GICITE_2026_2.jpeg` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_2.webp`
- `public/conference/gicite-2026/GICITE_2026_2.webp.json`
- `public/conference/gicite-2026/GICITE_2026_3.JPG` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_3.webp`
- `public/conference/gicite-2026/GICITE_2026_3.webp.json`
- `public/conference/gicite-2026/GICITE_2026_4.jpg` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_4.webp`
- `public/conference/gicite-2026/GICITE_2026_4.webp.json`
- `public/conference/gicite-2026/GICITE_2026_5.jpeg` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_5.webp`
- `public/conference/gicite-2026/GICITE_2026_5.webp.json`
- `public/conference/gicite-2026/GICITE_2026_6.jpeg` (removed from public; preserved privately)
- `public/conference/gicite-2026/GICITE_2026_6.webp`
- `public/conference/gicite-2026/GICITE_2026_6.webp.json`
- `public/conference/gicite-2026/photo-01.webp` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-01.webp.json` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-02.webp` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-02.webp.json` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-03.webp` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-03.webp.json` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-04.webp` (removed from public; preserved privately)
- `public/conference/gicite-2026/photo-04.webp.json` (removed from public; preserved privately)
- `scripts/community/speaking-photos.test.mjs`
- `src/data/speakingPhotos.generated.json`

### Combined uncommitted inventory (105 files)

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
- `docs/speaking/SPEAK-001H-UPLOAD-REVIEW.md`
- `docs/speaking/SPEAK-001H-UPLOADS.json`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `package.json`
- `public/conference/ETIC-2026/ETIC_2026_1.webp`
- `public/conference/ETIC-2026/ETIC_2026_1.webp.json`
- `public/conference/_generated/atai-2026/25e1e1110c7fde2c4418cc8233e41d41f21da4f66fdc2bba76e6437a33d2452e-display.webp`
- `public/conference/_generated/atai-2026/8624fd3d1ccca282e7744a404d5a687559858841d12683cb1930d98da5c51c6f-thumb.webp`
- `public/conference/_generated/atai-2026/b01f9ea3dd6f9f75b2e0fb380a833bbe7cc4c67a4150c315694f9cc5d72dc777-display.webp`
- `public/conference/_generated/atai-2026/b988fda0c5082a6605fed71e5f8af951e5b2177e9bed33c80402502f842a5178-display.webp`
- `public/conference/_generated/atai-2026/eb622ebc19b5470477f72d7df40026ed18b98d6d679041a612cc9480e86e277c-thumb.webp`
- `public/conference/_generated/atai-2026/ece7a7bb3fa95c68c6de36edd1c59d2a37b195907dcaa6e50e3fb1f57bb08aa1-thumb.webp`
- `public/conference/_generated/etic-2026/0c418a65db7ced49723d0be301e82bd9d7fb6d9b3748c6e284284f2cd990e65d-display.webp`
- `public/conference/_generated/etic-2026/b8d4d982ed7a3acaabc6426e863d52d8e263d2b4d8106449687d68446643b9ac-thumb.webp`
- `public/conference/_generated/gicite-2026/093b8e51a96ecee3a4d051b6ea2e8f786c5477179035b45bd582622456d2b53b-thumb.webp`
- `public/conference/_generated/gicite-2026/279c1ca9133834accfedc91e9039b44e391f74083166e3bd46c442671dd4a898-display.webp`
- `public/conference/_generated/gicite-2026/41d646c9e5c7df3c753c4b3a59927ab271d4d876cb795f55e3f0077847ff3200-display.webp`
- `public/conference/_generated/gicite-2026/67ff6349d970ec9e30183de991ae17fed826e704e1d7c62fb491c786cd1aacb8-thumb.webp`
- `public/conference/_generated/gicite-2026/bc4acad2cd5290f2d62103e722324a11be2ea61950a5389505d527e3e9105782-thumb.webp`
- `public/conference/_generated/gicite-2026/bfb455b1d29e2868be11471889b96fbb748b6c26f8414e9d8a96564a92f9c464-thumb.webp`
- `public/conference/_generated/gicite-2026/c04a67acaecdccce65d58fdc95471f623aa6e6a1f25d02e77c79c3cde33c2c2b-display.webp`
- `public/conference/_generated/gicite-2026/c658aff17aed5fa217772df666f1d50b732bdd832b783e47f0a7479f1d7d8a33-thumb.webp`
- `public/conference/_generated/gicite-2026/d9cc8753c204f1b1da827fa7e421584359ab6e4fc35b8ada8bd956b420e459c5-display.webp`
- `public/conference/_generated/gicite-2026/de8f3cab87268cd26e94588fc7ba015ad6101e4eefc07872e31208367575a9e0-thumb.webp`
- `public/conference/_generated/gicite-2026/f04f7672841ea3ad4d2e66a6ea622d7e9129698aa176ff70b54ff69d4d0c8f81-display.webp`
- `public/conference/_generated/gicite-2026/f6c3a998254c9250e727d84e085449ec717677c5046f73b1b3e3b4b7099d9a47-display.webp`
- `public/conference/atai-2026/ATAI2026_1.webp`
- `public/conference/atai-2026/ATAI2026_1.webp.json`
- `public/conference/atai-2026/ATAI2026_2.webp`
- `public/conference/atai-2026/ATAI2026_2.webp.json`
- `public/conference/atai-2026/ATAI2026_3.webp`
- `public/conference/atai-2026/ATAI2026_3.webp.json`
- `public/conference/gicite-2026/GICITE_2026_1.webp`
- `public/conference/gicite-2026/GICITE_2026_1.webp.json`
- `public/conference/gicite-2026/GICITE_2026_2.webp`
- `public/conference/gicite-2026/GICITE_2026_2.webp.json`
- `public/conference/gicite-2026/GICITE_2026_3.webp`
- `public/conference/gicite-2026/GICITE_2026_3.webp.json`
- `public/conference/gicite-2026/GICITE_2026_4.webp`
- `public/conference/gicite-2026/GICITE_2026_4.webp.json`
- `public/conference/gicite-2026/GICITE_2026_5.webp`
- `public/conference/gicite-2026/GICITE_2026_5.webp.json`
- `public/conference/gicite-2026/GICITE_2026_6.webp`
- `public/conference/gicite-2026/GICITE_2026_6.webp.json`
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
