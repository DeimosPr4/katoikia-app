import { Controller, Get, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user/user.entity';

@Controller()
export class EmailController {
    constructor(private mailService: MailerService) { }

    @MessagePattern({ cmd: 'sendMail' })
    sendMail(@Payload() toEmail: string) {

        var response = this.mailService.sendMail({
            to: toEmail["email"],
            from: "mbonilla.guti@gmail.com",
            subject: 'Plain Text Email ✔',
            text: 'Welcome NestJS Email Sending Tutorial',
        });
        return response;
    }

    @MessagePattern({ cmd: 'html' })
    async postHTMLEmail(@Payload() user: any) {
        const url =  "http://localhost:3000/";
        var response = await this.mailService.sendMail({
            to: user["email"],
            from: "mbonilla.guti@gmail.com",
            subject: 'HTML Dynamic Template',
            template: 'confirmation',
            context: {
                name: user["name"],
                url,
            },
        });
        return response;
    }
}
