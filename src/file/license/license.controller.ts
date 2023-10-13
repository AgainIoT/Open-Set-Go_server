import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LicenseService } from './license.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';

@Controller('file/license')
export class LicenseController {
  constructor(
    private readonly licenseService: LicenseService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // get License list from licenseTemplate dir
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async license(@Req() req: Request, @Res() res: Response) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const licenseList = await this.licenseService.getLicense(user.accessToken);

    res.status(200).send(licenseList);
  }
}
