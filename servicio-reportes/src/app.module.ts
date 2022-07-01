import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from "@nestjs/microservices";



@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICIO_REPORTES",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3008
        }
      }
    ]),
    MongooseModule.forRoot(`mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_reportes?retryWrites=true&w=majority`),
    ReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
