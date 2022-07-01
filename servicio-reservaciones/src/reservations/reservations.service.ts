import { Injectable } from '@nestjs/common';
import { Reservation, ReservationDocument} from '../schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  create(Reservation: ReservationDocument) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, Reservation: ReservationDocument) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
