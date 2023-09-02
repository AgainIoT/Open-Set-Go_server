import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import * as fs from 'fs/promises';
import { file } from '../file.service';
import axios from 'axios';

@Injectable()
export class LicenseService {
  // read file list from yml files
  async readLicenseFile(filePath: string): Promise<any> {
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      return load(fileContent);
    } catch (error) {
      console.error('Error reading license file:', error);
      return null;
    }
  }

  // read licenseTemplate dir & parse data to return
  async getLicense(): Promise<string> {
    try {
      const licensePath = join(
        __dirname,
        '..',
        '..',
        '..',
        'src',
        'file',
        'license',
        'licenseTemplate',
      );

      const files = await fs.readdir(licensePath);
      const licenseList = [];

      for (const file of files) {
        const LicenseData = await this.readLicenseFile(join(licensePath, file));
        licenseList.push(LicenseData);
      }

      return JSON.stringify(licenseList);
    } catch (error) {
      console.error('Error fetching license:', error);
      throw error;
    }
  }

  // get data from license url & parse data to file type and return
  makeLicense = async (license: string): Promise<file> => {
    const content = await axios.get(license);

    return {
      path: 'LICENSE',
      content: content.data,
    };
  };
}
