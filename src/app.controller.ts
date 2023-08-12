import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  createRepo(
    @Body('token') token: string,
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
    @Res() res: Response,
  ) {
    this.appService.createRepo(token, userName, repoName);
    res.status(200).send('ok');
  }
}
