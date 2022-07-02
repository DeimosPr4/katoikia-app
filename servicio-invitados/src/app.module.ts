import { Module } from '@nestjs/common';
import { GuestsModule } from './guests/guests.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
  imports: [
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
    MongooseModule.forRoot(`mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_invitados?retryWrites=true&w=majority`),
    GuestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
