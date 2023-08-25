import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './commons/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RepoModule,
    FilesModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
