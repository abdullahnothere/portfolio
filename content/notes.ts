export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "code"; filename?: string; language?: string; text: string }
  | { type: "list"; items: string[] };

export type Note = {
  slug: string;
  title: string;
  date: string;
  iso: string;
  topic:
    | "Container security"
    | "Cloud security"
    | "Detection engineering"
    | "Secure development"
    | "Risk and governance"
    | "Lessons learned";
  summary: string;
  body: Block[];
};

export const notes: Note[] = [
  {
    slug: "one-scanner-is-not-enough",
    title: "One scanner is not a second opinion",
    date: "March 2026",
    iso: "2026-03-04",
    topic: "Container security",
    summary:
      "Two vulnerability scanners disagreed by 25 findings on the same image. The disagreement was the finding.",
    body: [
      {
        type: "p",
        text: "While hardening a containerised app I ran both Trivy and Grype, mostly out of thoroughness. On the frontend image they disagreed in a way that took a while to believe: Trivy reported thousands of OS-level findings and nothing at all about PHP, on an image whose entire purpose was running PHP.",
      },
      { type: "h", text: "Why they disagreed" },
      {
        type: "p",
        text: "The official PHP image compiles PHP from source rather than installing it through the system package manager. A scanner that works by reading the package database therefore cannot see PHP — not because it failed, but because from its perspective PHP is not installed. Grype fingerprints software directly from the binary, identified PHP 7.4.33, and reported 25 vulnerabilities against it, several critical.",
      },
      {
        type: "code",
        filename: "scan comparison",
        language: "bash",
        text: "trivy   frontend:baseline   6,206 unique   PHP findings: 0\ngrype   frontend:baseline     498 unique   PHP 7.4.33: 25\n\n# Same image. Same moment. The gap is methodological,\n# not a bug in either tool.",
      },
      { type: "h", text: "What I changed" },
      {
        type: "p",
        text: "I now treat a single-source finding as unconfirmed. Not wrong — unconfirmed. That is a different posture from distrusting tools, and it costs one extra scan to hold.",
      },
      {
        type: "quote",
        text: "A scanner reporting zero findings in a category is telling you about its own method as much as about your image.",
      },
    ],
  },
  {
    slug: "pinning-versions-is-not-security",
    title: "Pinning a version is reproducibility, not security",
    date: "February 2026",
    iso: "2026-02-18",
    topic: "Cloud security",
    summary:
      "I pinned a build to a specific release because pinning is good practice. It reintroduced forty vulnerabilities including a critical one.",
    body: [
      {
        type: "p",
        text: "Midway through hardening a backend image I pinned the Go version, on the general principle that unpinned dependencies are a supply chain problem. Then I rescanned, which is the only reason this story has an ending.",
      },
      { type: "h", text: "What actually happened" },
      {
        type: "p",
        text: "I had pinned to the first release of the current series. The unpinned build had been quietly pulling a much later patched release. The pin rolled the toolchain back past about a month of fixes and reintroduced roughly forty vulnerabilities, one of them critical.",
      },
      {
        type: "p",
        text: "Every part of that decision was defensible in isolation. Pin your versions: correct. Pin to the current major series: reasonable. The failure was treating a practice as a rule and not measuring the result.",
      },
      { type: "h", text: "The rule I actually use now" },
      {
        type: "list",
        items: [
          "Pin for reproducibility, always",
          "Pin to something near the current stable patch, never the series opener",
          "Rescan after the pin, because the pin is a change like any other",
        ],
      },
      {
        type: "p",
        text: "The broader habit is rescanning after every individual change rather than once at the end. Batch the changes and you learn that your posture improved. Rescan each one and you learn which change did what — including the one that made things worse.",
      },
    ],
  },
  {
    slug: "detecting-encryption-is-too-late",
    title: "If you detect the encryption, you are doing recovery",
    date: "January 2026",
    iso: "2026-01-27",
    topic: "Detection engineering",
    summary:
      "T1486 fires reliably and tells you almost nothing. The rules worth writing cover the stages before it.",
    body: [
      {
        type: "p",
        text: "Investigating a simulated ransomware incident in Splunk, the impact was never in doubt: 257 files encrypted on the file server, 406 on the endpoint. Mass file operations over SMB are a loud, unambiguous signal. They are also the least useful one available.",
      },
      { type: "h", text: "Working backwards" },
      {
        type: "p",
        text: "Rebuilding the chain meant going from encryption to the process, the process to a dropped temp file, the file to a malicious upload through a web application, and the upload to the brute force attempts that preceded it. Each step earlier in the chain was quieter than the last, and each one represented time that could have been bought.",
      },
      {
        type: "p",
        text: "The entry point took longer to find than everything after it, because the brute force attempts and the upload only looked like anything once the SMB and HTTP logs were correlated by time. Searched separately, neither was interesting enough to notice.",
      },
      { type: "h", text: "Ship the tuning notes with the rule" },
      {
        type: "p",
        text: "For each of the five rules I wrote, I documented thresholds, what to allow-list, and which log source to enrich with. This is unglamorous and it is the difference between a detection someone maintains and an alert someone eventually mutes. A rule handed over without its tuning guidance becomes another team's false positive problem.",
      },
      {
        type: "quote",
        text: "A detection you can only act on after the impact is a reporting mechanism, not a control.",
      },
    ],
  },
  {
    slug: "framework-selection-is-the-work",
    title: "Framework selection is most of the work",
    date: "December 2025",
    iso: "2025-12-15",
    topic: "Risk and governance",
    summary:
      "Four of the five frameworks I compared would have produced a thorough-looking report that could not support a single finding on a robot controller.",
    body: [
      {
        type: "p",
        text: "Auditing ten unpatched OT assets on a vehicle manufacturer's factory floor, the temptation is to reach for the framework you already know. I compared five before choosing, and the comparison turned out to be the substance of the work rather than the preamble to it.",
      },
      { type: "h", text: "Why the obvious choices failed" },
      {
        type: "list",
        items: [
          "ISO 27001 and 27005 are IT-centric — significant adaptation before they say anything about a paint robot",
          "NIST CSF describes outcomes, not processes, and produces no asset-level measurable findings",
          "ISO 21434 was directly relevant to two assets and entirely out of scope for the other eight",
          "IEC 62443 was the only candidate actually built for industrial control environments",
        ],
      },
      {
        type: "p",
        text: "IEC 62443 won on applicability, not familiarity. It partitions the estate into zones and conduits, assigns target security levels based on realistic threat actor capability, and produces findings you can certify against.",
      },
      { type: "h", text: "Recommendations need an owner" },
      {
        type: "p",
        text: "Every recommendation in the final report carries a named owner, a timeline, the security requirement it satisfies, and the residual risk once it is done. Timelines account for testing patches before deployment, because in an OT environment an untested patch can cause more disruption than the vulnerability it fixes. A recommendation without an owner is a wish.",
      },
    ],
  },
  {
    slug: "correct-crypto-is-not-secure-systems",
    title: "Correct cryptography is not a secure system",
    date: "November 2025",
    iso: "2025-11-20",
    topic: "Secure development",
    summary:
      "My AES-CBC implementation is correct and still leaves an integrity gap. Choosing the algorithm was the easy part.",
    body: [
      {
        type: "p",
        text: "Building a role-based clinical data system, I came in thinking of cryptography as a set of algorithms to select correctly. Choosing AES-256 took about a minute. Everything difficult came afterwards.",
      },
      { type: "h", text: "The real question is where the key lives" },
      {
        type: "p",
        text: "Deciding where the key lives, who can unwrap it, and what stays safe when the database is compromised is what forced the design into a key hierarchy: a master data key encrypted under a root key, RSA-OAEP wrapped per researcher so granting access is a key operation rather than re-encrypting every dataset.",
      },
      {
        type: "code",
        filename: "the decision that mattered",
        language: "text",
        text: "ROOT_KEY            env now, HSM in production\n  MDK               AES-256, encrypted at rest\n    per-researcher  RSA-2048 OAEP wrapped\n    datasets        AES-256-CBC\n\nPrivate keys: PBKDF2 then AES before they reach the DB.\nPassword in memory for the session only.",
      },
      { type: "h", text: "The gap I shipped knowingly" },
      {
        type: "p",
        text: "CBC carries no integrity tag. My implementation is cryptographically correct and a tampered ciphertext still decrypts to garbage without raising an error. That is not an implementation bug, it is a property of the mode, and I chose it before I understood the consequence properly. GCM or encrypt-then-MAC is the fix and it is where I would start next time.",
      },
      {
        type: "quote",
        text: "A decision at one layer has consequences several layers down, and the algorithm table is the shallowest layer there is.",
      },
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** ~220 wpm, counting prose and list items only. */
export function readingTime(note: Note): number {
  const words = note.body
    .map((b) => ("text" in b ? b.text : b.items.join(" ")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
