/** Public responder configuration only. Availability, permission to link, and
 * organizer authorization to open collection are independent gates.
 * Supplied by organizer; verified using signed-out GETs, never submitted.
 * Latest organizer instruction authorizes all seven public onboarding links. */
export interface FormSetting { id: string; title: string; url: string | null; available: boolean; verifiedAt: string | null; publicationApproved: boolean; open: boolean; }
export const hackathonForms: Record<"participant" | "team" | "speaker" | "judge" | "guest" | "project" | "qualification", FormSetting> = {
  "participant": {
    "id": "FORM-01",
    "title": "AeglysAI Hackathon 2026 \u2014 Participant Registration",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSeNfr0ah_d2yHuBzVZmRY87gkt7e4mGOcIB0IqczaUSl8ok9w/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:24.255884+00:00",
    "publicationApproved": true,
    "open": true
  },
  "team": {
    "id": "FORM-02",
    "title": "AeglysAI Hackathon \u2014 Team Formation",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSelZREdEyRWpHfvDAZj5-PLPgeH0cx9EJd_X8JeJIabJ7My2g/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:24.542385+00:00",
    "publicationApproved": true,
    "open": true
  },
  "speaker": {
    "id": "FORM-03",
    "title": "AeglysAI Hackathon \u2014 Speaker and Mentor Profile",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSf6ftQrbY8yjw__nbCvBQoviGLSh-h0-6dHHmXg8zIfu4cGHw/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:24.931999+00:00",
    "publicationApproved": true,
    "open": true
  },
  "judge": {
    "id": "FORM-04",
    "title": "AeglysAI Hackathon \u2014 Judge Profile and Acceptance",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSeRQCHmEQ3XmKqmBPId5nCDL4iFNP_ueMpVzaeYoVo60Hp-Ug/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:25.241796+00:00",
    "publicationApproved": true,
    "open": true
  },
  "guest": {
    "id": "FORM-05",
    "title": "AeglysAI Hackathon \u2014 Guest Invitation Response",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSfPrYx04ZiHIIbjQVUkgjrO2eHRZK7YyHJhIkMLWNQU5AdmRQ/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:25.550789+00:00",
    "publicationApproved": true,
    "open": true
  },
  "project": {
    "id": "FORM-06",
    "title": "AeglysAI Hackathon \u2014 Final Project Submission",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSeje4ie_BXjzsNpxu_NvNxIJcz5p9IoS3jEgiUaC6FPdh_Frg/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:25.826367+00:00",
    "publicationApproved": true,
    "open": true
  },
  "qualification": {
    "id": "FORM-07",
    "title": "AeglysAI \u2014 Technical Prequalification Submission",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSd3RjgCNWJ7pgPrRAWQOsmbl_-FPu5-Y-KMttaf54NyBCeKBQ/viewform",
    "available": true,
    "verifiedAt": "2026-10-12T03:12:26.119570+00:00",
    "publicationApproved": true,
    "open": true
  }
};
export type HackathonFormKind = keyof typeof hackathonForms;
export function approvedFormUrl(setting: FormSetting): string | null {
  return publicFormUrl(setting.url, setting.available && setting.publicationApproved && setting.open && setting.verifiedAt !== null && Number.isFinite(Date.parse(setting.verifiedAt)));
}
export function publicFormUrl(url: string | null, open: boolean): string | null {
  if (!url) return null;
  const parsed = new URL(url);
  const responder = parsed.protocol === "https:" && !parsed.username && !parsed.password && !parsed.port && !parsed.search && !parsed.hash && (
    (parsed.hostname === "forms.gle" && /^\/[A-Za-z0-9_-]+\/?$/.test(parsed.pathname)) ||
    (parsed.hostname === "docs.google.com" && /^\/forms\/d\/(?:e\/)?[A-Za-z0-9_-]+\/viewform\/?$/.test(parsed.pathname))
  );
  if (!responder) throw new Error("Hackathon forms must use approved HTTPS Google Form responder URLs.");
  return open ? url : null;
}

// Compatibility exports: all consumers must apply approvedFormUrl before rendering.
export const PARTICIPANT_REGISTRATION_URL = hackathonForms.participant.url;
export const QUALIFICATION_SUBMISSION_URL = hackathonForms.qualification.url;
export const JUDGE_APPLICATION_URL = hackathonForms.judge.url;
export const SPEAKER_INTEREST_URL = hackathonForms.speaker.url;
export const PROJECT_SUBMISSION_URL = hackathonForms.project.url;
