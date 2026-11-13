# ADR-016 — Opt-in editorial foundations

Recorded2026-11-12. Status: proposed, implemented locally for review. No acceptance or deployment is implied.

## Context

The existing Portal has a theme palette and shared components alongside page-specific spacing and heading systems. DESIGN001 must demonstrate a coherent direction without changing public routes or starting DESIGN002/003. Existing Speaking work and historical byte guards must remain intact.

## Decision

Use scoped semantic aliases and four small Astro composition components. Existing global palette, ThemeInit, logo and status taxonomy remain authoritative. Use system serif display typography and the existing sans/mono stacks; no fonts or libraries are downloaded. The prototype lives outside the public src/pages tree and builds through a separate review-only Astro configuration into ignored QA storage. Keep the existing main/development Astro configurations and npm scripts untouched.

## Alternatives and consequences

A global token/font replacement would immediately change every route and invalidate the intended review boundary. A new framework/component library or generic content builder would duplicate established infrastructure. A public prototype route would add a route and metadata surface unnecessarily. A static bitmap mockup would not verify actual Astro composition, keyboard behavior or both themes.

The isolated source/build adds an explicit review command and temporarily retains existing page-specific CSS pending approved adoption. New editorial aliases are scoped; they are not a second independently themed palette. Native media-query literals must track documented breakpoint tokens because CSS variables cannot drive query conditions. System serif rendering varies across platforms. Adopt these foundations into public layouts only during a later approved task, with evidence and preservation decisions reviewed separately.

Validation: full public output byte comparison, normal check/build/test, isolated prototype build and responsive/theme/contrast/keyboard/noJS browser checks. See SPEC030 and docs/design/DESIGN-001-REVIEW.md. Existing security findings stay open.

## DESIGN-002 adoption note — 2026-11-12, local review

Apply the existing patterns only inside the actual homepage's data-editorial wrapper. Inline raw canonical editorial CSS/tokens and homepage composition overrides on this route rather than importing new shared style chunks. Reusing PresentationThumbnail preserves Astro's pre-existing shared extraction behavior; an early removal changed five detail pages' packaging. Final byte comparison changes only index.html. There is no second token source or new component system. Header/footer/global theme remain outside the opt-in wrapper. New CSS payload increases homepage gzip by1073bytes; scripts/fonts unchanged. This is an implementation note pending owner visual review, not blanket approval to migrate other routes. See DESIGN002 review and SPEC024.
