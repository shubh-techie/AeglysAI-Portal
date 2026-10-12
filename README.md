# AeglysAI Research Portal

**Adaptive Intelligence for Secure & Resilient Distributed Systems**

Observe. Assess. Authorize. Respond.

A static public research website built with Astro, TypeScript and CSS. The [AeglysAI-Portal repository](https://github.com/shubh-techie/AeglysAI-Portal) is separate from the [AeglysAI research/application repository](https://github.com/shubh-techie/AeglysAI). Research theme: AI-Driven Automation for Resilient & Secure Cloud/Distributed Systems.

## Project records and agent workflow

Start with [AGENTS.md](AGENTS.md), then read [Project history](docs/PROJECT_HISTORY.md), [Development log](docs/DEVELOPMENT_LOG.md), and relevant [specifications](docs/specs/README.md) and [ADRs](docs/adr/README.md). Inspect Git history before making changes. These records provide durable context for future sessions.

The development workflow is:

```text
main -> feature branch -> implementation -> local validation -> commit -> push
     -> pull request -> CI -> merge -> delete feature branch
```

Preserve existing commits and use new commits for corrections. Do not rewrite history, amend historical commits, alter their dates/authors or force push. Keep one logical change per commit and follow the current task's authorization before committing or publishing. Update the development log for meaningful work; significant functionality needs a SPEC, and important architectural decisions need an ADR.

This workflow describes the required process, not existing branch-protection settings. The deployment workflow has no pull-request trigger; pre-merge PR CI remains a setup task.

## Local development

Use Node.js 24 LTS (`nvm use` if you use nvm) and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Astro at `/`. Development and preview use the same root routes as production.

```sh
npm run check
npm run build
npm test
npm run preview
```

`npm test` checks the built `dist/` output, so run the build first. Production pages contain a small inline theme script; Home and Media Coverage also include a scoped carousel script, with no client JavaScript bundle. Theme defaults to the system preference; the header sun/moon button saves a light/dark choice in localStorage, and the monitor button restores system mode. No React, database, backend, authentication, CMS, analytics, cookies, external fonts or marketing SDKs are included.

## Site structure

| Route (relative to the configured base) | Page                  |
| --------------------------------------- | --------------------- |
| `/`                                     | Home                  |
| `/research/`                            | Research              |
| `/architecture/`                        | Architecture          |
| `/experiments/`                         | Experiments           |
| `/publications/`                        | Publications & Talks  |
| `/about/`                               | About & Roadmap       |
| `/media/`                               | Media Coverage        |
| `/speaking/`                            | Speaking & Presentations |
| `/speaking/<approved-slug>/`             | Approved presentation details |
| `/hackathons/`                          | Community Hackathons  |
| `/hackathons/events/`                   | Hackathon Events      |
| `/hackathons/community/`                | Hackathon Community   |
| `/hackathons/adaptive-authorization/`    | Adaptive Authorization event |
| `/hackathons/behavioral-risk/`           | Behavioral Risk event |
| `/hackathons/autonomous-resilience/`     | Autonomous Resilience event |
| `/hackathons/sponsors/`                  | Sponsorship program |
| `/404.html`                             | Custom not-found page |
| `/robots.txt`                           | Generated crawl policy |
| `/sitemap-index.xml`, `/sitemap-0.xml`   | Generated sitemap files |

Fifteen content routes plus a custom 404 currently generate sixteen HTML files (including the three retired-proposal compatibility routes from
`src/pages/hackathons/[event].astro` using `getStaticPaths()`), plus `robots.txt`.
Approved presentation records add detail pages to that total. The current community-sprint build reports twenty-seven HTML pages; robots.txt and sitemap files are additional crawl output. `/media/` is
linked from Home; the shared header navigation remains unchanged by the media feature.

## Frontend architecture and content ownership

Astro builds TypeScript data and `.astro` templates into static HTML and CSS in `dist/`.
`astro.config.mjs` sets static output, trailing slashes, the root base and sitemap integration.
There is no runtime content API: edits to repository data or assets require a rebuild.

| Layer | Implementation and responsibility |
| --- | --- |
| Page shell and metadata | `src/layouts/Layout.astro`: shared Header/Footer, skip link, author, canonical, Open Graph/Twitter and noindex handling |
| Shared UI | `src/components/`: Hero, SectionHeading, StatusBadge, ModelCard, ArchitectureDiagram, ResearchTimeline, CreatorProfile/CreatorLinks and BrandMark |
| Theme | ThemeInit/ThemeControls and `src/styles/global.css`: semantic `light-dark()` tokens, system preference and optional `aeglysai-theme` localStorage setting |
| Speaking UI/content | `src/components/speaking/`, `src/data/presentations.ts`, `/speaking/` and `[slug].astro`: approved local PDF records, reusable previews/cards/metadata/viewer |
| Media UI | `src/components/media/MediaCarousel.astro` and `MediaCard.astro`: shared compact/full cards and native scroll-snap carousel |
| Hackathon UI | `src/components/hackathons/`, HackathonNav, HackathonRegistration and HackathonPersonCard; scoped `src/styles/hackathon-experience.css` used by the series and sponsor experiences |
| Research and creator content | `src/data/project.ts`: project/models, proposed papers/talks and research timeline; `creator.ts`: supplied public identity/photo/profile links |
| Media content | `src/data/media.ts`: six typed records, date evidence, thumbnail provenance and sorting; both pages call `sortedMediaArticles()` |
| Hackathon content | `hackathons.ts`: events; `hackathonExperience.ts`: landing copy; `hackathonPeople.ts`: consent-filtered public profiles; `hackathonForms.ts`: five canonical intake settings |
| Sponsorship and social metadata | `hackathonSponsorship.ts`: proposed tiers/approved recognition; `hackathonSeo.ts` and `social.ts`: page and social-preview configuration |
| Assets and crawl output | `public/`: copied local assets including brand PNGs, portrait, social preview and `.nojekyll`; `src/pages/robots.txt.ts` and sitemap integration generate crawl files |
| Verification and hosting | `scripts/site.test.mjs`: built-output checks; `.github/workflows/deploy-pages.yml`: Node 24 build/check/test and Pages deployment restricted to main |

The conceptual research diagram on `/architecture/` describes the separate research
initiative; it is not the portal's deployment topology. The portal has no database,
authentication, application backend or experiment runner. Draft operational documents
under `docs/hackathons/` do not create external Forms/Sheets/Drive workflows.

Theme initialization is inline on every HTML route. Home and `/media/` additionally
include the inline carousel initializer and image-error handlers. No client framework,
client JavaScript bundle, carousel library or runtime publisher metadata fetch is used.
Without JavaScript, theme follows CSS/system preference, theme controls stay hidden and
media cards remain horizontally scrollable with inactive carousel controls hidden.

### Dependencies

Current direct dependencies from `package.json`: Astro `^7.3.4` and `@astrojs/sitemap`
`^3.7.4`; development tools are `@astrojs/check` `^0.9.10` and TypeScript `~5.9.3`.
`package-lock.json` pins resolved packages. Node 24 is selected by `.nvmrc`; the package
engine range is broader (`>=22.12.0`). Media and brand asset integration in `85332d9`
introduced no dependency or lockfile changes. Native DOM APIs, ResizeObserver and CSS
scroll snap provide the carousel. Existing architectural decisions are retained; the
[ADR directory](docs/adr/README.md) contains guidance, not a fabricated historical ADR.

### Images

Local asset URLs use `asset()` from `src/data/project.ts`. `CreatorProfile.astro` checks
portrait existence at build time and uses an initials fallback if absent. BrandMark
selects existing PNG symbols by theme; Layout uses PNG favicon and Apple touch icons.
The 1200×630 social preview comes from `social.ts`, independently of media thumbnails.
Public files are copied as supplied/exported; there is no Astro Image transformation
pipeline or automatic remote thumbnail compression/srcset generation in this code.
Media uses publisher HTTPS URLs directly, reserved 16:9 frames, lazy loading and async
decoding. See the [Media Coverage section](#media-coverage) for failure behavior and provenance.

## Research content and integrity

The initial content follows TASK PORTAL-001; the separate application source has not been audited in this repository. Models A–C are labeled implemented according to that specification:

- A: RBAC.
- B: RBAC + ABAC.
- C: RBAC + deterministic contextual risk.
- D: RBAC + ABAC + behavioral adaptive risk — **planned research**, not implemented.

Implementation is not evidence of measured research outcomes. Architecture diagrams are conceptual: solid nodes describe existing baseline capabilities, while dashed amber nodes describe proposed research. Telemetry instrumentation and the feedback loop are shown as planned, without asserting deployed service topology. The decision outputs are conceptual vocabulary, not a per-model capability matrix.

Hypotheses await the finalized research specification. Papers and talks are in preparation. There are no invented measurements, citations, affiliations, acceptance claims or publication metadata. `Experimental` is defined as a status reserved for work under evaluation; no completed comparative experiment is claimed.

## Creator and professional profiles

Creator details are centralized in `src/data/creator.ts`. About presents the technical biography and research interests; the footer and Publications page reuse the supplied professional links. LinkedIn has an unlinked About slot until a verified URL is provided.

The supplied creator portrait is stored unchanged at `public/images/shubh-prabhat.jpg` (the attachment contains JPEG data). About displays it as a round 200px desktop / 160px mobile avatar using CSS, with meaningful alt text, lazy loading and the GitHub Pages base-path helper. The source image is not retouched, converted or destructively cropped. The build retains an accessible initials fallback if the configured image is missing.

See [creator specification](docs/specs/SPEC-001-creator-profile.md) and [Portal V1 review](docs/PORTAL_V1_REVIEW.md) for implementation status, validation and remaining limitations.

## Deployment

The portal is configured to deploy through **GitHub Pages using GitHub Actions**.

Canonical production URL: **https://aeglysai.com/**

The deployment workflow is `.github/workflows/deploy-pages.yml`. It runs on pushes to `main` and supports manual `workflow_dispatch` runs from the Actions tab. Only `main` can deploy; manual runs on other branches perform the build and checks without publishing.

The build job uses Node 24 from `.nvmrc`, runs `npm ci`, `npm run check`, `npm run build`, and `npm test`, then uploads `dist/` with the official `actions/upload-pages-artifact` action. The deployment job configures Pages and publishes that artifact with `actions/deploy-pages` in the `github-pages` environment. This follows the official GitHub Pages static-site build/artifact/deploy approach with explicit npm steps for the Astro build.

Permissions are scoped by job: the build receives `contents: read`; deployment receives only `pages: write` and `id-token: write`. Concurrent deployments are serialized. The workflow uses GitHub's token; no personal access token or third-party hosting service is needed.

### Deployment workflow

1. In this repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. After review, commit and merge approved portal changes into `main`. The push triggers the workflow. Alternatively, run **Deploy AeglysAI Portal to GitHub Pages** manually on `main` after the workflow is available on the default branch.
3. Check the workflow's build and deployment jobs and the `github-pages` environment URL.
4. Verify all routes listed above, including Media Coverage, hackathon event details, sponsors and a missing route on the published site. Confirm styles, navigation, favicon and the custom 404 work.

Configure and verify the production custom domain in GitHub Pages before deployment. A successful local build does not publish changes; the workflow deploys the reviewed version after it reaches `main`.

### Custom-domain root configuration

`astro.config.mjs` is the production URL source of truth:

```js
site: "https://aeglysai.com",
base: "/",
```

The deployment workflow uses this configuration directly, without `SITE_URL` or `BASE_PATH` overrides. The static output and GitHub Pages build/upload/deploy architecture remain unchanged. Do not restore the former repository prefix when building for this domain.

Internal navigation resolves to `/`, `/research/`, `/architecture/`, `/experiments/`, `/publications/` and `/about/`. CSS, PNG brand icons, social preview and creator photo are served from root paths; media thumbnails use external publisher URLs. Canonical and Open Graph URLs use `https://aeglysai.com`; robots.txt references `https://aeglysai.com/sitemap-index.xml`. The build includes directory indexes plus `404.html` and requires no application server.

The site uses system fonts, a local PNG favicon and inline SVG/HTML diagrams; there are no external font services, client JavaScript bundles, JSON-LD; social previews use the local AeglysAI asset. Twitter/X metadata uses the shared large-image preview. Tests reject old deployment paths and development URLs in generated artifacts.

The existing GitHub Actions custom-domain setup is retained. No `CNAME` file is added. See [SPEC-006 — Current production origin](docs/specs/SPEC-006-aeglysai-domain.md) and the historical [SPEC-002 root-path migration](docs/specs/SPEC-002-custom-domain.md) for audit and validation requirements. Earlier deployment URLs in historical logs and the dated V1 review are intentionally preserved.

Official references: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Feature status and roadmap

Speaking module follow-up: IMPLEMENTED locally on feature/speaking-presentations (SPEC-010), with approved resource and invitation metadata. The earlier documentation synchronization remains uncommitted and preserved.

Snapshot: implementation through `74c2963` (PR #14 merge), checked 2026-10-07.
Completed means implemented and merged in this portal repository; it does not establish
live deployment, operational event readiness or measured research effectiveness.
In progress means documents/content are in preparation with work still required;
no active coding branch or completion date is inferred.

| Feature | Status | Evidence / remaining work |
| --- | --- | --- |
| Research portal pages, conceptual diagrams and creator profile | COMPLETED / IMPLEMENTED | Astro pages/components; creator commit `e8d7f6b`, merge `bbe7491`; LinkedIn URL remains null |
| Root domain, current brand and light/dark/system theme | COMPLETED / IMPLEMENTED | Config/Layout/ThemeInit; domain `03670f7`, rebrand `5b5251c`, theme `52ae928` and reconciliation `247ef9e` |
| Approved raster brand assets and image metadata | COMPLETED / IMPLEMENTED | BrandMark/Layout and `public/brand/`, committed in `85332d9`; higher-resolution masters/specialized social cards remain source-dependent |
| Media Coverage and both six-article carousels | COMPLETED / IMPLEMENTED | `85332d9`, merged by `74c2963`; publisher image reachability needs maintenance |
| Hackathon frontend, event detail routes and participant handbook | COMPLETED / IMPLEMENTED | `8431b47`, merge `9030455`; events themselves remain PLANNED |
| Sponsorship frontend and draft terms | COMPLETED / IMPLEMENTED | `280fd65`, merge `ba5c514`; sponsor records empty, intake closed, no payments or contributions implied |
| Papers, proposed talks and literature/specification preparation | IN PROGRESS / IN PREPARATION | `/publications/` and research copy; no manuscripts, accepted talks, verified reference list or results supplied |
| Hackathon organizer terms, judging, privacy and certificate operations | IN PROGRESS / IN PREPARATION | Existing draft handbook/operations; dates, eligibility, funding, contacts, people and issuance details remain TBD |
| Verified seven-stage Form mapping and publication/opening gates | IMPLEMENTED / TESTED | [OPS-001 specification](docs/specs/SPEC-020-hackathon-portal-operations.md); all seven verified links active; original sample certificate displayed |
| Live forms, event sessions, selection/results and certificate issuance | PLANNED | Seven verified responder URLs enabled by organizer instruction; sponsor intake null/closed; no live workflow or issued artifact established |
| Speaking & Presentations module | IMPLEMENTED LOCALLY | Listing/nav, shared cards/detail/PDF viewer and approval gates exist; ATAI completed, GICITE confirmed/upcoming, ETIC awaiting written confirmation, two proposals and shared details; full PDF remains private |
| PR-triggered CI | PLANNED | Current Pages workflow triggers on main push/manual dispatch only |
| Model D, telemetry/feedback and comparative experiments | PLANNED RESEARCH | Separate research repository scope; no implemented Model D or validated comparisons asserted here |
| Deployment of the current merged revision | UNVERIFIED | Workflow exists; no current successful Actions/environment record inspected in this documentation task |

### Next work

1. Finalize organizer launch terms, funding, eligibility/selection, privacy/conduct contact,
   confirmed people and challenge material before opening approved Forms responder URLs.
2. Add PR-triggered build/check/test validation and verify current Pages deployment evidence
   and live route/assets independently of the local build or merge.
3. Maintain publication metadata and image availability; add a creator LinkedIn destination
   only when supplied and verified. Higher-resolution brand masters remain future asset work.
4. Supply and approve actual PDF decks/public metadata for **Speaking & Presentations**.
   The module's listing, data/schema, detail template and native PDF viewer are now implemented
   locally; follow the authoring workflow below before adding content. Event delivery needs
   evidence separate from publishing slides; existing proposed talks/keynote remain in preparation/planned.
5. Continue research-specification/literature preparation and Model D/evaluation work in
   the separate research repository; publish only supported findings and reproducible evidence.

No completion dates or new release versions are assigned. Research phase labels V0.1/V0.2
on About describe the research roadmap and are distinct from portal Git tags.

## Changelog and version history

Use [DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md) as the existing engineering changelog and
[PROJECT_HISTORY.md](docs/PROJECT_HISTORY.md#verified-git-tags--2026-10-07-audit) for the
verified tag/commit table and major merged milestones. The latest media implementation
is `85332d9`, tagged `v0.2.0`, merged by `74c2963` (PR #14). Its commit also contains the
previously pending brand assets; it is not solely a carousel-only diff.

The actual tag sequence is `v1.0.0`, `v1.0.0-aeglysai`, `v1.1.0`, then `v0.2.0` by creation
date. This is not monotonically increasing semantic versioning. Preserve the tags; do not
invent `v1.2.0` or rename history. The private package version remains `0.1.0` and is not
a synchronized release identifier. Tags and merges do not prove GitHub Release objects,
publication or successful deployment; those outcomes were not verified in this task.

## Community hackathon configuration

The planned program is configured in `src/data/hackathons.ts`: events, status definitions,
speaker/judge slots and registration/submission links. Creator identity and portrait remain
owned by `src/data/creator.ts` and reused through `CreatorProfile.astro`.

Configure official HTTPS Google Form responder URLs in `src/data/hackathonForms.ts`: `PARTICIPANT_REGISTRATION_URL`, `QUALIFICATION_SUBMISSION_URL`, `JUDGE_APPLICATION_URL`, `SPEAKER_INTEREST_URL` and `PROJECT_SUBMISSION_URL`. All default to `null`; each collection gate defaults to `open: false`. Open a gate only after approving its terms/privacy and testing signed-out access. Legacy `PARTICIPANT_REGISTRATION_FORM_URL`, `JUDGE_INVITATION_FORM_URL` and `SUBMISSION_FORM_URL` are derived compatibility settings. The landing page shows Start Qualification with Opening Soon while unavailable; existing event/community actions retain their labels. `PARTICIPANT_FORM_URL` is a compatibility
alias for the participant registration setting. Event-specific registration URLs override
the shared participant form; submission URLs are configured separately. Rebuild after changes.
No authentication, participant database or application collection is added to this portal.
Seven verified public Google Forms responder links are configured; collection links are enabled by organizer instruction. Private Sheets/Drive support administration outside the Portal.

`src/data/hackathonPeople.ts` provides three guest speaker slots and three independent judge
slots. Fill a slot only with approved public information. Speaker records support name,
title, organization, local photo/alt, bio, topics, LinkedIn URL and CONFIRMED/INVITED status.
Judge records additionally support technical expertise and event assignments (event IDs
from `hackathons.ts`). Public profiles require CONFIRMED status and `publicDisplayApproved: true`.
Invited and unapproved records render anonymous planned slots; they are never presented as confirmed.
The keynote continues to reuse the existing approved creator profile; scheduling remains planned.

This repository is public: keep application responses, private emails, phone numbers,
Drive IDs, conflict disclosures, invitation tracking and internal notes outside repository
configuration. Status is separate from permission to publish. Request consent for the exact
public fields and photo before adding them, and remove/rebuild if permission is withdrawn.
Invitation templates are available for [judges](docs/hackathons/JUDGE_INVITATION_TEMPLATE.md),
[speakers](docs/hackathons/SPEAKER_INVITATION_TEMPLATE.md) and
[participants](docs/hackathons/PARTICIPANT_INVITATION_TEMPLATE.md). Templates are drafts;
replace placeholders privately and verify terms before sending. No invitations were sent.
See [SPEC-004](docs/specs/SPEC-004-participation-workflow.md) for PORTAL-006.

The three-event proposal is retired; current rules use one AI/ML and Cybersecurity Hackathon. Dates and keynote arrangements remain unconfirmed. Free participation, proposed rules
and a planned USD $300 prize per event are presented subject to finalized official terms.
Before opening registration, publish exact deadlines/time zones, eligibility, award and
judging procedures, licensing requirements, and conduct reporting/enforcement details.
See [SPEC-003](docs/specs/SPEC-003-hackathon-program.md).

## Hackathon launch operations

See the [launch checklist](docs/hackathons/LAUNCH_READINESS.md),
[participant operations](docs/hackathons/OPERATIONS.md),
[proposed judging framework](docs/hackathons/JUDGING_FRAMEWORK.md),
[submission requirements](docs/hackathons/SUBMISSION_REQUIREMENTS.md) and
[eleven communication drafts](docs/hackathons/communications/README.md).
The operational framework is prepared; event terms and private intake administration remain organizer-managed.
No email infrastructure, messages sent, judging or results are implied.

`SUBMISSION_FORM_URL` derives from the approved project setting; all seven canonical Form
responders are verified and enabled by organizer instruction. Availability and permission gates remain independent;
never place private Drive folders or application responses in public configuration.

`src/data/hackathonSeo.ts` owns per-page SEO; `src/data/social.ts` owns the shared social asset referenced by `hackathonSocialPreview.image` and the site layout.
The configured 1200×630 PNG produces Open Graph/Twitter large-image cards. To enable an image,
add an approved local raster asset under `public/` and configure its relative `path`,
meaningful `alt`, `width` and `height` (typically 1200×630). Rebuild and verify the asset,
absolute custom-domain image URL and large-image metadata before publication.
The code-authored social image is stored at `public/images/aeglysai-social.png`, with an editable SVG source alongside it. See [SPEC-005](docs/specs/SPEC-005-launch-readiness.md) for original launch work and [SPEC-007](docs/specs/SPEC-007-aeglysai-brand.md) for the current brand/social asset.


## PORTAL-008 production domain

The production origin is now configured as `https://aeglysai.com` with base `/`.
At the PORTAL-008 domain-only migration, AegisAI remained the portal brand; no repository rename or old-domain redirect was included. PORTAL-009 updates the current brand separately.
GitHub Actions Pages deployment is preserved. GitHub Pages custom-domain, apex DNS and
HTTPS settings require separate verification before publishing. No CNAME file is managed
by this repository. See [SPEC-006](docs/specs/SPEC-006-aeglysai-domain.md) for the classified
URL audit. Dated history and prior domain-migration specifications retain their original URLs.


## Current brand

AeglysAI is the evolution of the initiative previously known as AegisAI. Existing research direction, model IDs, publication titles and technical lineage are preserved. The portal and research repository URLs use AeglysAI names after the reference cleanup in `b14722f`; the internal package identifier remains `aegisai-research-portal`.

### Hackathon foundation closure

Retired-proposal compatibility routes remain at /hackathons/adaptive-authorization/,
/hackathons/behavioral-risk/ and /hackathons/autonomous-resilience/. The events overview
and community routes remain available. Shared guidance: [handbook](docs/hackathons/README.md),
[qualification template](docs/hackathons/QUALIFICATION_TEMPLATE.md),
[GitHub workflow](docs/hackathons/GITHUB_WORKFLOW.md) and
[certificate policy](docs/hackathons/CERTIFICATE_POLICY.md). The foundation and handbook were committed in `8431b47` and merged in `9030455`; event operations remain planned.

### Hackathon sponsorship V1

`/hackathons/sponsors/` reuses the hackathon red visual system. Proposed tiers,
confirmed-only public recognition and event-specific cash prize allocations live in
`src/data/hackathonSponsorship.ts`. `SPONSOR_INTEREST_FORM_URL` and approved contact
remain null, with the collection gate closed. No payments or automatic acceptance.
See [sponsorship program](docs/hackathons/SPONSORSHIP.md) and
[organizer-review draft terms](docs/hackathons/SPONSORSHIP_TERMS_DRAFT.md).

## Media Coverage

COMPLETED / IMPLEMENTED in `85332d9`, merged into main by `74c2963` (PR #14).
Both the Home “Featured in the Media” section and `/media/` show all six external
articles, sorted newest-first by publisher-reported publication date:

| Publication | Article topic | Publication date |
| --- | --- | --- |
| Business Outstanders | Open-source adaptive-security research platform | 2026-10-07 |
| Nerdbot | Explainable risk intelligence and policy authority | 2026-09-25 |
| The Cyber Mag | Research and engineering community | 2026-09-11 |
| Programming Insider | Adaptive authorization for zero-trust clouds | 2026-08-01 |
| TechBullion | Enterprise engineering and intelligent infrastructure | 2026-07-21 |
| The Cyber Mag | Policy-bounded adaptive cyber defense | 2026-07-02 |

`src/data/media.ts` stores IDs, original headlines/URLs, publications, categories, brief
portal summaries, nullable publication dates, verification flags/date evidence and thumbnail
provenance. No database or runtime scraping is used. `featuredMediaArticles()` remains a
latest-three helper tested in isolation; neither page uses it now. Both use the full
`sortedMediaArticles()` list. Missing dates/headline verification render manual-review labels.

`MediaCard.astro` shows a 16:9 image, publisher, date, three-line visual headline and
“Read Article →” linking to the original publisher in a new tab with `noopener noreferrer`
and full accessible headline/new-tab context. The full page additionally retains categories
and summaries, plus its coverage/context disclaimer; Home uses compact cards and links to
View All Media Coverage. No article text, endorsement or research outcome is inferred.

`MediaCarousel.astro` displays three cards at widths ≥1024px, two at 640–1023px and one
below 640px. Previous/next arrows move one card, stop at the ends, and position indicators
adapt to the visible count (four valid starts on desktop, five tablet, six mobile).
The track supports native scrolling/swiping, keyboard Left/Right/Home/End, focus styles,
visible-range announcements and reduced-motion preferences. It does not autoplay or loop.

Five thumbnails came from publication `og:image` metadata and Nerdbot's from the original
featured-image link. They load directly from publisher/CDN HTTPS URLs with no-referrer,
lazy loading and asynchronous decoding; a reserved frame and explicit dimensions prevent
image-driven layout shifts. Decorative thumbnails have empty alt text because nearby text
identifies each article. A missing thumbnail shows the existing AeglysAI icon/text placeholder;
with JavaScript enabled, failed loads are hidden to reveal it. Error hiding uses an inline
handler, so the same failure behavior is not guaranteed with JavaScript disabled.
`PUBLISHER_METADATA` records provenance, not a granted redistribution license. There are
third-party image requests; metadata alone does not guarantee rights or future availability.
No publisher artwork is vendored and no unrelated stock image is used. The old local
`media-article.svg` remains in public assets but is not the current card thumbnail/fallback.

See [SPEC-009](docs/specs/SPEC-009-media-coverage.md) for exact article source links,
verification evidence, architecture and acceptance criteria. Earlier validation is recorded
in the changelog; this documentation-only synchronization does not rerun the application build.


## Speaking & Presentations

IMPLEMENTED locally with centralized proposals, invitation statuses and an approved first-page preview. No deployment performed.
`/speaking/` groups invitations, confirmed/upcoming/completed talks, proposals and presentation resources. Shared navigation adds Speaking; approved
records generate `/speaking/<slug>/` using the existing Astro getStaticPaths convention.
Home's small Featured Presentations grid is conditional on explicitly featured approved
records, including this preview. Existing Media Coverage is retained.

`src/data/presentations.ts` owns the reusable Presentation schema and publication helpers.
Records need both publicationStatus=PUBLISHED and approvedForPublication=true, actual local
supplied title/description/category/speaker. Resource records require an actual local PDF or page-1 image; invitations/proposals may omit slides. Dates are
nullable; slide publication date is independent of delivery. Without approved delivery evidence,
a resource is labeled Slides published, or Presentation preview when only its cover is public. Conference metadata is separate from evidenced delivery.
Invalid approved metadata, assets, PDF headers or duplicate slugs fail the build.

Reusable components under `src/components/speaking/` are PresentationCard, PresentationThumbnail,
PresentationMetadata and PdfViewer. Cards show 16:9 lazy previews, supplied content and View
Presentation. Detail pages use shared metadata/canonicals. Records with an approved PDF use a titled lazy native PDF iframe,
an always-visible Open PDF fallback and optional Download PDF link. Browser PDF support varies;
opening the PDF separately remains available without JavaScript. No PDF.js/library/database added.

Keep unapproved slides/images outside public/ (Astro copies all public files even if records
are draft). After content/rights approval, put final versioned assets under public/presentations/
and configure the record. Export the **actual first PDF page**, never invent slide artwork:

```sh
node scripts/presentation-thumbnail.mjs supplied.pdf first-page.png
```

This explicit authoring helper uses macOS sips/ImageIO or optional system pdftoppm on other
platforms (manual first-page export is also supported). It preserves the page, caps its longest
edge at 960px and refuses to overwrite existing output; review before publication. No npm or
build-time dependency was added. If export is unavailable, thumbnail=null shows a branded
missing-preview state. The 16:9 frame uses contain to preserve the whole slide.

PDFs are served as supplied static files; the portal does not automatically compress them.
Optimize size/accessibility at export, review, then rebuild. Thumbnails load independently of
PDFs; the viewer is lazy. See [SPEC-010](docs/specs/SPEC-010-speaking-presentations.md) for fields,
publication gates, acceptance and authoring instructions. No production placeholder metadata,
real presentation delivery, conference invitation or attendance is claimed.


Approved-preview follow-up: the user approved the first-page image and supplied ATAI 2026
conference information. The local 960×540 PNG is the actual cover of **Beyond Static Access
Control** (Shubh Prabhat). The detail page and homepage feature show this preview. Conference
dates September 26–27, 2026, hybrid format, ACM Houston Chapter USA organizer and IoES
technical sponsor match the [organizer's conference page](https://houston.acm.org/atai2026.html).
The full draft PDF remains outside public assets; publication date and delivery remain null.
See SPEC-010 for the separate draft-review findings and approved scope.

Publications now focuses on the existing two research manuscripts, with a Speaking link.
All five public records live in presentations.ts: completed ATAI with approved cover preview,
confirmed/upcoming GICITE, ETIC awaiting written confirmation, and the two existing proposals. Speaking
separates an event engagement gallery from the technical slide/topic library. Only matching
participation filters appear; a past conference date never establishes completed delivery.
GICITE title/abstract remain to be confirmed and no slides are published. Venue is attributed
to the organizer. Existing /publications/, /speaking/ and ATAI detail URLs remain unchanged;
there were no existing individual proposal URLs requiring redirects.

Optional relatedPaperTitles reference the existing papers in project.ts and generate links
in both directions using publication anchors. None is configured because no supplied
presentation is identified as the same research paper. Invitation letters and evidence
stay outside the public repository, source metadata and public assets. Only approved public
status/date/event fields are rendered. See SPEC-010 for the status workflow.

Roadmap follow-up: obtain participation acceptance before changing Invited to Confirmed;
mark Upcoming only after scheduling is confirmed, and Completed only after reviewed delivery.
Supply approved titles, abstracts, slide files and research associations when available.

Speaking UX follow-up: navy “Ideas Worth Sharing” hero, featured GICITE invitation, responsive
2/1-column engagement gallery with native All/Invited filters (Confirmed/Upcoming and Completed
appear when matching records exist), separate slide library and compact topics/GitHub contact.
No client filter script or dependencies. EngagementCard/FeaturedEngagement share canonical
records; speakingView exposes normalized public metadata with independent slide status. Proposal
cards stay in the library. Future actual slide files enable View/Download actions after validation.
Roadmap: obtain approved engagement participation/title/abstract and slide assets; preserve status
accuracy and private evidence separation as future records are added.

PORTAL-SPEAKING-FINAL closure: three conference records are now present, retaining two proposals.
ATAI is Completed, supported by privately inspected certificate/schedule, with the certificate's
full presentation title and approved existing first-slide preview. GICITE is Confirmed — Upcoming
per user update; organizer acknowledgment remains unverified. ETIC uses Acceptance sent —
awaiting confirmation because written organizer confirmation was not located; exact role/title TBD.
Existing creator source now uses Solution Architect, Creator & Maintainer, AeglysAI and the supplied
research focus; approved portrait retained. No full draft PDF or private document published.
See [Speaking evidence tracker](docs/speaking/SPEAKING_EVIDENCE_TRACKER.md) for per-artifact
status and [existing SPEC-010](docs/specs/SPEC-010-speaking-presentations.md) for closure requirements.
Roadmap: collect organizer confirmations/agenda/listings, finalize upcoming titles and approve
final slide/event assets; no invented recordings/certificates/downloads.

## Community sprint — 2026-10-11 (local review)

COM-002 collects verified public GitHub observations into ignored drafts; dashboard consumes only explicitly approved observation manifests. No live browser API calls or invented counts. `/community/`, `/community/impact/`, `/community/submit/`, `/community/projects/`, `/community/adoption/` and `/community/reports/` reuse static Astro/design tokens. Submission intake links to the verified public Google Form authorized by the organizer. Project/adoption records require verified review, explicit permission, source URLs and provenance; production lists are empty.

Commands: `npm run community:metrics`, `npm run community:report -- 2026-10`, `npm test`. Drafts live under .community-drafts (ignored); never copy them to public/. Optional traffic collection requires explicit authorization through ALLOW_GITHUB_TRAFFIC=1 and a purpose-supplied GITHUB_METRICS_TOKEN; no token is required for public metrics, no credential values logged. Do not grant secrets to fork workflows.

COM-001 evidence 1.0.0 is pinned/copied from the locally inspected research contract. COM-008A 1.0.0 is integrated from local upstream files; source interoperability is verified against published revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee, and publication requires separate owner authorization. October 2026 remains open until month-end. Monthly net changes need exact UTC boundary observations; no unavailable historical reconstruction. Scheduled workflow prepares artifacts only; no commits, PRs or deployment. Retain snapshots for reviewed history; artifacts are not complete historical evidence.

See [contract provenance](docs/community/CONTRACTS.md), [sprint review and roadmap](docs/community/SPRINT_REVIEW.md), [file ownership](docs/community/FILE_OWNERSHIP.json), SPEC-011 through SPEC-016 and ADR-001 through ADR-006. Development log remains the engineering changelog; no release/tag added.

Roadmap: authorize private intake and end-to-end receipt review; resolve research disclosure findings; supply COM-008A; approve source/consent manifests and durable archive policy; inspect dependency advisories; only then authorize publication/PRs/deployment.

### COM-ARCH-001 — Google Workspace administration

The first hackathon uses configured Google Forms registration/submission links, private Google Sheets for administration and private Google Drive for consent/review evidence. The static Portal reads only approved sanitized JSON exports; no database or browser Sheets API. Seven Forms are now verified/configured and their links enabled; exports remain unavailable. See [ADR-007](docs/adr/ADR-007-google-workspace.md) and [manual export/security workflow](docs/community/WORKSPACE_EXPORTS.md). Roadmap: provision/review private Workspace permissions and forms, supply reviewed exports, then assess automation separately. COM-008A/publication gates remain unresolved.

### COM-003B-FIX-001 — finalized hackathon workflow

One AeglysAI AI/ML and Cybersecurity Hackathon with six Portal challenges (five COM-003A choices plus a pending Portal extension) replaces the obsolete three-event proposal. Every participant individually registers, forks/clones/runs A/B/C, documents sanitized qualification evidence and is selected before building. Model D knowledge is not required. Individuals and teams of two to four, one leader/unique team ID, no duplicate active membership, approved changes; private Sheets verify rosters. Executable project and maximum-two-minute video required. Round 1 selects finalists, Round 2 five-minute live demo plus five-minute Q&A over Google Meet determines ranking. Seven official Form responders are verified and enabled; dates remain unconfigured. See [current handbook](docs/hackathons/README.md), [Form configuration](docs/hackathons/OPERATIONS.md) and [judging](docs/hackathons/JUDGING_FRAMEWORK.md). Roadmap: approve Forms/privacy/access, deadlines/capacity and operational contacts before opening; existing community publication/contract blockers remain.

### COM-INTEGRATION-001 — upstream contract interoperability

Four published 1.0.0 schemas and validators match pinned upstream bytes, including recognition, adoption and monthly impact. Install pinned offline Python validation dependencies using the [integration setup](docs/community/INTEGRATION_GUIDE.md). Source status never grants owner permission: a separate digest-bound publication allowlist is required. No production approval data supplied. GitHub observation drafts remain separate from COM-001 evidence/COM-008A reports; `npm run community:impact-report -- YYYY-MM source.json` prepares pending impact drafts from sanitized local evidence only. Research repository untouched. Roadmap: genuine sanitized inputs and archive/withdrawal policy before publication.

Current challenge UI: six conceptual SVG architecture tiles reuse existing challenge anchors and approved workflow. Desktop 3×2, tablet two/mobile one, existing themes and reduced-motion support. See [asset/UI inventory](docs/hackathons/VISUAL_ASSETS.md) and [visual specification](docs/specs/SPEC-018-challenge-architecture-visuals.md). No new dependencies or client scripts; no actual outcomes or proprietary algorithms depicted.

HACK-CHALLENGE-006: [AI for Everyday Life](docs/hackathons/AI_FOR_EVERYDAY_LIFE.md) is a user-authorized Portal extension, not a claimed sixth upstream COM-003A track. Roadmap: separately update/approve research briefs/choice validators/templates and manually add exact Google Forms choice **AI for Everyday Life** (export ID ai-for-everyday-life). Existing source contracts unchanged; no Form edited or activity fabricated.

COM-PIN-001: four contracts plus semantic validators and fixtures are pinned byte-for-byte to [published research revision 711c1556e27bd226c08fb6a8c7b0d9040b4c88ee](https://github.com/shubh-techie/AeglysAI/commit/711c1556e27bd226c08fb6a8c7b0d9040b4c88ee), verified reachable on public main. [Manifest/provenance](docs/community/CONTRACTS.md) records hashes and observation. Source pinning does not authorize public activity, bypass consent/privacy, or imply Portal deployment.

### HACK-PORTAL-OPS-001 — current operations / roadmap

[Verified Forms setup](docs/hackathons/GOOGLE_FORMS_SETUP.md) and [SPEC-020](docs/specs/SPEC-020-hackathon-portal-operations.md) document seven distinct intake stages, independent opening/availability gates, approved role profiles and eight conditional certificate categories. Six diagrams and finalized rules preserved. Remaining roadmap: maintain privacy/artifact review for intake, review the original sanitized hackathon-themed sample, verify private rosters/appointments and manage actual issuance through Workspace. No database or certificate issuance service added. No commit/push/deployment implied.
