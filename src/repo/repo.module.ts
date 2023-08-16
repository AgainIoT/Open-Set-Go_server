import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';

@Module({
  imports: [],
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
