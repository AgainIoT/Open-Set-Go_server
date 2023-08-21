import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github-login')
  async githubLogin(@Query('code') authCode: string, @Res() res: Response) {
    console.log(authCode);
    const accessToken = await this.authService.githubLogin(authCode);
    if (accessToken.returnValue === true) {
      return res
        .set('Access-Token', accessToken.data)
        .status(200)
        .json({ returnValue: true });
    } else {
      return res.status(403).json({ ...accessToken });
    }
  }
}
