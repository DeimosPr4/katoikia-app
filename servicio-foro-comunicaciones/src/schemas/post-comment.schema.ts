import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ collection: 'comments' })
export class Comment {
  @Prop()
  comment: string;

  @Prop()
  date_entry: Date;

  @Prop()
  user_id: string;

  @Prop()
  post_id: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
