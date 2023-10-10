import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class ReviewService {
  template = async (
    githubAccessToken: string,
    owner: string,
    repoName: string,
  ): Promise<Template> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const templateReview: Template = {
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

  community = async (
    githubAccessToken: string,
    owner: string,
    repoName: string,
  ): Promise<Community> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const repoData = await octokit.repos.get({ owner: owner, repo: repoName });
    const communityData: Community = {
      description: repoData.data.description !== null,
      license: {
        exist: repoData.data.license !== null,
        name:
          repoData.data.license !== null ? repoData.data.license.name : null,
      },
      conduct: await this.checkFileExists(
        octokit,
        owner,
        repoName,
        'CODE_OF_CONDUCT.md',
      ),
      discussion: repoData.data.has_discussions,
    };
    console.log(communityData);
    return communityData;
  };

  repo = async () => {};

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

type Template = {
  pr: boolean;
  issue: boolean;
  contributing: boolean;
  readme: boolean;
};

type Community = {
  description: boolean;
  license: {
    exist: boolean;
    name: string;
  };
  conduct: boolean;
  discussion: boolean;
};
