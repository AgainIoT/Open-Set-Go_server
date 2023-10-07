import { Module } from '@nestjs/common';
import { SentiController } from './senti.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SentiService } from './senti.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [SentiController],
  providers: [SentiService],
})
export class SentiModule {}
