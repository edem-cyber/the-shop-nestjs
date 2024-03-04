import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: 'https://a8a99ac2b8ebc4f93a43fffa3696a0b7@o4505333410496512.ingest.sentry.io/4506760845852672',
    integrations: [new ProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

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
  app.enableCors();
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());
  await app.listen(3000);
}
bootstrap();
