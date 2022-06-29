import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


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
}



export const CommunitySchema = SchemaFactory.createForClass(Community); 