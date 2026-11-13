# Editorial foundations — authoring and ownership

Status: DESIGN001 local prototype, pending review. Public pages do not import this layer yet.

## Composition

Import existing global.css, then src/styles/editorial.css. Add data-editorial to the design root; use ed-container and ed-section for containment/rhythm. Do not import the new layer into Layout.astro until adoption is approved. Global.css remains the palette owner. editorial-tokens.css owns semantic aliases, spacing/type/container/focus/motion values. editorial.css owns shared composition styles. The four .astro files own markup/props. Prototype-specific specimens are confined to prototypes/editorial.

| Pattern | Inputs | Purpose |
| --- | --- | --- |
| EditorialSectionHeader | eyebrow,title,optional description | Composes existing SectionHeading; h2 section introduction. |
| EditorialContentRow | index,title,description,href,label,optional metadata | Article row with h3; use under a section heading. Provide a descriptive unique link label. |
| FeaturedStory | eyebrow,title,description,href,label; visual/status slots | h2 story with supporting visual. Visual needs its own factual alt/caption; caller owns evidence and asset rights. |
| CollaborationCTA | eyebrow,title,description,href,label | h2 closing section with one established destination. |

Reuse existing BrandMark, ThemeInit, ThemeControls and StatusBadge. The existing Status union is authoritative; Planned Research is a valid label, Planned is not. Do not turn evidence/engagement status into a decorative variant. Native details/summary handles progressive disclosure without a script.

Use one h1 per document. Components supply h2/h3 at the documented hierarchy; do not nest them arbitrarily. Link props are repository-authored approved destinations, not untrusted public input. Do not put private contact channels or unsupported claims in content props.

## Token groups

Colors are aliases of existing text/muted/cyan/bg/surface/line/focus values and inherit color-scheme. Type uses system Georgia/Times display, current sans body and current mono metadata. Display/heading/body sizes are fluid; measure62ch. Spacing has six steps plus a fluid section interval and gutter; max container76rem. Borders, small radius, focus width/offset and motion duration/easing are explicit. No shadow/elevation system is introduced. Breakpoint tokens48rem(tablet) and64rem(desktop) match annotated media literals; CSS custom properties cannot substitute into media conditions. Keep literals and documentation synchronized.

## Isolated review

With the existing Node24 environment:

```sh
node node_modules/astro/bin/astro.mjs build --config prototypes/editorial/astro.config.mjs
node scripts/design/editorial.browser.mjs
```

The second command uses installed macOS Chrome and requires the recorded baseline snapshot at .community-drafts/design001/before-dist. It loads static production/prototype bytes through CDP interception at the existing localhost origin, captures screenshots and closes its own temporary browser. It does not replace, restart or bind the localhost server. To recreate the baseline for a new review, build the verified main source and archive dist before implementing changes. Never overwrite a baseline after changes to public output.

Normal npm run build excludes the prototype; its separate output is ignored, noindex and not in the public sitemap. No automatic public URL or production update is claimed. The prototype deliberately uses static HTML visual composition and local official logo assets; no new asset rights or third-party connections are introduced. Review screenshots can be shared separately after checking their content; ignored QA folders are not repository publication targets.
