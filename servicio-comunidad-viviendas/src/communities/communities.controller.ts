import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommunitiesService } from './communities.service';
import { Community, CommunityDocument } from 'src/schemas/community.schema';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @MessagePattern({ cmd: 'createCommunity' })
  create(@Payload() community: CommunityDocument) {
    return this.communitiesService.create(community);
  }

  @MessagePattern({cmd: 'findAllCommunities'})
  findAll() {
    return this.communitiesService.findAll();
  }

  @MessagePattern({cmd: 'findOneCommunity'})
  findOne(@Payload() id: string) {
    return this.communitiesService.findOne(id);
  }

  @MessagePattern({cmd: 'updateCommunity'})
  update(@Payload() community: CommunityDocument) {
    return this.communitiesService.update(community.id, community);
  }

  @MessagePattern({cmd: 'removeCommunity'})
  remove(@Payload() id: string) {
    return this.communitiesService.remove(id);
  }
}
