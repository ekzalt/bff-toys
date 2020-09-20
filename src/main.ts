import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';

import { config } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security
  app.use(helmet());
  // cors
  app.enableCors();

  await app.listen(config.appPort);
}

bootstrap();
