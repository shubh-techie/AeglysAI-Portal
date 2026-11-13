# Conference photo publication and discovery

SPEAK-001D uses build-time filesystem discovery, not manually maintained photo arrays or a public feed. Event names, participation statuses and recording associations remain in existing verified event data.

## Explicit publication-ready mapping

| Input directory | Existing event ID |
| --- | --- |
| public/conference/atai-2026/ or ATAI 2026/ or ATAI-2026/ | beyond-static-access-control |
| public/conference/gicite-2026/ or GICITE_2026/ or GICITE-2026/ | gicite-2026-wru-key-talk |
| public/conference/etic-2026/ or ETIC-2026/ | etic-2026 |

`src/data/conferenceFolders.json` is the approved folder-to-event policy. Changing a conference association requires owner review; adding/removing photographs does not require changing this mapping, Astro, TypeScript or an image array.

Only an authorized operator may place images in these publication-ready folders. Before placement:

1. Confirm the image's exact event association; filenames alone are insufficient.
2. Confirm public-image rights and consent for identifiable subjects, including organizer artwork.
3. Exclude private chats, meeting information, attendee details and sensitive screen content. Prepare a privacy-safe copy privately when needed; retain the original unchanged outside public/.
4. Check that captions and visible claims are consistent with verified status. A photograph does not establish delivery, endorsement or organizer confirmation.
5. Placement after these checks is an explicit publication action under `operator-publication-v1`. Unverified material remains outside public/, regardless of whether discovery would technically ignore it.

The initial five ready images were owner-authorized and privacy-reviewed in SPEAK-001B/D. Ten submitted originals remain unchanged in ignored private QA. Two ambiguous captures, two participant-group captures and conflicting ETIC announcement artwork remain excluded; this is not an authenticity judgment.

## Add or remove images

Copy an approved `.jpg`, `.jpeg`, `.png` or `.webp` into its mapped folder. Extensions are case-insensitive. Remove a ready copy to withdraw it; keep its private master. Sort order is natural numeric English filename order, case-insensitive, with original filename as the tie-breaker. Zero-pad names (`photo-01`, `photo-02`, `photo-10`) for intentional numeric ordering.

Run:

```sh
npm run conference:refresh
```

Then reload `/speaking/`. The existing running Astro server was verified to return updated counts after this command without restarting. Merely copying a file is **not** claimed to trigger discovery automatically. No Node, dev-server command, configuration or port change is required.

Optional metadata may accompany each image as `<filename including extension>.json`, for example `photo-01.JPG.json`:

```json
{
  "alt": "ATAI speaker introduction shown during the online session.",
  "caption": "Owner-approved ATAI session capture.",
  "fit": "contain"
}
```

These are optional per-file descriptions, not a required image list. Without a sidecar, the gallery receives neutral event-specific alt/caption text and `contain` fit. Rich descriptive alt text is recommended. Attribution defaults to **Courtesy of Shubh Prabhat**. Use `cover` only for a photographic composition that remains accurate when framed at 16:9; slides/posters should use `contain`. Expanded/detail images always use contain.

## Generation, limits and production

Discovery validates actual decoding and type (JPEG/PNG/WebP), not just extensions. It rejects corrupt, unsupported or animated inputs, symlinks, empty files, files larger than 20 MiB, images over 40 million pixels and unsafe caption fields. There is **no photo-count maximum**. Encoding validity cannot establish event identity, consent or factual truth: these remain operator obligations.

Original ready inputs are never modified. Display variants are rotated according to orientation, resized inside 1920×1920 without enlargement, and encoded as WebP quality85. Thumbnails fit inside320×320 at quality75. Neither operation crops or distorts the input. Optimized metadata is stripped; original source metadata remains unchanged and should be reviewed before placement in any public directory.

Generated assets live under reserved `public/conference/_generated/<event-folder>/` with content-hash filenames. Never place original inputs there. Generated inventory is `src/data/speakingPhotos.generated.json`; `speakingPhotos.ts` imports it. Do not hand-edit generated data or outputs. Refresh removes stale generated copies only, never source photographs.

`npm run build` runs discovery, Astro build, then a scoped output finalizer. The finalizer recreates only `dist/conference` with referenced optimized assets. Original publication inputs, sidecars and unknown folders do not enter the production distribution. Other Portal assets are untouched. The existing GitHub Pages workflow already invokes `npm run build`, so no workflow change is needed.

Unknown folders are ignored by discovery and excluded from production output. Astro's development server can still serve literal files placed anywhere in public/; do not use public/ as private staging or expose the development server publicly. Direct `astro build` bypasses the package-script finalizer; use the documented `npm run build` release command.

## Interaction and approval boundaries

Compact cards show up to the first four images as a count-driven collage and a count outside the fixed 16:9 media slot; all discovered images remain in the overlay. Both the photo and View Event Details open the same fullscreen viewer. Previous/Next controls and counter sit below the image inside the viewer; main cards have no carousel controls or thumbnail strip. Multiple-image galleries have a scrollable thumbnail strip; single-image galleries hide navigation controls. Full-image popup, keyboard, Escape/focus restoration, event details and no-JavaScript disclosure/link alternatives remain available. No autoplay or added animation.

Future approved files automatically change counts without editing preservation fixtures. Historical checks pin all surrounding Speaking bytes and permit only the six card/detail gallery interiors to vary. Current raw-output tests independently validate discovered paths, digests, counts and production inclusion. Package-script normalization is limited to the exact approved build/refresh delta; dependencies, dev/test/check commands and security gates remain protected.

No source or image availability changes an event status or associates the AEGYTHON videos with a conference. Cache and Magicast findings remain OPEN. Refresh/build does not authorize staging, committing, pushing or deployment.


SPEAK-001F generalizes generated-path validation for future safe canonical folders. Add future event metadata through the existing presentations.ts contract and approved directory policy, following SPEAK-001-AUTHORING.md. No event is created from an arbitrary folder. Source reconciliation and current exclusions are recorded in SPEAK-001F-ASSETS.json; this update does not republish held photographs.
