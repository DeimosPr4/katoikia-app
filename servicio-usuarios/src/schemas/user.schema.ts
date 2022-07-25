import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  dni: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop()
  user_type: string;

  @Prop()
  status: string;

  @Prop()
  date_entry: Date;

  @Prop()
  community_id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
