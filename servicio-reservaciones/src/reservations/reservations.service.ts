import { Injectable } from '@nestjs/common';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  create(reservation: ReservationDocument) {
    return this.reservationModel.create(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel.findOne({ _id: id }).exec();
  }

  async findOneByDNI(dni: string): Promise<Reservation> {
    return this.reservationModel.findOne({ dni: dni }).exec();
  }

  async update(id: string, reservation: ReservationDocument) {
    return this.reservationModel.findOneAndUpdate({ _id: id }, reservation, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.reservationModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }

  async removeIdCommunity(community_id: string){
    await this.reservationModel.updateMany({community_id: community_id}, {"$set":{"status": '-1'}});
  }


  async findReservationsByCommunity(community_id: string){
    return this.reservationModel.find({ community_id: community_id }).exec();
  }

  async findReservationUser(id: string): Promise<Reservation[]> {
    return this.reservationModel.find({user_id:id}).setOptions({ sanitizeFilter: true }).exec();

  }
}
