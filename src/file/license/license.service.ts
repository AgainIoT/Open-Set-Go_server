import { Injectable } from '@nestjs/common';
import { file } from '../file.service';
import { Octokit } from '@octokit/rest';

@Injectable()
export class LicenseService {
  async getLicense(githubAccessToken: string): Promise<licenseType[]> {
    const octokit = new Octokit({ auth: githubAccessToken });
    const licenses = await octokit.licenses.getAllCommonlyUsed();

    const parsedLicense: licenseType[] = [];
    for await (const license of licenses.data) {
      const licenseDetails = await octokit.licenses.get({
        license: license.key,
      });
      parsedLicense.push({
        license: license.key,
        name: licenseDetails.data.name,
        description: licenseDetails.data.description,
        permissions: licenseDetails.data.permissions,
        conditions: licenseDetails.data.conditions,
        limitations: licenseDetails.data.limitations,
      });
    }

    return parsedLicense;
  }

  makeLicense = async (
    githubAccessToken: string,
    license: string,
  ): Promise<file> => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const content = await octokit.licenses.get({ license });

    return {
      path: 'LICENSE',
      content: content.data.body,
    };
  };
}

type licenseType = {
  license: string;
  name: string;
  description: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
};
