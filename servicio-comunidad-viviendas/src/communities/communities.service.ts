import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Community, CommunityDocument } from 'src/schemas/community.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException, ClientProxy } from '@nestjs/microservices';
import { from, lastValueFrom, map, scan, mergeMap } from 'rxjs';
import { Admin } from 'src/schemas/admin.entity';
import { appendFileSync } from 'fs';


@Injectable()
export class CommunitiesService {

  constructor(
    @InjectModel(Community.name) private readonly communityModel: Model<CommunityDocument>,
    @Inject('SERVICIO_USUARIOS') private readonly clientUserApp: ClientProxy,

  ) { }

  async create(community: CommunityDocument): Promise<Community> {
    return this.communityModel.create(community);
  }

  async findAll(): Promise<Community[]> {

    return await this.communityModel
      .find()
      .setOptions({ sanitizeFilter: true })
      .exec()
      .then( async community => {
        if(community){
          await Promise.all(community.map(async c => {
            let admin = await this.findCommunityAdmin(c["_id"], "2")
            if(admin){
              c["id_admin"] = admin["_id"]
              c["name_admin"] = admin["name"]
            }
            return c
          }))

          console.log(community)
        }
        
        return  community;
      })

    //buscar al usuario con el id de la comunidad anexado
  }

  findOne(id: string): Promise<Community> {
    return this.communityModel.findOne({ _id: id }).exec();
  }
  findOneName(id: string): Promise<Community> {
    return this.communityModel.findOne({ _id: "62be68215692582bbfd77134" }).exec();
  }

  update(id: string, community: CommunityDocument) {
    return this.communityModel.findOneAndUpdate({ _id: id }, community, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.communityModel.findByIdAndRemove({ _id: id }).exec();
  }

  async findCommunityAdmin(community: string, user_type: string) {
    const pattern = { cmd: 'findOneCommunityUser' }
    const payload = { community_id: community, user_type: user_type }

    let callback = await this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )

    const finalValue = await lastValueFrom(callback);
    return finalValue['response'];

  }
}
