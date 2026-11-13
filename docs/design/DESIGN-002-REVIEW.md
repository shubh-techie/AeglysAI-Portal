# DESIGN-002 — Actual homepage editorial adoption

Status: implemented locally, awaiting owner visual review. Actual src/pages/index.astro changed; not another prototype. No staging, commit, push, merge or deployment. DESIGN003 has not started.

## Baseline and environment

Verified main/branch HEAD b8ca5936259515bc5ca91be906f3ea91804c4e3d, correct AeglysAI-Portal root/remote. PR44 is merged. Its [Pages workflow43349999623](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/43349999623) completed successfully. Branch feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial created from that main. Prior branches/commits and ignored QA evidence remain preserved. No original uncommitted work was present.

Localhost4321 remains PID58050, with the same Node24.22.1, worktree, scripts and Astro settings. An actual GET of http://localhost:4321/ returns200 and the new editorial hero/model rows; localhost.json records it. Production is unchanged until reviewed delivery. No running process was stopped or replaced; browser checks close only their own temporary Chromium processes.

## Visual decisions and existing component reuse

Apply DESIGN001's display serif, sans body, restrained technical metadata, semantic palette aliases, spacing and container rhythm directly to Home. The official header/logo and global palette remain unchanged. Four existing patterns are reused: EditorialSectionHeader, EditorialContentRow, FeaturedStory and CollaborationCTA. ArchitectureDiagram, MediaCarousel and the approved PresentationThumbnail are also reused. No new UI component, design system, font, dependency, iframe/player or animation framework.

Hero now reads Intelligence, with boundaries; full project name, description, tagline, research theme and primary Research/GitHub destinations remain visible. Existing heroSVG stays exact. The model grid becomes four editorial rows using unchanged project.models data. The explicit research boundary remains next to those rows. Architecture has a clearer introduction and direct link, while the figure markup remains exact. Research question and bounded-loop explanation remain in a two-column editorial section. AEGYTHON uses FeaturedStory plus shared scheduleCopy;2027 gets a compact summary. Featured Media remains its original six-item carousel. Speaking uses one approved first-slide preview and concise presentation metadata linked to the full resource, not galleries/videos. CollaborationCTA replaces the old closing panel; the shared footer remains exact and appears once.

The existing editorial sources are inlined once on Home through Astro raw imports, followed by small homepage composition overrides. This avoids a shared CSS extraction change to unrelated pages; there is still one authoritative token/component source. No copy of those token definitions is maintained separately. An early build changed stylesheet packaging on five Speaking detail pages when the thumbnail dependency was removed; reusing PresentationThumbnail restored their exact output. Final output comparison shows only index.html differs.

## Figma comparison boundary

No owner Figma screenshots, URL or repository reference were available in this task. A reference-location question was raised while independent work continued; none was supplied. Therefore direct Figma fidelity is UNVERIFIED. The implemented comparison is against the approved DESIGN001 direction: system serif display, navy/cyan identity, generous spacing, quiet rules, editorial rows and a single collaboration closing. Do not claim pixel matching or owner visual acceptance. Owner must review the actual homepage before Git delivery.

## Before/after actual-homepage screenshots

Before screenshots were captured before editing homepage source, from the verified current production build. After screenshots use the revised actual homepage production output, not prototypes/editorial.

Before directory: .community-drafts/design002/browser-1794535903709/.
After final directory: .community-drafts/design002/browser-1794536414510/.

| View | Before filename | After filename |
| --- | --- | --- |
| Desktop1440 dark | before-1440-dark.png | after-1440-dark.png |
| Desktop1440 light | before-1440-light.png | after-1440-light.png |
| Mobile390 dark | before-390-dark.png | after-390-dark.png |
| Mobile390 light | before-390-light.png | after-390-light.png |

Readable viewport crops are before-hero-1440-dark.png / after-hero-1440-dark.png and before-hero-390-light.png / after-hero-390-light.png in the corresponding directories. Full-page desktop/mobile outputs were visually inspected. These are local ignored QA artifacts, not published screenshots.

## Content inventory

| Original content | Treatment | Evidence boundary |
| --- | --- | --- |
| AeglysAI as large hero heading | Replaced by concise editorial headline; official brand stays in shared header/footer | No organizational claim added |
| Full project name/description, tagline, research theme | Retained in hero and compact research strip | Same canonical project.ts data |
| Intelligent capabilities/control-loop paragraph | Moved to central-question section | Meaning and wording retained |
| Four model cards | Consolidated into four rows | All original model names/descriptions/statuses retained; no data changes |
| Research implementation boundary | Retained verbatim next to progression | Separate repository, unvalidated effectiveness, offline/non-enforcing ModelD, NONE authority and unresolved limitations explicit |
| HeroSVG / architecture diagram | Retained unchanged; surrounding hierarchy updated | No architecture or experimental-result claim altered |
| AEGYTHON /2027 cards | FeaturedStory plus compact future-event row | Shared confirmed schedule and precise ComingSoon qualification retained |
| Six media records | Original carousel retained | Attribution/source/date/title/links unchanged |
| Presentation card/long abstract excerpt | Concise row and existing approved preview | Full abstract/resource remains on the same unchanged linked detail page; completed status/preview/PDF boundary retained |
| Closing panel | Same title/description/destination in CollaborationCTA | Single CTA; original footer unchanged |

Removed only redundant card containers and superseded decorative headings/labels, not research data/evidence. Every distinct original homepage link is retained; Architecture is an additional established internal link. No substantive evidence, source record, publication metadata, full abstract or route was deleted. No APIs, intake/qualification, authentication, data contracts or navigation changes.

## Regression and preservation evidence

- Astro check:218files, zero errors/warnings/hints.
- Production build:28routes, successful.
- Full suite:163/163, zero failures/skips (159 existing plus4 DESIGN002 regressions).
- Browser:28cases at320,375,390,430,768,1024,1440, both themes, JS/noJS; zero console exceptions/missing local assets. All28routes checked. No horizontal overflow; local images decode, one main h1, skip link reaches main, primary focus outline visible, Media End/Home and noJS link focus scrolling work, theme toggle unchanged.
- Sampled editorial text contrast minimum6.89:1. New primary/text actions are at least44px high. Representative component geometry remains stable across local image loading. Reduced motion is emulated; native carousel uses its existing reduced-motion behavior. No autoplay or new iframe/script.
- Exact27non-home HTML routes unchanged. All existing non-home assets unchanged. Header/footer, heroSVG, architecture figure, original Media carousel, script bodies and metadata(head excluding permitted component style changes) are pinned exact.
- Basic credential/privacy pattern scan and diff whitespace check pass. No private assets/source data, tracking/service endpoints or API keys added. Existing publisher thumbnail endpoints remain a pre-existing external dependency; browser interception does not certify publisher availability.

Historical tests originally pin old homepage markup and source bytes. DESIGN002's test-only adapter checks exact current hashes before projecting only two approved files back to their historical values; unknown bytes are rejected. No historical hashes were regenerated. Existing historical assertions remain;4 new tests validate raw current model/status/evidence, all retained links, diagrams/metadata/scripts,27unaffected routes and tamper rejection. The first run had11 expected layout/pin failures; final suite has zero. No skip/disable or gate weakening. The new adapter is never imported by application code.

Logs: .community-drafts/design002/{check-final,build-final,tests-final,browser-reviewed}.log. Baseline-before and final browser geometry/assertion results stay in the evidence directories. Preservation/performance counts are in preservation-performance.json. Canonical diff method: git diff --no-ext-diff --binary HEAD, followed by filename-sorted git diff --no-ext-diff --binary --no-index /dev/null <new-file> output. Review hash is stored in ignored checkpoint.json after this report is finalized, avoiding a self-referential hash.

## Performance, security and remaining risks

HTML before59564bytes/13645gzip; after64141bytes/14718gzip: +4577raw/+1073gzip bytes, primarily opt-in shared CSS. No new JS or fonts. Original preview asset and all scripts are reused; no extra gallery/video library. Local layout stability is verified, not field Core Web Vitals or measured LCP certification. The modest payload increase is disclosed for review, not described as a measured performance improvement.

No direct Figma comparison/owner visual signoff yet. Safari/Firefox, physical-device, manual screen-reader and field performance coverage are unverified. Publisher images/links retain provider-dependent availability. Existing HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast source-map QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN/unaccepted; no dependencies, workflow or security-control changes.

## Proposed scoped delivery

Commit: feat(portal): modernize homepage research storytelling.

PR: feat(portal): apply editorial design to the homepage.

Description: Apply the merged editorial foundations to the actual homepage, with a serif research hero, four model rows, clearer framing for unchanged diagrams, compact community/Speaking highlights and one collaboration CTA. Preserve all model evidence/status boundaries, existing links, Media carousel, navigation/footer and all27other routes. Verified with163tests, clean Astro check,28-route build and28responsive/theme/keyboard/noJS cases. Include owner-reviewed actual-homepage screenshots; direct Figma comparison remains unverified until references are supplied. Cache/Magicast findings remain open.

Stop for owner visual review before staging/committing/pushing/merging/deploying. DESIGN003 remains unstarted and gated on reviewed DESIGN002 merge/deployment.

## Exact changed-file inventory (14 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-016-editorial-foundations.md`
- `docs/design/DESIGN-002-REVIEW.md`
- `docs/specs/SPEC-024-homepage-experience.md`
- `scripts/community/design002-preservation.json`
- `scripts/community/design002-preservation.mjs`
- `scripts/community/design002.test.mjs`
- `scripts/community/homepage.test.mjs`
- `scripts/community/md002.test.mjs`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/design/homepage.browser.mjs`
- `src/pages/index.astro`
- `src/styles/homepage-editorial.css`

## Subsequent owner-authorized preview-port fix

After this homepage review, the owner explicitly requested npm run preview never fall back to4322. Additional local files now include preview-only Astro configuration, the package preview command, its exact historical package pin, a real port-collision regression and local-development documentation. They are separate from the homepage's14-file design scope. The earlier homepage canonical hash remains historical evidence and is not the current combined delivery candidate; re-inventory and review the combined scope before Git delivery. Homepage source/design/output is unchanged by the port fix; production/dev configs and the original4321 process remain preserved. See the latest development-log entry and .community-drafts/preview-port evidence. No delivery authorization is inferred.

## Superseded visual candidate — DESIGN-002A

The owner did not visually approve this candidate. DESIGN002A refines the same homepage on the same branch with full-width local surface bands, asymmetric progression, an approved GICITE portrait feature and blue shared collaboration CTA. See DESIGN-002A-REVIEW.md for current screenshots, content/privacy decisions, validation and combined/incremental inventory. Earlier measurements/hashes remain historical; do not use them as current delivery authorization.
