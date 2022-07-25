import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICIO_PAGOS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3005,
        },
      },
    ]),
    MongooseModule.forRoot(
      `mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_pagos?retryWrites=true&w=majority`,
    ),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
