import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ collection: 'users'})
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
  phone: string;

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

  @Prop()
  number_house?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);