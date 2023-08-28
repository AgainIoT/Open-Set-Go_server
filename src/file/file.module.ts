import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { HttpModule } from '@nestjs/axios';
import { LicenseController } from './license/license.controller';
import { LicenseService } from './license/license.service';
import { PrController } from './pr/pr.controller';
import { PrService } from './pr/pr.service';
import { IssueController } from './issue/issue.controller';
import { IssueService } from './issue/issue.service';
import { ReadmeController } from './readme/readme.controller';
import { ReadmeService } from './readme/readme.service';
import { ContributingController } from './contributing/contributing.controller';
import { ContributingService } from './contributing/contributing.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, AuthModule, UserModule],
  controllers: [
    FilesController,
    LicenseController,
    PrController,
    IssueController,
    ReadmeController,
    ContributingController,
  ],
  providers: [
    FilesService,
    LicenseService,
    PrService,
    IssueService,
    ReadmeService,
    ContributingService,
  ],
})
export class FilesModule {}
