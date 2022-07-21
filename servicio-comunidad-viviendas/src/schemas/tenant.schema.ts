import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class Tenant {
    @Prop( {default: ''})
    tenant_id: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant); 