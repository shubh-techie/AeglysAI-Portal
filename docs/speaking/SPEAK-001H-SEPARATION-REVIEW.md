# SPEAK-001H-FIX — final conference and video separation

Implemented and validated locally; no staging, commit, push, merge or deployment. Current branch/history preserved.

## Baseline

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; remote `https://github.com/shubh-techie/AeglysAI-Portal.git`; branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged, no hosted checks/reviews reported. Localhost4321PID58050/Node24.22.1/original worktree preserved. Index empty.

## Two independent sections

**01 Conference Engagements:** Existing3cards and their unified white photo/event dialog remain. Removed event recordingIds, YouTube data attributes/links and Youtube helper import from EventCard. Strict event schema has no video fields. Existing photo/details actions open the same dialog; metadata/status/date/website/photos/attribution and full event information remain. No playback, video links or video URLs required for a card to render.

**02 Watch&Learn:** Now renders all4configured recordings rather than filtering out event-associated ones. GICITE already existed once in the configuration; it was moved into visible Watch&Learn rendering, not duplicated. Existing VideoCard and playback controller reused. Conference fallback is correctly classified; a null channel shows YouTube without a dangling separator. Original3AEGYTHON card HTML is byte-identical. Updated section description distinguishes community and conference recordings.

| ID | Classification | Placement |
|---|---|---|
|Uw6hD61RqNM|AEGYTHON2026industry-expert Q&A|Watch&Learn only|
|OLASKGI-aFw|AEGYTHON2026founder Q&A|Watch&Learn only|
|tn5RhKbzRcw|AEGYTHON2026registration/qualification guide|Watch&Learn only|
|CEEVv2PYkfg|GICITE2026conference recording, owner-associated|Watch&Learn only|

Recording eventId is optional classification with association provenance; it no longer requires a matching event/reverse recordingIds. Unique IDs, publication approval, metadata verification and file/digest safety remain enforced. Invalid data still fails closed. The shared existing content bundle is retained; no duplicate model, CMS or service.

A real isolated Astro build with recordings=[] produces byte-identical Conference Engagements HTML and all3cards. Tests also reject attempts to reintroduce recordingIds on a strict event. Duplicate videos remain rejected.

## Thumbnail and metadata

Downloaded [official YouTube thumbnail](https://i.ytimg.com/vi/CEEVv2PYkfg/hqdefault.jpg) to src/assets/speaking-videos/CEEVv2PYkfg.jpg, visually inspected actual GICITE artwork, validated full JPEG decoding,480×360/21574bytes. SHA256 `b6564cae0c233c77784a61bcfa5fbb3f0036a35efd8306431e85a266f18641bf`. All4thumbnail sources/hashes verified by existing cache helper; original3bytes unchanged. Astro serves optimized local WebPs, with existing styled failure fallback. No remote thumbnail request on page open.

GICITE uses existing neutral title GICITE2026conference recording and owner-supplied association. Exact external title/channel/playability remain unverified as documented in the prior recording review; no channel/date invented from the thumbnail. Provider streaming restrictions remain external.

## Validation

- Astro check204files:0errors/warnings/hints. Production build28routes. Full suite156/156,0fail/skip.
- Real no-video Astro build proves conference rendering independence. Strict event no-video contract, provenance/verification and duplicate-ID regressions pass.
-28Chromium cases320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS/reduced motion, all28routes.0missing assets/runtime/console errors.
- Exactly4recording cards; every local thumbnail decodes; each click/Enter/Space creates only its correct nocookie iframe, leaving unclicked cards unloaded. GICITE Space activation included. No iframe/autoplay/third-party request on initial page load. All4no-JS anchors and separate external YouTube links correct.
- Conference cards/dialog contain no YouTube links/players. One unified white dialog, allphotos/metadata/counters/navigation, Enter/Space/Escape/focus/scroll locks preserved.294card-target cases retain0pxgeometry shift; emptyETIC fixture still passes.
- Statuses remain ATAICompleted/GICITECompleted/ETICInvitationAccepted; All filter shows3. Photo counts remain3/6/1. All original source/generated photos, discovery/controller/styles and source data boundaries unaffected.
- Original3video card HTML,27other route hashes and FeaturedMedia sources unchanged. No dependencies, workflow, CSP or security gates modified.

Logs `.community-drafts/speak001h-separation/{check-final,build-final,tests-final,browser-final}.log`; preservation.json; four-cache verification output recorded in tool evidence. Actual browser measurements/screenshots in layout-1794531102206/results.json. Synthetic no-video fixture stays ignored/private, not production content.

## Screenshots

[Four videos1440dark](../../.community-drafts/speak001h-separation/layout-1794531102206/watch-learn-1440-dark.png) · [Four videos390light](../../.community-drafts/speak001h-separation/layout-1794531102206/watch-learn-390-light.png) · [Conference tiles1440dark](../../.community-drafts/speak001h-separation/layout-1794531102206/after-1440-dark.png) · [Unified white dialog390light](../../.community-drafts/speak001h-separation/layout-1794531102206/viewer-gicite-2026-wru-key-talk-390-light.png) · [Before conference section](../../.community-drafts/speak001h-separation/layout-1794531102206/before-1440-dark.png).

Desktop/mobile Watch&Learn captures visually inspected. Evidence remains local/ignored, not uploaded.

## Limits and delivery boundary

Chromium emulation is not physical-device/cross-engine/manual-screen-reader certification. Player source/activation is tested with provider requests intercepted; real streaming/title/channel not independently certified. Existing raw photo content/earlier engagement-record snapshots remain as previously documented. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment claimed.

After separate owner review/authorization, use existing draftPR42 and preserve Speaking history. Proposed focused message: `fix(portal): separate conference galleries and video recordings`.

## Exact inventory and canonical hashes

Combined canonical patch: tracked `git diff --no-ext-diff --binary HEAD` plus sorted untracked /dev/null patches. Incremental separation compares pre-task before-working snapshots with HEAD fallback and normalized a/path,b/path headers. Ignored/private evidence excluded. Complete inventories/SHA256 in `.community-drafts/speak001h-separation/checkpoint.json`, with review.patch/incremental-review.patch, avoiding self-reference. Nothing staged.

### Incremental final separation (20 paths)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001A-THUMBNAILS.json`
- `docs/speaking/SPEAK-001H-SEPARATION-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-photos.test.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/speaking-video.test.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `src/assets/speaking-videos/CEEVv2PYkfg.jpg`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/VideoCard.astro`
- `src/data/speakingContent.ts`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`

### Combined uncommitted inventory (101 files)

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
