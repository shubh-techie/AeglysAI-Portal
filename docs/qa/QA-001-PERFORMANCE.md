# QA-001 — Performance and reliability observations

Recorded 2026-10-26 for deployed `f7e9c12414c2795d7ddcdbdcae965d9406101fbb`.
[Release recommendation](QA-001-RELEASE-VERIFICATION.md). **No Lighthouse score, field
Core Web Vitals pass or INP measurement is asserted.**

## Method and actual samples

Headless Chrome155.0.8059.86/macOS arm64, no CPU/network throttling, DPR1,900px height,
dark system theme/default motion. Four production routes ×390/1440 ×three sequential
runs =24 samples. Cache disabled/cleared between navigations in one browser process;
this is not a fully cold DNS/TLS/CDN experiment. Observation ends1.5s after document load.
The final sample ran after the main interaction suites stopped; system load/network
conditions were not controlled like a benchmark. Concurrent exploratory sample retained
separately and excluded from this final table.

FCP/LCP are PerformanceObserver/paint timestamps in milliseconds; TTFB is navigation
responseStart minus requestStart. CLS is the observed maximum session-window sum of
non-recent-input layout shifts within the bounded window. All final samples had at
most one shift entry, so grouping ambiguities cannot affect these values. No user
interaction/INP, long-session field behavior, CrUX, slow4G or physical-device result.

| Production route | Width | Runs | Median TTFB ms | Median FCP ms | Median LCP ms | Median CLS | Max observed CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` |390 |3 |26 |92 |92 |0 |0 |
| `/` |1440 |3 |27 |88 |88 |0 |0.006046 |
| `/hackathons/` |390 |3 |32.2 |108 |112 |0 |0 |
| `/hackathons/` |1440 |3 |26.4 |108 |108 |0 |0 |
| `/hackathons/community/` |390 |3 |23.2 |88 |88 |0 |0 |
| `/hackathons/community/` |1440 |3 |24.3 |84 |84 |0 |0 |
| `/media/` |390 |3 |25.5 |76 |132 |0 |0 |
| `/media/` |1440 |3 |30.5 |84 |148 |0 |0.006046 |

No runtime exception or HTTP-error response recorded in the24 final samples. Small
sample shifts do not prove absence of later lazy-image/carousel shifts. The existing2026
interaction harness separately observed CLS0 at1440/768/390 during its bounded checks.
Do not generalize these fast unthrottled lab values to all users or call them Lighthouse.

## Bytes, image sizing and static delivery

- Build file total:8,676,165 bytes. Unique referenced first-party file total:779,506 bytes.
  This is not the transfer size of any one page, and excludes external media-image bytes.
- Home HTML:55,600 decoded bytes,12,904 bytes in the sampled compressed curl transfer.
 2026 HTML:116,280 decoded bytes,28,461 compressed transfer bytes. Response uses gzip.
- Largest referenced image:503,867-byte1829×1696 JPEG, declared200×200 on About/community
  and72×72 on speaking details, lazy-loaded, no srcset. Existing dimensions limit layout
  shift but do not reduce downloaded bytes. [QA-L01](QA-001-FINDINGS.md) proposes a separate
  optimized-derivative review preserving the original/rights. EXIF exists; no GPS IFD found
  by bounded inspection; no claim all metadata was audited.
- Three unreferenced brand-kit PNGs total5,523,850 bytes of the build, including a duplicate
  source copy. They were not page resource references, so this is artifact efficiency,
  not proof of slow initial paint. No source asset/banner was removed.
- Existing styles are local; no new browser framework, runtime SDK, remote font or bundle.
  Existing small inline controllers remain scoped. System fonts are used.

## Reliability and limits

All28 production HTML bodies matched local build SHA-256. Eleven first-party asset
HEADs and six external media-image GETs returned200. Internal files/fragments resolved.
The unknown-route probe correctly returned custom404; normal pages returned200. These
are point-in-time checks, not uptime/SLO or third-party permanence guarantees.

Sampled root response had max-age600 and gzip. CSP and Referrer-Policy response headers
were not observed in that sample; [QA-I03](QA-001-FINDINGS.md) keeps hosting hardening
separate from this task. Browser back/forward/navigation/lifecycle behavior was exercised
by existing suites; no load, stress, failover or offline production outage test performed.

Evidence: `.community-drafts/qa-001/performance/results.json`, `performance-summary.json`,
`http/results.json`, `portrait-metadata.json`, `external-images-http.json`. Reproduction
scripts are in the [appendix](QA-001-REPRODUCTION.md). Timing environment and limited
observation windows must accompany any reuse of these values.
