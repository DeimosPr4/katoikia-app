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

  @MessagePattern({ cmd: 'findAllCommunities' })
  findAll() {
    return this.communitiesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCommunity' })
  findOne(@Payload() id: string) {
    let _id = id['_id'];
    return this.communitiesService.findOne(_id);
  }

  @MessagePattern({ cmd: 'findCommunityName' })
  findOneName(@Payload() id: string) {
    let _id = id['id'];
    return this.communitiesService.findOneName(_id);
  }

  /* @MessagePattern({cmd: 'findCommunityAdmin'})
  findCommunityAdmin(@Payload() community: any) {
    let _community = community['community_id'];
    return this.communitiesService.findCommunityAdmin(_community, "2");
  }*/

  @MessagePattern({ cmd: 'updateCommunity' })
  update(@Payload() community: CommunityDocument) {
    return this.communitiesService.update(community.id, community);
  }

  @MessagePattern({ cmd: 'removeCommunity' })
  remove(@Payload() id: string) {
    let _id = id['_id'];
    return this.communitiesService.remove(_id);
  }
}
