import { Injectable, Logger } from '@nestjs/common';
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
    return communityData;
  };

  security = async (
    githubAccessToken: string,
    owner: string,
    repo: string,
  ): Promise<Security> => {
    const octokit = new Octokit({ auth: githubAccessToken });

    const securityData: Security = {
      codeql: null,
      secretScan: null,
      securityPolicy: null,
      dependabot: null,
    };

    // check CodeQL enabled
    try {
      await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
        owner,
        repo,
      });
      securityData.codeql = true;
    } catch (error) {
      if (error.status === 404) {
        securityData.codeql = false;
      } else {
        Logger.error('octokit code-scanning error: ', error);
      }
    }

    const repoData = await octokit.repos.get({ owner, repo });

    if (repoData.data.permissions.admin) {
      // check secretScan enabled
      try {
        securityData.secretScan =
          repoData.data.security_and_analysis.secret_scanning.status ===
          'enabled';
      } catch (error) {
        console.log(error);
        securityData.secretScan = false;
      }

      // check dependabot enabled
      try {
        await octokit.repos.checkVulnerabilityAlerts({
          owner,
          repo,
        });
        securityData.dependabot = true;
      } catch (error) {
        console.log(error);
        if (error.status === 404) {
          securityData.dependabot = false;
        } else {
          Logger.error('octokit checkVulnerabilityAlerts error: ', error);
        }
      }
    } else {
      securityData.secretScan = null;
      securityData.dependabot = null;
    }

    // check Security Policy enabled
    securityData.securityPolicy = await this.checkFileExists(
      octokit,
      owner,
      repo,
      'SECURITY.md',
    );

    return securityData;
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

type Security = {
  codeql: boolean;
  secretScan: boolean;
  securityPolicy: boolean;
  dependabot: boolean;
};
