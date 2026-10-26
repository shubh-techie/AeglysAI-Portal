# SPEC-023 — Hackathon 2027 coming-soon experience

Recorded 2026-10-26 for AEGLYSAI-PORTAL-HACK-2027-001.
Status: IMPLEMENTED locally for review; not committed, merged or deployed.

Add `/hackathons/2027/` using the existing Layout, metadata, shared theme tokens and
static Astro routes. Show Hackathon 2027 / Coming Soon, the approved innovation copy,
an explicit future-announcement notice and a link to AEGYTHON 2026 at `/hackathons/`.
No dates, venue, partners, rules, prizes, registration or countdown. This is a future
announcement, not an extension of the 2026 event dataset or a published 2027 event plan.

Extend the existing Header disclosure template and mobile-navigation controller to
handle both Research and Hackathon groups. Hackathon has exactly two destinations:
AEGYTHON 2026 (`/hackathons/`) and Hackathon 2027 (`/hackathons/2027/`). Preserve other
navigation destinations. Reuse native details/summary on desktop and in the existing
mobile modal drawer; native disclosure fallback remains usable without JavaScript.
Both groups share Escape, outside-pointer and focus-leave behavior, expanded state,
drawer focus containment/restoration, breakpoint cleanup and reduced-motion support.
No framework, dependency, external service, additional script or backend is added.

The new page uses semantic section/h1, shared layout landmarks/canonical/social metadata,
responsive type, cyan/violet accents and static decorative rings hidden from assistive
technology. No animation is added. Existing light/dark tokens supply text/background
colors; avoid fixed light text on a light theme. Touch targets are at least 44px.

Acceptance: generated 2027 route and sitemap entry; both group destinations work by
keyboard/touch/pointer and without JS; unique control IDs/current-page semantics;
no horizontal overflow at 320/375/390/430/768/1024/1440px in both themes. Existing 27
routes outside the authorized header, original styles, six challenges, forms, rules,
dates, qualification, showcases and privacy gates remain protected. No dependencies,
workflow/security policy, research or branding changes. Both security residuals remain open.

Validation: Astro check, production build then complete test suite; new generated-page/
submenu tests plus unchanged historical preservation guards. Extended existing Chromium
navigation harness covers both groups and new-page screenshots; existing 2026 hackathon
browser harness checks protected interactions/forms. See [review and evidence report](../hackathons/HACK-2027-001-REVIEW.md)
for actual counts, evidence paths and limitations. Local validation is not live deployment.
