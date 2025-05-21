import axios from 'axios';
import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from '@models/index';

const GITHUB_API_BASE_URL = 'https://api.github.com/search';

export const GitHubAPIManager = {
  async searchRepos(query: string, page: number = 1, per_page: number = 20): Promise<GitHubRepo[]> {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/repositories`,
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

  async searchIssues(query: string, page: number = 1, per_page: number = 20): Promise<GitHubIssue[]> {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/issues`,
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

  async searchPRs(query: string, page: number = 1, per_page: number = 20): Promise<GitHubPR[]> {
    // Note: GitHub API uses the same endpoint for issues and PRs.
    // We can differentiate by adding 'is:pr' or 'is:issue' to the query.
    // For simplicity here, we'll assume the query will include 'is:pr' when PRs are desired.
    // Alternatively, the component calling this can append ' is:pr' to the query.
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/issues`, // Same endpoint as issues
      {
        params: {
          q: `${query} is:pr`, // Added 'is:pr' to filter for pull requests
          page,
          per_page,
        },
      }
    );
    return response.data.items;
  },

  async searchCode(query: string, page: number = 1, per_page: number = 20): Promise<GitHubCode[]> {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/code`,
      {
        params: {
          q: query,
          page,
          per_page,
        },
        // Important: GitHub API for code search requires authentication and
        // a specific Accept header for text-match metadata if desired.
        // For now, this basic version won't include authentication or special headers.
        // This might lead to lower rate limits or different response structures
        // if authentication is strictly required for some queries.
      }
    );
    return response.data.items;
  },
};
