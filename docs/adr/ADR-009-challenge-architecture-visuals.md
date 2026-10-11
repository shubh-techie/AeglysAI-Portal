# ADR-009 — HACK-VISUAL-001: conceptual challenge SVGs

Date: 2026-10-11. Status: IMPLEMENTED locally for review; not committed or deployed.

Context: the current five challenge tiles were text-only; details already existed at /hackathons/events/#<challenge-id>. The previous EventCard component was unused and tied to retired proposals. Existing conceptual ArchitectureDiagram depicts research implementation/planning, so reusing its actual flow would misrepresent these standalone challenge topics.

Decision: author five small local SVG sources and inline them through a trusted, allowlisted ChallengeDiagram Astro component. Reuse EventCard as the canonical tile, existing challenge IDs/titles, technical icon language, CSS tokens and breakpoints (1100/760px). Theme variables inherit Portal color-scheme; no client script or rendering library. Unique scope prefixes prevent SVG title/arrow ID collisions. No runtime/untrusted SVG ingestion. Same source appears in card and existing detail anchor; no new routes.

HTML retains summaries, difficulty, focus, minimum prototype and conceptual flow; SVG has a title/description, short vector labels and direction arrows. No algorithms, proprietary Model D architecture, measured numbers, sample dashboards/results or actual implementation claimed. Details preserve shared HackathonRules and links. Desktop grid spans six tracks to center the last two of five equal-width cards; tablet two columns/mobile one, reduced-motion removes hover transition.

Alternatives: raster/generated posters rejected by user scope and readability; full portal diagram reuse rejected because it communicates different implementation claims. Inline SVG slightly increases two HTML documents but avoids image requests, layout shifts and new bundles. Changing diagrams requires source review and XML/active-content tests.

Validation: SPEC-018 and visual handover record actual check/build/tests, local screenshots and browser limits. Requested new branch is not created from the combined dirty checkout; current feature branch/work retained and a visual-only review patch prepared. Future authorized separation must account for related finalized challenge data/workflow, not include unrelated sprint changes.
