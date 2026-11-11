// Live data for the GitHub section. Fetched on the server and refreshed about
// once an hour, so visitors never wait on GitHub and the page still builds if
// GitHub is unreachable (the section then shows a simple link instead).

const username = "hbagit8125";

// Both addresses can be overridden with environment variables for testing.
const API = process.env.GITHUB_API_URL ?? "https://api.github.com";
// GitHub has no public endpoint for the contribution calendar, so this uses a
// free community service that reads it from the public profile page.
const CONTRIBUTIONS =
  process.env.GITHUB_CONTRIBUTIONS_URL ?? "https://github-contributions-api.jogruber.de/v4";

const REFRESH_SECONDS = 3600;

export type GithubRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type ContributionDay = { date: string; count: number; level: number };

export type GithubData = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  repos: GithubRepo[];
  contributions: { total: number; days: ContributionDay[] } | null;
};

async function getJson(url: string, github: boolean): Promise<unknown> {
  const headers: Record<string, string> = { Accept: "application/json" };
  // Optional: set GITHUB_TOKEN in Vercel to raise GitHub's hourly request limit.
  if (github && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, {
    headers,
    next: { revalidate: REFRESH_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.json();
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

async function getContributions(): Promise<GithubData["contributions"]> {
  try {
    const data = await getJson(`${CONTRIBUTIONS}/${username}?y=last`, false);
    if (!isRecord(data) || !Array.isArray(data.contributions)) return null;
    const days = data.contributions
      .filter(
        (d): d is { date: string; count: number; level: number } =>
          isRecord(d) &&
          typeof d.date === "string" &&
          typeof d.count === "number" &&
          typeof d.level === "number",
      )
      .map((d) => ({ date: d.date, count: d.count, level: Math.min(4, Math.max(0, d.level)) }));
    if (days.length < 7) return null;
    const stated = isRecord(data.total) ? data.total.lastYear : undefined;
    const total = typeof stated === "number" ? stated : days.reduce((n, d) => n + d.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<GithubData | null> {
  try {
    const [user, repos, contributions] = await Promise.all([
      getJson(`${API}/users/${username}`, true),
      getJson(`${API}/users/${username}/repos?sort=pushed&per_page=100`, true),
      getContributions(),
    ]);
    if (!isRecord(user) || !Array.isArray(repos)) return null;

    return {
      username,
      profileUrl: `https://github.com/${username}`,
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : repos.length,
      followers: typeof user.followers === "number" ? user.followers : 0,
      repos: repos
        .filter((r): r is Record<string, unknown> => isRecord(r) && r.fork !== true && r.archived !== true)
        .slice(0, 6)
        .map((r) => ({
          name: String(r.name),
          url: String(r.html_url),
          description: typeof r.description === "string" ? r.description : null,
          language: typeof r.language === "string" ? r.language : null,
          stars: typeof r.stargazers_count === "number" ? r.stargazers_count : 0,
          pushedAt: typeof r.pushed_at === "string" ? r.pushed_at : "",
        })),
      contributions,
    };
  } catch {
    return null;
  }
}
