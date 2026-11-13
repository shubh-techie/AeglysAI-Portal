# SPEAK-001D — automatic conference discovery review

Status: implemented and locally verified. Stop before staging,committing,pushing,PR mutation,merging or deploying.

## Actual baseline and delivery context

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; origin `https://github.com/shubh-techie/AeglysAI-Portal.git`.
Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`, HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; latest fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged with no new hosted checks/reviews. SPEAK001 is committed; A/B/C and D are uncommitted local work preserved on that branch. Existing localhost4321 PID58050, Node24.22.1, worktree, dev command and Astro configs remain unchanged. No new dependency or workflow/security-gate changes.

## Authoritative mapping and current inventory

[Operator publication process](SPEAK-001D-DISCOVERY.md) defines explicit permission and privacy review before placement in a ready folder. File discovery is not an identity/rights/organizer-endorsement verifier.

| Ready source folder | Event ID | Current images |
| --- | --- | --- |
| public/conference/atai-2026 | beyond-static-access-control | 1 |
| public/conference/gicite-2026 | gicite-2026-wru-key-talk | 4 |
| public/conference/etic-2026 | etic-2026 | 0 |

Mappings are in `src/data/conferenceFolders.json`. No image-array editing is required to add or remove a photograph. JPEG/PNG/WebP extensions are case-insensitive; actual decoding/type, size/pixel limits, symlinks and optional caption metadata are validated. Case-insensitive deterministic filename sorting has an original-name tie-breaker. There is no four-photo or other count maximum. Unknown folders are ignored and excluded from the production conference output.

Current runtime inventory is generated `src/data/speakingPhotos.generated.json`: original ready filenames/hashes/dimensions/formats and all optimized paths/digests. Ten unique submitted originals and approval/exclusion information are recorded in [initial review inventory](SPEAK-001D-IMAGES.json). That audit list does not drive runtime enumeration.

Included: one ATAI speaker-webpage capture; GICITE desk-photo crop, speaker-introduction slide, privacy-cropped session slide and speaker poster. All use Courtesy of Shubh Prabhat and retain factual media-type captions. Five submissions remain excluded: two ambiguous event associations, two private/near-duplicate participant-group captures and ETIC artwork conflicting with its unverified confirmation status. No stock/synthetic images are conference evidence. ATAI Completed, GICITE completion-unverified and ETIC awaiting-confirmation statuses remain unchanged.

## Source preservation and production inclusion

Ten unique originals remain byte-identical in ignored private QA. The former public directory (nine duplicate original images plus.DS_Store) was moved intact under `.community-drafts/speak001d/original-public-conference` under the owner's explicit D instruction to retain originals privately; hashes verified. Five obsolete manually prepared thumbnails were archived privately so they are not rediscovered as input photos.

Five privacy-reviewed ready inputs are preserved unchanged. The generator performs no cropping: displays fit1920×1920, thumbnails fit320×320, without enlargement or distortion; source orientation is respected and optimized metadata stripped. Current production includes ten WebP assets (five displays/five thumbnails). Prior approved privacy crops are the ready input images; expanded views show the complete sanitized image, not sensitive private originals.

`npm run build` runs discovery, Astro, then a scoped finalizer that exports only referenced optimized assets under `dist/conference/_generated`. Raw publication inputs, sidecars and unknown folders never enter that production directory. Other Portal assets are untouched. The existing Pages workflow invokes this command; YAML, audit/check/test gates and dependency versions are unchanged. The legacy publish command delegates to discovery rather than restoring hand-maintained arrays/thumbs.

Local development: copying a file alone is not claimed to refresh discovery. Run `npm run conference:refresh`, then reload Speaking. Actual localhost verification shows ATAI1→2→1 using one temporary duplicate of an already-approved input, exact generated-byte restoration, and unchanged serverPID. No restart was needed. The dev server can serve literal public files, so private staging must remain outside public regardless of production filtering.

## Gallery and accessibility behavior

16:9 frames remain; slides/posters default to contain, cover is explicit only for reviewed photographic composition. Previous/Next and counter are below the image; no expand/control overlay obscures faces or slide text. A horizontally scrollable thumbnail strip supports larger counts without page overflow. Singletons hide controls. Detail galleries include captions/attribution and the complete sanitized image. Card image lightbox preserves arrows, Tab/Shift+Tab containment, Escape and focus restoration; event detail dialog navigation does not open a competing nested image dialog. Native details/full-image/external-video links remain usable without JavaScript. No autoplay/added animation or browser filesystem access.

## Verification results

- Astro check:200files,0errors/warnings/hints.
- Production build:28pages; full automated suite148/148,0failures/skips.
- Required growth/removal scenarios: isolated synthetic QA inventories and real Astro builds demonstrate ATAI3→4, GICITE5→6, then removal back to3/5, without editing source arrays or preservation pins. These fixture counts are not claims about real current event photos.
- Mixed `.PnG/.PNG/.JpG/.JpEg/.WeBp` handling, invalid/truncated/disguised unsupported images, unknown-folder exclusion, deterministic ordering, original-byte preservation, metadata stripping and production file/digest inclusion pass.
-28production Chromium cases =7widths320/375/390/430/768/1024/1440 ×2themes ×JS/no-JS, plus4historical before screenshots and all28route renders. Zero missing assets/runtime exceptions/overflow. Every configured slide decoded; thumbnail/direct navigation, counters, controls outside media, singleton hiding, popup Tab/Shift+Tab/Escape/focus and event details/no-JS behavior pass.
- All three existing video titles/classifications/local thumbnails and click-only privacy-enhanced playback preserved; Enter/Space and no-JS watch links pass. VideoCard/video.js and generated Watch&Learn section are byte-identical to pre-D. All27otherHTMLroutes byte-identical to prior verified pins. Canonical event records unchanged.
- Credential/meeting-link scans clear; production conference assets match the exact generated allowlist. Original private-file hashes verified. No API key, service or new dependency.

Historical tests now pin all Speaking bytes outside six explicitly approved card/detail-media interiors. Only those interiors vary with the operator-ready inventory; independent raw-output tests validate actual generated paths/hashes/counts. The exact package build/refresh script delta is projected backwards for older dependency guards; all other package bytes, dev/check/test commands and dependencies remain protected. Altering unrelated content or package bytes fails new tamper tests. This avoids requiring manual fixture/hash edits for ordinary add/remove operations.

Initial interrupted-D singleton-thumbnail assertion and compact/detail-selector assertions were corrected to reflect hidden singleton thumbnails and separate instances; no coverage/gate suppression. Raw log evidence preserves failed attempts. Final results above are fresh passing runs.

## Screenshots and reproducible evidence

Directory `.community-drafts/speak001d-auto/browser-1794518238207/`:

- [Before desktop](../../.community-drafts/speak001d-auto/browser-1794518238207/before-1440-dark.png) / [After desktop](../../.community-drafts/speak001d-auto/browser-1794518238207/after-1440-dark.png).
- [Before mobile](../../.community-drafts/speak001d-auto/browser-1794518238207/before-320-light.png) / [After mobile](../../.community-drafts/speak001d-auto/browser-1794518238207/after-320-light.png).
- [Mobile event dialog](../../.community-drafts/speak001d-auto/browser-1794518238207/dialog-320-light.png) / [Desktop event dialog](../../.community-drafts/speak001d-auto/browser-1794518238207/dialog-1440-dark.png).

Screenshots visually reviewed. Logs in ignored `.community-drafts/speak001d-auto/`: check-release-review.log,build-verified.log,tests-verified.log,browser-verified.log,dev-refresh-results.json,preservation-results.json. Private render/discovery fixtures remain isolated and ignored. No evidence uploaded to GitHub.

## Limits and delivery boundary

Semantic event association, subject consent, pixel privacy and legal permissions require the documented operator review; decoding cannot establish them. Optional generic alt text is intentionally neutral; richer per-file sidecars are recommended. Only mapped ready folders are supported; unsupported extensions/unknown directories do not publish. Inputs over20MiB/40million pixels and unsupported/animated encodings are rejected. Direct astrobuild bypasses the finalizer; use npmrunbuild. Refresh requires the documented command/reload; file-copy-only hot reload is not promised.

Chromium/simulated tests do not certify Safari/Firefox, physical devices, manual assistive technology or fullWCAG. Actual YouTube streaming is restriction-dependent; browser player requests are intercepted. No new hostedCI/live deployment success is claimed.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unsuppressed/unaccepted. No staging/commit/push/PR modification/merge/deploy authorized here.

## Exact inventory and canonical definitions

Combined candidate against HEAD includes preserved uncommitted A+B+C+D. Canonical bytes are tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked task-file binary patches from `/dev/null`. Ignored QA/originals are excluded. Incremental D compares current files against pre-D C snapshots (or HEAD where no snapshot), normalizing patch headers to a/<path> and b/<path>. Hashes and patches are saved separately in ignored checkpoint files to avoid self-reference. Generated data and outputs are included, not hand-maintained photo arrays.

### Incremental SPEAK001D files

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001D-DISCOVERY.md`
- `docs/speaking/SPEAK-001D-IMAGES.json`
- `docs/speaking/SPEAK-001D-REVIEW.md`
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
- `scripts/community/discover-speaking-images.mjs`
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
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/conference.js`
- `src/components/speaking/showcase/gallery.js`
- `src/data/conferenceFolders.json`
- `src/data/speakingPhotos.generated.json`
- `src/data/speakingPhotos.ts`
- `src/data/speakingShowcase.ts`
- `src/styles/speaking-showcase.css`

### Combined uncommitted source inventory

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
