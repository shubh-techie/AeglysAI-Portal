import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
export const repository = 'shubh-techie/AeglysAI';
const origin = 'https://api.github.com';
export class CollectionError extends Error { constructor(code) { super(code); this.code = code; } }
export async function githubClient({ fetcher = fetch, sleep = ms => new Promise(r => setTimeout(r, ms)), token = '', maxWait = 2000 } = {}) {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'AeglysAI-Portal-metrics' };
  if (token) headers.Authorization = `Bearer ${token}`;
  async function request(url) {
    const parsed = new URL(url);
    if (parsed.origin !== origin || !parsed.pathname.startsWith(`/repos/${repository}/`) && parsed.pathname !== `/repos/${repository}`) throw new CollectionError('UNSAFE_PAGINATION');
    for (let attempt = 0; attempt < 3; attempt++) {
      let response;
      try { response = await fetcher(url, { headers, redirect: 'error', signal: AbortSignal.timeout(15000) }); } catch { if (attempt < 2) { await sleep(100 * 2 ** attempt); continue; } throw new CollectionError('NETWORK_UNAVAILABLE'); }
      if (response.ok) { try { return { value: await response.json(), link: response.headers.get('link') }; } catch { throw new CollectionError('INVALID_RESPONSE'); } }
      const limited = response.status === 429 || response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0';
      if (limited || response.status >= 500) {
        const retry = response.headers.get('retry-after');
        const reset = response.headers.get('x-ratelimit-reset');
        const delay = retry ? (Number.isFinite(Number(retry)) ? Number(retry) * 1000 : Date.parse(retry) - Date.now()) : limited && reset ? Number(reset) * 1000 - Date.now() : 100 * 2 ** attempt;
        if (!Number.isFinite(delay) || delay > maxWait || attempt === 2) throw new CollectionError(limited ? 'RATE_LIMITED' : 'API_UNAVAILABLE');
        await sleep(Math.max(0, delay)); continue;
      }
      throw new CollectionError(response.status === 403 || response.status === 401 ? 'ACCESS_DENIED' : 'API_UNAVAILABLE');
    }
  }
  async function list(path) {
    let url = `${origin}/repos/${repository}/${path}${path.includes('?') ? '&' : '?'}per_page=100`;
    const rows = new Map(), seen = new Set();
    while (url) {
      if (seen.has(url) || seen.size >= 1000) throw new CollectionError('PAGINATION_INCOMPLETE');
      seen.add(url);
      const result = await request(url);
      if (!Array.isArray(result.value)) throw new CollectionError('INVALID_RESPONSE');
      for (const row of result.value) {
        if (!Number.isSafeInteger(row.id) || row.id < 0) throw new CollectionError('INVALID_RESPONSE');
        rows.set(row.id, row);
      }
      url = result.link?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
    }
    return [...rows.values()];
  }
  return { request, list };
}
const metricKeys = ['stars','forks','pullRequests','issues','releases','externalContributors','externalAttributedCommits'];
export function validateSnapshot(s) {
  const keys = ['schemaVersion','dataKind','repository','observedAt','metrics','sources','errors','traffic','limitations'];
  if (!s || Object.keys(s).some(k => !keys.includes(k)) || s.schemaVersion !== 'portal-observation-1' || s.dataKind !== 'PUBLIC_API_OBSERVATION' || s.repository !== repository || !/^\d{4}-\d{2}-\d{2}T/.test(s.observedAt) || !Number.isFinite(Date.parse(s.observedAt))) throw new CollectionError('INVALID_SNAPSHOT');
  if (!s.metrics || Object.keys(s.metrics).length !== metricKeys.length || metricKeys.some(k => !(k in s.metrics) || s.metrics[k] !== null && (!Number.isSafeInteger(s.metrics[k]) || s.metrics[k] < 0))) throw new CollectionError('INVALID_SNAPSHOT');
  if (!s.sources || Object.keys(s.sources).length !== metricKeys.length || metricKeys.some(k => typeof s.sources[k] !== 'string' || !s.sources[k].startsWith(`https://github.com/${repository}`))) throw new CollectionError('INVALID_SNAPSHOT');
  if (!Array.isArray(s.errors) || s.errors.some(e => !['metric','code'].every(k => typeof e[k] === 'string') || Object.keys(e).length !== 2 || ![...metricKeys,'traffic'].includes(e.metric) || !/^[A-Z_]+$/.test(e.code))) throw new CollectionError('INVALID_SNAPSHOT');
  if (s.traffic !== null && (!s.traffic || Object.keys(s.traffic).sort().join(',')!=='clones,views,windowDays' || s.traffic.windowDays!==14 || ['views','clones'].some(k=> !s.traffic[k] || Object.keys(s.traffic[k]).sort().join(',')!=='count,uniques' || ['count','uniques'].some(n=> !Number.isSafeInteger(s.traffic[k][n]) || s.traffic[k][n]<0))) || !Array.isArray(s.limitations) || s.limitations.some(x => typeof x !== 'string')) throw new CollectionError('INVALID_SNAPSHOT');
  return s;
}
export async function collectMetrics(options = {}) {
  const client = await githubClient(options);
  const snapshot = { schemaVersion: 'portal-observation-1', dataKind: 'PUBLIC_API_OBSERVATION', repository, observedAt: (options.now ?? new Date()).toISOString(), metrics: Object.fromEntries(metricKeys.map(k => [k,null])), sources: Object.fromEntries(metricKeys.map(k => [k,`https://github.com/${repository}`])), errors: [], traffic: null, limitations: ['Cumulative observations, not monthly activity or independent adoption.', 'External means non-owner GitHub users with attributed commits; independence and affiliation are not established.', 'No personal identities or raw API responses stored. Traffic not collected without explicit authorization.'] };
  async function capture(keys, fn) { try { const values = await fn(); if(values.length!==keys.length || values.some(v=>!Number.isSafeInteger(v)||v<0))throw new CollectionError('INVALID_RESPONSE'); keys.forEach((k,i) => snapshot.metrics[k] = values[i]); } catch (e) { keys.forEach(metric => snapshot.errors.push({metric,code:e instanceof CollectionError ? e.code : 'INVALID_RESPONSE'})); } }
  await capture(['stars','forks'], async () => { const {value} = await client.request(`${origin}/repos/${repository}`); if (value.full_name?.toLowerCase() !== repository.toLowerCase() || value.private !== false) throw new CollectionError('INVALID_RESPONSE'); return [value.stargazers_count,value.forks_count]; });
  for (const [key,path] of [['pullRequests','pulls?state=all'],['issues','issues?state=all'],['releases','releases']]) {
    snapshot.sources[key] = `https://github.com/${repository}/${key === 'pullRequests' ? 'pulls' : key}`;
    await capture([key], async () => { const rows = await client.list(path); return [rows.filter(r => key !== 'issues' || !r.pull_request).filter(r => key !== 'releases' || r.draft === false).length]; });
  }
  await capture(['externalContributors','externalAttributedCommits'], async () => {
    const rows = (await client.list('contributors')).filter(r => r.type === 'User' && typeof r.login === 'string' && r.login.toLowerCase() !== 'shubh-techie');
    if (rows.some(r => !Number.isSafeInteger(r.contributions) || r.contributions < 0)) throw new CollectionError('INVALID_RESPONSE');
    return [rows.length, rows.reduce((n,r) => n+r.contributions,0)];
  });
  if(options.allowTraffic===true) {
    try {
      if(!options.token)throw new CollectionError('TRAFFIC_AUTHORIZATION_REQUIRED');
      const aggregate={windowDays:14};
      for(const kind of ['views','clones']) {
        const {value}=await client.request(`${origin}/repos/${repository}/traffic/${kind}`);
        if(['count','uniques'].some(k=>!Number.isSafeInteger(value[k])||value[k]<0))throw new CollectionError('INVALID_RESPONSE');
        aggregate[kind]={count:value.count,uniques:value.uniques};
      }
      snapshot.traffic=aggregate;
    }catch(e){snapshot.errors.push({metric:'traffic',code:e instanceof CollectionError?e.code:'INVALID_RESPONSE'});}
  }
  // Only public-safe totals are retained; traffic is a rolling window, not calendar-month totals.
  return validateSnapshot(snapshot);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const snapshot = await collectMetrics({token:process.env.GITHUB_METRICS_TOKEN ?? '',allowTraffic:process.env.ALLOW_GITHUB_TRAFFIC==='1'});
    const output = resolve(process.argv[2] ?? `.community-drafts/snapshots/${snapshot.observedAt.replaceAll(':','-')}.json`);
    if (!output.startsWith(resolve('.community-drafts')+'/')) throw new CollectionError('DRAFT_OUTPUT_REQUIRED');
    mkdirSync(dirname(output), {recursive:true}); writeFileSync(output, JSON.stringify(snapshot,null,2)+'\n',{flag:'wx'});
    console.log(`Draft observation prepared; unavailable metrics: ${snapshot.errors.length}. No publication performed.`);
  } catch { console.error('Metric collection failed; no credential or response details logged.'); process.exitCode=1; }
}
