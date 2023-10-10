import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class ReviewService {
  template = async (
    githubAccessToken: string,
    owner: string,
    repoName: string,
  ): Promise<any> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const templateReview = {
      pr: await this.checkFileExists(
        octokit,
        owner,
        repoName,
        '.github/pull_request_template.md',
      ),
      issue: await this.checkFileExists(
        octokit,
        owner,
        repoName,
        '.github/ISSUE_TEMPLATE',
      ),
      contributing:
        (await this.checkFileExists(
          octokit,
          owner,
          repoName,
          'CONTRIBUTING.md',
        )) ||
        (await this.checkFileExists(
          octokit,
          owner,
          repoName,
          'contributing.md',
        )),
      readme:
        (await this.checkFileExists(octokit, owner, repoName, 'README.md')) ||
        (await this.checkFileExists(octokit, owner, repoName, 'readme.md')) ||
        (await this.checkFileExists(octokit, owner, repoName, 'Readme.md')) ||
        (await this.checkFileExists(octokit, owner, repoName, 'README')) ||
        (await this.checkFileExists(octokit, owner, repoName, 'readme')),
    };

    return templateReview;
  };

  checkFileExists = async (
    octokit: Octokit,
    owner: string,
    repo: string,
    filePath: string,
  ): Promise<any> => {
    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
      });

      return response.status === 200;
    } catch (error) {
      if (error.status === 404) {
        return false;
      } else {
        throw error;
      }
    }
  };
}
