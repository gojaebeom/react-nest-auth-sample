import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.APP_PORT;
  await app.listen(PORT);
}
bootstrap();
