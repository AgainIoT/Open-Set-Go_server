import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ReviewService } from './review.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, UserModule, FileModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
