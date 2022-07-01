import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Community, CommunityDocument } from 'src/schemas/community.schema'; 
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express'; 

@Injectable()
export class CommunitiesService {

  constructor(
    @InjectModel(Community.name) private readonly communityModel: Model<CommunityDocument>,
  ) {}

  async create(community: CommunityDocument): Promise<Community> {
    return this.communityModel.create(community);
  }

  async findAll(): Promise<Community[]> { 
    return this.communityModel
      .find() 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  findOne(id: string): Promise<Community> {
    return this.communityModel.findOne({ _id: id }).exec();
  }

  update(id: string, community: CommunityDocument) {
    return this.communityModel.findOneAndUpdate({ _id: id }, community, {
      new: true,
    });
  }


  


  async remove(id: string) {
    return this.communityModel.findByIdAndRemove({ _id: id }).exec();
  }
}
