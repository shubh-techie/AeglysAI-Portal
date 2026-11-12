# SPEAK-001 — local review checkpoint

Date: November 12, 2026. Status: implemented and locally validated; awaiting owner review. No staging, commit, push, PR, merge or deployment performed.

## Baseline and environment

Verified origin/main and HEAD: `6ee5480130490b8f90b4d38cd00c226cb20529b0`.
Branch: `feat/AEGLYSAI-PORTAL-SPEAK-001-conference-showcase`.
Worktree: `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal`.
Initial tree was clean; existing ignored evidence remains preserved. No open PRs at remote inspection. Latest successful Pages build and deployment: [41685813558](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/41685813558), same baseline SHA. Live baseline was checked separately; this redesign is not deployed.

Existing localhost:4321 server PID 58050, working directory, Node 24.22.1, Astro settings, development scripts, port and worktree arrangement remain unchanged. Validation used the existing Node installation and isolated pinned Python contract dependencies, without modifying application dependencies.

## Content and architecture

[Structured inventory](SPEAK-001-CONTENT-INVENTORY.json) records three existing conferences, three recordings and two proposed topics with sources. [Authoring guide](SPEAK-001-AUTHORING.md) documents approval requirements; [ADR-015](../adr/ADR-015-speaking-showcase-media.md) records the static publishing design.

- ATAI 2026: completed; featured using the existing approved first-slide image and verified full talk title.
- GICITE 2026: confirmed engagement, scheduled date passed; completion remains unverified. An invitation is not presented as delivery.
- ETIC 2026: acceptance sent, awaiting written confirmation. Role/title uncertainty retained.
- Three YouTube oEmbed titles were retrieved from YouTube and inventoried exactly. All describe AEGYTHON 2026 sessions, not these conferences; each has no conference association and appears separately with its original watch link.
- Zero approved conference photos available. No stock, private candidate photos, organizer logos or unapproved PDFs published. Galleries support zero to four approved photos per event and were exercised using explicitly synthetic test fixtures only.

Typed, strict schema version 1.0.0 in `src/data/speakingShowcase.ts`; derived structured content in `src/data/speakingContent.ts` retains canonical `presentations.ts`. Photos require public rights/source references, consent/publication approval, confined stable source paths and matching SHA-256. Astro produces responsive lazy WebP images and bounded full-view images. Native links remain usable without JavaScript; enhanced dialog supports focus containment, arrow navigation, Escape, image errors and focus restoration. Future sanitized Sheets/Drive imports can target this contract; no live feed, CMS or service introduced.

## Validation and preservation

- Astro check: 183 files, zero errors/warnings/hints.
- Production build: 28 pages.
- Full automated suite: 136/136, zero failures/skips. Untouched main with pinned contract dependencies: 130/130. Initial default-Python failures were missing jsonschema; isolated pinned setup resolves them on both trees. No test suppression or new failures.
- Browser: 84 before/after/four-photo-fixture cases across 320, 375, 390, 430, 768, 1024 and 1440 px, both themes, JavaScript and no-JavaScript; 28-route render sweep. Zero runtime exceptions or Speaking third-party requests. Keyboard focus, Tab/Shift+Tab containment, arrows, Escape, focus return, image-error and no-JS full-image navigation pass.
- Only `/speaking/` generated HTML changes; all other 27 pages byte-identical, including 2026/2027, research, Publications, Media and all existing talk detail routes. Existing historical fixtures/hashes retained through an exact inverse Speaking projection that rejects unexpected current-byte changes.
- Date/content and privacy/credential scans pass; 34 protected public assets/configuration/canonical-source hashes unchanged. No dependency, workflow or security-control changes.

Evidence under ignored `.community-drafts/speak001/`: `check-final.log`, `build-final.log`, `tests-final.log`, `baseline-tests-final.log`, `browser-verified.log`, `youtube-metadata.json`, `output-performance.json`, `protected-hashes.json` and `remote-state.json`. Earlier failed harness/setup logs are retained separately.

## Before/after screenshots

Local review artifacts, intentionally outside published assets:

- [Before desktop](../../.community-drafts/speak001/browser-1794504687502/before-1440-dark.png) / [After desktop](../../.community-drafts/speak001/browser-1794504687502/after-1440-dark.png).
- [Before mobile](../../.community-drafts/speak001/browser-1794504687502/before-320-light.png) / [After mobile](../../.community-drafts/speak001/browser-1794504687502/after-320-light.png).
- [Synthetic gallery mobile](../../.community-drafts/speak001/browser-1794504687502/gallery-320-light.png) / [Synthetic gallery desktop](../../.community-drafts/speak001/browser-1794504687502/gallery-1440-dark.png).

## Media, performance and limitations

Uncompressed Speaking HTML: 37,800 before / 37,600 after bytes; page CSS 10,590 bytes; new inline gallery enhancement 3,035 bytes; existing lazy first-slide image 80,285 bytes. Zero initial YouTube players, remote thumbnails or third-party Speaking requests. These are local output/network observations, not field Core Web Vitals claims.

No real photo gallery is published pending rights/consent evidence. GICITE delivery and ETIC written confirmation remain unresolved; full PDF remains withheld. Chromium checks do not establish Safari/Firefox, physical-device, manual assistive-technology or full WCAG conformance. No new hosted CI run or live redesign verification is claimed.

HTTP cache QA-H01 / GHSA-ch52-4w7c-c8xp and Magicast embedded source-map-js QA-H02 / GHSA-68fv-2mgg-jv7q remain **OPEN**, without suppression or acceptance.

## Proposed delivery

Commit: `feat(portal): modernize speaking and conference showcase`

PR title: `feat(portal): modernize speaking and conference showcase`

Proposed PR description:

Replace the Speaking listing with a responsive research-talk showcase using existing approved event records. Keep completed, confirmed, awaiting-confirmation and proposed content distinct; separate the three verified AEGYTHON recordings from conference engagements. Add a versioned static content contract and approval-gated optimized photo galleries with keyboard dialog and no-JavaScript links; publish no unapproved photos or PDFs.

Validation: clean Astro check; 28-page build; 136/136 tests versus main 130/130; 84 Chromium responsive/theme/JS cases and all 28 routes. Other 27 HTML routes and original assets/configuration are unchanged. Photo fixture is synthetic only; GICITE completion, ETIC written confirmation and real-photo rights remain unverified. Existing cache/Magicast findings remain open. Requires owner review before staging or delivery.

## Canonical diff and exact inventory

Canonical bytes: `git diff --no-ext-diff --binary HEAD`, followed by each sorted untracked task file as `git diff --no-ext-diff --binary --no-index /dev/null <path>`. Ignored evidence excluded. Patch and SHA-256 are saved separately in `.community-drafts/speak001/review.patch` and `checkpoint.json` to avoid a self-referential hash. Index must remain empty.

- `docs/DEVELOPMENT_LOG.md`
- `docs/adr/ADR-015-speaking-showcase-media.md`
- `docs/adr/README.md`
- `docs/speaking/SPEAK-001-AUTHORING.md`
- `docs/speaking/SPEAK-001-CONTENT-INVENTORY.json`
- `docs/speaking/SPEAK-001-REVIEW.md`
- `docs/speaking/SPEAKING_EVIDENCE_TRACKER.md`
- `docs/specs/SPEC-010-speaking-presentations.md`
- `scripts/community/hackathon-motion.test.mjs`
- `scripts/community/speak001-preservation.json`
- `scripts/community/speak001-preservation.mjs`
- `scripts/community/speaking-showcase.browser.mjs`
- `scripts/community/speaking-showcase.test.mjs`
- `scripts/community/time001a-final-preservation.mjs`
- `scripts/community/time001a.test.mjs`
- `scripts/site.test.mjs`
- `src/components/speaking/showcase/EventCard.astro`
- `src/components/speaking/showcase/PhotoGallery.astro`
- `src/components/speaking/showcase/gallery.js`
- `src/data/speakingContent.ts`
- `src/data/speakingShowcase.ts`
- `src/pages/speaking/index.astro`
- `src/styles/speaking-showcase.css`
