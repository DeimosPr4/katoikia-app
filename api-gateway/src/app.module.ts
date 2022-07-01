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
    ClientsModule.register([
      {
        name: "SERVICIO_AREAS_COMUNES",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3003
        }
      }
    ]),
    ClientsModule.register([
      {
        name: "SERVICIO_INVITADOS",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3004
        }
      }
    ]),
    ClientsModule.register([
      {
        name: "SERVICIO_PAGOS",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3005
        }
      }
    ]),
    
    ClientsModule.register([
      {
        name: "SERVICIO_NOTIFICACIONES",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3009
        }
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
