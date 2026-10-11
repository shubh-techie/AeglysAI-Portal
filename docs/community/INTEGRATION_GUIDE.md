# Community cross-repository integration — COM-INTEGRATION-001

Status: locally implemented and tested, **PROVISIONAL** interoperability. All source contracts declare 1.0.0; upstream working-tree files are not assumed committed/approved. Research repository was read-only. [Inventory](CONTRACT_INVENTORY.json), [decision](../adr/ADR-008-evidence-contract-integration.md), [traceability](TRACEABILITY.md).

## Contract inventory and comparison

The inventory records old Portal hash (evidence only), current upstream/Portal hashes, required/optional fields at every object and enums. MANIFEST.json pins the copied validators as well. Evidence copy formerly ab27ef9f… differed from current 51760d55…: seven non-whitespace/timestamp patterns added upstream. Old JS subset lacked complete Draft 2020-12/semantic validation. Recognition was absent. Adoption used Portal-specific shape instead of canonical assertions. Monthly reports were observation-only portal-draft-report-1, incompatible with the actual monthly envelope. Positive/negative upstream fixture coverage and publication checks now use exact copied validators.

Recognition: consent not-requested/granted/withdrawn, public-attribution scope, accepted contribution and reviewed draft/published/withdrawn state; withdrawn record strips reference/credit. Adoption: usage/independent-adoption/independent-reproduction/citation; external + independent + executed required for independent claims; current/superseded/withdrawn, valid acyclic correction chains. Monthly: pending/approved/withdrawn, complete/incomplete quality, draft/verified metrics, partial/full coverage, pinned snapshots and ordered immutable revisions. These are snapshot assertions; historical transition authentication remains the owner's private administrative responsibility, not an inferred event from current JSON.

No upstream version changed. Same-version schema tightening is provisional uncommitted draft evolution; if earlier 1.0.0 bytes were actually published/approved, upstream owner must resolve versioning before final interoperability. No such release established here.

## Local validation setup

Use Node 24 and Python 3.12+:

```sh
npm ci
python3 -m venv .community-drafts/contract-venv
.community-drafts/contract-venv/bin/python -m pip install -r scripts/community/upstream/scripts/community/requirements.txt
npm run check
npm run build
npm test
```

The bridge uses the local ignored virtual environment when present, otherwise python3. AEGLYSAI_CONTRACT_PYTHON is an optional operator-controlled executable override. Python requirements are pinned upstream bytes; no private Workspace access. Validation itself is offline with locally registered evidence schema. CLI dependency installation requires package network access, not evidence URL retrieval.

## Reviewed inputs and independent authorization

Manually sanitize exports per [Workspace guide](WORKSPACE_EXPORTS.md). Never put raw/private exports in this public repository. Existing approved-metrics.json wrapper retains snapshot format; approved-evidence.json retains evidence wrapper. recognition.json uses canonical recognition document; adoptions.json now uses canonical adoption document, not the previous Portal array. reports.json is an array of canonical monthly contracts. projects.json keeps established project presentation metadata; no upstream project contract invented. No production input files are currently supplied.

The separately owner-maintained publication-approvals.json is an array of kind (metrics/evidence/recognition/adoption/monthly/projects), sha256, reviewUrl, approvedAt and recordIds. Digest is SHA-256 of JSON.stringify(document), separate from upstream source SHA-256 of exact file bytes. Projects digest wraps {data_kind:PUBLIC_AGGREGATE,records}; other kinds digest their canonical document/snapshot. recordIds allowlists individual recognition/adoption/project IDs; evidence/monthly approval covers the complete digest-bound document. Future dates, mismatches, duplicate authorizations, unsafe URLs and missing permission fail closed. Do not generate approvals from source VERIFIED fields. Owner must review truth, consent, safe provenance and upstream release approval first. The Git-managed allowlist is operator authority, not a client API.

Recognition shows approved anonymous/artifact credits, never names/emails inferred from GitHub. Adoption displays exact claim kind, evidence, executed outcome, limitations and citations; usage/citation do not imply independent adoption. Withdrawn/superseded records remain in local contract history but are excluded from public cards. Projects require both existing VERIFIED/consent gate and distinct owner allowlisting; project records never become adoption.

## Monthly reporting and archive

GitHub observation drafts (`community:report`) remain separate and cannot publish as impact reports. Prepare actual upstream-format drafts using manually sanitized COM-001 evidence files under ignored .community-drafts/evidence:

```sh
npm run community:impact-report -- 2026-10 source-evidence.json
```

No actual evidence file is supplied here. Command refuses missing input and writes pending JSON/Markdown with no overwrite. Each source metric remains separate, no speculative cross-source sum; quality remains incomplete/human review pending. Tests use synthetic copies only. Revisions can be prepared with impactDraft's revision/history/reason arguments and immutable exact prior artifact bytes; validate against upstream before review. All source/history paths are bounded relative local paths, no URL fetching.

Approved reports use fixed src/data/community/report-artifacts as the operator-controlled immutable source/history root. Validation checks exact hashes/records, periods, references, aggregation, exclusions, coverage and revision chain. Publishing requires PUBLIC_AGGREGATE, complete quality, verified sources/metrics, closed period, upstream publication approval and separate owner allowlist. October 2026 remains open and cannot publish early. Current monthly downloads include the canonical contract; prior revisions/source bytes are retained locally and do not automatically become public downloads, especially if withdrawn. No report pages generated without approved inputs.

## Roadmap and remaining gates

Obtain an approved immutable upstream commit and recompare hashes; review source schema-version immutability; approve actual sanitized exports/record permissions; set durable artifact/archive/withdrawal policy; configure private Workspace Forms/permissions; resolve documented disclosure findings and existing dependency advisories. No real metrics/activity/recognition/adoption or report approval added. No commit/push/PR/merge/deployment in this task.
