import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class AppService {
  // Check whether this repository does exist already.
  checkRepo = async (
    octokit: Octokit,
    userName: string,
    repoName: string,
  ): Promise<boolean> => {
    try {
      const response = await octokit.repos.get({
        owner: userName,
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
      console.log(error.message);
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
    const validate = await this.checkRepo(octokit, userName, repoName);
    try {
      // Validate the repository name.
      if (validate) {
        const response = await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          auto_init: true,
        });
        console.log(response.status, 'ok');
        console.log(`Repository '${repoName}' has been created successfully.`);
      } else {
        throw Error;
      }
    } catch (error) {
      console.error(`Failed to create repository. Error: ${error.message}`);
    }
  };
}
