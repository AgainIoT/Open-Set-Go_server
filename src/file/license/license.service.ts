import { Injectable } from '@nestjs/common';
import { file } from '../file.service';
import { Octokit } from '@octokit/rest';

@Injectable()
export class LicenseService {
  async getLicense(githubAccessToken: string): Promise<licenseType[]> {
    const octokit = new Octokit({ auth: githubAccessToken });
    const licenses = await octokit.licenses.getAllCommonlyUsed();
    const parsedLicense: licenseType[] = [];

    const concurrentRequests = 8;

    const licenseRequests = licenses.data.map(async (license) => {
      const licenseDetails = await octokit.licenses.get({
        license: license.key,
      });
      return {
        license: license.key,
        name: licenseDetails.data.name,
        description: licenseDetails.data.description,
        permissions: licenseDetails.data.permissions,
        conditions: licenseDetails.data.conditions,
        limitations: licenseDetails.data.limitations,
        featured: licenseDetails.data.featured,
      };
    });

    for (let i = 0; i < licenseRequests.length; i += concurrentRequests) {
      const requestBatch = licenseRequests.slice(i, i + concurrentRequests);
      const batchResults = await Promise.all(requestBatch);

      parsedLicense.push(...batchResults);
    }

    parsedLicense.sort((elem1, elem2) => {
      return elem1.featured > elem2.featured ? -1 : 1;
    });

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
  featured: boolean;
};
