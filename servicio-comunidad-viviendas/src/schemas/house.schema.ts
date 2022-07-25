import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { Document } from 'mongoose';
import { empty } from 'rxjs';
import { Tenant, TenantSchema } from './tenant.schema';

@Schema()
export class House extends Document {
  @Prop({ default: ' ' })
  number_house: string;

  @Prop({ default: 'desocupada' })
  state: string;

  @Prop({ type: TenantSchema })
  tenants: Tenant;
}
export const HouseSchema = SchemaFactory.createForClass(House);
