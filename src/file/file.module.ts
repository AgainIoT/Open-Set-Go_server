import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { HttpModule } from '@nestjs/axios';
import { LicenseController } from './license/license.controller';
import { LicenseService } from './license/license.service';
import { ReadmeController } from './readme/readme.controller';
import { ReadmeService } from './readme/readme.service';
import { PrModule } from './pr/pr.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { IssueModule } from './issue/issue.module';
import { ContributingModule } from './contributing/contributing.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UserModule,
    PrModule,
    IssueModule,
    ContributingModule,
  ],
  controllers: [FilesController, LicenseController, ReadmeController],
  providers: [FilesService, LicenseService, ReadmeService],
})
export class FilesModule {}
