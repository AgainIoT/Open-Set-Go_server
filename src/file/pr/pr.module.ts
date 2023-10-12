import { Module } from '@nestjs/common';
import { PrService } from './pr.service';
import { PrController } from './pr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pr, PrSchema } from './schemas/pr.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pr.name, schema: PrSchema }])],
  controllers: [PrController],
  providers: [PrService],
  exports: [PrService],
})
export class PrModule {}
