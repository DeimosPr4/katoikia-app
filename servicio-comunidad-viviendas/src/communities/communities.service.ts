import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Community, CommunityDocument } from 'src/schemas/community.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException, ClientProxy } from '@nestjs/microservices';
import { from, lastValueFrom, map, scan, mergeMap } from 'rxjs';
import { Admin } from 'src/schemas/admin.entity';
import { appendFileSync } from 'fs';
import { Tenant, TenantSchema } from 'src/schemas/tenant.schema';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Community.name)
    private readonly communityModel: Model<CommunityDocument>,
    @Inject('SERVICIO_USUARIOS') private readonly clientUserApp: ClientProxy,
    @Inject('SERVICIO_AREAS_COMUNES') private readonly clientAreaApp: ClientProxy,
    @Inject('SERVICIO_RESERVACIONES') private readonly clientReservationApp: ClientProxy,
  ) { }

  async create(community: CommunityDocument): Promise<Community> {
    return this.communityModel.create(community);
  }

  async findAll(): Promise<Community[]> {
    return await this.communityModel
      .find()
      .setOptions({ sanitizeFilter: true })
      .exec()
      .then(async (community) => {
        if (community) {
          await Promise.all(
            community.map(async (c) => {
              //buscar al usuario con el id de la comunidad anexado
              let admin = await this.findCommunityAdmin(c['_id'], '2');
              if (admin) {
                c['id_admin'] = admin['_id'];
                c['name_admin'] = admin['name'];
              }
              return c;
            }),
          );
        }
        return community;
      });
  }

  findOne(id: string): Promise<Community> {
    return this.communityModel.findOne({ _id: id }).exec();
  }
  findOneName(id: string): Promise<Community> {
    return this.communityModel.findOne({ _id: id }).exec();
  }

  update(id: string, community: CommunityDocument) {
    return this.communityModel.findOneAndUpdate({ _id: id }, community, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.removeIdCommunity(id);
    return this.communityModel.findOneAndUpdate({ _id: id }, { status: '-1' }, {
      new: true,
    });
  }

  async changeStatus(id: string, status: string) {
    return this.communityModel.findOneAndUpdate({ _id: id }, { status: status }, {
      new: true,
    });
  }

  async findCommunityAdmin(community: string, user_type: string) {
    const pattern = { cmd: 'findOneCommunityUser' };
    const payload = { community_id: community, user_type: user_type };

    let callback = await this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((response: string) => ({ response })));

    const finalValue = await lastValueFrom(callback);
    return finalValue['response'];
  }

  async saveTenant(id: string, number_house: string, ptenant_id: string) {
    let community = await this.findOne(id);
    await community.houses.map(house => {
      if (house.number_house == number_house) {
        if (house.tenants) {
          house.tenants.tenant_id = ptenant_id
        } else {
          let tenant = new Tenant()
          tenant.tenant_id = ptenant_id;
          house.tenants = tenant;
        }
        house.state = "ocupada"
      }
      return house;
    })
    return await this.communityModel.findOneAndUpdate({ _id: id }, community, {
      new: true,
    });
  }

  async deleteTenant(id: string, number_house: string, tenant_id: string) {
    let community = await this.findOne(id);

    await community.houses.map(house => {
      if (house.number_house === number_house) {
        if(house.tenants)
          house.tenants.tenant_id = "";
        house.state = "desocupada"
      }
      return house;
    })
    return await this.communityModel.findOneAndUpdate({ _id: id }, community, {
      new: true,
    });
  }

  async removeIdCommunity(community: string) {
    const pattern = { cmd: 'removeIdCommunity' };
    const payload = { community_id: community };

    await this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((response: string) => ({ response })));

    const pattern2 = { cmd: 'removeIdCommunity' };
    const payload2 = { community_id: community };

    await this.clientAreaApp
      .send<string>(pattern2, payload2)
      .pipe(map((response: string) => ({ response })));

    const pattern3 = { cmd: 'removeIdCommunity' };
    const payload3 = { community_id: community };

    await this.clientReservationApp
      .send<string>(pattern3, payload3)
      .pipe(map((response: string) => ({ response })));
  }
}
