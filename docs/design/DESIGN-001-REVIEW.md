# DESIGN-001 — Editorial foundations review

Status: IMPLEMENTED locally, awaiting owner review. No staging, commit, push, merge or deployment. DESIGN002/003 have not started.

## Baseline and prerequisite

- Verified root: /Users/shubhprabhat/Documents/Work/AeglysAI-Portal; correct shubh-techie/AeglysAI-Portal remote.
- Main/branch HEAD:69e1bdc7a94efd30ce38526beeef59a13f68c9b5.
- Task branch: feat/AEGLYSAI-PORTAL-DESIGN-001-editorial-foundations.
- PR42 merged at7e1b017179cef2912423ebf90d370a5c913e4b40. Initial Speaking deployment failed; merged CI004 correction is included in current main. [Pages run43347915576](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/43347915576) completed successfully at current baseline. This is verified workflow evidence, not a claim of exhaustive live browser coverage.
- Prior CI004 branch/commit preserved. Worktree was clean before this task; no unrelated untracked files were modified. Original localhost4321/PID58050, Node24.22.1, active worktree and Astro configurations/scripts preserved.

## Design decisions and reusable inventory

Navy/cyan identity, official logo and original theme palette remain authoritative. Editorial headings use an existing-platform serif stack; body and technical metadata use existing sans/mono families. Fluid type/spacing, quiet rules, restrained surfaces and reading measure replace repeated large-card composition in the isolated specimen. No downloaded font, raster mockup, stock photo, framework or runtime dependency.

New semantic aliases in editorial-tokens.css point to existing palette values. Existing global.css is unchanged; editorial.css is opt-in and never imported by public Layout.astro. Four new static patterns: EditorialSectionHeader(composes SectionHeading), EditorialContentRow, FeaturedStory, CollaborationCTA. Existing BrandMark, StatusBadge, ThemeInit and ThemeControls are directly reused. Border rules do not need a divider component. A generic library/page-builder and speculative responsive-media API are deferred.

See [component ownership/props and review commands](EDITORIAL-COMPONENTS.md), [SPEC030](../specs/SPEC-030-editorial-foundations.md) and [proposed ADR016](../adr/ADR-016-editorial-foundations.md).

## Isolated prototype and content inventory

prototypes/editorial has a separate configuration and source tree outside src/pages. Its one-page build writes to ignored .community-drafts/design001/prototype-dist. It is explicitly a noindex/nofollow design specimen, has no new public route/sitemap entry and does not appear automatically at the existing localhost server. The browser harness inspects its static bytes using CDP interception without binding a port or changing that server.

Removed: no public content. Consolidated: no public content; only reusable prototype composition is new. Retained: every original public HTML/asset byte, all Speaking sources/photos/videos, Model D claims, events/registration, publications, profile approval rules and metadata. Prototype Model D text is sourced directly from modelDStatus.ts, retaining experimental/non-enforcing authority and limits. Its reading-sequence visual is explicitly conceptual, not a new architecture/effectiveness assertion. Prototype collaboration uses established public routes, not new contact promises.

## Screenshots / comparison

Evidence directory: .community-drafts/design001/browser-1794535304847/.

| View | Existing public baseline | Isolated editorial specimen |
| --- | --- | --- |
| Desktop1440 dark | baseline-home-1440-dark.png | prototype-1440-dark.png |
| Desktop1440 light | baseline-home-1440-light.png | prototype-1440-light.png |
| Mobile390 dark | baseline-home-390-dark.png | prototype-390-dark.png |
| Mobile390 light | baseline-home-390-light.png | prototype-390-light.png |

These are a design comparison, not a claim that the public homepage has changed. The prototype was visually inspected at desktop/mobile. Other widths/themes/noJS are recorded in results.json. Screenshots remain private ignored QA evidence and are not published in production.

## Validation actually performed

- Isolated prototype build:1 page, successful, separate config/output/cache.
- Astro check:215 files, zero errors/warnings/hints. An early example used unsupported status Planned; corrected to existing Planned Research before final check.
- Production build:28 routes, successful.
- Full existing suite:159/159, zero failures/skips.
- Public preservation:92/92 output files, including all28 HTML routes, byte-identical to verified baseline. No layout, script, stylesheet or SEO changes on public pages; preservation.json records counts, baseline-assets.json pins every output file.
- Browser:28 cases at320/375/390/430/768/1024/1440px, light/dark, JS/noJS. Zero exceptions/missing assets/external requests. No horizontal overflow; official logo images decode; one h1 and noindex metadata present.
- Keyboard skip link reaches main with visible outline; native disclosure opens/closes with Enter in JS/noJS; theme toggle reuses existing behavior. Visible controls have at least44px height. Reduced-motion token zeroes correctly; existing smooth scrolling is disabled for the prototype under reduced motion.
- Sampled text contrast including headings, paragraphs, links, captions, summary and badges: minimum6.40:1 across both themes. This is a computed-style sample, not a full WCAG certification.
- Representative component rectangles unchanged after a100ms settling check. No font downloads or asynchronous visual assets. This is local stability evidence, not a measured production Core Web Vitals result.
- Prototype link targets/anchors resolve to existing built routes/IDs. No new public canonical/social metadata. Existing production metadata bytes are unchanged.
- Privacy/credential pattern scan:zero matches in new/changed files. No private source data/images, service/API credentials, new third-party endpoints or executable content imports. This is not a comprehensive security audit.

Commands: normal npm run check/build/test with existing Node24 and pinned Python validator; separate astro build --config prototypes/editorial/astro.config.mjs; node scripts/design/editorial.browser.mjs. Browser emulates viewports in installed Chromium and closes its own temporary process. Logs are in .community-drafts/design001/{check,build,tests,prototype-build,browser-final}.log. Existing test suite passes unchanged; no preservation pins/test expectations were weakened.

## Performance and accessibility limitations

Prototype HTML9871bytes,3327gzip; combined CSS31039bytes includes unchanged Portal global styles. Existing ThemeInit is the only page script; new components add zero JavaScript. No added font/image download. Production output adds zero bytes. No formal Lighthouse/field performance, Safari/Firefox, physical-device or manual screen-reader assessment was performed. System serif appearance varies by OS. Prototype CSS uses :has only for reduced-motion document scrolling; current target-browser support follows existing Portal conventions.

The token palette is inherited rather than duplicated. Media-query conditions require matching literal48rem/64rem values because native CSS cannot substitute custom properties into them; this limitation is documented. No public migration is implied by this local opt-in implementation.

Security: HTTP cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast embedded source-map QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN; no fixes, suppression or risk acceptance asserted.

## Proposed delivery

Commit: feat(portal): establish reusable editorial design foundations.

PR title: feat(portal): establish reusable editorial design foundations.

PR body: Add opt-in editorial tokens and four small Astro composition patterns, reusing the existing palette, brand, theme controller and status taxonomy. Demonstrate them in a separate noindex review prototype, without altering any public route or adding dependencies/font downloads. Validated with clean Astro check,159 tests,28-route build,28 prototype browser cases and byte-identical92-file public output. Existing cache/Magicast findings remain open. Public adoption and homepage/page redesigns require later approved tasks.

Stop for owner review; do not stage/commit/push/merge/deploy. DESIGN002 waits for DESIGN001 merge and deployment verification. Exact inventory below; canonical binary diff is generated after this report is finalized, with its SHA stored in ignored checkpoint.json to avoid a self-referential hash.

## Exact changed-file inventory (16 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-016-editorial-foundations.md`
- `docs/adr/README.md`
- `docs/design/DESIGN-001-REVIEW.md`
- `docs/design/EDITORIAL-COMPONENTS.md`
- `docs/specs/README.md`
- `docs/specs/SPEC-030-editorial-foundations.md`
- `prototypes/editorial/astro.config.mjs`
- `prototypes/editorial/src/pages/index.astro`
- `scripts/design/editorial.browser.mjs`
- `src/components/editorial/CollaborationCTA.astro`
- `src/components/editorial/EditorialContentRow.astro`
- `src/components/editorial/EditorialSectionHeader.astro`
- `src/components/editorial/FeaturedStory.astro`
- `src/styles/editorial-tokens.css`
- `src/styles/editorial.css`
