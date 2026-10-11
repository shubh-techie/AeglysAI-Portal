/** Approved public social assets only; null means text-only previews.
 * Image path is relative to public/. Add a real asset before configuring it.
 */
export interface SocialImage { path: string; alt: string; width: number; height: number; }
import { socialPreview } from "./social";
export const hackathonSocialPreview: { image: SocialImage | null } = { image: socialPreview };
export const hackathonSeo = {
  program: { title: "AI/ML and Cybersecurity Hackathon", description: "One free AeglysAI hackathon with five challenge choices, mandatory individual qualification and teams of one to four." },
  events: { title: "Hackathon Challenges and Rules", description: "Five challenges for one AeglysAI hackathon. Read mandatory qualification, team rules, working project and two-minute video requirements, and two-round judging." },
  community: { title: "Hackathon Community", description: "AeglysAI creator Shubh Prabhat and planned speaker and independent judge roles. Participant and judge application forms are pending; public profiles require confirmation and permission." },
};
