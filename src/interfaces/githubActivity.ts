export interface GitHubActivity {
  id: string;
  type: string;
  text: string;
  repo: string;
  created_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 based on contribution intensity
}
