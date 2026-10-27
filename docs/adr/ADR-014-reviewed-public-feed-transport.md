# ADR-014 — Reviewed public-feed transport

Recorded2026-10-26 for CONTENT-002A. Status: local implementation pending review.
Extends ADR-013; no production feed or release is approved by this decision.

Use an operator-side bounded HTTPS fetch into ignored versioned staging. Feed envelope
contains EVENT-002 snapshot, independent owner approval and public image URL manifest.
A separately reviewed expected snapshot digest is required, not learned from the feed.
Only existing organization-controlled hostnames are allowed; images must share the feed
origin. Stream limits/timeouts/no redirects/no credentials and existing strict JSON,
registry/approval/asset validators apply. No browser fetch, Google SDK, backend or database.
After full validation, atomically replace only a local pointer; retain previous versions.
Reviewed Git delivery of snapshot pair and verified assets remains the production boundary.

Availability failure may reuse only an exact pinned, unexpired, asset-valid previous
snapshot. HTTP404/redirect/malformed/changed/withdrawn/revoked/expired proposals reject;
no silent fallback. An approved empty replacement is the unpublish mechanism. Changing
the trusted pin prevents resurrecting an older cached snapshot. Offline operation cannot
learn a newly remote revocation while its existing approval remains valid: use short
expiry/explicit pin updates and urgent controlled unpublish; fail closed when cache expires.

Direct visitor feed refresh would expose editorial/approval data and race withdrawal,
image integrity and network availability; trusting feed-provided approval alone cannot
authenticate the publisher. Both alternatives are rejected. The digest proves exact
content identity, not human truth/consent. Cache handling is not risk acceptance.

Local DEMO uses a separate regenerated ignored feed and dev-only avatar route. Source
sample rows and Drive avatars never become public-feed fixtures. Explicit local preview
permission does not grant public usage rights. Production config excludes both routes.

CONTENT-002A-FINAL adds operator-side read-only Google APIs through the installed gcloud
ADC credential mechanism. This fills the source-to-sanitized-candidate step; it does not
change the existing Git/independent owner/publication boundary. Private config and keys
remain outside Git, no browser URLs/credentials, no Google SDK dependency or backend.
No service login/sharing or public resource was created; missing ADC is an explicit
prerequisite, not inferred authorization from a sharing URL or connected plugin session.


2026-10-26 People preview extension: the simpler single-tab source lacks independent
publication evidence, so it feeds only the existing local preview. A source status and
raw role cannot replace EVENT-002 approval/category decisions. A DEV-only card projection
keeps Pending real entries out of simulated approval flags, and fails any production use.
No parallel public store, backend or publishing path. Original bytes are preserved and
only CSS clips local portraits. Private staging is explicitly denied from dev filesystem
serving, in addition to the existing Vite deny rules.
