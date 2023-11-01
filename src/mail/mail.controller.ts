import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // getPersonalMail
  @Post('')
  @UseGuards(JwtAuthenticationGuard)
  async mail(@Req() req: Request, @Res() res: Response) {
    // get JWT AccessToken from cookies and decode + get GitHub Access Token
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    // sendMail to user
    const status = await this.mailService.sendMail(
      user.name ? user.name : user.id,
      user.mail,
    );

    res.sendStatus(status);
  }
}
