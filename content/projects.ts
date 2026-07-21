export type CodeLine = { text: string; kind?: "add" | "remove" | "plain" };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  kind: "Security" | "Software" | "Research" | "AI";
  tags: string[];
  featured?: boolean;
  repo?: string;
  demo?: string;
  problem: string;
  context: string;
  solution: string;
  decisions: string[];
  challenges: string;
  lessons: string;
  metrics?: { label: string; value: string }[];
  /** Optional artifact panel: the most characteristic few lines of the work. */
  snippet?: { filename: string; language: string; lines: CodeLine[] };
};

export const projects: Project[] = [
  {
    slug: "container-hardening",
    title: "Container hardening",
    summary:
      "Taking a 1.1 GB production image with 43 critical CVEs down to a distroless 118 MB build that runs as non-root.",
    year: "2025",
    kind: "Security",
    tags: ["Docker", "Trivy", "CI/CD"],
    featured: true,
    repo: "https://github.com/abdullah/distroless-node-starter",
    problem:
      "Our deployment image was built from a full node:20 base, ran as root, and shipped a package manager, a shell, and 43 critical CVEs into production. Nobody had rebuilt the Dockerfile since the first release.",
    context:
      "A multi-tenant SaaS backend deployed to ECS and rebuilt on every merge. Any change had to keep the build under four minutes and not break the existing healthcheck contract.",
    solution:
      "A two-stage build: dependencies installed in an Alpine builder, then copied into a distroless runtime with no shell and a non-root user. Trivy runs in CI and fails the build on new critical findings.",
    decisions: [
      "Distroless over Alpine for the runtime — losing the shell removes the most useful thing an attacker finds after RCE, and we didn't exec into containers anyway.",
      "Pinned base images by digest rather than tag, so a rebuild can't silently pull a different layer.",
      "Failed CI on new criticals only, not the existing backlog, so the gate could ship the same week instead of blocking on a cleanup project.",
    ],
    challenges:
      "Losing the shell broke the existing healthcheck, which was a curl one-liner. I replaced it with a small Node script. Debugging the first failed deploy without exec access was genuinely uncomfortable and pushed me to improve structured logging first.",
    lessons:
      "The security win was real but the operational cost was front-loaded, and I had underestimated it. Next time I would add the logging and a debug sidecar before removing the shell, not after.",
    metrics: [
      { label: "image size", value: "1.1 GB → 118 MB" },
      { label: "critical CVEs", value: "43 → 0" },
      { label: "runs as root", value: "no" },
    ],
    snippet: {
      filename: "Dockerfile",
      language: "dockerfile",
      lines: [
        { text: "FROM node:20", kind: "remove" },
        { text: "FROM node:20-alpine AS build", kind: "add" },
        { text: "COPY . .", kind: "remove" },
        { text: "COPY --chown=node:node package*.json ./", kind: "add" },
        { text: "RUN npm ci --omit=dev && npm cache clean --force", kind: "add" },
        { text: "" },
        { text: "FROM gcr.io/distroless/nodejs20-debian12", kind: "add" },
        { text: "COPY --from=build /app /app", kind: "add" },
        { text: "USER root", kind: "remove" },
        { text: "USER nonroot", kind: "add" },
        { text: 'HEALTHCHECK CMD ["/nodejs/bin/node","health.js"]', kind: "add" },
      ],
    },
  },
  {
    slug: "splunk-detection-engineering",
    title: "Splunk detection engineering",
    summary:
      "Sigma rules for RaaS affiliate behaviour, compiled to SPL, with a repeatable test harness instead of hope.",
    year: "2026",
    kind: "Security",
    tags: ["Splunk", "Sigma", "MITRE ATT&CK"],
    featured: true,
    repo: "https://github.com/abdullah/splunk-raas-rules",
    problem:
      "Detection rules were written once, tuned by hand, and never tested again. Nobody could say whether a rule still fired after a log source changed its format.",
    context: "MSc research work, built against a lab Splunk instance replaying public incident telemetry.",
    solution:
      "Rules authored in Sigma, compiled to SPL, with each rule paired to a replayable sample event. A CI job replays every sample and asserts the rule fires, so a schema change breaks the build rather than the detection.",
    decisions: [
      "Sigma as the source of truth, so rules are not locked to one SIEM.",
      "One positive and one negative sample per rule. A rule that cannot be made to fire on demand is not a detection, it is a wish.",
      "Ranked rules by ATT&CK technique frequency rather than by severity, because severity is a guess and frequency is measured.",
    ],
    challenges:
      "Replaying telemetry faithfully is harder than writing the rules. Timestamps, field extraction, and index-time transforms all changed the results, and I lost a week to a rule that only passed because the sample was indexed differently.",
    lessons: "Detection engineering is mostly test engineering. The rule is the easy part.",
    metrics: [
      { label: "rules", value: "34" },
      { label: "techniques covered", value: "21" },
      { label: "tested in CI", value: "100%" },
    ],
    snippet: {
      filename: "shadow_copy_deletion.yml",
      language: "yaml",
      lines: [
        { text: "title: Shadow copy deletion via vssadmin" },
        { text: "id: T1490" },
        { text: "logsource: { product: windows, category: process_creation }" },
        { text: "detection:", kind: "add" },
        { text: "  selection:", kind: "add" },
        { text: "    Image|endswith: '\\vssadmin.exe'", kind: "add" },
        { text: "    CommandLine|contains|all: ['delete', 'shadows']", kind: "add" },
        { text: "  condition: selection", kind: "add" },
        { text: "falsepositives: [ 'Backup software during scheduled maintenance' ]" },
        { text: "level: high" },
      ],
    },
  },
  {
    slug: "network-security-architecture",
    title: "Network security architecture",
    summary:
      "A segmented lab network with explicit trust boundaries — designed, built, then attacked to find where the design was wrong.",
    year: "2025",
    kind: "Security",
    tags: ["OSPF", "Firewalls", "ACLs"],
    problem:
      "I could describe segmentation but had never had to defend a specific design decision against someone trying to break it.",
    context:
      "A physical and virtual lab: routing, VLANs, a firewall, and a deliberately vulnerable host on the wrong side of a boundary.",
    solution:
      "Three zones with default-deny between them, OSPF for internal routing, and explicit ACLs documented as a table of who may talk to whom, and why.",
    decisions: [
      "Default-deny with documented exceptions, so the ACL table reads as a statement of intent rather than accumulated history.",
      "Management plane on a separate VLAN, reachable only from a jump host.",
    ],
    challenges:
      "My first design allowed a path I had not noticed through a shared monitoring subnet. Finding it required actually attempting lateral movement rather than re-reading my own diagram.",
    lessons: "A diagram is a claim, not evidence. Test the boundary from the outside.",
    metrics: [
      { label: "zones", value: "3" },
      { label: "default posture", value: "deny" },
      { label: "paths found by testing", value: "1" },
    ],
  },
  {
    slug: "raas-defensive-controls",
    title: "MSc dissertation — RaaS defensive controls",
    summary:
      "Which defensive controls actually cover the techniques affiliates reuse, ranked by evidence rather than vendor claim.",
    year: "2026",
    kind: "Research",
    tags: ["Research", "MITRE ATT&CK", "Sigma"],
    featured: true,
    problem:
      "Small teams are told to implement dozens of controls with no ordering. The prioritisation available to them is usually vendor-shaped.",
    context:
      "MSc dissertation at the University of Warwick, supervised, using public incident reports across four affiliate programmes.",
    solution:
      "Decompose reports into ATT&CK techniques, measure how often each appears across unrelated intrusions, and rank candidate controls by coverage bought per unit of implementation effort.",
    decisions: [
      "Only public, attributable reports — reproducibility mattered more than sample size.",
      "Weight techniques appearing before the encryption stage, because post-encryption detection is recovery, not defence.",
    ],
    challenges:
      "Public reports are inconsistent in depth, so technique frequency partly measures reporting habits rather than attacker behaviour. I address the bias explicitly rather than pretending it away.",
    lessons: "In progress. The ranked control set and accompanying rules ship with the dissertation.",
    metrics: [
      { label: "programmes studied", value: "4" },
      { label: "incidents coded", value: "60+" },
      { label: "status", value: "in progress" },
    ],
  },
  {
    slug: "llm-alert-triage",
    title: "LLM alert triage assistant",
    summary:
      "A retrieval-backed assistant that drafts the first pass of an alert writeup, with the retrieved evidence always shown.",
    year: "2026",
    kind: "AI",
    tags: ["Python", "RAG", "Evals"],
    problem:
      "Most of an alert triage writeup is mechanical: what fired, what the host is, what happened just before. That is a first draft, not a judgement.",
    context: "Side project, run against my own lab telemetry.",
    solution:
      "Retrieval over runbooks and recent events, a constrained prompt, and an output format that cites every retrieved line. It drafts; a human decides.",
    decisions: [
      "It never states a verdict. It summarises evidence and lists what is missing.",
      "An eval set of 60 historical alerts, so a prompt change is measured rather than felt.",
    ],
    challenges:
      "Early versions were confidently wrong about severity, which is exactly the failure mode you cannot ship into a security workflow.",
    lessons: "Constraining the output shape did more for reliability than any prompt wording I tried.",
    metrics: [
      { label: "eval set", value: "60 alerts" },
      { label: "states a verdict", value: "never" },
    ],
  },
  {
    slug: "rbac-policy-layer",
    title: "RBAC policy layer",
    summary:
      "Pulling permission checks out of 40+ endpoints into one policy layer you can actually read and test.",
    year: "2024",
    kind: "Software",
    tags: ["TypeScript", "PostgreSQL", "RBAC"],
    featured: true,
    repo: "https://github.com/abdullah/policy-rbac",
    problem:
      "Permission logic had grown inline across the codebase. Answering 'can this role see this record?' meant reading four files, and two of them disagreed.",
    context: "Production multi-tenant SaaS at GoSaaS Labs, migrated incrementally with no downtime.",
    solution:
      "A single policy evaluation layer with declarative rules applied as middleware, plus a test suite enumerating every role–resource pair.",
    decisions: [
      "Declarative rules over imperative checks, so the policy set is reviewable as a document.",
      "Migrated endpoint by endpoint behind a flag, with the old check running in shadow mode and logging disagreements for two weeks.",
    ],
    challenges:
      "Shadow mode surfaced three endpoints where the old behaviour was wrong but relied upon by a client integration. That turned an engineering change into a conversation with the client.",
    lessons:
      "The shadow-mode fortnight was the only reason this was safe. I would not do a permissions migration without it again.",
    metrics: [
      { label: "endpoints migrated", value: "40+" },
      { label: "downtime", value: "none" },
      { label: "disagreements caught", value: "3" },
    ],
    snippet: {
      filename: "policies/report.ts",
      language: "typescript",
      lines: [
        { text: "// Before: the same question, answered in four places.", kind: "remove" },
        { text: "if (user.role === 'admin' || user.id === report.ownerId) { ... }", kind: "remove" },
        { text: "" },
        { text: "export const reportPolicy = definePolicy({", kind: "add" },
        { text: "  read:   allow('admin', 'auditor').or(isOwner),", kind: "add" },
        { text: "  update: allow('admin').or(isOwner.and(withinTenant)),", kind: "add" },
        { text: "  delete: allow('admin'),", kind: "add" },
        { text: "});", kind: "add" },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
