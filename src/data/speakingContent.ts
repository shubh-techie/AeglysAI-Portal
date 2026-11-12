import { publishedPresentations } from './presentations';
import { validateSpeakingShowcase, type SpeakingPhoto } from './speakingShowcase';

/** Add only rights-cleared, digest-approved assets. Unpublished originals never enter public/. */
const approvedPhotos: Record<string, SpeakingPhoto[]> = {};
const records=publishedPresentations();
const tracker='https://github.com/shubh-techie/AeglysAI-Portal/blob/main/docs/speaking/SPEAKING_EVIDENCE_TRACKER.md';
export const speakingShowcase=validateSpeakingShowcase({
  schemaVersion:'1.0.0',
  events:records.filter(p=>p.conference).map(p=>({
    id:p.slug,presentationId:p.slug,name:p.conference!.name,shortName:p.conference!.shortName,
    startDate:p.conference!.startDate,endDate:p.conference!.endDate,
    location:p.location??p.conference!.venue??'Location to be confirmed',mode:p.conference!.mode,
    organizer:p.conference!.organizer.name,role:p.role??'Role to be confirmed',
    talkTitle:p.talkTitle===undefined?p.title:!p.talkTitle||/to be (announced|confirmed)/i.test(p.talkTitle)?null:p.talkTitle,
    summary:p.description,abstract:p.abstract??null,status:p.participationStatus,
    statusNote:p.participationNote??null,deliveryDate:p.delivery?.date??null,eventUrl:p.conference!.sourceUrl,
    sourceReferences:[p.conference!.sourceUrl,tracker],publicationApproved:p.approvedForPublication,
    photos:approvedPhotos[p.slug]??[],recordingIds:[],
  })),
  // Exact titles/channel verified via official YouTube oEmbed on 2026-11-12.
  // All three are AEGYTHON community recordings, not conference-delivery evidence.
  recordings:[
    {id:'Uw6hD61RqNM',title:'Special Interaction and Q&A Session by Industry Experts and Leaders | AEGYTHON 2026 | AeglysAI'},
    {id:'OLASKGI-aFw',title:'QnA Session by Founder | AEGYTHON 2026'},
    {id:'tn5RhKbzRcw',title:'How to Register & Qualify for AEGYTHON 2026 | Step-by-Step Guide | AeglysAI'},
  ].map(r=>({...r,channel:'AeglysAI',context:'AEGYTHON 2026 · Community recording',eventId:null,associationSource:null,
    metadataSource:`https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${r.id}&format=json`,
    metadataVerifiedAt:'2026-11-12',publicationApproved:true})),
});
export const featuredSpeakingEvent=speakingShowcase.events.find(e=>e.status==='Completed')??speakingShowcase.events[0];
export const speakingResources=records.filter(p=>p.thumbnail||p.pdf);
export const proposedSpeakingTopics=records.filter(p=>p.participationStatus==='Proposed');
