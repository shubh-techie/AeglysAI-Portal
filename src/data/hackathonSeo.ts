/** Approved public social assets only; null means text-only previews.
 * Image path is relative to public/. Add a real asset before configuring it.
 */
export interface SocialImage { path: string; alt: string; width: number; height: number; }
import { socialPreview } from "./social";
export const hackathonSocialPreview: { image: SocialImage | null } = { image: socialPreview };
export const hackathonSeo = {
  program: { title: "AEGYTHON 2026", description: "AEGYTHON 2026: one free hackathon with six challenge choices, mandatory individual qualification and teams of one to four." },
  events: { title: "AEGYTHON 2026 — Challenges and Rules", description: "Six challenges for AEGYTHON 2026. Read mandatory qualification, team rules, working project and two-minute video requirements, and two-round judging." },
  community: { title: "AEGYTHON 2026 — People & Partners", description: "Meet the AeglysAI creator and review speaker, mentor, judge and guest onboarding. Official registration and role-specific intake links are available; event profiles require confirmation and display permission." },
};
