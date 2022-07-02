
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timestamp } from 'rxjs';
import { TimerOptions } from 'timers';


export type CommonAreaDocument = CommonArea & Document;

@Schema({ collection: 'common_areas' })
export class CommonArea {

    @Prop()
    name: string;

    @Prop()
    hourMin: string; //hora militar, separado por dos puntos

    @Prop()
    hourMax: string; //hora militar, separado por dos puntos

    @Prop()
    bookable: number; //saber si es necesario reservarlo o no

    @Prop()
    community_id: string;
}

export const CommonAreaSchema = SchemaFactory.createForClass(CommonArea); 