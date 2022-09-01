import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ collection: 'guests' })
export class Guest {
  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  dni: string;

  @Prop()
  phone: number;

  @Prop()
  number_plate: string;

  @Prop()
  status: string;

  @Prop()
  date_entry: Date;

  @Prop()
  tenant_id: string;

  @Prop()
  community_id: string; ///creo que se debe de agregar para facilitar al guarda ver
  // ver los invitados de x comunidad

  @Prop()
  type_guest: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
