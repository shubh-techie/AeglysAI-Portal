# Challenge architecture UI and asset inventory

HACK-VISUAL-001, 2026-10-11. Code-authored flat-vector conceptual architecture, not participant solutions or proven platform behavior. [SPEC-018](../specs/SPEC-018-challenge-architecture-visuals.md), [ADR-009](../adr/ADR-009-challenge-architecture-visuals.md).

| SVG under src/assets/hackathon/ | Focus | Accents |
| --- | --- | --- |
| smart-login-guardian.svg | Login checks and allow/flag decision branches | Blue / teal |
| find-the-anomaly.svg | Synthetic inputs, feature extraction and anomaly result branches | Indigo / violet |
| api-traffic-watch.svg | Request monitoring, spike detection and conceptual output | Cyan / green |
| explain-security-alert.svg | Alert interpretation and safe recommendations | Violet / blue |
| predict-the-outage.svg | Metric signals, pattern analysis and early warning | Orange / blue |

All share 480×320 viewBox, SVG title/description and explicit directional arrows. Five sources total approximately 14.4 KB uncompressed, inlined once each on landing/details; no raster, external asset request, animation or new browser bundle. Icons are generic documentation symbols, not patented architecture. Charts contain no numerical axes/results.

ChallengeDiagram.astro safely imports only these reviewed local files; never pass uploaded SVG or arbitrary URL. Set a unique scope per repeated instance to avoid marker/title ID collisions. Color variables are applied at the figure and follow existing light/dark tokens; the source remains readable with neutral fallback colors. Captions expose the conceptual flow in HTML. EventCard.astro uses canonical challenge ID/title plus hackathonVisuals.ts summary metadata; details stay at existing anchors and share diagrams.

Grid: six desktop tracks with each card spanning two; fourth card starts track two, centering the final pair. At 1100px and below two columns; at 760px and below one. Existing hackathon styles outside this grid retained. Native details links have descriptive hidden titles and focus outlines. Reduced-motion disables card hover transition. No additional responsive framework or JavaScript.

Update procedure: change source SVG and corresponding HTML summary together, verify normal/edge/invalid-input minimums remain consistent with finalized rules and public briefs, then run check/build/tests/XML/link/privacy checks and inspect actual light/dark/mobile screenshots. Screenshots are ignored review artifacts, never illustrative production assets.
