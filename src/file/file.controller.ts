import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { FilesService } from './file.service';
import { LicenseService } from './license/license.service';
import { PrService } from './pr/pr.service';
import { IssueService } from './issue/issue.service';
import { ReadmeService } from './readme/readme.service';
import { ContributingService } from './contributing/contributing.service';
import { Response } from 'express';

@Controller('file')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly licenseService: LicenseService,
    private readonly prService: PrService,
    private readonly issueService: IssueService,
    private readonly readmeService: ReadmeService,
    private readonly conributingService: ContributingService,
  ) {}

  @Post('')
  uploadFiles(
    @Body('token') token: string,
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
    @Body('language') language: string,
    @Body('framework') framework: string,
    @Body('gitignore') gitignore: string[],
    @Body('PRTemplate') PRTemplate: string,
    @Body('IssueTemplate') IssueTemplate: string[],
    @Body('readmeMd') readmeMd: string,
    @Body('contributingMd') contributingMd: string,
    @Res() res: Response,
  ) {
    const files = [];

    this.filesService
      .makeGitignore(gitignore)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.prService
      .makePRTemplate(PRTemplate)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.issueService
      .makeIssueTemplate(IssueTemplate)
      .then((result) => {
        files.push(...result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.readmeService
      .makeReadmeMd(readmeMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.conributingService
      .makeContributingMd(contributingMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeFramework(language, framework)
      .then((result) => {
        files.push(...result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService.uploadFiles(token, userName, repoName, files);
    res.status(200).send('ok');
  }

  @Get('supportedEnv')
  async getSupportedEnv(@Res() res: Response) {
    try {
      const envTemplate = await this.filesService.getEnvTemplate();
      res.status(200).json(envTemplate);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  // @Get('makeEnv')
  // async makeEnv(
  //   @Res() res: Response,
  //   @Body('token') token: string,
  //   @Body('userName') userName: string,
  //   @Body('repoName') repoName: string,
  //   @Body('language') language: string,
  //   @Body('framework') framework: string,
  // ) {
  //   try {
  //     const files = [];
  //     await this.filesService
  //       .makeFramework(language, framework)
  //       .then((result) => {
  //         files.push(...result);
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });

  //     console.log(files);
  //     this.filesService.uploadFiles(token, userName, repoName, files);
  //     res.status(200).send('ok');
  //   } catch (error) {
  //     console.log(error);
  //     res.sendStatus(500);
  //   }
  // }
}
