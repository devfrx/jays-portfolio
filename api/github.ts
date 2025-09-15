import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN_ENV;
  const { user = "devfrx", action = "activity" } = req.query as Record<
    string,
    string
  >;

  if (!token)
    return res.status(500).json({ error: "Missing GITHUB_TOKEN_ENV" });

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
        },
        body: JSON.stringify({ query }),
      });
      const json = await r.json();
      return res.status(r.status).json(json);
    }

    // Default: activity
    const r2 = await fetch(
      `https://api.github.com/users/${user}/events/public?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const events = await r2.json();
    return res.status(r2.status).json(events);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
