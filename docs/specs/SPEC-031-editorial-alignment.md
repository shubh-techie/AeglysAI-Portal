# SPEC-031 — Publications, Media, Research and Footer alignment

Recorded2026-11-13. IMPLEMENTED locally for owner visual review; no Git delivery authorized. Baseline origin/main56b17c88d9e892ac5885c738468d2268e0bd803a includes merged PR44/45/46 and successful Pages run43443679391. Branchfeat/AEGLYSAI-PORTAL-DESIGN-003-editorial-alignment. Preserve localhost4321/PID76010.

## Scope and integrity

Apply DESIGN001 opt-in tokens and composition to only Publications, Media and Research. Improve existing shared Footer presentation across28routes; retain all text, destinations, accessibility information and event-specific content. Do not modify the homepage body, Speaking, Hackathon, navigation, theme controller, data, diagrams, APIs, dependencies, fonts or workflows.

Publications retains both working manuscripts and their InPreparation status, existing creator-profile/presentation links and literature-context qualification. No author list, venue, year, DOI, indexing, acceptance or publication metadata is invented. Use compact divider rows and editorial heading hierarchy; preserve paper anchors.

Media retains six approved records exactly once in existing publisher-date order. The first/newest dated record uses existing FeaturedStory; remaining five use unchanged MediaCarousel/MediaCard. Feature selection is recency, not an endorsement/ranking. Keep source attribution, dates, summaries, caveats, destinations and approved thumbnails. Unclamp headlines only on this route. FeaturedStory adds optional external-link target/rel/descriptive-label semantics with unchanged default behavior; no new component or carousel.

Research retains every approved paragraph, model/status/provenance, question, principle, method, limitation, experimental boundary and link. ModelD remains offline experimental/non-enforcing with enforcement_authority=NONE. Replace presentation-only card borders with readable rows; no scientific rewriting or evidence removal. Content-cleanup proposal is informational only; no substantive deletion/consolidation without owner approval.

Footer reuses existing Footer/CreatorLinks/BrandMark, canonical semantic tokens, theme palette and responsive grid. Larger secondary text,44px link targets, visible focus and responsive stacking. No new CTA, contact, legal destination or second footer.

## Architecture and preservation

Reuse EditorialSectionHeader and FeaturedStory, Hero/StatusBadge/ModelCard and existing Media components. Keep canonical stylesheet chunks/assets unchanged by importing canonical token/base CSS as raw, plus one shared opt-in three-page CSS source and one Footer CSS source. Inline footer styles inside the footer make its authorized effects precisely reviewable; no new client script. This extends the established DESIGN002 static composition, not a new design system.

Historical test adapter projects only the exact reviewed three mains/footer/source and the exact Media head stylesheet-link ordering change backwards. All prior hashes remain unchanged. Independent raw tests protect paragraphs, every link target/rel, data sources, metadata, unique media records, unchanged25routes outside footer and static assets; reject unreviewed main/footer/head/source changes. Native WebP products and dynamic Speaking interiors remain covered by existing decoding/approval/inventory tests, not new platform-dependent hashes. UTC month validation remains intact.

## Acceptance and observed validation

- Nine required widths320/375/390/430/768/1024/1280/1440/1920, both themes and JS/noJS;108target-page cases pass contrast>=4.5:1, footer44px targets/focus, image decoding/loading, carousel keyboard and page overflow checks.
- All28routes audited across11widths and two landscape sizes, both themes and JS/noJS:1456cases, zero overflow/offscreen/missing-local/runtime findings.
- Complete navigation44cases/484physical link activations; existing dropdown/touch/keyboard/focus/history behavior preserved.
- Frozen Home model carousel touch/counter/Enter/Space checks pass; Speaking white overlay and four click-only players preserved in both themes. Saved theme preference/reload/system reset/OS fallback pass.
- Astro check, production28route build and complete176/176test suite pass, zero skips. All64existing output assets unchanged;25non-target routes including Home/Speaking/Hackathon byte-identical outside the footer.92output paths retained. Actual localhost28routes HTTP200 and final bytes verified.
- Before/after screenshots, content inventory, performance/privacy limitations, exact file inventory and final canonical hash reference in ../design/DESIGN-003-REVIEW.md.

Owner approval of actual desktop/mobile result remains pending. No staged/committed/pushed/merged/deployed changes claimed. Cache and Magicast findings remain OPEN; Safari/Firefox, physical-device, manual screen-reader and field-performance coverage remain unverified. External article content and continuing provider availability are not certified by static tests.

## DESIGN-003A owner correction — 2026-11-13 (local review)

Owner rejected predominantly theme-inherited dark documentation treatment. Supersede the three-page-only/all-footer presentation scope above with one explicit Layout presentation policy and shared page CSS: navy Hero and warm ivory narrative on Publications/Media/Research/Architecture/About/Experiments/Community overview, with dark technical diagrams/evidence. Brand sections retain local color-scheme in Day/Night; existing preference controller/header and menu remain unchanged. One shared ivory alias uses the exact approved Home value; existing Home CSS is frozen rather than migrated.

Unknown/new pages opt out. Home body is frozen; Speaking/galleries/player/detail/PDF views, Community data/form/report routes and404retain specialized bodies. All eight Hackathon routes are excluded from both page and Footer refinements and match merged-main HTML exactly. Footer canonical token declarations are scoped to .site-footer to prevent overriding page-surface aliases; original Footer rendering remains on events. No per-page theme CSS, new component/framework/runtime JS, data/route/configuration/workflow change.

Preserve every existing paragraph/destination/status/evidence/NONE boundary. Raw historical guards now account for seven exact reviewed mains and unchanged excluded pages; no historical fixture hash is replaced. All178tests pass, check229files clean,28route build,288page/theme/device cases,1456all-route cases and484actual navigation activations pass. Eight event outputs and64assets exact to main;13specialized/Home bodies exact outside allowed Footer. Current route classification, screenshots, combined scope/hash method and remaining limits: ../design/DESIGN-003A-REVIEW.md. Previous DESIGN003 screenshot/hash evidence remains historical. Owner visual approval and all Git delivery remain pending.
