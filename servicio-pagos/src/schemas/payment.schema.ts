
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PaymentDocument = Payment & Document;

@Schema({ collection: 'payments' })
export class Payment {

    @Prop()
    date_payment: Date;

    @Prop()
    mount: number;

    @Prop()
    description: string;

    @Prop()
    period: string;

    @Prop()
    status: string;

    @Prop()
    user_id: string;

    @Prop()
    communty_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment); 
