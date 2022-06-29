import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //#API orderService - create order
  @Post('user/create')
  createUser(
    @Body('dni') dni: string,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('password') password: string,
    @Body('user_type') user_type: string,
    @Body('user_type') status: string,
    @Body('user_type') date_entry: Date,
  ) {
    return this.appService.createUser(dni, name, last_name, email, phone, password,
      user_type, status, date_entry);
  }


  @Get('user/all')
  allUsers() {
    return this.appService.allUsers();
  }

}