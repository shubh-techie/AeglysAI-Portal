import { publicInput } from './input';
import { validateSnapshot } from '../../../scripts/community/metrics.mjs';
import { digest,safeUrl } from '../../../scripts/community/contracts.mjs';
import {ownerApprovals} from './approvals';
import {authorize} from '../../../scripts/community/publication.mjs';
const approval=publicInput('approved-metrics',null);
export const snapshot:any=approval?.snapshot??null;
if(snapshot){validateSnapshot(snapshot);authorize(snapshot,'metrics',ownerApprovals);if(approval.approved!==true||!safeUrl(approval.reviewUrl)||approval.sha256!==digest(snapshot))throw Error('Observation publication blocked');}
