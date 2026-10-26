# AEGLYSAI-PORTAL-EVENT-001 delivery review

Recorded 2026-10-26. Local implementation for review; no commit, push, PR, CI, merge or deployment performed for this task.

## Verified baseline and governance

- Discovered root (`git rev-parse --show-toplevel`): `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
- Actual origin fetch/push: `https://github.com/shubh-techie/AeglysAI-Portal.git`. Verified Portal identity from Git, not the older folder spelling.
- Initial branch: `feat/AEGLYSAI-HACK-DESIGN-005-interactive-experience`; HEAD `171fc4414e864870c9d3e8ea98ea0deb3f367903`.
- Initial tree: only untracked `public/brand/social/AeglysAI Cybersecurity Banner.png`. Preserved and excluded from task inventory.
- Refreshed origin; main is `bc7c280b30520100d48893c0d0cae597ec67dc7a`, merge of PR #22, with initial HEAD as its second parent. Created `feat/AEGLYSAI-PORTAL-EVENT-001-configurable-showcase` from that main. No rewrite, reset, clean, overwrite or force push.
- Proposed commit: `feat(portal): add configurable AEGYTHON event showcase`. No implementation commit hash or PR URL exists.
- No changes or Git operations were made in Research, Enterprise or private-recovery repositories. Temporary discovery and browser artifacts are ignored within this Portal or task temporary space.

## Existing-system discovery

Astro 7.3.4 / TypeScript / CSS, static file routes under `src/pages/`; shared `Layout`, Hero, navigation, form resolver and typed data under `src/data/`. No CMS or backend exists. Current hackathon routes include landing, event details, community and sponsors. Six challenge records/architecture vectors are canonical existing content; the sixth remains a Portal extension with separate upstream alignment. No commercial product release implied.

`hackathonPeople.ts` has three empty speaker and three empty judge slots, empty mentors/guests and confirmation/display gating. The creator profile is explicitly distinct from an event appointment. `hackathonSponsorship.ts` has separate sponsor approval gates. Community participant/partner sections have honest empty/planned states. There are no actual approved public people/teams to migrate. Preserve legacy slots/CTAs; new showcase identities and category assignments use the unified model.

Existing file-based typed data and sanitized JSON exports remain the content approach. Private Google Forms/Sheets/Drive administration stays outside the Portal; seven responder URLs and independent opening gates remain unchanged. Individual qualification/selection, A/B/C evidence, one-to-four-person teams, leader/unique-ID/no-duplicate-membership rules, two judging rounds, artifact/video requirements, privacy and certificate rules remain authoritative. No raw registrations or automatic publication pipeline added.

Images live in public/images and public/brand; existing URL helpers handle base paths. Shared CSS uses theme-aware surface/text/line/cyan tokens, visible focus and reduced motion. Native MediaCarousel uses DOM scrolling/manual navigation. The new renderer follows that native pattern, uses existing info-card/section/container styles and shared asset helper, and sets 900/600px breakpoints for 3/2/1 cards. No fonts, third-party image calls, dependencies or animation library added.

Gates: Node 24 per .nvmrc; `npm run check`, `npm run build`, then `npm test` against dist, including offline Python schema/semantic checks and privacy regressions. No lint script exists. Pages workflow runs main pushes/manual dispatch, not pull requests; successful local tests do not establish PR CI. Dependency audit is separate and currently has unresolved findings.

## Implementation and reused components

The existing community route reuses Layout, Hero, CreatorProfile, HackathonPersonCard, HackathonRegistration, FormCta and HackathonNav without changing them. New EventShowcase uses global card/tokens/asset helper and native scroll conventions. The legacy media card contract is article-specific, so it was not overloaded with event entities.

New strict Zod/typed model: seven categories, unique IDs, event namespaces, reusable people and assignments; reviewed optional metadata; safe links/local assets; team references/max-four/no duplicate active public membership; approvals, suppression and qualification/selection attestations. Server-only public projection precedes rendering. Three requested partner drafts use one default announcement template. No descriptions/logos/agreements/endorsements invented.

Renderer: configurable heading/description/category/event, card or optional manual-carousel layout, category select, responsive cards, fallback initials, lazy fixed-aspect images, native touch/keyboard navigation, live filter status, reduced motion and no-JavaScript fallback. Existing landing sections remain unchanged. Future events can supply another ID without generating speculative pages.

Editorial states are manually reviewed configuration values. Calendar-day visibility is build-time, inclusive start/exclusive end in event timezone, independent of editorial status and informational announcement date. AEGYTHON timezone is unverified/null; date-gated publication fails closed. Rebuild/deploy required for activation, expiry and withdrawal. No social API or scheduler.

Four reusable SVG social design templates and format/copy/approval handoff specification are documentation-only assets, not approved announcements or an image-export service. See [SPEC-021](../specs/SPEC-021-configurable-event-showcase.md), [ADR-012](../adr/ADR-012-static-event-showcase.md) and [social templates](EVENT-SOCIAL-TEMPLATES.md).

## Exact task file inventory

Modified:

- `docs/DEVELOPMENT_LOG.md`
- `src/pages/hackathons/community.astro`
- `scripts/site.test.mjs`
- `scripts/community/hackathon-motion.test.mjs`

Added:

- `src/data/eventShowcase.ts`
- `src/components/showcase/EventShowcase.astro`
- `src/components/showcase/showcase-controller.js`
- `scripts/community/event-showcase.test.mjs`
- `scripts/community/event-showcase.browser.mjs`
- `scripts/community/fixtures/event-showcase-baseline.json`
- `docs/specs/SPEC-021-configurable-event-showcase.md`
- `docs/adr/ADR-012-static-event-showcase.md`
- `docs/hackathons/EVENT-001-REVIEW.md`
- `docs/hackathons/EVENT-SOCIAL-TEMPLATES.md`
- `docs/hackathons/templates/event-square.svg`
- `docs/hackathons/templates/event-landscape.svg`
- `docs/hackathons/templates/event-portrait.svg`
- `docs/hackathons/templates/event-story.svg`

## Validation evidence

Final local results with Node **24.13.0**:

- `npm run check`: 125 files, zero errors/warnings/hints.
- `npm run build`: 27 pages, passed (approved external rerun after sandbox Keychain failure).
- `npm test`: **62/62 passed**, including nine new model/gate tests plus existing offline contract/security/privacy/content regressions. No lint command is configured.
- `node scripts/community/event-showcase.browser.mjs`: **8 Chromium viewport/theme cases passed** (1440/768/390/320px × light/dark), plus no-JavaScript fallback. Production empty state, ten synthetic public records across all seven categories, configuration-only fourth partner, shared roles, 3/2/1 columns, no page overflow, all category selections, keyboard Home/End, manual Next, mobile touch scrolling, reduced motion, named accessibility-tree controls, local lazy image/fallback and escaped HTML-injection copy checked. Zero recorded runtime exceptions.
- Final browser evidence: `.community-drafts/event-001/run-1792995350849/results.json`, viewport screenshots and `fixture-build.txt`; inspected desktop/mobile screenshots, including final dark-mobile cards. Browser/server stopped by harness cleanup.
- Ten relative links in new docs resolve; four SVG templates parse; production HTML excludes all draft partner identities and synthetic/private fixture markers. Tracked diff and added-file whitespace checks pass.
- Package/lock files unchanged. `npm audit --json` exits 1 with seven unresolved existing advisories (details below); do not describe security acceptance as fully passed.

 Initial sandbox build failed with macOS `SecItemCopyMatching -50`; approved external rerun succeeded. Early full tests identified the intentional community route/script additions; updated only those allowances. Historical fixture independently matched the prior community HTML hash before deriving the preservation fixture. All original community HTML and inline CSS remain checked outside the new section/scoped style; all other routes/styles and protected source hashes remain checked.

Browser harness builds a separate ignored fixture with synthetic records for all seven categories, four configurable partners and one shared person in several roles. It serves localhost only and stops its browser/server in finally. Harness setup corrections: current Astro executable path, existing shared script imports, proper asset root, navigation readiness and offscreen lazy-image assertions. Carousel offsets/scroll padding corrected; scroll completion replaces a too-short fixed wait. No public fixture route/configuration committed into production source.

## Security, privacy and preserved content

Strict schemas reject unknown fields (including contacts/raw registrations), email-like text, unsafe schemes/credentials/Workspace links, invalid local asset paths and broken references. Images are local; missing files receive a fallback. Approved text is escaped; synthetic HTML-injection copy is used only for isolated verification. Unapproved records never enter rendered HTML/client source. Person-level suppression also removes associated teams; both per-item and per-profile approvals/consent apply. Public projection excludes member IDs, editorial/approval fields and qualification/selection flags. Organizer attestations do not independently verify private rosters or consent documents; human minimization/review remains mandatory in this public Git repository.

Preserved byte-protected sources: hackathon challenge JSON, six SVG diagrams, Forms URLs/gates, hackathon policy/configuration, original landing non-network content, rubrics, links, dates and existing person/certificate data. No Research/Enterprise release claim or Model D enforcement introduced (`enforcement_authority=NONE`). No private Workspace request, registration submission or external social publication.

`npm audit --json` on unchanged package/lock files: **7 advisories: 6 high, 1 moderate**, exit 1. High: http-cache-semantics, sharp, source-map-js, undici, vite, zod; moderate: fast-uri. Audit output: `.community-drafts/event-001-audit.json`. No dependency auto-fix. This supersedes earlier historical audit counts only for this session; security acceptance cannot be reported as entirely clear. The showcase validates local reviewed configuration, not untrusted HTTP payloads.

## Limitations and incomplete external work

Official partner role/logo/copy/publication approval, participant/person consent/appointments and the event timezone remain unavailable. All supplied partners remain hidden drafts. Scheduling/withdrawal requires fresh static build/deployment; already downloaded/cached pages cannot be revoked by a config edit alone. No backend, asset-export engine or social publication. Legacy empty slots remain compatibility scaffolding, not a second CMS. No real private roster or Forms/Drive access verified. Chromium testing is bounded local evidence, not physical-device/full screen-reader/WCAG or cross-browser certification. Dependency advisories remain unresolved. Commit, push, PR CI and production deployment were not performed.

## Controlled Git closeout review — 2026-10-26

This is a fresh review of the existing implementation, not authorization to commit, push, merge or deploy. No feature, test, dependency or workflow code was changed during closeout. Only this report and the development log were appended. The proposed commit still contains the exact 18 files listed above; the unrelated banner is excluded.

### Git verification and proposed commit contents

Verified root and origin match the baseline section. Current branch is `feat/AEGLYSAI-PORTAL-EVENT-001-configurable-showcase`. Current HEAD and implementation baseline are both **`bc7c280b30520100d48893c0d0cae597ec67dc7a`**, verified as a commit object and as an ancestor of HEAD. Its second parent is the initial implementation-session HEAD `171fc4414e864870c9d3e8ea98ea0deb3f367903`; that initial feature commit is not the base of the proposed EVENT-001 diff. Read-only `git ls-remote` confirms origin/main remains at the exact baseline and origin has no branch with this feature name. No refs were updated by this review.

The worktree has four modified tracked files and fourteen new task files, plus the preserved unrelated untracked banner. Nothing is staged. Before review, SHA-256 hashes were recorded for all nineteen paths; after review only this report and the development log differ. Package/lock files are byte-identical to baseline. Proposed message remains:

`feat(portal): add configurable AEGYTHON event showcase`

No commit or PR exists. Commit/push require the user's explicit subsequent approval. Do not stage the entire worktree: the banner is outside the proposed commit.

### File-by-file scope review

| File | Review disposition |
| --- | --- |
| `docs/DEVELOPMENT_LOG.md` | Chronological implementation and closeout evidence; no historical rewrite. |
| `src/pages/hackathons/community.astro` | Only renderer import and one showcase invocation; removing those two additions reproduces baseline source exactly. |
| `scripts/site.test.mjs` | Adds only the inline showcase marker to the script allowance; remote scripts/requests and emitted JS remain prohibited by the existing assertions. |
| `scripts/community/hackathon-motion.test.mjs` | Narrow community-section/style exception; existing community bytes/styles and 25 other route/style outputs remain protected. |
| `src/data/eventShowcase.ts` | Seven typed/schema-validated categories, shared identities, event namespaces, public projection, approvals, consent, selection, team and date gates; three hidden partner drafts. No private service/data path. |
| `src/components/showcase/EventShowcase.astro` | Shared escaped-text renderer, labels, category filter, cards/carousel, lazy local assets and missing-image fallback; no entity-specific component duplication. |
| `src/components/showcase/showcase-controller.js` | Native filter/scroll enhancement, keyboard/touch-compatible behavior and reduced motion; no autoplay, network request or storage. |
| `scripts/community/event-showcase.test.mjs` | Nine behavioral tests covering the model, filtering, state/approval/privacy boundaries, timezone/DST and teams. Synthetic identities only. |
| `scripts/community/event-showcase.browser.mjs` | Isolated ignored synthetic build; localhost-only server and Chrome lifecycle cleanup; eight viewport/theme cases and no-JS fallback. Does not alter production configuration. |
| `scripts/community/fixtures/event-showcase-baseline.json` | Community preservation hashes and exact baseline; not a refresh of all historical acceptance fixtures. |
| `docs/specs/SPEC-021-configurable-event-showcase.md` | Scope, contracts, authoring, consent/withdrawal, scheduling and acceptance; distinguishes local implementation from event approval/deployment. |
| `docs/adr/ADR-012-static-event-showcase.md` | Extends the existing static content architecture; no new CMS/backend or invented prior approval. |
| `docs/hackathons/EVENT-001-REVIEW.md` | Delivery inventory/evidence plus this controlled review and explicit security dispositions. |
| `docs/hackathons/EVENT-SOCIAL-TEMPLATES.md` | Four required formats, reusable copy/layout guidance and separate channel/content approval; no social publishing claim. |
| `docs/hackathons/templates/event-square.svg` | 1080 × 1080 inert editable placeholder; no person/logo/endorsement or active/external content. |
| `docs/hackathons/templates/event-landscape.svg` | 1200 × 675 inert editable placeholder; no active/external content. |
| `docs/hackathons/templates/event-portrait.svg` | 1080 × 1350 inert editable placeholder; no active/external content. |
| `docs/hackathons/templates/event-story.svg` | 1080 × 1920 inert editable placeholder with story-safe insets; no active/external content. |

### Fresh validation and acceptance

| Check | Closeout result |
| --- | --- |
| Node | 24.13.0; repository-required Node 24. |
| `npm run check` | PASS: 125 files, zero errors/warnings/hints. |
| `npm run build` | PASS: 27 pages. Sandbox attempt exited 139 with macOS `SecItemCopyMatching -50`; approved external rerun passed. No gate bypass. |
| `npm test` | PASS: 62/62; existing offline Python contract/schema/semantic, privacy, content and generated-output checks included. |
| Lint | Not configured in package.json; not represented as an executed/passing lint command. Astro diagnostics passed. |
| Existing browser harness | PASS: eight cases at 1440/768/390/320px × light/dark, plus no-JS. Checks production empty state, all seven synthetic categories, fourth partner, shared person roles, filtering, 3/2/1 layout, no overflow, keyboard Home/End/manual Next, mobile touch, reduced motion, named accessibility-tree controls, local lazy image/fallback and escaped injection copy. No runtime exceptions recorded. |
| Browser evidence | `.community-drafts/event-001/run-1793021129107/results.json`; inspected `1440-light.png` and `320-dark.png`. Browser/server closed by the harness. No external Forms were opened/submitted and no private service was accessed. |
| Existing content preservation | PASS: all tracked source, policies, configuration and assets outside the four permitted tracked edits remain identical to baseline. Community source also matches exactly after removing the two additions. Six challenge descriptions/vectors, seven Forms/URLs/gates, qualification/selection/team requirements, dates/links, both rubrics and certificate policy unchanged. Existing generated-output preservation tests pass. |
| Scope/configuration | PASS: Partner, Keynote Speaker, Judge, Mentor, Participant, Team, Event Announcement; configuration-only fourth partner and shared speaker/judge identity tested. Card/carousel content derives from the public projection. Future event namespace supported without new pages. |
| Partner publication | PASS: PARTNER-001/002/003 remain Draft, visibility.public=false, all approvals=false, no approvedCopy/logo; names and IDs absent from production text artifacts. Supplied dates remain informational proposals. |
| Privacy/disclosure | PASS within reviewed scope: no real private registration response, contact email, credential, restricted research implementation, patent material or unapproved enterprise release claim introduced. Strict fields/consent/suppression/public-projection tests and manual source review passed. Bounded credential-pattern scan of all 18 task files and draft/synthetic-marker scan of public text artifacts passed; scans are not proof against every possible secret. Draft configuration in a public Git repository must never be treated as confidential storage. |
| Static output boundary | PASS: output=static, no adapter/server endpoint, zero emitted JS files; the browser receives approved HTML/CSS/images and scoped inline controls, not Node dependencies or hidden configuration. |
| Dependency audit | **FAIL / OPEN: exit 1, six high + one moderate vulnerable package groups covering 17 advisory records. No remediation or risk waiver applied.** |
| Documentation/whitespace | Relative links, four SVG XML parses, exact file inventory, whitespace and preserved-file hashes checked. |

Raw closeout artifacts are ignored under `.community-drafts/event-001-closeout/`: `start-sha256.json`, `audit.json`, `tests.txt`, `browser.txt`, `privacy-scan.json` and final inventory/hash evidence. They are local review evidence, not part of the proposed commit or remote CI.

### Dependency security dispositions

These seven package groups are already present in baseline package-lock.json. `npm ls` confirms installed versions/chains below. Severity is retained from the audit; contextual reachability is an assessment, not a downgrade or waiver. No exploit payload was executed. Advisory descriptions and patched floors were checked against the linked primary advisories. Proposed patched floors are review targets, not tested compatibility or authorization to upgrade.

All rows have disposition **OPEN — remediation review required; no exception approved**. The absence of a server runtime on GitHub Pages limits public visitor reachability; it does not remove developer/CI risks or turn `npm audit` into a pass.

| Installed package / severity | Exploit prerequisite and Portal relevance | Recommended remediation, without changes here |
| --- | --- | --- |
| `http-cache-semantics@4.2.0` — high; Astro → remote-image cache helpers | Shared caching of security-zeroed responses plus attacker-controlled `max-stale` can expose another user's cached credentials. Astro imports it in `dist/assets/build/remote.js`. EVENT-001 uses plain local images, not Astro remote-image processing or an authenticated shared proxy. No matching public request/cache path identified in this static Portal. | Track upstream/Astro remediation and confirm a published fix or reviewed replacement before selecting a version. The advisory currently lists **no patched version**; npm's `fixAvailable:true` is not proof of a fixed compatible release. Do not introduce shared caching of authenticated/private responses. [Advisory](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). |
| `sharp@0.35.4` — high; Astro → sharp | Crafted SVG decoding can cause memory corruption and, under specific glibc Linux runtime conditions, possible RCE. This matters to Ubuntu CI if malicious SVGs enter an image-processing path. The new renderer serves local files directly and accepts raster paths; the documentation SVGs are inert and are not submitted to sharp. No matching new decode path identified. Local macOS results do not certify Linux safety. | Review an Astro-compatible lock update to **sharp ≥0.35.5**, including the actual bundled/system librsvg (patched **2.63.2**), and rerun Linux image/build checks. Continue reviewing incoming assets; do not accept arbitrary SVG uploads. [Maintainer advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w). |
| `source-map-js@1.2.1` — high; Astro → magicast/svgo and Vite → PostCSS | Malicious indexed source-map offsets can block the Node event loop. Relevant to development/build ingestion of untrusted source maps; not executed by static-site visitors. PostCSS imports SourceMapConsumer. The feature adds no source-map input/upload path. | Review a compatible dependency refresh to **≥1.2.2**; inspect all resolved consumers, including bundled copies, then rerun check/build/tests. Treat contributed build inputs as executable/untrusted during review. [Advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). |
| `undici@8.11.0` — high overall, three records; Astro → unifont | Malicious HTTP responses can crash fetch through excessive content encodings; malicious SSE peers can exhaust EventSource memory; mixed-case SRI metadata can bypass integrity checks. The installed unifont dynamically imports undici for proxy dispatch. No fonts/provider configuration, EVENT-001 fetch/EventSource/integrity input or browser Node runtime is introduced; source review found no matching feature path. This assessment does not certify unrelated Node built-in fetch versions. | Review an Astro/unifont-compatible refresh to **8.12.2 or later on the 8.x line**, then verify outbound font/proxy/build behavior. No untrusted SSE/font source should be introduced in this feature. [Fetch DoS](https://github.com/advisories/GHSA-xjj6-f33q-929c), [EventSource DoS](https://github.com/advisories/GHSA-4qv8-2p9j-2685), [SRI bypass](https://github.com/advisories/GHSA-f72v-6w45-q472). |
| `vite@8.3.0` — high overall, six records; Astro → Vite/vitefu | Development-server file-disclosure/custom-middleware issues and editor-launch command/argument injection. Windows/WSL conditions apply to the editor advisories; file-disclosure cases can affect an exposed non-Windows dev server. No Vite server is deployed to Pages; Astro config adds no host exposure/custom middleware. The isolated acceptance server is Python bound to localhost, not Vite. Developer exposure remains relevant. | Review an Astro-compatible Vite refresh to **≥8.3.3** on the installed line; ensure editor fixes are incorporated. Until reviewed, keep dev servers local and do not expose editor endpoints. No host/security option was changed here. [File access](https://github.com/advisories/GHSA-rq7h-c2jc-7f22), [Wasm disclosure](https://github.com/advisories/GHSA-vfpm-58rq-9qcg), [Custom middleware](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), [Editor existence bypass](https://github.com/advisories/GHSA-587h-7wmj-h5pm), [Windows escaping](https://github.com/advisories/GHSA-698v-4r3x-3vcv), [Editor flags](https://github.com/advisories/GHSA-r825-w8mm-5pxw). |
| `zod@4.6.5` — high; Astro/@astrojs/sitemap → Zod, directly reused through astro/zod | Oversized invalid collections can exhaust memory during validation. **The new showcase does use this affected package**, on reviewed local configuration at build time; root event/people/record arrays are not size capped. There is no HTTP or raw-registration validation endpoint and no Zod browser bundle. A malicious configuration contribution could still disrupt CI, so this is not described as unused. | Prioritize review of a compatible lock refresh to **≥4.6.6**, then rerun all schema/contract/build tests. Any future untrusted-input integration needs independent byte/collection limits and authorization. No limits or dependency changes added during this review. [Advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). |
| `fast-uri@3.1.8` — moderate overall, four records; @astrojs/check → language servers → AJV | Scheme decoding, host canonicalization and relative/suffix normalization can defeat downstream URI policy when attacker-controlled URIs are normalized and then trusted/rendered. This copy is in the diagnostics toolchain; EVENT-001 external links use WHATWG URL validation, not fast-uri. No affected runtime link-normalization path identified. | Review a compatible diagnostics-toolchain refresh resolving **≥3.1.9** on 3.x, rerun type checks and verify all language-server/AJV consumers. [Scheme](https://github.com/advisories/GHSA-w74x-v6f9-j3xg), [Host](https://github.com/advisories/GHSA-wjr9-j795-jxcr), [Relative path](https://github.com/advisories/GHSA-xhq7-xmqj-769h), [Suffix](https://github.com/advisories/GHSA-333x-w4r6-6crp). |

A separate, focused dependency remediation review should verify package release notes/constraints, update only compatible resolved versions, inspect the resulting lock diff and rerun the same gates including audit. Do not use `npm audit fix --force`, silence advisory checks or infer an accepted exception from this report. No `npm install`, `npm update`, override or audit-fix was run here. The existing CI workflow has no audit or lint step and no pull_request trigger; that is a coverage limitation, not permission to ignore this failed local audit. No remote CI run is claimed.

### Acceptance and PR readiness decision

**Ready for PR code/security review after explicit commit/push approval; not fully security-accepted or approved for merge/release.** Functional scope and applicable configured check/build/test/browser gates pass. No feature-code defect requiring a change was found in the exercised scope. The requested audit remains a failed/open check and is an explicit blocker to an unqualified all-gates-pass acceptance. This review grants no security exception. Remediation or an explicitly authorized risk decision must resolve that acceptance status; commit/push approval alone is not such a waiver.

The three partners stay hidden. Official role/logo/copy/consent approval and the event timezone remain external publication prerequisites, with date-gated records failing closed. Existing legacy empty-slot/partner/roster copy remains accurate for today's empty production showcase; review that surrounding editorial copy when real approved content is introduced. Static scheduling/expiry/withdrawal still requires rebuild/deployment and cannot revoke cached/downloaded copies. Local Chrome evidence is not full screen-reader, physical-device, cross-browser or WCAG certification. No production release, private-roster verification, external Form change, new CI gate or approved announcement is claimed.
