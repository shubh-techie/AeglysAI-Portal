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
