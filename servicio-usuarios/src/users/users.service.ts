import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: UserDocument): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> { 
    return this.userModel
      .find() 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByDNI(dni: string): Promise<User> {
    return this.userModel.findOne({ dni: dni }).exec();
  }

  async update(id: string, user: UserDocument) {
    return this.userModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });
  }


  async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
