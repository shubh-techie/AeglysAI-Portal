# DESIGN-003A — Shared editorial theme alignment

Recorded2026-11-13. Owner rejected the prior DESIGN003 visual treatment; preserve its engineering/content work. Continue feat/AEGLYSAI-PORTAL-DESIGN-003-editorial-alignment at main56b17c88d9e892ac5885c738468d2268e0bd803a. Prior19-file f70d41ab54e0ea5dbae3b401b6ca1d8674199372e82e746e943610b6180df7a9 candidate verified before edits and archived in ignored QA. Localhost4321/PID76010 preserved. No delivery authorized.

## Audit and proposed minimal shared change

Prior003 only changed hierarchy/rows; its page backgrounds still inherited the global Night palette. The approved Home instead uses explicit local color-scheme variants: navy hero, warm ivory narrative and dark technical regions. Reuse that mechanism and canonical DESIGN001 typography/spacing, with one opt-in static Layout variant and one shared CSS source. No second theme controller or global palette change.

Eligible: Publications, Media, Research, Architecture, About, Experiments and Community overview. Main layout variant changes visual surfaces/spacing without rewriting content or introducing wrappers per section. Use existing Hero, EditorialSectionHeader/FeaturedStory, diagrams and media components. Preserve Speaking/main/resource and Community operational layouts because their galleries/player/PDF/approval/form/report surfaces require independent treatment; no broad inherited theme override there. Home remains frozen.

All eight /hackathons/ routes are excluded, including their shared footer. Retain the earlier Footer refinement for non-event routes; conditionally render its merged-main presentation on events. This scopes previously unapproved003footer styling out of excluded routes rather than discarding the pending Footer work. Seek whole-output identity with merged main for all event pages.

No new Astro component, framework, JS dependency, browser theme implementation or CMS. Research data, status/claims/evidence and every link remain unchanged. Exact route classification is finalized below.

## Exact 28-route classification

Eight editorial routes including frozen Home, twelve specialized routes, eight excluded events. Seven editorial routes opt in; unknown future routes stay opt-out.

| Route | Classification | Treatment |
|---|---|---|
| /404.html | Specialized functional page | preserve specialized body; existing shared Footer only |
| /about/ | Editorial page | shared editorial page variant |
| /architecture/ | Editorial page | shared editorial page variant |
| /community/adoption/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /community/impact/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /community/ | Editorial page | shared editorial page variant |
| /community/projects/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /community/reports/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /community/submit/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /experiments/ | Editorial page | shared editorial page variant |
| /hackathons/2027/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/adaptive-authorization/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/autonomous-resilience/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/behavioral-risk/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/community/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/events/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/ | Hackathon/event page | excluded, restore merged-main Footer |
| /hackathons/sponsors/ | Hackathon/event page | excluded, restore merged-main Footer |
| / | Editorial page | frozen approved homepage |
| /media/ | Editorial page | shared editorial page variant |
| /publications/ | Editorial page | shared editorial page variant |
| /research/ | Editorial page | shared editorial page variant |
| /speaking/beyond-static-access-control/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /speaking/building-ai-driven-incident-response/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /speaking/etic-2026/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /speaking/from-static-security-policies/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /speaking/gicite-2026-wru-key-talk/ | Specialized functional page | preserve specialized body; existing shared Footer only |
| /speaking/ | Specialized functional page | preserve specialized body; existing shared Footer only |

Speaking already has a navy editorial introduction and specialized conference/media controls. Applying inherited light surfaces to galleries/modals/player resources would require separate structural/content audits; preserve their entire body/CSS/scripts. Community dashboards/forms/report archives and presentation/PDF detail pages retain schema/approval/resource layouts. No event routes, forms or publication approvals are inferred from the route policy.

## Shared implementation and design decisions

`src/layouts/editorial-policy.ts` owns the explicit seven-path opt-in and event-footer exclusion. `Layout.astro` composes canonical DESIGN001 tokens/base styles, existing compact presentation CSS and one `editorial-page.css` source only for eligible pages. Existing Hero markup produces full-width navy introductions; main content is warm ivory using the exact approved Home paper color. Local color-scheme resolves the existing light-dark palette, not a second theme store. Architecture diagrams, experimental tables/results and ModelD evidence retain local dark technical surfaces. No generic page builder or new Astro component.

Removed duplicate token/base imports from the three original target pages; their manuscript/media/research row styling remains in the same shared source. Canonical Footer tokens are selector-scoped to .site-footer, avoiding a late global [data-editorial] declaration that initially overrode the ivory alias. Header/menu/theme storage/controller and all content/data remain unchanged. Footer remains theme-aware and does not duplicate a closing CTA. On events its original merged-main markup is rendered with no new style block. Non-event Footer data-marker serialization changes only within the footer; no functional meaning changes.

All manuscripts/preparation statuses, six media records, five-card existing carousel, original portraits/thumbs, source destinations, research/evaluation statements and enforcement_authority=NONE are retained. Architecture nodes/arrows/status legends and technical vocabulary unchanged. No content cleanup/deletion implemented; prior003proposal remains informational.

## Preservation and validation

- Main baseline and fetched origin/main:56b17c88d9e892ac5885c738468d2268e0bd803a. Existing DESIGN003 branch; all pending work preserved. No branch created.
- Astro check229files, zero errors/warnings/hints; production build28routes; full178/178tests, zero failures/skips.
- Shared-layout288cases:8representative routes (seven opt-ins plus preserved Speaking) ×9widths ×2themes ×JS/noJS. Required320/375/390/430/768/1024/1280/1440/1920 pass. Browser asserts actual paper RGB244/240/231 and navy hero RGB8/15/28, local light/dark schemes in both Day/Night, readable text contrast>=4.5:1, Footer44px targets/focus, image loading and original Media keyboard behavior. This is not a screenshot-only theme pass.
- All28routes ×13dimensions ×2themes ×JS/noJS =1456cases; includes all required widths plus360/820 and phone844×390/tablet1180×820 landscape. Zero page overflow/offscreen-control/missing-local/runtime findings; Speaking open/Escape/scroll release/player and Media Next pass.
- Navigation44cases/484actual physical destination activations across11widths, both themes/JS-noJS. Research/Hackathon disclosure/touch/sibling/close, keyboard/focus/history, theme-in-menu and external GitHub pass. No navigation source change.
- Preference/reload/reset-to-system/OS-following pass; header/menu minimum sampled contrast7.07:1, Footer/Media>=4.5:1. White Speaking overlay/photo+details actions and four independent click-only players pass both schemes. No provider streaming certification.
- Frozen Home model carousel touch/counter/Enter/Space proof passes: allA–Dreadable, exact1/4→4/4 and tablet ranges. Body, carousel, architecture, community, Media/Speaking previews and blue CTA unchanged.
- All8event HTMLfiles are byte-identical to merged main, including Header/Footer/body/scripts/style references; no new editorial/footer styles occur on them. All64existing assets byte-identical;92output paths retained.13Home/specialized bodies are byte-identical outside permitted shared Footer; all data sources/scripts/configuration/workflows unchanged. Exact event output hashes and scoped-footer regression tests added. Historical fixtures unchanged; generated Speaking media/UTC validation continue through established guards.
- Actual localhost28routes HTTP200 and bytes equal final build. OriginalPID76010/port4321/worktree/runtime installation preserved. No temporary server started.
- Privacy/credential and whitespace checks saved with final checkpoint; no ignored QA/cache source enters candidate or production. Six prior approved thumbnail URLs/cache reused without changing production destinations.

## Device result matrix

Each width passes32representative cases (8routes ×2themes ×JS/noJS) and44navigation destinations. All pages have no horizontal overflow; source text/statuses remain untruncated.

| Width | Representative pages | Navigation | Shared surfaces / theme / focus |
|---|---|---|---|
|320|32/32|44/44|pass|
|375|32/32|44/44|pass|
|390|32/32|44/44|pass|
|430|32/32|44/44|pass|
|768|32/32|44/44|pass|
|1024|32/32|44/44|pass|
|1280|32/32|44/44|pass|
|1440|32/32|44/44|pass|
|1920|32/32|44/44|pass|

Additional360/820 and landscape route cases pass; physical devices are not certified.

## Before/after screenshots and representative views

Private root `.community-drafts/design003a/`. Before screenshots capture the rejected003candidate, not an invented mockup. Same approved thumbnail bytes are supplied to both runs; private caches are never published.

| View | Before directory/file | Final directory/file |
|---|---|---|
|Publications desktop/mobile|browser-1794603209638/before-publications-{1440,390}-{light,dark}.png|browser-1794603205456/after-publications-{1440,390}-{light,dark}.png|
|Media desktop/mobile|browser-1794603209638/before-media-{1440,390}-{light,dark}.png|browser-1794603205456/after-media-{1440,390}-{light,dark}.png|
|Research desktop/mobile|browser-1794603209638/before-research-{1440,390}-{light,dark}.png|browser-1794603205456/after-research-{1440,390}-{light,dark}.png|
|Architecture|same before directory, before-architecture-{1440,390}-{light,dark}.png|same final directory, after-architecture-{1440,390}-{light,dark}.png|
|About|same before directory, before-about-{1440,390}-{light,dark}.png|same final directory, after-about-{1440,390}-{light,dark}.png|
|Community overview|same before directory, before-community-{1440,390}-{light,dark}.png|same final directory, after-community-{1440,390}-{light,dark}.png|
|Speaking preserved|same before directory, before-speaking-{1440,390}-{light,dark}.png|same final directory, after-speaking-{1440,390}-{light,dark}.png|
|Experiments|same before directory, before-experiments-{1440,390}-{light,dark}.png|same final directory, after-experiments-{1440,390}-{light,dark}.png|

Corresponding footer screenshots exist as `{before,after}-footer-{route}-{width}-{theme}.png`. Rendered desktop Publications/Media/Research and mobile Architecture visually inspected. Figma reference files are unavailable locally, so direct Figma comparison remains unverified; actual section colors/spacing follow the approved Home sources and latest written requirements. Owner visual approval is pending.

Logs: check-final.log, build-final.log, tests-final.log, alignment-browser-final.log (288), responsive-browser.log (1456), navigation-browser.log (484), theme-browser.log, home-browser.log, localhost-routes.json and preservation.json in private root. Full route audit: browser-1794603349696/results.json; navigation: browser-1794603353063; preference/white Speaking overlay: browser-1794603357044; Home model proof: browser-1794603568754.

## Maintenance/performance limits

One static Layout policy and one shared theme stylesheet cover seven real routes, with existing components and no new client JS/font/dependency/request/service. Source-level CSS/theme duplication is removed. Inline opt-in composition preserves existing assets and keeps excluded outputs exact; it costs roughly3.1–3.4KB HTMLgzip per eligible page vs merged main, Home Footer+237bytes. No field-performance claim. Unknown routes remain opt-out and event prefixes protected; future eligibility is an explicit reviewable policy change.

HTTP cacheQA-H01/GHSA-ch52-4w7c-c8xp and embedded Magicast/source-mapQA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unresolved/unaccepted. Safari/Firefox, physical device/zoom, manual screen reader and field performance remain unverified. External/provider availability/streaming is not certified. Automated contrast checks do not establish full WCAG certification.

## Delivery checkpoint

Nothing staged/committed/pushed/merged/deployed; no subsequent task started. Owner must approve actual Day/Night desktop/mobile results before Git delivery. Combined candidate includes preserved DESIGN003 plus this correction.

Canonical method remains tracked `git diff --no-ext-diff --binary HEAD`, followed by sorted untracked-file `git diff --no-ext-diff --binary --no-index /dev/null <file>` patches. Final hash/patch saved under ignored `.community-drafts/design003a/checkpoint.json` after documents/inventory are finalized, avoiding self-reference. Earlier f70d41ab... evidence remains archived and is not current delivery authorization.

## Exact combined changed-file inventory

- docs/DEVELOPMENT_LOG.md
- docs/adr/ADR-016-editorial-foundations.md
- docs/design/DESIGN-003-REVIEW.md
- docs/design/DESIGN-003A-REVIEW.md
- docs/specs/README.md
- docs/specs/SPEC-009-media-coverage.md
- docs/specs/SPEC-031-editorial-alignment.md
- scripts/community/design002.test.mjs
- scripts/community/design002c-preservation.mjs
- scripts/community/design002c.test.mjs
- scripts/community/design003-preservation.json
- scripts/community/design003-preservation.mjs
- scripts/community/design003.test.mjs
- scripts/design/alignment.browser.mjs
- src/components/Footer.astro
- src/components/editorial/FeaturedStory.astro
- src/layouts/Layout.astro
- src/layouts/editorial-policy.ts
- src/pages/media.astro
- src/pages/publications.astro
- src/pages/research.astro
- src/styles/editorial-alignment.css
- src/styles/editorial-page.css
- src/styles/footer-editorial.css
