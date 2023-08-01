import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config({
  path: `./${process.env.NODE_ENV}.env`,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,

    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Observe',
      'authorization',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('APPLICATION APIs')
    .setDescription('API descriptions')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(cookieParser());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT);
  console.log(process.env.DB_DATABASE);
}
bootstrap();
