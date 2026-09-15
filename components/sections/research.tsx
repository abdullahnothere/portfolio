import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Data as artifact: the code-panel chrome carrying measurements instead of code.
 * Measured values from the dissertation's 21-run matrix. Every figure here is
 * one from the submitted results, not an illustration.
 */
const findings = [
  {
    outcome: "Alerted",
    detail: "Microsoft Defender",
    note: "3 of 11 stages, 3 to 22 ms",
    strength: 3 / 11,
  },
  {
    outcome: "Prevented",
    detail: "Microsoft Defender",
    note: "1 of 11 stages, fully stopped",
    strength: 1 / 11,
  },
  {
    outcome: "No endpoint alert",
    detail: "Wazuh rules only",
    note: "8 of 11 stages",
    strength: 8 / 11,
  },
];

export function Research() {
  return (
    <Section id="research" eyebrow="Research">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            What actually fires across an eleven stage ransomware chain?
          </h2>
          <p className="lede mb-5">
            MSc dissertation, University of Warwick. Detection coverage is usually reported as a list
            of techniques a tool claims to cover. That tells you nothing about <em>which</em> stages
            produce an alert, how fast it arrives, or whether anything stops.
          </p>
          <p className="lede mb-7">
            So I built the chain and measured it. A four host isolated lab, a Ransomware-as-a-Service
            attack chain reproduced across eleven ATT&amp;CK mapped stages with no live ransomware,
            and twenty-one controlled runs across four initial access vectors with endpoint
            protection on and off. Every run hashed and archived, so each figure traces back to the
            log line underneath it.
          </p>
          <ButtonLink href="/projects/raas-detection-engineering-lab" variant="primary">
            Read the full writeup
          </ButtonLink>
        </div>

        <Reveal delay={0.1}>
          <figure className="overflow-hidden rounded-xl border border-hair bg-surface shadow-lift">
            <figcaption className="flex items-center gap-2.5 border-b border-hair px-4 py-3">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-mint" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">
                endpoint protection across 11 stages, 21 runs
              </span>
            </figcaption>

            <table className="w-full font-mono text-[0.72rem]">
              <thead className="text-dim">
                <tr className="border-b border-hair">
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">Outcome</th>
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">Control</th>
                  <th scope="col" className="px-4 py-2 text-right font-normal uppercase tracking-wider">Share</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((f) => (
                  <tr key={f.outcome} className="border-b border-hair last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 text-mint">{f.outcome}</td>
                    <td className="px-4 py-2.5 text-ink">
                      {f.detail}
                      <span className="block text-[0.66rem] text-dim">{f.note}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right align-middle">
                      <span className="inline-flex items-center justify-end gap-2">
                        <span aria-hidden className="hidden h-[3px] w-16 rounded-full bg-hair sm:block">
                          <span className="block h-full rounded-full bg-mint" style={{ width: `${f.strength * 100}%` }} />
                        </span>
                        <span className="text-muted">{Math.round(f.strength * 100)}%</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-hair px-4 py-3 font-mono text-[0.68rem] leading-relaxed text-dim">
              The endpoint alerts in 3 to 22 ms, roughly a thousand times faster than SIEM
              ingestion, and covers a quarter of the chain. Protection is{" "}
              <b className="font-medium text-mint">not</b> prevention, and the gap is the argument
              for defence in depth.
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
