import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostCommentsService } from './post-comments.service';
import { Comment, CommentDocument } from '../schemas/post-comment.schema';

@Controller()
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @MessagePattern({ cmd: 'createComment' })
  create(@Payload() comment: CommentDocument) {
    return this.postCommentsService.create(comment);
  }

  @MessagePattern({ cmd: 'findAllComments' })
  findAll() {
    return this.postCommentsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneComment' })
  findOne(@Payload() id: string) {
    let _id = id['id'];
    return this.postCommentsService.findOne(_id);
  }

  @MessagePattern({ cmd: 'updateComment' })
  update(@Payload() comment: CommentDocument) {
    return this.postCommentsService.update(comment.id, comment);
  }

  @MessagePattern({ cmd: 'removeComment' })
  remove(@Payload() id: string) {
    let _id = id['id'];
    return this.postCommentsService.remove(_id);
  }
}
