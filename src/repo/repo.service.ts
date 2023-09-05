import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

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
      console.log('test')
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
}
