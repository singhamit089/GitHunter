export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    html_url: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  }