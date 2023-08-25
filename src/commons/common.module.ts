import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { JwtAccessStrategy } from './jwt/jwt-access.strategy';

@Module({
  imports: [],
  providers: [JwtRefreshStrategy, JwtAccessStrategy],
  exports: [JwtRefreshStrategy, JwtAccessStrategy],
})
export class CommonModule {}
