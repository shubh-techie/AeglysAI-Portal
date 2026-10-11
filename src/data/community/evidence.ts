import {publicInput} from './input';
import {ownerApprovals} from './approvals';
import {validateEvidence} from '../../../scripts/community/contracts.mjs';
import {authorize} from '../../../scripts/community/publication.mjs';
const approval=publicInput('approved-evidence',null);
export const evidence:any=approval?.evidence??null;
if(evidence){validateEvidence(evidence,{requireVerified:true});authorize(evidence,'evidence',ownerApprovals);}
