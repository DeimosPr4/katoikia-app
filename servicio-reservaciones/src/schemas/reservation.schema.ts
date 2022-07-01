

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ReservationDocument = Reservation & Document;

export class Reservation {


}


export const ReservationSchema = SchemaFactory.createForClass(Reservation); 