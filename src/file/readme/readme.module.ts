import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Readme, ReadmeSchema } from './schemas/readme.schema';
import {
  GenerateReadmeMd,
  GenerateReadmeMdSchema,
} from './schemas/generateReadme.schema';
import { ReadmeController } from './readme.controller';
import { ReadmeService } from './readme.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Readme.name, schema: ReadmeSchema },
      { name: GenerateReadmeMd.name, schema: GenerateReadmeMdSchema },
    ]),
  ],
  controllers: [ReadmeController],
  providers: [ReadmeService],
  exports: [ReadmeService],
})
export class ReadmeModule {}
