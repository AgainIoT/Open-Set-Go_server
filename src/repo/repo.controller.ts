import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';

@Controller('repo')
export class RepoController {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthenticationGuard)
  async createRepo(
    @Req() req: Request,
    @Res() res: Response,
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);
    await this.repoService.createRepo(user.accessToken, userName, repoName);
    res.status(200).send('ok');
  }
}
