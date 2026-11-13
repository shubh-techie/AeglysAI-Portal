# SPEAK-001H — compact white conference photo overlay review

Implemented and locally validated. No staging, committing, pushing, merging or deployment. Proposed commit after separate authorization: `fix(portal): simplify conference photo overlay`. Existing branch/history retained.

## Verified Git and environment

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; freshly fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged, no hosted checks/reviews reported. One original worktree, Node24.22.1, localhost4321PID58050 and Astro/dev settings unchanged. Existing localhost response checked for new compact-dialog markup without restarting the process. Index empty.

## Scoped viewer change

- Reuses existing dialog and selectors; fixed white/light-gray palette with dark text and color-scheme:light, isolated from global body/theme/navigation/cards. No new CSS framework or dependency.
- Centered up to900px/92vw desktop; mobile96vw; max720px/88dvh desktop,90dvh mobile. Content-sized height, rounded border, dark backdrop.
- Only conference name, full uncropped photo, short verified caption sentence, Previous/counter/Next and Close. No photo-dialog sidebar, thumbnail strip, external links, metadata panel or autoplay.
- Complete image maintains natural aspect ratio and contain fit, max460px/60dvh. Image/caption body can scroll; Close and navigation stay outside it. Single images hide Previous/Next and retain1/1 indicator.
- Photo links open compact dialog; View Event Details uses its existing native disclosure. Card/empty-surface activation opens those full details. Metadata, dates, role/status/talk/organizer/location, evidence notes, approved event/recording links and per-photo attribution remain there. Added visible statusNote text and optional approved recording links to the existing disclosure so removal of the sidebar does not drop information. No underlying verified data deleted or altered.
- Full details' existing gallery thumbnails remain available outside the compact photo dialog. No-JS native disclosure and full-image links preserved.
- Native dialog labels, photo alt/descriptions, arrow/Home/End/swipe selection, Escape/Close/backdrop, focus trap/restore and background lock retained.

## Dimensions and visual review

At1000px viewport height, dark/JS measurements (light theme also tested):

| Event |1440px viewport dialog|390px viewport dialog|320px viewport dialog|
|---|---|---|---|
|ATAI|900×684.45px|374.39×386.42px|307.19×368.81px|
|GICITE|900×684.45px|374.39×394.69px|307.19×375.50px|
|ETIC|900×661.56px|374.39×390.23px|307.19×352.83px|

Centering asserted within2px; image aspect ratio within.02 of natural ratio. Dialog computed white rgb(255,255,255) in every case. No oversized empty body space. First pass used auto height, which stretched to max height; corrected to fit-content and covered with an explicit no-blank-area assertion. Visually inspected final desktop GICITE and mobile ETIC overlays.

## Input inventory discrepancy and preservation

Current counts remain ATAI3/GICITE6/ETIC1. During this working session the source tree changed from earlier prepared WebP inputs/sidecars to owner-original ATAIPNG/GICITEJPEG files; ETIC retains its preparedWebP. The pre-change snapshots and earlier private originals remain available. This viewer patch did not write/delete/replace source photos or undo those external input changes. Required normal build refreshed stale speakingPhotos.generated.json and generated optimized assets from the actual current folders.

All10current source hashes match entries in SPEAK-001H-UPLOADS.json (nine original upload hashes and one ETIC ready-copy hash); all ten private original hashes remain verified. Asset discovery/folder mapping/data/status/PhotoGallery/YouTube/package sources are unchanged. Generated inventory/assets differ as an automatic consequence of current input files, not a new image-processing implementation. Before/after source-image framing differs for that reason.

Card copy, preview structure, status filters and typography remain unchanged outside the dynamic media regions. All27other generated routes, Watch&Learn HTML and FeaturedMedia sources are unchanged. All source photos remain represented. Statuses remain ATAICompleted/GICITECompleted/ETICInvitationAccepted; historical linked record caveats from H remain.

**Image limitation:** some current owner-original meeting screenshots retain visible meeting/browser information. This viewer-only task preserves those source pixels and does not claim pixel-level privacy clearance. Text credential/private-meeting-link scan is clear; that does not establish image-content clearance. No public delivery has occurred.

## Validation

- Astro check204files:0errors/warnings/hints. Final production build28routes. Full suite154passed,0failed/skipped.
-28Chromium cases at320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS with reduced motion, plus before-state captures and all28route renders.0missing assets/runtime exceptions/overflow.
- All10configured images navigate/decode with correct counters and natural ratios. Every visible collage cell opens its correct initial photo. Left/right/Home/End, Previous/Next, swipe and error recovery tested. ETICsinglephoto hides navigation buttons.
- Focus starts at Close, Tab/Shift+Tab contains focus (single/multiple image cases), Escape/Close/backdrop restores exact source-photo focus, body scroll unlocks. White surface, centered/capped dimensions, no thumbnails/sidebar, controls below image and no oversized body whitespace asserted.
- ViewEventDetails and card surface open native disclosure independently; full metadata retained. Photos inside details also open/close viewer correctly. No-JS native details expose all metadata and links.
- Filters3/2/1 and card alignment/media ratios unchanged. Existing discovery/add/remove/invalid/future-event/production-inclusion tests pass. Three unchanged YouTube thumbnail/player/link regressions pass. Other27page hashes preserved.

Preservation/static style pins updated for reviewed viewer markup/styles and disclosure notes; no broad content normalization introduced. Old fullscreen/sidebar/thumb expectations replaced with compact dimensions, no-thumb/no-sidebar assertions, all-photo sequential keyboard navigation, native-details checks and white-theme isolation. No test skips or security-gate changes.

Logs `.community-drafts/speak001h-white/{check,build-final,tests-final,browser-final}.log`; preservation.json; modalMeasurements in layout-1794527514529/results.json. Tests use1000px-high emulated viewports; physical-device, cross-engine and manual screen-reader certification not claimed. YouTube streaming remains provider-dependent/intercepted.

## Before/after screenshots

- [Before1440dark overlay](../../.community-drafts/speak001h-white/layout-1794527514529/before-viewer-1440-dark.png) / [After1440dark GICITE overlay](../../.community-drafts/speak001h-white/layout-1794527514529/viewer-gicite-2026-wru-key-talk-1440-dark.png) / [After1440light](../../.community-drafts/speak001h-white/layout-1794527514529/viewer-gicite-2026-wru-key-talk-1440-light.png).
- [Before390light](../../.community-drafts/speak001h-white/layout-1794527514529/before-viewer-390-light.png) / [After390light ETIC](../../.community-drafts/speak001h-white/layout-1794527514529/viewer-etic-2026-390-light.png) / [After390dark GICITE](../../.community-drafts/speak001h-white/layout-1794527514529/viewer-gicite-2026-wru-key-talk-390-dark.png).

All screenshots remain local/ignored, not uploaded. Earlier failed sizing evidence retained. Owner visual acceptance pending.

## Remaining limits and review boundary

Current raw source-image information and earlier protected event-record snapshots are limitations described above; no new event facts inferred from images. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment success claimed. Continue existing draftPR42 only after separate owner authorization; no new Speaking branch/task.

## Exact inventory and canonical hashes

Combined canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked patches against /dev/null. Incremental checkpoint compares pre-white snapshots with HEAD fallback, including observed external source-tree removals/additions and automatic generated assets; normalized a/path,b/path headers. Inventory distinguishes viewer/source/test/docs work from observed photo-source/generated-inventory changes. Ignored/private evidence excluded. Hashes and inventories in `.community-drafts/speak001h-white/checkpoint.json` alongside review.patch/incremental-review.patch, avoiding self-reference. Nothing staged. `viewer-review.patch` separately excludes public/ changes and speakingPhotos.generated.json; its viewerSHA256 is recorded in the checkpoint.

### Viewer implementation, related tests, pins and documentation

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001H-WHITE-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Observed input refresh and automatic inventory/assets

These are listed in the full checkpoint below; source-photo changes were not made by the viewer implementation. The normal build generated outputs from the current folders.

- `public/conference/_generated/atai-2026/0d0d0b2b82d0cb4c47382f13293a46d418e6b95982a0ddbb8f9ca34e5d273c3c-thumb.webp`
- `public/conference/_generated/atai-2026/25e1e1110c7fde2c4418cc8233e41d41f21da4f66fdc2bba76e6437a33d2452e-display.webp`
- `public/conference/_generated/atai-2026/5cd2cff44c0a49a6a728d611591dbbf79c3bc528a9b29d265dda2c7a653fb8f5-display.webp`
- `public/conference/_generated/atai-2026/74abaec8385c6f2ceef5e66a9ee99d6b5775a798115ef3515dd20b1345297c4c-thumb.webp`
- `public/conference/_generated/atai-2026/8624fd3d1ccca282e7744a404d5a687559858841d12683cb1930d98da5c51c6f-thumb.webp`
- `public/conference/_generated/atai-2026/86eb3efefe2741e14ac78afb00d3429ba9756583e281e696e184164a6a97f3c9-display.webp`
- `public/conference/_generated/atai-2026/87d2f083ba9359919fbb295cd53aaddfaae6ead896e476e8345951b1b7e5e860-display.webp`
- `public/conference/_generated/atai-2026/b01f9ea3dd6f9f75b2e0fb380a833bbe7cc4c67a4150c315694f9cc5d72dc777-display.webp`
- `public/conference/_generated/atai-2026/b988fda0c5082a6605fed71e5f8af951e5b2177e9bed33c80402502f842a5178-display.webp`
- `public/conference/_generated/atai-2026/eb622ebc19b5470477f72d7df40026ed18b98d6d679041a612cc9480e86e277c-thumb.webp`
- `public/conference/_generated/atai-2026/ece7a7bb3fa95c68c6de36edd1c59d2a37b195907dcaa6e50e3fb1f57bb08aa1-thumb.webp`
- `public/conference/_generated/atai-2026/f58803c9aa5eee6ad7cbe11ac2a8cb51a47e47ab5d15d61f9a4788d7d996b528-thumb.webp`
- `public/conference/_generated/gicite-2026/02e9c426ce250b5a2fa1594fe5691e4a89c389d2e559f1ce9e37fec65926eca9-thumb.webp`
- `public/conference/_generated/gicite-2026/0839b009d3e1a9bea2e24bc07e76950fde47ba70943c353ea26f5033b2948f7b-display.webp`
- `public/conference/_generated/gicite-2026/093b8e51a96ecee3a4d051b6ea2e8f786c5477179035b45bd582622456d2b53b-thumb.webp`
- `public/conference/_generated/gicite-2026/2218e7a80a809e4fe836e92c58191e61941cdccdd141e744d20090e75862ab50-display.webp`
- `public/conference/_generated/gicite-2026/248b228d85f0276b93923a0c7cb4dcd5a2ac3178e0c23b7dad881f82a8b4d327-thumb.webp`
- `public/conference/_generated/gicite-2026/279c1ca9133834accfedc91e9039b44e391f74083166e3bd46c442671dd4a898-display.webp`
- `public/conference/_generated/gicite-2026/3d60501d7049c74def05628b27eec3c476d3ac2141b741967dfb59ad754807c1-thumb.webp`
- `public/conference/_generated/gicite-2026/41d646c9e5c7df3c753c4b3a59927ab271d4d876cb795f55e3f0077847ff3200-display.webp`
- `public/conference/_generated/gicite-2026/494cb3cdea77eb52d95d4517c7e20005e5a91fbe39e4ddf84a6fb558a0053e46-display.webp`
- `public/conference/_generated/gicite-2026/51cb8ac93f3bfeaadae1207057cdb62fd374ebf6c47eee2f8e0a25a8b6e57b86-display.webp`
- `public/conference/_generated/gicite-2026/67ff6349d970ec9e30183de991ae17fed826e704e1d7c62fb491c786cd1aacb8-thumb.webp`
- `public/conference/_generated/gicite-2026/6d078fde109ada35135f8a1410c9504a735f9627bafb947b4877d27a4503332d-thumb.webp`
- `public/conference/_generated/gicite-2026/849d7fa02d67d892d01897d37ebb0cb4e08dbed6fd9d2508a6e14c1c8d2d60cb-thumb.webp`
- `public/conference/_generated/gicite-2026/8be1aaa56e203de349df469baf9bca131258d621489ab15e65072e4f985fc8b7-thumb.webp`
- `public/conference/_generated/gicite-2026/bc4acad2cd5290f2d62103e722324a11be2ea61950a5389505d527e3e9105782-thumb.webp`
- `public/conference/_generated/gicite-2026/bfb455b1d29e2868be11471889b96fbb748b6c26f8414e9d8a96564a92f9c464-thumb.webp`
- `public/conference/_generated/gicite-2026/c04a67acaecdccce65d58fdc95471f623aa6e6a1f25d02e77c79c3cde33c2c2b-display.webp`
- `public/conference/_generated/gicite-2026/c658aff17aed5fa217772df666f1d50b732bdd832b783e47f0a7479f1d7d8a33-thumb.webp`
- `public/conference/_generated/gicite-2026/ccb15e5f67013e100e1ccd078325d1bda784fd6cbaa1047a2acb5edab6bea621-display.webp`
- `public/conference/_generated/gicite-2026/d9cc8753c204f1b1da827fa7e421584359ab6e4fc35b8ada8bd956b420e459c5-display.webp`
- `public/conference/_generated/gicite-2026/de8f3cab87268cd26e94588fc7ba015ad6101e4eefc07872e31208367575a9e0-thumb.webp`
- `public/conference/_generated/gicite-2026/ec68842da6db4f7b6341e72b14831c19e3e6d355cf33a336ef310d61fad9672c-display.webp`
- `public/conference/_generated/gicite-2026/f04f7672841ea3ad4d2e66a6ea622d7e9129698aa176ff70b54ff69d4d0c8f81-display.webp`
- `public/conference/_generated/gicite-2026/f6c3a998254c9250e727d84e085449ec717677c5046f73b1b3e3b4b7099d9a47-display.webp`
- `public/conference/atai-2026/ATAI2026_1.png`
- `public/conference/atai-2026/ATAI2026_1.webp`
- `public/conference/atai-2026/ATAI2026_1.webp.json`
- `public/conference/atai-2026/ATAI2026_2.png`
- `public/conference/atai-2026/ATAI2026_2.webp`
- `public/conference/atai-2026/ATAI2026_2.webp.json`
- `public/conference/atai-2026/ATAI2026_3.png`
- `public/conference/atai-2026/ATAI2026_3.webp`
- `public/conference/atai-2026/ATAI2026_3.webp.json`
- `public/conference/gicite-2026/GICITE_2026_1.jpeg`
- `public/conference/gicite-2026/GICITE_2026_2.jpeg`
- `public/conference/gicite-2026/GICITE_2026_3.JPG`
- `public/conference/gicite-2026/GICITE_2026_4.jpg`
- `public/conference/gicite-2026/GICITE_2026_5.jpeg`
- `public/conference/gicite-2026/GICITE_2026_6.jpeg`
- `src/data/speakingPhotos.generated.json`

### Incremental white-viewer checkpoint (64 paths)

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001H-WHITE-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `public/conference/_generated/atai-2026/0d0d0b2b82d0cb4c47382f13293a46d418e6b95982a0ddbb8f9ca34e5d273c3c-thumb.webp`
- `public/conference/_generated/atai-2026/25e1e1110c7fde2c4418cc8233e41d41f21da4f66fdc2bba76e6437a33d2452e-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/5cd2cff44c0a49a6a728d611591dbbf79c3bc528a9b29d265dda2c7a653fb8f5-display.webp`
- `public/conference/_generated/atai-2026/74abaec8385c6f2ceef5e66a9ee99d6b5775a798115ef3515dd20b1345297c4c-thumb.webp`
- `public/conference/_generated/atai-2026/8624fd3d1ccca282e7744a404d5a687559858841d12683cb1930d98da5c51c6f-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/86eb3efefe2741e14ac78afb00d3429ba9756583e281e696e184164a6a97f3c9-display.webp`
- `public/conference/_generated/atai-2026/87d2f083ba9359919fbb295cd53aaddfaae6ead896e476e8345951b1b7e5e860-display.webp`
- `public/conference/_generated/atai-2026/b01f9ea3dd6f9f75b2e0fb380a833bbe7cc4c67a4150c315694f9cc5d72dc777-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/b988fda0c5082a6605fed71e5f8af951e5b2177e9bed33c80402502f842a5178-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/eb622ebc19b5470477f72d7df40026ed18b98d6d679041a612cc9480e86e277c-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/ece7a7bb3fa95c68c6de36edd1c59d2a37b195907dcaa6e50e3fb1f57bb08aa1-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/atai-2026/f58803c9aa5eee6ad7cbe11ac2a8cb51a47e47ab5d15d61f9a4788d7d996b528-thumb.webp`
- `public/conference/_generated/gicite-2026/02e9c426ce250b5a2fa1594fe5691e4a89c389d2e559f1ce9e37fec65926eca9-thumb.webp`
- `public/conference/_generated/gicite-2026/0839b009d3e1a9bea2e24bc07e76950fde47ba70943c353ea26f5033b2948f7b-display.webp`
- `public/conference/_generated/gicite-2026/093b8e51a96ecee3a4d051b6ea2e8f786c5477179035b45bd582622456d2b53b-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/2218e7a80a809e4fe836e92c58191e61941cdccdd141e744d20090e75862ab50-display.webp`
- `public/conference/_generated/gicite-2026/248b228d85f0276b93923a0c7cb4dcd5a2ac3178e0c23b7dad881f82a8b4d327-thumb.webp`
- `public/conference/_generated/gicite-2026/279c1ca9133834accfedc91e9039b44e391f74083166e3bd46c442671dd4a898-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/3d60501d7049c74def05628b27eec3c476d3ac2141b741967dfb59ad754807c1-thumb.webp`
- `public/conference/_generated/gicite-2026/41d646c9e5c7df3c753c4b3a59927ab271d4d876cb795f55e3f0077847ff3200-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/494cb3cdea77eb52d95d4517c7e20005e5a91fbe39e4ddf84a6fb558a0053e46-display.webp`
- `public/conference/_generated/gicite-2026/51cb8ac93f3bfeaadae1207057cdb62fd374ebf6c47eee2f8e0a25a8b6e57b86-display.webp`
- `public/conference/_generated/gicite-2026/67ff6349d970ec9e30183de991ae17fed826e704e1d7c62fb491c786cd1aacb8-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/6d078fde109ada35135f8a1410c9504a735f9627bafb947b4877d27a4503332d-thumb.webp`
- `public/conference/_generated/gicite-2026/849d7fa02d67d892d01897d37ebb0cb4e08dbed6fd9d2508a6e14c1c8d2d60cb-thumb.webp`
- `public/conference/_generated/gicite-2026/8be1aaa56e203de349df469baf9bca131258d621489ab15e65072e4f985fc8b7-thumb.webp`
- `public/conference/_generated/gicite-2026/bc4acad2cd5290f2d62103e722324a11be2ea61950a5389505d527e3e9105782-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/bfb455b1d29e2868be11471889b96fbb748b6c26f8414e9d8a96564a92f9c464-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/c04a67acaecdccce65d58fdc95471f623aa6e6a1f25d02e77c79c3cde33c2c2b-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/c658aff17aed5fa217772df666f1d50b732bdd832b783e47f0a7479f1d7d8a33-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/ccb15e5f67013e100e1ccd078325d1bda784fd6cbaa1047a2acb5edab6bea621-display.webp`
- `public/conference/_generated/gicite-2026/d9cc8753c204f1b1da827fa7e421584359ab6e4fc35b8ada8bd956b420e459c5-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/de8f3cab87268cd26e94588fc7ba015ad6101e4eefc07872e31208367575a9e0-thumb.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/ec68842da6db4f7b6341e72b14831c19e3e6d355cf33a336ef310d61fad9672c-display.webp`
- `public/conference/_generated/gicite-2026/f04f7672841ea3ad4d2e66a6ea622d7e9129698aa176ff70b54ff69d4d0c8f81-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/_generated/gicite-2026/f6c3a998254c9250e727d84e085449ec717677c5046f73b1b3e3b4b7099d9a47-display.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_1.png`
- `public/conference/atai-2026/ATAI2026_1.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_1.webp.json` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_2.png`
- `public/conference/atai-2026/ATAI2026_2.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_2.webp.json` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_3.png`
- `public/conference/atai-2026/ATAI2026_3.webp` (absent from current tree; pre-change snapshot retained)
- `public/conference/atai-2026/ATAI2026_3.webp.json` (absent from current tree; pre-change snapshot retained)
- `public/conference/gicite-2026/GICITE_2026_1.jpeg`
- `public/conference/gicite-2026/GICITE_2026_2.jpeg`
- `public/conference/gicite-2026/GICITE_2026_3.JPG`
- `public/conference/gicite-2026/GICITE_2026_4.jpg`
- `public/conference/gicite-2026/GICITE_2026_5.jpeg`
- `public/conference/gicite-2026/GICITE_2026_6.jpeg`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/data/speakingPhotos.generated.json`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined uncommitted inventory (97 files)

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
- `docs/speaking/SPEAK-001H-WHITE-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `package.json`
- `public/conference/ETIC-2026/ETIC_2026_1.webp`
- `public/conference/ETIC-2026/ETIC_2026_1.webp.json`
- `public/conference/_generated/atai-2026/0d0d0b2b82d0cb4c47382f13293a46d418e6b95982a0ddbb8f9ca34e5d273c3c-thumb.webp`
- `public/conference/_generated/atai-2026/5cd2cff44c0a49a6a728d611591dbbf79c3bc528a9b29d265dda2c7a653fb8f5-display.webp`
- `public/conference/_generated/atai-2026/74abaec8385c6f2ceef5e66a9ee99d6b5775a798115ef3515dd20b1345297c4c-thumb.webp`
- `public/conference/_generated/atai-2026/86eb3efefe2741e14ac78afb00d3429ba9756583e281e696e184164a6a97f3c9-display.webp`
- `public/conference/_generated/atai-2026/87d2f083ba9359919fbb295cd53aaddfaae6ead896e476e8345951b1b7e5e860-display.webp`
- `public/conference/_generated/atai-2026/f58803c9aa5eee6ad7cbe11ac2a8cb51a47e47ab5d15d61f9a4788d7d996b528-thumb.webp`
- `public/conference/_generated/etic-2026/0c418a65db7ced49723d0be301e82bd9d7fb6d9b3748c6e284284f2cd990e65d-display.webp`
- `public/conference/_generated/etic-2026/b8d4d982ed7a3acaabc6426e863d52d8e263d2b4d8106449687d68446643b9ac-thumb.webp`
- `public/conference/_generated/gicite-2026/02e9c426ce250b5a2fa1594fe5691e4a89c389d2e559f1ce9e37fec65926eca9-thumb.webp`
- `public/conference/_generated/gicite-2026/0839b009d3e1a9bea2e24bc07e76950fde47ba70943c353ea26f5033b2948f7b-display.webp`
- `public/conference/_generated/gicite-2026/2218e7a80a809e4fe836e92c58191e61941cdccdd141e744d20090e75862ab50-display.webp`
- `public/conference/_generated/gicite-2026/248b228d85f0276b93923a0c7cb4dcd5a2ac3178e0c23b7dad881f82a8b4d327-thumb.webp`
- `public/conference/_generated/gicite-2026/3d60501d7049c74def05628b27eec3c476d3ac2141b741967dfb59ad754807c1-thumb.webp`
- `public/conference/_generated/gicite-2026/494cb3cdea77eb52d95d4517c7e20005e5a91fbe39e4ddf84a6fb558a0053e46-display.webp`
- `public/conference/_generated/gicite-2026/51cb8ac93f3bfeaadae1207057cdb62fd374ebf6c47eee2f8e0a25a8b6e57b86-display.webp`
- `public/conference/_generated/gicite-2026/6d078fde109ada35135f8a1410c9504a735f9627bafb947b4877d27a4503332d-thumb.webp`
- `public/conference/_generated/gicite-2026/849d7fa02d67d892d01897d37ebb0cb4e08dbed6fd9d2508a6e14c1c8d2d60cb-thumb.webp`
- `public/conference/_generated/gicite-2026/8be1aaa56e203de349df469baf9bca131258d621489ab15e65072e4f985fc8b7-thumb.webp`
- `public/conference/_generated/gicite-2026/ccb15e5f67013e100e1ccd078325d1bda784fd6cbaa1047a2acb5edab6bea621-display.webp`
- `public/conference/_generated/gicite-2026/ec68842da6db4f7b6341e72b14831c19e3e6d355cf33a336ef310d61fad9672c-display.webp`
- `public/conference/atai-2026/ATAI2026_1.png`
- `public/conference/atai-2026/ATAI2026_2.png`
- `public/conference/atai-2026/ATAI2026_3.png`
- `public/conference/gicite-2026/GICITE_2026_1.jpeg`
- `public/conference/gicite-2026/GICITE_2026_2.jpeg`
- `public/conference/gicite-2026/GICITE_2026_3.JPG`
- `public/conference/gicite-2026/GICITE_2026_4.jpg`
- `public/conference/gicite-2026/GICITE_2026_5.jpeg`
- `public/conference/gicite-2026/GICITE_2026_6.jpeg`
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
