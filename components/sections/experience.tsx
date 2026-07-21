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
            Two years on a product with real users.
          </h2>
          <p className="lede mb-8">
            GoSaaS Labs builds enterprise integration software. I joined the platform team as a graduate
            and stayed on the same product long enough to maintain my own decisions — which turned out to
            be the most useful part of the job.
          </p>

          {/* The same artifact treatment as the hero, applied to what on-call actually looks like. */}
          <Reveal>
            <CodePanel
              filename="incident 2024-11-08 — reporting API"
              variant="terminal"
              text={`14:02  alert     p95 latency 2.41s (threshold 800ms)
14:09  trace     380 identical queries per request
14:31  mitigate  batched loader shipped behind flag
14:48  verify    p95 380ms, error rate flat
next   follow-up query-budget test added to CI`}
              footer={[
                { label: "time to mitigate", value: "29 min" },
                { label: "customer impact", value: "degraded, not down" },
                { label: "repeat", value: "none since" },
              ]}
            />
          </Reveal>
        </div>

        <Timeline detailed />
      </div>
    </Section>
  );
}
