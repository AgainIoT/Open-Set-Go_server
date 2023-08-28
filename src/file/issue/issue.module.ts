import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { IssueTemplate, IssueTemplateSchema } from './schemas/issue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IssueTemplate.name, schema: IssueTemplateSchema },
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService],
})
export class IssueModule {}
