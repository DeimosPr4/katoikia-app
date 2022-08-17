import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

import { RpcException, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('SERVICIO_NOTIFICACIONES') private readonly clientNotificationtApp: ClientProxy,
    @Inject('SERVICIO_COMUNIDADES') private readonly clientCommunityApp: ClientProxy,

  ) { }
  private publicKey: string;
  async create(user: UserDocument): Promise<User> {
    let passwordEncriptada = Md5.init(user.password);
    user.password = passwordEncriptada;
    return this.userModel.create(user);
  }


  async createAdminCommunity(user: UserDocument) {
    let password = user.password;
    let passwordEncriptada = Md5.init(user.password);
    user.password = passwordEncriptada;

    this.userModel.create(user)


    let community = await this.findCommunity(user.community_id);
    user.community_id = community['name'];

    const pattern = { cmd: 'emailCreateUserAdminCommunity' };
    const payload = {
      email: user['email'], password: password, name: user['name'],
      date_entry: user['date_entry'], community_name: community['name']
    };
    return this.clientNotificationtApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  async findCommunity(community_id: string) {
    const pattern = { cmd: 'findOneCommunity' }
    const payload = { _id: community_id }

    let callback = await this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )
    const finalValue = await lastValueFrom(callback);
    return finalValue['response'];

  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().setOptions({ sanitizeFilter: true }).exec();
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

 /* async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }*/

  async remove(id: string) {
    return this.userModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }

  //inicio de sesion
  async findLogin(email: string, password: string): Promise<User> {
    let repo1 = this.userModel;
    let userReturn = new Promise<User>((resolve, reject) => {
      let repo = repo1;

      repo.find({ email: email }).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          let passwordEncriptada = Md5.init(password);
          if (res[0].password == passwordEncriptada) {
            resolve(res[0]);
          } else {
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


  //find inquilinos
  async findTenants(): Promise<User[]> {
    return this.userModel.find({ user_type: 3 }).exec();
  }


  //find inquilinos
  async findTenantsCommunity(pcommunity_id: string) {
    //let tenants = await this.findCommunityTenants(pcommunity_id);



    return await this.userModel.find({ community_id: pcommunity_id, user_type: 4 })
      .then(async (users) => {
        if (users) {
          await Promise.all(
            users.map(async (u) => {
              //buscar al usuario con el id de la comunidad anexado
              let number_house = await this.findNumHouseTenant(pcommunity_id, u['_id']);
              u['number_house'] = number_house;
              return u;
            }),
          )
        }
        return users;
      })
  }

  async testSendMail(user: UserDocument) {
    let passwordEncriptada = Md5.init(user.password);
    user.password = passwordEncriptada;
    this.userModel.create(user);
    /*.then(() => {
      
    } );*/

    const pattern = { cmd: 'html' };
    const payload = { email: user['email'], name: user['name'] };
    return this.clientNotificationtApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  async findCommunityUser(
    community_id: string,
    user_type: number,
  ): Promise<User> {
    return this.userModel
      .findOne({ community_id: community_id, user_type: user_type })
      .exec();
  }

  async deleteAdminSystem(id: string) {
    return this.userModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }

  async validateEmail(email: string) {
    let repo1 = this.userModel;
    return new Promise<User>((resolve, reject) => {
      let repo = repo1;

      repo.find({ email: email }).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            return res;
          }
        }
      });
    });
  }

  async findNumHouseTenant(community_id: string, tenant_id: string) {
    const pattern = { cmd: 'findOneCommunity' }
    const payload = { _id: community_id }

    let callback = await this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )
    const finalValue = await lastValueFrom(callback);
    const response = finalValue['response'];
    const houses = response['houses'];
    let num_house = "";
    await houses.forEach(async house => {
        if (tenant_id == house.tenants.tenant_id) {
          num_house = house.number_house;
        }
    })
    return num_house;
  }

  async changeStatus(id: string, status: string) {
    return this.userModel.findOneAndUpdate({ _id: id }, {status: status}, {
      new: true,
    });  
  }


  async saveTenantNumHouse(community_id: string, number_house:string, tenant_id: string) {
    const pattern = { cmd: 'saveTenant' }
    const payload = { _id: community_id, number_house: number_house,  tenant_id: tenant_id }

    return await this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )
  }
}

