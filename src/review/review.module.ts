import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ReviewService } from './review.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
