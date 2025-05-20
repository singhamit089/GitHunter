import axios from 'axios';
import { GitHubRepo } from '@models/GitHubRepo';

export const GitHubAPIManager = {
  async searchRepos(query: string, page: number = 1, per_page: number = 20): Promise<GitHubRepo[]> {
    const response = await axios.get(
      `https://api.github.com/search/repositories`,
      {
        params: {
          q: query,
          page,
          per_page,
        },
      }
    );
    return response.data.items;
  },
};
