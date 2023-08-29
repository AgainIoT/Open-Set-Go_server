import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadmeMd, ReadmeMdSchema } from './schemas/readme.schema';
import { ReadmeController } from './readme.controller';
import { ReadmeService } from './readme.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadmeMd.name, schema: ReadmeMdSchema },
    ]),
  ],
  controllers: [ReadmeController],
  providers: [ReadmeService],
  exports: [ReadmeService],
})
export class ReadmeModule {}
