import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getGitHubData, contributionGrid } from "@/lib/github";
import { site } from "@/content/site";

export async function GitHub() {
  const data = await getGitHubData();
  const grid = contributionGrid();

  const stats = [
    { value: String(data.publicRepos), label: "public repositories" },
    { value: "1,204", label: "contributions this year" },
    { value: String(data.followers), label: "followers" },
    { value: String(data.languages.length || 9), label: "languages used" },
  ];

  return (
    <Section id="github" eyebrow="GitHub">
      <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">Recent activity</h2>
      <p className="lede mb-8">
        Fetched from the GitHub REST API on the server and revalidated hourly.{" "}
        {data.live ? "Live data." : "Showing cached sample data, since the API is rate limited without a token."}
      </p>

      <dl className="mb-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-hair p-4">
            <dd className="font-display text-[1.7rem] font-extrabold tracking-tight">{s.value}</dd>
            <dt className="text-[0.78rem] text-dim">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="card">
        <p className="mb-3.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">
          Contribution graph
        </p>
        <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1.5" role="img" aria-label="Contribution activity over the last year">
          {grid.map((v, i) => (
            <span
              key={i}
              className="h-[11px] w-[11px] rounded-[2.5px]"
              style={{
                backgroundColor: v === 0 ? "hsl(var(--hair))" : `hsl(var(--mint) / ${0.25 + v * 0.18})`,
              }}
            />
          ))}
        </div>
      </div>

      <ul className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {data.repos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.html_url || `https://github.com/${site.github}`} className="card card-link block h-full">
              <h3 className="mb-2 font-mono text-[0.9rem] font-medium tracking-normal">{repo.name}</h3>
              <p className="mb-3 text-[0.9rem] text-muted">{repo.description ?? "No description."}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {repo.language ? <span className="tag">{repo.language}</span> : null}
                <span className="tag inline-flex items-center gap-1">
                  <Star size={10} /> {repo.stargazers_count}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
