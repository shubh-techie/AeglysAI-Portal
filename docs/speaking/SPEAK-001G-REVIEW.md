# SPEAK-001G — editorial conference showcase review

Implemented and validated locally. Stop before staging, committing, pushing, merging or deploying. No new branch or PR; existing Speaking history and A–F working changes preserved.

## Verified Git and environment

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged, with no hosted checks/reviews reported. Reviewed F combined patch matched `b74465120dd2ca4493dff81f94947dd5abbd3b6e942f642945f9be209cb1e9f5` before editing. One original worktree, localhost4321PID58050/Node24.22.1 and Astro configuration remain unchanged. Index empty.

## Before / after design

Before: three equal image slots including an empty ETIC panel, long event names/summaries and boxed status/action treatment. After: chronological photo-backed ATAI/GICITE pair with larger16:9 images, restrained date/status/count typography, concise role/confirmed-format summaries and one Explore Event action. ETIC is a compact full-width engagement row beneath them with its actual dates and awaiting-confirmation status. Main cards omit long names, talk titles, evidence descriptions and repeated status notes; these remain intact in the existing overlay/native disclosure.

Heading now “Research, beyond the page.” Filters remain keyboard/no-JS functional with text-tab styling. Shared surface/text/muted/cyan/line tokens and typography retained. Full image contain/cover decisions are unchanged; no new cropping, replacement photographs, framework or technical architecture. Main images/actions/card surfaces still open the existing viewer.

| Viewport | ATAI card height | GICITE card height | ETIC height |
| --- | --- | --- | --- |
|1440px dark/JS|573.84px|573.84px|121.75px|
|390px dark/JS|455.36px|455.36px|203.42px|

Desktop photo cards align in two columns; mobile stacks. Media ratio1.77778; no visible text clipping or overflow. Cards may grow naturally when stacked; old artificial identical mobile-height requirements are superseded. No main-card thumbnails or controls over image content.

## Approved event/image inventory

| Event / ready folder / alias | Images | Verified status |
| --- | --- | --- |
| ATAI / atai-2026 / ATAI 2026 |1|Completed|
| GICITE / gicite-2026 / GICITE_2026 |4|Confirmed engagement; completion unverified|
| ETIC / etic-2026 / ETIC-2026 |0|Awaiting confirmation|

All ten private original hashes and20public publication files are unchanged. Exact filenames/hashes/dimensions/source-to-optimized mapping remain in [SPEAK-001F-ASSETS.json](SPEAK-001F-ASSETS.json); prior exclusions remain private and unmodified. ATAI's only approved media is a speaker-webpage capture, not an action photograph. GICITE's featured portrait is its existing privacy-reviewed crop; introduction/session/poster images remain available inside the gallery. Artwork and image availability do not establish delivery or endorsement. Attribution remains Courtesy of Shubh Prabhat. No new publication approval inferred.

## Technical and factual preservation

PhotoGallery.astro, gallery.js, conference.js, discovery generator, schema/event data, folder policy/generated inventory and package.json are byte-identical to pre-G. No architecture rebuild. Existing refresh/build process still discovers every approved file, and future events still use the same event contract. Unknown/unapproved assets remain excluded. Normal refresh/reload and separately authorized deployment remain required; no immediate production-update claim.

Fullscreen viewer remains approximately94%viewport and70/30 desktop split, stacked mobile, contain-fit complete image, external navigation/counter/thumbs, scrolling metadata/attribution/links, Close/Escape/backdrop, focus containment/restoration and background lock. Full event text and status caveats retained. No conference recording association was invented.

VideoCard/video.js, MediaCard/MediaCarousel and generated Watch&Learn section are unchanged. All27other generated route hashes are unchanged, preserving Hackathon/community/research/ModelD/media/publications.

## Final validation

- Astro check204files:0errors/warnings/hints. Production build28routes. Full suite152passed,0failed/skipped.
- Existing mixed-case image discovery, real-build add/remove3/5→4/6→3/5, invalid/unknown/rejected files, future-event configuration and production asset inclusion tests pass.
-28Chromium cases across320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS with reduced motion. All28routes rendered;0missing assets/runtime exceptions/overflow.
- Desktop photo-card alignment,16:9 bounds, compact empty entry, no clipped summary and44px actions asserted. All approved gallery images decode. Photo/action/card opening, Previous/Next/count/thumbs/arrows/Home/End/swipe and Close/Escape/backdrop pass. Focus wrap/restore, background lock, empty→populated/error recovery pass. Native no-JS disclosure exposes metadata/full photo links.
- Three unchanged click-only privacy-enhanced YouTube players, thumbnails/external links and fallback regressions pass. Credential/private-meeting-link scan clear.

Initial tests correctly exposed the obsolete “View Event Details” label and mobile-identical-height assertions. Updated them to Explore Event and desktop photo-card alignment with compact empty-event sizing, preserving all meaningful count/content/gallery/keyboard/security assertions. No skips or suppressed failures. Historical style/HTML pins updated only for this scoped visual change; dynamic media boundaries remain enforced.

Logs `.community-drafts/speak001g/{check-final,build-final,tests-verified,browser-verified}.log`; preservation.json; browser results/measurements and screenshots under layout-1794525340990/.

## Screenshot comparison

- 1440px [before dark](../../.community-drafts/speak001g/layout-1794525340990/before-1440-dark.png) / [after dark](../../.community-drafts/speak001g/layout-1794525340990/after-1440-dark.png) / [after light](../../.community-drafts/speak001g/layout-1794525340990/after-1440-light.png).
- 390px [before light](../../.community-drafts/speak001g/layout-1794525340990/before-390-light.png) / [after light](../../.community-drafts/speak001g/layout-1794525340990/after-390-light.png) / [after dark](../../.community-drafts/speak001g/layout-1794525340990/after-390-dark.png).
- Open overlay [desktop dark](../../.community-drafts/speak001g/layout-1794525340990/viewer-gicite-2026-wru-key-talk-1440-dark.png) / [390px mobile light](../../.community-drafts/speak001g/layout-1794525340990/viewer-gicite-2026-wru-key-talk-390-light.png).

Visually inspected final1440dark,390light and390open-viewer captures; additional theme/320px screenshots retained. Evidence remains ignored/local, not uploaded. Owner visual acceptance is pending.

## Limitations and delivery proposal

No new factual verification or private-image clearance. Chromium emulation/synthetic gestures are not manual screen-reader, cross-engine or physical-device certification. Real YouTube streaming remains provider-dependent and intercepted in tests. Cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment success claimed.

After separate review approval, deliver existing Speaking workstream through draftPR42. Proposed commit: `feat(portal): refine editorial conference showcase`. Proposed PR description: Present approved conference media in larger two-column editorial cards and replace empty imagery with a compact engagement entry. Keep dates/statuses easy to scan while preserving complete factual details in the existing accessible fullscreen viewer. Retain automatic discovery, assets, YouTube, Featured Media and27other routes. Validate152tests, clean check/build and28browser cases; note current approved counts1/4/0 and existing open security findings.

## Exact inventory and canonical hashes

Combined canonical patch is tracked `git diff --no-ext-diff --binary HEAD` followed by sorted untracked patches against /dev/null. Incremental G compares pre-G before-working snapshot with HEAD fallback and normalized a/path,b/path headers. Ignored evidence excluded. Hashes and complete inventories in `.community-drafts/speak001g/checkpoint.json` alongside review.patch/incremental-review.patch, avoiding self-reference. Nothing staged.

### Incremental SPEAK-001G correction (12 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001G-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-final-layout.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined preserved workstream (82 files)

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
