import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadmeMd, ReadmeMdSchema } from './schemas/readme.schema';
import {
  GenerateReadmeMd,
  GenerateReadmeMdSchema,
} from './schemas/generateReadme.schema';
import { ReadmeController } from './readme.controller';
import { ReadmeService } from './readme.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadmeMd.name, schema: ReadmeMdSchema },
      { name: GenerateReadmeMd.name, schema: GenerateReadmeMdSchema },
    ]),
  ],
  controllers: [ReadmeController],
  providers: [ReadmeService],
  exports: [ReadmeService],
})
export class ReadmeModule {}
