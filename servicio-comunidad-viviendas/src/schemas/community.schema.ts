import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { House, HouseSchema } from './house.schema';


export type CommunityDocument = Community & Document;

@Schema({ collection: 'communities' })
export class Community {

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
    phone: number;

    @Prop()
    quote: number;

    @Prop()
    status: string;

    @Prop()
    date_entry: Date;

    @Prop({ type: HouseSchema })
    houses: House
}


export const CommunitySchema = SchemaFactory.createForClass(Community); 