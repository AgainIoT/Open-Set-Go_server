import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { LicenseService } from './license/license.service';
import { PrService } from './pr/pr.service';
import { IssueService } from './issue/issue.service';
import { ReadmeService } from './readme/readme.service';
import { ContributingService } from './contributing/contributing.service';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import JwtAuthenticationGuard from 'src/auth/jwt/jwt-authentication.guard';

export type file = { path: string; content: string };
@Controller('file')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly licenseService: LicenseService,
    private readonly prService: PrService,
    private readonly issueService: IssueService,
    private readonly readmeService: ReadmeService,
    private readonly conributingService: ContributingService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthenticationGuard)
  async uploadFiles(
    @Body('userName') userName: string,
    @Body('repoName') repoName: string,
    @Body('language') language: string,
    @Body('framework') framework: string,
    @Body('gitignore') gitignore: string[],
    @Body('PRTemplate') PRTemplate: string,
    @Body('IssueTemplate') IssueTemplate: string[],
    @Body('readmeMd') readmeMd: string,
    @Body('contributingMd') contributingMd: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    const pr = await this.prService.makePRTemplate(PRTemplate);
    this.filesService.files.push(pr);
    const is = await this.issueService.makeIssueTemplate(IssueTemplate);
    this.filesService.files.push(...is);
    const re = await this.readmeService.makeReadmeMd(readmeMd);
    this.filesService.files.push(re);
    const co = await this.conributingService.makeContributingMd(contributingMd);
    this.filesService.files.push(co);
    const fr = await this.filesService.makeFramework(language, framework);
    this.filesService.files.push(...fr);
    await this.filesService.makeGitignore(gitignore);

    this.filesService.uploadFiles(
      user.accessToken,
      userName,
      repoName,
      this.filesService.files,
    );
    res.status(200).send('ok');
  }

  @Get('supportedEnv')
  async getSupportedEnv(@Res() res: Response) {
    try {
      const envTemplate = await this.filesService.getEnvTemplate();
      res.status(200).json(envTemplate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}
