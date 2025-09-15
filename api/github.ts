import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // tolerate multiple env names during rollout
  const token =
    process.env.GITHUB_TOKEN_ENV ??
    process.env.GITHUB_TOKEN ??
    process.env.GITHUB_TOKEN_VERCEL;
  const { user = "devfrx", action = "activity" } = req.query as Record<
    string,
    string
  >;
  const repo = "jays-portfolio";

  // diagnostic log visible in Vercel logs
  console.error("api/github invoked", { path: req.url, action, user });
  console.error("env check", {
    GITHUB_TOKEN_ENV: !!process.env.GITHUB_TOKEN_ENV,
    GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
    GITHUB_TOKEN_VERCEL: !!process.env.GITHUB_TOKEN_VERCEL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!token) {
    console.error("Missing GitHub token in environment");
    // do not leak details to client
    return res.status(502).json({ error: "Server configuration error" });
  }

  try {
    if (action === "contributions") {
      const query = `
        query {
          user(login: "${user}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `;
      const r = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "jays-portfolio-api",
        },
        body: JSON.stringify({ query }),
      });

      const json = await r.json().catch(() => ({}));
      if (!r.ok) {
        console.error("GraphQL upstream error", r.status, json);
        return res.status(r.status).json({ error: "Upstream GitHub error" });
      }
      return res.status(200).json(json);
    }

    // Default: fetch recent commits from a repo (used as activity fallback)
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "jays-portfolio-api",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const r2 = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(
        user
      )}/${encodeURIComponent(repo)}/commits?per_page=10`,
      { headers }
    );

    if (r2.status === 403) {
      const reset = r2.headers.get("X-RateLimit-Reset");
      const resetTime = reset ? new Date(parseInt(reset, 10) * 1000) : null;
      console.error("GitHub rate limit or forbidden", {
        user,
        repo,
        resetTime,
      });
      return res.status(403).json({
        error: "GitHub API rate limit or permission error",
        retryAt: resetTime ? resetTime.toISOString() : undefined,
      });
    }

    if (!r2.ok) {
      const text = await r2.text().catch(() => "");
      console.error("GitHub API error fetching commits", {
        status: r2.status,
        bodyPreview: text.slice(0, 1000),
      });
      return res
        .status(r2.status)
        .json({ error: "Failed to fetch commits from GitHub" });
    }

    const commits = await r2.json().catch(() => []);
    return res.status(200).json(commits);
  } catch (err: any) {
    console.error("GitHub proxy exception:", err);
    return res.status(500).json({ error: "Upstream request failed" });
  }
}
