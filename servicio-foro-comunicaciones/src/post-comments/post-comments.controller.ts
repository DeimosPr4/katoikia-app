import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostCommentsService } from './post-comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Controller()
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @MessagePattern('createPostComment')
  create(@Payload() createPostCommentDto: CreatePostCommentDto) {
    return this.postCommentsService.create(createPostCommentDto);
  }

  @MessagePattern('findAllPostComments')
  findAll() {
    return this.postCommentsService.findAll();
  }

  @MessagePattern('findOnePostComment')
  findOne(@Payload() id: number) {
    return this.postCommentsService.findOne(id);
  }

  @MessagePattern('updatePostComment')
  update(@Payload() updatePostCommentDto: UpdatePostCommentDto) {
    return this.postCommentsService.update(updatePostCommentDto.id, updatePostCommentDto);
  }

  @MessagePattern('removePostComment')
  remove(@Payload() id: number) {
    return this.postCommentsService.remove(id);
  }
}
