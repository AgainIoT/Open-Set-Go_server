import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/profile')
  @UseGuards(JwtAuthenticationGuard)
  async getProfile(@Req() req: Request, @Res() res: Response) {
    // get JWT AccessToken from cookies and decode + get GitHub Access Token
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    res.json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    });
  }

  @Get('/grantedInfo')
  @UseGuards(JwtAuthenticationGuard)
  async getGrantedOrg(@Req() req: Request, @Res() res: Response) {
    // get JWT AccessToken from cookies and decode + get GitHub Access Token
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    res.json({
      id: user.id,
      avatar: user.avatar,
      org: user.orgs,
    });
  }
}
