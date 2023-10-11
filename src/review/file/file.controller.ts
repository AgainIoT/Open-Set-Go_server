import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { FileService, issueFile } from './file.service';
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
    @Body('content') content: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const pr = await this.fileService.pr(
      user.accessToken,
      owner,
      repoName,
      content,
    );
    return res.send(pr);
  }

  @Post('issue')
  @UseGuards(JwtAuthenticationGuard)
  async issue(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('issues') issues: issueFile[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const issue = await this.fileService.issue(
      user.accessToken,
      owner,
      repoName,
      issues,
    );
    return res.send(issue);
  }

  @Post('contributing')
  @UseGuards(JwtAuthenticationGuard)
  async contributing(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('content') content: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const contributing = await this.fileService.contributing(
      user.accessToken,
      owner,
      repoName,
      content,
    );
    return res.send(contributing);
  }

  @Post('readme')
  @UseGuards(JwtAuthenticationGuard)
  async readme(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('content') content: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const readme = await this.fileService.readme(
      user.accessToken,
      owner,
      repoName,
      content,
    );
    return res.send(readme);
  }
}
