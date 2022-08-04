import { Module } from '@nestjs/common';
import { CommunitiesModule } from './communities/communities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICIO_COMUNIDADES',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
    ]),
    MongooseModule.forRoot(
      `mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_comunidades?retryWrites=true&w=majority`,
    ),
    CommunitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
