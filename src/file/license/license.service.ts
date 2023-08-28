import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import * as fs from 'fs/promises';

@Injectable()
export class LicenseService {
  async readLicenseFile(filePath: string): Promise<any> {
    try {
      const fileContent = await readFileSync(filePath, 'utf-8');
      return load(fileContent);
    } catch (error) {
      console.error('Error reading license file:', error);
      return null;
    }
  }

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
}
