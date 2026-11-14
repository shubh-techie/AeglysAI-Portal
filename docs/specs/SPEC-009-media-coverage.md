# SPEC-009 — Media Coverage

Recorded 2026-10-07; synchronized 2026-10-07 against source at `74c2963`.
Status: COMPLETED / IMPLEMENTED in `85332d9`, merged by `74c2963` (PR #14).
`v0.2.0` points to `85332d9`; this is Git evidence, not a verified deployment or
GitHub Release. The same commit contains previously pending approved brand assets.
This revision consolidates current behavior into the existing specification, superseding
the original grid/latest-three/neutral-thumbnail sections; no duplicate spec is added.

## Scope and current behavior

- Six external media records in `src/data/media.ts`, covering five publications (The Cyber
  Mag has two articles). Both Home and `/media/` call `sortedMediaArticles()` and render
  all six in publisher-reported publication-date order, newest first; undated records
  follow dated ones with ID tie-breaking. Headline/date/article URLs remain unchanged.
- `/media/` reuses Layout/Hero, one h1 “AeglysAI in the Media”, the original introduction
  and coverage/context disclaimer. Full cards include category and short portal summary.
- Home retains “Featured in the Media” and View All Media Coverage linking to `/media/`;
  its cards are compact (no summary/category). Global navigation was not extended for media.
- Shared `MediaCard.astro` presents a 16:9 thumbnail, publication name, available date/time,
  headline visually clamped to three lines and “Read Article →”. Full headline text remains
  in the DOM and the accessible link name. Links open original publications using
  `target="_blank"`, `rel="noopener noreferrer"` and new-tab context.
- `MediaCarousel.astro` provides the shared carousel without a dependency, autoplay or loop:
  three visible cards at ≥1024px, two at 640–1023px, one at <640px, with 24px gaps.
  Previous/next move one card and disable at the boundaries. Valid start-position indicators
  adapt to the visible count (4 desktop / 5 tablet / 6 mobile for the current six records).
- Native horizontal scrolling/scroll snap supports touch/swipe. The focusable track handles
  Left/Right/Home/End when it itself has focus; original links retain normal keyboard behavior.
  Groups carry slide position labels, controls have accessible names/track references and a
  polite live region announces the visible range. ResizeObserver updates range/controls.
- Movement is smooth except for reduced-motion preference. Without JavaScript the articles
  remain scrollable and links usable; inactive arrow/indicator controls remain hidden.

## Content storage, metadata and boundaries

Typed MediaArticle fields: id, publication, title, url, category, summary,
publishedDate|null, titleVerified, verifiedOn|null, dateEvidence|null and thumbnail|null.
Thumbnail fields: path, alt, permission. All current thumbnails have empty alt because they
are decorative beside identifying text. Dates format with Intl.DateTimeFormat in UTC.
Null dates display manual-review wording; unverified titles retain a visible review label.

`featuredMediaArticles()` still exists and tests verified/dated latest-three selection, but
neither page calls it. The source comment about excluding unverified/undated records from
homepage recency selection reflects that helper's older usage; the current homepage renders
the full sorted list. This documentation-only task does not remove or change the helper.

No database, content API, runtime metadata fetch/scraper, CMS, auth or analytics is added.
Metadata edits require a rebuild. Summaries are short original portal descriptions, not
article-body excerpts. Coverage is distinct from research papers in preparation; no awards,
endorsements, results, independence or affiliations are inferred. Source dates are publisher
reports, not verified project-history dates; modified dates must not replace publication dates.
When metadata is unavailable, preserve supplied headline/URL and flag review rather than
inventing facts or deriving dates from URL/sidebar/copyright text.

## Images and fallback handling

Five current HTTPS thumbnails came from `og:image`; Nerdbot's uses the featured-image link
on the original article. Exact selected URLs are in `src/data/media.ts`; recorded image
verification on 2026-10-07 found HTTP 200 and image content types at all six endpoints.
This synchronization inspected stored source/evidence and did not re-fetch publications.

Images load directly from publisher/CDN URLs, not vendored copies. PUBLISHER_METADATA
records provenance only, not granted reuse rights or an ownership/license assertion.
The existing enum also permits ORIGINAL_ARTWORK and PERMISSION_CONFIRMED; no current
publisher image is marked as permission-confirmed. Public metadata does not guarantee
future reachability, hotlink permission or redistribution rights. No unrelated stock or
generated article photograph is used, and no new image-processing dependency was added.

`MediaCard.astro` uses a reserved aspect-ratio frame, width/height attributes, lazy loading,
asynchronous decoding, no-referrer and object-fit cover. There is no generated srcset,
automatic compression, runtime resizing or Astro Image pipeline for these thumbnails.
Local approved images can use `asset()`; HTTPS paths bypass that helper.

Behind each thumbnail is an existing local AeglysAI icon plus branded text/gradient.
Missing/null thumbnails display it immediately; an inline image-error handler hides failed
images to reveal it when JavaScript is enabled. With scripts disabled, scrollability remains
but hiding a failed image is not guaranteed. The original `public/images/media-article.svg`
remains unused by current cards; it is neither a publisher image nor the active fallback.
Third-party image requests do occur, superseding the original no-external-image description.

## Source verification — 2026-10-07

| Article (full URL in data) | Verified headline/date evidence | Publisher-reported publication date |
| --- | --- | --- |
| [TechBullion](https://techbullion.com/from-cloud-modernization-to-intelligent-infrastructure-how-shubh-prabhat-is-connecting-enterprise-engineering-with-aeglysai/) | HTTP 200 original h1, visible time, article:published_time and JSON-LD datePublished | 2026-07-21 |
| [Business Outstanders](https://businessoutstanders.com/cybersecurity/aeglysai-adaptive-security-distributed-systems) | Browser article h1/byline date and HTTP 200 metadata; timestamps differ in presentation but calendar date agrees | 2026-10-07 |
| [Programming Insider](https://programminginsider.com/beyond-static-access-control-shubh-prabhats-aeglysai-approach-to-adaptive-authorization-for-zero-trust-cloud-systems/) | HTTP 200 original h1 (curly apostrophe), article:published_time and JSON-LD datePublished | 2026-08-01 |
| [Nerdbot](https://nerdbot.com/2026/09/25/when-ai-advises-but-policy-decides-shubh-prabhat-on-explainable-risk-intelligence-and-the-future-of-aeglysai/) | Browser-accessible original h1 and byline publication date; curl blocked by Cloudflare 403 | 2026-09-25 |
| [The Cyber Mag — policy](https://thecybermag.com/why-policy-bounded-ai-could-reshape-security-in-distributed-systems-shubh-prabhat-on-adaptive-cyber-defense/) | HTTP 200 original h1, article-specific visible time, metadata/datePublished | 2026-07-02 |
| [The Cyber Mag — community](https://thecybermag.com/from-research-to-community-how-aeglysai-is-bringing-engineers-together-around-adaptive-security/) | HTTP 200 original h1, article-specific visible time, metadata/datePublished | 2026-09-11 |

Browser tools could not fetch four supplied pages; system curl with certificate
verification accessed them. Initial Python HTTPS attempt failed due to local CA trust;
no certificate verification disabled. Future availability can change; no uptime guarantee.
Source publication dates differ from October update dates; July/August source dates do
not establish that the portal was branded AeglysAI then. Historical records untouched.

## Frontend integration and dependencies

Home (`src/pages/index.astro`) and full media (`src/pages/media.astro`) reuse the same
carousel/card components; the full route passes compact=false. Layout, theme tokens and
metadata behavior remain shared. Theme inline initialization runs on all HTML pages;
these two routes additionally have the inline carousel initializer and image-error handlers.
No client JavaScript bundle/library or backend is added. `85332d9` did not modify
package.json/package-lock.json. Existing Astro/sitemap/TypeScript/check tooling remains.
See [frontend architecture](../../README.md#frontend-architecture-and-content-ownership).

## Acceptance and validation

- Emit `/media/index.html` and existing canonical/social/crawl metadata.
- Both routes contain all six unchanged original links in sorted order; full route retains
  context/category/summary. Verify null metadata review states and deterministic sorting;
  legacy latest-three helper tests do not define the homepage's current record count.
- Verify 3/2/1 cards, arrows/boundaries, valid indicators, native swipe, keyboard navigation,
  focus, visible-range announcements, reduced motion, no-JavaScript scrollability and no
  page-level overflow. Headlines clamp visually while full text stays accessible.
- Verify real thumbnail requests and JS-enabled failure fallback; local placeholder icon
  resolves and reserved dimensions prevent image-driven shifts. No unrelated imagery.
- Run Node 24 `npm run check`, `npm run build`, then `npm test`, plus `git diff --check`
  for application changes. Existing output tests allow theme plus scoped carousel scripts,
  assert all six card/image URLs and preserve the site's research/route/link requirements.

Prior implementation validation is recorded in [DEVELOPMENT_LOG.md](../DEVELOPMENT_LOG.md):
check/build and nineteen tests passed, with responsive Chrome/control/touch/reduced-motion
and no-JavaScript checks. These are earlier observed local outcomes; no build/browser test
or remote CI/deployment is claimed by this documentation-only synchronization. Ongoing
metadata/image maintenance and independent deployment verification remain follow-up work.

## DESIGN-003 presentation alignment — 2026-11-13 (local review)

Six records, original destinations/metadata/thumbnails and publisher-date order remain unchanged. On /media/ only, newest dated coverage receives the existing FeaturedStory treatment, followed by the other five records through the existing MediaCarousel. No duplication or additional carousel. FeaturedStory now supports optional safe external-link semantics; Media headlines wrap fully on this opt-in route. Homepage Media stays exact. Full source/editorial-arrangement caveat remains. All six existing thumbnail URLs returned200 and decoded for private QA screenshots; no source assets/data changed or new coverage/endorsement inferred. SPEC031 and DESIGN003 review document validation, privacy/performance costs and owner visual approval pending delivery.
