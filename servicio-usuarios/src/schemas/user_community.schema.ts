
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserCommunityDocument = UserCommunity & Document;


@Schema({ collection: 'users_communities' })
export class UserCommunity {

    @Prop()
    user_id: string;

    @Prop()
    community_id: string;

   
}



export const UserCommunitySchema = SchemaFactory.createForClass(UserCommunity); 