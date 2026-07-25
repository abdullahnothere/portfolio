import { Section } from "@/components/ui/section";
import { CodePanel } from "@/components/ui/code-panel";
import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "@/components/sections/about";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience">
      <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            Two years on platforms with real users.
          </h2>
          <p className="lede mb-8">
            GoSaaS Labs builds enterprise software for Renesas, Fluke and Tektronix. I joined as a
            graduate and stayed long enough to maintain my own decisions, which turned out to be the
            most useful part of the job. The production support rota is where the security interest
            started.
          </p>

          {/* The same artifact treatment as the hero, applied to what on-call actually looks like. */}
          <Reveal>
            <CodePanel
              filename="legacy aggregation pipeline: refactor"
              variant="terminal"
              text={`before   pipeline built up over three years of feature work
         stages added, none ever removed
         same collection scanned more than once per request

after    stages reordered so filtering happens first
         redundant lookups collapsed
         ~30% faster on the same data and same hardware

note     the win was reading what it actually did,
         not rewriting it from scratch`}
              footer={[
                { label: "application performance", value: "~30% faster" },
                { label: "approach", value: "refactor, not rewrite" },
                { label: "clients affected", value: "3 global accounts" },
              ]}
            />
          </Reveal>
        </div>

        <Timeline detailed />
      </div>
    </Section>
  );
}
