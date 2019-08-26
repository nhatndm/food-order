import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Food Order Api Documentation')
    .setDescription('This is documentation for api implementation')
    .setVersion('1.0.0')
    .setSchemes('http')
    .setBasePath('v1/')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1/doc', app, document);

  await app.listen(3000);
}

bootstrap();
