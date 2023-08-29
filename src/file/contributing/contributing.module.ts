import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContributingMd,
  ContributingShema,
} from './schemas/contributing.schema';
import { ContributingController } from './contributing.controller';
import { ContributingService } from './contributing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContributingMd.name, schema: ContributingShema },
    ]),
  ],
  controllers: [ContributingController],
  providers: [ContributingService],
  exports: [ContributingService],
})
export class ContributingModule {}
