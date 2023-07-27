import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import axios from 'axios';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config({
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
