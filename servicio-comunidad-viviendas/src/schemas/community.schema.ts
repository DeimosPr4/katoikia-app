import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { House, HouseSchema } from './house.schema';


export type CommunityDocument = Community & Document;

@Schema({ collection: 'communities' })
export class Community {
    @Prop()
    id_admin: string;

    @Prop()
    name_admin: string ;

    @Prop()
    name: string;

    @Prop()
    province: string;

    @Prop()
    canton: string;

    @Prop()
    district: string;

    @Prop()
    num_houses: number;

    @Prop()
    phone: string;

    @Prop()
    status: string;

    @Prop()
    date_entry: Date;

    @Prop({ type: [HouseSchema] })
    houses: Array<House>;

}


export const CommunitySchema = SchemaFactory.createForClass(Community); 