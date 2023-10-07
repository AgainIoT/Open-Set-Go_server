import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RepoModule } from './repo/repo.module';
import { FilesModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { SentiModule } from './senti/senti.module';
import * as Joi from 'joi';

@Module({
  imports: [
    RepoModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        CLIENT_ID: Joi.string().required(),
        CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        ORIGIN: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule,
    MailModule,
    SentiModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
