import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationDocument} from '../schemas/reservation.schema';


@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern({cmd:'createReservation'})
  create(@Payload() reservation: ReservationDocument) {
    return this.reservationsService.create(reservation);
  }

  @MessagePattern({cmd: 'findAllReservations'})
  findAll() {
    return this.reservationsService.findAll();
  }

  @MessagePattern({cmd: 'findOneReservation'})
  findOne(@Payload() id: number) {
    return this.reservationsService.findOne(id);
  }

  @MessagePattern({cmd: 'updateReservation'})
  update(@Payload() reservation: ReservationDocument) {
    return this.reservationsService.update(reservation.id, reservation);
  }

  @MessagePattern({cmd: 'removeReservation'})
  remove(@Payload() id: number) {
    return this.reservationsService.remove(id);
  }
}
