# DESIGN-002A — Visible homepage refinement

Status: IMPLEMENTED locally, awaiting owner visual review. Prior DESIGN002 was not visually approved. No staging, commit, push, merge or deployment. Same DESIGN002 branch; no new branch or feature expansion.

## Baseline, scope and preservation

HEAD/main b8ca5936259515bc5ca91be906f3ea91804c4e3d; branch feat/AEGLYSAI-PORTAL-DESIGN-002-homepage-editorial. Correct repository/remote verified. Previous DESIGN002 candidate25297a5781e9d46292e8d3596ab92f09d31ad26c9b3fc028b888a256487311f8 remains historical evidence, not current approval. The separately owner-authorized strict preview fix is also uncommitted and preserved unchanged during this refinement. All19pending files at start were copied to ignored before-working for incremental comparison; the new report makes20combined files.

The owner has switched from source dev to Astro preview on4321 since the previous review. Observed PID76010 serves exactly the current dist/index.html bytes before and after. That process, Node installation, worktree, URL/port and configurations were preserved. Source changes in preview mode require build and browser refresh; no hot-reload claim is made. Actual GET4321 after build returns200, eight section bands and the approved GICITE image, matching final dist bytes.

## Diagnosis recorded before visual edits

Phase1 evidence was written to .community-drafts/design002a/DIAGNOSIS.md before editing the homepage. Actual pre-refinement bytes were archived and captured in Chromium first.

1. The editorial wrapper inherited a single global --bg. Every section remained transparent against the same navy field in dark mode.
2. ed-section and ed-container were on the same element, so surfaces were constrained to content width instead of full-width bands. Thin rules carried almost all section differentiation.
3. Hero retained copy-left/boxed-diagram-right silhouette; changing type alone left a familiar composition.
4. The model grid really had become rows, but low-contrast treatments and otherwise uniform palette made that structural change quiet.
5. Community remained text plus a schedule box, visually another card. No approved AEGYTHON documentary photo was identified; conference photos must not be relabelled as hackathon evidence.
6. CollaborationCTA was transparent inside an ed-container with only a top rule, lacking a distinct closing surface.
7. Global selectors were not blocking the new heading scale. Theme inheritance and missing local surfaces were the principal problem, not a missing stylesheet/font.

## Specific visual corrections

- Full-width navy hero; larger fluid headline and borderless research visual, with the unchanged SVG integrated into the composition.
- Warm ivory research band. Introduction and exact evidence boundary sit beside four genuine horizontal progression rows; no hidden card grid remains.
- Dark blue architecture band, asymmetric introduction and the untouched technical figure. Existing mobile diagram stacking retained.
- Muted light question band and ivory community band create a visible rhythm instead of one uninterrupted field.
- Image-led community feature reuses a real, already approved GICITE portrait crop. Clear GICITE label and courtesy; AEGYTHON's original program/schedule/links are a separate compact editorial row, followed by the qualified2027summary.
- White Media band retains the original six-item carousel. Navy Speaking band retains the approved first-slide preview and resource link, without duplicating galleries/videos.
- Full-width strong blue collaboration band uses the unchanged shared CollaborationCTA. The original shared footer is separate, exact and appears once.

Only two additional semantic values are necessary: warm ivory#f4f0e7 and collaboration blue#123e61, scoped in the existing Home composition layer. Architecture uses the existing closing-start palette value. Other colors/type/spacing/focus remain DESIGN001 tokens. Local color-scheme islands intentionally keep hero/architecture/closing dark and editorial sections light in both site themes; header/footer/theme preference remain unchanged. No global palette or theme-script edits.

Reused components: EditorialSectionHeader, EditorialContentRow, FeaturedStory, CollaborationCTA, ArchitectureDiagram, MediaCarousel, PresentationThumbnail; shared Layout/Header/Footer untouched. No new UI component, design system, font, animation framework or dependency.

## Approved image and privacy boundary

src/assets/speaking/conferences/gicite-desktop-photo.webp,191082bytes, SHA2565e6c2d6da3e7f91c5e71238cfca876c9f2ba55a6f96d26ec18f0ea1cc45fcdcc. SPEAK001B-IMAGES lists it INCLUDED, mapped to gicite-2026-wru-key-talk, with existing portrait crop2850/250/1327/1300 and Courtesy of Shubh Prabhat. Crop excludes monitors/meeting details. Original and crop bytes unchanged; the image is reused, not generated or recropped. Caption identifies a speaker photograph; delivery/endorsement is not inferred. Historical SPEAK001B status notes remain unchanged; current engagement status is maintained independently by existing Speaking data.

No AEGYTHON photo or institution logo was invented. All source conference folders/galleries and current event statuses remain unchanged. New photo renders lazily with intrinsic dimensions; existing WebP is reused so every output asset is preserved byte-for-byte. An initial Image optimization experiment removed an unused old emitted URL; serving the existing optimized WebP as-is eliminated that packaging change. Final changed output is only index.html.

## Actual rendered before/after evidence

Before directory: .community-drafts/design002a/browser-1794537659396/.
After final directory: .community-drafts/design002a/browser-1794538259337/.

| View | Before | After |
| --- | --- | --- |
| Desktop1440 dark | before-1440-dark.png | after-1440-dark.png |
| Desktop1440 light | before-1440-light.png | after-1440-light.png |
| Mobile390 dark | before-390-dark.png | after-390-dark.png |
| Mobile390 light | before-390-light.png | after-390-light.png |

Viewport crops: before-hero-1440-dark.png / after-hero-1440-dark.png and before-hero-390-light.png / after-hero-390-light.png. Readable final section crops: after-research-1440-dark.png, after-community-1440-dark.png, after-collaboration-1440-dark.png and corresponding390-light files. Before reflects the rejected DESIGN002 working state, not a substitute prototype. Actual4321 before/after response bytes match their corresponding builds. Desktop/mobile full-page outputs were visually inspected.

No identifiable owner Figma screenshot/URL was found in available repository review assets and none was supplied in response to the prior reference question. Direct Figma validation remains UNVERIFIED. Screenshots demonstrate concrete section/background/layout differences, but owner visual approval is still required.

## Content retained

All model names/descriptions/statuses and the exact research boundary note remain. ModelD stays offline, experimental/non-enforcing, enforcement_authority=NONE; unresolved limits remain explicit. HeroSVG/architecture markup, metadata, header/footer, Media markup/scripts, existing distinct links, scheduleCopy,2027qualification and full linked presentation evidence remain. The image-led GICITE introduction adds neutral discovery copy, not a new talk title, delivery assertion or institutional affiliation. AEGYTHON copy moved into a compact row; none of its facts or destinations were removed. No route, API/data contract, authentication, registration, profile-publication gate, workflow or security-control change.

## Validation

- Astro check220files, zero errors/warnings/hints.
- Production build28routes, successful.
- Full suite165/165, zero failures/skips, including approved portrait provenance/hash regression and existing strict-preview-port behavioral test.
- Browser28cases at320/375/390/430/768/1024/1440, both themes and JS/noJS; all28routes. Zero console exceptions/missing local assets, no horizontal overflow.
- All8surface bands start atx0 and span available document width (excluding native scrollbar); exact computed backgrounds recorded per case. Hero#080f1c; research/community#f4f0e7; architecture#132739; question#eef2f6; media#ffffff; speaking#080f1c; collaboration#123e61.
- Sampled new editorial text contrast minimum5.15:1, above4.5:1 normal-text threshold. Focus,44px primary/text actions, skip-to-main, reduced-motion Media navigation, local image decoding, geometry stability across image loading and NoJS access pass. No new JS/iframe/autoplay.
- All27non-home HTML routes and every existing output asset unchanged.92files before/after; only index.html differs. Technical diagram, navigation/footer, metadata and script invariants remain pinned exact.
- Historical adapter updates only the exact approved current source/output hashes for the new homepage; historical before bytes/hashes remain intact. Independent raw-output tests guard actual current model/evidence/link/diagram/metadata/photo behavior. No skipped or weakened gates.
- Privacy/credential pattern scan and git diff --check pass. No new private source data, credentials or unapproved assets. Basic scanning is not a complete security audit.

Evidence: .community-drafts/design002a/{check-final,build-final,tests-final,browser-final}.log, preservation.json, localhost.json, before-working and screenshots/results.json. Chrome is temporary and closed after checks. No server was replaced. The first added width assertion included the scrollbar; corrected the test to compare with available document width, not a layout workaround.

## Performance and limitations

Refinement HTML64141→68071bytes; gzip14718→15473bytes (+755gzip). No added script/font. Reused191KB WebP adds one lazy first-view request when community comes into view; the asset already exists in output and may be cached from Speaking. No newly generated asset. Layout checks are local geometry evidence, not field LCP/CLS certification. Publisher Media images remain existing provider-dependent requests; automated screenshots exercise the unchanged branded fallback rather than certify publisher uptime.

Figma comparison/owner visual signoff, Safari/Firefox, physical devices, manual screen readers and field performance remain unverified. Cache QA-H01/GHSA-ch52-4w7c-c8xp and Magicast QA-H02/GHSA-68fv-2mgg-jv7q remain OPEN; no resolution or risk acceptance asserted.

## Review boundary

Stop for owner visual review. No stage/commit/push/merge/deploy. Existing DESIGN002 branch and separately authorized preview fix are preserved. Proposed final homepage commit remains feat(portal): modernize homepage research storytelling, with scope/security/evidence re-reviewed before delivery. Do not treat earlier candidate hashes as authorization for this refined combined scope.

Canonical combined diff is git diff --no-ext-diff --binary HEAD plus filename-sorted new-file no-index binary diffs. Incremental refinement compares before-working bytes with current paths. Ignored checkpoint.json records both hashes after this report/inventories are finalized, avoiding a self-referential hash. The combined inventory includes prior DESIGN002 and preview fix; incremental inventory identifies this refinement alone.

## Exact refinement inventory (9 files)

- `docs/DEVELOPMENT_LOG.md`
- `docs/design/DESIGN-002-REVIEW.md`
- `docs/design/DESIGN-002A-REVIEW.md`
- `docs/specs/SPEC-024-homepage-experience.md`
- `scripts/community/design002-preservation.json`
- `scripts/community/design002.test.mjs`
- `scripts/design/homepage.browser.mjs`
- `src/pages/index.astro`
- `src/styles/homepage-editorial.css`

## Combined pending inventory (20 files)

- `astro.preview.config.mjs`
- `docs/DEVELOPMENT_LOG.md`
- `docs/LOCAL_DEVELOPMENT.md`
- `docs/adr/ADR-016-editorial-foundations.md`
- `docs/design/DESIGN-002-REVIEW.md`
- `docs/design/DESIGN-002A-REVIEW.md`
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

## Owner direction approval and DESIGN-002B follow-up

Owner approved the002A direction subject to limited final adjustments: enlarge hero/architecture visuals, make progression horizontal and remove the homepage GICITE feature. Those changes are recorded in DESIGN-002B-REVIEW.md; other approved sections retain exact markup and measured design. This does not authorize Git delivery. Earlier002A hashes/screenshots remain historical comparison evidence; final candidate awaits owner approval.
