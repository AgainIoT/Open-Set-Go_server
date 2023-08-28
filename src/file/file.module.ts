import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { HttpModule } from '@nestjs/axios';
import { LicenseController } from './license/license.controller';
import { LicenseService } from './license/license.service';
import { IssueController } from './issue/issue.controller';
import { IssueService } from './issue/issue.service';
import { ReadmeController } from './readme/readme.controller';
import { ReadmeService } from './readme/readme.service';
import { ContributingController } from './contributing/contributing.controller';
import { ContributingService } from './contributing/contributing.service';
import { PrModule } from './pr/pr.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, AuthModule, UserModule, PrModule],
  controllers: [
    FilesController,
    LicenseController,
    IssueController,
    ReadmeController,
    ContributingController,
  ],
  providers: [
    FilesService,
    LicenseService,
    IssueService,
    ReadmeService,
    ContributingService,
  ],
})
export class FilesModule {}
