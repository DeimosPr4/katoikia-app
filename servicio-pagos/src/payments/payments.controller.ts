import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { Payment, PaymentDocument } from 'src/schemas/payment.schema';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: 'createPayment' })
  create(@Payload() payment: PaymentDocument) {
    return this.paymentsService.create(payment);
  }

  @MessagePattern({ cmd: 'findAllPayments' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePayment' })
  findOne(@Payload() id: string) {
    let _id = id['_id'];
    return this.paymentsService.findOneId(_id);
  }

  @MessagePattern({ cmd: 'findPaymentsByUser' })
  findByUser(@Payload() id: string) {
    let user_id = id['user_id'];
    return this.paymentsService.findByUser(user_id);
  }

  @MessagePattern({ cmd: 'findPaymentsByCommunity' })
  findByCommunity(@Payload() id: string) {
    let community_id = id['community_id'];
    return this.paymentsService.findByUser(community_id);
  }

  @MessagePattern({ cmd: 'updatePayment' })
  update(@Payload() payment: PaymentDocument) {
    return this.paymentsService.update(payment.id, payment);
  }

  @MessagePattern({ cmd: 'removePayment' })
  remove(@Payload() id: string) {
    let _id = id['_id'];
    return this.paymentsService.remove(_id);
  }
}
