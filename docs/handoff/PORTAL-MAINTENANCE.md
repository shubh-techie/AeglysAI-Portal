# Portal maintenance handoff — prepared, not activated

FINAL-001,2026-10-26. Enter maintenance mode only after owner review, authorized scoped
Git delivery, required security/privacy review, successful Pages deployment and live
verification. No maintenance transition, Enterprise work, hosting change or public feed
activation is performed here. Cache/Magicast findings and publication restrictions stay open.

## Profiles and photographs

The single private People Sheet has stable Profile_ID, Role, Name, Affiliation/Company,
Designation, LinkedIn_URL, Photo_ID, Status and Notes. Preserve dropdowns and do not read
Notes into a biography. Edit allowed source fields or add distinct role rows sharing one
consistent identity. Upload/replace a photograph in the approved private library and
update Photo_ID if necessary. Original bytes must remain preserved; circles are CSS only.

Use [People guide](../hackathons/PEOPLE_PREVIEW_GUIDE.md) for exact initial ADC login/client
and readonly scopes; credentials/client files stay outside Git. From the primary Node24
checkout use `node scripts/community/profile-sync.mjs doctor` then
`node scripts/community/profile-sync.mjs people-preview`. AUTH_REQUIRED/ACCESS_DENIED fail
closed; existing local preview is not live source truth and cannot learn offline withdrawal.
Do not make the Sheet/folder public or extract connector tokens to bypass ADC.

Reuse localhost4321 through [local lifecycle](../LOCAL_DEVELOPMENT.md). Inspect PID/cwd/
branch before start/stop; one primary server, strict port, no unrelated Node termination.
Preview has real Pending records and separately marked fictional data, unavailable in
production. Browser-visible assets are feed-member/digest gated; private staging remains
403 through Vite. Never commit ignored photo originals/source config/evidence or credentials.

For future real publication, People Status=Approved alone is insufficient. Obtain exact
public copy/role/links/affiliation, consent, image ownership/usage/attribution and no current
withdrawal; prepare the existing sanitized EVENT-002 candidate/asset manifest, validate,
then request an independent owner approval tied to the exact digest/revision/record set/
version and current expiry. Generic Speaker/Organizer use registry1.1; old1.0 roles remain
supported. New text/photo/path/rights/roles require fresh approval. Follow
[registry operations](../hackathons/PUBLIC_SHOWCASE_REGISTRY.md), not a second profile store.
Only explicitly authorized files enter Git; staged hash/inventory review, normal push,
reviewed PR, authorized merge and verified deployment remain separate steps.

Optional future approved public-feed hosting uses existing organization Pages with
versioned approved JSON and hashed assets; no URL is invented or endpoint enabled by this
handoff. Operator feed fetch needs explicit public URL and independently reviewed pin;
only exact pinned unexpired asset-valid cache can handle availability errors. Invalid,
changed, revoked or expired proposals reject. No scheduled or browser-private-Sheets sync.

## Research status

Read the current frozen source status and disclosure policy read-only before changing
public claims. Record source commit and permitted high-level claim/limits in
[research evidence](FINAL-001-RESEARCH-EVIDENCE.md), update modelDStatus/home/research and
relevant current summaries together, and run all tests. Do not copy restricted artifacts,
metrics or novel technical detail. Research implementation completion is not external
validation, enforcement authority or a commercial/security release. Keep NONE/drift/
feedback/external-validation limits visible. Historical reports remain historical.

## Release verification and monitoring

Use Node24; run `npm run check`, `npm run build`, then `npm test` against dist. Preserve
historical fixtures. When an approved change modifies pinned content, review and regenerate
only its explicit preservation delta with independent live-behavior tests; never change a
hash to conceal an unintended regression. Verify all routes/links/private-output scans,
mobile/desktop/themes/no-JS/keyboard/drawer and approved cards before delivery.

After authorized merge, inspect GitHub Actions Pages run at the exact merge SHA, then
its deployment/environment success. A commit, push or green local build is not deployed
proof. Verify live root, Research menus,2026 secondary navigation/anchors, People & Partners,
registration/challenges/qualification,2027 Coming Soon and research wording. Confirm that
Pending/demo/withdrawn data remains absent. Record actual URLs/SHAs/results, not assumptions.
No PR workflow/security approval should be inferred from a main-only deployment check.

## Emergency withdrawal and failure handling

Immediately record withdrawal/revocation in private administration, stop planned publication
and obtain organizer confirmation. Source sync may reject/suppress but does not remove a
previously deployed record. Prepare an explicitly approved replacement/empty snapshot and
owner manifest, validate withdrawal and dependent role/team removal, then use expedited
separately authorized review/deployment. Verify live replacement and consider CDN/browser
cache lag, copied downloads and Git history. Do not use reset/force push or claim cached
copies were recalled. Offline pins cannot discover new revocation before expiry; change
trusted configuration and deploy approved removal promptly. Do not silently fall back to
an older profile after a rejected proposal.

Keep current cache high advisory and separate embedded Magicast concern documented and
unsuppressed. Route remediation/risk decisions to security owners in a separate scoped
change. No unauthorized override/waiver or weakened CI. Monitor Pages/errors/link expiry
and recheck Discord before its documented2026-11-14 expiry. Content access problems do
not justify changing official rules/dates or importing private external registrations.
