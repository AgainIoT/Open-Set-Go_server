import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { HttpModule } from '@nestjs/axios';
import { LicenseController } from './license/license.controller';
import { LicenseService } from './license/license.service';
import { ContributingController } from './contributing/contributing.controller';
import { ContributingService } from './contributing/contributing.service';
import { PrModule } from './pr/pr.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { IssueModule } from './issue/issue.module';
import { ReadmeModule } from './readme/readme.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UserModule,
    PrModule,
    IssueModule,
    ReadmeModule,
  ],
  controllers: [FilesController, LicenseController, ContributingController],
  providers: [FilesService, LicenseService, ContributingService],
})
export class FilesModule {}
