import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';


export type ReportDocument = Report & Document;

@Schema({ collection: 'reports' })
export class Report {
    
    @Prop()
    action: string;
   
    @Prop()
    description: string;

    @Prop()
    date_entry: Date;

    @Prop()
    user_id: string
}


export const ReportSchema = SchemaFactory.createForClass(Report); 