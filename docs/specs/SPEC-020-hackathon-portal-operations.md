# SPEC-020 — HACK-PORTAL-OPS-001: Forms and recognition experience

Recorded 2026-10-11. Scope: focused existing static Astro hackathon enhancement, preserving COM-003B/006, six diagrams, routes, themes, team/qualification/submission rules, rubrics and community publication gates. No database, CMS, auth or Workspace API.

## Inventory and behavior

Canonical intake: src/data/hackathonForms.ts, consumed by approvedFormUrl across HackathonRegistration, FormCta, hackathons.ts and community/submissions.ts. Seven externally supplied responder titles/fields/GET availability verified; [mapping and owner actions](../hackathons/GOOGLE_FORMS_SETUP.md). URL validation excludes preview/edit/response/admin paths, credentials, query/hash and non-Google hosts. Independent available/publicationApproved/open/verifiedAt gates; all seven intake links enabled by the organizer’s follow-up authorization. Registration section at existing journey, with new #registration fragment and distinct qualification/selected-team actions. One primary registration entry, contextual secondary role/project actions; unavailable states have no dead buttons. Existing seven-step individual A/B/C journey, max-four team requirements and both judging rubrics unchanged.

PeopleSection no longer publishes a planned keynote appointment. Approved project creator identity remains on community page explicitly separate from event appointment. All speaker/judge/mentor/guest records reuse public-profile confirmation plus display approval. No new individuals invented. Separate guest/mentor slots are empty; private contact/approval evidence stays outside Git.

CertificateShowcase and hackathonCertificates define eight distinct conditional recognition categories with separate approval/eligibility. No registration-only certificate. Private Workspace manages issuance. Sanitized HTML/CSS template contains only Sample Recipient, category/team/challenge/ID/date/signature placeholders and Sample — Not Valid for Verification; no QR, invented verification URL or real signature. The organizer’s follow-up explicitly requests an original hackathon-themed certificate. Preview is IMPLEMENTED and enabled: navy/cyan HTML/CSS design with approved existing brand icon, responsive metadata and placeholders. The subsequently supplied PNG was inspected: cyan geometric corners/dashed inner frame, a compact event pill, serif certificate heading, boxed recipient, three technical-topic badges and team strip inspire the updated layout. The attachment itself, its named recipient, handwritten signature, date and verification URL are not copied into public assets. enabled and publicationApproved gates remain available to withdraw the sample.

## Acceptance and traceability

- Verified mapping, unique responder URL per stage; no concatenation/admin paths: hackathon-ops.test.mjs and manual signed-out GETs.
- Active and inactive gating, missing availability/approval/timestamp: hackathon-ops.test.mjs; no live data submission.
- Accurate seven-step/team/artifact/two-round rules, no unconfirmed appointment: site.test.mjs plus existing workflow tests.
- Eight unique categories, preview enable/publication gates, no personal certificate content: hackathon-ops.test.mjs.
- Responsive HTML, keyboard links, single h1, no overflow, preserved six diagrams: production browser checks when executed; actual results in development log.
- Build/publication/privacy/contracts/links: existing check/build/tests; results recorded only after execution.

Pending: organizer visual review; privacy notices/necessary contact collection/retention; explicit public-profile/photo/project permission; final-submission missing checklist fields; organizer roster/role/issuance verification. No hosted CI/deployment or actual issued certificate inferred.

Architecture remains [ADR-007](../adr/ADR-007-google-workspace.md). Related [SPEC-012](SPEC-012-hackathon-submissions.md), [SPEC-019](SPEC-019-everyday-ai-challenge.md), [certificate policy](../hackathons/CERTIFICATE_POLICY.md).

2026-10-14 DESIGN-002: landing-only visual composition reuses the unchanged FormCta resolver,
registry, approved profiles and certificate sample. Contextual participant/qualification/team/
project/role actions stay matched; no opening settings or responder URLs changed. Hero,
qualification and final callout provide a primary action at their respective stages. Prize
presentation explicitly remains proposed/funding-unconfirmed; recognition still needs separate
eligibility review and organizer approval. See the existing experience specification and ADR-011.
