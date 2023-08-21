import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { FilesModule } from './files/files.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    RepoModule,
    FilesModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService, ConfigService],
})
export class AppModule {}
