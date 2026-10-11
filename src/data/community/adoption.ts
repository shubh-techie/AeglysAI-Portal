import {publicInput} from './input';
import {ownerApprovals} from './approvals';
import {adoptionRecords} from '../../../scripts/community/publication.mjs';
export const adoptionCategories=[
 ['Independent integrations','Verified external independent adoption with executed technical evidence; not proof of effectiveness.'],
 ['Research reproductions','Independent execution of a protocol with limitations; not general validation.'],
 ['Academic references','Verified citation only; neither adoption nor executed reproduction.'],
 ['Technical use','Verified usage; independence is not implied.'],
];
const document=publicInput('adoptions',null);
export const adoptions:any[]=document?adoptionRecords(document,ownerApprovals):[];
