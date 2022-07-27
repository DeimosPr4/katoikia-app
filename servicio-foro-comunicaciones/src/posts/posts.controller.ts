import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsService } from './posts.service';
import { Post, PostDocument } from '../schemas/post.schema';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern({ cmd: 'createPost' })
  create(@Payload() post: PostDocument) {
    return this.postsService.create(post);
  }

  @MessagePattern({ cmd: 'findAllPosts' })
  findAll() {
    return this.postsService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePost' })
  findOne(@Payload() id: string) {
    let _id = id['id'];
    return this.postsService.findOne(_id);
  }

  @MessagePattern({ cmd: 'updatePost' })
  update(@Payload() post: PostDocument) {
    return this.postsService.update(post.id, post);
  }

  @MessagePattern({ cmd: 'removePost' })
  remove(@Payload() id: string) {
    let _id = id['id'];
    return this.postsService.remove(_id);
  }
}
