import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimmerInterceptor } from './common/interceptors/timmer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimmerInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.APP_PORT;
  await app.listen(PORT);
}
bootstrap();
