# SPEAK-001I — Watch & Learn carousel review

Status: implemented and validated locally; STOP before staging or delivery.

## Verified baseline

Repository AeglysAI-Portal; branch feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase. HEAD 452035a6a56d4abd6100134378beab1c9ff4d879; fetched origin/main 6ee5480130490b8f90b4d38cd00c226cb20529b0. PR #42 remains draft/open/unmerged. Existing localhost:4321 PID58050, Node24.22.1 and original worktree preserved. Previous uncommitted Speaking work remains intact; combined inventory below is larger than this task's incremental inventory.

## Result

Watch & Learn alone now uses a responsive scroll-snap carousel: desktop3, tablet2, mobile1. Equal-height cards retain 16:9 thumbnails; controls and accessible range counter sit below. Native touch scrolling, mouse drag, keyboard navigation and reduced motion are supported without timers or dependencies. A capture guard prevents swipe/drag from activating thumbnail playback. Existing click-only privacy-enhanced players and external links remain.

All four current records retain their titles, classification and cached bytes: Uw6hD61RqNM, OLASKGI-aFw, tn5RhKbzRcw and CEEVv2PYkfg. The last is the owner-associated GICITE recording; exact platform title/channel remain unverified. Conferences contain no video requirements.

## Configuration and thumbnail workflow

src/data/speakingRecordings.json feeds the existing typed schema. Minimal approved records need an ID or standard URL, title, category and publicationApproved:true; descriptions and supported metadata are optional. Unknown metadata defaults to OWNER_SUPPLIED. Shared src/data/youtube.ts retains the original normalization behavior. npm run speaking:thumbnails validates actual JPEG decoding, dimensions, size and nonblank content before caching missing approved images. No production/CI thumbnail downloads. No per-video component edits.

## Validation and evidence

- npm run check: 208 files, zero errors/warnings/hints (check-verified.log).
- npm run build: all28 routes (build-verified.log).
- npm test:159/159, zero failures/skips (tests-verified.log).
- Browser:28 viewport/theme/JavaScript combinations at320,375,390,430,768,1024,1440; all28 routes, zero exceptions/missing assets. Range/navigation, arrows/Home/End, native touch, mouse dragging, no swipe-created iframe, four thumbnail decodes, click-only players and NoJS external links pass.
- Isolated fifth approved synthetic record: thumbnail sync, real build, five slides and counter1–3of5/3–5of5 pass without component edits. Fixture stays private; no synthetic production record/image was added. Invalid/unapproved thumbnail batches reject without writes.
- Existing294 conference interaction cases pass without movement; conference section HTML, four rendered VideoCard interiors, gallery controller, original photographs/discovery, Media, dependency lock and other27 route HTML hashes are unchanged. preservation.json records the comparison.
- Existing initializer-count security test initially rejected an extra initializer; controllers were consolidated within the existing video initializer. The gate was not modified or weakened. Final suite passes.

Evidence root: .community-drafts/speak001i/. Final browser folder: layout-1794532766954; results.json includes geometry, fifth fixture and interaction results. Baseline grid screenshots: .community-drafts/speak001h-separation/layout-1794531102206/watch-learn-1440-dark.png and watch-learn-390-light.png. After screenshots: .community-drafts/speak001i/layout-1794532766954/watch-learn-1440-dark.png and watch-learn-390-light.png. Reviewed desktop shows three equal-height cards and mobile one, with the fourth reachable by controls/scroll. Both theme renderings and NoJS cases are captured.

## Limitations and delivery

Browser checks use local Chromium and emulated viewport/touch. Provider streaming restrictions cannot be certified by local intercepted-player tests; external Watch on YouTube remains available. A loaded cross-origin player owns gestures inside itself; use the controls or surrounding card area. New thumbnails require the documented sync/review/build workflow. Existing HTTP cache advisory and Magicast embedded source-map issue remain OPEN. No dependency, workflow or security-control changes. No staging, commit, push, merge or deployment performed.

Proposed commit/PR: feat(portal): add configurable Speaking video carousel. PR description: Convert Watch & Learn to a native responsive carousel while preserving all four cached thumbnails, classifications, click-only players and external links. Record data and validated thumbnail sync support future approved videos without component edits. Validated with159 tests, Astro check,28-route build and responsive/keyboard/touch/noJS browser coverage; existing security findings remain open. Integrate through existing draft PR42 only after review authorization.

Canonical combined and incremental binary patches, hashes and exact inventories are recorded in .community-drafts/speak001i/checkpoint.json, review.patch and incremental-review.patch after this report is finalized. Hashes exclude ignored QA evidence. The report does not embed its own hash.

### Incremental video carousel changes (22 paths)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001I-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `package.json`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-carousel.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.test.mjs`
- `src/components/speaking/showcase/VideoCard.astro`
- `src/components/speaking/showcase/VideoCarousel.astro`
- `src/components/speaking/showcase/video-carousel.js`
- `src/data/speakingContent.ts`
- `src/data/speakingRecordings.json`
- `src/data/speakingShowcase.ts`
- `src/data/youtube.ts`
- `src/pages/speaking/index.astro`

### Combined uncommitted inventory (107 files)

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
- `docs/speaking/SPEAK-001H-FIX-REVIEW.md`
- `docs/speaking/SPEAK-001H-RECORDING-REVIEW.md`
- `docs/speaking/SPEAK-001H-REVIEW.md`
- `docs/speaking/SPEAK-001H-SEPARATION-REVIEW.md`
- `docs/speaking/SPEAK-001H-UPLOAD-REVIEW.md`
- `docs/speaking/SPEAK-001H-UPLOADS.json`
- `docs/speaking/SPEAK-001H-WHITE-REVIEW.md`
- `docs/speaking/SPEAK-001I-REVIEW.md`
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
- `public/conference/_generated/gicite-2026/2abf925b095da983afd2f161f9454dfae120b94048aa83fd5577976ce280cfdc-display.webp`
- `public/conference/_generated/gicite-2026/512af7fba515fe5392cee81b89ff44ab5284fe3d53eefc49912d857a1739f287-thumb.webp`
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
- `public/conference/gicite-2026/GICITE_2026_5.png`
- `public/conference/gicite-2026/GICITE_2026_6.jpeg`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/discover-speaking-images.mjs`
- `scripts/community/prepare-speaking-photos.mjs`
- `scripts/community/publish-speaking-photo-assets.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-carousel.test.mjs`
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
- `src/assets/speaking-videos/CEEVv2PYkfg.jpg`
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
- `src/components/speaking/showcase/VideoCarousel.astro`
- `src/components/speaking/showcase/conference.js`
- `src/components/speaking/showcase/gallery.js`
- `src/components/speaking/showcase/video-carousel.js`
- `src/components/speaking/showcase/video.js`
- `src/data/conferenceFolders.json`
- `src/data/speakingContent.ts`
- `src/data/speakingPhotos.generated.json`
- `src/data/speakingPhotos.ts`
- `src/data/speakingRecordings.json`
- `src/data/speakingShowcase.ts`
- `src/data/youtube.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`
