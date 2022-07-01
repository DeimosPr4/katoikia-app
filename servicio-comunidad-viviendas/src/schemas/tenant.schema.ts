import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class Tenant {
    @Prop()
    tenant_id: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant); 