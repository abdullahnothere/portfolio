export type CodeLine = { text: string; kind?: "add" | "remove" | "plain" };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  module?: string;
  kind: "Security" | "Software" | "Research" | "Forensics";
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
  snippet?: { filename: string; language: string; lines: CodeLine[] };
};

export const projects: Project[] = [
  {
    slug: "ransomware-detection-cyber-range",
    title: "Early ransomware detection cyber range",
    summary:
      "An isolated range across Kali, Windows 11 and Wazuh, built to measure how early ransomware is actually detectable, and where the coverage is thinner than it looks.",
    year: "2026",
    module: "MSc dissertation, in progress",
    kind: "Research",
    tags: ["Wazuh", "Sysmon", "MITRE ATT&CK"],
    featured: true,
    problem:
      "Detection coverage is usually described in terms of which techniques a tool claims to cover. That says nothing about when in an attack you would actually find out, which is the number that decides whether you are responding or recovering.",
    context:
      "MSc dissertation at the University of Warwick, in progress. An isolated cyber range: a Kali Linux attack host, a Windows 11 endpoint, and an Ubuntu server running Wazuh.",
    solution:
      "Collect telemetry from Microsoft Defender, Sysmon, Windows Event Logs and network monitoring so the same attack is observed from endpoint, identity and network at once. Then measure detection latency and alert coverage across simulated scenarios and map what fires to MITRE ATT&CK.",
    decisions: [
      "Three telemetry sources on the same attack rather than one, because the interesting result is which source sees a technique first, not whether any source sees it at all.",
      "Latency as the primary measure, not coverage. A technique that is detectable only at the encryption stage is not really covered.",
      "Fully isolated range, so scenarios can be replayed identically instead of compared across runs that were not the same.",
    ],
    challenges:
      "Making runs genuinely comparable is harder than building the range. Small differences in timing and host state change what fires, so the environment has to be reset properly between scenarios rather than approximately.",
    lessons:
      "In progress. The output I care about is a coverage map that distinguishes techniques detected early from techniques detected once it is already too late to matter.",
    metrics: [
      { label: "telemetry sources", value: "4" },
      { label: "primary measure", value: "detection latency" },
      { label: "status", value: "in progress" },
    ],
  },
  {
    slug: "detection-engineering-splunk",
    title: "Detection engineering and incident investigation",
    summary:
      "Reconstructing a ransomware incident in Splunk from initial access to impact, then writing the five detection rules that would have caught it earlier.",
    year: "2026",
    module: "Proactive Cyber Defence, MSc",
    kind: "Security",
    tags: ["Splunk", "SPL", "MITRE ATT&CK"],
    featured: true,
    problem:
      "A ransomware incident had already run to completion. The question was not what happened at the end (the encryption was obvious) but where it started, and what signal existed before impact that nobody was watching.",
    context:
      "Simulated incident investigated in Splunk, correlating Sysmon process events, Windows Event Logs, SMB traffic and HTTP data across an endpoint and a file server.",
    solution:
      "Rebuild the chain backwards from impact: trace the encryption to the process, the process to a temp file dropped on the host, the file to a malicious upload through a web application, and the upload to the brute force attempts that preceded it. Then write detection rules for each stage and map them to ATT&CK and D3FEND.",
    decisions: [
      "Quantified impact instead of describing it: 257 files encrypted on the file server, 406 on the endpoint, because a number is auditable and an adjective is not.",
      "Wrote tuning guidance for every rule alongside the rule itself: thresholds, allow lists, and which log source to enrich with. A rule shipped without its tuning notes becomes someone else's false positive problem.",
      "Mapped to D3FEND as well as ATT&CK, so each detection is paired with the defensive control it supports rather than just the technique it names.",
    ],
    challenges:
      "Finding the entry point took longer than everything after it. The brute force attempts only became visible once the SMB and HTTP logs were correlated by time rather than searched separately; in isolation neither looked like much.",
    lessons:
      "The rules that mattered were the ones covering the stages before encryption. T1486 fires reliably and tells you almost nothing useful, because by the time it fires the decision you needed to make has already been made for you.",
    metrics: [
      { label: "detection rules written", value: "5" },
      { label: "files encrypted (server / host)", value: "257 / 406" },
      { label: "mapped to", value: "ATT&CK + D3FEND" },
    ],
    snippet: {
      filename: "detection coverage by stage",
      language: "splunk",
      lines: [
        { text: "# Impact stage: fires reliably, tells you almost nothing." },
        { text: "T1486  Ransomware and mass file operations   (SMB burst)", kind: "remove" },
        { text: "" },
        { text: "# Pre-impact: the rules that would have bought time." },
        { text: "T1110  Brute force                          (auth failures)", kind: "add" },
        { text: "T1190  Suspicious file upload               (web app)", kind: "add" },
        { text: "T1059  Native script interpreter abuse      (Sysmon EID 1)", kind: "add" },
        { text: "T1041  Abnormal outbound web traffic        (egress volume)", kind: "add" },
        { text: "" },
        { text: "# Each rule shipped with thresholds, allow lists and" },
        { text: "# enrichment notes. Untuned rules become someone else's problem." },
      ],
    },
  },
  {
    slug: "penetration-test-newbizz",
    title: "Infrastructure and web application penetration test",
    summary:
      "Three hosts, fifteen findings, and one chain from an unauthenticated HTTP request to root on the host VM. A 42-page report under PTES and the OWASP Testing Guide.",
    year: "2026",
    module: "Ethical Hacking, MSc",
    kind: "Security",
    tags: ["PTES", "OWASP", "Metasploit"],
    featured: true,
    problem:
      "The client wanted to know whether their internal environment would hold up against a real adversary, rather than against a vulnerability scanner's summary page.",
    context:
      "Authorised engagement against three hosts in an internal corporate environment, conducted under PTES and the OWASP Testing Guide, with full exploitation permitted inside the test boundary so business impact could be demonstrated rather than assumed.",
    solution:
      "Fifteen vulnerabilities rated against CVSS (3 critical, 7 high, 5 medium), each with a prioritised remediation and an ATT&CK mapping. The headline finding was a full chain: server-side template injection giving unauthenticated RCE as root inside a Docker container, a container escape through a writable host-shared directory executed by host automation, then a three-stage sudo and weak-key escalation to root on the host itself.",
    decisions: [
      "Chained the findings rather than listing them. Individually the sudo rules and the writable directory look like hygiene issues; together they are the difference between a contained container compromise and a lost host.",
      "Demonstrated impact by exploitation where permitted, because 'this could theoretically allow' does not survive a conversation with someone deciding a remediation budget.",
      "Recommendations ordered by what breaks the chain first, not by CVSS. Removing the writable shared directory is a smaller job than patching everything and cuts the path at its narrowest point.",
    ],
    challenges:
      "Confirming the template engine before committing to a payload. A reflected input could have been anything; sending a multiplication probe and getting an evaluated result, then a string-repetition probe and getting concatenation, is what identified it as Jinja2 rather than guessing and burning attempts on the wrong syntax.",
    lessons:
      "The exposed Werkzeug debug interface made the critical finding far easier to reach than it should have been. The most useful thing in the report may be the observation that a development convenience left switched on turned a hard exploit into an easy one.",
    metrics: [
      { label: "hosts assessed", value: "3" },
      { label: "findings (crit / high / med)", value: "3 / 7 / 5" },
      { label: "report length", value: "42 pages" },
    ],
    snippet: {
      filename: "TD-01: identifying the template engine",
      language: "http",
      lines: [
        { text: "# Leaked source: user input concatenated into a template" },
        { text: "# string, then compiled. Input treated as code, not data." },
        { text: "" },
        { text: "# Fingerprint the engine before committing to a payload." },
        { text: "POST /submit   name={{ 2*2 }}     ->  4     server-side eval", kind: "add" },
        { text: "POST /submit   name={{ 2*'2' }}   ->  22    Jinja2, not ERB", kind: "add" },
        { text: "" },
        { text: "# Object traversal to os module -> id -> uid=0(root)" },
        { text: "# root in container -> escape -> 3-stage escalation -> host root" },
      ],
    },
  },
  {
    slug: "container-security-hardening",
    title: "Container security and vulnerability management",
    summary:
      "Cutting unique known vulnerabilities by roughly 85 to 90% across a two-tier app, and finding a scanner disagreement that hid 25 critical findings from one of the tools.",
    year: "2026",
    module: "Cloud Security, MSc",
    kind: "Security",
    tags: ["Docker", "Trivy", "Grype"],
    featured: true,
    problem:
      "A PHP/Apache frontend and a Go API sharing a container with their own PostgreSQL database, all running as root, with credentials baked into the images and the database port exposed to the host. The client wanted it assessed before it went to production.",
    context:
      "Assessment and hardening of a containerised two-tier application, carried out on a Docker host from a Kali workstation. Findings cross-checked against NIST SP 800-190, the CIS Docker Benchmark and OWASP container guidance.",
    solution:
      "Ten test cases defined up front (three functional, seven security) so every change could be verified rather than assumed. The backend was rebuilt from a PostgreSQL base onto minimal Alpine, since the Go app was a fully static binary and never needed the OS or database engine it was inheriting. The frontend moved off end-of-life PHP 7.4 to 8.4. The database was split into its own container, creating a trust boundary that had not previously existed.",
    decisions: [
      "Split the database out first. Every runtime control afterwards depends on that boundary being real, and it could not be secured until it existed.",
      "Ran two scanners rather than one. Trivy reads the package database; Grype fingerprints binaries. The official PHP image compiles PHP from source, so Trivy could not see PHP at all and reported thousands of OS findings with nothing PHP-related.",
      "Rescanned after every individual change instead of at the end, which is the only reason one of the changes was caught as a regression.",
    ],
    challenges:
      "Pinning the Go version to the first release of the current series, on the assumption that any specific pin is good practice, reintroduced around forty vulnerabilities including a critical one. The original build had been pulling a much later patched release, and the explicit pin rolled it back past a month of fixes.",
    lessons:
      "Version pinning serves reproducibility, and only helps security when it points at something near current. Relying on a single scanner would have shipped 25 vulnerabilities in PHP 7.4.33 that the package-database scanner structurally could not see. I now treat any single-source finding as unconfirmed.",
    metrics: [
      { label: "backend unique CVEs", value: "117 → 15" },
      { label: "frontend unique CVEs", value: "6,206 → 600" },
      { label: "runs as root", value: "no" },
    ],
    snippet: {
      filename: "Dockerfile, backend",
      language: "dockerfile",
      lines: [
        { text: "# A static Go binary, shipped on a full database image." },
        { text: "FROM postgres:15", kind: "remove" },
        { text: "COPY --from=build /app/api /usr/local/bin/api", kind: "remove" },
        { text: "" },
        { text: "FROM golang:1.24-alpine AS build", kind: "add" },
        { text: "RUN CGO_ENABLED=0 go build -ldflags='-s -w' -o /api", kind: "add" },
        { text: "" },
        { text: "FROM alpine:3.22", kind: "add" },
        { text: "COPY --from=build /api /usr/local/bin/api", kind: "add" },
        { text: "USER appuser", kind: "add" },
        { text: "HEALTHCHECK CMD [\"/usr/local/bin/api\", \"-healthcheck\"]", kind: "add" },
      ],
    },
  },
  {
    slug: "ot-risk-assessment-iec-62443",
    title: "OT risk assessment and threat modelling",
    summary:
      "An independent audit of a UK vehicle manufacturer's factory floor: ten unpatched OT assets, five frameworks compared, and a remediation plan with owners and residual risk.",
    year: "2026",
    module: "Compliance, Risk and Governance, MSc",
    kind: "Research",
    tags: ["IEC 62443", "Risk register", "OT/IACS"],
    problem:
      "A vehicle manufacturer running twelve years without a formal risk assessment, with ten operational technology devices on the factory floor and in vehicles, none of them patched against known vulnerabilities.",
    context:
      "Independent risk audit covering robot controllers, industrial cameras, CAD workstations, a telematics gateway, an infotainment unit and EV chargers, a mix of plant OT and connected-vehicle assets.",
    solution:
      "Compared five risk frameworks against four selection criteria before choosing IEC 62443, then applied 62443-3-2: partition the estate into five security zones with defined conduits, assign each a target security level based on realistic threat actor capability, and write an asset-specific threat scenario for every device. ISO 21434's TARA methodology was used as a supplementary reference for the two in-vehicle assets.",
    decisions: [
      "Chose IEC 62443 not because it is the best-known framework but because it is the only one of the five actually built for factory-floor IACS environments and capable of producing asset-level, certifiable findings.",
      "Rejected ISO 21434 as the primary framework despite it being directly relevant to two assets: eight of the ten fall entirely outside its scope.",
      "Every recommendation carries a named owner, a timeline, the IEC 62443 security requirement it satisfies, and the residual risk after remediation. A recommendation without an owner is a wish.",
      "Timelines account for testing patches before deployment. An untested patch in an OT environment risks more disruption than the vulnerability it fixes.",
    ],
    challenges:
      "Several assets had no vendor patch available at all, including a telematics gateway with an unauthenticated MQTT server rated CVSS 10.0 that could issue CAN bus commands fleet-wide. Those needed compensating controls designed around the vulnerability rather than a fix for it.",
    lessons:
      "Framework selection is most of the work and gets the least attention. Four of the five candidates would have produced a report that looked thorough and could not have supported a single asset-level finding on a robot controller.",
    metrics: [
      { label: "assets assessed", value: "10" },
      { label: "security zones defined", value: "5" },
      { label: "frameworks compared", value: "5" },
    ],
  },
  {
    slug: "digital-forensic-examination",
    title: "Digital forensic examination",
    summary:
      "A Windows disk image worked from 853 recovered emails down to 29 relevant ones, then corroborated across registry, browser, shellbag and jumplist artefacts.",
    year: "2026",
    module: "Digital Forensics, MSc",
    kind: "Forensics",
    tags: ["Autopsy", "Registry Explorer", "FTK Imager"],
    problem:
      "A seized machine, a set of questions from the instructing authority, and a suspect's account that needed to be tested against the artefacts rather than assumed true or false.",
    context:
      "Examination of a forensic disk image supplied with hash values, conducted for a simulated police instruction. Windows 8.1 Pro host, four volumes, two NTFS.",
    solution:
      "Verify the supplied hashes, keep the image read-only and network-isolated throughout, then work each artefact class in turn (registry for system context and user accounts, email, browser history, recent documents, shellbags, jumplists and media) and correlate findings across classes rather than relying on any single source.",
    decisions: [
      "Verified hashes before anything else and never touched the original evidence, because an examination that cannot demonstrate integrity is not worth conducting.",
      "Used keyword search to find the low-hanging fruit, then examined artefacts individually anyway. Keyword search only tells you what you thought to ask for.",
      "Reported the suspected malware, a file named to resemble a Microsoft service pack and sitting in a VirtualBox shared folder, as a potential risk rather than an additional offence, because no evidence of execution was found.",
    ],
    challenges:
      "853 emails is too many to read and too few to sample. Sorting on recipient and then on recency surfaced the relevant threads quickly, but each still needed individual examination for attachments, the account used, and deleted messages inside threads.",
    lessons:
      "The strength of the conclusion came from consistency across independent artefact classes, not from any single finding. Email attachments also existing on disk, with creation dates matching the browser activity, is what made the timeline hold together.",
    metrics: [
      { label: "emails triaged", value: "853 → 29" },
      { label: "artefact classes correlated", value: "6" },
      { label: "evidential integrity", value: "hash-verified, read-only" },
    ],
  },
  {
    slug: "network-infrastructure-security",
    title: "Network infrastructure design and hardening",
    summary:
      "Designing, subnetting and securing a 160-employee network end to end: VLSM, OSPF, a DMZ, zone-based firewall policy, ACLs and TACACS+ with local fallback.",
    year: "2025",
    module: "Network Security, MSc",
    kind: "Security",
    tags: ["OSPF", "Zone-based firewall", "TACACS+"],
    problem:
      "Five departments with genuinely different access requirements (Finance reachable only by Project Management and IT, HR reachable only by IT), plus public-facing web and mail that could not be allowed to sit on the internal network.",
    context:
      "Full design and implementation for a 160-employee architectural firm in Cisco Packet Tracer: topology, addressing, routing, services, and then the security controls layered on top.",
    solution:
      "Star topology with one subnet per department, VLSM across a single /24 so address space matched actual host counts with two spare segments for growth, OSPF between internal and edge routers, NAT/PAT at the edge, and a DMZ for web and mail hanging off the edge router rather than the internal one. Security applied in three layers: device hardening, zone-based policy firewall between inside/DMZ/outside, then ACLs for inter-department restriction.",
    decisions: [
      "Built and tested connectivity fully open first, then applied restrictions. Any access failure afterwards was attributable to a policy rule rather than a routing mistake, which made troubleshooting tractable.",
      "Used the last usable address in each subnet as the gateway, consistently, so the convention is guessable from any subnet.",
      "Left the DMZ switch on local AAA rather than the TACACS+ server. If the DMZ is compromised it should not hold credentials that reach the internal authentication infrastructure.",
      "AAA with local fallback everywhere else, so a server outage does not lock administrators out of the estate.",
    ],
    challenges:
      "Ordering the security layers. Applying ACLs before the zone-based firewall made failures ambiguous, since a blocked packet could have come from either. Building outward from the edge one layer at a time was slower and far easier to verify.",
    lessons:
      "The DMZ decision to isolate authentication is the one I would defend hardest. It costs a small amount of administrative convenience and removes an entire class of pivot from a compromised public-facing host.",
    metrics: [
      { label: "employees supported", value: "160" },
      { label: "subnets (VLSM)", value: "8 + 2 spare" },
      { label: "security layers", value: "3" },
    ],
  },
  {
    slug: "healthcare-cryptography-system",
    title: "Applied cryptography for healthcare data",
    summary:
      "A role-based clinical data system where the interesting problem was never the algorithms. It was where the keys live and what happens when the database is compromised.",
    year: "2026",
    module: "Applied Cryptography, MSc",
    kind: "Software",
    tags: ["Python", "AES", "RSA"],
    featured: true,
    repo: "https://github.com",
    problem:
      "Clinicians upload sensitive datasets, researchers need to read them, auditors need to verify what happened, and the system has to stay defensible under GDPR Article 9 if the database itself is stolen.",
    context:
      "Twelve-module Python system built for the Applied Cryptography module, with three roles (clinician, researcher, auditor), a master data key hierarchy, and an HMAC-signed audit log.",
    solution:
      "A master data key encrypted under a root key, RSA-OAEP wrapped per researcher so access can be granted without re-encrypting datasets. AES-256-CBC for data, RSA-PSS for signing findings, bcrypt for passwords, and PBKDF2 + AES for private keys at rest so a private key is useless without the user's password. Every audit entry is HMAC-SHA256 signed with constant-time comparison, so tampering is detectable.",
    decisions: [
      "Key wrapping over shared secrets, so granting a researcher access is a key operation rather than a re-encryption job across every dataset.",
      "Private keys encrypted with a PBKDF2-derived key before they touch the database. The password exists only in memory during a session.",
      "Login returns a generic error for any failure, so an attacker cannot enumerate registered usernames from the error text.",
      "Designed around human cognitive load deliberately: a control that people route around has moved the vulnerability from the system to the user, not removed it.",
    ],
    challenges:
      "Key distribution was the hardest part by a distance. Choosing AES was trivial; deciding where the key lives, who can unwrap it, and what remains safe if the database is compromised is what actually forced the design into a key hierarchy.",
    lessons:
      "Cryptographic correctness and system security are not the same thing. My CBC implementation is correct and still leaves an integrity gap: a tampered ciphertext decrypts to garbage without raising an error. GCM or an encrypt-then-MAC construction is the fix, and I would start there next time.",
    metrics: [
      { label: "modules", value: "12" },
      { label: "roles", value: "3" },
      { label: "audit log", value: "HMAC-signed" },
    ],
    snippet: {
      filename: "key hierarchy: the actual problem",
      language: "python",
      lines: [
        { text: "# Not the algorithm choice. The key hierarchy." },
        { text: "" },
        { text: "ROOT_KEY          env now, HSM in production", kind: "add" },
        { text: "  MDK             AES-256, encrypted at rest under ROOT_KEY", kind: "add" },
        { text: "    per-researcher  wrapped with RSA-2048 OAEP", kind: "add" },
        { text: "    datasets        AES-256-CBC", kind: "add" },
        { text: "" },
        { text: "# Private keys: PBKDF2 then AES before they touch the DB." },
        { text: "# The password lives in memory for the session only." },
        { text: "" },
        { text: "# Known gap: CBC carries no integrity tag. Tampered", kind: "remove" },
        { text: "# ciphertext decrypts to garbage silently. GCM next time.", kind: "remove" },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
