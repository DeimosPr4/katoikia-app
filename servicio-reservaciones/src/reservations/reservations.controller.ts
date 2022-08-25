import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.schema';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern({ cmd: 'createReservation' })
  create(@Payload() reservation: ReservationDocument) {
    return this.reservationsService.create(reservation);
  }

  @MessagePattern({ cmd: 'findAllReservations' })
  findAll() {
    console.log(this.reservationsService.findAll());

    return this.reservationsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneReservation' })
  findOne(@Payload() id: string) {
    let _id = id['id'];
    return this.reservationsService.findOne(_id);
  }

  @MessagePattern({ cmd: 'findReservationsByCommunity' })
  findReservationsByCommunity(@Payload() body: string) {
    let community_id = body['community_id'];
    return this.reservationsService.findReservationsByCommunity(community_id);
  }

  @MessagePattern({ cmd: 'updateReservation' })
  update(@Payload() reservation: ReservationDocument) {
    return this.reservationsService.update(reservation.id, reservation);
  }

  @MessagePattern({ cmd: 'removeReservation' })
  remove(@Payload() id: string) {
    let _id = id['id'];
    return this.reservationsService.remove(_id);
  }

  @MessagePattern({ cmd: 'removeIdCommunity' })
  removeIdCommunity(@Payload() reservation: any) {
    let community_id =  reservation['community_id'];
    return this.reservationsService.removeIdCommunity(community_id);
  }
}
