import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommonAreaDocument } from 'src/schemas/common_area.schema';
import { CommonAreasService } from './common_areas.service';

@Controller()
export class CommonAreasController {
  constructor(private readonly commonAreasService: CommonAreasService) {}

  @MessagePattern({cmd: 'createCommonArea'})
  create(@Payload() commonArea: CommonAreaDocument) {
    return this.commonAreasService.create(commonArea);
  }

  @MessagePattern({cmd: 'findAllCommonAreas'})
  findAll() {
    return this.commonAreasService.findAll();
  }

  @MessagePattern({cmd: 'findOneCommonArea'})
  findOne(@Payload() id: string) {
    return this.commonAreasService.findOne(id);
  }

  @MessagePattern({cmd: 'updateCommonArea'})
  update(@Payload() commonArea: CommonAreaDocument) {
    return this.commonAreasService.update(commonArea.id, commonArea);
  }

  @MessagePattern({cmd: 'removeCommonArea'})
  remove(@Payload() id: string) {
    return this.commonAreasService.remove(id);
  }
}
