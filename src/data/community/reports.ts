import {publicInput} from './input';
import {ownerApprovals} from './approvals';
import {approvedMonthly} from '../../../scripts/community/publication.mjs';
// Immutable source snapshots/history use this fixed operator-controlled artifact root.
const documents=publicInput('reports',[]);
export const reports:any[]=documents.map((document:any)=>approvedMonthly(document,ownerApprovals)).map((contract:any)=>({month:contract.period.month,revision:contract.revision.number,contract}));
if(new Set(reports.map(r=>r.month)).size!==reports.length)throw Error('Duplicate report month');
