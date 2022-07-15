import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors= require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  app.use(cors());
}
bootstrap();
