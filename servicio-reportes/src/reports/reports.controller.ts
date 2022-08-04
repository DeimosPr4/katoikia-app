import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { Report, ReportDocument } from '../schemas/report.schema';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern({ cmd: 'createReport' })
  create(@Payload() report: ReportDocument) {
    return this.reportsService.create(report);
  }

  @MessagePattern({ cmd: 'findAllReports' })
  findAll() {
    return this.reportsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneReport' })
  findOne(@Payload() id: string) {
    let _id = id['id'];
    return this.reportsService.findOne(_id);
  }

  @MessagePattern({ cmd: 'updateReport' })
  update(@Payload() report: ReportDocument) {
    return this.reportsService.update(report.id, report);
  }

  @MessagePattern({ cmd: 'removeReport' })
  remove(@Payload() id: string) {
    let _id = id['id'];
    return this.reportsService.remove(_id);
  }
}
