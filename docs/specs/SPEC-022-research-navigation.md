# SPEC-022 — Research navigation consolidation

Recorded 2026-10-26 for AEGLYSAI-PORTAL-UX-001. Status: IMPLEMENTED locally, uncommitted and not deployed.

The shared Astro Header groups the existing `/research/`, `/experiments/` and
`/publications/` destinations under one Research disclosure. It derives links from
the existing `project.ts` navigation records; no routes or page content change.
Architecture, Speaking, About, Hackathon and Community retain their original links.

Native `details`/`summary` supplies keyboard, pointer, touch and no-JavaScript
interaction and expanded/collapsed accessibility semantics. The submenu is a list
of ordinary links, not an application menu. The matching child retains `aria-current="page"`;
the group has a visual active indicator. At the existing 760px breakpoint it becomes
an in-flow accordion; larger layouts use an anchored dropdown. Styling reuses semantic
theme tokens, preserves the native disclosure marker and adds visible summary focus.
Small inline CSS is restricted to header selectors so existing shared styles remain unchanged.
There is no animation, dependency, client bundle, content service or routing change.

A scoped inline enhancement closes the disclosure on Escape (restoring summary
focus), outside click and focus leaving the disclosure. Without JavaScript the native
disclosure and all destinations remain usable; these enhanced dismissal behaviors
are unavailable. No hover-only activation or autoplay is used.

Acceptance: exactly three original submenu destinations; one link per destination;
correct current-page state; sequential Tab traversal, Enter/Space activation, Escape
and touch; desktop/mobile layouts without overflow; usable no-JavaScript navigation;
all page bytes outside the header and existing consumed styles preserved.

Validation: Node 24 Astro check, build, automated tests and the Chrome harness
`scripts/community/research-navigation.browser.mjs`. Exact outcomes, screenshots,
security debt and branch integration constraints are in [UX-001 review](../ux/UX-001-REVIEW.md).
The fixture records an untouched build of `bc7c280b30520100d48893c0d0cae597ec67dc7a`.
Historical whole-page guards restore only that original header before comparison;
new guards independently compare every outside-header byte on all 27 routes.
Safari/Firefox and an actual screen-reader session remain unverified. No new architectural
boundary or decision requiring an ADR is introduced.
