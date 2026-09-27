import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getGitHubData } from "@/lib/github";
import { site } from "@/content/site";

export async function GitHub() {
  const data = await getGitHubData();
  const profile = `https://github.com/${site.github}`;

  return (
    <Section id="github" eyebrow="GitHub">
      <h2 className="mb-3.5 text-[clamp(1.9rem,3.6vw,2.7rem)]">Recent activity</h2>

      {data ? (
        <>
          <p className="lede mb-8">Pulled from the GitHub API and refreshed hourly.</p>

          <dl className="mb-6 grid grid-cols-3 gap-3.5">
            {[
              { value: String(data.publicRepos), label: "public repositories" },
              { value: String(data.followers), label: "followers" },
              { value: String(data.languages.length), label: "languages in recent repos" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-hair p-4">
                <dd className="font-display text-[1.7rem] font-extrabold tracking-tight">{s.value}</dd>
                <dt className="text-[0.78rem] text-dim">{s.label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((repo) => (
              <li key={repo.name}>
                <a href={repo.html_url} className="card card-link block h-full">
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
        </>
      ) : (
        <p className="lede">
          My repositories are on{" "}
          <a className="text-mint" href={profile}>
            GitHub
          </a>
          . Most of my MSc work was assessed as written reports, so the case studies above are the fuller record.
        </p>
      )}
    </Section>
  );
}
