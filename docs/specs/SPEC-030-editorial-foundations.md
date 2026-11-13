# SPEC-030 — Editorial design foundations (DESIGN-001)

Recorded 2026-11-12. Status: IMPLEMENTED locally, pending owner review; not committed, merged or deployed. DESIGN-002 and DESIGN-003 remain PLANNED and gated on preceding merge/deployment verification.

## Scope and prerequisite evidence

Baseline origin/main69e1bdc7a94efd30ce38526beeef59a13f68c9b5. PR42 merged at7e1b017; its initial deployment failed on fixture-directory setup. The CI004 correction subsequently merged; Pages run43347915576 completed successfully at the baseline. This task does not change Speaking or its assets. Preserve Node24.22.1, localhost4321/PID58050, Astro development configuration, worktree and unrelated files.

## Audit and reuse

Existing global.css owns the Portal palette, body font, color-scheme and status colors. Layout.astro owns public metadata/navigation/footer. SectionHeading, Hero, StatusBadge, ThemeInit/ThemeControls and BrandMark already exist. Home, Speaking and hackathon styles each repeat display sizing, section spacing and section-heading structures; Media/Video carousels already share native scrolling principles. Do not migrate those implementations speculatively.

Add opt-in semantic aliases of existing palette values, plus fluid typography, spacing, measures, borders, focus and motion tokens. Central source: src/styles/editorial-tokens.css. Reuse original colors rather than declaring a parallel light/dark palette. Existing public typography and token definitions remain unchanged. Georgia/Times New Roman is a system display stack; sans body and monospace metadata inherit existing fonts. No external font download or new dependency. Platform glyph differences are expected.

Four component patterns are justified by the following two tasks: EditorialSectionHeader (composes SectionHeading), EditorialContentRow, FeaturedStory (named visual/status slots), CollaborationCTA. Reuse StatusBadge directly. Dividers are CSS borders; no trivial divider wrapper, duplicate status taxonomy, generic page-builder or speculative media API. Components require an ancestor with data-editorial and editorial.css imported after existing global.css. They introduce no script; only the existing theme controller runs in the review prototype.

## Prototype isolation

prototypes/editorial/src/pages/index.astro is outside src/pages. Its separate build configuration writes only .community-drafts/design001/prototype-dist. Normal production build and dev scripts/configuration are untouched. It is a one-page noindex/nofollow design specimen, not a new public homepage. Existing official logo assets and approved status labels are reused. Model D summary/limitations/authority come directly from modelDStatus.ts. The reading-sequence graphic is HTML explicitly labelled conceptual; no architecture/performance claim is introduced. No third-party imagery, synthetic conference photographs or private QA assets.

## Acceptance

- Semantic tokens centralized and documented; theme inheritance retained.
- Components statically composed in Astro with valid headings/landmarks.
- Fluid heading scale and body measure; metadata uses monospace sparingly.
- Seven widths320/375/390/430/768/1024/1440, two themes, JS/noJS pass.
- Prototype has working links, skip link, native disclosure and theme controls, visible focus, reduced-motion behavior and readable contrast. No modal/carousel added.
- All existing28 public routes and asset bytes match baseline. No content removal or status changes.
- check/build/test and browser evidence recorded in DESIGN-001-REVIEW.md.

CSS custom properties cannot be used as native media-query conditions. Documented48rem/64rem breakpoint values have matching annotated query literals in editorial.css; changing them requires updating both. No claim of arbitrary breakpoint runtime configuration.

## Validation and boundaries

See ../design/DESIGN-001-REVIEW.md and ADR016. Baseline and current asset hashes are private QA evidence in .community-drafts/design001. Contrast/geometry are automated Chromium evidence, not a WCAG certification or real-user screen-reader review. Safari/Firefox/physical-device/manual screen-reader coverage remains unverified. Existing cache and Magicast findings remain OPEN. Stop before staging/commit/push/merge/deploy.
