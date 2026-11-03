/** Test-only projection for the one clock-derived month in the empty reports archive.
 * Validate current UTC output before restoring a historical month for exact byte guards.
 * All surrounding HTML, report content and event dates remain protected by existing pins.
 */
export function reportingPeriodForHistory(path, value, historicalMonth, currentMonth = new Date().toISOString().slice(0, 7)) {
  if (String(path).replace(/^\.\//, '') !== 'dist/community/reports/index.html') return value;
  const month = /^\d{4}-(?:0[1-9]|1[0-2])$/;
  if (!month.test(historicalMonth) || !month.test(currentMonth)) throw Error('Invalid reporting month in preservation check');
  const text = Buffer.isBuffer(value) ? value.toString('utf8') : value;
  const matches = [...text.matchAll(/<p>(\d{4}-(?:0[1-9]|1[0-2])) remains an open reporting period until UTC month-end\. Current cumulative repository counts cannot reconstruct missing historical snapshots\.<\/p>/g)];
  if (matches.length !== 1 || matches[0][1] !== currentMonth) throw Error('Reports archive must state the current UTC open reporting period exactly once');
  const offset = matches[0].index + '<p>'.length;
  const projected = text.slice(0, offset) + historicalMonth + text.slice(offset + currentMonth.length);
  return Buffer.isBuffer(value) ? Buffer.from(projected) : projected;
}
