import { publishedPresentations } from './presentations';
import { validateSpeakingShowcase } from './speakingShowcase';

/** Add only rights-cleared, digest-approved assets. Unpublished originals never enter public/. */
// Photo approvals and event mappings are maintained separately.
import { approvedPhotos } from './speakingPhotos';
import conferencePolicy from './conferenceFolders.json';
import configuredRecordings from './speakingRecordings.json';
const records=publishedPresentations();
// Owner explicitly updated these showcase statuses in SPEAK-001H; do not infer dates from photographs.
const statusReference='https://github.com/shubh-techie/AeglysAI-Portal/blob/main/docs/speaking/SPEAK-001H-REVIEW.md';
const ownerStatuses={
 'gicite-2026-wru-key-talk':{status:'Completed',statusEvidence:{basis:'OWNER_CONFIRMED',reference:statusReference},statusNote:'Completion confirmed by the owner in SPEAK-001H. Exact delivery date and final talk title have not been supplied.',summary:'GICITE 2026 engagement completed, as confirmed by the owner. The final talk title has not been supplied.'},
 'etic-2026':{status:'Invitation Accepted',statusEvidence:{basis:'OWNER_CONFIRMED',reference:statusReference},statusNote:'Invitation accepted by the speaker. Written organizer confirmation, speaking role and talk title remain unconfirmed.',summary:'Invitation to ETIC 2026 accepted by the speaker. The speaking role and talk title remain to be confirmed.'},
};
const tracker='https://github.com/shubh-techie/AeglysAI-Portal/blob/main/docs/speaking/SPEAKING_EVIDENCE_TRACKER.md';
export const speakingShowcase=validateSpeakingShowcase({
  schemaVersion:'1.0.0',
  events:records.filter(p=>p.conference).map(p=>Object.assign({
    id:p.slug,presentationId:p.slug,name:p.conference!.name,shortName:p.conference!.shortName,
    startDate:p.conference!.startDate,endDate:p.conference!.endDate,
    location:p.location??p.conference!.venue??'Location to be confirmed',mode:p.conference!.mode,
    organizer:p.conference!.organizer.name,role:p.role??'Role to be confirmed',
    talkTitle:p.talkTitle===undefined?p.title:!p.talkTitle||/to be (announced|confirmed)/i.test(p.talkTitle)?null:p.talkTitle,
    summary:p.description,abstract:p.abstract??null,status:p.participationStatus,
    statusNote:p.participationNote??null,deliveryDate:p.delivery?.date??null,eventUrl:p.conference!.sourceUrl,
    sourceReferences:[p.conference!.sourceUrl,tracker],publicationApproved:p.approvedForPublication,
    photoDirectory:conferencePolicy.folders.find(f=>f.eventId===p.slug&&f.publicationReady)?.folder?`conference/${conferencePolicy.folders.find(f=>f.eventId===p.slug&&f.publicationReady)!.folder}`:null,
    photoPublicationApproved:conferencePolicy.folders.some(f=>f.eventId===p.slug&&f.publicationReady),
    imageAttribution:conferencePolicy.folders.find(f=>f.eventId===p.slug&&f.publicationReady)?.credit??null,
    photos:approvedPhotos[p.slug]??[],
  },ownerStatuses[p.slug as keyof typeof ownerStatuses]??{})),
  recordings:configuredRecordings,
});
export const featuredSpeakingEvent=speakingShowcase.events.find(e=>e.status==='Completed')??speakingShowcase.events[0];
export const speakingResources=records.filter(p=>p.thumbnail||p.pdf);
export const proposedSpeakingTopics=records.filter(p=>p.participationStatus==='Proposed');
