import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { UploadFilesDto } from './dto/uploadFiles.dto';

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
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthenticationGuard)
  async uploadFiles(
    @Body() uploadFilesDto: UploadFilesDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // file list to upload
    let files: file[] = [];

    // get JWT AccessToken from cookies and decode + get GitHub Access Token
    const jwtAccessToken = this.authService.decodeToken(
      req.cookies.Authentication,
    );
    const user = await this.userService.getUserById(jwtAccessToken);

    // get Framework files to upload
    if (uploadFilesDto.language !== '' && uploadFilesDto.framework !== '') {
      const framework = await this.filesService.makeFramework(
        uploadFilesDto.language,
        uploadFilesDto.framework,
      );
      files.push(...framework);
    }

    // get License file to upload
    if (uploadFilesDto.license !== '') {
      const licenseFile = await this.licenseService.makeLicense(
        uploadFilesDto.license,
      );
      files.push(licenseFile);
    }

    // get Pull Request Template file to upload
    if (uploadFilesDto.PRTemplate !== '') {
      const prTemplate = await this.prService.makePRTemplate(
        uploadFilesDto.PRTemplate,
      );
      files.push(prTemplate);
    }

    if (uploadFilesDto.IssueTemplate !== undefined) {
      const issueTemplate = await this.issueService.makeIssueTemplate(
        uploadFilesDto.IssueTemplate,
      );
      files.push(...issueTemplate);
    }

    // convert CONTRIBUITNG.md content to file type
    if (uploadFilesDto.contributingMd !== '') {
      const contributingMd = await this.conributingService.makeContributingMd(
        uploadFilesDto.contributingMd,
      );
      files.push(contributingMd);
    }

    // convert README.md content to file type
    if (uploadFilesDto.contributingMd !== '') {
      const re = await this.readmeService.makeReadmeMd(uploadFilesDto.readmeMd);
      files.push(re);
    }

    // make gitignore file with gitignore.io API & if gitignore file already existed, gitignore file added behind
    if (uploadFilesDto.gitignore.length !== 0) {
      files = await this.filesService.makeGitignore(
        uploadFilesDto.gitignore,
        files,
      );
    }

    // upload all files with Octokit at selected repository
    const result: number = await this.filesService.uploadFiles(
      user.accessToken,
      uploadFilesDto.owner,
      uploadFilesDto.repoName,
      files,
    );
    res.sendStatus(result);
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
