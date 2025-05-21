export interface GitHubIssue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  repository_url: string; // To get repository information if needed
  number: number;
}
