# SPEAK-001F — final dynamic conference gallery review

Status: implemented and validated locally. No staging, commit, push, PR modification, merge or deployment. Existing uncommitted SPEAK001A–E changes remain preserved.

## Baseline and release state

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`, remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`. Freshly fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged, no hosted checks/reviews reported. One original worktree and localhost4321 PID58050/Node24.22.1 unchanged. Existing localhost page was read and confirms updated card/viewer markup. No development command, configuration, runtime or dependency change in F.

## Source recovery and publication reconciliation

All ten submitted originals retain saved SHA256 hashes in private QA. All nine owner-folder image copies plus .DS_Store remain unchanged in the prior private relocation directory. No original is missing or overwritten; no destructive checkout or Git recovery was necessary. Git history/tree checks find no committed public/conference originals to restore. The earlier public owner folders were deliberately moved privately during D, not deleted; originals were replaced in public by reviewed publication-ready derivatives.

[Exact original and optimized inventory](SPEAK-001F-ASSETS.json) records filenames, hashes, dimensions, original formats/bytes, archived owner filenames/hashes, publication decisions, current optimized paths and source→display→thumbnail hashes. Existing detailed crop/evidence review remains in SPEAK-001B-IMAGES.json and SPEAK-001D-IMAGES.json. Recovery evidence `.community-drafts/speak001f/recovery.json`; no missing-source filenames.

| Canonical directory / approved alias | Existing event ID | Ready photos |
| --- | --- | --- |
| atai-2026 / ATAI 2026 | beyond-static-access-control | 1 |
| gicite-2026 / GICITE_2026 | gicite-2026-wru-key-talk | 4 |
| etic-2026 / ETIC-2026 | etic-2026 | 0 |

Five ready images produce five display and five thumbnail variants. All20public files (including five caption sidecars) remain byte-identical. Included: ATAI speaker webpage, GICITE privacy-safe portrait, speaker introduction, privacy-safe session slide and promotional speaker poster. The poster is labelled as artwork, never delivery evidence. Attribution **Courtesy of Shubh Prabhat**.

Five excluded originals remain private: unmapped-zoom-talk and unmapped-speaker-list lack confirmed event association; gicite-group-one/two expose participant/meeting details; etic-speaker-poster contains a confirmed-speaker claim inconsistent with the currently verified awaiting-confirmation status. The older “four-image selection” rationale for one group image is historical; no gallery count limit exists now, and its privacy issue still prevents publication. Raw owner count3/1/5 is not the eligible public inventory. No excluded file was arbitrarily assigned or republished. No new photograph was invented. ATAI remains Completed, GICITE completion unverified, ETIC awaiting confirmation.

## One configurable event contract and automatic discovery

Existing presentations.ts remains the single approved event-content source. `speakingContent.ts` derives the existing versioned `speakingEventSchema`, including stable ID/name/date/location/mode/organizer/role/status/talk/summary/full description/website and now joined photoDirectory/photoPublicationApproved/imageAttribution fields. `conferenceFolders.json` remains only the explicit asset publication/mapping policy. Safe generic generated path validation replaces the hardcoded three-conference path allowlist; hash, file and event-association validation remain intact. No new CMS/store/service.

New approved events need only existing event metadata and an approved folder policy entry; no Astro changes. Real-build isolated fixture confirms the fourth approved event and its image render, while draft events and unknown/rejected folders do not. Synthetic fixtures exist only in ignored isolated test builds, never production.

Discovery supports mixed-case JPG/JPEG/PNG/WebP, real decode/type/size validation, deterministic filename ordering and no count ceiling. It preserves source bytes, emits uncropped optimized display/thumb variants, and excludes unknown/publication-disabled folders. Invalid known-folder files fail validation before publication. Additional ready files appear after `npm run conference:refresh` and reload without server restart; production uses normal build and separately authorized deployment. No claim of immediate live updates or file-copy-only discovery. Source originals/sidecars are excluded from the production distribution by the existing scoped finalizer.

## Media-style cards and viewer

Inspected src/components/media/MediaCard.astro and MediaCarousel.astro: reused their 16:9 media, shared theme tokens, column-body and bottom-action principles without changing/coupling those components. Cards retain equal-height grid, fixed frame/fallback, status, title, date, compact approved summary, verified short talk when available, photo count and bottom action. Long metadata/captions stay in the viewer. Main cards have no thumbnail strips or over-image controls. Portrait/screenshots keep their approved contain/cover fit; nothing is stretched.

Card surface, photo and View Event Details open the same native modal; interactive child controls retain their behavior. Desktop viewer is94%viewport with70/30 photo/details; mobile is nearly fullscreen and stacked. Complete display image uses contain; controls/counter/thumbs are outside it. Verified metadata, captions/attribution and links remain factual; no AEGYTHON recording is associated with a conference. Empty ETIC is graceful.

Measured equal heights for all three cards (dark/JS examples; assertions also pass light and no-JS):

| Viewport width | Every card height | Action bottom inset |
| --- | --- | --- |
| 320 | 561.56 | 19 |
| 375 | 592.50 | 19 |
| 390 | 600.94 | 19 |
| 430 | 623.44 | 19 |
| 768 | 596.22 | 21 |
| 1024 | 668.22 | 21 |
| 1440 | 623.31 | 21 |

All media ratios1.77778; action targets ≥44px. Three/two/one columns at desktop/tablet/mobile.

## Validation and screenshots

- Astro check204files:0errors/warnings/hints. Production build28routes. Full suite **152/152**,0fail/skip.
- Existing real-build ATAI3→4/GICITE5→6→removal tests pass; mixed-case decoding, corruption/unknown/rejected folder and production asset inclusion checks pass. New future-event real-build regression passes without Astro edits.
-28production Chromium cases:320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS; all28routes load,0missing assets/runtime exceptions.
- All configured photos decode. Card/action/photo opening, Previous/Next/count, direct thumbnails, arrows/Home/End/swipe, Close/Escape/backdrop, focus wrap/restore and body locking pass. Empty gallery and empty→populated recovery pass; broken-image fallback retains controls/links. No-JS details expose complete metadata and photo links.
- Existing3YouTube thumbnail/player/external-link tests pass. VideoCard/video.js and MediaCard/MediaCarousel are unchanged. Watch&Learn HTML and27unrelated HTML route hashes are unchanged. Existing20public files and all private originals preserved. Credential/private-meeting-link scans clear.

Evidence under `.community-drafts/speak001f/`: check.log,build-final.log,tests-final.log,browser.log,preservation.json,recovery.json. Browser metrics/results/screenshots under layout-1794524625460/.

[Before desktop](../../.community-drafts/speak001f/layout-1794524625460/before-1440-dark.png) · [After desktop](../../.community-drafts/speak001f/layout-1794524625460/after-1440-dark.png) · [Before mobile](../../.community-drafts/speak001f/layout-1794524625460/before-320-light.png) · [After mobile](../../.community-drafts/speak001f/layout-1794524625460/after-320-light.png) · [Desktop viewer](../../.community-drafts/speak001f/layout-1794524625460/viewer-gicite-2026-wru-key-talk-1440-dark.png) · [Mobile viewer](../../.community-drafts/speak001f/layout-1794524625460/viewer-gicite-2026-wru-key-talk-320-light.png). Desktop and mobile card screenshots visually reviewed; automated bounds assert mobile viewer geometry. Local/ignored evidence is not uploaded.

## Limitations and delivery proposal

No additional photo mapping, delivery or organizer endorsement was verified in F. Private images require separate factual/privacy clearance before publication. Chromium emulation/synthetic gestures do not establish manual screen-reader, Safari/Firefox or physical-device certification. Provider video streaming remains restriction-dependent and intercepted in browser tests. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment success is claimed.

After owner review, proposed commit `feat(portal): finalize dynamic conference galleries`; continue existing draftPR42 rather than duplicating Speaking history. Proposed PR description: Finalize compact equal-height conference cards and one accessible responsive viewer, using approved folder discovery and the existing configurable event contract. Reconcile original assets, retain publication exclusions and verified statuses, and prove future-event configuration without Astro edits. Preserve Watch&Learn, Featured Media and27other pages. Validated152tests, clean check/build and28browser cases; current eligible countsATAI1/GICITE4/ETIC0. Existing security findings remain open.

## Exact inventories and hashes

Combined canonical patch: tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked patches against /dev/null. Incremental F patch compares pre-F before-working snapshot with HEAD fallback; headers normalized to a/path and b/path. Ignored QA excluded. Hashes and complete inventories in `.community-drafts/speak001f/checkpoint.json` alongside review.patch/incremental-review.patch, avoiding self-reference. Index remains empty.

### Incremental SPEAK-001F correction (16 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001D-DISCOVERY.md`
- `docs/speaking/SPEAK-001F-ASSETS.json`
- `docs/speaking/SPEAK-001F-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery.test.mjs`
- `scripts/community/speaking-final-layout.browser.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/data/speakingContent.ts`
- `src/data/speakingShowcase.ts`
- `src/styles/speaking-showcase.css`

### Combined preserved workstream (81 files)

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
