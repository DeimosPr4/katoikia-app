import { Injectable } from '@nestjs/common';
import { Guest, GuestDocument } from 'src/schemas/guest.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest.name) private readonly guestModel: Model<GuestDocument>,
  ) {}

  async create(guest: GuestDocument): Promise<Guest> {
    return this.guestModel.create(guest);
  }

  async findAll(): Promise<Guest[]> {
    return this.guestModel.find().setOptions({ sanitizeFilter: true }).exec();
  }

  findOneId(id: string): Promise<Guest> {
    return this.guestModel.findOne({ _id: id }).exec();
  }

  findOne(id: string): Promise<Guest> {
    return this.guestModel.findOne({ dni: id }).exec();
  }

  update(id: string, guest: GuestDocument) {
    return this.guestModel.findOneAndUpdate({ _id: id }, guest, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.guestModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }
}
