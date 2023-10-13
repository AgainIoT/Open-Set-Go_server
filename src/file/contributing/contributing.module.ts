import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contributing, ContributingShema } from './schemas/contributing.schema';
import { ContributingController } from './contributing.controller';
import { ContributingService } from './contributing.service';
import {
  GenerateContributingMd,
  GenerateContributingMdSchema,
} from './schemas/generateContributing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contributing.name, schema: ContributingShema },
      {
        name: GenerateContributingMd.name,
        schema: GenerateContributingMdSchema,
      },
    ]),
  ],
  controllers: [ContributingController],
  providers: [ContributingService],
  exports: [ContributingService],
})
export class ContributingModule {}
