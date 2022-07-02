import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
  imports: [
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
    NotificationsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
