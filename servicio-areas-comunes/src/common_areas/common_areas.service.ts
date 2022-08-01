import { Injectable } from '@nestjs/common';
import { CommonArea, CommonAreaDocument } from 'src/schemas/common_area.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommonAreasService {
  constructor(
    @InjectModel(CommonArea.name)
    private readonly commonAreaModel: Model<CommonAreaDocument>,
  ) {}

  async create(commonArea: CommonAreaDocument): Promise<CommonArea> {
    return this.commonAreaModel.create(commonArea);
  }

  async findAll(): Promise<CommonArea[]> {
    return this.commonAreaModel
      .find()
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  findOne(id: string): Promise<CommonArea> {
    return this.commonAreaModel.findOne({ _id: id }).exec();
  }

  update(id: string, commonArea: CommonAreaDocument) {
    return this.commonAreaModel.findOneAndUpdate({ _id: id }, commonArea, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.commonAreaModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }

  async findByCommunity(community_id: string): Promise<CommonArea[]> {
    return this.commonAreaModel.find({ community_id: community_id }).exec();
  }

}
