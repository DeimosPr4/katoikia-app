import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors= require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(4000);
  //app.use(cors(enableCors))
}
bootstrap();
