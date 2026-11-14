/** Static presentation policy. Unknown/new routes remain opt-out; never changes routing. */
const editorialPaths = new Set([
  '/publications/', '/media/', '/research/', '/architecture/',
  '/about/', '/experiments/', '/community/',
]);
export function editorialPresentation(path: string) {
  const event = path === '/hackathons' || path.startsWith('/hackathons/');
  return { editorial: editorialPaths.has(path), editorialFooter: !event };
}
