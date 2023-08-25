import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = parseInt(process.env.PORT) || 8080;

async function OpenSetGo() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT, () => {
    Logger.log(`Open-Set-Go Server is listening on port ${PORT}!`);
  });
}

OpenSetGo();
