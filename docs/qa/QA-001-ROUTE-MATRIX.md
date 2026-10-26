# QA-001 — Route and regression matrix

Recorded 2026-10-26 at `f7e9c12414c2795d7ddcdbdcae965d9406101fbb`.
[Overall recommendation](QA-001-RELEASE-VERIFICATION.md). No application changes.

## Every generated route

Each row has28 structural observations: seven requested widths × two themes × JS/no-JS.
All production HTML URLs returned200 and matched local build bytes. Direct404.html is
a file; a separate nonexistent-path request returned404 with custom content.
27 indexable pages have unique production canonical URLs;404 is intentionally noindex.

| Route | Production | HTML equals build | Browser observations | Structural result |
| --- | --- | --- | --- | --- |
| `/404.html` | 200 | Yes |28 | Pass (noindex404) |
| `/about/` | 200 | Yes |28 | Pass |
| `/architecture/` | 200 | Yes |28 | Pass |
| `/community/adoption/` | 200 | Yes |28 | Pass |
| `/community/impact/` | 200 | Yes |28 | Pass |
| `/community/` | 200 | Yes |28 | Pass |
| `/community/projects/` | 200 | Yes |28 | Pass |
| `/community/reports/` | 200 | Yes |28 | Pass |
| `/community/submit/` | 200 | Yes |28 | Pass |
| `/experiments/` | 200 | Yes |28 | Pass |
| `/hackathons/2027/` | 200 | Yes |28 | Pass |
| `/hackathons/adaptive-authorization/` | 200 | Yes |28 | Pass |
| `/hackathons/autonomous-resilience/` | 200 | Yes |28 | Pass |
| `/hackathons/behavioral-risk/` | 200 | Yes |28 | Pass |
| `/hackathons/community/` | 200 | Yes |28 | Pass |
| `/hackathons/events/` | 200 | Yes |28 | Pass |
| `/hackathons/` | 200 | Yes |28 | Pass |
| `/hackathons/sponsors/` | 200 | Yes |28 | Pass |
| `/` | 200 | Yes |28 | Pass |
| `/media/` | 200 | Yes |28 | Pass |
| `/publications/` | 200 | Yes |28 | Pass |
| `/research/` | 200 | Yes |28 | Pass |
| `/speaking/beyond-static-access-control/` | 200 | Yes |28 | Pass |
| `/speaking/building-ai-driven-incident-response/` | 200 | Yes |28 | Pass |
| `/speaking/etic-2026/` | 200 | Yes |28 | Pass |
| `/speaking/from-static-security-policies/` | 200 | Yes |28 | Pass |
| `/speaking/gicite-2026-wru-key-talk/` | 200 | Yes |28 | Pass |
| `/speaking/` | 200 | Yes |28 | Pass |

## Functional assertions beyond structural coverage

| Feature | Specialized evidence |
| --- | --- |
| Homepage/hero/discovery | Existing28-case homepage suite; hero links, media controls, approved2026/2027/community targets, skip link, reduced/no-JS |
| Research/Hackathon menus | Existing28-case navigation suite; three Research and two Hackathon destinations, mobile drawer focus/dismissal/no-JS |
| Six2026 challenges | Existing2026 interaction suite at1440/768/390 plus full automated challenge/rule/source preservation tests |
| Registration/qualification/team/final submission/FAQ | Nine existing rendered Form links retained; all seven unique configured responders GET200; no submission |
| Unstop/Luma/Discord | Existing16-case browser link/accessibility suite, fresh public HTTP/API/listing observations; [operational limits](QA-001-FINDINGS.md) |
| Showcase/registry | Eight synthetic responsive cases plus no-JS,13 registry groups; current real publication correctly empty/blocked |
| Research/architecture/experiments/publications | Every route width/theme/JS matrix, metadata/internal-link and planned-research wording tests; research effectiveness not audited |
| Speaking/media/About/community/retired routes | Every route matrix, speaking consent/asset/metadata tests, media/homepage interaction suite, six external thumbnails GET200; no new appointment inference |
|2027 Coming Soon | Preserved route bytes/metadata/status and navigation tests; no registration/date/partner invention |

## Live HTTP and link scope

28 HTML GETs,11 unique referenced first-party asset HEADs and one unknown-route GET:40
requests in the primary crawler, all expected statuses. Six external media-thumbnail GETs
and seven public Form GETs additionally returned200. No broken internal file/fragment
target or insecure new-tab anchor found. All external anchor URLs in generated HTML use
HTTPS. External signup completion, every external article/academic site, account permissions
and private processing/API/export behavior were not certified.

28 unique titles/descriptions and27 unique canonical URLs independently observed.
`/404.html` is deliberately noindex/follow; it is excluded from canonical uniqueness.
No production script/style or first-party resource404 was observed.

## Evidence

Raw784-case browser JSON plus assessed404 exception, crawler response/header/timing
JSON and exact body hashes are under `.community-drafts/qa-001`. Existing matrix screenshots
are archived under `existing-harness-evidence`. [Reproduction appendix](QA-001-REPRODUCTION.md)
contains the custom read-only scripts and suite commands. These observations do not
replace content consent, security acceptance or actual cross-browser/manual AT review.
