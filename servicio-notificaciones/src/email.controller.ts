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
        const url = "http://localhost:3000/";
        const image = "images/email.ong";
        var response = await this.mailService.sendMail({
            to: user["email"],
            from: "mbonilla.guti@gmail.com",
            subject: 'HTML Dynamic Template',
            template: 'templateEmail',
            context: {
                name: user["name"],
                url
            },
            attachments: [
                {
                    filename: 'email.png',
                    path: __dirname + '/mails/images/email.png',
                    cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
                }
            ]
        });
        return response;
    }


    @MessagePattern({ cmd: 'emailCreateUserAdminCommunity' })
    async emailCreateUserAdmin(@Payload() user: any) {
        const url = "http://localhost:3000/";
        const image = "images/email.png";
        const logo = "images/Logo Katoikia.svg";
        var response = await this.mailService.sendMail({
            to: user["email"],
            from: "mbonilla.guti@gmail.com",
            subject: 'Usuario registrado',
            template: 'emailCreateUserAdminCommunity',
            context: {
                name: user["name"],
                password: user["password"],
                date_entry: user["date_entry"],
                email: user["email"],
                community_name: user['community_name'],
                url
            },
            attachments: [
                {
                    filename: 'email.png',
                    path: __dirname + '/mails/images/email.png',
                    cid: 'image_email' //my mistake was putting "cid:logo@cid" here! 
                },
                {
                    filename: 'Logo Katoikia.svg',
                    path: __dirname + '/mails/images/Logo Katoikia.svg',
                    cid: 'logoKatoikia' //my mistake was putting "cid:logo@cid" here! 
                }
            ]
        });
        return response;
    }
}
