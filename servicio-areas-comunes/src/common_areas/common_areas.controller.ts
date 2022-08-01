import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommonAreaDocument } from 'src/schemas/common_area.schema';
import { CommonAreasService } from './common_areas.service';

@Controller()
export class CommonAreasController {
  constructor(private readonly commonAreasService: CommonAreasService) {}

  @MessagePattern({ cmd: 'createCommonArea' })
  create(@Payload() commonArea: CommonAreaDocument) {
    return this.commonAreasService.create(commonArea);
  }

  @MessagePattern({ cmd: 'findAllCommonAreas' })
  findAll() {
    return this.commonAreasService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCommonArea' })
  findOne(@Payload() id: string) {
    let _id = id['_id'];
    return this.commonAreasService.findOne(_id);
  }

  @MessagePattern({ cmd: 'updateCommonArea' })
  update(@Payload() commonArea: CommonAreaDocument) {
    return this.commonAreasService.update(commonArea.id, commonArea);
  }

  @MessagePattern({ cmd: 'removeCommonArea' })
  remove(@Payload() id: string) {
    let _id = id['_id'];
    return this.commonAreasService.remove(_id);
  }

  @MessagePattern({ cmd: 'findByCommunity' })
  findByCommunity(@Payload() id: string) {
    let _community_id = id['community_id'];
    return this.commonAreasService.findByCommunity(_community_id);
  }
}
