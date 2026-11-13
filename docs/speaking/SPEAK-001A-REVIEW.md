# SPEAK-001A — thumbnail and inline playback review

Status: local implementation, awaiting review; no staging/commit/push/merge/deployment for this follow-up.

## Verified state and root cause

Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`, baseline HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; freshly fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. Original SPEAK001 commit remains intact. PR42 is open/draft/unmerged; after separate approval this follow-up belongs in that PR. Initial working tree clean. Existing localhost4321 PID58050/Node24.22.1/configuration/worktree remain unchanged.

Missing thumbnails were intentional CSS decorative visuals, with external watch links and no player component. No reusable inline-player implementation or repository-defined CSP was found. This owner-requested change adds a scoped video initializer without relaxing policy, loading a player API, adding keys or dependencies.

## Implementation and content boundaries

- Downloaded conventional hqdefault.jpg for Uw6hD61RqNM, OLASKGI-aFw and tn5RhKbzRcw: all HTTP200/image/jpeg,480x360, visually inspected, nonblank actual images. Source sizes17,156/15,137/13,692 bytes; source SHA256 pins in SPEAK-001A-THUMBNAILS.json. Astro produces local optimized WebP. No initial remote-thumbnail requests.
- `cache-speaking-thumbnails.mjs --verify` validates exact reviewed bytes; `--refresh` downloads candidates only to ignored review storage, requiring content/dimension review before promotion. Page rendering/build never fetches thumbnails. New uncached IDs get a styled fallback.
- URL helpers accept validated IDs and standard HTTPS YouTube watch/shorts/embed/youtu.be URLs; reject spoofed hosts, credentials, invalid/ambiguous IDs. All generated URLs derive from the validated ID.
- Enhanced thumbnail links act as keyboard buttons (Enter/Space, visible focus). Only the activated card creates a titled fullscreen-enabled youtube-nocookie iframe; unrelated cards stay unloaded. No autoplay parameter. Referrer policy retains origin for YouTube player identification without sending full URL paths.
- Separate Watch on YouTube action always available. Without JavaScript, both thumbnail and text actions remain native external links. Styled fallback behind thumbnail also remains without JavaScript; enhanced image-error handling hides the failed image. Cross-origin player errors cannot reliably be detected; external option remains visible even for restriction/error pages.
- Exact existing titles retained. Videos remain AEGYTHON industry-expert Q&A, founder Q&A and registration/qualification guide, not delivered conference presentations. Conference/photo/consent/proposed-topic/status contracts unchanged. No synthetic photos in normal output.

## Validation

Fresh Astro check188files, zero errors/warnings/hints;28-page production build; full138/138 tests, zero skips/failures. Previous reviewed baseline136/136; two added regression tests cover URL safety, pinned cached thumbnail bytes, optimized mappings and interaction-only player source. Existing historical hashes retained; exact pinned inverse Speaking delta updated to include only reviewed output. All27unrelated HTMLroutes byte-identical to baseline pins, including2026/2027 and existing speaking details.

Chromium84before/after/gallery-fixture cases, all seven widths320/375/390/430/768/1024/1440, both themes, JS/no-JS;28route rendering pass, zero runtime exceptions. All three local thumbnails decode successfully; each video has correct watch/embed association, Enter and Space activation, visible keyboard focus, selected-only iframe/fullscreen/title and broken-thumbnail fallback. Zero initial iframe at every navigation.56external player requests occur only after deliberate test activation; all target the exact approved youtube-nocookie embed pattern, and are intercepted by the test transport. Existing gallery/Escape/no-JS behavior still passes.

All three real youtube-nocookie embed endpoints returnHTTP200 and include their video IDs. This is availability evidence, not successful streaming proof. No live playback, region/age/owner permission or ad-blocker compatibility certification. Browser screenshots show an empty intercepted frame intentionally; external YouTube is never fetched in the matrix. No Safari/Firefox/manual-AT/field performance claim.

Actual localhost4321 HTTP200 includes the new initializer and three links with zero initial iframe; original process unchanged. No CSP settings, dependencies, workflow gates or security controls changed. HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, without suppression or acceptance.

## Screenshot and raw evidence

- [Desktop thumbnails](../../.community-drafts/speak001a/video-browser-1794507033676/recordings-1440-dark.png).
- [Mobile thumbnails](../../.community-drafts/speak001a/video-browser-1794507033676/recordings-320-light.png).
- [Mobile activated frame](../../.community-drafts/speak001a/video-browser-1794507033676/inline-320-light.png).
- [Desktop activated frame](../../.community-drafts/speak001a/video-browser-1794507033676/inline-1440-dark.png).
- Previous decorative cards: .community-drafts/speak001/browser-1794504687502/recordings-1440-dark.png. Before output archived in .community-drafts/speak001a/before-dist.

Ignored .community-drafts/speak001a contains check-final.log, build-final.log, tests-verified.log, browser-final.log, embed-availability.json, thumbnail-downloads.json, cache-verify.log and local-speaking.html. Earlier failed browser focus assertion was a programmatic-focus test-modality defect; keyboard modality setup corrected, product focus unchanged. Canonical review.patch/checkpoint.json retained there separately to avoid self-reference.

Privacy: local thumbnails cause no visitor request to YouTube; clicking Play intentionally contacts YouTube via privacy-enhanced hosting. This does not promise zero tracking. No API key or user credentials. Google player sizing/default autoplay documented at https://developers.google.com/youtube/player_parameters; narrow active players retain minimum200px height while thumbnail area remains16:9/object-fit cover.

## Proposed delivery after separate authorization

Commit: `feat(portal): enable YouTube thumbnails and inline playback`.
PR42 update: replace decorative video visuals with pinned local YouTube thumbnails and interaction-only privacy-enhanced players; retain separate external viewing and all verified community classifications. Validation138/138,188-file clean check,28-page build,84browser cases and27unchanged routes. Disclose real streaming restrictions, no conference photos and existing open security findings. No staging or delivery authorized at this checkpoint.

## Exact file inventory and canonical hash

Canonical bytes: tracked `git diff --no-ext-diff --binary HEAD` then sorted untracked-file patches from `git diff --no-ext-diff --binary --no-index /dev/null <path>`. Excludes ignored QA evidence. SHA256 recorded in ignored checkpoint and final report.

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001A-REVIEW.md`
- `docs/speaking/SPEAK-001A-THUMBNAILS.json`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/cache-speaking-thumbnails.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-video.browser.mjs`
- `scripts/community/speaking-video.test.mjs`
- `scripts/site.test.mjs`
- `src/assets/speaking-videos/OLASKGI-aFw.jpg`
- `src/assets/speaking-videos/Uw6hD61RqNM.jpg`
- `src/assets/speaking-videos/tn5RhKbzRcw.jpg`
- `src/components/speaking/showcase/VideoCard.astro`
- `src/components/speaking/showcase/video.js`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`
