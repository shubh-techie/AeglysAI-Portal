# ADR-015 — Static speaking-event and media publication contract

Recorded 2026-11-12. Accepted for this local implementation under SPEAK-001; no publication
or deployment approval inferred.

The portal already owns approved speaking metadata in `presentations.ts`, consumed by Home,
detail pages and Speaking. Event photos and recordings need their own rights/association
checks without duplicating conference facts or changing those consumers.

Derive a versioned `1.0.0` showcase bundle from the existing approved records. Add an offline
strict schema and an explicit approved-photo map/recording list, not a database or live feed.
Keep stable presentation slugs as event IDs. Preserve recorded participation status; an
elapsed date can display a completion-unverified note but cannot establish delivery.

Photos live under `src/assets/speaking/` only after human content/rights/subject-consent review.
Require a matching digest, confined real path, credit and public rights/source references;
limit each event to four initially. Import only referenced approved assets through Astro's
image pipeline. Produce responsive WebP thumbnails and a bounded full-image view. No private
originals, invitations or consent evidence in public/. Source assets configured for a public
build must themselves be safe to publish; optimization is not a substitute for metadata review.

Recordings use validated YouTube IDs and approved public metadata; conference association
needs explicit source support. Use ordinary watch links so players and remote thumbnails do
not load before a visitor chooses YouTube. The three supplied videos identify AEGYTHON2026,
so keep them in the community-recordings section rather than attach them to conferences.

Reuse native anchors, radio filtering and dialog for progressive enhancement. No-JS image
links remain usable; JavaScript adds gallery navigation, focus containment/return and Escape.
No new library, CMS, database, endpoint, credentials or browser Workspace access.

Alternatives: putting every media field into the legacy presentation interface expands shared
consumers unnecessarily; a separate duplicate event store risks status/date drift; automatic
YouTube embeds add unsolicited network/player cost; externally hosted pending images risk
rights/privacy disclosure. The derived static bundle preserves ownership and review boundaries.

Future Sheets/Drive work can export the sanitized schema after independent owner/rights review.
This ADR does not provision that workflow or make approval booleans proof of genuine consent.
See [SPEC-010](../specs/SPEC-010-speaking-presentations.md) and
[authoring guide](../speaking/SPEAK-001-AUTHORING.md). Existing security findings remain OPEN.
