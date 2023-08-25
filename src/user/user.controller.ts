import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/github-login')
  async logIn(@Query('code') authCode: string, @Res() res: Response) {
    const githubAccessToken = await this.userService.getGithubAccessToken(
      authCode,
    );
    if (!githubAccessToken.returnValue) {
      res.status(401).json(githubAccessToken);
    }
    Logger.debug(githubAccessToken);

    const githubUser = await this.userService.getGithubUser(
      githubAccessToken.githubAccessToken,
    );
    if (!githubUser.returnValue) {
      res.status(401).json(githubUser);
    }
    Logger.debug(githubUser);

    const user = await this.userService.findUserById(
      githubUser.user,
      githubAccessToken.githubAccessToken,
    );
    if (!user.returnValue) {
      res.status(401).json(githubUser);
    }
    Logger.debug(user);

    res.status(200);
  }
}
