# DESIGN-002C — Final layout, theme and navigation review

Recorded 2026-11-12. IMPLEMENTED locally; owner visual approval and Git delivery remain pending. This supersedes the prior candidate layout, not its historical evidence.

## Verified environment

Root `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`; branch `feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial`; HEAD and fetched origin/main `b8ca5936259515bc5ca91be906f3ea91804c4e3d`. Remote `https://github.com/shubh-techie/AeglysAI-Portal.git`. Preserved preview PID76010 at localhost4321, Node installation/configuration, worktree and ignored QA. Checks use existing Node24.22.1 via PATH. No new branch/dependency/font/framework, application script, workflow, asset or research-data change in this layout correction.

## Final layout and content

Section01 reuses EditorialSectionHeader/EditorialContentRow as four fully bordered equal-height cards. New owner-specified heading “A baseline for every next step.”; original introduction and model names/descriptions/statuses/detail links retained; Explore the Models link added. Decorative letters, consistent padding, aligned status areas and double-border ModelD research-complete distinction. One horizontal native grid track at all widths; no2x2. Desktop four columns; below1024 readable fixed-width cards with native overflow, proximity snap and an exposed next-card edge plus text cue. Focusable labelled region supports ArrowRight; normal links remain keyboard reachable. Native touch scrolling requires no client script. Complete qualification/NONE panel remains outside and below the scroller.

Section02 introduction now precedes the full-container unchanged ArchitectureDiagram at every width. No side-by-side rule remains. Labels, nodes/arrows, status map, baseline vocabulary and full bounded ModelD disclosures are byte-identical. Complete diagram fits the container, adapting its internals on smaller screens. No content clipping/page overflow in the matrix.

Hero, Question, Community, Media, Speaking, blue CTA and footer markup remain exact vs preceding candidate. Only the two requested sections' scoped composition changes. No GICITE homepage feature reintroduced; existing Speaking assets/gallery/video behavior retained.

Owner reference screenshot is not available locally; direct pixel comparison is unverified. Implementation follows the latest explicit written requirements.

## Navigation root causes and fixes retained

1. Mobile global focusin collapsed an open in-flow Research disclosure between pointer resolution and click, moving Architecture/Speaking/Hackathon targets and retargeting clicks to containers. Focus-leave closure now applies only on desktop; mobile sibling closure runs on click after target resolution.
2. Header theme controls were outside the native modal and therefore inert while it was open. Move the same original control group into the dialog panel and restore on close. One unchanged ThemeInit controller, storage key and control group; no duplicate implementation.
3. Browser history could restore open dialog/locked body. Existing controller now cleans up on pagehide and synchronizes persisted pageshow.

No additional navigation source changes in this final layout correction. Root-cause traces retained in ../design002c private QA; current navigation matrix rerun below.

## Validation

- Astro check:223files, zero errors/warnings/hints.
- Production build:28routes, successful.
- Complete automated suite:170/170, zero failures/skips. Added structural regression for no2x2, full-width stacked architecture and existing four model links/research facts. Updated exact current homepage output/source pins and outside-header Home pin only; historical baseline records retained. Other27route pins unchanged.
- First restricted-shell suite run lacked existing Python validator selection and loopback permission (six environment failures). Final suite uses existing `.community-drafts/speak001/contract-venv/bin/python` and local-network permission; no test/security gate suppressed.
- Homepage28cases:7widths ×2themes ×JS/noJS. All cards remain one row, equal height, each model reachable via native keyboard scrolling, touch scrolling works below1024, qualification stays outside scroller, architecture intro above full-width diagram, no page/figure overflow. Skip/focus, Media keyboard, image-loading/layout stability, readable text contrast and deliberate brand bands pass.
- Navigation28cases/308actual destination activations. Tests start with Research expanded, use physical touch through1024 and mouse1440, verify resulting URLs and GitHub popup. Research/Hackathon open-close/sibling behavior, menuClose/Escape, focus containment/restoration, menu scroll/touch targets, keyboard, theme while open, active-link semantics and actual back/forward restoration pass. Desktop unchanged. Native noJS links/disclosures remain usable.
- Theme persistence/reload, reset-to-system and OS preference changes pass. Header/menu sampled minimum contrast7.07:1; shared footer/Media sample>=4.5:1. Original theme controller unchanged. Speaking white overlay and four click-only nocookie video activations pass both themes; provider streaming is intercepted, not a certification of YouTube playback availability.
- Actual localhost28routes HTTP200 and bytes match final build. Same PID76010 remains listener.
- Comparing immediately preceding candidate:92output paths, only index.html differs; other91files including27HTMLroutes byte-identical. Comparing origin/main: shared Header fix intentionally changes all28headers; do not claim other27whole HTMLroutes byte-identical to main. Expected shared-header change is documented in preceding review.
- Protected six homepage sections/footer/diagram byte comparisons pass. Canonical diff whitespace/credential scans recorded in private checkpoint; no private QA publication.

## Responsive matrix

Every row passed both themes and JS/noJS (4cases/width), with44actual navigation link activations per width.

| Width | Card width / equal height (px, Day JS) | Diagram width (px) | Model track | Navigation |
|---|---|---|---|---|
|320|233.91 /497.50|284|one row, native scroll|44/44|
|375|281.22 /470.31|339|one row, native scroll|44/44|
|390|294.11 /470.31|354|one row, native scroll|44/44|
|430|304 /443.67|394|one row, native scroll|44/44|
|768|304 /477.81|706.55|one row, native scroll|44/44|
|1024|214.52 /617.91|942.08|four equal columns|44/44|
|1440|283 /531.34|1216|four equal columns|44/44|

## Complete navigation inventory

| Entry | Destination | Result |
|---|---|---|
|Home|/|28/28|
|Research trigger|native disclosure|open/close/sibling/keyboard pass|
|Research|/research/|28/28|
|Experiments|/experiments/|28/28|
|Publications|/publications/|28/28|
|Architecture|/architecture/|28/28|
|Speaking|/speaking/|28/28|
|About|/about/|28/28|
|Hackathon trigger|native disclosure|open/close/sibling/keyboard pass|
|AEGYTHON2026|/hackathons/|28/28|
|Hackathon2027|/hackathons/2027/|28/28|
|Community|/community/|28/28|
|GitHub|https://github.com/shubh-techie/AeglysAI|28/28|

No deeper configured nesting; no labels/destinations added or renamed.

## Screenshot and evidence index

Private evidence is intentionally ignored and not staged/publicly published. Full before/after homepage and individual Section01/02 screenshots at390/1440 in both themes:

- Before: `.community-drafts/design002c-final/browser-1794544115242/before-{research,architecture}-{390,1440}-{light,dark}.png`
- Final: `.community-drafts/design002c-final/browser-1794544314067/after-{research,architecture}-{390,1440}-{light,dark}.png`
- Complete browser geometry/results in the corresponding results.json. Final desktop Section01/02 and mobile Section01 visually inspected.
- Navigation/screenshots: `.community-drafts/design002c-final/browser-1794543991439/`, navigation-results.json, navigation-browser.log.
- Menu theme comparisons/white Speaking overlays: `.community-drafts/design002c-final/browser-1794544091164/`, theme-results.json and theme.log.
- check.log, build.log, tests-final.log, preservation.json, protected.json, localhost-routes.json and after-browser-final.log under `.community-drafts/design002c-final/`.

## Incremental scope of this final correction

- src/pages/index.astro
- src/styles/homepage-editorial.css
- scripts/design/homepage.browser.mjs
- scripts/community/design002.test.mjs
- scripts/community/design002-preservation.json
- scripts/community/design002c-preservation.json
- docs/specs/SPEC-024-homepage-experience.md
- docs/design/DESIGN-002C-REVIEW.md
- docs/design/DESIGN-002C-FINAL-REVIEW.md
- docs/DEVELOPMENT_LOG.md

## Combined pending inventory

Includes preserved earlier DESIGN002/A/B/C and separately authorized strict single-port preview correction; no delivery implied.

- astro.preview.config.mjs
- docs/DEVELOPMENT_LOG.md
- docs/LOCAL_DEVELOPMENT.md
- docs/adr/ADR-016-editorial-foundations.md
- docs/design/DESIGN-002-REVIEW.md
- docs/design/DESIGN-002A-REVIEW.md
- docs/design/DESIGN-002B-REVIEW.md
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
- src/components/Header.astro
- src/components/mobile-navigation.js
- src/pages/index.astro
- src/styles/homepage-editorial.css

## Hash and delivery checkpoint

Canonical method: `git diff --no-ext-diff --binary HEAD` followed by sorted untracked-file `git diff --no-ext-diff --binary --no-index /dev/null <file>` patches. Includes the complete pending inventory above. Final hash is recorded externally in `.community-drafts/design002c-final/checkpoint.json` and user report after documents are finalized, avoiding a self-referential hash. Earlier reviewed hashes are superseded for this candidate.

No staging/commit/push/merge/deploy. Proposed eventual scoped PR: final editorial homepage with approved progression/architecture, accessible navigation/theme stabilization and documented strict preview follow-up; include prior review history and final tests. Owner must approve visible result before Git delivery. DESIGN003 remains unstarted.

## Remaining limitations

HTTP cache advisory QA-H01/GHSA-ch52-4w7c-c8xp and embedded Magicast/source-map concern QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unresolved and not formally accepted. Chromium automation is not Safari/Firefox, physical-device or manual screen-reader coverage; those and field performance remain unverified. System fonts vary by platform. Native scroller users can focus the labelled region and use arrow keys; focus on a partly visible link alone does not force whole-card alignment in Chromium. All four models are verified reachable using keyboard scrolling without JS. No hosted CI/release/deployment is claimed.

## Owner-reported carousel usability correction

The following owner review rejected implicit-scroll discoverability. The current candidate adds explicit controls and changes the four-column breakpoint to1280. See [carousel and multi-device review](DESIGN-002C-CAROUSEL-REVIEW.md). This report and its hash remain historical evidence; use the newer checkpoint for delivery review.
