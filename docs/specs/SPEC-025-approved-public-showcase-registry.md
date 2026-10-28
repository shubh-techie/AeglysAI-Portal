# SPEC-025 — Approved public showcase registry

Recorded 2026-10-26 for AEGLYSAI-PORTAL-EVENT-002 at main
`e79ee98613a49268816b0424a1449ed342264a54`. Status: IMPLEMENTED locally for review;
no real data, live Sheet or delivery/publication asserted.

Extend [SPEC-021](SPEC-021-configurable-event-showcase.md) with a controlled sanitized
JSON input contract and independent digest-bound approval. Keep the same category,
profile/role, team, approval and visibility rules and the same Astro component on the
community page. Preserve all initial EVENT-001 data and presentation, six challenges,
registration, qualification, event rules and separate 2027 announcement.

Architecture and full field/administrator contract:
[registry guide](../hackathons/PUBLIC_SHOWCASE_REGISTRY.md),
[ADR-013](../adr/ADR-013-approved-public-showcase-registry.md).
Executable schemas and semantics are in `src/data/eventRegistry.ts`; fixed server-only
loader in `src/data/eventRegistryInput.ts`; Node 24 CLI in
`scripts/community/event-registry.mjs`. No new npm/Python dependency or remote service.

## Acceptance and validation

- Strict v1 snapshot, provenance, stable IDs, existing category allowlist, one profile
  for multiple roles, no duplicate IDs/roles or copied conflicting identities.
- Explicit candidate decision/consent for each record/profile; only approved/consenting
  records survive. Existing confirmation/content/organizer/image/selection gates remain.
  Missing/conflicting flags reject the proposal; withdrawal removes dependent roles/teams.
- No contacts, registration responses, consent evidence, private notes/Workspace URLs,
  credentials or raw master files. Reject unknown fields, unsafe links, formulas and
  unapproved/missing/changed/escaping images. JSON only; no spreadsheet/CSV output.
- Independent approval binds digest/ID/revision/all record IDs and valid review/expiry
  instants. Synthetic data rejected by production. Invalid/partial imports block builds.
- Preserve event timezone/local-day schedule semantics; date is not approval. Withdrawal
  replacement and empty snapshot require rebuild/authorized deployment.
- No production snapshot seeded. Default production HTML must remain byte-identical to
  main baseline; synthetic/private markers absent from every generated page.

Automated tests: `scripts/community/event-registry.test.mjs` covers schema/rejections,
profiles/roles, approvals, privacy/formulas, assets, timezone/DST, withdrawal, CLI output
and isolated actual positive/invalid/unpublish Astro builds. Existing EVENT-001,
navigation, homepage and full suite remain required. Browser regressions use existing
showcase and navigation harnesses; there is no new UI. Actual final results/limitations
and review hash belong in the EVENT-002 review report and development log.

PLANNED separately: live private Sheet provisioning/access, real content/consent
verification, real registry publication and any automated export. No new appointments,
partners, event readiness, research effectiveness or security acceptance inferred.

## FINAL-001 additive role contract

Registry1.1.0 adds explicit Speaker and Organizer reusable-person roles; Keynote Speaker
remains separate. Existing1.0.0 snapshots and approvals retain their original semantics.
New categories cannot be labeled1.0.0, and owner/snapshot versions must match. The profile
adapter emits1.1 only when needed; no automatic owner approval or version migration.
Roll out validator support before using new producer categories; old validators fail
closed on unknown versions/roles. All previous privacy/digest/asset/withdrawal gates and
the private People preview-only boundary remain mandatory. No real data populated here.
