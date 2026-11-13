# DESIGN-002C — Research carousel usability and multi-device review

Recorded2026-11-12. Local implementation only; visible candidate requires owner approval. Supersedes the rejected f04093ecd196ae0d69b31980c33849044d5a98417e1027b8fcaa34f0a03cade3 candidate; no Git delivery authorized.

## Environment

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; branch `feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial`. HEAD and fetched origin/main `b8ca5936259515bc5ca91be906f3ea91804c4e3d`. Remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Existing localhost4321 previewPID76010, worktree, runtime installation/configuration, all pending work and ignored evidence preserved. Checks use existing Node24.22.1 via PATH and pinned Python validator. No new branch, dependencies, fonts, framework, workflow, asset or research-data changes.

## Root cause and correction

The rejected implementation did scroll natively, and the parent stayed within the viewport. The defect was usability and breakpoint sizing, rather than a blocked pointer target or theme-specific overflow:

- Fixed 19rem/86% card sizing plus partial next-card edge gave insufficient discovery for B–D. No explicit controls or position indicator existed. Desktop/tablet cue was weak and the mobile cue depended on recognizing implicit scrolling.
- Four columns started at1024, producing214.52px-wide,617.91px-high cards. Long unchanged ModelD content set the height for every card.
- In the earlier native-only track, focus on a partly visible link did not necessarily reveal the full card. Keyboard scrolling worked, but lacked explicit model navigation.

Preserve the approved card borders, typography, statuses, order and double-border ModelD. Set a deliberate one-card track below640, two-card track640–1279 and four complete cards from1280 (80rem), maintaining one horizontal grid row throughout. Tighten only internal card gaps from24 to16px. Card content is never line-clamped or truncated. At390, card height470.31→427.13px; at1024,214.52×617.91→453.03×406.25px. Four-card1440width remains283px.

Add home-only progressive Previous/Next controls, visible current/range counter,44px targets, disabled edge states and existing focus styles. Use native CSS proximity snap; the small controller follows Media's offset/scroll/ResizeObserver/reduced-motion pattern without modifying Media or adding a package. Keyboard ArrowLeft/Right/Home/End and whole-card focus reveal. Update scroll geometry before actions and after scroll/resize, so changes do not use stale state. No autoplay, drag interception, network request or custom touch recognizer; touch stays native. Controls remain hidden with noJS and when all cards fit. The explicit A→B→C→D cue and labelled keyboard-focusable native scroller remain usable without JS. The full unchanged qualification/NONE panel stays outside the track.

No local owner screenshot attachment is available for direct pixel matching; diagnosis uses the reported defect plus measured preserved/current rendered layouts. Physical owner-device behavior remains for owner confirmation.

## Measured responsive matrix

All rows pass both Day/Night and JS/noJS, native scrolling, no2x2, equal heights, all four model links, full-width stacked architecture and no page overflow. All cards fit from1280; scrolling and controls below1280. Values are Day/JS card width×equal height.

| Width | Card dimensions px | Layout | Navigation destinations |
|---|---|---|---|
|320|260×481.50|one card track|44/44|
|360|300×454.31|one card track|44/44|
|375|315×427.13|one card track|44/44|
|390|330×427.13|one card track|44/44|
|430|370×427.67|one card track|44/44|
|768|335.27×433.38|two-card track|44/44|
|820|359.19×434.31|two-card track|44/44|
|1024|453.03×406.25|two-card track|44/44|
|1280|275×507.69|four columns|44/44|
|1440|283×515.34|four columns|44/44|
|1920|283×515.34|four columns|44/44|

## Actual interaction evidence

Homepage44cases at all11widths, both themes and JS/noJS pass. Buttons advance to every model; current/range indicator and disabled edges reflect actual geometry. Native swipes work; keyboard scrolling reaches every card with noJS. At390 both themes, real touch on Next produced ModelA1/4, B2/4, C3/4, D4/4. Each full card and all title/description/status elements were verified unclipped. At768, counters track A–B1–2/4, B–C2–3/4 and C–D3–4/4. Enter/Space activation of controls passes. At1440 controls are hidden because all four cards fit. No initial player iframe added.

Mobile navigation retains the prior proven focusin target-reflow fix, original theme-control relocation into native dialog and history cleanup. No navigation application source change in this correction. Full standard matrix44cases/484actual link activations passes. Every destination begins with Research expanded and is physically activated, not merely screenshot-tested. Research/Hackathon open-close/sibling behavior, close button, Escape, keyboard, focus containment/restoration, active destination, long-menu scrolling, theme while open and actual back/forward restoration pass. Includes external GitHub popup. No deeper nesting exists. Additional landscape matrix844×390/1180×820 passes8cases/88actual activations (both themes, JS/noJS), including short-height menu scrolling. Total navigation52cases/572activations. Landscape evidence: `.community-drafts/design002c-carousel/landscape/browser-1794545148971/`, navigation-results.json and navigation-final.log.

Inventory (each destination44/44): Home `/`; Research `/research/`; Experiments `/experiments/`; Publications `/publications/`; Architecture `/architecture/`; Speaking `/speaking/`; About `/about/`; AEGYTHON2026 `/hackathons/`;2027 `/hackathons/2027/`; Community `/community/`; GitHub `https://github.com/shubh-techie/AeglysAI`. Research and Hackathon disclosure triggers separately pass open/close/keyboard tests; no navigation labels/routes added.

## Site-wide audit and preservation

Automated Chromium static-build audit:28routes ×13dimensions ×2themes ×JS/noJS =1456cases. Dimensions: requested11widths plus844×390 phone landscape and1180×820 tablet landscape. Each route has one main H1, no page-level horizontal overflow and no visible main/footer controls horizontally outside the viewport unless inside an intentional horizontal scroller. Every local destination resolves to an existing output file; no missing local assets or runtime/console errors. No unrelated responsive defects found by these checks, and no unrelated layout altered. Audit source `scripts/design/responsive.browser.mjs`.

At each audit dimension/theme, Speaking dialog open/Escape/scroll release and independent click-only video player activation pass; Media Next moves the track. Full Speaking/gallery/discovery/counter tests remain in the171-test suite. No external registration form submitted or provider streaming certified by this audit. All public28routes actually return HTTP200 through unchanged localhost4321 with bytes matching final build.

92output paths retained. Compared with immediately preceding candidate, only index.html changes; all91other files including27non-home HTMLroutes remain byte-identical. Protected hero, full-width architecture section, Question, Community, Media, Speaking, blue CTA and footer markup are exact. No GICITE feature reintroduced. Model data, non-enforcing experimental/NONE claim, research qualification, all conference photographs/video records and Hackathon2026/2027 content unchanged. Compared with origin/main, earlier shared navigation fixes intentionally affect all28headers; do not claim27whole pages byte-identical to main.

Theme persistence/reload/system-reset/OS-following pass; one original unchanged ThemeInit implementation. Shared header/menu sampled contrast minimum7.07:1, footer/Media samples>=4.5:1, white Speaking overlay remains white in both themes. Approved editorial brand bands stay deliberately themed. No page theme inversion added.

## Checks

- Astro check225files, zero errors/warnings/hints.
- Production build28routes, successful.
- Complete suite171/171, zero failures/skips.
- Homepage44responsive cases; navigation52cases/572links including landscape; site-wide1456route cases, zero overflow/offscreen findings.
- Protected output comparison, all28actual localhost routes, theme preference/fallback, photo/gallery and four click-only video checks pass.
- `git diff --check`, credential-pattern/privacy checkpoint; no private QA publication. Final canonical hash lives in ignored checkpoint after documentation finalization.

Initial validation caught a stale scroll-position read in the new keyboard handler; it now updates actual geometry before choosing a target. The historical script-count guard correctly rejected the new fourth initializer; it now explicitly permits the exact pinned Home-only script and retains route restriction, exact source comparison, no-network/no-external-script checks and all other script checks. Existing historical script hashes remain intact after removing only the pinned new initializer for comparison. No test disabled. First broad browser run overlapped build output replacement; its missing temporary paths were not counted as a pass. Final runs used completed output.

Performance: Home68820→72818raw bytes; gzip+1067bytes vs rejectedcandidate. New inline model controller2767bytes, Home only. No new requests, font, runtime package or external JS bundle. Field performance remains unmeasured.

## Before/after screenshots and logs

Ignored evidence root `.community-drafts/design002c-carousel/`, not staged/public:

- Before390/768/1440boththemes: `browser-1794544880883/before-research-{390,768,1440}-{light,dark}.png`.
- After390/768/1440boththemes: `browser-1794544801234/after-research-{390,768,1440}-{light,dark}.png`.
- Separate mobile cards: `browser-1794544991606/model-{A,B,C,D}-390-{light,dark}.png`; model-evidence.json verifies every title/description/status is unclipped.
- Standard navigation: browser-1794544832682, navigation-results.json and navigation-browser-final.log.
- Site audit: browser-1794544836257/results.json and responsive-browser-final.log.
- Theme/menu/white Speaking overlays: browser-1794544839508 and theme-results.json/theme.log.
- check-final.log, build.log, tests-final.log, preservation.json, localhost-routes.json and homepage-browser.log.

Mobile390, tablet768 and desktop1440 screenshots visually inspected; card layout is compact, legible and balanced. Reference screenshot itself unavailable for direct comparison.

## Exact incremental files

- src/pages/index.astro
- src/styles/homepage-editorial.css
- src/components/research-model-carousel.js
- scripts/community/design002-preservation.json
- scripts/community/design002c-preservation.json
- scripts/community/design002.test.mjs
- scripts/site.test.mjs
- scripts/design/homepage.browser.mjs
- scripts/design/navigation.browser.mjs
- scripts/design/responsive.browser.mjs
- docs/specs/SPEC-024-homepage-experience.md
- docs/design/DESIGN-002C-FINAL-REVIEW.md
- docs/design/DESIGN-002C-CAROUSEL-REVIEW.md
- docs/DEVELOPMENT_LOG.md

## Combined pending inventory

Preserves all previous DESIGN002/A/B/C and separately authorized preview-port work. No staging implied.

- astro.preview.config.mjs
- docs/DEVELOPMENT_LOG.md
- docs/LOCAL_DEVELOPMENT.md
- docs/adr/ADR-016-editorial-foundations.md
- docs/design/DESIGN-002-REVIEW.md
- docs/design/DESIGN-002A-REVIEW.md
- docs/design/DESIGN-002B-REVIEW.md
- docs/design/DESIGN-002C-CAROUSEL-REVIEW.md
- docs/design/DESIGN-002C-FINAL-REVIEW.md
- docs/design/DESIGN-002C-REVIEW.md
- docs/specs/SPEC-008-light-dark-theme.md
- docs/specs/SPEC-022-research-navigation.md
- docs/specs/SPEC-024-homepage-experience.md
- package.json
- scripts/community/design002-preservation.json
- scripts/community/design002-preservation.mjs
- scripts/community/design002.test.mjs
- scripts/community/design002c-preservation.json
- scripts/community/design002c-preservation.mjs
- scripts/community/design002c.test.mjs
- scripts/community/homepage.test.mjs
- scripts/community/md002.test.mjs
- scripts/community/preview-port.test.mjs
- scripts/community/reporting-period-preservation.mjs
- scripts/community/speak001-preservation.mjs
- scripts/community/speaking-discovery-preservation.json
- scripts/community/speaking-discovery-preservation.mjs
- scripts/community/speaking-showcase.test.mjs
- scripts/design/homepage.browser.mjs
- scripts/design/navigation.browser.mjs
- scripts/design/responsive.browser.mjs
- scripts/site.test.mjs
- src/components/Header.astro
- src/components/mobile-navigation.js
- src/components/research-model-carousel.js
- src/pages/index.astro
- src/styles/homepage-editorial.css

## Hash, limitations and delivery boundary

Canonical combined method: tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked-file `git diff --no-ext-diff --binary --no-index /dev/null <file>` patches. Save patch and final SHA256 in ignored `.community-drafts/design002c-carousel/checkpoint.json`; report the hash to owner after documents are finalized, avoiding a self-referential hash.

Both HTTP cache advisory QA-H01/GHSA-ch52-4w7c-c8xp and embedded Magicast/source-map concern QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unresolved and not formally accepted. Chromium emulation and CDP touch are not Safari/Firefox or physical-device/manual-screen-reader certification. Actual owner-device scaling and direct screenshot comparison remain unverified. External YouTube/provider playback and registration-service availability are not certified. No hostedCI, commit, release or deployment is claimed.

No staging/commit/push/merge/deploy, branch creation or DESIGN003 work. Owner visual approval remains required before scoped Git delivery.
