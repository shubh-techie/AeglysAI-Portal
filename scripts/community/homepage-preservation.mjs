// Only UX-002's three additive homepage blocks are removed for historical byte guards.
// Existing copy, components, scripts, metadata and shared stylesheet links stay protected.
export const originalHomepage = html => html
  .replace(/<aside class="home-research-note"[\s\S]*?<\/aside>/, '')
  .replace(/<section class="section container home-community"[\s\S]*?<\/section>/, '')
  .replace(/<style data-home-experience>[\s\S]*?<\/style>/, '');
