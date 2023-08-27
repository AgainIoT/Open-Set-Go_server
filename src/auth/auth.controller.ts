import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/github-login')
  async logIn(@Query('code') authCode: string, @Res() res: Response) {
    const githubAccessToken = await this.authService.getGithubAccessToken(
      authCode,
    );
    if (!githubAccessToken.returnValue) {
      res.status(401).json(githubAccessToken);
    }
    Logger.debug(githubAccessToken);

    const githubUser = await this.authService.getGithubUser(
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
