import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from '../schemas/report.schema';
import { map } from "rxjs/operators";

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,

    //
  ) { }

  async create(report: ReportDocument): Promise<Report> {
    return this.reportModel.create(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportModel
      .find()
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Report> {
    return this.reportModel.findOne({ _id: id }).exec();
  }


  async update(id: string, report: ReportDocument) {
    return this.reportModel.findOneAndUpdate({ _id: id }, report, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.reportModel.findByIdAndRemove({ _id: id }).exec();
  }
}
