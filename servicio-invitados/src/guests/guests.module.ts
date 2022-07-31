import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsController } from './guests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guest, GuestSchema } from 'src/schemas/guest.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}
