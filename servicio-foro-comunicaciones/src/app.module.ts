import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICIO_POSTS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3007,
        },
      },
    ]),
    MongooseModule.forRoot(
      `mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_posts?retryWrites=true&w=majority`,
    ),
    PostsModule,
    PostCommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
