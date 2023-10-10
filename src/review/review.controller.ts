import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';
import { Request, Response } from 'express';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
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
      await this.reviewService.template(user.accessToken, owner, repoName),
    );
  }
}
