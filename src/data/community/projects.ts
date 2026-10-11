import { publicInput } from './input';
import { reviewedPublicRecords } from '../../../scripts/community/contracts.mjs';
import challenges from './challenges.json';
import {ownerApprovals} from './approvals';
import {authorize} from '../../../scripts/community/publication.mjs';
const records=publicInput('projects',[]);
const owner=records.length?authorize({data_kind:'PUBLIC_AGGREGATE',records},'projects',ownerApprovals):null;
export const projects:any[]=reviewedPublicRecords(records,'project').filter((record:any)=>owner?.recordIds.includes(record.id));
if(projects.some(record=>!challenges.some(track=>track.title===record.category)))throw Error('Unknown challenge category');
