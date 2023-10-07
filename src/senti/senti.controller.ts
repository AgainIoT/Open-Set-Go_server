import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SentiService } from './senti.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';
import { Request, Response } from 'express';

@Controller('senti')
export class SentiController {
  constructor(
    private readonly sentiService: SentiService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('template')
  @UseGuards(JwtAuthenticationGuard)
  async template(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    return res.send(
      await this.sentiService.template(user.accessToken, owner, repoName),
    );
  }
}
