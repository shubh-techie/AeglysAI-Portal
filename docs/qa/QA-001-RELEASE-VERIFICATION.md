# QA-001 — Release verification

Recorded 2026-10-26. Status: verification performed; **awaiting QA review, not closed**.
No staging, commit, push, merge, deployment, application fix or next development task.

## Recommendation

**The deployed static Portal is functionally verified in the tested environment.
Security approval remains blocked, and real showcase publication remains blocked.**
Do not describe passing deployment/tests or this report as acceptance of the cache or
embedded Magicast risks. Obtain explicit security-owner disposition after remediation
or separately authorized review. CONTENT-001 still requires actual content/consent/rights
and exact snapshot-owner approval before any real publication. No rollback or outage is
inferred from these governance blockers; the observed production site is serving correctly.

No new application regression was reproduced. Known security/operational issues and
newly documented optimization/tooling observations are itemized with reproduction steps
in [findings](QA-001-FINDINGS.md). Proposed fixes are separate tasks, not started here.

## Verified baseline and preservation

| Item | Actual evidence |
| --- | --- |
| Repository | `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal` |
| Origin | `https://github.com/shubh-techie/AeglysAI-Portal.git` |
| Fresh main and QA HEAD | `f7e9c12414c2795d7ddcdbdcae965d9406101fbb` |
| QA branch | `qa/AEGLYSAI-PORTAL-QA-001-release-verification` |
| PR #33 | Merged2026-10-26T22:22:12Z at the exact main SHA |
| Hosted Pages run | [40411897198](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40411897198), success at that SHA |
| Deployment | GitHub deployment7345053217, success2026-10-26T22:23:38Z, https://aeglysai.com/ |
| Local runtime | Node24.22.1, npm11.19.1, Astro7.3.4, macOS arm64 |
| Active source server | Primary checkout, QA branch, observed PID98930, NVM Node24 executable,127.0.0.1:4321 |

Primary started clean. Verified previous primary PID94304/cwd/runtime before native
stop for branch switching; fast-forwarded main, created only the requested QA branch,
then restarted the primary strict-port source server. No history rewriting, cleanup,
other-repository operation or source/dependency/config/security mutation. Historical
worktrees/branches, source/untracked user work and assets/banner retained.

**Evidence preservation limitation:** existing harnesses use fixed ignored output paths.
Reruns refreshed generated navigation, homepage and2026 screenshots/results in those paths.
Earlier per-task logs and historical worktrees were not changed. Current outputs were
copied to `.community-drafts/qa-001/existing-harness-evidence` without Chrome profiles;
pre-run copies of overwritten generated artifacts were not captured. This does not
establish preservation of every earlier generated screenshot. See QA-L04 and the
[reproduction notes](QA-001-REPRODUCTION.md); future runs should isolate output roots.

## Results and coverage

| Verification | Observed result |
| --- | --- |
| `npm run check` | 144 files, zero errors/warnings/hints |
| `npm run build` | 28 pages |
| `npm test` | 86/86, zero failures/skips; registry13 groups include consent, withdrawal, exact digest, invalid input and isolated approved/rejected/unpublish builds |
| Dependency consistency | `npm ls --all --json` exit0; manifest matches root lock;277 installed package versions match lock; no missing non-optional package |
| Independent all-route Chromium | 28 routes × seven widths × two themes × JS/no-JS =784 observations; zero assessed functional failures |
| Homepage suite | 28 width/theme/JS cases; hero/discovery/media/keyboard/reduced motion; zero exceptions |
| Navigation suite | 28 cases; Research's three destinations, both Hackathon destinations, drawer focus/Tab/Escape/backdrop/resize/no-JS; zero exceptions |
| 2026 interactions | 1440/768/390; six cards, nine Form links, qualification/timeline/two-round judging/pause/reduced/no-JS; observed CLS0 |
| Registration/Discord suite | 16 cases at320/390/768/1440, both themes, JS/no-JS; focus/target size/AX names/secure links pass |
| Synthetic showcase suite | Eight viewport/theme cases plus no-JS; categories/filter/keyboard/touch/reduced motion/fallback; zero exceptions |
| Production routes/assets | All28 HTML URLs200 and byte-identical to local build;11 referenced first-party asset HEADs200; six third-party media-image GETs200 |
| Broken links and SEO | No missing internal files/fragments; no new-tab anchors missing noopener; all external anchor URLs HTTPS;28 unique titles/descriptions and27 unique canonical URLs |
| Custom404 | Unknown production path returns404 with custom body;404.html intentionally noindex/follow with no canonical |
| Public Forms | All seven configured responder GETs200; no data submitted; collection/private workflows not certified |
| Text contrast sample | 608 above-fold solid-background samples pass applicable sampled contrast thresholds;188 complex samples excluded, no full WCAG certification |
| Production lab performance | 24 unthrottled cache-disabled samples; bounded FCP/LCP/layout-shift data, not field CWV or Lighthouse; [method/results](QA-001-PERFORMANCE.md) |
| Privacy/credentials | 357 tracked paths enumerated; bounded readable-file credential scan no matches;28 HTML pages no contact/private-Workspace/draft/synthetic markers tested; no snapshot/approval created |
| Audit | Exit1, one high http-cache-semantics finding; Magicast embedded residual separately OPEN |

The raw independent sweep initially flagged all28 views of404.html for lacking a
canonical. `404.astro`, Layout and generated noindex metadata establish that intentional
exception. Raw results remain intact; assessed results remove only that incorrect
harness expectation, and the reproduction harness now tests404's noindex condition.
This was a QA expectation correction, not an application fix or suppressed site defect.

Detailed coverage: [route matrix](QA-001-ROUTE-MATRIX.md),
[accessibility](QA-001-ACCESSIBILITY.md), [performance](QA-001-PERFORMANCE.md),
[security/issues](QA-001-FINDINGS.md), [reproduction](QA-001-REPRODUCTION.md).

## External and publication state

Unstop and Luma returned200; signed-out Chromium resolves the Unstop short link to
the Aegython2026 listing with registration controls. Luma still exposes Nov6–28 dates,
Ranchi/offline/national metadata; Unstop exposes prize/counter claims. These are not
approved Portal facts. The official page's qualification/selection authority and
discrepancy notice remain intact; no imported counts, private registrations or new dates.

Discord API returned200 for the configured invite and server `aeglysai`. Expiry remains
**2026-11-14T13:57:16+00:00**. Link availability is a snapshot, not a guarantee of joining
or future validity. No signup, join, login, private export or Sheet action was performed.

The current showcase is correctly empty. Both production registry inputs remain absent,
existing partner drafts remain hidden, and no real appointment/endorsement is inferred.
Schema/asset/privacy gates, independent exact-digest owner approval, revision/ID sets,
expiry/revocation, synthetic rejection and replacement withdrawal were reviewed and
tested. JSON attestations still require trusted human review; static withdrawal needs
successful redeployment and may lag caches. CONTENT-001 is not closed by this QA.

## Limits and delivery boundary

Browser: headless Chrome155.0.8059.86. Installed Safari26.6.2 WebDriver probe timed out
before a usable session was obtained; no automation setting enabled/changed. Firefox
not installed at checked locations/command path. No physical device, manual screen-reader,
Safari/Firefox behavioral certification, field CWV/INP, Lighthouse score or exhaustive
penetration/privacy/accessibility assessment. A fresh local clean install/Linux replica
was not performed; current installation/lock and hosted deployment success were checked.

Proposed exact documentation scope: this report, route matrix, accessibility assessment,
findings, performance observations, reproduction appendix and `docs/DEVELOPMENT_LOG.md`.
No application fixes or new tests are proposed. Canonical documentation diff/individual
file hashes and local evidence checksums are frozen in ignored
`.community-drafts/qa-001/review-manifest.json`; hash is reported separately to avoid
self-reference. Stop before staging/commit/push. QA-001 requires review and closure
before any next development task.
