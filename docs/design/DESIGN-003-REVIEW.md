# DESIGN-003 — Editorial alignment review

Status: IMPLEMENTED locally for owner visual review,2026-11-13. No Git delivery authorized; owner visual approval remains pending.

Baseline main56b17c88d9e892ac5885c738468d2268e0bd803a, all dependencies44/45/46 merged, successful Pages run43443679391. Branchfeat/AEGLYSAI-PORTAL-DESIGN-003-editorial-alignment; clean start, localhost4321/PID76010 preserved.

## Proposed change inventory before implementation

- Publications: existing manuscript records/statuses, intro and links retained; EditorialSectionHeader and compact divider rows, clearer title/metadata hierarchy. No authors/venue/year/DOI invented where none exist.
- Media: existing sorted data; newest publisher-dated story receives FeaturedStory treatment, not an endorsement. Remaining five use unchanged MediaCarousel and MediaCard. Six records appear once, no new carousel. Titles wrap fully on this route.
- Research: EditorialSectionHeader and opt-in canonical tokens; existing baseline cards use border-light stacked editorial rows, principles use a more readable list; all scientific copy/status/limits/links retained.
- Footer: refine existing Footer typography/grid/spacing/focus targets using canonical tokens, preserve every link/text and conditional behavior. No second CTA/footer.
- Tests: exact presentation projection for historical guards plus independent raw content/link checks, responsive all-route footer audit, before/after snapshots. No original historical hashes replaced.

## Component evaluation

Reuse EditorialSectionHeader, FeaturedStory, original Hero, StatusBadge, ModelCard, MediaCarousel/MediaCard, CreatorLinks and Footer. EditorialContentRow was evaluated for manuscripts but its mandatory link/index/footer metadata would force invented destinations or duplicated content; keep existing semantic manuscript articles with shared scoped row CSS. FeaturedStory gains only optional external-link semantics for its actual Media use; no new Astro component needed. No speculative pattern, runtime dependency or new script.

## Content cleanup proposal (no removal implemented)

| Original span | Disposition | Destination |
|---|---|---|
| “Current manuscripts remain in preparation; no publication or conference acceptance is claimed.” | Retain verbatim | Publications intro |
| “Working title · Manuscript in preparation” on every manuscript | Retain; visually secondary | Same manuscript row |
| “A curated list of verified related research will be added after the literature review. References and publication metadata are not yet available.” | Retain; possible later consolidation only with approval | Existing Related Research section |
| “Implementation status refers to the separate AeglysAI research/application repository. This portal presents the research program.” | Retain verbatim | Baselines introduction |
| “Local engineering acceptance is not independent field validation, security/distribution clearance or a commercial product release. No model artifacts, datasets or internal evaluation results are published here.” | Retain verbatim | ModelD evidence/limitations section |
| “Research hypotheses will be published after the research specification is finalized.” | Retain; no substitute claims | Research hypotheses notice |
| “Editorial arrangements have not been independently verified.” | Retain verbatim | Media disclaimer |

No scientific or publication content deleted or consolidated. Only visual containers and shared heading presentation may change. Figma screenshots unavailable locally; direct Figma comparison unverified.

## Final implementation and reuse

Publications retains both approved working-title manuscripts, original introduction/creator profile, all paper anchors and every link. There are no approved author lists, publication venue/year/DOI/indexing fields in the current paper data; none were invented. Existing InPreparation distinctions and literature-review limitation remain visible. Visual change is hierarchy/divider spacing, not bibliographic editing.

Media uses the first record in the existing publisher-date ordering as “Latest dated coverage”, then the unchanged MediaCarousel/MediaCard for the other five. No duplicates. All six original summaries, dates, categories, attribution, source destinations and thumbnails retained; first feature gets descriptive safe external-link semantics through the existing FeaturedStory. Feature selection expresses recency only. Remaining headlines are unclamped on /media/ only. Home Media is frozen.

Research reuses EditorialSectionHeader, original ModelCard and StatusBadge; baseline/principle containers become lighter editorial rows. Every paragraph, question, model name/status, method, experimental statement, provenance and limitation remains. ModelD research-complete, experimental offline/non-enforcing status and enforcement_authority=NONE are exact. No diagrams are replaced; the existing architecture route and homepage diagram remain untouched outside the footer.

Existing Footer/CreatorLinks/BrandMark and every destination/text/conditional are retained. Scoped grid, more legible text,44px link targets, focus and stacking; existing semantic palette and theme preference mechanism. No invented contacts, legal changes or duplicate collaboration CTA. No event-specific footer code changed.

Shared implementation ownership: src/styles/editorial-alignment.css owns the three target routes; footer-editorial.css owns Footer-only presentation. Canonical editorial-tokens.css/editorial.css remain unchanged and are inlined as raw source using the established Home convention. This keeps all shared stylesheet chunks and frozen page output stable, at a small per-page HTML cost. No new Astro component, browser script, dependency, font or animation framework. FeaturedStory only gains optional external-link attributes; its internal-link default remains unchanged.

## Content retained / consolidated / removed

All substantive text is retained. No paragraph, record, evidence note, disclaimer, valid link or source asset removed. No scientific conclusions rewritten. No content consolidation/deletion implemented: the proposal above requires later explicit approval for any substantive removal. Visual container/border consolidation is the only cleanup. Media first-story text moves within its own single record, not into a duplicate feature.

## Preservation evidence

Baseline92output paths retained. All64non-HTMLassets byte-identical in this local build. All25non-target routes, including the complete approved homepage body, Speaking and all AEGYTHON routes, are byte-identical outside the shared Footer. No source-data files changed. Header/navigation/theme initialization/scripts and all source assets/configuration/workflows stay unchanged.

On /media/ only, Astro changes the order of the existing global stylesheet link relative to its unchanged route style; metadata, stylesheet bytes and URLs do not change. The new test adapter records this exact head ordering alongside three exact reviewed mains/footer and affected source files. It refuses unknown main/head/footer/source bytes. Every historical hash remains; no tests disabled. Raw independent tests check retained paragraphs/link tuples, two manuscript statuses, six unique media IDs, five existing-carousel slides, metadata/source data, static assets, frozen25routes and tamper rejection. Dynamic Speaking media and native encoded WebP products use existing approval/decoding/inventory guards rather than non-portable new byte pins. UTC reporting-period validation remains intact.

## Validation results

- Astro check228files: zero errors/warnings/hints.
- Production build28routes, successful.
- Full automated suite176/176, zero failures/skips; four new independent alignment tests. Earlier transient preservation failures were adapter ordering/Media stylesheet-order expectations and have been resolved without regenerating historical pins.
- Target108cases: three pages ×nine requested widths ×two themes ×JS/noJS. Widths320/375/390/430/768/1024/1280/1440/1920. No page overflow; readable heading/paragraph contrast>=4.5:1; Footer links>=44px with real keyboard focus; all six publisher images decode/load; existing Media carousel Home/End keyboard behavior passes. Both themes retain the same data/content.
- All-route1456cases:28routes ×13dimensions ×two themes ×JS/noJS; requested widths plus360/820 and phone844×390/tablet1180×820 landscape. Zero overflow/offscreen-control/missing-local/runtime findings. Shared Footer inspected on every route. Speaking dialog open/Escape/scroll release and click-only player activation, and Media Next, pass at every audit dimension/theme with JS.
- Navigation44cases/484actual physical destination activations across11widths/themes/JS-noJS: all configured links, Research/Hackathon dropdowns, close/Escape, keyboard, focus containment/restoration, scrolling, theme-in-menu and back/forward. Header/navigation source unchanged. Not a screenshot-only pass.
- Saved theme preference reload, system reset and OS fallback pass. Header/menu sampled minimum7.07:1, footer/Media samples>=4.5:1. Existing white Speaking overlay and four independent click-only players pass both themes. Provider streaming is intercepted, not a certification of YouTube availability.
- Frozen homepage model carousel: actual touch shows allA–D with correct1/4→4/4 at390; tablet counters and Enter/Space pass. No homepage-body/carousel/style/source change.
- Actual localhost28routes HTTP200 and final build bytes match. Original previewPID76010 preserved; no temporary server or runtime/configuration change.
- Six existing publisher thumbnail URLs returnedHTTP200 and were decoded. Private QA cache supplies those same verified bytes to both before/after screenshot runs; no image download is added to production sources. Provider ownership/permissions remain the existing approved metadata policy.
- git diff --check and credential/private-path scans are recorded with final checkpoint. No private QA image/evidence files enter production or the candidate inventory.

## Responsive matrix

Each row passed12target cases (three pages ×two themes ×JS/noJS), with44actual navigation activations at that width.

| Width | Publications/Media/Research | Footer stack/targets/focus | Navigation |
|---|---|---|---|
|320|12/12|pass|44/44|
|375|12/12|pass|44/44|
|390|12/12|pass|44/44|
|430|12/12|pass|44/44|
|768|12/12|pass|44/44|
|1024|12/12|pass|44/44|
|1280|12/12|pass|44/44|
|1440|12/12|pass|44/44|
|1920|12/12|pass|44/44|

Additional360/820 navigation and route-layout cases pass. Landscape route audit covers both themes/JS-noJS; no separate physical-device certification implied.

## Before/after screenshot index

All screenshots are intentionally ignored QA evidence, not publicly published assets. Before/after use the same source thumbnail bytes.

| Page/view | Before | After |
|---|---|---|
|Publications desktop|browser-1794596566511/before-publications-1440-light.png|browser-1794596447666/after-publications-1440-light.png|
|Publications mobile|browser-1794596566511/before-publications-390-light.png|browser-1794596447666/after-publications-390-light.png|
|Media desktop|browser-1794596566511/before-media-1440-light.png|browser-1794596447666/after-media-1440-light.png|
|Media mobile|browser-1794596566511/before-media-390-light.png|browser-1794596447666/after-media-390-light.png|
|Research desktop|browser-1794596566511/before-research-1440-light.png|browser-1794596447666/after-research-1440-light.png|
|Research mobile|browser-1794596566511/before-research-390-light.png|browser-1794596447666/after-research-390-light.png|
|Footer desktop|browser-1794596566511/before-footer-publications-1440-light.png|browser-1794596447666/after-footer-publications-1440-light.png|
|Footer mobile|browser-1794596566511/before-footer-publications-390-light.png|browser-1794596447666/after-footer-publications-390-light.png|

Paths are relative to `.community-drafts/design003/`. Corresponding `-dark.png` exists for every entry; before/after full-page and Footer screenshots are captured on all three routes. Desktop targets and mobile Research/Footer visually inspected; owner review remains required. Direct Figma comparison is unverified because reference screenshots are unavailable locally.

Evidence logs under the same private root: dependencies.json; check-final.log; build-final.log; tests-final.log; preservation.json; localhost-routes.json; media-loading.json; alignment-browser-final.log (108cases), responsive-browser-final.log (1456cases), navigation-browser.log (484links); theme-browser.log and frozen-home-browser.log. Final route-audit results: browser-1794596451012/results.json; navigation: browser-1794596295638; saved-theme/white-Speaking overlay: browser-1794596570086; Home model proof: browser-1794596455315/model-*.png.

## Performance and maintenance impact

No new client JS, fonts, dependencies, requests or asset files. Existing thumbnails remain provider-hosted/lazy/referrer-suppressed in production. Added HTMLgzip versus baseline: Publications+2746bytes, Media+3031bytes, Research+2767bytes; Home shared Footer+227bytes. All92output paths/64existing assets retained. Raw inline styles avoid collateral chunk changes on frozen routes, trading a small HTML cost for exact scope isolation; no field-performance claim.

Canonical sources and existing patterns own the styling, with one three-route CSS layer and one Footer layer. Future changes to approved content still use existing data sources. Exact historical projection is test-only and fails on unreviewed presentation changes; it does not run in the browser. This is the last limited alignment task; no feature expansion started.

## Security/accessibility limits and delivery boundary

HTTP cache findingQA-H01/GHSA-ch52-4w7c-c8xp and embedded Magicast/source-map findingQA-H02/GHSA-68fv-2mgg-jv7q remain OPEN, unresolved and not formally accepted. Safari/Firefox, physical devices, manual screen reader and field-performance coverage remain unverified. External article destinations/metadata are preserved; continuing provider availability/streaming is not certified by static tests. Automated contrast/focus checks are not full WCAG certification.

Proposed commit: `style(portal): align research publications media and footer`. Proposed focused PR to main uses that scope plus preservation evidence and owner-approved desktop/mobile screenshots. No stage/commit/push/merge/deploy until separate owner authorization. Definition of Done still requires owner visual approval.

Canonical method: `git diff --no-ext-diff --binary HEAD` followed by sorted untracked-file `git diff --no-ext-diff --binary --no-index /dev/null <file>` patches. Includes the finalized inventory below. Hash/patch saved in ignored `.community-drafts/design003/checkpoint.json` after documents are finalized, avoiding self-reference; report final SHA to owner.

## Exact changed-file inventory

- docs/DEVELOPMENT_LOG.md
- docs/design/DESIGN-003-REVIEW.md
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
- src/pages/media.astro
- src/pages/publications.astro
- src/pages/research.astro
- src/styles/editorial-alignment.css
- src/styles/footer-editorial.css

## Owner feedback supersession — DESIGN-003A

The owner rejected this visual candidate as too similar to dark documentation. Its engineering/content evidence remains historical. Current shared navy/ivory theme, expanded safe route scope, explicit Hackathon exclusions and final candidate evidence are in [DESIGN-003A review](DESIGN-003A-REVIEW.md). Do not use the earlier f70d41ab... candidate hash for delivery.
