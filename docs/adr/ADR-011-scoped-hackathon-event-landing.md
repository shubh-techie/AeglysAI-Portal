# ADR-011 — Scoped international event landing

Recorded: 2026-10-14. Task: AEGLYSAI-HACK-DESIGN-002. Status: accepted for this implementation under the user's explicit landing-only scope; no deployment approval inferred.

The existing red experience stylesheet is consumed by both the landing and Sponsors. Shared challenge diagrams, profile cards, certificates, rules and intake configuration serve other routes. A visual redesign must preserve those routes and event truthfulness.

Use exclusive `src/components/hackathons/landing/` components and `src/styles/hackathon-landing.css` on `/hackathons/`. Copy the existing landing presentation primitives and certificate styling into the exclusive stylesheet, then apply a midnight navy, blue, cyan and restrained violet identity. Consume shared EventCard, ChallengeDiagram, FormCta, CertificateShowcase and approval-filtered PeopleSection without changing them. Copy the complete shared rules into a landing-only composition to present two judging cards; canonical rules/rubric arrays remain authoritative.

Alternative: changing the shared stylesheet/components would affect Sponsors or challenge details and breach scope. A new UI or animation library adds unnecessary cost. Generated challenge posters would replace the required six existing architecture SVGs. Those alternatives are rejected for this task.

Use one small inline, landing-only IntersectionObserver script for active section navigation; native anchors still work without JavaScript. CSS entrances are progressive enhancements. Network motion ends after four seconds; reduced motion removes animations, transitions and smooth scrolling. The landing is intentionally dark in either global theme; global header/footer keep their selected theme.

Consequences: the copied presentation/rule composition must be checked when shared policy changes. Exact rubric/evidence regressions guard policy drift. All seven Forms continue through the existing resolver; no settings or new URLs. Award amount stays sourced from event data, with proposed/funding-unconfirmed language and no approved allocation. Profile consent gates and sample validity disclaimer remain intact. No package, backend, countdown target or research repository change.

See [existing experience specification](../specs/HACKATHON_EXPERIENCE_SPEC.md) and [design review](../hackathons/HACK-DESIGN-002-REVIEW.md) for scope and validation evidence.

## DESIGN-004 — Progressive interaction extension, 2026-10-14

IMPLEMENTED locally for review under the explicit interaction-only scope. Retain the same
landing boundary, content/order/anchors, shared components, six SVG sources and canonical
intake/policy data. Replace the existing inline navigation body with a repository-owned
`landing-motion.js` raw import rendered in the same single inline script. No package,
external script, runtime request, storage or new event-state model.

Use IntersectionObserver for navigation, one-time entrances and temporary reading attention;
CSS custom properties plus requestAnimationFrame for hero lighting/grid and bounded ±1.5°
card tilt. Tracking is limited to fine hover pointers and disabled for reduced motion,
coarse pointers and hidden documents. AbortController disposes event handlers; observers
and pending frames are disconnected/cancelled on page lifecycle/preference changes.
Back/forward restoration reinitializes handlers without replaying entrances. Existing
network motion remains finite. No continuous rendering loop or text-generation behavior.

Alternative: hiding content until JavaScript/scroll reveals it would violate SEO/readability;
heavy animation libraries or canvas are unnecessary. Global styling/shared SVG modifications
would breach route scope. CSS decorations and a small scoped controller preserve the HTML.

Journey emphasis means reading/focus attention, never completed qualification. Score bars
encode existing rubric weights, never results. Trophy/sample motion never changes approval
or certificate validity. Navigation sticks on desktop/tablet and stays static on narrow
mobile to preserve reading space. See the existing experience SPEC and review handover
for exact preservation tests, browser evidence, size impact and remaining limitations.
