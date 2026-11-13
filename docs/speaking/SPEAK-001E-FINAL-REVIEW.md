# SPEAK-001E final conference layout review

Status: implemented and validated locally; stop before staging, committing, pushing, merging or deploying. This supersedes the earlier E presentation review, retaining its historical evidence.

## Verified baseline

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; freshly fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR #42 remains draft/open/unmerged, with no hosted checks or reviews reported. Localhost4321 PID58050, Node24.22.1, worktree and Astro configuration preserved. Index remains empty.

## Images and factual mapping

| Approved input / explicit alias | Event | Current eligible images |
| --- | --- | --- |
| atai-2026 / ATAI 2026 | beyond-static-access-control | 1 |
| gicite-2026 / GICITE_2026 | gicite-2026-wru-key-talk | 4 |
| etic-2026 / ETIC-2026 | etic-2026 | 0 |

Actual public inventory is five ready inputs, five sidecars and ten generated variants. All twenty files are byte-identical to the pre-correction snapshot. Ten private originals are unchanged. The previous 3/1/5 expectation describes raw owner-folder copies archived privately; it is not the publication-ready inventory. No missing photos were invented or withheld raw captures silently republished. Exact original filenames/hashes/dimensions, event mapping and exclusions are in SPEAK-001B-IMAGES.json and SPEAK-001D-IMAGES.json; current source/variant paths and dimensions are in src/data/speakingPhotos.generated.json.

Published: ATAI speaker webpage; GICITE privacy-safe portrait, introduction slide, privacy-safe session slide and speaker poster. Excluded: two ambiguous ATAI-context captures, two group/private-screen captures and ETIC artwork whose confirmed-speaker claim conflicts with current verified status. Attribution: **Courtesy of Shubh Prabhat**. ATAI remains Completed; GICITE completion remains unverified; ETIC awaits confirmation. Images establish no additional status, delivery or endorsement.

Discovery validates decoding/type/size, supports mixed-case JPG/JPEG/PNG/WebP, deterministic sorting and unlimited reasonable counts, and ignores unknown folders. Add/remove needs only an approved file plus `npm run conference:refresh` and reload, or the normal production build. No copy-only hot-reload claim. Source originals remain unchanged; production includes only optimized referenced variants.

## Layout and interaction

Cards use three/two/one columns, fixed 16:9 media, aligned status/date slots and bottom-aligned actions. No card carousel controls, counters over photos or thumbnail strips. Short verified titles only; long facts move to the viewer. Both photo and action open one native dialog with an approximately 94% viewport desktop 70/30 split, mobile stacked scrollable content and persistent Close. Full approved images use contain fit; controls and thumbnails sit outside images. Empty ETIC shows factual details without broken media.

All three cards have identical measured heights at every tested viewport in both themes and JS modes. Representative dark/JS measurements (CSS px):

| Viewport width | Each card height | Bottom action inset |
| --- | --- | --- |
| 320 | 504.94 | 19 |
| 375 | 535.88 | 19 |
| 390 | 544.31 | 19 |
| 430 | 566.81 | 19 |
| 768 | 539.59 | 21 |
| 1024 | 611.59 | 21 |
| 1440 | 566.69 | 21 |

All measured media ratios are 1.77778. Photo/action opening, Previous/Next, counter, thumbnails, arrows/Home/End, swipe, Escape/Close/backdrop, focus containment/restoration, aria-expanded state, background lock, empty-to-image recovery and image-error fallback pass. No-JS native details retain all photo links and metadata. No autoplay or new dependencies.

## Validation and evidence

- Astro check: 204 files; zero errors, warnings or hints.
- Production build: 28 routes. Full automated tests: 151 passed, zero failed/skipped.
- Discovery tests include real Astro ATAI3→4, GICITE5→6 and removal restoration, mixed-case extensions, aliases, invalid decoding and unknown-folder exclusion. Production asset inclusion/count tests pass.
- Chromium: 28 cases across 320/375/390/430/768/1024/1440, light/dark and JS/no-JS; all 28 routes load. No unexpected overflow, missing assets or runtime exceptions.
- All 27 unrelated route hashes and the Watch & Learn generated section are unchanged. All three click-only privacy-enhanced YouTube players, thumbnail associations and external links pass regressions.
- Credential/private-meeting-link scans clear. Twenty public asset hashes and ten private original hashes preserved.

Logs: `.community-drafts/speak001e-final/{check-verified,build-verified,tests-verified,browser-verified}.log`; browser metrics/results and screenshots: `.community-drafts/speak001e-final/layout-1794523754339/`.

[Before desktop](../../.community-drafts/speak001e-final/layout-1794523754339/before-1440-dark.png) · [After desktop](../../.community-drafts/speak001e-final/layout-1794523754339/after-1440-dark.png) · [Before mobile](../../.community-drafts/speak001e-final/layout-1794523754339/before-320-light.png) · [After mobile](../../.community-drafts/speak001e-final/layout-1794523754339/after-320-light.png) · [Desktop viewer](../../.community-drafts/speak001e-final/layout-1794523754339/viewer-gicite-2026-wru-key-talk-1440-dark.png) · [Mobile viewer](../../.community-drafts/speak001e-final/layout-1794523754339/viewer-gicite-2026-wru-key-talk-320-light.png). Visually inspected aligned desktop cards and uncropped mobile viewer. Evidence is private/local, not uploaded.

## Limitations and proposed PR description

Chromium emulation and synthetic gestures do not certify physical devices, Safari/Firefox or manual screen-reader/WCAG conformance. YouTube streaming remains provider-dependent; player requests are intercepted in automated tests. Publication/event identity/third-party permissions remain operator responsibilities. No verified conference recording is added; hackathon videos remain separate. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment success is claimed.

Proposed commit: `feat(portal): add compact conference galleries and details`. Continue existing draft PR42 after separate owner approval.

Proposed PR description: Make conference cards equal-height with fixed 16:9 previews and aligned event actions. Open photographs and event details in one responsive accessible fullscreen viewer, retaining native no-JavaScript details and all approved photos from mapped folders. Preserve event-status boundaries, Watch & Learn and 27 unrelated routes. Validated 151 tests, clean Astro check, 28-route build and 28 Chromium cases. Current ready images are ATAI1/GICITE4/ETIC0; excluded/private originals remain unpublished. Cache and Magicast findings remain open.

## Exact inventory and canonical hashes

Canonical combined patch is tracked `git diff --no-ext-diff --binary HEAD` followed by sorted untracked-file patches against /dev/null. Incremental correction compares the pre-final before-working snapshot (HEAD fallback) using normalized a/ and b/ headers. Ignored evidence is excluded. Hashes and complete machine-readable inventories live in `.community-drafts/speak001e-final/checkpoint.json`, with corresponding patch files, avoiding self-referential report hashes.

### Incremental final correction (21 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001D-DISCOVERY.md`
- `docs/speaking/SPEAK-001E-FINAL-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/discover-speaking-images.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery.test.mjs`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-final-layout.test.mjs`
- `scripts/community/speaking-viewer.browser.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/conference.js`
- `src/components/speaking/showcase/gallery.js`
- `src/data/conferenceFolders.json`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined preserved workstream (79 files)

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
