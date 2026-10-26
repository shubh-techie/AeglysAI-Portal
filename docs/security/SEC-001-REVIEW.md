# AEGLYSAI-PORTAL-SEC-001 — Dependency remediation review

Recorded 2026-10-26. Status: PARTIALLY REMEDIATED locally, uncommitted. No security waiver, PR, merge, remote CI or deployment. Full EVENT-001 security acceptance remains blocked by the open cache advisory and residual embedded source-map code described below. No feature behavior or event content changed.

## Verified repository and isolation

- Original verified Portal root: `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
- Origin fetch/push: `https://github.com/shubh-techie/AeglysAI-Portal.git`.
- Original branch: `feat/AEGLYSAI-PORTAL-EVENT-001-configurable-showcase`.
- HEAD / implementation baseline: **`bc7c280b30520100d48893c0d0cae597ec67dc7a`**. Local origin/main and read-only upstream main lookup agree. Proposed security branch did not already exist locally or on origin.
- Original worktree: four modified tracked and fourteen untracked EVENT-001 task files, plus the excluded untracked `public/brand/social/AeglysAI Cybersecurity Banner.png`; index empty. package.json and package-lock.json matched baseline. Read the original EVENT-001 report/security dispositions before remediation.
- Created clean branch **`fix/AEGLYSAI-PORTAL-SEC-001-dependency-remediation`** at that baseline using an isolated linked worktree: **`/private/tmp/aeglysai-portal-sec-001`**. Its Git root is the temporary worktree; it is the same Portal repository, not another project. The original checkout remains on the EVENT-001 branch with every original uncommitted file preserved.
- SHA-256 manifest captured all nineteen original changed/untracked paths before work; final comparison matches every path. A separate ignored EVENT-001 regression copy contains the original feature source and tests, using only the security worktree's dependencies. None of those copied feature files belongs to the security diff.
- No prohibited Research, Enterprise or private-recovery repository was targeted. No reset, clean, stash, force push, staging, commit, push, merge, branch overwrite or deployment. The clean branch could be created without disturbing existing work, so the plan-only fallback was unnecessary.

Proposed commit message: **`fix(portal): remediate actionable dependency advisories`**. Commit/push still require explicit approval. No commit hash or PR URL exists.

## Dependency selection and exact scope

All seven initially flagged packages are **transitive declared dependencies**. None is added to package.json. The app directly uses Zod through Astro's existing `astro/zod` export, but Astro/sitemap own its dependency declaration. Direct dependencies remain Astro 7.3.4 and @astrojs/sitemap 3.7.4; dev tooling @astrojs/check 0.9.10 and TypeScript 5.9.3 is unchanged. Framework, configuration, application source, policies and workflows are unchanged.

| Resolved package | Before → after | Reason / dependency path |
| --- | --- | --- |
| `vite` | 8.3.0 → **8.3.3** | Published security patch; Astro → Vite and vitefu peer. |
| `sharp` | 0.35.4 → **0.35.5** | Patched image decoder bundle; Astro optional image dependency. |
| `source-map-js` | 1.2.1 → **1.2.2** | Published source-map DoS fix; Magicast, SVGO/css-tree and Vite/PostCSS consumers. Embedded Magicast copy is separately OPEN. |
| `undici` | 8.11.0 → **8.12.2** | Published HTTP/SSE/SRI fixes; Astro → unifont → undici. |
| `zod` | 4.6.5 → **4.6.6** | Published collection-validation resource fix; Astro and sitemap → Zod. |
| `fast-uri` | 3.1.8 → **3.1.9** | Published URI fixes; @astrojs/check → language server → YAML tooling → AJV → fast-uri. |
| `http-cache-semantics` | **4.2.0 unchanged** | No verified fix for the reported behavior. Astro → remote-image cache helpers. No audit-range-only upgrade. |

The final lock changes **48 existing package entries**, with no package path added or removed: six targets above, **rolldown 1.2.10 → 1.2.11**, fifteen matching Rolldown native bindings, and twenty-six Sharp companion packages. Vite 8.3.3 requires `rolldown ~1.2.11`; Sharp 0.35.5 requires matching 0.35.5 platform binaries and libvips companion 1.3.4. These native entries are necessary companions, including non-macOS platforms, not new product integrations. Package integrity/resolved metadata follows those releases.

All selections satisfy existing parent ranges. package.json, root lock metadata, Astro, sitemap, PostCSS, nanoid, @oxc-project/types and unrelated Prettier peer metadata are unchanged. An initial targeted resolver chose newer patch releases and collateral changes; that exploratory lock was discarded before installation, and resolution was narrowed to the verified minimum fixes. Temporary resolver constraints were removed before final npm ci and npm ls. **No final overrides**, blanket force-upgrade, package addition, audit suppression or dependency-range relaxation. No `npm audit fix` was run. `npm ci` installs the final lock from the unchanged manifest successfully, and npm ls reports a valid dependency tree.

Supporting release evidence: [Vite 8.3.3](https://github.com/vitejs/vite/releases/tag/v8.3.3), [Sharp 0.35.5](https://github.com/lovell/sharp/releases/tag/v0.35.5), [source-map-js 1.2.2](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2), [Undici 8.12.2](https://github.com/nodejs/undici/releases/tag/v8.12.2), [Zod 4.6.6](https://github.com/colinhacks/zod/releases/tag/v4.6.6). Registry metadata also verified each selected release and fast-uri 3.1.9. Undici requires Node ≥22.19.0; validation uses the repository-required Node 24 (24.13.0).

## Advisory matrix

Baseline full audit: exit 1, **six high and one moderate package groups, seventeen advisory records**. Individual advisory severities below retain upstream values rather than applying a group's highest severity to every record. Every package in the matrix is transitive. Path abbreviations: **A** = Astro; **D** = @astrojs/check → @astrojs/language-server → volar-service-yaml → yaml-language-server → AJV. All Node execution is developer/build/CI-side for this static Portal; Node packages are not shipped as a Pages server runtime. Reachability assessments are based on current source/configuration, not a general security guarantee.

| Package / advisory | Severity | Baseline affected version / fixed floor / selected | Dependency path | Exploit prerequisite and Portal runtime/CI exposure | Disposition |
| --- | --- | --- | --- | --- | --- |
| http-cache-semantics — [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) | High | 4.2.0 (range ≤4.2.0); **no verified fix**; retained 4.2.0 | A → cache helpers | Report concerns shared reuse of cookie-bearing stale responses with client max-stale. Maintainer disputes the premise. No authenticated/shared proxy or remote image-processing input is introduced by Portal/SHOWCASE. Cache behavior could matter to future server-side asset processing. | **OPEN/disputed**, not waived. |
| sharp — [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) | High | 0.35.4 (<0.35.5); **0.35.5** | A → sharp | Crafted SVG decode under applicable runtime conditions; possible RCE on glibc Linux. New showcase uses direct local raster image paths, but CI asset processing deserves a patched decoder. | Resolved native package; loaded librsvg **2.63.2** confirmed locally. Linux runtime validation remains unperformed. |
| source-map-js — [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | High | 1.2.1 (≥1.0.0 <1.2.2); **1.2.2** | A → Magicast/SVGO; A → Vite → PostCSS | Untrusted indexed source-map offsets can cause excessive Node work/memory. No public map-ingestion endpoint; contributed build inputs remain a CI trust boundary. | **PARTIAL**: resolved module patched; Magicast's embedded 1.2.1 code remains, see below. |
| undici — [GHSA-xjj6-f33q-929c](https://github.com/advisories/GHSA-xjj6-f33q-929c) | High | 8.11.0 (8.x <8.12.2); **8.12.2** | A → unifont → undici | Malicious HTTP response/early close with excessive content codings can terminate Node. No added feature fetch endpoint/provider; build/network tooling can still encounter remote peers. | Resolved package patched. |
| undici — [GHSA-4qv8-2p9j-2685](https://github.com/advisories/GHSA-4qv8-2p9j-2685) | Moderate | 8.11.0 (8.x <8.12.2); **8.12.2** | A → unifont → undici | Malicious SSE connection can exhaust parser memory; no EventSource feature in Portal. | Resolved package patched. |
| undici — [GHSA-f72v-6w45-q472](https://github.com/advisories/GHSA-f72v-6w45-q472) | Moderate | 8.11.0 (8.x <8.12.2); **8.12.2** | A → unifont → undici | Non-lowercase SRI metadata with attacker-controlled response can bypass integrity checking; no such Portal integration configured. | Resolved package patched; Node built-in fetch is outside npm dependency audit scope. |
| vite — [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm) | High | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite; vitefu peer | Windows editor-path existence bypass combined with injection; no Vite runtime deployed to Pages. Relevant to developer machines. | Resolved package patched. |
| vite — [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv) | Moderate | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite | Windows editor-launch percent escaping and attacker-controlled file/environment conditions. Not a static visitor execution path. | Resolved package patched. |
| vite — [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw) | Moderate | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite | Editor CLI flag interpretation with crafted filesystem entries and applicable editor/WSL setup. | Resolved package patched. |
| vite — [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22) | Moderate | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite | Exposed non-Windows dev server and project path matching a readable system path can disclose files. No host exposure setting introduced; browser harness uses localhost Python static serving. | Resolved package patched. |
| vite — [GHSA-vfpm-58rq-9qcg](https://github.com/advisories/GHSA-vfpm-58rq-9qcg) | Moderate | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite | Reachable dev server and crafted Wasm query can reveal bytes outside fs settings. No dev server deployed to Pages. | Resolved package patched. |
| vite — [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw) | Low | 8.3.0 (8.3.0–8.3.2); **8.3.3** | A → Vite | Applicable custom HTML middleware and unchanged request URL can load hostile script in dev origin. Portal adds no custom middleware. | Resolved package patched. |
| zod — [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) | High | 4.6.5 (<4.6.6); **4.6.6** | A / sitemap → Zod | Oversized invalid collections can exhaust memory. Showcase actually uses Zod on local build configuration; no raw-registration/HTTP input pipeline. Malicious config contributions can affect CI. | Resolved package patched; unchanged consent/schema behavior passes tests. |
| fast-uri — [GHSA-w74x-v6f9-j3xg](https://github.com/advisories/GHSA-w74x-v6f9-j3xg) | Moderate | 3.1.8 (3.x <3.1.9); **3.1.9** | D → fast-uri | Encoded scheme interpreted after normalization can evade policy. Diagnostic toolchain only here; showcase validates links with WHATWG URL. | Resolved package patched. |
| fast-uri — [GHSA-wjr9-j795-jxcr](https://github.com/advisories/GHSA-wjr9-j795-jxcr) | Moderate | 3.1.8 (≥3.1.3 <3.1.9); **3.1.9** | D → fast-uri | Host canonicalization/policy mismatch with attacker-controlled URI. No feature runtime uses this normalizer. | Resolved package patched. |
| fast-uri — [GHSA-xhq7-xmqj-769h](https://github.com/advisories/GHSA-xhq7-xmqj-769h) | Low | 3.1.8 (3.x <3.1.9); **3.1.9** | D → fast-uri | Relative-path normalization can change resolution/security keys. Diagnostic/build exposure, no Portal URI authorization service. | Resolved package patched. |
| fast-uri — [GHSA-333x-w4r6-6crp](https://github.com/advisories/GHSA-333x-w4r6-6crp) | Low | 3.1.8 (3.x <3.1.9); **3.1.9** | D → fast-uri | Nondefault suffix-reference normalization can produce a live scheme. No such Portal runtime path identified. | Resolved package patched. |

## Remaining findings: do not claim full closure

### Cache advisory: unresolved and disputed

The [advisory](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) still lists no patched release. The [maintainer's issue response](https://github.com/kornelski/http-cache-semantics/issues/56) disputes using cookie presence or freshness as a confidentiality boundary and points to `Cache-Control: private` for private responses. This is a documented disagreement, not an accepted Portal exception.

Registry inspection found **4.3.0**, published 2026-10-04, despite the earlier report's lack of an identified fixed version. Its [published git revision](https://github.com/kornelski/http-cache-semantics/commit/b1d4bd682fbab0252985de45219f4e7497c0067c) and actual npm tarball were inspected. The index.js diff adds response status/accessor and Vary matching changes, **not a change to the reported stale-cache logic**. A benign in-memory synthetic comparison (zero network requests or real credentials) found the same helper results in 4.2.0 and 4.3.0. An initial probe assumption that reuse-helper output alone rejects private responses was corrected: callers must honor `storable()` before retention; explicit private responses are non-storable. These helper probes do not establish a deployed exploit or a fix.

**Decision:** retain 4.2.0 and the visible audit failure. Moving to 4.3.0 would remove the range match without establishing remediation of the reported behavior. Do not hide the finding with an override, ignore list or unverified version bump. Recommended mitigation remains the current static architecture: no authenticated shared proxy/remote private-asset processing. Any future such integration must honor private/no-store, reject caching sensitive responses and review stale-request policy. Track an upstream resolution/validated fix; any risk acceptance needs an explicit owner decision. No waiver granted here.

### Magicast embeds an old source-map implementation

After updating the resolved `source-map-js` dependency to 1.2.2, manual inspection of **`magicast@0.5.5/dist/builders-CDdrUKLb.js`** still finds embedded source-map-js 1.2.1 consumer/generator/SourceNode code. The old SourceNode loop and indexed-offset handling lack the guards present in the patched installed 1.2.2 source. Therefore npm's improved count does **not** establish complete source-map remediation. Registry inspection shows 0.5.5 is the latest published Magicast; no compatible rebuilt release is available.

No public or feature path accepts arbitrary source maps, and no resource-exhaustion payload was run. Build/config transformation paths remain a trust boundary. Recommended follow-up: obtain an upstream Magicast rebuild that embeds 1.2.2 or externalizes that implementation, or separately review a replacement/maintained patch with compatibility tests. Do not silently edit node_modules, downgrade to evade metadata or add an unreviewed postinstall patch mechanism. Until then, reject unreviewed source maps/build inputs, use isolated CI with appropriate resource limits and avoid secrets on untrusted contribution builds. **Residual embedded code remains OPEN; reachability/exploitability in a specific Magicast API was not proven.**

Local evidence: `.community-drafts/sec-001/embedded-source-map.json`, matching installed source, registry metadata and the [source-map-js patch release](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2). This is a new refinement beyond EVENT-001's dependency-level audit assessment, not a retrospective alteration of its report.

## Validation actually performed

All results below use **Node 24.13.0** and the final lockfile installed with `npm ci`. No remote CI/deployment is implied. Existing test assertions and historical output fixtures were not relaxed or updated for the dependency change.

| Check | Actual result |
| --- | --- |
| Clean install / tree | PASS: npm ci, 278 installed packages / 279 audited; npm ls validates the dependency tree. No manifest override remains. |
| Baseline security worktree `npm run check` | PASS: 120 files, zero errors/warnings/hints. |
| Baseline security worktree `npm run build` | PASS: 27 static pages. Used external sandbox approval because prior Portal builds establish a macOS Keychain failure under the sandbox; no security gate was disabled. |
| Baseline security worktree `npm test` | PASS: **53/53**, including existing privacy/security/contracts/source/output preservation checks. Existing local offline contract Python environment was reused read-only; no Python dependency changes. |
| EVENT-001 copied-source `npm run check` | PASS: 125 files, zero errors/warnings/hints. |
| EVENT-001 copied-source `npm run build` | PASS: 27 static pages with unchanged feature/configuration source. |
| EVENT-001 copied-source `npm test` | PASS: **62/62**, including all nine unchanged showcase behavioral tests: seven categories/config-only partner/shared person, filtering, consent/suppression/team/qualification/selection restrictions, hidden production drafts and timezone/DST boundaries. |
| Existing landing browser regression | PASS: 1440×900, 768×1024, 390×844; hero/card/process/judging/motion/pause/reduced/no-JS/Forms/no-overflow checks. Recorded CLS 0 in all three cases. No event state or Forms data submitted. |
| Existing EVENT-001 browser regression | PASS: **eight** width/theme cases (1440/768/390/320px × light/dark), plus no-JS. All category filters, shared role/fourth partner fixture, 3/2/1 layout, keyboard/manual carousel, mobile touch, reduced motion, named accessibility-tree controls, local image/fallback, escaped copy and hidden drafts checked; zero recorded runtime exceptions. Desktop/light and 320px/dark screenshots inspected. |
| Native image compatibility smoke | PASS: loaded Sharp 0.35.5 with **librsvg 2.63.2**; benign 16×16 SVG rasterization and existing portrait resize to 64px succeeded in memory. No asset changed. This is macOS evidence, not a Linux/glibc execution test. |
| Cache investigation | Same bounded in-memory helper outcomes in 4.2.0 and candidate 4.3.0; explicit private responses non-storable. Zero network calls, no real credentials; not represented as an exploit or a remediation. |
| Source-map inspection | Resolved consumer has the new offset guard; Magicast embedded copy does not. Registry latest Magicast 0.5.5 has no available rebuilt successor. **Residual OPEN**, not hidden by audit count. |
| `npm audit --json` (all dependencies) | **FAIL / OPEN: exit 1, one high `http-cache-semantics` finding**; before: six high + one moderate groups / seventeen records. Sixteen records removed from resolved dependency metadata; that count does not include Magicast's embedded implementation. No omit/dev/severity filter or suppression. |
| Lint | No lint script configured; not claimed as an executed check. Astro diagnostics pass. |
| Preservation/privacy | Original nineteen changed-file hashes and all 180 copied source/test files unchanged; only allowed security files differ in security Git diff. Six challenges/diagrams, Forms/registration, dates/links, rules/rubrics, social assets, disclosures and existing feature source untouched. Bounded credential-pattern and public draft/synthetic-marker scans pass. No private registrations, keys or new research/enterprise claims introduced. |
| Whitespace/documentation | git diff --check and new-file whitespace/path checks pass. |

Evidence is ignored under `.community-drafts/sec-001/`: `audit-before.json`, `audit-after.json`, `lock-changes.json`, `npm-ci.txt`, `npm-ls.txt`, `check.txt`, `build.txt`, `tests.txt`, `event-check.txt`, `event-build.txt`, `event-tests.txt`, `landing-browser.txt`, `event-browser.txt`, `image-smoke.json`, `cache-semantics-probe.json`, `embedded-source-map.json` and final preservation/privacy evidence. The copied fixture is `event-regression/`; its latest showcase browser evidence is `event-regression/.community-drafts/event-001/run-1793022316700/results.json` with screenshots. Landing evidence is `.community-drafts/design-005/after-interaction-results.json` and screenshots. Browser harnesses close their temporary Chrome/server processes in finally. No private service, live registration flow or social-media endpoint was called.

## Acceptance and limitations

The six resolved dependency updates are implemented and locally validated without feature changes. **Overall security closure is incomplete**: the audit remains failed/open for the disputed cache advisory, and manual inspection identified residual embedded source-map code. Neither has been waived. Cache needs a verified upstream disposition/fix or an explicit owner risk decision; Magicast needs a rebuilt/externalized implementation or a separately reviewed maintained patch. No compatible published Magicast replacement was available, and an unreviewed code-patching mechanism would exceed the smallest justified lockfile change.

There is no Node runtime on the generated static Pages site, so visitor exposure differs from CI/developer exposure. This assessment is not a proof that every build input or dependency is safe. Linux/glibc native execution, full cross-browser/physical-device/screen-reader certification, actual private roster verification and production deployment remain unperformed. Official partner/content/consent/timezone prerequisites are unchanged; all partner drafts stay hidden and static scheduling/withdrawal still needs rebuild/deployment.

The original EVENT-001 checkout has not received the dependency update: its source and dependency installation were preserved. These uncommitted security changes live only in the linked worktree, with EVENT-001 compatibility demonstrated in a copy. Later authorized integration must retain that separation of logical changes; no commit/push/merge is authorized by this report.

## Exact proposed security file inventory

1. `package-lock.json` — six targeted resolved dependencies plus required native/Rolldown companions; 48 existing entries changed, no new package path, unchanged direct manifest.
2. `docs/DEVELOPMENT_LOG.md` — chronological SEC-001 implementation/evidence/remaining blockers.
3. `docs/security/SEC-001-REVIEW.md` — this investigation, advisory matrix, scope, validation and limitations.

No feature, challenge, registration, Form, date, rubric, social asset, research disclosure, workflow, package manifest or source/test file is included. Ignored tarballs, logs, regression copies and metadata stay under `.community-drafts/sec-001/` in the temporary security worktree, not the proposed commit. The original banner remains excluded and untouched.
