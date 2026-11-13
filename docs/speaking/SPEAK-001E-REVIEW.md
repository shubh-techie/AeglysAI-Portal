# SPEAK-001E — fullscreen conference viewer review

Status: implemented and locally validated. No staging,commit,push,PR edit,merge or deployment. Existing Speaking workstream and prior uncommitted changes remain preserved.

## Verified Git and environment

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, remote `https://github.com/shubh-techie/AeglysAI-Portal.git`.
Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`, HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged with no new hosted checks/reviews. One original worktree, localhost4321PID58050, Node24.22.1/devcommand/Astroconfigs unchanged. No other repository accessed.

## Viewer implementation

Only the photo popup is redesigned. The main Speaking presentation, cards/event-detail content, Watch&Learn, verified event facts and discovery workflow remain preserved.

- Native dialog occupies94%of viewport on desktop and95%on mobile, with dark backdrop and a prominent always-accessible Close header.
- Desktop image/context columns use70/30 proportions; the selected complete approved image is centered with contain fit, not cropped. Photo navigation/counter and thumbnails sit outside the image.
- Mobile stacks image, controls, thumbnails and event details inside an independently scrollable body. Close remains outside that scroll area. Horizontal swipe changes photos; vertical pan remains scrolling.
- Context panel shows source conference name/dates/role/status/talk, selected caption/attribution, event website and full-image link. Current conferences have no verified associated recordings, so no conference recording links appear. AEGYTHON recordings are not repurposed as conference recordings.
- One shared viewer builds thumbnails/counters from the clicked discovered gallery; no count hardcoding, per-photo Astro component or manual photo array. Existing additional-photo refresh/build workflow remains unchanged.
- Proper labelled/described dialog, dialog-aware photo link labels, roving thumbnail focus, arrows/Home/End, Tab/Shift+Tab containment, Escape/Close/backdrop, focus restoration and shared background lock. Opening from event details leaves the parent inert beneath it; closing only the child restores its source-photo focus while preserving the parent's scroll lock.
- Safe textContent population and validated source URLs; no new iframe, network API, dependency, animation or autoplay. Image-error message retains usable navigation/full-image link. Unsupported/no-JS viewers retain native image links and expanded event details.

## Factual and asset preservation

Current discovered gallery counts remain ATAI1/GICITE4/ETIC0. ATAI remains Completed; GICITE completion remains unverified; ETIC awaits confirmation. All20public/conference files (ready inputs, sidecars and optimized outputs) are byte-identical to pre-E;10private original hashes verified. The viewer shows complete approved/sanitized display images, not sensitive raw masters or new crops. Existing original images and generated variants are untouched.

VideoCard/video.js, verified event records, discovery policy/generated data, package/dependency/configuration files and generated Watch&Learn section are unchanged from D. Other27HTMLpages remain byte-identical to verified preservation pins, including2026/2027/research/ModelD/media/publications. Main-page visible content is preserved; nonvisual event/photo attributes provide the viewer's verified context.

## Validation

- Final Astro check202files:0errors/warnings/hints.
- Final production build28pages; full149/149automated tests,0failures/skips. Existing automatic discovery mixed-extension/add/remove/invalid/unknown-folder tests remain passing, including real Astro3/5→4/6→3/5 builds without manual array/pin edits.
-28production Chromium cases across320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS, plus4before viewport/theme states and all28routes. Zero missing assets/runtime exceptions/overflow.
- Every fullscreen configured image decodes; contain fit and image bounds checked. Dialog width/height90–97%and desktop70/30 split asserted; mobile stack asserted. Caption/alt/role/event association and absence of unassociated recording links verified.
- Previous/Next, direct thumbnail selection, arrows/Home/End, simulated horizontal swipe, counter, popup focus wrap/restore, Escape/Close/backdrop and nested event-dialog locking pass. Broken-image fallback and complete no-JS native disclosure/gallery links pass. All three unchanged YouTube cards retain correct click-only players/Enter/Space/external links.
- Privacy/credential/meeting-link scans clear; original hashes and all conference assets preserved. No new security controls or dependency changes.

A nested test initially expected background unlocking while its parent event dialog was still open. The expectation was corrected to require the parent lock; no product behavior was suppressed. Raw failed/earlier evidence remains retained. Historical static/stylesheet pins were updated only for the reviewed viewer implementation; the six dynamic media regions continue to support ordinary file add/remove without pin edits.

## Before/after screenshots

Final directory `.community-drafts/speak001e/viewer-1794521182708/`:

- [Before desktop viewer](../../.community-drafts/speak001e/viewer-1794521182708/before-viewer-1440-dark.png) / [After desktop viewer](../../.community-drafts/speak001e/viewer-1794521182708/viewer-1440-dark.png).
- [Before mobile viewer](../../.community-drafts/speak001e/viewer-1794521182708/before-viewer-320-light.png) / [After mobile viewer](../../.community-drafts/speak001e/viewer-1794521182708/viewer-320-light.png).
- [Light desktop](../../.community-drafts/speak001e/viewer-1794521182708/viewer-1440-light.png) / [Dark mobile](../../.community-drafts/speak001e/viewer-1794521182708/viewer-320-dark.png).

Visually reviewed image centering/uncropped content, desktop split, mobile stack, controls outside the image and visible focus. Main-page comparison screenshots are retained alongside viewer screenshots. All evidence is local/ignored, not uploaded to GitHub.

Reproducible logs under ignored `.community-drafts/speak001e/`: check-release-review.log,build-final-review.log,tests-verified.log,browser-release-review.log,preservation-results.json and browser results.json. Source/asset snapshot retained in before-working/ and protected-assets.json.

## Remaining limitations and release boundary

Chromium/emulated/synthetic gesture tests are not manual screen-reader/full-WCAG, Safari/Firefox or physical-device certification. Real YouTube streaming is restriction-dependent and remains intercepted in browser tests. Event/rights/consent verification remains the existing operator publication responsibility; no claim is inferred from an image. Discovery refresh/reload instructions from SPEAK001D remain required; no file-copy-only hot-reload promise. Current ETIC gallery remains gracefully empty.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unsuppressed/unaccepted. No hosted CI/live deployment success is claimed.

Proposed commit after separate approval: `feat(portal): add fullscreen conference photo viewer`. Continue existing draftPR42; do not create a duplicate PR or alter existing history. Stop before staging/committing/pushing/merging/deploying.

## Exact inventory and canonical hashes

Combined candidate against HEAD includes all preserved uncommitted A+B+C+D+E work. Canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked file patches against /dev/null. Ignored QA/originals excluded. Incremental E compares files against pre-E D snapshots (or HEAD where not previously dirty), with patch headers normalized to a/<path> and b/<path>. Separate ignored checkpoint/patch files store both SHA256 values to avoid self-reference. Index remains empty.

### Incremental SPEAK001E files

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001E-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery.browser.mjs`
- `scripts/community/speaking-viewer.browser.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined uncommitted inventory

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
