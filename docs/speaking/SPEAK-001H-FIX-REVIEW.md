# SPEAK-001H-FIX — conference card interaction review

Locally fixed and validated. Stop before staging, committing, pushing, merging or deploying. Proposed commit after separate authorization: `fix(portal): stabilize conference card overlay interactions`.

## Baseline

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Branch `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`; HEAD `452035a6a56d4abd6100134378beab1c9ff4d879`; fetched origin/main `6ee5480130490b8f90b4d38cd00c226cb20529b0`. PR42 remains draft/open/unmerged, no hosted checks/reviews reported. Localhost4321PID58050, Node24.22.1 and original worktree/configuration preserved. Existing uncommitted Speaking work and all originals preserved. Index empty.

## Reproduced cause: disclosure state and scrollbar removal

Actual existing localhost page,1440×1000 dark,15real-pointer cases: three events × photograph/title/body/whitespace/action. Before each click all cards were384×490.75px in3columns. Photo clicks opened the existing dialog and left disclosures closed. Title/body/whitespace handlers explicitly set details.open=true; the primary summary's unprevented default also opened details. Mutation traces record open-attribute changes. Computed grid-column becomes1/-1 via existing :has(details[open]) CSS. grid-auto-rows:1fr then enlarges every card/row.

| Triggered event |Before height, all3|After broken nonphoto click, all3|Dialog opened?|
|---|---|---|---|
|ATAI|490.75px|2482.30px|No|
|GICITE|490.75px|2563.30px|No|
|ETIC|490.75px|2347.30px|No|

This was divergent event routing into native disclosure/CSS state, not a console exception. Pointer capture/bubble/defaultPrevented and mutation evidence is retained in reproduction/layout-1794529395461/reproduction.json. Runtime exceptions were absent.

The stricter position/size checks then exposed a second real issue: body overflow:hidden removes15px scrollbar space. Desktop cards move horizontally7.5px; tablet card widths change336.5→344px. Added transient padding compensation based on the measured gutter, preserving/restoring original body padding and overflow. No grid/card CSS changed.

## Focused correction

- One delegated click handler routes photographs, title/body/whitespace and primary **View Photos & Details** into the existing white dialog. Prevents native disclosure default and propagation for intended activation. No inline/nested card buttons or whole-article button role.
- Keyboard-accessible photo links and primary native summary remain semantic controls; Enter/Space tested. Noninteractive surface clicks restore focus to the primary action; photos restore their exact link.
- Independent anchors/controls are excluded. Event website and GICITE recording remain normal external links with targetblank/noopener/noreferrer.
- Initialization guard prevents duplicate registration. One dialog remains outside the grid. No modal content is inserted into a card.
- The existing white compact dialog retains photos, counter, Previous/Next, Close/Escape, focus trap, scroll lock and natural image geometry. Date/status/event website are shown within it; full event information and approved links are in a collapsible dialog section. Trusted source nodes are copied without photo sections or IDs, avoiding duplicate galleries/IDs. Courtesy remains in the short photo caption. No sidebar or dialog thumbnail strip restored.
- Main card markup differs only by the action label; existing card/Grid CSS is byte-identical as a prefix of the stylesheet. New rules affect only dialog metadata. Page source before the dialog is unchanged.
- Native card details remain the no-JS fallback; with JavaScript all remain closed. Empty ETIC is tested without touching actual image files: metadata opens, counter says No photos, no stale image, navigation hidden and cards unchanged.

## Final layout and interactions

294target combinations =7widths ×2themes ×3events ×7activation paths (photo/title/body/whitespace/action/Enter/Space). Measured all3cards before, during and after every opening. **Maximum geometry difference:0px** across document x/y/width/height. Card details stay closed, grid columns stay unchanged, no overlap/overflow.

| Viewport width |Every card width×height before/during/after|
|---|---|
|320|284×444.27px|
|390|354×469.88px|
|768|336.5×464.03px|
|1024|464.5×536.03px|
|1440|384×490.75px|

Wide desktop retains3columns, tablet2, mobile1. All media ratios16:9 and primary actions bottom-aligned/44px-or-larger. Live localhost15-case replay also has exact matching viewport boxes and all15open the modal with no open disclosures. Console/hygiene replay:0console.error/runtime exceptions,0invalid nested interactive controls,0duplicateIDs, dialog outside grid, single lock depth.

## Validation

- Astro check204files:0errors/warnings/hints. Production build28routes. Full suite155passed,0failed/skipped.
-28Chromium cases320/375/390/430/768/1024/1440 ×light/dark ×JS/no-JS/reduced motion,294interaction measurements,84complete gallery sessions, all28routes.0missing assets/runtime/console errors.
- Every actual photo, counter, selected collage cell, arrows/Home/End/swipe, Close/Escape/backdrop, Tab/Shift+Tab and focus restoration tested. Empty ETIC fixture tested at every JS viewport/theme.
- External link dispatch observed unprevented by application, then canceled only by the test to avoid contacting third parties; valid href/target/rel and GICITE recording preserved. Full event metadata remains accessible.
- Existing3YouTube thumbnail/inline player/external link regressions pass. Other27generated route hashes, Watch&Learn HTML and Media sources unchanged. No new dependencies/security controls altered.
- All image inputs/outputs, photo schema/discovery/folder policy/event data/statuses/recordings are unchanged. Counts remain ATAI3/GICITE6/ETIC1. Source assets preserved, no synthetic fixtures published.

Initial new browser assertions matched similarly named hidden source-data attributes and included links inside a closed details section when computing last focusable control. Corrected selector scope/visibility to assert the actual dialog. The subsequent scrollbar shift was a product issue and was fixed rather than relaxing geometry assertions. No tests disabled, no allowable geometry threshold widened; final observed delta is0.

## Evidence

Logs under `.community-drafts/speak001h-fix/`: check-verified.log,build-verified.log,tests-verified.log,browser-final-review.log,preservation.json. Source snapshots in before-working/ and before-dist/.

- Actual broken live state: [GICITE before](../../.community-drafts/speak001h-fix/reproduction/layout-1794529395461/broken-gicite-2026-wru-key-talk.png), reproduction.json beside it.
- Final [desktop cards](../../.community-drafts/speak001h-fix/layout-1794530280698/after-1440-dark.png) / [mobile cards](../../.community-drafts/speak001h-fix/layout-1794530280698/after-390-light.png).
- Final [white desktop dialog](../../.community-drafts/speak001h-fix/layout-1794530280698/viewer-gicite-2026-wru-key-talk-1440-dark.png) / [white mobile dialog](../../.community-drafts/speak001h-fix/layout-1794530280698/viewer-gicite-2026-wru-key-talk-390-light.png).
- Final production metrics/interactions: layout-1794530280698/results.json. Live fixed boxes: live-release/layout-1794530078807/reproduction.json. Console/DOM hygiene: live-final/layout-1794530194785/{reproduction,hygiene}.json.

Final desktop cards/mobile dialog visually inspected. Evidence is local/ignored, not uploaded.

## Remaining limitations and delivery

No-JS deliberately uses native disclosure expansion instead of a scripted modal. Chromium emulation at1000px viewport height/synthetic gestures does not certify physical devices, other engines or manual screen readers. External-link default navigation is tested without visiting third parties; real YouTube streaming remains unverified/intercepted as previously documented. Existing owner-original screenshots may retain browser/meeting details; images were not edited in this interaction fix. Earlier individual engagement-record snapshots remain unchanged.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map-js QA-H02/GHSA-68fv-2mgg-jv7q remain **OPEN**, unsuppressed. No hosted CI, merge or deployment success claimed. Continue existing draftPR42 only after owner review/authorization; no new redesign branch/task.

## Exact inventory and canonical hashes

Combined canonical bytes: tracked `git diff --no-ext-diff --binary HEAD`, then sorted untracked /dev/null patches. Incremental FIX compares pre-FIX before-working snapshot with HEAD fallback, normalized a/path,b/path headers. Ignored/private evidence excluded. SHA256 values and complete machine inventories in `.community-drafts/speak001h-fix/checkpoint.json`, with review.patch/incremental-review.patch. Nothing staged.

### Incremental interaction fix (14 paths)

- `docs/DEVELOPMENT_LOG.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001H-FIX-REVIEW.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speaking-conference.test.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-final-layout.browser.mjs`
- `scripts/community/speaking-final-layout.test.mjs`
- `scripts/community/speaking-viewer.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`

### Combined uncommitted inventory (99 files)

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
