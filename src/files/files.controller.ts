import { Body, Controller, Post, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  uploadFiles(
    @Body('token') token: string,
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
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

    this.filesService
      .makePRTemplate(PRTemplate)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeIssueTemplate(IssueTemplate)
      .then((result) => {
        files.push(...result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeReadmeMd(readmeMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeContributingMd(contributingMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService.uploadFiles(token, userName, repoName, files);
    res.status(200).send('ok');
  }
}
