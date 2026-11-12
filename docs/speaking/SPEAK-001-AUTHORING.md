# Speaking showcase authoring — schema1.0.0

Recorded 2026-11-12. Static, review-gated authoring; no live Google source or publishing service.

## Conference metadata

`src/data/presentations.ts` remains authoritative for approved name, organizer, dates, venue,
role, talk title/abstract, participation and slides. Preserve stable slugs/detail URLs.
`src/data/speakingContent.ts` derives the showcase through `speakingShowcaseSchema` in
`src/data/speakingShowcase.ts`. Do not duplicate event facts into Astro markup.

Keep status separate from calendar passage. Completed requires actual recorded delivery;
invitation/acceptance or an elapsed date is insufficient. Withhold unknown titles instead of
inventing them. GICITE's stored Upcoming status is retained; the new listing now explains its
scheduled dates have passed and completion is unverified. ETIC still awaits written confirmation.

## Photographs: zero to four per event initially

1. Obtain exact-image publication rights, any required subject consent and approved captions,
   alt text and credit. Store private correspondence/originals outside public source/assets.
2. Review image content and metadata, remove private EXIF/location data and optimize the
   source dimensions/file size before approving its exact final bytes. No attendee identities
   or organizer-owned images/logos may be assumed cleared from a filename or event invitation.
3. Put only cleared final images under `src/assets/speaking/`, with stable lowercase asset
   paths. Never put unapproved originals in public/; Astro copies that directory wholesale.
4. Add a record under `approvedPhotos[eventSlug]` in `speakingContent.ts` containing id,
   eventId, assetPath, SHA256, descriptive alt, caption, credit, sourceUrl, rightsBasis,
   rightsReference and explicit content/publication/subject-consent approvals. A rights basis
   is OWNER_AUTHORIZED or LICENSED. Unknown/private fields and rights/source URLs fail closed.
5. Run check/build/full tests, inspect generated thumbnails/full images and gallery behavior,
   review the exact diff and obtain separate delivery approval. No UI component edits needed.

The validator rejects cross-event photos, duplicates, more than four records, false/missing
approvals, missing/outside/symlink-escaping files, sources over8MiB and digest changes. Astro
then decodes approved media and generates lazy responsive WebP variants plus a full view
bounded to1920px. Treat configured source assets as public: build optimization is not a
confidentiality boundary. Changing an approved image invalidates the stored digest.

No photos are seeded for any real conference in this task. Synthetic four-photo fixtures
exist only in ignored isolated test builds; they are not participation evidence.

## Recordings and resources

Add approved recording metadata to the structured list in `speakingContent.ts`: exact11-character
YouTube ID, title/channel, context, metadata source/date and publication approval. URLs are
constructed centrally; no autoplay, initial iframe or remote thumbnail. Changing a conference
association also requires a public associationSource and matching event.recordingIds. Never
infer a conference recording from a similar topic or the speaker's identity alone.

The three owner-supplied video IDs were verified via official YouTube oEmbed on2026-11-12;
all titles explicitly identify AEGYTHON2026. They remain separate from ATAI/GICITE/ETIC.
Only the existing approved ATAI first-slide PNG is public. Full PDF and any additional slide
assets require their own existing publication gates; no invented downloads or full-deck promise.

## Future approved Google Sheets/Drive export

A future operator workflow may map stable event IDs, public metadata, photo metadata and
approval decisions into this same versioned contract. Source-only fields such as internal
Drive IDs, Notes, contact information, consent evidence and private source URLs must never be
exported. Download/inspect/clear source assets privately, produce an exact digest-bound packet,
then submit it through repository review. Status flags alone do not establish rights or owner
approval. No browser Sheets fetch, automatic deployment or public feed exists here.

Changing the schema requires an explicit version/review and rejection of incompatible input.
Do not bypass validation to publish pending, withdrawn or unapproved content.
