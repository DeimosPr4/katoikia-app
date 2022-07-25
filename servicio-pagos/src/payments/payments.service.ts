import { Injectable } from '@nestjs/common';
import { Payment, PaymentDocument } from 'src/schemas/payment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}

  async create(payment: PaymentDocument): Promise<Payment> {
    return this.paymentModel.create(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().setOptions({ sanitizeFilter: true }).exec();
  }

  findOneId(id: string): Promise<Payment> {
    return this.paymentModel.findOne({ _id: id }).exec();
  }

  findByUser(id: string): Promise<Payment> {
    return this.paymentModel.findOne({ user_id: id }).exec();
  }

  update(id: string, payment: PaymentDocument) {
    return this.paymentModel.findOneAndUpdate({ _id: id }, payment, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.paymentModel.findByIdAndRemove({ _id: id }).exec();
  }
}
