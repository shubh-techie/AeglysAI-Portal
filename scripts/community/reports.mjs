import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateSnapshot } from './metrics.mjs';
import { digest } from './contracts.mjs';
export function monthlyReport(month,snapshots,{now=new Date(),revision=1,supersedes=null}={}) {
  if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)||!Number.isSafeInteger(revision)||revision<1)throw Error('Invalid report period/revision');
  const start=new Date(`${month}-01T00:00:00Z`),end=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,1));
  const unique=new Map();
  for(const s of snapshots) { validateSnapshot(s);const old=unique.get(s.observedAt);if(old && digest(old)!==digest(s))throw Error('Conflicting snapshot timestamp');unique.set(s.observedAt,s); }
  const sorted=[...unique.values()].sort((a,b)=>a.observedAt.localeCompare(b.observedAt));
  const observations=sorted.filter(s=>Date.parse(s.observedAt)>=+start && Date.parse(s.observedAt)<+end);
  const first=sorted.find(s=>Date.parse(s.observedAt)===+start),last=sorted.find(s=>Date.parse(s.observedAt)===+end);
  const netChange=Object.fromEntries(['stars','forks','pullRequests','issues','releases'].map(k=>[k,first?.metrics[k]!=null && last?.metrics[k]!=null? last.metrics[k]-first.metrics[k]:null]));
  return { schemaVersion:'portal-draft-report-1',upstreamContract:'NOT_A_COMMUNITY_EVIDENCE_REPORT',month,status:'DRAFT',periodState:+now<+end?'OPEN':'CLOSED',revision,supersedes,sourceDigests:sorted.filter(s=>observations.includes(s)||s===first||s===last).map(s=>({observedAt:s.observedAt,sha256:digest(s)})),observations,netChange,communityEvidence:null,limitations:['Net change requires exact UTC month-boundary observations; no historical reconstruction.','Counts are not participation, independent adoption or research outcomes.','Draft; publication requires separate review and closed period.'] };
}
export function reportMarkdown(r) { return `# AeglysAI impact draft — ${r.month}\n\nStatus: ${r.status}; period: ${r.periodState}; revision: ${r.revision}\n\nGitHub observation draft only; not a COM-008A evidence report.\n\n| Metric | Observed net change |\n|---|---|\n${Object.entries(r.netChange).map(([k,v])=>`| ${k} | ${v??'Unavailable'} |`).join('\n')}\n\n${r.limitations.map(s=>'- '+s).join('\n')}\n\nSource digests:\n${r.sourceDigests.map(s=>`- ${s.observedAt}: ${s.sha256}`).join('\n')||'No snapshots available.'}\n`; }
export function approveReport() { throw Error('GitHub observation drafts cannot publish as monthly impact reports'); }
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const month=process.argv[2] ?? new Date().toISOString().slice(0,7);
    const directory=resolve('.community-drafts/snapshots');
    let snapshots=[];try { snapshots=readdirSync(directory).filter(f=>f.endsWith('.json')).sort().map(f=>JSON.parse(readFileSync(join(directory,f),'utf8'))); }catch(e){if(e.code!=='ENOENT')throw e;}
    const report=monthlyReport(month,snapshots), out=resolve('.community-drafts/reports',month);
    mkdirSync(out,{recursive:true});writeFileSync(join(out,'report.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});writeFileSync(join(out,'report.md'),reportMarkdown(report),{flag:'wx'});
    console.log('Draft report prepared; no publication performed.');
  }catch{console.error('Report preparation failed; input details withheld.');process.exitCode=1;}
}
