# ADR-013 — Controlled sanitized showcase snapshot

Recorded 2026-10-26. Status: selected for local EVENT-002 implementation under the
explicit task architecture; pending code/security review and delivery authorization.

## Context and decision

[ADR-007](ADR-007-google-workspace.md) keeps private Forms/Sheets/Drive administration
outside this public static Portal; [ADR-012](ADR-012-static-event-showcase.md) defines
the existing showcase. There is no safe public path from private response Sheets to
event profiles without sanitization, consent/content review and strict publication gates.

Use private administration → manually sanitized JSON candidate outside Git → local
bounded validator/exporter → complete public snapshot → independent owner approval
bound to its digest → reviewed Git change → existing build-time showcase. Reuse the
EVENT-001 schema, projection, renderer and controller. The registry loader checks a
fixed pair of files; both absent preserves existing data, any partial/invalid proposal
fails the build. Imports cannot overwrite baseline entries/event metadata. Each next
snapshot replaces the previous imported registry in full.

No browser Google Sheets integration, private credential, database, service, new
dependency or scheduler. No live Workspace changes or real-person seed. The synthetic
fixture is explicitly marked and cannot load through the production path.

## Alternatives and consequences

Direct published CSV or browser Sheets access risks exposing private master fields and
makes approval provenance unclear. A second showcase/store duplicates policies.
Self-approved source flags cannot bind a reviewer to exact bytes; use a separate owner
manifest plus ordinary human privacy/security review, as in the existing community
publication pattern (without claiming compatibility with its unrelated upstream schemas).

Human sanitization and consent review remain mandatory. A digest proves content identity,
not truth, identity or reviewer authentication. Failed builds preserve the old deployed
site; expiry/revocation alone cannot withdraw cached static content. Rebuild/deploy an
approved replacement, and review retention/history. Public snapshots are visible in Git
before any schedule boundary. Current image presentation supports only approved rights
without a visible credit requirement; attribution is recorded in the public manifest.

See [SPEC-025](../specs/SPEC-025-approved-public-showcase-registry.md) and
[operator contract](../hackathons/PUBLIC_SHOWCASE_REGISTRY.md) for validation and limits.
