import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('description') description: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const statusCode = await this.repoService.createRepo(
      user.accessToken,
      owner,
      repoName,
      description,
      owner !== user.id,
    );
    res.sendStatus(statusCode);
  }

  @Post('checkDuplication')
  @UseGuards(JwtAuthenticationGuard)
  async checkRepo(
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
      await this.repoService.checkRepo(owner, repoName, user.accessToken),
    );
  }

  @Get('getPulbicRepo')
  @UseGuards(JwtAuthenticationGuard)
  async getPublicRepos(@Req() req: Request, @Res() res: Response) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const publicRepos = await this.repoService.getPublicRepos(user.accessToken);
    return res.status(200).json(publicRepos);
  }

  @Post('getRepoDetails')
  @UseGuards(JwtAuthenticationGuard)
  async getRepoDetails(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const repoDetails = await this.repoService.getRepoDetails(
      user.accessToken,
      owner,
      repoName,
    );
    return res.send(repoDetails);
  }
}
