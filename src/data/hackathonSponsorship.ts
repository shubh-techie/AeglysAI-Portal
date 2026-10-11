import { events } from "./hackathons";
import { publicFormUrl } from "./hackathonForms";
export const SPONSOR_INTEREST_FORM_URL: string | null = null;
export const SPONSOR_INTEREST_OPEN = false;
// Approved public sponsorship contact only; never a personal phone or private record.
export const SPONSORSHIP_CONTACT_EMAIL: string | null = null;
export const sponsorInterestUrl = publicFormUrl(SPONSOR_INTEREST_FORM_URL, SPONSOR_INTEREST_OPEN);
export const sponsorshipTiers = [
  { id: "community", name: "Community Supporter", minimumUsd: 250, recognition: ["Sponsor name/logo on the sponsorship page", "Acknowledgement on the applicable event page"] },
  { id: "challenge", name: "Challenge Sponsor", minimumUsd: 500, recognition: ["Community Supporter recognition", "Acknowledgement associated with the applicable hackathon", "Recognition in applicable event communications"] },
  { id: "prize", name: "Prize Sponsor", minimumUsd: 1000, recognition: ["Challenge Sponsor recognition", "Contribution acknowledged toward the applicable prize pool", "Recognition in applicable winner/final-results communication"] },
  { id: "series", name: "Hackathon Sponsor", minimumUsd: 2500, recognition: ["Recognition across the single hackathon", "Sponsor logo on the hackathon sponsorship section", "Acknowledgement in hackathon communications", "Recognition in the final hackathon summary"] },
];
export type SponsorStatus = "INTERESTED" | "UNDER_REVIEW" | "TERMS_PENDING" | "CONFIRMED" | "COMPLETED";
/** Public-approved records only. Private intake, contacts, terms/evidence stay outside Git. */
export interface PublicSponsor {
  name: string;
  status: SponsorStatus;
  publicDisplayApproved: boolean;
  termsAccepted: boolean;
  contributionConfirmed: boolean;
  nameLogoPermission: boolean;
  website: string | null;
  logo: { path: string; alt: string } | null;
  eventIds: string[];
  tierId: string;
  // Cash specifically allocated to each prize pool, not all sponsorship or in-kind value.
  prizeAllocationsUsd: Record<string, number>;
}
export const sponsors: PublicSponsor[] = [];
export function confirmedSponsors(records: PublicSponsor[]) {
  return records.filter(record => record.status === "CONFIRMED" && record.publicDisplayApproved && record.termsAccepted && record.contributionConfirmed && record.nameLogoPermission);
}
export function prizePools(records: PublicSponsor[]) {
  const confirmed = confirmedSponsors(records);
  return events.map(event => {
    const additional = confirmed.reduce((total, sponsor) => {
      const amount = sponsor.prizeAllocationsUsd[event.id] ?? 0;
      if (!Number.isFinite(amount) || amount < 0) throw new Error("Prize allocations must be verified nonnegative USD amounts.");
      if (amount && !sponsor.eventIds.includes(event.id)) throw new Error("Prize allocation must match the agreed event scope.");
      return total + amount;
    }, 0);
    return { event, base: event.prize.amount, additional, total: event.prize.amount + additional };
  });
}
export const independence = ["participant selection", "qualification decisions", "judging scores", "winner selection", "research conclusions", "technical roadmap decisions", "publication authorship", "speaking positions", "judge positions", "awards", "certificates of achievement"];
export const sponsorWorkflow = ["Sponsor Interest", "Organizer Review", "Tier / Event Selection", "Written Terms Shared", "Questions / Negotiation", "Both Parties Agree", "Logo Permission", "Contribution Confirmed", "CONFIRMED SPONSOR", "Public Recognition"];
export const sponsorshipFaq = [
  ["Who can sponsor?", "Organizations and individuals may express interest. Eligibility, suitability and acceptance remain TBD / Contact Organizer; no application is automatically accepted."],
  ["Can individuals sponsor?", "Individual sponsorship eligibility and recognition: TBD / Contact Organizer."],
  ["Can companies sponsor a specific hackathon?", "Proposed challenge and prize tiers support specific events, subject to written agreement and organizer approval."],
  ["Can sponsorship increase the prize?", "Yes, confirmed funding allocated to a prize pool may increase it. Unconfirmed pledges and unverified in-kind value do not increase displayed prizes."],
  ["Can sponsors become judges?", "Only through normal judge selection and conflict-of-interest rules. Sponsorship guarantees no judging position or influence."],
  ["Will sponsors receive participant information?", "No automatic access. Any future sharing requires appropriate consent and a separately documented process."],
  ["Can sponsors use the AeglysAI name/logo?", "Only with separately approved written permission and agreed scope. Sponsorship does not transfer intellectual property."],
  ["Can sponsor logos appear on certificates?", "Only with confirmed sponsorship, written certificate rights, sponsor name/logo permission and organizer approval of the final design. AeglysAI remains issuer unless formally agreed otherwise."],
  ["What happens if an event is postponed?", "TBD — LEGAL/ORGANIZER REVIEW. Event changes and recognition obligations must be agreed in written terms."],
  ["Are sponsorship contributions refundable?", "TBD — LEGAL/ORGANIZER REVIEW. No refundable or non-refundable policy is established here."],
  ["Can sponsorship be in-kind?", "Cloud credits, developer tooling, technical resources, educational licenses and event resources may be considered. Acceptance and valuation require agreement; no unverified public monetary value."],
];
