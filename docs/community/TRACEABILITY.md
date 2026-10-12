# COM-INTEGRATION-001 requirements-to-tests

| Requirement | Implementation | Executed automated coverage |
| --- | --- | --- |
| Exact four schema and validator bytes | upstream/MANIFEST.json | integration.test.mjs pinned digest test |
| Draft 2020-12 and original semantics | contract-bridge.py and copied Python validators | All eight positive and thirteen negative upstream fixtures |
| Missing approval / source cannot self-authorize | publication.mjs and approvals.ts | Recognition, adoption and monthly owner rejection tests |
| Duplicate keys, invalid versions, bounds, unsafe numbers | upstream.mjs / input.ts / bridge | Strict parse/version/duplicate/whitespace tests |
| Approved recognition and minimized withdrawal | recognitionRecords / recognition.ts | Consent/published/withdrawn tests |
| Independent adoption, execution, corrections | adoptionRecords / adoption.ts | Affiliated/no-execution fixtures, correction/withdrawal/cycle tests |
| Pinned monthly snapshots/revisions/aggregation | impactDraft / copied validate_monthly.py | Determinism, duplicate snapshot, bad total/period/reference, revision fixtures |
| Pending/draft/synthetic/open-period cannot publish | approvedMonthly | Missing owner, pending draft, synthetic, future approval and withdrawal tests |
| Privacy and no browser Workspace API | public-export.mjs / build adapters | Existing privacy/URL tests plus owner private-field rejection |
| Hackathon correction and portal regressions | Existing components/rules retained | site.test.mjs finalized one-hackathon rules, media/speaking/SEO/links |

These tests establish local structure/logic, not authentic source truth, real consent, independent outcomes, hosted CI or deployment. Latest executed check/build/test outcomes in development log. No upstream release approval inferred from local fixtures. Live API traffic and private Workspace end-to-end checks remain unperformed/unconfigured.

HACK-CHALLENGE-006: everyday-ai.test.mjs verifies six choices, explicit extension provenance, safe requirements and unchanged eligibility/judging; updated vector tests verify six assets/anchors. Project list/category validation derives from one Portal list; native index-five filtering is checked in an isolated fixture build. Monthly schema has no challenge enum; no invented track totals.

COM-PIN-001: integration.test.mjs now validates published-source metadata, all four schema/semantic-helper hashes and 24 fixture hashes. Actual remote reachability/raw-byte comparison was executed separately, recorded in the manifest/provenance; automated tests remain offline. Owner/privacy/status/source/revision gates unchanged.

HACK-PORTAL-OPS-001: hackathon-ops.test.mjs covers seven verified purpose mappings, unique public responder paths, active/inactive/missing approval/availability/timestamp gates, eight distinct recognition categories, safe placeholders and missing-reference publication blocking. site.test.mjs retains qualification/team/judging/profile/route/asset/privacy regressions. Actual check/build/test/browser results in development log; no private submission or Workspace permission test claimed.
