import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ collection: 'posts' })
export class Post {
  @Prop()
  post: string;

  @Prop()
  date_entry: Date;

  @Prop()
  user_id: string;

  @Prop()
  community_id: string; // id de la comunidad
}

export const PostSchema = SchemaFactory.createForClass(Post);
