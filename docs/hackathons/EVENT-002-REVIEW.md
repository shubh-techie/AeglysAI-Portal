# EVENT-002 review checkpoint

Recorded 2026-10-26. IMPLEMENTED locally; awaiting review authorization. No staging,
commit, push, EVENT-002 PR, merge or production deployment. REG-001 not started.

## Verified starting state and DEV-002 completion

- Fresh origin/main and current branch HEAD:
  `e79ee98613a49268816b0424a1449ed342264a54`.
- [PR #30](https://github.com/shubh-techie/AeglysAI-Portal/pull/30) actually merged;
  DEV commit `bab01f08b1b6275567019b7ac96a815721ca7ef1` is an ancestor and its five
  workflow files are present. [Pages run 40396758047](https://github.com/shubh-techie/AeglysAI-Portal/actions/runs/40396758047)
  and deployment7342937183 succeeded at this main SHA. This is DEV-002's deployed
  commit, not an EVENT-002 deployment.
- Primary `/Users/shubhprabhat/Documents/Work/AeglysAI-Portal` started clean, was
  fast-forwarded to fresh main and passed homepage/themes/menus/source-reload checks
  before creating `feat/AEGLYSAI-PORTAL-EVENT-002-public-registry`.
- Old UX-002 PID62750 stopped only after cwd/executable verification. Primary restarted
  before verification, then stopped for the task branch switch and restarted again.
  Current managed PID75231, cwd primary, Node24.22.1/npm11.19.1/Astro7.3.4,
  http://localhost:4321/, listener127.0.0.1:4321. Stale primary preview PID72734 on4322
  was later positively identified/status-checked and stopped with native preview stop.
  Final checks also observed a pre-existing interactive shell PID66135 launch another primary preview PID81615 on4322/Node23. After command/cwd/lock verification, native preview stop removed it. Final Node listener inventory contains only PID75231. No unrelated process or shell/IDE launcher setting changes; preview recurrence is observed, not just hypothetical: the same primary preview reappeared as PID82310 and was stopped after exact command/cwd/lock checks. The external launcher is not disabled; future recurrence remains an operational limitation.
- Eight primary homepage/theme/JS/no-JS cases, eight menu cases and actual browser
  reload from an index source timestamp touch passed. Exact source bytes/timestamps
  restored; clean main verified before EVENT-002. Historical directories, broken old-path
  worktree Git links and all baseline assets/banners preserved; no repair/pruning/reset.

## Exact proposed 15-file inventory

| File | Change |
| --- | --- |
| `docs/DEVELOPMENT_LOG.md` | Append verified DEV transition and EVENT-002 evidence/status |
| `docs/LOCAL_DEVELOPMENT.md` | Append actual merged/transition/server facts to historical checkpoint |
| `docs/adr/ADR-013-approved-public-showcase-registry.md` | Record reviewed snapshot/build boundary decision and alternatives |
| `docs/adr/README.md` | Link ADR-013 |
| `docs/community/WORKSPACE_EXPORTS.md` | Link showcase-specific contract without altering upstream contracts |
| `docs/hackathons/EVENT-002-REVIEW.md` | This review record |
| `docs/hackathons/PUBLIC_SHOWCASE_REGISTRY.md` | Public schema and administrator export/approval/withdrawal workflow |
| `docs/specs/README.md` | Link SPEC-025 |
| `docs/specs/SPEC-025-approved-public-showcase-registry.md` | Scope, acceptance, implementation/validation boundary |
| `scripts/community/event-registry-fixtures/synthetic-candidate.json` | Seven synthetic category records, one shared profile, reviewed-image fixture |
| `scripts/community/event-registry.mjs` | Node24 sanitized JSON export/demo/validate commands; exclusive proposal creation |
| `scripts/community/event-registry.test.mjs` | Thirteen registry acceptance/rejection/integration test groups |
| `src/data/eventRegistry.ts` | Strict registry/approval schemas, export/filter/validation/assets/additive adapter |
| `src/data/eventRegistryInput.ts` | Fixed server-only artifact pair and build-blocking validation |
| `src/pages/hackathons/community.astro` | One loader import and data prop on the existing showcase |

No package/lockfile, production/dev config, workflow, shared UI/CSS/controller,
original EVENT-001 data, event facts, rules, Forms, challenge, research, 2027 page,
brand/image or security-document edits. No production snapshot/approval files supplied.

## Public schema and export architecture

Private Sheet → separately sanitized candidate outside Git → bounded local JSON
exporter → complete proposed snapshot → independent content/privacy/security/owner
review and digest-bound approval → separately authorized Git publication → existing
Astro showcase. No live Workspace read/write, Google account/token/SDK, backend, database,
browser Sheet fetch or new dependency. [Full schema/operations](PUBLIC_SHOWCASE_REGISTRY.md),
[SPEC-025](../specs/SPEC-025-approved-public-showcase-registry.md),
[ADR-013](../adr/ADR-013-approved-public-showcase-registry.md).

Reuse strict EVENT-001 events/people/records and all seven categories. Stable IDs
are distinct from display names; roles share one approved profile. Reject duplicate
IDs/roles, conflicting identity copies, unsupported categories/challenges and member
lists outside teams. Candidate controls require one publication decision per record
and one consent state per profile. Pending/revoked/withdrawn content and its dependent
roles/teams are omitted, with no orphan profiles/assets. An approved publication with
conflicting source approval flags rejects the whole export. Dates/submissions never
grant approval.

Snapshot1.0.0 records public-safe opaque export provenance, revision, export instant,
strict data and image rights/attribution/digests. A separate owner manifest binds
the exact snapshot digest, namespace/revision, complete record-ID set, review URL,
approval time and expiry. No automatic owner manifest generation. A digest binds bytes,
not truth or human authentication. Approval expires/revokes fail subsequent builds.

The build consumes only the fixed snapshot/approval pair under `src/data/community`.
Both absent preserves the original configuration; any partial/invalid/synthetic pair
fails. Imported data cannot overwrite original IDs or event metadata. A fresh snapshot
fully replaces prior imported data, including an approved empty replacement for unpublish.
Existing renderer/projection applies inclusive-start/exclusive-end event-local-day
visibility. Unknown timezone blocks scheduled data; current AEGYTHON timezone stays null.

Local approved raster files require path containment, bytes/digest/signature, alt and
rights/attribution checks. Images requiring visible credit are unsupported by unchanged
cards. Candidate/CLI privacy guards reject unknown/private fields, contacts, Workspace
URLs, common credentials, markup, unsafe URLs and formula-leading cells. Strict parser
rejects duplicate keys, oversized/deep documents and unsafe numbers. CLI outputs only
exclusive `.json` proposals outside tracked source/public/dist; no CSV or spreadsheets.

## Verified validation

Final execution environment: macOS arm64, Node24.22.1, npm11.19.1, Astro7.3.4;
existing pinned Python validators reused read-only via
`AEGLYSAI_CONTRACT_PYTHON=/private/tmp/aeglysai-portal-ci-001/.community-drafts/contract-venv/bin/python`.

| Check | Actual result |
| --- | --- |
| `npm run check` | 138 files, zero errors/warnings/hints |
| `npm run build` | 28 pages |
| `npm test` | 82/82, zero failures/skips; includes13 new registry groups |
| Synthetic export/validation | Seven categories; four person roles share one profile; original public projection and image bytes accepted |
| Rejections | Missing/conflicting approvals, consent, unknown/version/category/reference fields, duplicate IDs/roles, private fields/contacts/links/credentials/formulas, invalid assets and unsafe parser inputs |
| Withdrawal and timezone | Pending/revoked/withdrawn profiles/records/team associations removed; original DST/local-day boundary semantics; unknown timezone rejected |
| Actual isolated Astro builds | Approved simulated fixture rendered; injected private-field proposal failed without echoing canary; approved empty replacement removed imported names |
| Production preservation | All28 generated HTML files byte-identical to captured fresh-main baseline |
| Protected source | Baseline asset/source hashes verified; application source change limited to loader wiring on community page |
| Production privacy scans | All28 pages reject synthetic/private/provenance markers; no added public JSON or JS artifacts |
| Existing showcase Chromium | Eight viewport/theme cases plus no-JS; zero runtime exceptions; desktop dark/mobile light screenshots inspected |
| Research/Hackathon Chromium | Full28-case matrix passed; zero runtime exceptions |
| Current source server | Primary community route serves expected empty showcase without fixture exposure; sole managed4321 owner verified |
| Whitespace/links/scope | Final local paths/relative links, tracked and new-file whitespace, empty index and exact inventory checked |
| `npm audit --json` | Exit1; one high http-cache-semantics finding; not suppressed |

Browser fixture in the unchanged EVENT-001 harness intentionally tests escaped injection
text and missing-image fallback. New registry fixture separately enforces approved image
presence/bytes. Synthetic simulated build approvals exist only inside isolated temporary
test directories and do not confer production permission. Temporary fixture builds,
browsers and verification servers are cleaned up; primary managed dev server remains.

Local evidence: `.community-drafts/event-002/{check,build,tests}.log`, audit JSON,
baseline source/HTML SHA-256 inventories, main PR/run/deployment API records and
transition/navigation logs. Existing renderer browser evidence:
`.community-drafts/event-001/run-1793047569065`; full navigation evidence:
`.community-drafts/ux-001a`. These ignored files are local artifacts, not PR contents.
Canonical patch/hash are recorded after final review in ignored
`.community-drafts/event-002/review-manifest.json` and the review response; no
self-referential digest is embedded in a tracked file.

## Security/privacy assessment and limits

Both [SEC-002 findings](../security/SEC-002-SECURITY-ASSESSMENT.md) remain OPEN:

1. http-cache-semantics4.2.0: audit still reports one high finding; disputed semantics
   are not a waiver or verified remediation.
2. Magicast0.5.5: installed manifest still declares inlined source-map-js1.2.1;
   external source-map-js1.2.2 does not repair embedded code. Separately open residual.

No dependency update, audit suppression, severity downgrade, control bypass or owner
risk acceptance. Formal code/privacy/security review remains required before delivery
and separately authorized merge. No new real private master/registration/consent data
entered the repository; test email/phone/token-shaped rejection values are synthetic.

Lexical guards cannot establish that arbitrary prose/encoded identities are safe.
Administrators must sanitize outside Git and independently verify consent/copy/images.
Snapshots committed to this public repository are public immediately, including future
scheduled text; do not commit embargoed copy. Static schedules, expiry and withdrawals
need a successful new build/deployment; failed builds leave old production intact.
Git history, caches and downloaded copies cannot be revoked by a JSON state. Revision
rollback/monotonicity remains a Git reviewer responsibility; owner manifests are not
cryptographic signatures. Image signatures do not certify every possible file property.
No live Sheet provisioning/access review, real appointment approval, Linux/hosted CI,
Safari/Firefox, physical-device or manual screen-reader certification performed here.

## Proposed delivery

Commit and PR title: `feat(portal): add approved public showcase registry`.

Proposed PR description:

> Add a controlled sanitized JSON registry contract for the existing hackathon showcase.
> Reuse EVENT-001 categories, shared profiles/roles, consent and visibility rules; feed
> its unchanged renderer through a server-only snapshot plus independent digest-bound
> owner approval. Invalid, partial, unapproved or synthetic proposals block builds.
>
> Provide a Node24 exporter/validator, synthetic fixture, withdrawal/unpublish tests,
> local asset/attribution checks and administrator/schema documentation. No production
> snapshot, live Sheet, credentials, service or dependency is introduced. Preserve all
> event content and the2027 announcement. Record completed DEV-002 primary transition.
>
> Validation: check zero diagnostics, build28 pages,82/82 tests including actual isolated
> approved/rejected/unpublish builds; all28 production HTML files byte-identical to main;
> showcase8 viewport/theme cases plus no-JS and navigation28 cases pass. Audit exits1
> with one high cache finding; embedded Magicast residual separately OPEN. Human consent,
> content/privacy/security review and deployment for static withdrawal remain required.

Stop before staging/commit. Any later delivery must confirm this exact inventory and
review hash, then use explicit authorization for commit/push/draft PR. No merge/deploy
or REG-001 until separately reviewed/authorized and EVENT-002 is closed.
