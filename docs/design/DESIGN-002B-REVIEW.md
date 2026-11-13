# DESIGN-002B — Final limited homepage refinements

Status: IMPLEMENTED locally, awaiting owner approval of this final candidate. DESIGN002A's direction is approved subject to these changes; that is not Git delivery authorization. No staging, commit, push, merge or deployment.

## Verified baseline and branch

Same branch feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial at b8ca5936259515bc5ca91be906f3ea91804c4e3d. Latest fetched origin/main matches. Correct repository and remote. Previous combined candidate a906472eb2669e8642b7c220625d68309c75209f90560af2c2947b14f414f820 was recomputed and matched before editing; all20pending files copied into ignored before-working. The separate strict preview correction remains intact.

Owner-started Astro preview PID76010 still serves localhost4321. Node installation, worktree, URL, process and configuration unchanged. After final build, actual GET4321 returns200 and matches final dist bytes. Preview requires a browser refresh; source hot reload is not claimed. No new branch.

## Limited visual changes

### Hero

Reuse the exact SVG, labels, viewBox, captions and factual status. Desktop columns change from1.55/.7 to1.25/1 with center alignment. Larger illustration retains420:330 aspect ratio and all elements. Hero-only fluid display fitting is capped by the existing display token; the existing serif family/palette is unchanged. A desktop phrase wrapper keeps with boundaries together rather than leaving with on an isolated line. Other approved headings/type rules unchanged.

| Viewport | Illustration before | Final | Change |
| --- | --- | --- | --- |
|1440|363.38px|519.11px|+42.9%|
|1024|278.16px|397.36px|+42.9%|
|768|512px|576px|+12.5%|
|390|354px|354px|Already fills available mobile width|

### Research progression

Keep the existing EditorialContentRow composition and unchanged model data. Four aligned stages at desktop>=1024; two-by-two at640–1023; native horizontal scroll below640. No four narrow columns on phones. Every stage retains identifier, name, full existing concise description, actual status and original Research link. Decorative arrows are inside the existing aria-hidden identifier; no maturity score or deployment implication.

At1440 all four stages are283px wide and418.16px high; at1024 about214.52px wide and460.38px high. At768 two columns are about335.27px wide; each row aligns. At390 the native scroll stages are288px wide, rather than narrow two-column text. The focusable region and descriptive mobile hint expose all four links; keyboard focus scrolls the final ModelD link into view in JS/noJS. No client script or carousel dependency. The complete evidence note, non-enforcing/offline status, enforcement_authority=NONE and unresolved limitations remain verbatim below the progression.

### Architecture

Modest desktop column/gap adjustment:0.65/1.35 becomes0.55/1.45, gap48→32px. Exact figure markup, technical vocabulary, status relationships and mobile stacking preserved. At1440 figure width788.41→858.41px (+8.9%); at1024 603.52→659.81px (+9.3%). At390 width stays354px. No scientific diagram redesign.

### Community

Removed only the homepage GICITE portrait and large feature, its unused import and unused Home-only styling. No replacement photograph or blank media slot. Community now has only the existing AEGYTHON2026 program/schedule/link and the qualified2027ComingSoon row, with the existing Community link. Removed obsolete feature spacing so the remaining editorial layout is clean.

The GICITE asset, approval metadata, all original photos and Speaking galleries remain untouched. Its asset hash is still asserted. All existing output files remain present, including the image; no source/shared media deleted.

## Approved sections preserved

Central Question, Media Coverage, Speaking & Presentations and blue CollaborationCTA remain exact HTML matches to the owner-approved002A build, protected by independent hashes. Shared footer/header, metadata and script invariants also match. At all28browser cases, the five protected sections/footer retain measured width, height, background, text color and heading font exactly. Absolute vertical positions naturally move when earlier sections change height; design/content does not.

No changes to their typography, palette, CTA/footer separation or blue-to-navy transition. No new patterns/components, dependency, font, framework, route, API/authentication/data contract, registration or Pages workflow. Model source data and theme controls unchanged. Reuse existing EditorialSectionHeader/EditorialContentRow/CollaborationCTA, ArchitectureDiagram, MediaCarousel and PresentationThumbnail; FeaturedStory is no longer needed on Home after the requested feature removal.

## Previous/final actual-homepage evidence

Before directory: .community-drafts/design002b/browser-1794539539127/.
Final directory: .community-drafts/design002b/browser-1794539983032/.

| View | Before | Final |
| --- | --- | --- |
|1440 dark full page|before-1440-dark.png|after-1440-dark.png|
|390 light full page|before-390-light.png|after-390-light.png|
|1440 dark hero viewport|before-hero-1440-dark.png|after-hero-1440-dark.png|
|390 light hero viewport|before-hero-390-light.png|after-hero-390-light.png|

Both themes' full-page desktop/mobile pairs exist. Final directory also contains paired before-research/after-research, before-architecture/after-architecture and before-community/after-community screenshots at1440-dark and390-light. after-research-last-390-light.png proves ModelD remains available in the mobile scroll region. These region pairs were rendered from the corresponding archived/final builds, not synthetic mockups or a new prototype. Hero/progression/architecture screenshots were visually inspected. measurements.json contains sizes; results.json records all viewport/theme/JS-noJS cases and protected-section geometry.

Direct Figma comparison remains unverified; the prior missing-reference limitation remains. This task follows the owner's approved002A direction and explicit final adjustments rather than claiming new reference fidelity.

## Final validation

- Astro check220files:zero errors/warnings/hints.
- Production build28routes:success.
- Full suite166/166:zero failures/skips.
- Browser28cases at320/375/390/430/768/1024/1440, both themes, JS/noJS; all28routes, zero exceptions/missing local assets.
- Desktop four aligned stages; tablet two rows/two columns; mobile horizontal overflow stays inside the labelled progression, with all four links reachable. No page-level horizontal overflow.
- Existing skip/focus/theme/Media keyboard/noJS checks and local image decoding/stability pass. Protected section geometry/fonts/colors match before across all28cases. Sampled editorial contrast remains>=5.15:1.
- Exact27non-home HTML routes unchanged.92output files before/after; only index.html differs. Existing assets, including conference photos, remain byte-identical. Speaking video/gallery functionality has no changed source/output.
- Raw-output regressions verify exact protected section markup, community photo absence, retained hackathon links, original photo availability/approval hash, model facts/evidence and tamper rejection. Only the current approved homepage/source pins were updated; historical before bytes/hashes/assertions remain. No tests/security controls disabled.
- Privacy/credential pattern scan:zero hits. git diff --check clean. No private data or unapproved assets introduced.

Logs/evidence under .community-drafts/design002b: check-final.log, build-final.log, tests-final.log, browser-before.log, browser-final.log, measurements.json, preservation.json, localhost.json and snapshots. Browser processes are temporary and closed; original preview was not restarted.

## Performance and remaining limitations

Homepage HTML68071→67894bytes; gzip15473→15472bytes compared with002A. No new script/font/asset requests; removing the homepage photo avoids its191KB lazy download there while retaining the shared asset. Larger SVG uses the same inline vector. Layout measurements are local evidence, not field Core Web Vitals certification.

Mobile native scrolling is tested through Chromium emulation/focus; physical devices, Safari/Firefox, manual screen readers and field performance remain unverified. Publisher media availability and video provider restrictions are unchanged. HTTP cache QA-H01 and Magicast QA-H02 remain OPEN and unaccepted. No claim that local checks establish hosted CI or deployment.

## Delivery boundary

Stop for owner approval of this candidate. Do not stage/commit/push/merge/deploy. Combined pending scope includes earlier DESIGN002/A and separately authorized preview fix; this refinement is separately inventoried below. Proposed scoped delivery remains feat(portal): modernize homepage research storytelling after review. DESIGN003 not started.

Canonical combined diff: git diff --no-ext-diff --binary HEAD, then filename-sorted new-file no-index binary diffs. Incremental refinement compares saved before-working bytes. Both patches/hashes are stored in ignored checkpoint.json after this report and inventories are finalized to avoid a self-referential hash.

## Exact DESIGN002B incremental inventory (9 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/design/DESIGN-002A-REVIEW.md`
- `docs/design/DESIGN-002B-REVIEW.md`
- `docs/specs/SPEC-024-homepage-experience.md`
- `scripts/community/design002-preservation.json`
- `scripts/community/design002.test.mjs`
- `scripts/design/homepage.browser.mjs`
- `src/pages/index.astro`
- `src/styles/homepage-editorial.css`

## Exact combined pending inventory (21 files)

- `astro.preview.config.mjs`
- `docs/DEVELOPMENT_LOG.md`
- `docs/LOCAL_DEVELOPMENT.md`
- `docs/adr/ADR-016-editorial-foundations.md`
- `docs/design/DESIGN-002-REVIEW.md`
- `docs/design/DESIGN-002A-REVIEW.md`
- `docs/design/DESIGN-002B-REVIEW.md`
- `docs/specs/SPEC-024-homepage-experience.md`
- `package.json`
- `scripts/community/design002-preservation.json`
- `scripts/community/design002-preservation.mjs`
- `scripts/community/design002.test.mjs`
- `scripts/community/homepage.test.mjs`
- `scripts/community/md002.test.mjs`
- `scripts/community/preview-port.test.mjs`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-discovery-preservation.json`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/design/homepage.browser.mjs`
- `src/pages/index.astro`
- `src/styles/homepage-editorial.css`

## Section 02 final owner correction — supersedes architecture proportions above

Owner prefers the earlier Section02 two-column editorial composition. One scoped desktop CSS rule now restores32.5%text/67.5%diagram with48px gap (previous candidate27.5%/72.5%,32pxgap). At1440 the text column is379.59px and the figure788.41px; at1024 the figure603.52px. The heading now reads in balanced phrases instead of a narrow one-word stack. The diagram fills its right column; text/font size, nodes, labels, arrows, legend, captions/statuses and accessibility information are unchanged and not scaled down. Below1024 the existing full-width stacked layout remains; mobile390 figure354px.

Only one application CSS rule changes. The exact current homepage output hash is updated for the historical guard; source-page hash is unchanged. Ignoring that single inline Home style block, the entire generated document is byte-identical to the previous DESIGN002B candidate. Hero illustration, horizontal progression, Question, simplified Community, Media, Speaking, blue CTA and footer remain unchanged. All27otherpages and all existing assets stay byte-identical;92outputs remain, only index.html differs.

Evidence directory: .community-drafts/design002b-section02/browser-1794540845486/. Compare before-architecture-1440-dark.png with after-architecture-1440-dark.png; mobile before/after-architecture-390-light.png show unchanged correct stacking. Full-page desktop/mobile pairs and both themes are also captured. Before/after measurements and checks are from real archived/final homepage builds, not prototypes. Final screenshot visually inspected.

Validation: Astro check220files/zero diagnostics;28-route build;166/166tests;28responsive/theme/JS-noJS cases;28additional diagram clipping checks. Figure scroll width, nodes, legend, outcomes and caption fit at320/375/390/430/768/1024/1440 in both themes and noJS. No horizontal clipping/page overflow. Previous protected section geometry/fonts/colors remain exact. Logs/checks under .community-drafts/design002b-section02, including clipping.json and preservation.json. Localhost4321/PID76010 retained. Existing cache/Magicast findings and cross-browser/physical-device/manual-screen-reader/field-performance limitations remain unresolved.

Exact incremental correction inventory:

- src/styles/homepage-editorial.css — single desktop grid/gap rule.
- scripts/community/design002-preservation.json — updated current homepage hash only.
- docs/design/DESIGN-002B-REVIEW.md — this review correction.
- docs/DEVELOPMENT_LOG.md — validation record.

Combined pending inventory remains the21paths listed above. Earlier candidate4726201d990f7c2ab4542d5364f18f740733cd62543b055428bed796008fd7a6 is superseded; new canonical hash/patch is recorded in ignored .community-drafts/design002b-section02/checkpoint.json after this addendum is finalized. Stop for owner Section02 review; no staging/commit/push/merge/deploy or additional design work.

## DESIGN-002C — Final navigation/theme validation

Approved homepage content/composition and the Section02 correction remain untouched. C fixes shared navigation focus timing, in-modal access to the original theme controls and cached-history cleanup. All28generated headers intentionally change; all outside-header bytes and existing assets remain exact relative to the approved pre-C candidate. See DESIGN-002C-REVIEW.md for actual defect traces, complete308activation inventory,169test result, screenshots and current candidate scope. Earlier B/Section02 hashes are historical; owner must approve the final C candidate before Git delivery.
