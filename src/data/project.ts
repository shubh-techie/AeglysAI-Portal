import { modelDStatus } from './modelDStatus.ts';
export type Status =
  | "Implemented"
  | "Research Implementation Complete"
  | "Planned Research"
  | "Experimental"
  | "In Preparation"
  | "Proposed / In Preparation";
export const project = {
  name: "AeglysAI",
  fullName: "Adaptive Intelligence for Secure & Resilient Distributed Systems",
  tagline: "Observe. Assess. Authorize. Respond.",
  theme:
    "AI-Driven Automation for Resilient & Secure Cloud/Distributed Systems",
  description:
    "An open-source research initiative exploring explainable, risk-aware and adaptive authorization for secure and resilient cloud-native distributed systems.",
  github: "https://github.com/shubh-techie/AeglysAI",
  question:
    "How does explainable, policy-bounded, closed-loop adaptive authorization perform relative to RBAC, ABAC and deterministic risk-aware authorization under behavioral and operational anomalies in cloud-native distributed systems?",
};
export const navigation = [
  { label: "Research", path: "research" },
  { label: "Architecture", path: "architecture" },
  { label: "Experiments", path: "experiments" },
  { label: "Publications", path: "publications" },
  { label: "Speaking", path: "speaking" },
  { label: "About", path: "about" },
  { label: "Hackathon", path: "hackathons" },
  { label: "Community", path: "community" },
];
export const models: {
  id: string;
  name: string;
  baseline: string;
  status: Status;
  description: string;
}[] = [
  {
    id: "A",
    name: "RBAC",
    baseline: "RBAC",
    status: "Implemented",
    description:
      "Role-based access control establishes the deterministic authorization baseline.",
  },
  {
    id: "B",
    name: "RBAC + ABAC",
    baseline: "RBAC + ABAC",
    status: "Implemented",
    description:
      "Attribute-based conditions extend role-based authorization with request context.",
  },
  {
    id: "C",
    name: "Contextual Risk",
    baseline: "RBAC + deterministic contextual risk",
    status: "Implemented",
    description:
      "Deterministic contextual risk adds explicit risk rules to role-based authorization.",
  },
  {
    id: "D",
    name: "Behavioral Adaptive Authorization",
    baseline: "RBAC + ABAC + behavioral adaptive risk",
    status: modelDStatus.label,
    description: modelDStatus.summary,
  },
];
export const papers = [
  "Adaptive Risk-Aware Authorization for Zero-Trust Distributed Cloud Systems",
  "AI-Driven Behavioral Anomaly Detection and Autonomous Incident Response in Cloud-Native Systems",
];
export const evolution = [
  {
    date: "2022",
    title: "Securing-Microservices",
    text: "The original engineering project.",
  },
  {
    date: "2026",
    title: "An evolution into AegisAI",
    text: "The repository evolved into AegisAI, expanding the focus toward adaptive authorization research.",
  },
  {
    date: "2026 onward",
    title: "AeglysAI research program",
    text: "A continuing investigation of secure and resilient distributed systems.",
  },
];
export function href(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\/+|\/+$/g, "")}${path ? "/" : ""}`;
}
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;
}
