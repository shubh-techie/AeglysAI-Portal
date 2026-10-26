# REG-001 / REG-001A review checkpoint

Recorded 2026-10-26. IMPLEMENTED locally; no staging, commit, push, PR, merge or
deployment. CONTENT-001 not started.

## Verified baseline and environment

- Fresh origin/main and task HEAD: `c85f80e5662d5d429ed098b260c6dc7a427edb65`.
  [PR #31](https://github.com/shubh-techie/AeglysAI-Portal/pull/31) actually merged at
  this SHA; [Pages run40403863274](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40403863274)
  and deployment7343940281 succeeded at the same SHA. Official hackathon URL returned200.
- Prior REG-001A discovery found no REG-001 branch locally/remotely. The subsequent
  REG-001 instruction explicitly authorized one fresh branch, resolving that blocker.
  Created only `feat/AEGLYSAI-PORTAL-REG-001-registration-channels` from verified main.
- Primary `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal` began clean. Verified
  primary PID75231/status before native stop for branch switching; fast-forwarded main,
  created the requested branch and restarted strict localhost:4321 under Node24.22.1,
  npm11.19.1, Astro7.3.4. Current primary listener PID85700,127.0.0.1:4321.
  Existing branches/worktree directories/ignored work/assets/banner preserved; no
  unrelated repository, shell/IDE launcher, dependency or security-control changes.

## External destination verification

Public signed-out observations on2026-10-26, not guarantees of future availability.
Web fetch tool could not access these destinations; direct HTTPS and isolated local
Chromium supplied the evidence. No signup, login, Discord join, payment or form submission.

| Destination | Verified observation | Consistency and limit |
| --- | --- | --- |
| [Unstop](https://unstop.com/o/UMpqYS1) | HTTPS200 shell; signed-out Chromium resolves to `https://unstop.com/hackathons/aegython-2026-aeglysai-1777958`, title Aegython2026, AeglysAI listing and registration controls | Six challenge areas, free participation and1–4 teams align. Platform prize and registered-counter claims are not adopted or verified as Portal facts. Full registration/export/API capability not tested. |
| [Luma](https://luma.com/1vmb4bna) | HTTPS200; public AEGYTHON2026 listing and registration entry; links back to official Portal | Six areas, free participation,1–4 members subject to qualification/selection align. Public metadata dates2026-11-06 through2026-11-28, Ranchi finale/offline mode and national scope differ from Portal's pending dates/venue/eligibility. No Portal fact changed to match them. |
| [Discord](https://discord.com/invite/rNdTbezkg) | Invite and unauthenticated API200; matching invite code, server `aeglysai`; API expiry2026-11-14T13:57:16+00:00 | Snapshot supports current invite availability, not successful joining or continuing validity. Owner must renew/recheck before expiry or later release. |
| [Official Portal](https://aeglysai.com/hackathons/) | HTTPS200 on verified deployed main | Official Forms, qualification, selection, rules and pending event facts remain authoritative. |

The on-page notice explicitly says external dates/location/eligibility/prize details
may differ and the official page governs. External corrections need separate owner
operations; this task does not edit those services. No listing-host identities, registration
counts, prizes, attendee identities or external schedules are imported into the UI.

## Exact proposed 16-file inventory

| File | Purpose |
| --- | --- |
| `docs/DEVELOPMENT_LOG.md` | Append actual baseline/change/validation/review facts |
| `docs/hackathons/REG-001-REVIEW.md` | This report, provider evidence, scope, limitations and proposed PR |
| `docs/hackathons/REGISTRATION_RECONCILIATION.md` | PLANNED private operator reconciliation specification |
| `docs/specs/README.md` | Index SPEC-026 |
| `docs/specs/SPEC-026-registration-channels.md` | REG-001 and REG-001A scope/acceptance |
| `scripts/community/hackathon-motion.test.mjs` | Narrow additive HTML/source restoration in existing historical guard |
| `scripts/community/homepage.test.mjs` | Same restoration only for changed hackathon route |
| `scripts/community/research-navigation.test.mjs` | Same restoration only for changed hackathon route |
| `scripts/community/registration-baseline.json` | Fresh-main landing/source and27-route preservation hashes |
| `scripts/community/registration-channels.browser.mjs` | Local responsive/theme/keyboard/no-JS/accessibility checks |
| `scripts/community/registration-channels.test.mjs` | Four link/authority/accessibility/preservation test groups |
| `scripts/community/registration-preservation.mjs` | Remove only the two uniquely identified additive regions/imports/calls |
| `src/components/hackathons/CommunitySupport.astro` | Reusable Discord CTA/help card with clear non-registration disclaimer |
| `src/components/hackathons/RegistrationChannels.astro` | Unstop/Luma section plus contextual community support |
| `src/data/hackathonChannels.ts` | Single configured owner-supplied URLs, including one reused Discord URL |
| `src/pages/hackathons/index.astro` | Two additive imports/calls; existing content retained |

No package/lock/config/CI/security-file changes; no new styles, runtime scripts, embeds,
backend, database or dependencies. No private Sheets/registration/participant data
accessed. All current Forms, seven-step qualification, six challenges, team rules,
judging/dates, homepage,2027 status and navigation retained. Historical fixture bytes
are not regenerated or removed: original landing HTML/source reconstruct exactly after
removing the two authorized additions, and every other27 route remains byte-identical.

## Validation and browser evidence

- Node24.22.1/npm11.19.1/Astro7.3.4; existing pinned offline validators reused read-only
  via `AEGLYSAI_CONTRACT_PYTHON=/private/tmp/aeglysai-portal-ci-001/.community-drafts/contract-venv/bin/python`.
- Astro check:144 files, zero errors/warnings/hints. Production build:28 pages.
  Full suite:86/86, including four new REG groups and existing2026/2027/privacy/registry
  and navigation tests. Only `/hackathons/` HTML changes; after narrow restoration its
  HTML/source match fresh main exactly. Other27 routes are unchanged.
- New Chromium matrix:16 cases (320/390/768/1440 × light/dark × JS/no-JS), zero runtime
  exceptions. Tab order through Unstop/Luma/Discord, visible focus outlines,44px minimum
  link target height, both named Discord links in the accessibility tree, unique context
  IDs, system theme fallback and no horizontal overflow passed. No external navigation
  or private response collection during these checks.
- New browser evidence `.community-drafts/reg-001/browser-1793050725513/`: results JSON
  plus registration/support screenshots at all four widths in both themes. Inspected
  `320-light-channels.png`, `1440-dark-channels.png`, `390-dark-support.png`; desktop
  two-column/mobile stacked cards and wrapping CTA/focus treatment are readable. The
  existing landing intentionally stays dark under global light/dark themes.
- Existing2026 interaction harness:1440/768/390 passed, six cards, nine existing Form
  links, qualification/timeline/judging/pause/reduced/no-JS, zero overflow and observed
  CLS0. Evidence `.community-drafts/design-005`, log `.community-drafts/reg-001/hackathon-browser.log`.
- Full Research/Hackathon navigation matrix:28 cases passed, zero runtime exceptions;
  generated2027 and all shared navigation bytes also remain unchanged.
- Initial full-suite run caught the additional historical UX navigation hash guard;
  added the same narrowly scoped restoration rather than updating old hashes. Initial
  browser harness checked no-JS theme background on transparent html; corrected it to
  the actual body background, then all16 passed. No product workaround or global CSS change.
- Local links/paths, all tracked/new-file whitespace, exact inventory, empty index and
  bounded source/output privacy checks are required before final canonical hash recording.
  Local evidence and canonical patch/hash live only in ignored `.community-drafts/reg-001`.
  The hash is supplied in the review response/manifest, avoiding a self-referential file.

## Privacy, reconciliation, security and release limits

Reconciliation is a future operator specification, not an implemented import. Provider
API/export access, permitted fields/processing, notice/consent, retention, ownership
verification and operator change approval are prerequisites. Prefer authorized opaque
event-scoped matching references; provider IDs alone do not deduplicate across channels.
Do not default to personal contacts or fuzzy names. Ambiguous matches stay private for
human review; matching does not set qualification, selection, team or submission state.
No master Sheet modification, new database, automatic counters or combined participation
claims. Discord membership is excluded from registration matching.

Unsuppressed audit exits1 with one high `http-cache-semantics`4.2.0 finding. Separately,
Magicast0.5.5 still embeds source-map-js1.2.1; external module remediation does not close
that residual. Both [SEC-002 findings](../security/SEC-002-SECURITY-ASSESSMENT.md) remain
OPEN without waiver/suppression/security acceptance. Dependencies/security controls unchanged.

External availability/content can change; recheck before release. Link/metadata checks
do not prove registration completion, identity, API/export support, host authority,
provider privacy policy adequacy or reconciled counts. The Portal does not transmit
applicant fields to those links or embed external scripts; users leave for provider
sites explicitly. Public-source scan is bounded, not exhaustive security certification.
No hosted REG-001 CI, Safari/Firefox/physical-device/manual screen-reader certification,
live registration completion or live new-link deployment verification claimed.

## Proposed PR

Title/commit: `feat(portal): add external hackathon registration channels`.

> Add Unstop and Luma discovery links beside the2026 registration/qualification journey,
> plus the owner-supplied Discord CTA and reusable FAQ support card. Keep official Forms,
> qualification and organizer selection authoritative; make external destinations and
> inconsistent external event facts explicit without changing approved Portal content.
>
> Reuse existing responsive/theme/focus styles and a single URL configuration. Document
> a future authorized, privacy-minimizing reconciliation process; no provider data import,
> master Sheet change, backend, dependency, counts or2027 registration change.
>
> Validation: check zero diagnostics,28-page build,86/86 tests, original landing content
> restored exactly after two additions and27 other routes byte-identical;16 new Chromium
> theme/width/JS cases, existing2026 regressions and28 navigation cases pass. External verification is signed-out
> snapshot evidence only. Audit exits1; cache and embedded Magicast findings remain OPEN.

Stop before staging/commit. Delivery requires explicit approval of exact inventory/hash;
push/draft PR/merge/deployment require their respective authorizations. CONTENT-001 stays
unstarted until REG-001 completes.
