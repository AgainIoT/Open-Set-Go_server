import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

type repoData = {
  owner: string;
  avatar: string;
  repoName: string[];
};

@Injectable()
export class RepoService {
  checkRepo = async (
    owner: string,
    repoName: string,
    githubAccessToken: string,
  ): Promise<boolean> => {
    try {
      const octokit = new Octokit({ auth: githubAccessToken });
      const response = await octokit.repos.get({
        owner: owner,
        repo: repoName,
      });
      // This repository already exists.
      if (response.status === 200) {
        return false;
      }
    } catch (error) {
      // You can make a repository of this name.
      if (error.status === 404) {
        return true;
      }
      // Something got wrong.
      throw error;
    }
  };

  // Create a repository.
  createRepo = async (
    githubAccessToken: string,
    owner: string,
    repoName: string,
    description: string,
    isOrg: boolean,
  ): Promise<number> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    let response: any;
    try {
      const validate = await this.checkRepo(owner, repoName, githubAccessToken);
      console.log('test');
      // Validate the repository name.
      if (validate) {
        if (isOrg) {
          response = await octokit.repos.createInOrg({
            org: owner,
            name: repoName,
            description: description,
            auto_init: true,
          });
          Logger.debug(
            `[${response.status}] Repository '${repoName}' has been created successfully.`,
          );
        } else {
          response = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description: description,
            auto_init: true,
          });
          Logger.debug(
            `[${response.status}] Repository '${repoName}' has been created successfully.`,
          );
        }
        return 200;
      }
      return 404;
    } catch (error) {
      console.error(`Failed to create repository. Error: ${error.message}`);
      return 500;
    }
  };

  parsingReposData = async (publicRepoList: {
    data: any;
  }): Promise<repoData[]> => {
    const results: repoData[] = [];
    const owners = [];

    for await (const data of publicRepoList.data) {
      // user must have up to push permission to make branch & Pull-Request
      if (data.permissions.push) {
        const index = owners.indexOf(data.owner.login);
        if (index !== -1) {
          results[index].repoName.push(data.name);
        } else {
          owners.push(data.owner.login);
          results.push({
            owner: data.owner.login,
            avatar: data.owner.avatar_url,
            repoName: [data.name],
          });
        }
      }
    }

    return results;
  };

  getPublicRepos = async (githubAccessToken: string): Promise<repoData[]> => {
    const octokit = new Octokit({ auth: githubAccessToken });

    const ownerPublicReposList =
      await octokit.rest.repos.listForAuthenticatedUser({
        visibility: 'public',
        affiliation: 'organization_member',
      });

    const orgPulicReposList = await octokit.rest.repos.listForAuthenticatedUser(
      {
        visibility: 'public',
        affiliation: 'organization_member',
      },
    );

    const results: repoData[] = await this.parsingReposData(
      ownerPublicReposList,
    );
    results.push(...(await this.parsingReposData(orgPulicReposList)));

    console.log(results);
    return results;
  };

  getRepoDetails = async (
    githubAccessToken: string,
    owner: string,
    repo: string,
  ): Promise<repoDetails> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const repoData = await octokit.rest.repos.get({ owner, repo });

    const result: repoDetails = {
      owner,
      name: repo,
      fullName: repoData.data.full_name,
      repoURL: repoData.data.html_url,
      description: repoData.data.description,
      language: repoData.data.language,
      star: repoData.data.stargazers_count,
      fork: repoData.data.forks_count,
    };

    return result;
  };
}

type repoDetails = {
  owner: string;
  name: string;
  fullName: string;
  repoURL: string;
  description: string;
  language: string;
  star: number;
  fork: number;
};
