# UX-002 — Homepage experience review

Recorded 2026-10-26. Status: **local implementation ready for review**, not staged,
committed, pushed, merged or deployed. Task remains open until separately authorized
review/delivery and actual live verification. No next development task started.

## Prerequisite and Git evidence

- Original root `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`;
  origin `https://github.com/shubh-techie/AeglysAI-Portal.git`.
- Fresh main/worktree HEAD `6f56ec09a4556143e43d268fed24237cabb20bfd`.
- Isolated worktree `/private/tmp/aeglysai-portal-ux-002`;
  branch `feat/AEGLYSAI-PORTAL-UX-002-homepage`.
- PR #27 SEC-002-DOC merged at `3cd9d194463fa9d955f8001124cb08500fd50242`.
  PR #28 2027 experience merged at the fresh main SHA above.
- Pages run [40385253949](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40385253949)
  and corresponding deployment report success for `6f56ec0...` at https://aeglysai.com/.
  Cache-bypassed live `/hackathons/2027/` returned HTTP 200 and its coming-soon content
  and Hackathon navigation markers. This is baseline verification, not a UX-002 deployment.
- Original checkout, banner and prior worktrees preserved; original checkout starts at
  `a5cab8330ab6113121b3f5a0d5807e131e51db9c`. No prohibited repository changes,
  reset/clean/stash/history rewrite, staging, commit, push, PR, dispatch, merge or deploy.

## Design and exact scope

Existing research identity, approved copy, conceptual SVG/architecture markup, media
attribution and conditional presentation cards remain intact. The change reuses Layout,
ModelCard, ArchitectureDiagram, MediaCarousel, PresentationCard and existing semantic
light/dark colors. No new image, font, script, dependency, external service or framework.

Homepage-only CSS strengthens hero type/readability/CTAs, visual panel rhythm, model
cards and planned-state differentiation, diagram text/mobile flow, section spacing,
full media headlines, wrapping 44px carousel controls, presentation consistency and
closing-panel spacing. It lives in one uniquely identified inline block loaded only
on the homepage. Shared CSS and component files are untouched.

Only two content blocks are added: a research-boundary note and community/event cards.
The note distinguishes separate-repository implementation from independent validation
and explicitly states Model D is planned, non-enforcing, `enforcement_authority=NONE`,
not a production authorization mechanism. Community discovery links the existing
2026 program, approved public 2027 coming-soon page and community route without
registration, dates, prizes, affiliation, adoption or commercial-readiness claims.

Exact proposed file inventory:

1. `src/pages/index.astro` — two additive blocks and homepage-only CSS; original markup retained.
2. `scripts/community/homepage-preservation.mjs` — removes exactly these three identified additions for historical byte guards.
3. `scripts/community/homepage.test.mjs` — three tests for full original-homepage restoration, all other route hashes, research boundaries and approved discovery/media preservation.
4. `scripts/community/fixtures/homepage-baseline.json` — pinned untouched `6f56ec0` homepage hash and 27 non-home route hashes, captured before changes were built.
5. `scripts/community/homepage.browser.mjs` — baseline/revised screenshot and homepage interaction matrix, built-in CDP and existing Chrome only.
6. `scripts/community/hackathon-motion.test.mjs` — apply narrow homepage helper only to historical index comparison; retain original fixture/content/CSS guards everywhere.
7. `scripts/community/research-navigation.test.mjs` — same homepage-only restoration for the historical outside-header comparison; all navigation assertions retained.
8. `docs/specs/SPEC-024-homepage-experience.md` — requirements, exclusions, acceptance and evidence links.
9. `docs/specs/README.md` — specification link.
10. `docs/DEVELOPMENT_LOG.md` — chronological append.
11. `docs/ux/UX-002-REVIEW.md` — this review, validation, limitations and delivery plan.

No speculative architecture decision or second design system warrants a new ADR.

## Preservation and performance evidence

- Independent test proves every original homepage HTML byte is restored by removing
  exactly two additive content blocks and the identified CSS block. No old fixture
  was regenerated, old content removed, status promoted or script allowance expanded.
- All **27 non-home routes are byte-identical** to the untouched 28-page build,
  including current navigation, 2026/2027 events, research pages, approved speaking
  pages, media page and showcase. Existing historical guards/consent/schema/privacy
  tests still run in the full suite.
- No shared component, global CSS, header/controller, footer, source data, public asset,
  research artifact, 2026 challenge/forms/dates/rubrics, dependency/lock or workflow change.
- Existing hero SVG and image dimensions/lazy-loading conventions stay unchanged.
  No extra image/font/network requests or JS initializer introduced by this change.
  Added homepage markup/CSS increases its HTML payload; no new measured production
  performance/Lighthouse/Core Web Vitals score or universal CLS guarantee is claimed.
- Full approved media headlines are visible; the existing non-autoplay carousel still
  works by keyboard, pointer, touch/scroll and without JS. Existing presentation
  visibility/attribution is kept byte-for-byte; no invitation is promoted to a delivery.

## Validation actually executed

Node **24.21.0**, npm **11.19.0**, macOS, `ASTRO_TELEMETRY_DISABLED=1`.
Fresh `npm ci` passed with the real unchanged lock. Pinned offline validator environment
reused read-only from CI-001. Built untouched baseline before modifying emitted output;
then ran check, production build and complete tests on the revised source.

| Check | Actual outcome |
| --- | --- |
| Astro check | PASS: 133 files, zero errors/warnings/hints |
| Production build | PASS: 28 static pages |
| Complete automated suite | PASS: **69/69**, including three new homepage tests and existing 2026/2027/privacy/schema/route/navigation checks |
| Before homepage browser | PASS: **14** width/theme cases, zero runtime exceptions |
| After homepage browser | PASS: **28** width/theme/JS/no-JS cases, zero runtime exceptions |
| Existing Research/Hackathon navigation browser | PASS: **28 cases**, seven widths/both themes/JS/no-JS, 2027 route, keyboard/touch/Escape/Close/backdrop/focus/44px/breakpoint checks, zero exceptions |
| Existing 2026 Chrome regression | PASS at 1440/768/390; six cards, nine form links, qualification/timeline/judging, pause/reduced/no-JS, no overflow, observed CLS 0 |
| Dependency audit | Exit **1**, one high cache finding; not security-cleared |
| Whitespace, new doc links, bounded credential/scope checks | PASS |

Homepage browser widths: **320, 375, 390, 430, 768, 1024, 1440**, light/dark.
Checks cover overflow, single h1, four models, six media articles, diagram disclaimer,
new research/community accessibility, real skip-link keyboard activation/focus,
carousel Home/End, reduced-motion scroll, 44px new CTAs and no-JS reading/discovery.
Initial new browser harness focus assertion ran without keyboard modality and failed;
corrected the harness to send Tab and wait for the exact navigation before asserting
focus-visible. Untouched baseline then passed all 14 cases. No application change
was used to hide a baseline harness error.

Evidence: ignored `.community-drafts/ux-002/` in this worktree, including baseline/
check/build/test/audit logs, `before/results.json`, `after/results.json`, navigation/
hackathon logs and canonical review patch/manifest. Baseline API and live-2027 proof
also retained in original checkout's ignored `.community-drafts/ux-002/`.

Before/after full-page screenshots are paired by `before/<width>-<theme>.png` and
`after/<width>-<theme>.png`; after no-JS images end `-no-js.png`. Inspected desktop/dark
before and after, mobile/light after and the community/architecture region. Convenience
previews `before-1440-dark-preview.png`, `after-1440-dark-preview.png`,
`before-390-light-preview.png`, `after-390-light-preview.png` are top crops from those
actual captures, not regenerated mockups. Raw screenshots are local review evidence,
not extra public assets or modified branding.

## Security and accessibility disposition

Existing `http-cache-semantics@4.2.0` high cache advisory remains **OPEN/disputed**;
Magicast 0.5.5's embedded source-map-js 1.2.1 concern remains **OPEN** separately.
No security-owner acceptance, audit waiver/override/suppression, dependency update or
control bypass. Merged SEC-002 security documentation remains unchanged.

Browser/AX-tree/emulated viewport evidence does not establish manual screen-reader,
physical-device, Safari/Firefox or universal WCAG certification. Existing theme tokens
and semantic landmarks/focus states are reused; new markup is static and adds no
animation. Existing carousel/global reduced-motion behavior is retained. Manual AT,
cross-browser and actual production responsiveness remain unverified. Local macOS
checks do not substitute for Ubuntu-hosted CI or live deployment. Temporary browser/
server processes are stopped by harness finalizers.

## Proposed controlled delivery

Commit and PR title: `feat(portal): refine homepage experience`.
Base `main`, head `feat/AEGLYSAI-PORTAL-UX-002-homepage`.

Prepared PR description:

> Refine the research-first homepage using existing components and semantic theme
> tokens: clearer hero and CTAs, consistent model/cards/sections, readable mobile
> architecture and media, explicit non-enforcing Model D boundary and approved event
> discovery. Preserve every original homepage byte after removing the three explicit
> additions, and keep all 27 other routes unchanged. No navigation, dependency, assets,
> security controls or event workflow changes; no new runtime script or service.
>
> Check passes with zero diagnostics; 28-page build and 69/69 tests pass. Before/after
> seven-width theme screenshots and homepage JS/no-JS checks pass; existing event and
> navigation regressions are documented. High cache and embedded Magicast residuals
> remain open without acceptance. Safari/Firefox/manual AT and actual hosted/live
> verification remain unverified.

Stop before staging/commit/push pending review of exact inventory and canonical diff
hash. After explicit authorization, verify the same scope/hash, commit once, normal
push and one PR. Obtain review/applicable CI and separate release/merge permission.
The existing Pages workflow triggers main/manual, not PR pushes; no missing check is
reported as a passing hosted result. After authorized history-preserving merge, record
actual main SHA, Pages artifact/deploy success and cache-bypassed live desktop/mobile
homepage, both menus, themes/no-JS and event routes. Only then close UX-002.
