import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class AppService {
  // Check whether this repository name does exist already.
  checkRepo = async (
    octokit: Octokit,
    userName: string,
    repoName: string,
    // Still working on how to use this promise return.
  ): Promise<boolean> => {
    const response = await octokit.repos.get({
      owner: userName,
      repo: repoName,
    });
    if (Math.floor(response.status / 100) === 2) {
      return true;
    } else {
      return false;
    }
  };

  // Create a repository.
  createRepo = async (
    GHtoken: string,
    userName: string,
    repoName: string,
  ): Promise<void> => {
    const octokit = new Octokit({ auth: GHtoken });
    try {
      // Validate the repository name.
      const validate = await Promise.resolve(
        this.checkRepo(octokit, userName, repoName),
      );
      console.log(validate);
      if (validate) {
        const response = await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          auto_init: true,
        });
        console.log(response.headers);
        console.log(`Repository '${repoName}' has been created successfully.`);
      }
    } catch (error) {
      console.error(`Failed to create repository. Error: ${error.message}`);
    }
  };
}
