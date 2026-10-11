/** Approved public Google Form responder URLs only. Collection opens separately
 * after privacy/terms, signed-out access and qualification rules are approved. */
export const PARTICIPANT_REGISTRATION_URL: string | null = null;
export const QUALIFICATION_SUBMISSION_URL: string | null = null;
export const JUDGE_APPLICATION_URL: string | null = null;
export const SPEAKER_INTEREST_URL: string | null = null;
export const PROJECT_SUBMISSION_URL: string | null = null;
export const hackathonForms = {
  participant: { url: PARTICIPANT_REGISTRATION_URL, open: false },
  qualification: { url: QUALIFICATION_SUBMISSION_URL, open: false },
  judge: { url: JUDGE_APPLICATION_URL, open: false },
  speaker: { url: SPEAKER_INTEREST_URL, open: false },
  project: { url: PROJECT_SUBMISSION_URL, open: false },
};
export type HackathonFormKind = keyof typeof hackathonForms;
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
