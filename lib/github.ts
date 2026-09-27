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
};

// Returns null when the API can't be reached, so the page never shows made-up numbers.
export async function getGitHubData(): Promise<GitHubData | null> {
  const user = site.github;
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=6`, { headers, next: { revalidate: 3600 } }),
    ]);
    if (!profileRes.ok || !reposRes.ok) return null;

    const profile = await profileRes.json();
    const repos: Repo[] = await reposRes.json();

    return {
      repos: repos.slice(0, 3),
      publicRepos: profile.public_repos ?? 0,
      followers: profile.followers ?? 0,
      languages: Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])),
    };
  } catch {
    return null;
  }
}
