import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICIO_RESERVACIONES",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3006
        }
      }
    ]),
    MongooseModule.forRoot(`mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_reservaciones?retryWrites=true&w=majority`),
    ReservationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
