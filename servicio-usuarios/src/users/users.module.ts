import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
