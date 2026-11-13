# SPEC-024 — Homepage experience modernization

Recorded 2026-10-26 for AEGLYSAI-PORTAL-UX-002.
Status: IMPLEMENTED locally for review; no commit, merge or deployment implied.
Baseline: `6f56ec09a4556143e43d268fed24237cabb20bfd` after PR #28.

Improve hierarchy and responsiveness of the existing homepage without replacing its
research-first identity, approved content, components or data. Reuse ModelCard,
ArchitectureDiagram, MediaCarousel, PresentationCard and existing theme tokens.
Homepage-only inline CSS improves hero type/reading width/CTAs, card rhythm, model
progression, conceptual diagram legibility, media headlines/control targets and closing
panel spacing. No shared stylesheet, component, navigation, dependency or script change.

Add only two content blocks: an explicit research boundary note (Models A–C source is
the separate repository, not independent validation; Model D is planned, non-enforcing,
`enforcement_authority=NONE`, not a production authorization mechanism) and an event/
community discovery section. Link AEGYTHON 2026 to `/hackathons/`, the merged/public
Hackathon 2027 Coming Soon to `/hackathons/2027/`, and existing community to `/community/`.
Do not add event details, registration, awards, affiliations or commercial-readiness claims.

Preserve all existing homepage markup/content after removing exactly the two additions
and one uniquely identified CSS block. Preserve all 27 non-home routes byte-for-byte
against the verified untouched build, including navigation, both hackathons and showcase.
Retain historical fixtures; use a narrow helper for the explicit homepage additions and
independent tests guarding their copy/links/presence. No wholesale snapshot regeneration.

Acceptance: responsive at 320/375/390/430/768/1024/1440px, both themes, no horizontal
page overflow; complete headings/links remain readable, diagram flows sensibly, original
six media articles and approved presentations remain; keyboard/skip-link/carousel and
no-JS reading work; existing Research/Hackathon menus and 2026/2027 regressions pass.
No new animation, asset request, JS initializer, framework or service. Respect existing
reduced-motion controls and semantic landmarks/focus states. Retain fixed/lazy media
sizing conventions and data privacy/approval gates. Security residuals remain open.

Validation: capture baseline and revised screenshots; check/build/full tests, homepage
browser matrix, existing navigation and event harnesses. Actual outcomes, evidence and
limits in [UX-002 review](../ux/UX-002-REVIEW.md). Local checks do not establish successful
hosted CI, physical-device or manual screen-reader certification, or production release.

## DESIGN-002 — Editorial adoption on the actual homepage (2026-11-12)

Status: IMPLEMENTED locally, awaiting visual review; supersedes the earlier UX002 requirement to retain homepage markup unchanged. Verified baseline b8ca5936259515bc5ca91be906f3ea91804c4e3d includes merged DESIGN001/PR44 and successful Pages run43349999623. This is actual src/pages/index.astro adoption, not another prototype.

Reuse EditorialSectionHeader, EditorialContentRow, FeaturedStory and CollaborationCTA. Keep original heroSVG, ArchitectureDiagram, MediaCarousel and approved PresentationThumbnail. Opt-in foundations are inlined from their canonical raw CSS sources plus homepage-only composition overrides, avoiding changes to shared public CSS chunks. Global palette, Layout, navigation, footer, dependencies and configurations remain unchanged.

Retain model data and exact boundary note, research question/control-loop paragraph, scheduleCopy,2027qualification, distinct existing destinations and linked presentation evidence. Replace decorative headings and repeated card containers; compact the presentation excerpt while keeping full content on its unchanged detail route. No public evidence deletion. Full content inventory in ../design/DESIGN-002-REVIEW.md. Direct Figma comparison unverified because references are unavailable; owner approval is required before Git delivery.

Acceptance/results: check218files/zero diagnostics; build28routes;163/163tests;28browser cases across seven widths/both themes/JS-noJS; all27other HTML routes and existing assets unchanged. Pin exact source/homepage transition in test-only DESIGN002 adapter while retaining historical hash assertions; independently test raw current facts, links, diagrams, metadata, tamper rejection and27route preservation. No test gates weakened. HTML gzip grows1073bytes; no new JS/font requests. Real-device/cross-browser/manual-screen-reader/field-performance and provider-image availability remain unverified. Cache/Magicast remain OPEN. No commit/push/merge/deploy; DESIGN003 not started.

## DESIGN-002A — Visible refinement after owner rejection (2026-11-12)

Prior visual candidate was not approved. Keep same branch and foundations. Diagnose uniform inherited background, container-bound transparent sections, old boxed hero composition and transparent closing CTA before editing. Refine actual Home with full-width navy/ivory/blue/muted bands, asymmetric model rows, original diagrams, approved GICITE portrait feature and a full-width blue CollaborationCTA. Two Home-only semantic surface values; no global theme/palette change. Local surface schemes retain deliberate editorial contrast while header/footer honor site theme.

Retain exact model/evidence boundaries, diagrams, metadata, Media/scripts, schedule and existing links. Separate GICITE speaker photograph/courtesy from AEGYTHON discovery; no invented event photo or inference of delivery from imagery. Existing approved crop removes monitor/meeting details; originals/asset hashes unchanged. No new UI component, font, library or script. Owner-started previewPID76010/4321 preserved; rebuild/refresh is required in preview mode.

Observed: check220files/zero diagnostics;165/165tests;28route build;28browser cases with eight full-width surface measurements in both themes/JS-noJS;27otherpages/allassets exact; only index.html changes. Sampled text contrast>=5.15:1. Screenshots and full inventory in ../design/DESIGN-002A-REVIEW.md. Figma references unavailable/direct comparison unverified. Cache/Magicast open; manual/cross-browser/device/field coverage unverified. No Git delivery; visual review mandatory.

## DESIGN-002B — Owner-approved direction, final adjustments (2026-11-12)

Continue same uncommitted branch; verify002A candidate a906472eb2669e8642b7c220625d68309c75209f90560af2c2947b14f414f820 before changes. Enlarge original heroSVG through balanced desktop columns (+42.9% width at1440), maintain aspect/caption/status and fit the hero-only fluid headline. Progression uses four aligned stages desktop,2x2tablet and native labelled horizontal scrolling mobile, with unchanged model names/descriptions/statuses/links and exact evidence/NONE boundary. Architecture width +8.9% at1440 by modest columns/gap only. Remove homepage GICITE feature/import/style; retain every shared image and Speaking/gallery record. Community stays AEGYTHON2026/2027discovery with existing schedule/links, no placeholder or replacementphoto.

Approved question/media/speaking/collaboration markup and footer remain exact;28browser cases verify their geometry/colors/fonts unchanged. No new component/library/font/JS/API/route/workflow/global-theme changes. Check220files zero diagnostics,166/166tests,28route build;27otherpages/allassets exact, only index.html differs. Preserve previewPID76010/4321. Final candidate report/screenshots/inventory: ../design/DESIGN-002B-REVIEW.md. Security/manual/cross-browser/field limitations remain. No Git delivery; owner final visual approval required.

## DESIGN-002C final owner layout supersession — 2026-11-12 (local review)

The latest owner instruction supersedes the DESIGN002B two-column architecture and 2x2 tablet progression. Section01 uses the existing EditorialContentRow components as equal-height, fully bordered cards, with model identifiers/decorative letters, original names/descriptions/statuses/detail links and ModelD double-border research-complete distinction. Headline: “A baseline for every next step.” Retain an Explore the Models link. Use one native horizontal CSS grid track at every width: four columns desktop, readable scrollable cards below1024, no 2x2 layout. Keep the complete research qualification/NONE panel outside the scroller.

Section02 introduction, description and existing architecture link precede the unchanged ArchitectureDiagram across the full container at every breakpoint. No side-by-side layout. Preserve all node/arrow/status/outcome/legend content and non-enforcing disclosures. Other approved sections, original hero illustration, community, Media, Speaking, closing CTA and footer remain unchanged. Navigation/theme fixes from the preceding DESIGN002C remain intact, without additional controller or theme implementations. Review/evidence: ../design/DESIGN-002C-FINAL-REVIEW.md. No Git delivery authorized.

## DESIGN-002C carousel discoverability correction — 2026-11-12 (local review)

Owner rejected the implicit-scroll affordance. Preserve card content/status/borders, ModelD double border and qualification panel. Show one readable card below640, two below1280 and four complete cards from1280 (80rem). Keep a single native horizontal track; no2x2. Tighten internal card gaps without changing typography. Add Home-only progressive Previous/Next controls, live current/range counter, disabled edges, Home/End/Arrow keys and whole-card focus reveal; use existing Media scroll/ResizeObserver/reduced-motion patterns without modifying Media. No autoplay or dependency. Hide controls until JS initializes and when no overflow; noJS retains native scrolling and explicit all-four-model cue. Read actual scroll geometry before each action and after scroll/resize. Preserve top-to-bottom full-width Section02 and all other approved sections.

Validation/evidence/current inventory in ../design/DESIGN-002C-CAROUSEL-REVIEW.md. Site-wide audit is observational; unrelated routes are not redesigned. Historical exact-script test gate now permits only the pinned Home model initializer, while retaining route restrictions and no-network/no-external-script checks. No security control disabled. No Git delivery authorized.
