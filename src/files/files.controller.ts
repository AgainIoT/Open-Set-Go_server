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
    @Res() res: Response,
  ) {
    this.filesService.uploadFiles(token, userName, repoName, [
      { path: '1.txt', content: 'example1' },
      { path: '2.txt', content: 'example2' },
      { path: '3.txt', content: 'example3' },
      { path: '4.txt', content: 'example4' },
    ]);
    res.status(200).send('ok');
  }
}
