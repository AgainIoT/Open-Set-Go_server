import { Body, Controller, Post, Res } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Response } from 'express';
@Controller('repo')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post('')
  createRepo(
    @Body('token') token: string,
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
    @Res() res: Response,
  ) {
    this.repoService.createRepo(token, userName, repoName);
    res.status(200).send('ok');
  }
}
