import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setContact('Edem Agbkape', 'www.edemkojo.com.', 'edem.agbakpe@outlook.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setExternalDoc('Find more about NestJS', 'https://docs.nestjs.com')
    .setTermsOfService('https://www.edemkojo.com/terms')
    .setDescription('The description of my API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
