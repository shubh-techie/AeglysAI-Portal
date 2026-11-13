# SPEC-008 — Light/dark theme system

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED: ThemeInit/ThemeControls and semantic tokens introduced in
`52ae928`, merged through `55c0edb`; theme branch reconciliation `247ef9e` merged by
`1ae0493` (PR #10). Current name is AeglysAI; the final original-snapshot sentence
below about outstanding rebrand work is superseded. Theme preference behavior remains
unchanged. Media (`85332d9`) adds its own inline carousel initializer only on Home and
/media/; the theme script remains inline on all HTML routes. It is no longer accurate
to describe the whole site as having only one script per page. No client JavaScript
bundle or new dependency was added. BrandMark uses the same theme selection for PNG
symbols. See SPEC-009 and [current architecture](../../README.md#frontend-architecture-and-content-ownership).

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

## Original task record

Recorded: 2026-10-03. PORTAL-010, local implementation for review.

Revision: renumbered from SPEC-007 to SPEC-008 on 2026-10-03 during merge reconciliation, preserving SPEC-007 for the brand migration. Implementation and validation content unchanged.

## Scope and behavior

IMPLEMENTED locally: a shared light/dark palette, first-visit system preference, saved manual preference and a return-to-system control on all portal pages including hackathons and 404. No research text/status, photographs, production origin, SEO identity, history or deployment mechanism changes. No UI framework, external service or dependency added.

`src/styles/global.css` centralizes semantic component colors with `light-dark()`. The root color-scheme selects the palette, including diagrams and status badges. Modern browsers supporting CSS `light-dark()` are required. With JavaScript disabled, CSS follows the system preference and interactive controls remain hidden.

`src/components/ThemeInit.astro` runs inline in the head before styles/body. It reads only valid light/dark choices from `aeglysai-theme` in localStorage, falls back to matchMedia, updates the root and theme-color, and handles system/storage changes. Storage failure does not prevent local switching; persistence is unavailable in that case. System mode removes the stored choice.

## Acceptance criteria

- Initial preference applies before stylesheet/body rendering; no network request for initialization.
- Saved choice survives reload and navigation; system changes apply only in system mode.
- Native buttons work by keyboard, have visible focus, 44px targets and state-dependent accessible names. System selection has a checkmark and aria-pressed state; changes are announced in a live region.
- Header, cards, diagrams, badges, code, tables, links, buttons, creator section, footer and 404 remain readable without horizontal overflow at desktop/mobile widths.
- Canonical/social metadata, route paths and research meaning remain unchanged.
- Node 24 npm ci, check, build and tests pass; git diff --check passes.

## Validation and limitations

Local Astro check/build and twelve output tests passed. Chrome covered 88 combinations: eleven routes (including missing-route 404), both themes and 1440/768/390/320px widths. Keyboard/focus, saved reload, system changes/reset, invalid storage and blocked storage passed. Desktop/mobile screenshots reviewed. Eleven representative text pairs per theme exceed 4.5:1 contrast; minimum sampled ratio 4.93:1. This is a bounded review, not full WCAG certification or cross-browser testing.

Evidence: theme components, Header/Layout, shared CSS and `scripts/site.test.mjs`; [development log](../DEVELOPMENT_LOG.md). No architectural change requiring an ADR. No commit, remote CI or deployment claimed. This branch still has existing AegisAI labels; rebranding remains outside this task.

## DESIGN-002C — Mobile control accessibility validation (2026-11-12)

No theme implementation or palette change. The original ThemeInit/ThemeControls behavior, storage key and system/storage listeners remain unchanged. Navigation temporarily moves the original control group into its modal, then restores it, because modal inertness blocked the header toggle while the drawer was open. Current native system-reset action still delegates to the original reset control. No duplicated controls/listeners or second theme state.

Verified Day/Night header/menu/footer/Media control contrast, theme switching with menu open, preference persistence after reload, system reset and subsequent OS preference changes. White Speaking photo overlay and four click-only privacy-enhanced video players work in both themes. Editorial Home surface islands intentionally remain fixed; approved styling/content is unchanged. Details/evidence in ../design/DESIGN-002C-REVIEW.md; this is local validation, not a new deployment or cross-browser/manual-screen-reader certification.
