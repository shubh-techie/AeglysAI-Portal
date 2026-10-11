import {publicInput} from './input';
import {ownerApprovals} from './approvals';
import {recognitionRecords} from '../../../scripts/community/publication.mjs';
const document=publicInput('recognition',null);
export const recognitions:any[]=document?recognitionRecords(document,ownerApprovals):[];
