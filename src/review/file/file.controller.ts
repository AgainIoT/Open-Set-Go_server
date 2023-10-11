import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { FileService } from './file.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';
import { Request, Response } from 'express';

@Controller('review/file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('pr')
  @UseGuards(JwtAuthenticationGuard)
  async pr(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    return res.send();
  }
}
