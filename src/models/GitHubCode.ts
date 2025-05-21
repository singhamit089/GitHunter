export interface GitHubCode {
  name: string;
  path: string;
  sha: string;
  html_url: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  };
}
