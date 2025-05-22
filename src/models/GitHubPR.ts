export interface GitHubPR {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  state: string;
  created_at: string;
  updated_at: string;
  merged_at?: string | null; // PRs may not be merged
  repository_url: string; // To get repository information if needed
  number: number;
  body?: string;
  labels?: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}
