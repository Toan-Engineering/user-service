import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { config, setupSwagger } from './libs';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  
  setupSwagger(app);
  await app.listen(config.app.port);

  console.log(`Application is running in the ${config.app.nodeEnvironment} environment.`);
  console.log(`Application is running on: http://localhost:${config.app.port}/api`);
  console.log(`Swagger documentation is available at: http://localhost:${config.app.port}/api`);
}
bootstrap();
