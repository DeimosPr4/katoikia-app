import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tenant, TenantSchema } from './tenant.schema';



@Schema()
export class House extends Document  {
    @Prop({ default: " " })
    number: string;
    
    @Prop({ default: " " })
    description: string;

    @Prop({ type: TenantSchema, default: " " })
    tenants: Tenant;
}
export const HouseSchema = SchemaFactory.createForClass(House); 