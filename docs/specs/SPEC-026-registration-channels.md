# SPEC-026 — External registration channels and Discord discovery

Recorded 2026-10-26 for REG-001 and REG-001A. Baseline
`c85f80e5662d5d429ed098b260c6dc7a427edb65`. Status: IMPLEMENTED locally for review;
no commit, PR or production publication asserted.

## Scope and acceptance

Extend the existing `/hackathons/` registration journey with an additive external
channel section immediately after the journey and before qualification. Unstop and Luma
are owner-supplied additional discovery/registration destinations; official Google Forms,
individual A/B/C qualification, organizer selection, selected-team review and final
submission remain authoritative. External signup never establishes completion/selection.
Keep all six challenges, dates, team rules, original content, navigation and the separate
2027 Coming Soon route unchanged. No counts, endorsements, confirmed location/date/prize
claims or automatic provider-data import.

REG-001A adds the supplied Discord invite in that section and a reusable Community &
Support card inside FAQ. Both consume a single configured invite and explain that Discord
participation does not constitute event registration, technical qualification or selection.
External links have meaningful provider text, a visible external label, new-tab behavior
and `noopener noreferrer`. Use existing `hx-` buttons/cards/grid/focus/responsive styles;
the existing landing intentionally remains dark under both global themes. No added CSS,
runtime JS, embed, SDK, database, service, dependency or private Workspace operation.

Source: `src/data/hackathonChannels.ts`, `RegistrationChannels.astro`,
`CommunitySupport.astro`, two additive calls/imports on the existing page.

## Evidence and future operations

Signed-out HTTPS and browser verification are snapshots, not guarantees of future link
availability or a completed signup. Unstop's shell returned200; Chromium resolved the
short URL to the Aegython listing with registration controls. Luma returned200 and an
AEGYTHON listing with a registration entry. Common theme/team facts align, but Unstop
prize/counter claims and Luma dates/Ranchi/national scope are not approved Portal facts.
Do not import them. Product copy explicitly says official Portal information governs.
Discord API returned200 for the supplied code, server `aeglysai`, with expiry
2026-11-14T13:57:16+00:00. No Discord join or provider registration submitted.

[Reconciliation specification](../hackathons/REGISTRATION_RECONCILIATION.md) is PLANNED
only: separately authorized private operator processing, minimum stable matching IDs,
manual ambiguous matches, consent/withdrawal and no selection inference. Export/API
availability is not assumed; existing master Sheets remain untouched.

## Validation

`registration-channels.test.mjs` verifies exact safe links, placement, unique accessible
context, original HTML/source reconstruction and27 unchanged routes. New main-based
fixture supplements untouched historical fixtures; only uniquely identified additions
are removed by `registration-preservation.mjs` in historical byte comparisons.
`registration-channels.browser.mjs` checks four widths/both themes/JS and no-JS,
keyboard tab order, visible focus, target size, accessibility-tree names and no overflow.
Existing check/build/full suite/2026/2027/navigation regressions remain required. Actual
outcomes/screenshots and external verification limits: [REG-001 review](../hackathons/REG-001-REVIEW.md).

No new architectural decision: reuse [ADR-007](../adr/ADR-007-google-workspace.md),
[ADR-011](../adr/ADR-011-scoped-hackathon-event-landing.md) and
[SPEC-020](SPEC-020-hackathon-portal-operations.md). Both SEC-002 findings stay open.
