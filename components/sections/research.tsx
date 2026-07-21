import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const techniques = [
  { id: "T1078", name: "Valid accounts", stage: "Initial access", freq: 0.82 },
  { id: "T1562.001", name: "Impair defenses: disable tools", stage: "Defense evasion", freq: 0.74 },
  { id: "T1490", name: "Inhibit system recovery", stage: "Impact", freq: 0.69 },
  { id: "T1567", name: "Exfiltration over web service", stage: "Exfiltration", freq: 0.58 },
  { id: "T1486", name: "Data encrypted for impact", stage: "Impact", freq: 1.0 },
];

export function Research() {
  return (
    <Section id="research" eyebrow="Research">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            Defensive controls against Ransomware-as-a-Service
          </h2>
          <p className="lede mb-5">
            MSc dissertation, University of Warwick. RaaS has separated the people who write ransomware
            from the people who deploy it, which means affiliates share tooling and tradecraft. That
            repetition is something defenders can measure and exploit.
          </p>
          <p className="lede mb-7">
            The method is deliberately unglamorous: decompose public incident reports into ATT&amp;CK
            techniques, count how often each appears across unrelated intrusions, and rank candidate
            controls by the coverage they buy per unit of implementation effort.
          </p>
          <ButtonLink href="/projects/raas-defensive-controls" variant="primary">
            Read the full writeup
          </ButtonLink>
        </div>

        {/* Data as artifact — same chrome as the code panels, carrying real measurements. */}
        <Reveal delay={0.1}>
          <figure className="overflow-hidden rounded-xl border border-hair bg-surface shadow-lift">
            <figcaption className="flex items-center gap-2.5 border-b border-hair px-4 py-3">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-mint" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim">
                technique frequency — 4 affiliate programmes
              </span>
            </figcaption>

            <table className="w-full font-mono text-[0.72rem]">
              <thead className="text-dim">
                <tr className="border-b border-hair">
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-4 py-2 text-left font-normal uppercase tracking-wider">Technique</th>
                  <th scope="col" className="px-4 py-2 text-right font-normal uppercase tracking-wider">Seen in</th>
                </tr>
              </thead>
              <tbody>
                {techniques.map((t) => (
                  <tr key={t.id} className="border-b border-hair last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 text-mint">{t.id}</td>
                    <td className="px-4 py-2.5 text-ink">
                      {t.name}
                      <span className="block text-[0.66rem] text-dim">{t.stage}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right align-middle">
                      <span className="inline-flex items-center justify-end gap-2">
                        <span aria-hidden className="hidden h-[3px] w-16 rounded-full bg-hair sm:block">
                          <span className="block h-full rounded-full bg-mint" style={{ width: `${t.freq * 100}%` }} />
                        </span>
                        <span className="text-muted">{Math.round(t.freq * 100)}%</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-hair px-4 py-3 font-mono text-[0.68rem] leading-relaxed text-dim">
              Encryption is universal and useless as a detection point — by then you are doing recovery.
              The ranking weights everything that happens <b className="font-medium text-mint">before</b> it.
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
