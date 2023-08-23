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
    @Body('gitignore') gitignore: string,
    @Body('readmeMd') readmeMd: string,
    @Body('ignorelist') ignorelist: string[],
    @Body('contributingMd') contributingMd: string,
    @Res() res: Response,
  ) {
    const contents = [];

    this.filesService
      .getGitignoreio(ignorelist)
      .then((result) => {
        contents.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeGitignore(gitignore)
      .then((result) => {
        contents.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeReadmeMd(readmeMd)
      .then((result) => {
        contents.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService
      .makeContributingMd(contributingMd)
      .then((result) => {
        contents.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService.uploadFiles(token, userName, repoName, contents);
    res.status(200).send('ok');
  }
}
