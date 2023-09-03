import {
  Controller,
  Logger,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import JwtAuthenticationGuard from './jwt/jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/github-login')
  async logIn(@Query('code') authCode: string, @Res() res: Response) {
    const githubAccessToken = await this.authService.getGithubAccessToken(
      authCode,
    );
    if (!githubAccessToken.returnValue) {
      return res.status(401).json(githubAccessToken);
    }
    Logger.debug(githubAccessToken);

    const githubUser = await this.authService.getGithubUser(
      githubAccessToken.githubAccessToken,
    );
    if (!githubUser.returnValue) {
      return res.status(401).json(githubUser);
    }
    Logger.debug(githubUser);

    const user = await this.userService.checkUserById(
      githubUser.user,
      githubAccessToken.githubAccessToken,
    );
    if (!user.returnValue) {
      Logger.debug(user);
      return res.status(401).json(githubUser);
    }
    Logger.debug(user);

    const cookie = await this.authService.getCookieWithJwtToken(
      githubUser.user.id,
    );
    Logger.debug(cookie);
    res.setHeader('Set-Cookie', cookie);

    return res.status(200).send('success');
  }

  @Post('/github-logout')
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }
}
