import { createHash } from 'node:crypto';
import { validateContract } from './upstream.mjs';
export const digest = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
export function safeUrl(value) {
  try { const u=new URL(value); return u.protocol==='https:' && !u.username && !u.password && !u.search && !u.hash && !u.port && !['localhost','127.0.0.1'].includes(u.hostname) && /^[a-zA-Z0-9.-]+$/.test(u.hostname); } catch { return false; }
}
export function calendarDate(value) {
 return typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10)===value;
}
export function validateEvidence(document,{requireVerified=false}={}) {
 return validateContract('evidence',document,{requireVerified});
}
export const reviewStatuses=['RECEIVED','PENDING_REVIEW','VERIFIED','REJECTED','WITHDRAWN'];
export function transitionReview(record,next) {
 const transitions={RECEIVED:['PENDING_REVIEW','WITHDRAWN'],PENDING_REVIEW:['VERIFIED','REJECTED','WITHDRAWN'],VERIFIED:['PENDING_REVIEW','WITHDRAWN'],REJECTED:['PENDING_REVIEW','WITHDRAWN'],WITHDRAWN:[]};
 if(!transitions[record.status]?.includes(next))throw Error('Review transition rejected');
 return {...record,status:next,publicationPermission:next==='WITHDRAWN'?false:record.publicationPermission};
}
export function reviewedPublicRecords(records,kind) {
  const allowed=['id','title','description','category','codeUrl','demoUrl','sourceUrl','highlights','verifiedAt','status','publicationPermission','reviewUrl','independent','outcome','provenanceDate'];
  const ids=new Set();
  return records.filter(record=>{
    if(!reviewStatuses.includes(record.status))throw Error('Invalid review status');
    if(record.status!=='VERIFIED'||record.publicationPermission!==true)return false;
    if(Object.keys(record).some(k=>!allowed.includes(k)) || !/^[a-z0-9-]+$/.test(record.id) || ids.has(record.id) || !record.title?.trim() || !record.description?.trim() || !safeUrl(record.sourceUrl) || !safeUrl(record.reviewUrl) || !calendarDate(record.verifiedAt) || record.codeUrl && !safeUrl(record.codeUrl) || record.demoUrl && !safeUrl(record.demoUrl))throw Error('Public review gate rejected');
    if(kind==='adoption' && (record.independent!==true || !record.outcome?.trim() || !calendarDate(record.provenanceDate)))throw Error('Independent outcome evidence required');
    if(record.highlights!==undefined && (!Array.isArray(record.highlights) || record.highlights.some(v=>typeof v!=='string' || v.length>1000)))throw Error('Technical highlights rejected');
    ids.add(record.id); return true;
  });
}
