import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = parseInt(process.env.PORT) || 8080;

async function OpenSetGo() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    Logger.log(`Open-Set-Go Server is listening on port ${PORT}!`);
  });
}

OpenSetGo();
