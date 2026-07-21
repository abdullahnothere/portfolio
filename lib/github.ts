import { site } from "@/content/site";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
};

export type GitHubData = {
  repos: Repo[];
  publicRepos: number;
  followers: number;
  languages: string[];
  live: boolean;
};

const FALLBACK: GitHubData = {
  repos: [
    { name: "splunk-raas-rules", description: "Sigma to SPL detection rules mapped to ATT&CK, with a replay test harness.", html_url: "#", language: "Python", stargazers_count: 74, pushed_at: "2026-06-01T00:00:00Z" },
    { name: "distroless-node-starter", description: "Minimal hardened Node container baseline with CI scanning.", html_url: "#", language: "Dockerfile", stargazers_count: 41, pushed_at: "2026-05-14T00:00:00Z" },
    { name: "policy-rbac", description: "Small policy-evaluation library extracted from production work.", html_url: "#", language: "TypeScript", stargazers_count: 28, pushed_at: "2026-04-30T00:00:00Z" },
  ],
  publicRepos: 38,
  followers: 96,
  languages: ["TypeScript", "Python", "Go", "Dockerfile"],
  live: false,
};

/**
 * Fetched on the server and revalidated hourly. Falls back to static data
 * rather than failing the page — an unauthenticated GitHub API is rate limited
 * to 60 requests an hour, and a portfolio should not 500 because of it.
 */
export async function getGitHubData(): Promise<GitHubData> {
  const user = site.github;
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=6`, { headers, next: { revalidate: 3600 } }),
    ]);
    if (!profileRes.ok || !reposRes.ok) return FALLBACK;

    const profile = await profileRes.json();
    const repos: Repo[] = await reposRes.json();

    return {
      repos: repos.slice(0, 3),
      publicRepos: profile.public_repos ?? FALLBACK.publicRepos,
      followers: profile.followers ?? FALLBACK.followers,
      languages: Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])),
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}

/** Deterministic placeholder heat data. Swap for the GraphQL contributions API when a token is set. */
export function contributionGrid(weeks = 53): number[] {
  const out: number[] = [];
  let seed = 42;
  for (let i = 0; i < weeks * 7; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const r = seed / 2147483648;
    out.push(r > 0.62 ? Math.ceil((r - 0.62) * 10) : 0);
  }
  return out;
}
