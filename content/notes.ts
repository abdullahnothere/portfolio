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
  topic: "Container security" | "Cloud security" | "Detection engineering" | "Secure development" | "AI" | "Lessons learned";
  summary: string;
  body: Block[];
};

export const notes: Note[] = [
  {
    slug: "what-you-give-up-going-distroless",
    title: "What you give up when you go distroless",
    date: "April 2026",
    iso: "2026-04-12",
    topic: "Container security",
    summary: "Removing the shell is a real hardening win. It also makes your next incident harder, and almost nobody mentions the second part.",
    body: [
      { type: "p", text: "Removing the shell from a production image is one of the highest-leverage hardening changes available to a small team. It is also the change most likely to make your next incident harder to investigate, and almost nobody mentions the second part." },
      { type: "h", text: "The trade, stated plainly" },
      { type: "p", text: "A distroless runtime removes the package manager, the shell, and most of the userland. An attacker who achieves remote code execution now has to bring their own tooling. So do you." },
      { type: "code", filename: "terminal", language: "bash", text: "$ docker exec -it app sh\nOCI runtime exec failed: exec failed:\n  unable to start container process:\n  exec: \"sh\": executable file not found in $PATH" },
      { type: "h", text: "Build the replacement first" },
      { type: "p", text: "Before you remove the shell, add the structured logs that answer the questions you would otherwise answer by poking around: what configuration is loaded, what the process can reach, and what it tried last. Doing this afterwards means learning it during an outage." },
      { type: "list", items: ["Log resolved config at boot, with secrets redacted", "Log every outbound dependency and its resolved address", "Emit a startup self-check that fails loudly rather than degrading quietly"] },
      { type: "h", text: "When not to bother" },
      { type: "p", text: "If your team routinely execs into containers as part of normal operations, removing the shell without changing that workflow just moves the risk into whatever people do instead — which is usually a wider-open debug image nobody scans." },
      { type: "quote", text: "The control is only as good as the workflow it leaves behind." },
    ],
  },
  {
    slug: "the-n-plus-one-that-cost-two-seconds",
    title: "The N+1 query that cost two seconds",
    date: "February 2026",
    iso: "2026-02-03",
    topic: "Secure development",
    summary: "The fix was not clever. The way we found it, and the test that keeps it fixed, are worth repeating.",
    body: [
      { type: "p", text: "A reporting endpoint took 2.4 seconds at p95. The fix was not clever. The way we found it, and the test we added afterwards, are the parts worth repeating." },
      { type: "h", text: "Read the trace, not the code" },
      { type: "p", text: "The code looked fine. The trace showed 380 near-identical queries. Once you can see the shape, the cause is obvious; the difficulty is only ever in getting the shape in front of you." },
      { type: "code", filename: "trace.log", language: "sql", text: "SELECT * FROM line_items WHERE report_id = $1   -- 380x, 4.9ms each\nSELECT * FROM reports WHERE tenant_id = $1        -- 1x, 12ms" },
      { type: "h", text: "The fix, and the second fix" },
      { type: "p", text: "Batching brought p95 to 380ms. The more durable change was a test that fails when a single request issues more than a set number of queries. It has caught two regressions since, both from changes that looked entirely harmless in review." },
      { type: "code", filename: "reports.test.ts", language: "typescript", text: "it('stays within the query budget', async () => {\n  const { queries } = await withQueryCounter(() => getReport(id));\n  expect(queries).toBeLessThan(12);\n});" },
    ],
  },
  {
    slug: "least-privilege-is-a-migration",
    title: "Least privilege is a migration, not a setting",
    date: "December 2025",
    iso: "2025-12-09",
    topic: "Secure development",
    summary: "Every guide describes least privilege as a state. In a live system it is a migration, and migrations need a way to be wrong safely.",
    body: [
      { type: "p", text: "Every guide describes least privilege as a state you arrive at. In a system with users on it, it is a migration — and migrations need a way to be wrong safely." },
      { type: "h", text: "Shadow mode" },
      { type: "p", text: "Run the new decision alongside the old one, act on the old one, and log every disagreement. Two weeks of disagreements will teach you more about your permission model than any audit." },
      { type: "code", filename: "middleware.ts", language: "typescript", text: "const legacy = legacyCheck(user, resource);\nconst next   = policy.evaluate(user, resource);\n\nif (legacy !== next) {\n  log.warn('policy.disagreement', { route, userRole: user.role, legacy, next });\n}\n\nreturn legacy; // still authoritative, for now" },
      { type: "h", text: "Expect to find load-bearing bugs" },
      { type: "p", text: "Some disagreements will be places where the old behaviour was wrong and somebody depends on it. That is a product conversation, and finding it in a log is far better than finding it in a support ticket." },
    ],
  },
  {
    slug: "a-rule-you-cant-test-isnt-a-detection",
    title: "A detection rule you can't test isn't a detection",
    date: "November 2025",
    iso: "2025-11-18",
    topic: "Detection engineering",
    summary: "Rules decay quietly. A field rename upstream will disable a detection with no alert, and you find out when you needed it.",
    body: [
      { type: "p", text: "Rules decay quietly. A field rename upstream will disable a detection without raising anything, and you find out at exactly the moment you needed it to work." },
      { type: "h", text: "Pair every rule with a sample" },
      { type: "p", text: "One event that must fire it, one that must not. Replay both in CI. This is unglamorous, and it is close to the whole discipline." },
      { type: "code", filename: ".github/workflows/detections.yml", language: "yaml", text: "- name: Replay detection samples\n  run: |\n    sigma convert -t splunk rules/ > build/rules.spl\n    python harness/replay.py --rules build/rules.spl --samples samples/\n    # exits non-zero if any rule fails to fire on its positive sample" },
      { type: "h", text: "Negative samples matter more than you think" },
      { type: "p", text: "A rule that fires on everything passes a positive test perfectly. The negative sample is the one that keeps your analysts willing to look at the alert." },
    ],
  },
  {
    slug: "what-the-support-rota-taught-me",
    title: "What two years on the support rota taught me about design",
    date: "September 2025",
    iso: "2025-09-22",
    topic: "Lessons learned",
    summary: "Carrying a pager taught me more about software design than any module. Mostly: the systems that are pleasant at 2am have fewer clever parts.",
    body: [
      { type: "p", text: "Two years of carrying a pager taught me more about software design than any module I have taken. Mostly it taught me that the systems that are pleasant at 2am are the ones with fewer clever parts." },
      { type: "h", text: "Boring is a feature" },
      { type: "p", text: "Every abstraction that saved someone typing cost someone else comprehension during an incident. That is not an argument against abstraction, only against unexamined ones." },
      { type: "h", text: "Write the log line you will want" },
      { type: "p", text: "The best predictor of how long an incident takes is whether the system said anything useful on its way down. Write logs for the person who will read them under pressure, not for the person writing the feature." },
      { type: "quote", text: "I enjoy understanding why systems fail just as much as building them." },
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
