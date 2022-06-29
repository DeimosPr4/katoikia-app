import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICIO_USUARIOS",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3001
        }
      }
    ]),
    ClientsModule.register([
      {
        name: "SERVICIO_COMUNIDADES",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3002
        }
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
