export type Role = {
  org: string;
  title: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: "University of Warwick",
    title: "MSc Cyber Security Engineering · Teaching Assistant",
    period: "2025 — present",
    current: true,
    summary: "Full-time MSc alongside lab demonstrating for undergraduate networking.",
    points: [
      "Dissertation on defensive controls against Ransomware-as-a-Service",
      "Lab demonstrator: small-group support and marking for undergraduate networks",
    ],
  },
  {
    org: "GoSaaS Labs",
    title: "Software Engineer",
    period: "2023 — 2025",
    summary: "Platform team on a multi-tenant enterprise integration product.",
    points: [
      "Built and maintained Node/TypeScript REST services behind a multi-tenant SaaS product",
      "Redesigned role-based access control into a policy layer, removing scattered permission checks from 40+ endpoints",
      "Cut p95 latency on the reporting API from 2.4s to 380ms by fixing N+1 queries and adding cursor pagination",
      "Production support rota: triage, incident investigation, and writing the postmortem",
      "Worked directly with client engineers through onboarding and integration",
    ],
  },
  {
    org: "Community tech programme",
    title: "Volunteer instructor",
    period: "2022 — 2023",
    summary: "Free weekend sessions for adult learners.",
    points: ["Taught web fundamentals and practical account security to non-technical adults"],
  },
  {
    org: "University",
    title: "BSc Computer Science — First class",
    period: "2019 — 2023",
    summary: "Final year project on network intrusion detection.",
    points: ["Graduated with first class honours"],
  },
];
