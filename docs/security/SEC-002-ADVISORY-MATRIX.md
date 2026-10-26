# SEC-002 — Advisory and disposition matrix

Recorded 2026-10-26 against main/SEC-002 `a03d08d14261e5f2e0fac1a063aec69e4658cf8d`.
This baseline has **one npm audit package finding plus one separately identified
embedded-code residual**. Do not sum it with the older EVENT/UX lockfile counts.
See [assessment](SEC-002-SECURITY-ASSESSMENT.md) for call paths and
[report](SEC-002-REMEDIATION-REPORT.md) for commands/results.


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


| Required field | Cache finding | Embedded source-map residual |
| --- | --- | --- |
| Advisory/source | [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), CVE-2026-93748; active/not withdrawn | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q), CVE-2026-93749 applies to bundled source-map-js, not a separately assigned Magicast CVE |
| Package | http-cache-semantics | Magicast's inlined source-map-js |
| Published severity/context | High; CVSS 3.1 7.5 / CVSS 4.0 8.7; disputed by maintainer, not withdrawn | High for source-map-js; CVSS 3.1 7.5 / CVSS 4.0 8.7; Portal-specific full DoS path not established |
| Exact installed/affected | 4.2.0; affected `<=4.2.0` | Magicast 0.5.5 embeds 1.2.1; affected source-map-js `>=1.0.0 <1.2.2`; separately resolved module is 1.2.2 |
| Fixed/available versions | Authoritative first patched version None; latest 4.3.0 outside audit range but no verified stale-semantics repair | Library patch 1.2.2 already resolved by SEC-001; no official newer Magicast rebuild found in the original investigation; inspected Astro 7.4.2 retains Magicast |
| Introduced by | Root production Astro `^7.3.4` → Astro 7.3.4 → cache `^4.2.0`; transitive, dev:false | Root production Astro → Magicast `^0.5.2` → 0.5.5; transitive, dev:false; own manifest inlinedDependencies=1.2.1 |
| Exposure | Build-time remote-image helpers/developer Node environment; not a server runtime in static Pages | CLI/config-transform tooling, notably Astro add; not static visitor runtime |
| Prerequisites | Shared retention/reuse of sensitive responses, cross-user request influence and stale directives; reported confidentiality scenario requires more than cookie presence | Attacker-controlled source maps passed into affected APIs and amplification-capable data; future tooling/config contribution boundary |
| Reachability evidence | Ordinary build loaded module but constructor/helpers had zero calls; helper uses storable/TTL, no visitor max-stale; stub emits headerless GET and no returned cookie field | Public generateCode accepts bounded fractional indexed offset rejected by external patched consumer; legacy consumer path reachable at library API; no Portal import and no Magicast modules loaded in check/build |
| Option A: upstream update | Candidate 4.3.0 tarballs/compatible full-graph lock audit tested; relevant method hashes/probes unchanged; not adopted | No fixed published Magicast release; Astro framework update not a demonstrated fix; external source-map update cannot repair inlined code |
| Option B: narrow mitigation | Existing static/direct-image architecture avoids observed exploit path; no new wrapper/config justified around an unused internal helper | Existing reviewed config/map inputs and unused add/map path narrow exposure; Vite alias cannot change embedded CLI code; no maintained patch lifecycle approved |
| Before/after audit | Main before=one high, exit 1; final unchanged=one high, exit 1. Scratch 4.3-only candidate=zero, exit 0, rejected as closure evidence | Not independently detected by npm audit. Patched resolved package does not establish embedded closure; before/after residual remains |
| Residual risk | Potential future shared-cache/build consumers and disputed underlying behavior; lack of observed current exploit is not universal proof | Legacy code remains present and reachable with source-map options at public API; future input/tool exposure; not fully covered by registry audit |
| Decision | **OPEN / disputed; retain visible finding**. Formal time-bound owner disposition only if release needs an exception | **OPEN; retain** until official rebuilt/externalized implementation is verified. Do not call the embedded residual fixed |
| Security-owner approval | No acceptance approved/evidenced; PR #24 merge is not evidence of a waiver | No acceptance approved/evidenced; no fork/override/postinstall patch approved |

Resolved external source-map-js 1.2.2 is a SEC-001 dependency-level fix, **not a new
SEC-002 remediation**. Main and SEC-001 locks are byte-identical. Archived pre-integration feature locks
resolved external 1.2.1 and other old dependencies. Those rows describe historical
inputs: current merged main retains the SEC-001 lock, and this documentation does
not import the old feature locks.

No actual decision is marked accepted. A proposed exception must include evidence,
static-only scope, input/build controls, residual risk, named owner, expiry and review
triggers as described in the assessment. No overrides, waivers, audit filters, dependency
changes or release approvals are included in this documentation-only investigation.
