# SPEC-018 — AEGLYSAI-HACK-VISUAL-001

IMPLEMENTED locally; publication/commit not authorized. Six educational architecture diagrams improve existing challenge tiles and existing /hackathons/events/ anchor details. Final qualification/team/submission/judging rules remain governed by SPEC-012 and current handbook; no change to rules, dates/prizes/profiles, community contracts or research repository.

## Content and rendering

One canonical challenge ID/title list in src/data/community/challenges.json, unchanged. hackathonVisuals.ts holds editorial summaries drawn from local approved public challenge briefs: difficulty Beginner-friendly matches upstream overall description, focus/minimum prototype are HTML, no difficulty rank or measured outcomes invented. Predictive example retains chronological split and declared horizon/threshold. Rule-based alert explanation remains welcome.

Six source SVGs share 480×320 viewBox and 3:2 reserved canvas: login→checks→risk→allow/flag; logs→features→anomaly→normal/anomalous; requests→monitor→spikes→dashboard; alert→AI explanation→human explanation→safety; metrics→patterns→risk→warning. All explicitly conceptual, no proprietary flow or results. Short source text stays vector; important meaning duplicated in real HTML. Asset inventory in [UI guide](../hackathons/VISUAL_ASSETS.md).

ChallengeDiagram uses build-time local raw imports with exact ID allowlist and scoped internal IDs; no external scripts/resources, images or foreignObject. Theme-aware text/surface/accents inherit existing variables. EventCard owns number/title/problem/diagram/difficulty/focus/minimum/details. Existing details use the same diagram component at larger width; old fragment and legacy proposal URLs retained. No extra client JavaScript or dependencies.

## Acceptance and traceability

- Exactly six unique accessible sources with title/description, internal arrows, no active content/external fetch: challenge-visuals.test.mjs and XML checks.
- Six tiles/details, matching IDs/fragments, public HTML descriptions, unique SVG element IDs and conceptual disclaimers: challenge-visuals.test.mjs; site.test.mjs links/landmarks and existing finalized rules.
- Desktop 3×2, tablet 2/mobile 1 at existing breakpoints; light/dark, no overflow, focus and reduced-motion: actual local Chrome preview checks at 1440/1024/768/390/320, two routes/two themes.
- Stable 3:2 canvas, equal-width cards, restrained borders and no animation; no confidential architecture or fabricated metrics. Scoped visual patch and screenshots support review; no live deployment/performance/assistive-technology certification claimed.

Remaining: owner review and later authorized task separation; existing Forms/evidence/upstream approval/security blockers are unrelated and unchanged. See [review handover](../hackathons/HACK-VISUAL-001-REVIEW.md).

HACK-CHALLENGE-006: the sixth topic/diagram extends the original five-topic visual decision with explicit Portal provenance; [SPEC-019](SPEC-019-everyday-ai-challenge.md) governs its requirements/upstream gap. Original assets/workflow preserved.

2026-10-14 DESIGN-002: `/hackathons/` adds exclusive navy/cyan presentation, elevation and
borders around the same six EventCard/ChallengeDiagram instances. Assets, briefs, acceptance
criteria and detail rendering remain unchanged. Existing 3/2/1 layout and SVG safety checks
remain applicable; see the [experience specification](HACKATHON_EXPERIENCE_SPEC.md).

2026-10-14 DESIGN-004 adds exclusive landing pointer highlights and bounded tilt around the
unchanged six architecture sources. Labels/nodes remain static; decorative connector stroke
opacity receives one short emphasis on fine-pointer hover. Coarse/reduced modes disable it.
Shared renderer/detail pages remain byte-identical. Existing experience SPEC and the
motion-preservation/browser checks govern this presentation-only exception to the earlier
static landing treatment; no acceptance criteria or architecture text changes.
