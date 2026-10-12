/** Landing-only editorial presentation. Events/dates/prizes stay in hackathons.ts. */
export const challengePresentation: Record<string, { stage: string; focus: string[]; question: string }> = {
  "adaptive-authorization": { stage: "UNDERSTAND & EXTEND", focus: ["RBAC", "ABAC", "Zero Trust", "Contextual Risk", "Risk-Aware Authorization", "Explainability"], question: "How can authorization decisions adapt to changing risk while remaining explainable and policy-controlled?" },
  "behavioral-risk": { stage: "MEASURE & DETECT", focus: ["Behavioral Signals", "Anomaly Detection", "Risk Scoring", "Identity Context", "False-Positive Reduction", "Explainability"], question: "How can behavioral and contextual signals become useful, explainable security risk evidence?" },
  "autonomous-resilience": { stage: "ADAPT & RESPOND", focus: ["Incident Detection", "Observability", "Resilience", "Policy-Bounded Response", "Distributed-System Recovery"], question: "How can systems respond intelligently without surrendering deterministic control?" },
};
export const journey = [
  { title: "Register", detail: "Register individually through the official Google Form." },
  { title: "Fork AeglysAI", detail: "Fork the official repository into your own GitHub account." },
  { title: "Clone & Run", detail: "Clone your own fork; demonstrate the baseline builds/runs." },
  { title: "Complete Qualification", detail: "Document architecture, setup, an observation, an improvement and validation." },
  { title: "Submit", detail: "Send your GitHub username, fork, branch, qualification document and sanitized build-log URLs." },
  { title: "Selection", detail: "Organizer review against published criteria; qualification does not guarantee selection." },
  { title: "Build & Compete", detail: "Develop a scoped challenge with reproducible evidence." },
];
export const values = [
  { title: "Learn", icon: "book", description: "Explore authorization, behavioral risk and resilient systems through practical problems." },
  { title: "Build", icon: "code", description: "Turn an engineering question into a working prototype or reproducible evaluation." },
  { title: "Collaborate", icon: "nodes", description: "Discuss design tradeoffs and exchange constructive technical feedback." },
  { title: "Get Mentored", icon: "compass", description: "Planned clinics and office hours, subject to confirmed mentor availability." },
  { title: "Showcase Your Work", icon: "screen", description: "Proposed demos and technical writeups, subject to approval and consent." },
  { title: "Contribute to Open Source", icon: "branch", description: "Share useful code, tests and documentation through normal maintainer review." },
];
export const engagement = ["Kickoff", "Technical Workshop", "Architecture Clinic", "Mentor Office Hours", "Midpoint Checkpoint", "GitHub Discussions", "Demo Day", "Final Showcase"];
export const tracks = [
  { title: "FOUNDATION TRACK", audience: "Students · Early-career engineers · First-time contributors", description: "Build a focused prototype, explain its architecture and demonstrate predictable behavior with clear tests." },
  { title: "ADVANCED TRACK", audience: "Experienced engineers · Graduate researchers · Advanced students", description: "Evaluate deeper engineering tradeoffs, compare approaches and document uncertainty with reproducible experiments." },
];
export const qualification = [
  ["Fork the repository", "Work in your own fork. Participants do not receive write access to the official repository."],
  ["Clone locally", "Clone your fork into a local working directory; keep secrets and private data out of Git."],
  ["Build and run", "Use the current AeglysAI README for prerequisites and supported setup. Retain commands and observed evidence."],
  ["Understand the architecture", "Describe key components, policy boundaries and the request/decision flow in your own words."],
  ["Make one technical observation", "Describe something you observed, how you tested it and any limitations."],
  ["Suggest one improvement", "Explain a realistic scoped change, its value and how you would validate it. A contribution does not require an accepted upstream PR."],
];
export const faq = [
  ["Is participation free?", "Participation is FREE. Final eligibility and event terms will be published before applications open."],
  ["Who can participate?", "Students, engineers and researchers are welcome to explore the program. Age and geographic eligibility are TBD."],
  ["Can students participate?", "Students are part of the intended audience. The Foundation track is designed for students and first-time contributors; final eligibility is TBD."],
  ["Can I join individually or as a team?", "Individuals and teams of two to four may enter. Every member must individually qualify and be selected; designate one leader and obtain a unique team ID. No duplicate active membership; changes need organizer approval."],
  ["Do I need prior AeglysAI experience?", "AI for Everyday Life is beginner-to-intermediate; the Foundation track supports newcomers. Read the current repository setup guide; the A/B/C baseline is sufficient; Model D knowledge is not required. Qualification is mandatory and does not guarantee selection."],
  ["What technologies can I use?", "Choose from six Portal challenges, including AI for Everyday Life. Any programming language or framework. Standalone final implementations are acceptable after mandatory AeglysAI qualification. Work in an authorized, isolated environment."],
  ["Is the project open source?", "AeglysAI is an open-source initiative. Final projects require a public GitHub source URL, attribution and licensing."],
  ["How are winners selected?", "Round 1 technical screening selects finalists; Round 2 live demonstrations and Q&A determine final ranking. Scores are not combined."],
  ["What is the prize?", "An existing planned {prize} prize, with funding unconfirmed. Prize eligibility and payment are subject to official event rules."],
  ["Can international participants participate?", "TBD. Geographic eligibility and prize conditions must be finalized before registration opens."],
  ["How do I become a judge or speaker?", "Use the relevant application form once it opens. An application is not a confirmed appointment; public profiles need confirmation and permission."],
];
