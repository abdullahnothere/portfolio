import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Data as artifact — the code-panel chrome carrying measurements instead of code.
 * Figures are illustrative of the dissertation's structure; replace with measured
 * values as the cyber range produces them.
 */
const stages = [
  { stage: "Initial access", source: "Web / auth logs", note: "brute force, upload", strength: 0.85 },
  { stage: "Execution", source: "Sysmon EID 1", note: "script interpreters", strength: 0.78 },
  { stage: "Defence evasion", source: "Defender + Sysmon", note: "tooling disabled", strength: 0.55 },
  { stage: "Exfiltration", source: "Network monitor", note: "egress volume", strength: 0.62 },
  { stage: "Impact", source: "SMB / file events", note: "mass encryption", strength: 1.0 },
];

export function Research() {
  return (
    <Section id="research" eyebrow="Research">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            How early is ransomware actually detectable?
          </h2>
          <p className="lede mb-5">
            MSc dissertation, University of Warwick. Detection coverage is usually reported as a list
            of techniques a tool claims to cover. That tells you nothing about <em>when</em> you would
            find out, which is the difference between responding and recovering.
          </p>
          <p className="lede mb-7">
            The range is deliberately small and fully isolated: a Kali attack host, a Windows 11
            endpoint, and an Ubuntu server running Wazuh. Defender, Sysmon, Windows Event Logs and
            network monitoring observe the same attack at once, so the question becomes which source
            sees a technique first, not whether anything sees it at all.
          </p>
          <ButtonLink href="/projects/ransomware-detection-cyber-range" variant="primary">
            Read the full writeup
          </ButtonLink>
        </div>

        <Reveal delay={0.1}>
          <figure className="overflow-hidden rounded-xl border border-hair bg-surface shadow-lift">
            <figcaption className="flex items-center gap-2.5 border-b border-hair px-4 py-3">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-mint" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">
                signal strength by attack stage
              </span>
            </figcaption>

            <table className="w-full font-mono text-[0.72rem]">
              <thead className="text-dim">
                <tr className="border-b border-hair">
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">Stage</th>
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">Source</th>
                  <th scope="col" className="px-4 py-2 text-right font-normal uppercase tracking-wider">Signal</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((s) => (
                  <tr key={s.stage} className="border-b border-hair last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 text-mint">{s.stage}</td>
                    <td className="px-4 py-2.5 text-ink">
                      {s.source}
                      <span className="block text-[0.66rem] text-dim">{s.note}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right align-middle">
                      <span className="inline-flex items-center justify-end gap-2">
                        <span aria-hidden className="hidden h-[3px] w-16 rounded-full bg-hair sm:block">
                          <span className="block h-full rounded-full bg-mint" style={{ width: `${s.strength * 100}%` }} />
                        </span>
                        <span className="text-muted">{Math.round(s.strength * 100)}%</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-hair px-4 py-3 font-mono text-[0.68rem] leading-relaxed text-dim">
              Impact is the strongest signal and the least useful one: by the time it fires you are
              doing recovery. The dissertation weights everything that happens{" "}
              <b className="font-medium text-mint">before</b> it.
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
