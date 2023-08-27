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

    const files = [];

    this.filesService
      .makeGitignore(gitignore)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.prService
      .makePRTemplate(PRTemplate)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.issueService
      .makeIssueTemplate(IssueTemplate)
      .then((result) => {
        files.push(...result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.readmeService
      .makeReadmeMd(readmeMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.conributingService
      .makeContributingMd(contributingMd)
      .then((result) => {
        files.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.filesService.uploadFiles(user.accessToken, userName, repoName, files);
    res.status(200).send('ok');
  }

  @Get()
  get(@Res() res: Response) {
    res.status(200).send('ok');
  }
}
