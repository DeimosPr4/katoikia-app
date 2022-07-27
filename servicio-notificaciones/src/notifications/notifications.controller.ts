import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'createNotification' })
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern({ cmd: 'findAllNotifications' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneNotification' })
  findOne(@Payload() id: number) {
    return this.notificationsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateNotification' })
  update(@Payload() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @MessagePattern({ cmd: 'removeNotification' })
  remove(@Payload() id: number) {
    return this.notificationsService.remove(id);
  }
}
