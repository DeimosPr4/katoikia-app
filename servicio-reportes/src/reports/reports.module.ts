import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from '../schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema:ReportSchema }]), 
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
