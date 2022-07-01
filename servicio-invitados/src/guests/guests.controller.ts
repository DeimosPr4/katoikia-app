import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuestsService } from './guests.service';
import { Guest, GuestDocument } from 'src/schemas/guest.schema';

@Controller()
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @MessagePattern( {cmd:'createGuest'})
  create(@Payload() guest: GuestDocument) {
    return this.guestsService.create(guest);
  }

  @MessagePattern( {cmd:'findAllGuests'})
  findAll() {
    return this.guestsService.findAll();
  }

  @MessagePattern( {cmd:'findOneGuest'})
  findOneById(@Payload() id: string) {
    let _id = id['_id'];
    return this.guestsService.findOneId(_id);
  }

  @MessagePattern( {cmd:'findGuestDNI'})
  findOneByDNI(@Payload() id: string) {
    let dni = id['dni'];
    return this.guestsService.findOne(dni);
  }

  @MessagePattern( {cmd:'updateGuest'})
  update(@Payload() guest: GuestDocument) {
    return this.guestsService.update(guest.id, guest);
  }

  @MessagePattern( {cmd:'removeGuest'})
  remove(@Payload() id: string) {
    let dni = id['dni'];
    return this.guestsService.remove(dni);
  }
}
