import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { FilesModule } from './files/files.module';
@Module({
  imports: [RepoModule, FilesModule],
  controllers: [AppController],
})
export class AppModule {}
