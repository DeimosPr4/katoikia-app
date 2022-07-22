import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from "md5-typescript";
import { map } from 'rxjs/operators';

import { RpcException, ClientProxy } from '@nestjs/microservices';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('SERVICIO_NOTIFICACIONES') private readonly clientNotificationtApp: ClientProxy,

  ) { }
  private publicKey: string; 
  async create(user: UserDocument): Promise<User> {
    let passwordEncriptada = Md5.init(user.password);
    user.password = passwordEncriptada;
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
  async findLogin(email: string, password: string): Promise<User> {
    let repo1 = this.userModel;
    let userReturn = new Promise<User>((resolve, reject) => {
      let repo = repo1;

      repo.find({ email: email }).exec((err, res) => {
        if (err) {
          reject(err);
        }
        else {
          let passwordEncriptada = Md5.init(password);
          if (res[0].password == passwordEncriptada) {
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

  async testSendMail(user: UserDocument) {
    let passwordEncriptada = Md5.init(user.password);
    user.password = passwordEncriptada;
    this.userModel.create(user)
    /*.then(() => {
      
    } );*/

    const pattern = { cmd: 'html' };
    const payload = { email: user['email'], name: user['name'] };
    return this.clientNotificationtApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }



  async findCommunityUser(community_id: string, user_type: number): Promise<User> {
    return this.userModel.findOne({ community_id: community_id, user_type: user_type }).exec();
  }


}
