# DESIGN-002C — Theme stabilization and mobile navigation

Status: implemented and validated locally, awaiting owner approval. Same DESIGN002 working branch; no additional homepage redesign or new branch. Stop before staging/commit/push/merge/deploy.

## Preflight / baseline

Root /Users/shubhprabhat/Documents/Work/AeglysAI-Portal, correct shubh-techie/AeglysAI-Portal remote. HEAD/fetched main b8ca5936259515bc5ca91be906f3ea91804c4e3d; branch feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial. Verified preceding combined candidate ff60c589f82e9223b0c5d550070c8e90a80047890f365d16129913f69dcbd378 before editing. All21pending files and original navigation/theme sources archived in ignored before-working/baseline-source; existing work and preview correction preserved.

Localhost4321 remains owner-started Astro preview PID76010. Node installation, runtime process, worktree and URL unchanged. Actual GETs of all28existing routes return200 and match final build bytes, including404.html. Preview requires refresh after build; no hot-reload claim. Source Homepage/CSS, Section02's32.5%/67.5%desktop composition, enlarged hero and horizontal progression are unchanged byte-for-byte during C.

## Actual defects and evidence

### 1. In-flow disclosure collapse changed the tap target

With Research expanded, physical touch on Architecture or Speaking did not navigate; tapping Hackathon failed to open it. pointer-root-cause.json records pointerdown/up hitting the intended A/SUMMARY, then focusin while Research is open, then click resolving to NAV/DIV after Research collapses. The global focus-leave handler was closing the in-flow mobile list during pointer-induced focus, before click target dispatch. Fresh-menu destination taps passed, explaining why earlier tests missed it.

Fix: keep original focus-leave dismissal on desktop, where dropdowns are positioned out of flow. On mobile, retain native focus/disclosure behavior and close siblings on click after hit testing. No preventDefault on navigation links, hidden overlay workaround, route rewrite or component replacement. The final harness deliberately expands Research before every destination activation, covering the previously failing sequence.

### 2. Theme toggle was outside the modal and inert

The open dialog owned only the navigation panel. The existing header theme toggle stayed outside it, so native modal inertness correctly blocked it. Hit testing at the apparent header toggle reached the dialog instead; no toggle existed inside the dialog.

Fix: move the original theme-control group into the panel on open, restore it after a stable comment anchor on close. One Header-scoped margin rule; original ThemeInit and global palette unchanged. No clone, duplicate event listener or second preference implementation. Existing full system-reset action still delegates to the original reset button; live announcement moves with the original group.

### 3. Browser history restored open/locked menu state

Actual browser back/forward while leaving the menu open restored /architecture/ with dialog.open=true and body overflow=hidden. No page-lifecycle cleanup existed.

Fix: pagehide closes navigation/disclosures and restores the group/scroll state; persisted pageshow synchronizes responsive ownership. This uses cache-compatible lifecycle events, not unload handlers or history interception. Final native history navigation verifies closed dialog and unlocked body.

Evidence: .community-drafts/design002c/{diagnosis.json,pointer-root-cause.json,diagnosis-extra.json}. All are private QA artifacts, not published application data. No invalid href or invisible stacking overlay was found; the touch failure was event/focus timing. Header colors already passed contrast, so no palette workaround was introduced.

## Complete destination and control inventory

Inventory comes from project.ts navigation, Header's existing Hackathon child records and rendered shared header; no item added or renamed. Research and Hackathon remain semantic native summary controls with implicit button roles, enhanced expanded state and existing aria-controls. Anchors remain real navigation links. No deeper groups exist.

| Existing destination / group | Actual target | Final result |
| --- | --- | --- |
|Home (mobile link / desktop brand)|/|PASS|
|Research trigger|Research native disclosure|PASS open/close|
|Research child|/research/|PASS|
|Experiments child|/experiments/|PASS|
|Publications child|/publications/|PASS|
|Architecture|/architecture/|PASS|
|Speaking|/speaking/|PASS|
|About|/about/|PASS|
|Hackathon trigger|Hackathon native disclosure|PASS open/close, sibling behavior|
|AEGYTHON2026 child|/hackathons/|PASS|
|Hackathon2027 child|/hackathons/2027/|PASS|
|Community|/community/|PASS|
|View on GitHub|https://github.com/shubh-techie/AeglysAI|PASS new-tab destination|
|Close / Escape|Original opener|PASS focus and scroll restoration|
|Theme toggle / Use system theme|Original theme controller|PASS while menu open|

11destinations ×28cases =308actual touch/mouse activations, with resulting route/document or popup URL verified. All cases start with Research open before selecting lower items. No source-only href check or screenshot substitute. Both native dropdown toggling, child navigation and one-at-a-time JS behavior pass; noJS retains normal native disclosure semantics. Old failed cases now pass.

## Responsive / interaction matrix

| Width | Height | Enhanced navigation | Light/Dark ×JS/noJS | Destination results |
| --- | --- | --- | --- | --- |
|320|640|Mobile modal / native fallback|4cases|44/44 PASS|
|375|812|Mobile modal / native fallback|4cases|44/44 PASS|
|390|844|Mobile modal / native fallback|4cases|44/44 PASS|
|430|932|Mobile modal / native fallback|4cases|44/44 PASS|
|768|768|Mobile modal / native fallback|4cases|44/44 PASS|
|1024|768|Mobile modal / native fallback|4cases|44/44 PASS|
|1440|1000|Desktop disclosures / native fallback|4cases|44/44 PASS|

Additional checks: no horizontal overflow or invisible hit blocker,44px mobile targets, long-menu scrolling, repeated dropdown open/close, opening Hackathon while Research is expanded, close button, Escape, focus containment/restoration, native fallback keyboard open/close, desktop Research keyboard traversal and Escape. The original active/current-route indicators and destinations remain. Current-page assertions verified after each internal navigation. Native back/forward verified for each enhanced mobile case.

## Day/Night and theme evidence

ThemeInit.astro is byte-identical to pre-C; original storage key aeglysai-theme and matching/system listeners remain. One original toggle/reset control in raw HTML and one theme initializer; one live control group at runtime. Theme switching with menu open, saved preference across full reload, return-to-system and subsequent OS preference change pass. Source control is restored to the header on close.

Sampled header/menu text/icon contrast minimum7.07:1 in Day,8.31:1 in Night; mobile Day minimum7.58:1. Footer links/Media controls samples exceed4.5:1. Focus remains visible. No palette, global CSS or theme persistence rewrite needed. Editorial navy/ivory/blue section islands remain intentionally fixed; shared header/footer follow the existing preference. Speaking's white overlay remains white/readable in both themes; photo and details actions open the same dialog. All four video IDs create the correct click-only nocookie iframe independently, with zero initial iframe. Provider streaming itself is not certified by intercepted-player tests.

### Screenshots

Before/after menu comparisons: .community-drafts/design002c/browser-1794542998823/.

- before-menu-390-light.png / after-menu-390-light.png.
- before-menu-390-dark.png / after-menu-390-dark.png.
- before-menu-1440-light.png / after-menu-1440-light.png.
- before-menu-1440-dark.png / after-menu-1440-dark.png.
- speaking-overlay-light.png / speaking-overlay-dark.png.

Final navigation/full-home theme evidence: .community-drafts/design002c/browser-1794542769260/, including menu390/1440 and home390/1440 in both themes. Screenshots visually inspected. Existing approved Home layout is not redesigned; only the active mobile dialog gains the original theme toggle. Full menu outcomes/state checks in navigation-results.json; theme results in theme-results.json.

## Regression / expected shared difference

- Astro check223files:zero errors/warnings/hints.
- Production build28routes:success.
- Full suite169/169:zero failures/skips.
- Navigation browser28cases/308destination activations:zero exceptions or missing local assets.
- Actual localhost28/28HTTP200, all returned bytes match final build.
- All28HTMLfiles change because their shared header contains the corrected controller and one scoped spacing rule. Do not claim those pages are byte-identical.
- Every byte outside the shared header is identical to the approved pre-C build on all28routes, including full Home, diagrams, metadata, footer, Speaking galleries/video markup and hackathon content. All64non-HTMLassets unchanged;92outputs remain. Section02 and hero/progression source/CSS are unchanged.
- Source/data/registration/security workflow/dependency controls unchanged. No new dependency/font/image/third-party endpoint or theme implementation.
- Basic privacy/credential-pattern scan and git diff --check pass; no private QA output staged or public asset exposed.

Three historical direct-entry tests initially failed on the intentional shared-header delta. Added an exact test-only projection for each route-specific header/current-page variant and two changed navigation source files, restoring only the reviewed style/script chunks after checking new hashes. Whole outside-header hashes are independently asserted against raw current output. Historical hashes are unchanged. Direct monthly/gallery projection entry points now compose the same narrow header adapter. Real UTC month validation is still enforced before normalizing the reporting field; an additional future-rollover test prevents fixed-month CI regressions. No tests skipped, disabled, relaxed or security allowlists broadened.

Evidence root .community-drafts/design002c: build.log, check-final.log, tests-final.log, navigation-browser-final.log, navigation-results.json, theme-results.json, localhost-routes.json, preservation.json and frozen before source/build snapshots. Reproducible full interaction harness: node scripts/design/navigation.browser.mjs after (installed macOS Chrome/Node24); supplemental diagnosis/theme audit scripts are retained in private QA storage. Git delivery must include only reviewed source/docs/tests, not browser profiles or QA captures.

## Remaining limitations / freeze boundary

Safari, Firefox, physical devices and manual screen-reader sessions remain unverified. Local computed contrast is not full WCAG certification; emulated touch is not all hardware. Publisher thumbnails, GitHub availability and YouTube playback have provider/network-dependent behavior; configured destinations/player activation are verified. No field-performance or hosted CI/deployment result is claimed.

HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN and unaccepted. No suppression or resolution claimed. No new advisory remediation in this task.

Stop for owner approval. No stage/commit/push/merge/deploy, no new branch and no DESIGN003 work. After approved delivery, freeze DESIGN002 rather than adding homepage refinements. Previous candidate ff60c589... remains historical; current combined and incremental hashes/patches are recorded in ignored checkpoint.json after this report's inventories are finalized, avoiding a self-referential hash. Combined canonical method remains tracked binary diff against HEAD followed by sorted untracked-file binary diffs. Incremental scope compares before-working bytes (or HEAD for previously unchanged sources).

## Exact DESIGN002C incremental inventory (15 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/design/DESIGN-002B-REVIEW.md`
- `docs/design/DESIGN-002C-REVIEW.md`
- `docs/specs/SPEC-008-light-dark-theme.md`
- `docs/specs/SPEC-022-research-navigation.md`
- `scripts/community/design002-preservation.mjs`
- `scripts/community/design002.test.mjs`
- `scripts/community/design002c-preservation.json`
- `scripts/community/design002c-preservation.mjs`
- `scripts/community/design002c.test.mjs`
- `scripts/community/reporting-period-preservation.mjs`
- `scripts/community/speaking-discovery-preservation.mjs`
- `scripts/design/navigation.browser.mjs`
- `src/components/Header.astro`
- `src/components/mobile-navigation.js`

## Exact combined pending inventory (32 files)

- `astro.preview.config.mjs`
- `docs/DEVELOPMENT_LOG.md`
- `docs/LOCAL_DEVELOPMENT.md`
- `docs/adr/ADR-016-editorial-foundations.md`
- `docs/design/DESIGN-002-REVIEW.md`
- `docs/design/DESIGN-002A-REVIEW.md`
- `docs/design/DESIGN-002B-REVIEW.md`
- `docs/design/DESIGN-002C-REVIEW.md`
- `docs/specs/SPEC-008-light-dark-theme.md`
- `docs/specs/SPEC-022-research-navigation.md`
- `docs/specs/SPEC-024-homepage-experience.md`
- `package.json`
- `scripts/community/design002-preservation.json`
- `scripts/community/design002-preservation.mjs`
- `scripts/community/design002.test.mjs`
- `scripts/community/design002c-preservation.json`
- `scripts/community/design002c-preservation.mjs`
- `scripts/community/design002c.test.mjs`
- `scripts/community/homepage.test.mjs`
- `scripts/community/md002.test.mjs`
- `scripts/community/preview-port.test.mjs`
- `scripts/community/reporting-period-preservation.mjs`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-discovery-preservation.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/design/homepage.browser.mjs`
- `scripts/design/navigation.browser.mjs`
- `src/components/Header.astro`
- `src/components/mobile-navigation.js`
- `src/pages/index.astro`
- `src/styles/homepage-editorial.css`

## Final owner layout supersession

The subsequent owner instruction replaces the earlier two-column Section02 and tablet2x2 model presentation described above. See [final layout review](DESIGN-002C-FINAL-REVIEW.md) for current acceptance, screenshots, tests and combined inventory. The earlier navigation root-cause evidence remains applicable. Previous candidate hashes do not describe the revised candidate.
