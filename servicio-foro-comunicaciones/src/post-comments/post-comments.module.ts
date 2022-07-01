import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';

@Module({
  controllers: [PostCommentsController],
  providers: [PostCommentsService]
})
export class PostCommentsModule {}
