import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';


export type ReservationDocument = Reservation & Document;

@Schema({ collection: 'reservations' })
export class Reservation {
    
    @Prop()
    start_time: string;

    @Prop()
    finish_time: string;

    @Prop()
    status: string;

    @Prop()
    date_entry: Date;

    @Prop()
    common_area_id: string;

    @Prop()
    user_id: string
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation); 