# Challenge architecture UI and asset inventory

HACK-VISUAL-001, 2026-10-11. Code-authored flat-vector conceptual architecture, not participant solutions or proven platform behavior. [SPEC-018](../specs/SPEC-018-challenge-architecture-visuals.md), [ADR-009](../adr/ADR-009-challenge-architecture-visuals.md).

| SVG under src/assets/hackathon/ | Focus | Accents |
| --- | --- | --- |
| smart-login-guardian.svg | Login checks and allow/flag decision branches | Blue / teal |
| find-the-anomaly.svg | Synthetic inputs, feature extraction and anomaly result branches | Indigo / violet |
| api-traffic-watch.svg | Request monitoring, spike detection and conceptual output | Cyan / green |
| explain-security-alert.svg | Alert interpretation and safe recommendations | Violet / blue |
| predict-the-outage.svg | Metric signals, pattern analysis and early warning | Orange / blue |
| ai-for-everyday-life.svg | Everyday problem, safe input, intelligent processing and useful output | Teal / blue |

All share 480×320 viewBox, SVG title/description and explicit directional arrows. Six local vector sources total 17,350 bytes uncompressed, inlined once each on landing/details; no raster, external asset request, animation or new browser bundle. Icons are generic documentation symbols, not patented architecture. Charts contain no numerical axes/results.

ChallengeDiagram.astro safely imports only these reviewed local files; never pass uploaded SVG or arbitrary URL. Set a unique scope per repeated instance to avoid marker/title ID collisions. Color variables are applied at the figure and follow existing light/dark tokens; the source remains readable with neutral fallback colors. Captions expose the conceptual flow in HTML. EventCard.astro uses canonical Portal challenge ID/title plus hackathonVisuals.ts summary metadata; details stay at existing anchors and share diagrams.

Grid: three equal desktop columns, two rows of three cards. At 1100px and below two columns; at 760px and below one. Existing hackathon styles outside this grid retained. Native details links have descriptive hidden titles and focus outlines. Reduced-motion disables card hover transition. No additional responsive framework or JavaScript.

Update procedure: change source SVG and corresponding HTML summary together, verify normal/edge/invalid-input minimums remain consistent with finalized rules and public briefs, then run check/build/tests/XML/link/privacy checks and inspect actual light/dark/mobile screenshots. Screenshots are ignored review artifacts, never illustrative production assets.

HACK-CHALLENGE-006 adds beginner-to-intermediate open innovation; source provenance is Portal extension, not an upstream sixth track. Previous five-asset byte totals and centered 3+2 layout were the HACK-VISUAL-001 snapshot.

HACK-PORTAL-OPS-001: six code-authored challenge SVGs unchanged. Certificate preview is an original HTML/CSS hackathon-themed sample, not a generated photograph or issued artifact. The organizer’s follow-up authorizes creating an original design instead of waiting for Certificate_example.png. Existing approved brand icon reused; all personal/issuance fields remain placeholders.

Certificate reference refinement: inspected the user-supplied PNG and adapted its dark/cyan frame, serif title, recipient box and AI/ML/Cybersecurity badges as accessible responsive HTML/CSS. Existing local AeglysAI icon and shared TechnicalIcon component reused; no raw reference asset or personal elements published.

## AEGLYSAI-HACK-DESIGN-002 — 2026-10-14

Landing-only `EventHero.astro` consumes the existing approved `brand/icons/icon-mark.png`
with reserved 44×48 dimensions; it is not a new logo. The conceptual network SVG remains
code-authored; a new decorative inline cup in `/hackathons/` emphasizes the proposed award.
All six architecture SVG source files and the shared ChallengeDiagram remain unchanged.
No generated image, stock portrait, poster, new font or external asset request introduced.
New landing presentation lives in `src/styles/hackathon-landing.css`; the prior shared
stylesheet continues to serve Sponsors. Screenshot evidence is local and ignored under
`.community-drafts/design-002/screenshots/`, with baseline built from unchanged `4fc596d`.

## DESIGN-004 — Interaction inventory, 2026-10-14

No new visual asset. The existing exclusive landing stylesheet and raw-imported
`landing-motion.js` provide hero lighting/grid depth, existing-word stagger/gradient accents,
six pointer-highlight/tilt cards, one-time section/divider/number reveals, reading-attention
journey/timeline lines, decorative rubric bars, trophy/sample elevation and CTA/navigation
feedback. Original SVGs and shared assets are unchanged; only connector opacity is emphasized
briefly on fine hover. Keyboard/reduced/coarse/no-JS variants retain all text and static diagrams.
Before/after local screenshots: `.community-drafts/design-004/screenshots/` at 1440/768/390,
including actual pointer and section captures. The reusable optional Chrome harness is
`scripts/community/hackathon-motion.browser.mjs`; it stops its own temporary browser/server.

## DESIGN-005 — 2026-10-14

Original code-authored IntelligenceNetwork SVG is landing-exclusive: six conceptual technology
domains, nine relationships, bounded pan, selected neighbors and synthetic signal examples.
No generated bitmap, copied reference asset, mascot, telemetry or algorithm disclosure.
Existing six challenge sources stay unchanged; controller highlights conceptual signal stages.
Page-scoped pointer/rail/ticker/process/rubric controls honor pause/reduced motion. Local
screenshots and interaction evidence: `.community-drafts/design-005/`; see
[review](HACK-DESIGN-005-REVIEW.md). These are interface demonstrations, not event results.
