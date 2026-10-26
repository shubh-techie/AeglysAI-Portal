# ADR-012 — Static event showcase and build-time visibility

Recorded 2026-10-26. Status: selected for local implementation under EVENT-001; no deployment authorization inferred.

The existing Astro portal uses typed file data, sanitized public exports, approval-gated profiles, native DOM carousels and private Workspace administration (ADR-007). It has no content backend. Reusable categories and shared identities need stronger validation than the existing empty role slots.

Extend file-owned content with strict Zod schemas supplied by Astro, reusable person references and event-scoped role/entity records. Filter and project records on the build server before rendering. Use the existing community route and design tokens; preserve legacy slots and all landing/policy content. Future events supply a namespace, not speculative pages. No additional package or CMS.

Use event-local calendar-day visibility and explicit editorial status with independent approval/consent/suppression flags. Unknown event timezone blocks date-gated publication. Scheduled content becomes visible only in a qualifying new build; rebuilding/deploying at boundaries is an organizer responsibility. Draft sources never enter client bundles. Suppression requires redeployment and cannot revoke already downloaded content.

Alternatives: client-only hiding would expose unpublished data and trust visitor clocks; backend scheduling/Workspace integration exceeds authorization; separate per-person components duplicate policy. Extending every legacy slot with parallel copies of a person would lose identity consistency. Legacy empty slots remain compatibility scaffolding; new showcase profiles have one source. Social export engine deferred: provide design specifications instead.

Consequences: static visibility can lag until a build, strict validation can stop a build, and approval flags are organizer attestations rather than evidence verification. Human content/privacy review remains necessary. Tests cover schema boundaries, roles, category/event filters, timezone/DST, consent and withdrawal. See [SPEC-021](../specs/SPEC-021-configurable-event-showcase.md).
