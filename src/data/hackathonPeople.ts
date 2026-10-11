/** Public-profile configuration only. Never store application/contact data here.
 * Invited and unapproved profiles are excluded from generated pages.
 * This is a public repository: keep private invitation records outside it.
 */
export type PersonStatus = "CONFIRMED" | "INVITED";
export type EventAssignment =
  | "ai-ml-cybersecurity"
  | "adaptive-authorization"
  | "behavioral-risk"
  | "autonomous-resilience";

export interface PublicProfile {
  name: string;
  title: string;
  organization: string | null;
  photo: { path: string; alt: string } | null;
  bio: string;
  linkedinUrl: string | null;
  status: PersonStatus;
  publicDisplayApproved: boolean;
}
export interface Speaker extends PublicProfile {
  topics: string[];
}
export interface Judge extends PublicProfile {
  technicalExpertise: string[];
  eventAssignments: EventAssignment[];
}
export interface CommunitySlot<T extends PublicProfile> {
  id: string;
  label: string;
  person: T | null;
}

// Empty slots do not imply invitations or confirmed people.
export const speakers: CommunitySlot<Speaker>[] = Array.from({ length: 3 }, (_, i) => ({
  id: `guest-${i + 1}`, label: `Future guest speaker ${i + 1}`, person: null,
}));
export const judges: CommunitySlot<Judge>[] = Array.from({ length: 3 }, (_, i) => ({
  id: `judge-${i + 1}`, label: `Independent judge slot ${i + 1}`, person: null,
}));

export function approvedPublicPerson<T extends PublicProfile>(person: T | null): T | null {
  return person?.status === "CONFIRMED" && person.publicDisplayApproved === true
    ? person : null;
}
