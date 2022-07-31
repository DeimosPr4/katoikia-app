import { Module } from '@nestjs/common';
import { CommonAreasModule } from './common_areas/common_areas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICIO_AREAS_COMUNES',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
    ]),
    MongooseModule.forRoot(
      `mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_areas_comunes?retryWrites=true&w=majority`,
    ),
    CommonAreasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
