# SEC-002 — Portal dependency security assessment

Recorded 2026-10-26. Status: investigation completed locally; **both residual findings
remain OPEN**. No dependency remediation, risk acceptance or production security
clearance is claimed. See the [matrix](SEC-002-ADVISORY-MATRIX.md) and
[validation/remediation report](SEC-002-REMEDIATION-REPORT.md).


## SEC-002-DOC publication refresh — 2026-10-26

Documentation-only review prepared from fresh main
`bdc94b28428f7fbf05de6aa949ed43cea46f8ef8` in
`/private/tmp/aeglysai-portal-sec-002-doc`, branch
`docs/AEGLYSAI-PORTAL-SEC-002-DOC`. No commit, push, PR or merge is authorized yet.
PR #25 navigation and PR #26 CI correction are now merged. Pages run
[40373450637](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40373450637)
and its deployment report success for that same main SHA at `https://aeglysai.com/`;
this is deployment evidence, not security acceptance.

The sections below preserve the **original investigation snapshot** at `a03d08d...`:
its feature-branch states, latest-release observations, runtime coverage and test counts
apply to those explicitly pinned inputs, not to current main. Current main's manifest
and lockfile are byte-identical to the investigated dependency baseline. All 72 files
in the original evidence checksum index were verified without modifying that worktree.
A fresh lockfile audit on this publication baseline still exits **1**, one high cache
finding; Magicast's embedded-code residual remains separately open. No owner risk
acceptance has been approved. No dependency remediation or runtime revalidation is
claimed by publishing these documents. See the report's publication validation section.


## Verified repository and baselines

Target is AeglysAI-Portal, origin `https://github.com/shubh-techie/AeglysAI-Portal.git`.
Original root: `/Users/shubhprabhat/Documents/Work/AegisAI-Portal`.
SEC-002 Git worktree: `/private/tmp/aeglysai-portal-sec-002`.
Branch: `fix/AEGLYSAI-PORTAL-SEC-002-remaining-advisories`.
Investigation baseline/HEAD: `a03d08d14261e5f2e0fac1a063aec69e4658cf8d`, then freshly fetched main.

PR #24 **has merged**: Git merge parents include SEC-001 `fe77e22524285c7401f20e82470bf2b711456eb2`;
GitHub API reports merged at `2026-10-26T16:42:29Z`, merge SHA `a03d08d...`.
This supersedes older reports describing SEC-001 as unmerged. It does not prove a
successful deployment or an explicit security waiver. PRs #23 and #25 remained open
drafts at initial verification. SEC-002 contains neither unmerged feature's code.

| Baseline inspected | Commit | Lock SHA-256 / relationship | Audit evidence |
| --- | --- | --- | --- |
| Main / SEC-002 | `a03d08d14261e5f2e0fac1a063aec69e4658cf8d` | `3d6b0320d7a575b0c759d66b029e1fd7c6b728f661b63994349b01ac25bcf5f4` | Fresh clean install and audit: one high, exit 1 |
| SEC-001 | `fe77e22524285c7401f20e82470bf2b711456eb2` | Identical to main | Independent fresh audit: one high, exit 1 |
| EVENT #23 | `0148e3b9da08b8bdaaf9f41f75884d876fd686b8` | `660ba322d6e8f7872d9a6b8b883a3c43a0713782267dd0945f718039ed16216c` | Identical lock bytes to UX; no separate EVENT audit invocation claimed |
| UX #25 remote at start | `ca47d9964c05930bc0476f00141b9702915653f4` | Same older lock as EVENT | Local UX independent audit of these lock bytes: six high, one moderate, exit 1 |
| Original local UX at start | `ddc584ff9c56532cbb668070bca894ca3faf227f` | Same older lock; additional banner-only commit | Same fresh local UX audit; not main's advisory count |

While investigation ran, original UX HEAD changed externally to
`a5cab8330ab6113121b3f5a0d5807e131e51db9c`. Its Git tree is identical to the starting
local UX tree; status remained clean and banner bytes unchanged. SEC-002 did not
modify that branch, amend history or perform that ref update. Frozen compatibility
inputs remain the explicitly recorded remote UX/EVENT commits above.

The investigation baseline uses Astro 7.3.4, Vite 8.3.3, Magicast 0.5.5, http-cache-semantics 4.2.0 and
resolved source-map-js 1.2.2. EVENT/UX retain Vite 8.3.0, source-map-js 1.2.1 and the
older Sharp/Undici/Zod/fast-uri versions. Their seven package-group findings must not
be added to main's single finding. Magicast's embedded implementation is a separate
manual residual, not a second npm audit package count.

## HTTP cache finding

[GHSA-ch52-4w7c-c8xp / CVE-2026-93748](https://github.com/advisories/GHSA-ch52-4w7c-c8xp)
is published High; affected range `<=4.2.0`; authoritative patched version is **None**.
The advisory is not withdrawn. npm's `fixAvailable: true` reflects an available
version outside its range; it is not technical proof of repaired behavior.

Dependency owner/path: Portal direct production declaration `astro@^7.3.4` → installed
Astro 7.3.4 → `http-cache-semantics@^4.2.0` → installed 4.2.0. `npm explain` classifies
it transitive, production-declared, not dev-only or overridden. Operational execution
is build/developer-side, not a Node runtime serving the static Pages output.

The [maintainer disputes the report](https://github.com/kornelski/http-cache-semantics/issues/56#issuecomment-5975759591),
arguing that cookie presence/freshness is not a confidentiality boundary and private
responses need the appropriate cache directives. [RFC 9111 §7.3](https://www.rfc-editor.org/rfc/rfc9111.html#section-7.3)
supports the cookie distinction. This disagreement alone does not close the finding,
and does not settle every reported stale/revalidation scenario.

### Candidate evaluation

At investigation time, the official latest cache release was 4.3.0, published 2026-10-04, compatible with Astro's
existing range. Integrity-verified npm tarballs were compared. Its changes concern
status access and Vary matching; the relevant `maxAge`, `satisfiesWithoutRevalidation`
and `evaluateRequest` function hashes are identical to 4.2.0.

Bounded synthetic probes gave identical results in both versions:

| Synthetic response | `storable()` | New request with `max-stale=3600` accepted by reuse helper |
| --- | --- | --- |
| Cookie + max-age=0 | true | true |
| private + max-age=0 | false | true |
| no-store | false | true |
| max-age=0 + must-revalidate | true | false |
| max-age=0 + proxy-revalidate | true | true |

Non-storable responses must not be retained: a helper result obtained after ignoring
`storable()` is not a demonstrated private-response exploit. Conversely, zeroed
freshness plus stale acceptance is not proof of remediation. No real credentials,
shared proxy, victim data or network request was used by these probes.

An ignored **full dependency graph** scratch lock changed only cache to 4.3.0;
lock-only npm ls passed and audit returned zero findings. This confirms a metadata
range exit, not a security fix. The candidate was **not adopted**. Latest Astro 7.4.2
still declares Magicast 0.5.5 and uses the same cache TTL decision pattern; its broader
dependency changes do not establish remediation of either finding. No full Astro
7.4.2 application upgrade/build was attempted or represented as validated.

### Portal call-path assessment

Installed source `node_modules/astro/dist/assets/build/remote.js` constructs its own
GET request and uses `storable()`/`timeToLive()`, not incoming visitor `max-stale` or
`satisfiesWithoutRevalidation()`. Revalidation adds ETag/Last-Modified conditions,
not visitor cookies/authorization. Its return value contains image bytes, expiry,
ETag and Last-Modified, not response Set-Cookie headers. The static site has no Node
shared proxy or SSR adapter. Repository search found no Astro Image/Picture/getImage
or remote-image inference use; external media images are ordinary browser img URLs.

A stubbed Astro loadRemoteImage call used zero network requests, emitted a GET with
no headers, returned no cookie field, and gave a private response no positive TTL.
V8 coverage of the ordinary production build recorded the cache module loaded but
CachePolicy constructor, loadRemoteImage and revalidateRemoteImage call counts **0**.
Normal check loaded neither cache nor Magicast. These observations narrow current
exposure; they do not prove every future plugin/configuration or asset input safe.

**Recommendation: retain OPEN/disputed.** No visitor-reachable exploit path was found
in this deployment architecture. Await a verified upstream correction or authoritative
advisory disposition; do not upgrade solely to make the audit green. A release that
must proceed before then needs an explicit owner security disposition, not inferred
acceptance from a successful build or PR #24 merge.

## Magicast embedded source-map finding

The associated published advisory is
[GHSA-68fv-2mgg-jv7q / CVE-2026-93749](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
for source-map-js `>=1.0.0 <1.2.2`, patched in 1.2.2. It is not a separately issued
Magicast CVE. Resolved module 1.2.2 is patched; the embedded implementation is not.

Portal → Astro 7.3.4 → Magicast `^0.5.2` → installed 0.5.5. npm classifies this as
production-declared. The package's own `inlinedDependencies` names source-map-js 1.2.1.
`dist/builders-CDdrUKLb.js` embeds its consumer, generator and SourceNode. SHA-256:
`6d589e4c1b4c89141d67698af6750c470184c575553029c80b110e8e091d553c`.
The patched offset bounds and exhausted-code padding guard are absent. Updating the
resolved external module does not replace these bundled functions.

The [upstream source-map patch](https://github.com/7rulnik/source-map-js/pull/79)
addresses several amplification paths, not just one padding loop. SEC-002 did not
execute resource-exhaustion payloads. A bounded public-API probe passed indexed maps
with offset lines 0 and 0.5 to Magicast generateCode with inputSourceMap/sourceMapName.
The embedded consumer read each offset and generated a map in both cases. Resolved
1.2.2 accepted 0 and rejected 0.5 as a non-integer. Thus a real Magicast public API can
reach the legacy consumer; this refines SEC-001's previously unproven API reachability.
It does **not** demonstrate a Portal DoS, nor prove every upstream amplification sink
is reachable through that specific API.

Astro's installed Magicast imports are in `dist/cli/add/index.js`. CLI dispatch loads
that code for `astro add`, not normal build. Astro add's observed config rewrite
passes formatting options, not an external input map. Portal source does not import
Magicast, and V8 coverage found no Magicast module loaded during ordinary check/build.
Potential exposure therefore remains developer/config-transform tooling or a future
consumer accepting attacker-controlled maps; static visitors do not execute it.

[Official Magicast metadata inspected during the investigation](https://registry.npmjs.org/magicast/0.5.5) remains
0.5.5; no published rebuilt successor was available. Astro 7.4.2 still depends on it.
Aliases/overrides of external source-map-js cannot alter already inlined code.
Hand-editing node_modules, an unreviewed fork or postinstall replacement would create
maintenance/integrity risk without an approved patch lifecycle. No such change was made.

**Recommendation: retain OPEN; seek an official verified rebuild/externalization.**
Continue using the patched external module already selected by SEC-001, but do not
label the embedded finding fixed. Keep map/config inputs reviewed and tool execution
isolated. Formal acceptance, if needed, must name this residual explicitly.

## CI and proposed owner-decision packet

`deploy-pages.yml` runs npm ci, check, build and tests on main/manual dispatch. It
has no explicit npm audit step, PR trigger or build timeout-minutes. npm ci reported
the advisory but exited 0. The build job declares contents:read and disables persisted
checkout credentials; the separate deploy job has Pages/id-token permissions and a
main-only condition. The scheduled community-drafts workflow has a 10-minute timeout
and read-only contents permission. No reviewed workflow/script runs astro add or
accepts arbitrary user source maps. No branch-protection enforcement was verified.

A green build is therefore not evidence of an enforced passing dependency audit.
No audit step was removed, added as a bypass, or filtered. No CI policy was changed.
Follow-up CI audit policy/resource-limit changes require deliberate review of expected
failure handling; they cannot substitute for technical remediation or owner approval.

If an owner needs a time-limited exception, the proposal is:

- Owner: designated Portal security/release owner; no identity or approval invented.
- Findings: both advisory IDs above, published severity and residual embedding explicitly named.
- Scope/controls: static output only; no authenticated shared cache, SSR/Node visitor
  service, arbitrary map ingestion or unreviewed build/config inputs; retain reviewed
  contribution boundaries and isolated low-permission build execution.
- Residuals: installed vulnerable code, conditional tool/build exposure, advisory
  disagreement, and the fact normal-path coverage is not universal reachability proof.
- Review: recommended 2026-11-09 or immediately on an upstream update/input or architecture
  change; any exception should expire no later than 30 days after actual sign-off.
- Revocation triggers: SSR/proxy/private remote-asset processing, new map-consuming tool
  paths, new untrusted integration inputs, dependency/advisory changes or contrary exploit evidence.
- Approval: **NOT PROVIDED / NOT ACCEPTED** in reviewed artifacts or this task.

Closure requires integrity-verified upstream evidence, updated bounded regressions,
normal/feature compatibility validation and an honest before/after audit. No security
readiness declaration, external issue posting, commit, push, PR or deployment occurred.
