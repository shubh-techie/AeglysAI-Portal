# HACK-2027-001 — Coming-soon page and navigation review

Recorded 2026-10-26. Status: **local implementation ready for review**. Not staged,
committed, pushed, submitted as a PR, merged or deployed. Task remains open until
separately authorized delivery and live verification.

## Verified repository, prerequisite and baseline

- Original root: `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
- Origin: `https://github.com/shubh-techie/AeglysAI-Portal.git`.
- Fresh main/worktree HEAD: `3cd9d194463fa9d955f8001124cb08500fd50242`.
- Branch: `feat/AEGLYSAI-PORTAL-HACK-2027-001-coming-soon`.
- Isolated worktree: `/private/tmp/aeglysai-portal-hack-2027-001`.
- PR #27 is actually merged at that main SHA, recorded 2026-10-26T18:50:38Z.
  It is no longer an open prerequisite. Pages run
  [40381349366](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40381349366)
  and deployment for that same SHA subsequently report success at https://aeglysai.com/.
  This is baseline deployment evidence, not deployment of the local 2027 implementation.
- Original checkout preserved at `a5cab8330ab6113121b3f5a0d5807e131e51db9c`; other
  worktrees/branches preserved. No reset/clean/history rewrite/prohibited-repository work.

## Implementation and exact inventory

1. `src/pages/hackathons/2027/index.astro`: new static `/hackathons/2027/`, existing
   Layout/SEO/theme tokens, responsive coming-soon panel, inert decorative rings/year,
   approved copy and 2026 link. No event promises, dates, registration or countdown.
2. `src/components/Header.astro`: two Hackathon links (AEGYTHON 2026 `/hackathons/`,
   Hackathon 2027 `/hackathons/2027/`) rendered by the same disclosure markup and styling
   as Research, with unique controls and current-page state.
3. `src/components/mobile-navigation.js`: generalize existing disclosure operations
   to both groups. Same mobile dialog, Escape/Close/backdrop, focus trap/restore,
   breakpoint cleanup and native fallback. No extra initializer, bundle or framework.
4. `scripts/site.test.mjs`: include new route in existing metadata/link/sitemap/script
   checks and account for its single active header destination.
5. `scripts/community/research-navigation.test.mjs`: permit only the new 2027 header
   destination in the historical link inventory; preserve all 27 outside-header hashes,
   Research destinations, current-page and native disclosure assertions.
6. `scripts/community/hackathon-2027.test.mjs`: two new behavioral tests for 28 pages,
   canonical/sitemap, announcement-only copy, no registration/date claims, exact submenu,
   unique controls and active-page semantics across all generated pages.
7. `scripts/community/research-navigation.browser.mjs`: extend existing harness for
   both groups, new page/screenshots, new submenu keyboard/touch/escape/focus/AX/44px
   checks and no-JS navigation to 2027 and back to 2026; preserve original Research tests.
8. `docs/specs/SPEC-023-hackathon-2027-coming-soon.md`: scope and acceptance specification.
9. `docs/specs/README.md`: link to new specification.
10. `docs/DEVELOPMENT_LOG.md`: chronological append.
11. `docs/hackathons/HACK-2027-001-REVIEW.md`: this review and delivery evidence.

Research's existing internal CSS class names are reused for the shared disclosure
markup rather than adding a parallel navigation system. The 2027 copy is file-owned
page content; no speculative event dataset, CMS or backend is needed. No ADR is added
because the existing static route/navigation architectural decisions remain unchanged.

## Preservation and safety

All original 27 routes remain generated; only the authorized header changes across
them. Historical outside-header/content/style fixtures remain unchanged and pass.
Existing 2026 page/data/component sources, six challenge definitions, all form and
qualification links, dates, rubrics, EVENT showcase, research content, theme system,
assets/banner, dependencies/lock and workflow/security configuration have no diff.
Architecture, Speaking, About and Community destinations retain their original URLs.
No private roster, registration responses, restricted research or unapproved product
claims are introduced. Three configured partner announcements remain hidden drafts;
existing consent, publication, timezone and suppression tests still pass.

## Validation actually performed

Node **24.21.0**, npm **11.19.0**, macOS; `ASTRO_TELEMETRY_DISABLED=1`.
Fresh `npm ci` succeeded on the unchanged lockfile; existing pinned contract-validator
venv reused read-only from CI-001. Application commands executed in required order:

| Check | Result |
| --- | --- |
| Astro check | PASS: 130 files, zero errors/warnings/hints |
| Production build | PASS: 28 pages, including `/hackathons/2027/` |
| Complete automated tests | PASS: **66/66**, including two new 2027 tests |
| Full Chromium navigation/page matrix | PASS: **28 cases**, zero runtime exceptions |
| Existing 2026 hackathon browser regression | PASS: 1440/768/390px, six cards, nine forms, qualification/timeline/judging, pause/reduced motion/no-JS, no overflow |
| Dependency audit | Exit **1**: unchanged one high cache finding; security not cleared |
| Whitespace, local documentation links and exact scope | PASS |

One initial new test assumed Astro's br tag had no scoped attributes; corrected its
matcher to accept generated attributes, then reran the full suite successfully. Initial
64-test run preceded the two new tests. Neither initial result is substituted for the
final 66/66 result. Browser assertions were extended with bounded final checks; see
focused evidence below. No product failure was hidden by removing existing assertions.

Full browser matrix: widths **320, 375, 390, 430, 768, 1024, 1440**, light/dark with
JavaScript and no-JavaScript. Covers compact header, native no-JS Menu/Hackathon/Research
accordions, new-page overflow, Research links, Hackathon destinations, Enter/Space,
touch/pointer, visible focus, Escape/Close/backdrop, focus containment/restoration,
closed-menu traversal, reduced motion, breakpoint cleanup and active destinations.
Local 2026 regression observed CLS about 0.0021 desktop, 0 at tablet/mobile; not a
production performance guarantee. Screenshots inspected at 320px/light and 1440px/dark.

Evidence (ignored, not proposed public source assets):

- `.community-drafts/hack-2027-001/`: install/check/build/test/audit logs, result summary,
  2026 browser log and canonical review patch/manifest.
- `.community-drafts/ux-001a/browser-results.json`: full 28-case result; screenshots in
  `.community-drafts/ux-001a/screenshots/` named `coming-soon-*`, `hackathon-menu-*`,
  `coming-soon-no-js-*` and existing Research/closed-menu views.
- Baseline PR/deployment API evidence retained in original checkout's ignored
  `.community-drafts/hack-2027-001/`.

## Security and accessibility limitations

The cache advisory **GHSA-ch52-4w7c-c8xp**, installed http-cache-semantics 4.2.0,
remains high/open/disputed. Magicast 0.5.5's embedded source-map-js 1.2.1 remains open
separately; external 1.2.2 does not replace embedded code. See merged SEC-002 security
assessment/matrix. No acceptance, waiver, override, audit filter or security bypass.
No dependency or security-control changes were made to obtain green application tests.

Chromium/AX-tree and emulated touch are bounded evidence, not manual screen-reader,
physical-device or universal WCAG certification. Safari/Firefox and actual assistive
technology sessions remain unverified. Shared semantic color tokens and focus indicators
are reused; decorative rings are aria-hidden and new page has no animation. Existing
modal respects reduced motion. Local macOS is not Linux-hosted CI or live deployment.
Temporary verification browsers/servers are stopped by the harnesses.

## Proposed controlled delivery

Commit/PR title: `feat(portal): add Hackathon 2027 coming-soon experience`.
Base `main`, head `feat/AEGLYSAI-PORTAL-HACK-2027-001-coming-soon`.

Prepared PR description:

> Add `/hackathons/2027/` with a theme-aware coming-soon announcement and a link to
> AEGYTHON 2026. Extend the existing Research disclosure template/controller to render
> a Hackathon submenu inside desktop navigation and the current mobile drawer.
> No new framework, dependencies, registration or unconfirmed event facts.
>
> Check passes with zero diagnostics; build emits 28 pages; complete suite passes
> 66/66. Existing 27 routes/content/style guards and 2026 browser regressions pass.
> Chromium covers seven widths, both themes, keyboard/touch, modal focus/dismissal and
> no-JS paths. Current high cache advisory and Magicast embedded residual remain open;
> no risk acceptance or security bypass. Safari/Firefox/manual assistive technology and
> actual hosted/live release remain unverified.

Before staging/commit, obtain explicit review authorization of exact inventory and
canonical diff hash; stop on any mismatch or baseline drift. After authorized commit,
normal push and PR, obtain review and applicable CI before a separately authorized
history-preserving merge. Existing Pages workflow runs main/manual, not PR pushes;
absence of PR checks is not a passing hosted result. Record actual merged main SHA,
Pages check/build/tests/artifact/deploy success, then cache-bypassed live desktop/mobile
submenu and new-route/no-JS verification. Preserve all 2026 content/forms and open
security findings. Only then close HACK-2027-001. No next task begins before closeout.

### Final focused browser evidence

After adding final new-submenu AX-tree name/44px assertions and simplifying the heading
text assertion, ran the final harness logic in an ignored two-width copy (390 and
1440, both themes, JS/no-JS): **eight cases, zero exceptions**, plus breakpoint/current
route checks. The prior complete seven-width run remains the 28-case evidence above;
application source was unchanged between runs. Focused results/screenshots live under
`.community-drafts/hack-2027-001/focused-browser/`, log `focused-browser.log`.
Both groups' existing full-width behavior and the new final bounded assertions pass;
no unexecuted full rerun of the last harness-only additions is claimed.
