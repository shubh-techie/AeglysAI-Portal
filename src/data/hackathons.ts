import { creator } from "./creator";
import { hackathonForms, approvedFormUrl } from "./hackathonForms";

export type ProgramStatus = "CONFIRMED" | "INVITED" | "PLANNED" | "COMPLETED";
// Set to official HTTPS application forms when available; never invent URLs.
export const PARTICIPANT_REGISTRATION_FORM_URL = approvedFormUrl(hackathonForms.participant);
export const JUDGE_INVITATION_FORM_URL = approvedFormUrl(hackathonForms.judge);
export const SUBMISSION_FORM_URL = approvedFormUrl(hackathonForms.project);
// Compatibility alias for PORTAL-005 consumers; configure the registration URL above.
export const PARTICIPANT_FORM_URL = PARTICIPANT_REGISTRATION_FORM_URL;
export const registrationLinks = {
  participant: PARTICIPANT_REGISTRATION_FORM_URL,
  judge: JUDGE_INVITATION_FORM_URL,
  submission: SUBMISSION_FORM_URL,
};
/** TIME-001A: organizer-confirmed 2026 facts; null never supplies a deadline or venue. */
export type Announcement<T> = { status: "CONFIRMED"; value: T } | { status: "UNCONFIRMED"; value: null };
export interface EventSchedule {
  registration: { status: "CONFIRMED"; start: string; end: string; mode: string };
  submission: { title: string; dates: Announcement<{ start: string; end: string }>; deadline: Announcement<string>; mode: string };
  finale: { status: "CONFIRMED"; date: string; mode: string };
  judging: { schedule: Announcement<string> };
  sessionTimes: Announcement<string>;
  venue: Announcement<string>;
  certificates: { verificationChannel: Announcement<string>; issuanceDate: Announcement<string> };
}
export const eventSchedule: EventSchedule = {
  registration: { status: "CONFIRMED", start: "2026-10-01", end: "2026-11-06", mode: "Online" },
  submission: { title: "Project Submission & Finalist Qualification", dates: { status: "CONFIRMED", value: { start: "2026-11-15", end: "2026-11-22" } }, deadline: { status: "UNCONFIRMED", value: null }, mode: "Virtual judging and finalist selection" },
  finale: { status: "CONFIRMED", date: "2026-11-28", mode: "Hybrid — Online & On-site" },
  judging: { schedule: { status: "CONFIRMED", value: "Virtual project review and finalist selection" } },
  sessionTimes: { status: "UNCONFIRMED", value: null },
  venue: { status: "UNCONFIRMED", value: null },
  certificates: { verificationChannel: { status: "UNCONFIRMED", value: null }, issuanceDate: { status: "UNCONFIRMED", value: null } },
};
// These are calendar days, not local midnight timestamps or invented start times.
export function eventDate(date: string, month: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
export function eventDateRange(start: string, end: string, month: "long" | "short" = "long"): string {
  const first = eventDate(start, month);
  return `${start.slice(0, 4) === end.slice(0, 4) ? first.replace(/, \d{4}$/, "") : first} – ${eventDate(end, month)}`;
}
/** Shared copy is derived from the schedule; consumers do not duplicate confirmed dates. */
export function eventScheduleCopy(schedule: EventSchedule) {
  const registration = eventDateRange(schedule.registration.start, schedule.registration.end);
  const registrationShort = `Registration & Qualification: ${eventDateRange(schedule.registration.start, schedule.registration.end, "short")}`;
  const finale = eventDate(schedule.finale.date);
  const finaleShort = `Grand Finale: ${eventDate(schedule.finale.date, "short")}`;
  const submission = schedule.submission.dates.status === "CONFIRMED"
    ? eventDateRange(schedule.submission.dates.value.start, schedule.submission.dates.value.end) : "Schedule to be announced";
  const submissionShort = `${schedule.submission.title}: ${schedule.submission.dates.status === "CONFIRMED" ? eventDateRange(schedule.submission.dates.value.start, schedule.submission.dates.value.end, "short") : submission}`;
  const sessionTimes = schedule.sessionTimes.status === "CONFIRMED" ? schedule.sessionTimes.value : "Exact session times will be announced separately.";
  const judging = schedule.judging.schedule.status === "CONFIRMED" ? `${schedule.judging.schedule.value}: ${submission}. ${sessionTimes}`
    : "Virtual project review and finalist selection. Detailed judging and submission schedule will be announced separately.";
  const venue = `Grand Finale: ${finale} — ${schedule.finale.mode.replace("Hybrid — ", "Hybrid (")}${schedule.finale.mode.startsWith("Hybrid — ") ? ")" : ""}. ${schedule.venue.status === "CONFIRMED" ? `On-site venue: ${schedule.venue.value}.` : "On-site venue details will be announced separately."}`;
  const certificates = schedule.certificates.verificationChannel.status === "CONFIRMED" && schedule.certificates.issuanceDate.status === "CONFIRMED"
    ? `Certificate verification: ${schedule.certificates.verificationChannel.value}. Certificate issuance date: ${eventDate(schedule.certificates.issuanceDate.value)}.`
    : "Certificate verification and issuance details will be communicated through official AEGYTHON channels.";
  return { registration, registrationShort, finale, finaleShort, submission, submissionShort, judging, venue, certificates, sessionTimes,
    summary: `${registrationShort}. ${submissionShort}. ${finaleShort}.`,
    submissionDeadline: schedule.submission.deadline.status === "CONFIRMED" ? `Submission deadline: ${eventDate(schedule.submission.deadline.value)}.` : "The phase window does not specify an hour-specific submission deadline. Exact submission cutoff times will be announced separately.",
    selectionNote: schedule.submission.dates.status === "CONFIRMED" ? "Selected phase is a reading aid." : "Selected phase is a reading aid. Phase 2 schedule remains to be announced.",
  };
}
export const scheduleCopy = eventScheduleCopy(eventSchedule);
export const program = {
  title: "AEGYTHON 2026",
  subtitle: "Build. Break. Measure. Improve.",
  description: "A community engineering program for exploring adaptive authorization, behavioral risk, cloud-native security and resilient distributed systems using the open-source AeglysAI research platform.",
  prize: "Existing planned USD $300 prize; funding unconfirmed",
  terms: "Prizes and rules are subject to official event terms until finalized. No prize has been awarded.",
  eligibility: "Free participation for platform engineers, cloud engineers, security engineers, SREs, software engineers, AI/ML engineers, researchers and graduate students. Individuals and teams of two to four are eligible after every member individually qualifies and is selected. Age and geographic requirements remain subject to official terms.",
};
export const participants = ["Platform Engineers", "Cloud Engineers", "Security Engineers", "Distributed Systems Engineers", "SREs", "Software Engineers", "AI/ML Engineers", "Researchers", "Graduate Students"];
export const judgingCriteria = ["Technical correctness", "Security reasoning", "Architecture quality", "Reproducibility", "Innovation", "Explainability", "Documentation"];
export const statusDefinitions: Record<ProgramStatus, string> = {
  CONFIRMED: "Participation or arrangements explicitly confirmed.",
  INVITED: "An invitation has been sent; acceptance is pending.",
  PLANNED: "Proposed; arrangements have not been finalized.",
  COMPLETED: "Finished, with supporting evidence available.",
};
export const legacyEvents: {
  id: string; title: string; status: ProgramStatus; launch: string;
  submission: string; prize: { amount: number; currency: "USD"; status: "PLANNED" }; themes: string[]; problem: string; challenge: string;
  deliverables: string[]; registrationUrl: string | null; submissionUrl: string | null;
}[] = [
  {
    id: "adaptive-authorization", title: "AeglysAI Adaptive Authorization Challenge", status: "PLANNED",
    launch: "November 2026", submission: "January 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["RBAC", "ABAC", "Zero Trust", "Risk-Aware Authorization", "Contextual risk", "Adaptive authorization", "Policy explainability"],
    problem: "Authorization policies must account for roles, attributes and context while making security decisions understandable and testable.",
    challenge: "Build or evaluate an authorization capability around AeglysAI. Compare policy behavior under changing context, identify failure cases and explain the security tradeoffs with reproducible evidence.",
    deliverables: ["Source code or evaluation harness and setup instructions", "Policy examples, threat assumptions and reproducible test cases", "Results with limitations and an explanation of authorization decisions"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "behavioral-risk", title: "AeglysAI Behavioral Risk Challenge", status: "PLANNED",
    launch: "December 2026", submission: "February 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["Behavioral anomaly detection", "Risk evidence", "Identity/context signals", "Explainability", "False-positive reduction"],
    problem: "Behavioral signals can be noisy, and risk assessments need evidence that distinguishes suspicious activity from legitimate variation.",
    challenge: "Prototype or evaluate behavioral risk methods using synthetic or appropriately licensed data. Explain signal selection, assess false positives and document uncertainty. Model D has a completed experimental research implementation with no enforcement authority; this challenge does not claim field-validated effectiveness.",
    deliverables: ["Prototype or evaluation code with reproducible setup", "Data provenance, signal definitions and privacy considerations", "Evaluation method, false-positive analysis and explainable risk evidence"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "autonomous-resilience", title: "AeglysAI Autonomous Resilience Challenge", status: "PLANNED",
    launch: "January 2027", submission: "March 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["Incident detection", "Policy-bounded response", "Resilience", "Observability", "Distributed-system security", "Distributed-System Recovery"],
    problem: "Distributed-system incidents require observable evidence and response mechanisms constrained by explicit security policies.",
    challenge: "Build or evaluate an incident-detection or resilience prototype in an isolated environment. Define response boundaries, test failure scenarios and explain recovery behavior. Autonomous response is a challenge theme, not a claim of deployed AeglysAI functionality.",
    deliverables: ["Prototype or evaluation harness with architecture documentation", "Isolated incident scenarios, telemetry and reproducible runs", "Response policies, safeguards, recovery analysis and limitations"],
    registrationUrl: null, submissionUrl: null,
  },
];
export const keynote = { person: creator, status: "PLANNED" as ProgramStatus };
export { speakers, judges } from "./hackathonPeople";

/** Finalized operating rules; schedule confirmation and approved forms are tracked separately. */
export { default as challenges } from './community/challenges.json';
export const teamRules = [
 "Individuals may compete; teams may contain two to four participants, maximum four.",
 "Every member, including the leader, must individually complete qualification and be selected.",
 "Designate one team leader and obtain a unique team ID from the organizer.",
 "No duplicate active team membership; membership changes require organizer approval.",
 "Organizers verify rosters in private Google Sheets; roster mappings are never public.",
];
export const scoringFramework = [
 { category: "Functionality", weight: 30 },
 { category: "AI/ML or intelligent feature", weight: 25 },
 { category: "Relevance and creativity", weight: 20 },
 { category: "Reproducibility", weight: 15 },
 { category: "Video clarity", weight: 10 },
];
export const finalistRubric = [
 { category: "Live demonstration", weight: 35 },
 { category: "Technical understanding", weight: 25 },
 { category: "Solution quality and safety", weight: 20 },
 { category: "Technical Q&A", weight: 15 },
 { category: "Presentation", weight: 5 },
];
export const submissionRequirements = [
 "Team ID", "Selected challenge", "Public GitHub source URL and frozen review commit/tag", "Project README",
 "Reproduction/setup instructions", "Working demonstration video URL — maximum two minutes",
 "Explanation of AI/ML or intelligent technique", "Test or validation evidence",
 "Data/model attribution and licensing", "Known limitations",
];
export const optionalSubmissionMaterials = ["Deployed demo URL", "Benchmark results", "Research notes"];
export const events = [{ ...legacyEvents[0], id: "ai-ml-cybersecurity", title: program.title,
 launch: scheduleCopy.registration, submission: scheduleCopy.submission, schedule: eventSchedule, themes: ["AI/ML", "Cybersecurity"],
 problem: "Build and explain a working intelligent solution for security or an everyday human problem.",
 challenge: "Choose one of the six Portal challenges. Any programming language or framework; standalone implementations are acceptable after mandatory AeglysAI qualification.",
 deliverables: submissionRequirements,
}];
export const engineeringProblems = [
 { title: "Intelligent security", description: "Build executable behavior, explain its decisions and validate it using authorized synthetic or licensed inputs." },
 { title: "Reproducible engineering", description: "Document setup, tests, attribution and limitations so reviewers can run your project." },
];
