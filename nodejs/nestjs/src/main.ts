import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { WHITELISTED_ORIGINS_CORS } from './utils';

async function server() {
  const app = await NestFactory.create(AppModule, { rawBody: true }); // raw body text for webhook payload validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  })); // transform: true to handle DTO field transformation

  // Handle Cors
  const corsOptions: CorsOptions = {
    origin: WHITELISTED_ORIGINS_CORS,
  };
  app.enableCors(corsOptions);

  // Swagger API documentation, hosted at /docs
  const config = new DocumentBuilder()
    .setTitle('API Specification')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 5000);
}

server();
