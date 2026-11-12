# SPEC-010 — Speaking & Presentations

Recorded 2026-10-07 (America/Chicago). IMPLEMENTED locally on
feature/speaking-presentations, based on `74c2963`, with earlier uncommitted documentation
synchronization preserved. No commit, release or deployment is established by this spec.
Current closure content: ATAI completed (certificate/schedule reviewed), GICITE confirmed/upcoming per user update, ETIC acceptance sent awaiting written confirmation, and two preserved proposals. Full PDF publication remains pending. See PORTAL-SPEAKING-FINAL below.
This is the next sequential specification after SPEC-009; existing specs remain in place.

## Scope and routes

- `/speaking/` uses Layout/Hero and the existing neutral theme, typography, cards, spacing
  and responsive grids. Speaking is added to the shared navigation in `project.ts`;
  the Header marks it current on both listing and detail routes.
- `src/pages/speaking/[slug].astro` uses `getStaticPaths()` for approved published records.
  Titles/descriptions/canonicals/social metadata use Layout; sitemap integration discovers
  generated detail pages. No approved record means no generated detail page.
- Empty listing: “No presentations published yet.” No fake cards, conferences, engagements,
  event dates, speaker appointments or placeholder metadata are published.
- Home conditionally adds a small Featured Presentations grid (maximum three explicitly
  featured, approved published records). With no approved records it is omitted.
- Existing research, proposed papers/talks, Media Coverage, hackathon content and hosting
  remain. Existing proposed talks/keynote do not become delivered presentations.

## Reusable frontend components

| File under src/components/speaking/ | Responsibility |
| --- | --- |
| PresentationCard.astro | Category, slide preview, title/description, metadata and accessible View Presentation detail link |
| PresentationThumbnail.astro | Reserved 16:9 frame, full-slide object-fit contain, lazy/async local first-page image or branded missing-preview state |
| PresentationMetadata.astro | Supplied speaker, slide publication date, optional recorded event/date and explicit slide-publication versus delivery wording |
| PdfViewer.astro | Titled lazy local PDF iframe, always-visible Open PDF/new-tab fallback and optional Download PDF |

The detail template reuses preview/metadata/viewer rather than duplicating card content.
Native browser PDF rendering needs no PDF.js, carousel/UI dependency or added client script.
Viewer support varies by browser/device; the Open PDF link is always available, including
without JavaScript. Optional download is a same-origin static asset link with the download
attribute, not a permission barrier against saving an already public PDF.

## Structured content and publication gate

`src/data/presentations.ts` owns the typed Presentation list and shared selection/date helpers.
The current list contains an approved ATAI preview, GICITE invitation and two proposals. Fields:

- slug, title, description, category, speaker: supplied public metadata.
- publicationStatus: DRAFT or PUBLISHED; approvedForPublication: explicit boolean approval.
- publishedDate: nullable YYYY-MM-DD slide publication date, independently of delivery.
- delivery: null, or approved public event + nullable date. Private evidence is reviewed separately outside this public repository.
- pdf: null for preview-only records, otherwise local path under public/presentations/ and downloadEnabled boolean.
- conference: optional name/shortName, startDate/endDate, mode, organizer and technical sponsor names/HTTPS URLs, and primary source URL; separate from delivery.
- thumbnail: null, or local path and source PDF_FIRST_PAGE.
- featured: explicit homepage selection boolean.

`publishedPresentations()` requires both PUBLISHED and approvedForPublication=true.
It validates unique safe slugs, nonempty core metadata, real calendar dates, local asset
paths/existence (including symlink confinement), the PDF header when supplied and first-page thumbnail
provenance/file existence when configured. Invalid approved records fail the build rather
than publish broken assets or unsupported event claims. The header check is not a complete
PDF parser or malware scanner; actual content/metadata approval still requires review.
Draft/unapproved records generate no cards/detail pages; no client data bundle is emitted.
Ordering is descending slide publication date, then slug; missing dates follow dated items.
`featuredPresentations()` filters that same approved list and caps Home at three.

A deck without delivery evidence says “Slides published” and “Event delivery is not
recorded.” An approved delivery record adds the supplied event/date and identifies delivery;
it does not infer a keynote, conference acceptance, affiliation or attendance. Evidence
must be public and appropriate for the repository, never private correspondence or contacts.
The software gate enforces fields; it cannot authenticate consent or event evidence.

## Assets and authoring workflow

1. Obtain the actual PDF and approved public metadata/rights. Keep drafts and unapproved
   PDFs/images outside public/ and preferably outside this public repository. Astro copies
   all public files regardless of metadata publication flags; those flags do not make assets private.
2. Review the PDF for publishable content, size, accessibility and text selection. Optimize
   its export at source when appropriate; this portal does not modify/compress approved PDFs.
3. Export the actual first PDF page to a bounded PNG. Optional authoring command:
   `node scripts/presentation-thumbnail.mjs supplied.pdf first-page.png`.
   macOS uses existing sips/ImageIO; other systems need optional system pdftoppm (Poppler),
   or a manual first-page export. No npm dependency or build requirement is introduced.
   Export preserves the slide, caps the longest edge at 960px, and refuses to overwrite
   existing output. Visually review it; the UI contains it inside the 16:9 frame without cropping.
4. Only after approval, place public assets under public/presentations/, using simple safe
   paths and preferably versioned filenames, and add the record to presentations.ts.
   Mark publicationStatus/approval explicitly; set delivery only with approved evidence.
   If page-1 export is unavailable, use thumbnail=null to show the branded fallback.
5. Run Node 24 check/build/test and preview listing/detail/Home, PDF fallback and downloads.
   Rebuild after metadata/assets change; deployment remains a separate authorized task.

Local assets use `asset()` and generated detail links use `href()`. PDF bytes are served
statically and fetched only when opened/when the lazy viewer loads; cards load thumbnails,
not embedded PDFs. No runtime scraping, database, API, analytics or external PDF hosting
was introduced. Hosting cache/range behavior is outside this implementation and unverified.

## Acceptance and validation

- An empty configuration emits /speaking/, its metadata/sitemap/nav, zero detail
  records and no Featured Presentations section. No synthetic presentation assets/metadata
  occur in repository public/ or production dist/.
- Approved records generate reusable listing/detail/featured output with all supplied fields,
  16:9 lazy previews, distinct published/delivered wording, canonical URLs and preserved media.
- Native iframe has a descriptive title, local PDF URL, lazy loading and reserved dimensions;
  Open PDF fallback is always usable, and download appears only when enabled.
- Invalid paths, duplicate slugs, missing/invalid PDF headers, invalid dates, missing thumbnail
  files and delivery claims without evidence fail validation. Unapproved/draft entries are omitted.
- Responsive light/dark navigation/cards/viewer, visible focus and no page overflow; no added
  browser library or backend. Physical-device PDF compatibility remains a browser limitation.

Application validation outcomes are recorded in DEVELOPMENT_LOG.md. Synthetic local fixtures
are tested in an isolated temporary project, clearly marked LOCAL TEST ONLY, never the real
publication configuration. No real approved content or event delivery is claimed by those tests.

Related: [SPEC-001](SPEC-001-creator-profile.md), [SPEC-004](SPEC-004-participation-workflow.md),
[SPEC-009](SPEC-009-media-coverage.md), [README](../../README.md#speaking--presentations)
and [development log](../DEVELOPMENT_LOG.md). Existing static architecture and ADR guidance
are preserved; there is no new hosting/content-system decision requiring an ADR.


## Supplied deck review — 2026-10-07

The user attached a 15-page, 960×540 PDF. Cover title: Beyond Static Access Control;
speaker: Shubh Prabhat. Its filename describes Beyond RBAC / Adaptive Authorization,
so the proposed title follows the actual cover pending user approval. Proposed category:
Adaptive Authorization / Zero Trust. Description summarizes contextual/behavioral/operational
risk and policy-bounded explainable responses, without claiming validated outcomes.

Record slug beyond-static-access-control is DRAFT, approvedForPublication=false,
publishedDate=null and delivery=null. PDF creation/modification metadata is not used as
publication date; no event, keynote invitation or delivery is inferred from local folder names.
Actual original bytes and the 960×540 page-1 PNG are staged outside public/ in a temporary
review directory. Public asset paths in the draft are reserved destinations only; no private
folder path is stored in repository metadata/docs or output. Original PDF remains unchanged.

Slides 13/15 contain screenshot/QR placeholders; slide 13 also uses an old AegisAI heading
and a printed repository link differing from current project configuration. These are review
findings, not silent PDF edits. Explicit approval or a finalized PDF is needed before copying
assets into public/, activating the record, generating its detail page and featuring it.
Validation outcomes and exact source-byte hash are in DEVELOPMENT_LOG.md.

## 2026-10-07 — Approved first-page preview and conference context

The user authorized the first-page image and speaking information, and supplied ATAI 2026
conference details. The record is now PUBLISHED/approved with pdf=null and the actual
960×540 first-page PNG under public/presentations/. One detail page and one homepage
feature are generated. The full PDF remains private; the original is unchanged.

Conference metadata: International Conference on Advanced Technology and Artificial
Intelligence (ATAI 2026), September 26–27, 2026, hybrid; organized by ACM Houston Chapter
USA and technically sponsored by The Institution of Engineers and Scientists (IoES).
Source: [organizer conference page](https://houston.acm.org/atai2026.html), checked 2026-10-07.
Conference association supplied by the user is not a delivery/keynote/attendance claim.
Publication date and delivery remain null.

Preview-only records require an approved actual first-page image. PDF records retain the
native viewer, fallback and optional download. Preview-only details show no iframe or PDF
links. Conference dates must be valid and ordered; source/organization URLs must use HTTPS.
No dependencies added; Media Coverage preserved.

## Publications page synchronization

The approved Beyond Static Access Control preview also appears in a Presentation resources
section on /publications/, using the shared PresentationCard and approved records helper.
The earlier proposed title Beyond RBAC: Adaptive Authorization for Zero-Trust Cloud Systems
is identified as the prior title and removed from project.ts's proposed talks. The two
remaining talks retain Proposed / In Preparation badges. Page introduction distinguishes
working papers/proposals from approved previews; this does not establish event delivery
or conference acceptance.

## 2026-10-08 — Publications/Speaking consolidation (current behavior)

Supersedes the 2026-10-07 Publications display follow-up: Publications retains both existing
manuscripts and links to Speaking; presentation cards and proposed talks now appear only in
Speaking (plus the existing conditional homepage feature). No journal/conference publication
records were supplied, so none were invented. All talk content is centralized in presentations.ts;
the duplicated project.ts talks array is removed. Preserve the earlier Beyond RBAC title in
the ATAI record's previousTitle. Existing routes unchanged; no old proposal detail routes existed.

Public participationStatus supports Invited, Confirmed, Upcoming, Completed, Proposed, Resources.
Resources separates an approved preview from unverified participation. Empty categories show
honest messages. Status is explicit and independent of calendar dates and approval to display
metadata; PUBLISHED means an approved portal record, not research publication or event delivery.
Change Invited → Confirmed only after acceptance is verified; Upcoming denotes confirmed scheduling;
Completed requires recorded delivery, and delivery conflicts with other explicit statuses fail validation.
Private evidence/letters must stay outside this public repository and build inputs; the public model
holds only display metadata. No private evidence field or invitation documents are emitted.

GICITE record: WRU Key Talk as keynote invitation; Invited — awaiting acceptance/participation
confirmation. Talk title and abstract To be confirmed; slides Not yet published. User supplied
invitation attribution is World Research Union (WRU) and Organising Committee. Event November 6–7,
2026; venue Technische Universität Berlin, Germany explicitly attributed to organizer. Official
[conference site](https://gicite.com/) checked 2026-10-08 lists dates/venue, with venue wording
also mentioning future updates. Site describes WRU/LCARE organizers; preserve invitation-specific
attribution rather than infer IEEE issued an invitation. User-provided invitation is not independently
audited, accepted participation or proof of delivery.

Reusable cards/detail pages show speaker, public status, title, description/abstract, event/organizer,
date/venue when supplied, event link, and actual slide preview/PDF links when available. Missing
fields explicitly show To be confirmed; no imaginary downloads. Both proposal titles are retained
with new stable slugs. relatedPaperTitles references existing project.ts papers; both Publications
and details generate reciprocal links/anchors. No association is configured without supplied evidence.
Native PDF viewer/download remain available only for validated actual files. No dependencies added.

Acceptance: Publications has no talk cards/proposal list; Speaking contains four records grouped
accurately; GICITE shows no confirmed/delivered/IEEE invitation claim; all existing routes and media
links remain; no new private document or PDF asset; check/build/tests and responsive preview pass.

## 2026-10-08 — Speaking portfolio UX redesign (current layout)

Audit: prior page mixed event metadata and technical previews in the same tall card and
rendered empty status headings. Invitation cards had unnecessary slide placeholders, repeated
pending fields and weak hierarchy. The new layout preserves the same records, routes, viewer
and manuscript references while replacing the listing composition.

1. Dark-navy hero: Speaking & Technical Presentations / Ideas Worth Sharing, supplied subtitle,
   restrained blue navigation links to engagements/library. No stock photography or illustrations.
2. FeaturedEngagement wraps reusable EngagementCard for the latest event-dated invited,
   confirmed or upcoming record. GICITE shows WRU Key Talks, Invited Keynote Speaker,
   November 6–7, Berlin, invitation received/participation not yet confirmed, pending talk
   title and unavailable slides. Metadata is selected from the canonical record, not duplicated.
3. Engagement gallery: event records with explicit Invited/Confirmed/Upcoming/Completed
   participation only, two columns above 767px and one below. All plus only matching status
   filters; Confirmed/Upcoming combined. Native radio controls and CSS :has filtering support
   keyboard arrows/focus without client JavaScript. Browsers without :has retain all cards;
   filtering needs :has support. No empty-status sections. Featured record remains available
   in All gallery intentionally; both views use the same record/component.
4. Technical talks/slide library: existing PresentationCard simplified to topic/category,
   abstract/description, proposal/resource label and separate slide availability. Contains
   proposals or actual PDF/thumbnail resources, not slide-less invitations. Real ATAI cover
   remains; proposals use branded unavailable-preview state. PDF View/Download actions
   appear only with validated files (download additionally requires enabled flag). Detail links
   remain available even without slides. Shared homepage cards receive the same concise design.
5. Compact technical topics/collaboration panel uses supplied focus areas and the existing
   creator GitHub profile link; no configured contact email/form exists, so none invented.

speakingView derives public fields id (existing slug), title/talkTitle, eventName, organizer,
role, series, eventDate, location, status, abstract, slidesUrl, thumbnailUrl,
relatedPublicationIds and externalEventUrl from the existing typed model. slideStatus is
independent: Published / Preview only / Not available. Optional role/series/location/talkTitle
are canonical metadata additions. Nullable talkTitle explicitly means pending, not event title.
Related publication IDs map existing manuscript anchors; titles remain single-source project.ts.
No new database, package, UI framework or client script. Private evidence remains outside public
source/assets. Cards use shared theme tokens; light content in light mode and existing dark-mode
surfaces when selected. Hero stays navy in both. Native keyboard controls, 44px targets,
heading/fieldset labeling, focus outlines and reduced-motion styling retained.

Acceptance/validation: same twenty HTML routes, all four detail links, manuscripts/media preserved;
only All/Invited filters currently appear; gallery excludes proposals and library excludes invitation;
no non-existent PDF action; desktop/tablet/mobile and both themes verified. Explicit invitation
status must remain visible in feature/gallery; no delivery/acceptance/IEEE attribution inferred.

## PORTAL-SPEAKING-FINAL — specification before implementation, 2026-10-08

This closure section supersedes earlier status snapshots without rewriting their history.

### 1. Purpose and scope
Finalize three conference records in the existing portfolio; retain proposals, designs, navigation,
themes and URLs. No new CMS/database/framework, deployment, commit or push.

### 2. Current implementation inventory
Static Astro/TypeScript/CSS; canonical records in src/data/presentations.ts; speakingView and
speakingPortfolio derive display data. /speaking/ and [slug].astro reuse EngagementCard,
FeaturedEngagement, PresentationCard/Thumbnail/Metadata and PdfViewer. Publications keeps
project.ts manuscripts. Creator metadata/photo are src/data/creator.ts and existing public image.
Only approved public slide asset is the ATAI first-page PNG. No src/content collection exists.

### 3. Conference data model
Extend the same Presentation interface only: conference name/acronym, date range, organizer,
sponsor/mode/venue/source URL; public speaker role, topics, title and independent participation
status. Optional local validated PDF/image references and publication associations remain.
Private correspondence and evidence paths must not enter records or public assets.

### 4. Conference status definitions
Completed: delivered, supported by completion evidence. Confirmed/Upcoming: accepted future
participation; organizer evidence tracked separately. Invited: invitation only. Acceptance Sent:
acceptance reported, written organizer confirmation not located. Proposed: technical topic only.
Resources: slide-only content without established engagement. Date passage never changes status.

### 5. Speaker role definitions
ATAI Keynote Speaker is supported by inspected certificate/schedule. GICITE Invited Keynote
Speaker / WRU Key Talks is supplied by invitation/task. ETIC exact role is To Be Confirmed;
do not infer keynote from a generic conference speakers page. AeglysAI is not an organizer.

### 6. Completed versus upcoming decisions
ATAI: Completed. Inspected private certificate explicitly states delivery of Beyond Static Access
Control: AI-Driven Adaptive Security for Resilient Cloud-Native Systems during September 26–27.
Schedule names September 26; use that presentation date without inferring a time. Retain slug.
GICITE: Confirmed — Upcoming per this task's user update; actual organizer confirmation remains
NEEDS VERIFICATION. Existing organizer-stated TU Berlin venue is corroborated on official site,
which also uses provisional wording; retain attribution, not an independent venue guarantee.
ETIC: Acceptance sent — awaiting confirmation because no written organizer record was located
in repository or inspected supplied evidence directories. Latest user says confirmed but explicitly
requires the written-record gate; apply that gate. Role/title TBD; dates December 11–12, Los Angeles.

### 7. Presentation gallery behavior
Keep featured GICITE (eligible confirmed future record), three conference engagement cards,
status-aware filters and separate existing technical library/proposals. Acceptance Sent gets a
matching awaiting-confirmation filter; completed shows actual available preview without imaginary
PDF/recording/gallery links. Existing routes remain, one new ETIC detail via existing template.

### 8. PDF/document assets
ATAI approved actual cover PNG remains public. Full supplied PDF stays private pending separate
publication approval (known draft placeholders); no new slides made or PDF silently published.
Certificate, invitation, email exports and unapproved images stay private. Only configured, confined,
existing files enable PDF iframe/View/Download actions. No unavailable recordings/certificates linked.

### 9. Speaker biography consistency
User-approved professional designation Solution Architect; project designation Creator & Maintainer,
AeglysAI; focus AI-Driven Automation for Resilient and Secure Cloud & Distributed Systems; website
https://aeglysai.com/. Update creator source/shared profile, reuse approved actual portrait. Do not
rewrite historic slide author designation or unrelated research assertions.

### 10. Evidence requirements
Create docs/speaking/SPEAKING_EVIDENCE_TRACKER.md with AVAILABLE/PENDING/NOT APPLICABLE/
NEEDS VERIFICATION for twelve requested artifact types per conference. AVAILABLE means located,
not publicly licensed or independently authenticated. Do not include correspondence/contact/private
folder paths; record artifact descriptions, verification limits and public source URLs only.

### 11. Accessibility
Semantic headings, accessible status text, native keyboard filters, visible focus, descriptive links,
real portrait alt text, decorative slide alt with adjacent title, titled lazy PDF viewer/fallback.

### 12. SEO/social metadata
Existing Layout provides unique titles/descriptions, canonical aeglysai.com URLs, OG/Twitter metadata
and actual 1200x630 social preview. Preserve sitemap/root routing; no unsupported structured data.

### 13. Responsive design
Preserve navy hero, existing light/dark tokens, 2/1 engagement gallery, 3/2/1 technical cards and
16:9 previews. Verify desktop/tablet/mobile including compact speaker metadata.

### 14. Acceptance criteria
Exactly three distinct conference records plus two preserved proposals. ATAI completion and full
verified title; GICITE confirmed/upcoming with evidence limitation tracked; ETIC written-record gate.
No broken/disabled downloads or private assets; shared creator role consistent; all existing routes,
SEO/media/hackathon features pass checks. Run npm ci, check, build, tests, diff check and bounded
browser verification. No separate lint/typecheck scripts exist; npm run check supplies Astro typing.

### 15. Outstanding evidence/TBD
GICITE organizer confirmation and exact scheduled title; ETIC written confirmation/exact role/title;
public speaker listings/agendas; approved final full ATAI PDF; licensed event photographs/recordings.
ATAI certificate located privately, not invented or automatically published. Public tracker is an
artifact inventory, not a disclosure of private evidence. No release/deployment claim.

Closure implementation inventory: Acceptance Sent extends the same status model/filter; ETIC
uses /speaking/etic-2026/ in the existing dynamic template. Shared SpeakerProfile uses creator.ts
and approved portrait; CreatorProfile consumes the same role/focus. Full ATAI title comes from
certificate; original cover and slide author text remain unchanged. Evidence tracker is linked
from README/specs, not public correspondence. See [tracker](../speaking/SPEAKING_EVIDENCE_TRACKER.md).

## SPEAK-001 — Conference and recording showcase, 2026-11-12

IMPLEMENTED locally for review. Main baseline6ee5480 includes merged CI003; successful Pages
run41685813558/build+deploy verified. Preserve canonical presentations.ts and all detail URLs,
Home/Publications/Media, hackathons/navigation and research boundaries. Only the Speaking
listing changes; no public conference photos or full PDFs added.

The new theme-aware research hero leads to delivered ATAI feature, three status-filtered
conference records, separate AEGYTHON community recordings, approved technical resource and
compact proposed-topic cards, plus research collaboration CTA. Omit unavailable media areas;
no slide-placeholder panels on the listing. Preserve three events, two proposals and exact
approved title/role/status/source data. GICITE date passage cannot imply delivery: display a
completion-unverified note while retaining stored Upcoming metadata. ETIC remains awaiting
written confirmation; no keynote inferred.

Versioned strict1.0.0 event/photo/recording schema derives metadata from existing approved
presentations; no duplicated event facts in markup. Photos require matching event IDs,
rights/subject/content/publication approvals, credit/source, exact digest and confined local
asset;0–4initially. Astro creates responsive lazy WebP images and bounded full views. Native
links work without JS; dialog enhancement supports arrows, Tab/Shift+Tab containment, Escape,
focus return and unavailable-image text. No unapproved/candidate original copied.

Official YouTube oEmbed returned exact titles/channel for all three supplied IDs on2026-11-12.
They identify AEGYTHON2026 community sessions, not conference-session delivery, and remain in
a distinct recording section. Watch links only: no autoplay, initial remote thumbnail or player.
Full metadata/approval/status inventory is in
[SPEAK-001 inventory](../speaking/SPEAK-001-CONTENT-INVENTORY.json).

Acceptance: preserve the approved source distinctions/links, all routes and27unrelated HTML
outputs; all seven requested viewport widths, both themes, keyboard/focus/Escape, no-JS
fallbacks, metadata/rights rejection and actual0–4image pipeline tested. All old historical
content/CSS pins remain, with an explicit test-only inverse Speaking delta and retained
historical stylesheet bytes; new raw-output/style checks reject drift. New initializer is
allowed only on Speaking, retaining other script/iframe restrictions.

Actual results, before/after evidence and limitations are recorded in
[SPEAK-001 review](../speaking/SPEAK-001-REVIEW.md). No commit/push/PR/merge/deployment.
See [authoring guide](../speaking/SPEAK-001-AUTHORING.md) and
[ADR-015](../adr/ADR-015-speaking-showcase-media.md). No new dependency/backend/CMS/feed;
future approved Google publishing remains a separate operator workflow. Security findings OPEN.
