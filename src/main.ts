import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger  = new Logger("GPYP-API")
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  await app.listen(envs.PORT);
  logger.log(`Api is running on port: ${envs.PORT}`)
}
bootstrap();
