import {digest,safeUrl,calendarDate} from './contracts.mjs';
import {validateContract} from './upstream.mjs';
import {assertPublicExport} from './public-export.mjs';
export function authorize(document,kind,approvals,{now=new Date()}={}) {
 assertPublicExport(document);assertPublicExport(approvals);
 if(document.data_kind!=='PUBLIC_AGGREGATE' && kind!=='metrics')throw Error('Synthetic or draft content cannot publish');
 if(!Array.isArray(approvals)||approvals.length>100)throw Error('Owner authorization required');
 const matches=approvals.filter(a=>a.kind===kind&&a.sha256===digest(document));
 if(matches.length!==1)throw Error('Separate owner authorization required');
 const a=matches[0],keys=['kind','sha256','reviewUrl','approvedAt','recordIds'];
 if(Object.keys(a).some(k=>!keys.includes(k))||!safeUrl(a.reviewUrl)||!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(a.approvedAt)||!calendarDate(a.approvedAt.slice(0,10))||!Number.isFinite(Date.parse(a.approvedAt))||Date.parse(a.approvedAt)>+now||!Array.isArray(a.recordIds)||a.recordIds.length>100||new Set(a.recordIds).size!==a.recordIds.length||a.recordIds.some(id=>typeof id!=='string'||! /^[a-z][a-z0-9-]{2,63}$/.test(id)))throw Error('Owner authorization invalid');
 return a;
}
export function recognitionRecords(document,approvals,options={}) {
 validateContract('recognition',document);const owner=authorize(document,'recognition',approvals,options);
 return document.recognitions.filter(r=>owner.recordIds.includes(r.id)&&r.publication.state==='published'&&r.consent.state==='granted'&&r.contribution_accepted&&r.publication.review_approved&&r.credit_mode!=='none');
}
export function adoptionRecords(document,approvals,options={}) {
 validateContract('adoption',document);const owner=authorize(document,'adoption',approvals,options);
 return document.records.filter(r=>owner.recordIds.includes(r.id)&&r.record_state==='current'&&r.verification.status==='verified').map(r=>({
 id:r.id,title:`${r.claim_kind.replaceAll('-',' ')} — ${r.id}`,
 category:({'independent-adoption':'Independent integrations','independent-reproduction':'Research reproductions',citation:'Academic references',usage:'Technical use'})[r.claim_kind],
 description:r.limitations.join(' '),sourceUrl:r.source.reference,reviewUrl:r.verification.review_reference,
 outcome:r.execution.status==='executed'?r.execution.environment:'No executed outcome asserted.',
 verifiedAt:owner.approvedAt.slice(0,10),dateLabel:'Publication reviewed',
 claimKind:r.claim_kind,classification:r.independence.classification,independence:r.independence.relationship,executionUrl:r.execution.reference,citations:r.citations,
 }));
}
export function approvedMonthly(document,approvals,{artifactRoot,now=new Date()}={}) {
 validateContract('monthly',document,{artifactRoot,publication:true});
 if(document.source_snapshots.some(source=>source.record.metrics.some(metric=>metric.verification.status!=='verified')))throw Error('Draft source metrics cannot publish');
 const owner=authorize(document,'monthly',approvals,{now});
 if(Date.parse(document.period.end)>+now||Date.parse(document.publication.approved_at)>+now||Date.parse(owner.approvedAt)<Date.parse(document.period.end))throw Error('Open period cannot publish');
 return document;
}
