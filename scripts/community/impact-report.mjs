import {readFileSync} from 'node:fs';
import {resolve,relative,isAbsolute} from 'node:path';
import {realpathSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {parsePublicJson,validateContract} from './upstream.mjs';
export function impactDraft(month,paths,{artifactRoot,revision=1,history=[],reason='Initial offline draft; human review pending.'}={}) {
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)||!artifactRoot||!Array.isArray(paths)||paths.length<1||paths.length>20)throw Error('Evidence snapshots required');
 const root=realpathSync(artifactRoot),start=new Date(`${month}-01T00:00:00Z`),end=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,1));
 const sources=paths.map(path=>{
  if(isAbsolute(path)||path.includes('\\')||path.split('/').some(part=>['..','.',''].includes(part)))throw Error('Artifact boundary rejected');
  const file=realpathSync(resolve(root,path));if(relative(root,file).startsWith('..'))throw Error('Artifact boundary rejected');
  if(statSync(file).size>1024*1024)throw Error('Snapshot exceeds bound');
  const raw=readFileSync(file);const record=parsePublicJson(raw.toString('utf8'));validateContract('evidence',record);
  const sha256=createHash('sha256').update(raw).digest('hex');return {id:`source-${sha256.slice(0,16)}`,artifact_path:path,sha256,record};
 }).sort((a,b)=>a.id.localeCompare(b.id));
 if(new Set(sources.map(s=>s.sha256)).size!==sources.length)throw Error('Duplicate evidence snapshot');
 const kinds=new Set(sources.map(s=>s.record.data_kind));if(kinds.size!==1)throw Error('Mixed evidence kinds');
 const metrics=sources.flatMap(source=>source.record.metrics.map(metric=>({
 id:`metric-${source.sha256.slice(0,12)}-${metric.id}`.slice(0,64),level:metric.level,definition:metric.definition,unit:metric.unit,value:metric.count,
 aggregation:'sum-minus-exclusions',references:[{snapshot_id:source.id,metric_id:metric.id}],
 deduplication:{method:'Single retained source; no cross-source summation. Human deduplication review pending.',excluded_count:0},
 coverage:Date.parse(metric.period.start)===+start&&Date.parse(metric.period.end)===+end?'full-period':'partial-period',
 verification:{status:'draft',method:'Offline contract validation only; no human verification asserted.'},
 limitations:[...metric.limitations.slice(0,9),'Draft; not authorized for publication.'],
 })));
 const report={schema_version:'1.0.0',report_id:`impact-${month}`,data_kind:sources[0].record.data_kind,
 period:{month,start:start.toISOString(),end:end.toISOString()},source_snapshots:sources,metrics,
 data_quality:{status:'incomplete',issues:['Human source and cross-source deduplication review pending.']},
 publication:{state:'pending',review_reference:null,approved_at:null},revision:{number:revision,reason,history}};
 validateContract('monthly',report,{artifactRoot:root});return report;
}
export function impactMarkdown(r){return `# AeglysAI impact — ${r.period.month}\n\n${r.data_kind}; publication ${r.publication.state}; revision ${r.revision.number}.\n\n| Measure | Value | Unit | Coverage | Verification |\n|---|---|---|---|---|\n${r.metrics.map(m=>`| ${m.definition.replaceAll('|','/').replaceAll('\n',' ')} | ${m.value} | ${m.unit} | ${m.coverage} | ${m.verification.status} |`).join('\n')}\n\nQuality: ${r.data_quality.status}. ${r.data_quality.issues.join(' ')}\n\n${r.metrics.flatMap(m=>m.limitations).map(s=>'- '+s).join('\n')}\n\nSource digests:\n${r.source_snapshots.map(s=>`- ${s.id}: ${s.sha256}`).join('\n')}\n`}
