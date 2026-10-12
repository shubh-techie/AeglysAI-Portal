/** Recognition criteria only, not issued certificates or promises of issuance. */
export const certificateCategories = [
  { title: "Qualified Participant", criteria: "Individual A/B/C qualification evidence accepted by the organizer. Qualification alone does not establish competition selection or hackathon participation." },
  { title: "Hackathon Participant", criteria: "Individually qualified and selected, with approved team membership and a valid working final project meeting the published requirements." },
  { title: "Finalist", criteria: "Official Round 1 finalist selection and completion of the required finalist participation steps." },
  { title: "Winner", criteria: "Official final ranking approved after Round 2 judging, conflict review and any applicable tie resolution." },
  { title: "Judge Appreciation", criteria: "Confirmed judge who completed assigned reviews and conflict-of-interest requirements; organizer verifies service." },
  { title: "Speaker Appreciation", criteria: "Confirmed speaker who delivered the approved session; invitation or acceptance alone is insufficient." },
  { title: "Guest Appreciation", criteria: "Confirmed guest whose actual participation meets organizer-approved guest criteria; invitation alone is insufficient." },
  { title: "Mentor Appreciation", criteria: "Confirmed mentor who provided the agreed mentoring support; organizer verifies service." },
];
// Reference inspected: dark/cyan frame, recipient box and technical-topic badges.
// Original HTML/CSS adaptation retains safe placeholders, not reference personal details.
export const certificatePreview = { designSource: "REFERENCE_INSPIRED_PORTAL_DESIGN", enabled: true, publicationApproved: true };
export function canShowCertificatePreview(setting: Pick<typeof certificatePreview, "enabled" | "publicationApproved">): boolean {
  return setting.enabled === true && setting.publicationApproved === true;
}
