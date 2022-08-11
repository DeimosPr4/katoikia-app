import { Module } from '@nestjs/common';
import { CommonAreasService } from './common_areas.service';
import { CommonAreasController } from './common_areas.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonArea, CommonAreaSchema } from '../schemas/common_area.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommonArea.name, schema: CommonAreaSchema },
    ]),
  ],
  controllers: [CommonAreasController],
  providers: [CommonAreasService],
})
export class CommonAreasModule {}
