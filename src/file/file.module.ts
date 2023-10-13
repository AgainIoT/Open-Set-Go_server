import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { LicenseController } from './license/license.controller';
import { LicenseService } from './license/license.service';
import { PrModule } from './pr/pr.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { IssueModule } from './issue/issue.module';
import { ContributingModule } from './contributing/contributing.module';
import { ReadmeModule } from './readme/readme.module';
import { GitignoreService } from './gitignore/gitignore.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Gitignore,
  GitignoreSchema,
} from './gitignore/schemas/gitignore.schema';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrModule,
    IssueModule,
    ContributingModule,
    ReadmeModule,
    MongooseModule.forFeature([
      { name: Gitignore.name, schema: GitignoreSchema },
    ]),
  ],
  controllers: [FilesController, LicenseController],
  providers: [FilesService, LicenseService, GitignoreService],
})
export class FilesModule {}
