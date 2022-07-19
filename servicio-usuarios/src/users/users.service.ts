import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import {Md5} from "md5-typescript";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  private publicKey: string;
  async create(user: UserDocument): Promise<User> {
    let passwordEncriptada=Md5.init(user.password);
    user.password=passwordEncriptada;
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

  //inicio de sesion
  async findLogin(email: string, password: string) : Promise<User> {
    let repo1=this.userModel;
    let userReturn = new Promise<User>((resolve, reject) => {
      let repo =repo1;

      repo.find({ email : email }).exec((err, res) => {
        if (err) {
          reject(err);
        }
        else {
          let passwordEncriptada=Md5.init(password);
          if (res[0].password==passwordEncriptada) {
            resolve(res[0]);
          }
          else {
            resolve(null);
          }
        }
      });
    });
    
    return userReturn;    
  }

  //find admin del sistema
  async allUsersAdminSistema(): Promise<User[]> { 
    return this.userModel.find({ user_type: 1 }).exec();
  }

  //find admin del sistema
  async findGuardsCommunity(pcommunity_id: string): Promise<User[]> { 
    return this.userModel.find({ user_type: 4 }).exec();
  }
    //find admin de comunidad
    async allUsersAdminComunidad(): Promise<User[]> { 
      return this.userModel.find({ user_type: 2 }).exec();   
    }

    
}
